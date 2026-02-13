#!/usr/bin/env node

/**
 * Генерация превью для документов без thumbnail
 * 
 * Зависимости: npm install pdf-poppler sharp
 * Или на Mac: brew install poppler (для pdftoppm)
 * 
 * Запуск: node generate-thumbnails.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';
const TEMP_DIR = './temp_thumbs';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function getIssuesWithoutThumbnails() {
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/issues?thumbnail_url=is.null&pdf_url=not.is.null&select=id,title,pdf_url&order=created_at.desc&limit=200',
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  return await res.json();
}

async function uploadThumbnail(buffer, filename) {
  const filePath = 'thumbnails/' + filename;
  const res = await fetch(
    SUPABASE_URL + '/storage/v1/object/pdfs/' + filePath,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'image/jpeg',
        'x-upsert': 'true',
      },
      body: buffer,
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Upload failed: ' + err);
  }
  return SUPABASE_URL + '/storage/v1/object/public/pdfs/' + filePath;
}

async function updateIssue(id, thumbnailUrl) {
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/issues?id=eq.' + id,
    {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ thumbnail_url: thumbnailUrl }),
    }
  );
  if (!res.ok) throw new Error('Update failed: ' + (await res.text()));
}

async function main() {
  // Проверить наличие pdftoppm (из poppler)
  try {
    execSync('which pdftoppm', { stdio: 'pipe' });
  } catch {
    console.log('❌ pdftoppm не найден. Установите:');
    console.log('   brew install poppler');
    process.exit(1);
  }

  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  console.log('🔍 Ищем документы без превью...');
  const issues = await getIssuesWithoutThumbnails();
  console.log(`📄 Найдено ${issues.length} документов без превью\n`);

  if (issues.length === 0) {
    console.log('✅ Все документы уже с превью!');
    return;
  }

  let done = 0, failed = 0;

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    const progress = `[${i + 1}/${issues.length}]`;

    try {
      // 1. Скачать PDF
      console.log(`${progress} ⬇️  ${issue.title.substring(0, 50)}...`);
      const pdfBuffer = await fetchBuffer(issue.pdf_url);
      const pdfPath = path.join(TEMP_DIR, 'temp.pdf');
      fs.writeFileSync(pdfPath, pdfBuffer);

      // 2. Конвертировать первую страницу в JPEG
      const outPrefix = path.join(TEMP_DIR, 'thumb');
      try {
        execSync(`pdftoppm -f 1 -l 1 -jpeg -r 150 -scale-to 600 "${pdfPath}" "${outPrefix}"`, { stdio: 'pipe' });
      } catch {
        // Иногда выходной файл с другим форматом имени
        execSync(`pdftoppm -f 1 -l 1 -jpeg -r 150 "${pdfPath}" "${outPrefix}"`, { stdio: 'pipe' });
      }

      // Найти сгенерированный файл
      const files = fs.readdirSync(TEMP_DIR).filter(f => f.startsWith('thumb') && f.endsWith('.jpg'));
      if (files.length === 0) throw new Error('Thumbnail not generated');

      const thumbPath = path.join(TEMP_DIR, files[0]);
      const thumbBuffer = fs.readFileSync(thumbPath);

      // 3. Загрузить в Supabase Storage
      const filename = issue.id + '.jpg';
      const thumbUrl = await uploadThumbnail(thumbBuffer, filename);

      // 4. Обновить запись
      await updateIssue(issue.id, thumbUrl);

      console.log(`${progress} ✅ Готово`);
      done++;

      // Cleanup
      files.forEach(f => fs.unlinkSync(path.join(TEMP_DIR, f)));
      fs.unlinkSync(pdfPath);

      await sleep(300);
    } catch (err) {
      console.error(`${progress} ❌ ${err.message}`);
      failed++;
    }
  }

  console.log('\n══════════════════════════════════');
  console.log(`✅ Превью сгенерировано: ${done}`);
  console.log(`❌ Ошибки: ${failed}`);
  console.log('══════════════════════════════════\n');

  // Cleanup
  try { fs.rmSync(TEMP_DIR, { recursive: true }); } catch {}
}

main().catch(err => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});
