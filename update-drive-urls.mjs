#!/usr/bin/env node
/**
 * ShabbatHub: Replace WP PDF URLs → Google Drive URLs
 * 
 * Запуск:
 *   1. Скопируйте drive-files.csv в папку проекта
 *   2. node update-drive-urls.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
function loadEnv() {
  try {
    const content = readFileSync(resolve(__dirname, '.env.local'), 'utf-8');
    const vars = {};
    content.split('\n').forEach(line => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) vars[m[1].trim()] = m[2].trim();
    });
    return vars;
  } catch {
    console.error('❌ Не могу прочитать .env.local');
    process.exit(1);
  }
}

const env = loadEnv();
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── Parse CSV ──
function parseCsv(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  const lines = content.trim().split('\n');
  const map = new Map();
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',');
    if (parts.length < 4) continue;
    
    const filename = parts[0].trim();
    const fileId = parts[1].trim();
    
    if (filename && fileId && filename.endsWith('.pdf')) {
      map.set(filename, fileId);
    }
  }
  
  return map;
}

// ── Main ──
async function main() {
  console.log('🔄 ShabbatHub: WP URLs → Google Drive URLs');
  console.log('═'.repeat(45) + '\n');

  // 1. Load Drive file map
  const csvPath = resolve(__dirname, 'drive-files.csv');
  let driveMap;
  try {
    driveMap = parseCsv(csvPath);
  } catch {
    console.error('❌ Не найден drive-files.csv — скопируйте его в папку проекта');
    process.exit(1);
  }
  console.log(`📁 Google Drive файлов: ${driveMap.size}\n`);

  // 2. Load all issues from Supabase
  console.log('📥 Загружаю документы из Supabase...');
  
  let allIssues = [];
  let from = 0;
  const batchSize = 1000;
  
  while (true) {
    const { data, error } = await supabase
      .from('issues')
      .select('id, pdf_url')
      .range(from, from + batchSize - 1);
    
    if (error) {
      console.error('❌ Ошибка:', error.message);
      process.exit(1);
    }
    
    allIssues.push(...data);
    if (data.length < batchSize) break;
    from += batchSize;
  }
  
  console.log(`   📄 Всего документов: ${allIssues.length}\n`);

  // 3. Match and update
  let matched = 0;
  let notMatched = 0;
  let alreadyDrive = 0;
  let updated = 0;
  let errors = 0;
  const unmatched = [];

  for (const issue of allIssues) {
    const pdfUrl = issue.pdf_url || '';
    
    // Skip if already Google Drive
    if (pdfUrl.includes('drive.google.com')) {
      alreadyDrive++;
      continue;
    }

    // Extract filename from WP URL
    const filename = pdfUrl.split('/').pop();
    
    if (!filename) {
      notMatched++;
      unmatched.push({ id: issue.id, pdf_url: pdfUrl, reason: 'no_filename' });
      continue;
    }

    // Look up in Drive map
    const fileId = driveMap.get(filename);
    
    if (!fileId) {
      notMatched++;
      unmatched.push({ id: issue.id, filename, reason: 'not_in_drive' });
      continue;
    }

    matched++;

    // Update in Supabase
    const driveUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    const { error } = await supabase
      .from('issues')
      .update({ pdf_url: driveUrl })
      .eq('id', issue.id);

    if (error) {
      console.error(`   ❌ id=${issue.id}: ${error.message}`);
      errors++;
    } else {
      updated++;
      if (updated % 100 === 0) {
        console.log(`   ✅ Обновлено: ${updated}...`);
      }
    }
  }

  // 4. Summary
  console.log('\n' + '═'.repeat(45));
  console.log('📊 Итоги:');
  console.log(`   ✅ Обновлено на Google Drive: ${updated}`);
  console.log(`   ⏭️  Уже на Drive: ${alreadyDrive}`);
  console.log(`   ⚠️  Нет совпадения: ${notMatched}`);
  console.log(`   ❌ Ошибок: ${errors}`);
  console.log(`   📄 Всего: ${allIssues.length}`);
  console.log('═'.repeat(45));

  if (unmatched.length > 0) {
    console.log(`\n⚠️  ${unmatched.length} файлов не найдены на Google Drive:`);
    unmatched.slice(0, 20).forEach(u => {
      console.log(`   - ${u.filename || u.pdf_url} (${u.reason})`);
    });
    if (unmatched.length > 20) {
      console.log(`   ... и ещё ${unmatched.length - 20}`);
    }
  }

  console.log('\n✨ Готово!');
}

main().catch(err => {
  console.error('💀 Ошибка:', err);
  process.exit(1);
});
