#!/usr/bin/env node

/**
 * Миграция документов с shabbathub.com (WordPress) на новый сайт (Supabase)
 * 
 * Запуск: node migrate-from-wp.js
 * 
 * Что делает:
 * 1. Загружает список документов со старого сайта
 * 2. Скачивает каждый PDF
 * 3. Загружает в Supabase Storage
 * 4. Создаёт запись в таблице issues
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';
const OLD_SITE = 'https://shabbathub.com';
const TEMP_DIR = './temp_migration';

// Парша маппинг
const parshaNameToId = {
  'Мишпатим': 18, 'Мишпотим': 18, 'Mishpatim': 18, 'משפטים': 18,
  'Терума': 19, 'Terumah': 19, 'תרומה': 19,
  'Итро': 17, 'Yitro': 17, 'יתרו': 17,
  'Бо': 15, 'Bo': 15, 'בא': 15,
  'Бешалах': 16, 'Beshalach': 16, 'בשלח': 16,
  'Ваэра': 14, 'Vaera': 14, 'וארא': 14,
  'Шмот': 13, 'Shemot': 13, 'שמות': 13,
  'Вайехи': 12, 'Vayechi': 12, 'ויחי': 12,
  'Нецавим': 51, 'Nitzavim': 51, 'נצבים': 51,
  'Балак': 40, 'Balak': 40, 'בלק': 40,
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
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

function extractDocuments(html) {
  const docs = [];
  // Ищем ссылки на PDF с заголовками
  const regex = /<a[^>]*href="([^"]*\.pdf)"[^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    docs.push({ pdfUrl: match[1], title: match[2].replace(/<[^>]+>/g, '').trim() });
  }
  
  // Альтернативный паттерн - заголовок перед ссылкой
  if (docs.length === 0) {
    const altRegex = /###\s*(.*?)\n[\s\S]*?\((https?:\/\/[^\)]*\.pdf)\)/gi;
    while ((match = altRegex.exec(html)) !== null) {
      docs.push({ pdfUrl: match[2], title: match[1].trim() });
    }
  }

  // Ещё один паттерн — из HTML карточек WordPress
  const cardRegex = /href="(https?:\/\/shabbathub\.com\/wp-content\/uploads\/[^"]*\.pdf)"[\s\S]*?<(?:h[2-4]|strong)[^>]*>([\s\S]*?)<\/(?:h[2-4]|strong)>/gi;
  while ((match = cardRegex.exec(html)) !== null) {
    const title = match[2].replace(/<[^>]+>/g, '').trim();
    const url = match[1];
    if (!docs.find(d => d.pdfUrl === url)) {
      docs.push({ pdfUrl: url, title });
    }
  }

  return docs;
}

function detectParsha(title) {
  for (const [name, id] of Object.entries(parshaNameToId)) {
    if (title.toLowerCase().includes(name.toLowerCase())) return id;
  }
  return null;
}

function cleanFilename(name) {
  return name.replace(/[^a-zA-Z0-9\-_]/g, '-').replace(/-+/g, '-').substring(0, 60);
}

async function checkExisting(title) {
  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/issues?title=eq.' + encodeURIComponent(title) + '&select=id',
      { headers: { 'apikey': SUPABASE_KEY } }
    );
    const data = await res.json();
    return data && data.length > 0;
  } catch { return false; }
}

async function uploadToSupabase(buffer, filename) {
  const filePath = 'uploads/' + filename;
  const res = await fetch(
    SUPABASE_URL + '/storage/v1/object/pdfs/' + filePath,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/pdf',
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

async function createIssue(data) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/issues', {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Insert failed: ' + err);
  }
  return await res.json();
}

async function main() {
  console.log('🔄 Начинаем миграцию со старого сайта...\n');

  // Создать temp папку
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  // 1. Загрузить главную страницу старого сайта
  console.log('📄 Загружаем список документов с shabbathub.com...');
  const html = (await fetchUrl(OLD_SITE)).toString('utf8');

  // 2. Извлечь документы
  let docs = extractDocuments(html);
  
  // Если не нашли через HTML regex — парсим вручную из известных ссылок
  if (docs.length === 0) {
    console.log('⚠️  HTML парсинг не нашёл документы, пробуем альтернативный метод...');
    
    // Извлечь все PDF ссылки
    const pdfRegex = /href="(https?:\/\/shabbathub\.com\/wp-content\/uploads\/[^"]*\.pdf)"/gi;
    let m;
    const urls = [];
    while ((m = pdfRegex.exec(html)) !== null) urls.push(m[1]);
    
    // Извлечь заголовки
    const titleRegex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
    const titles = [];
    while ((m = titleRegex.exec(html)) !== null) titles.push(m[1].replace(/<[^>]+>/g, '').trim());
    
    for (let i = 0; i < Math.min(urls.length, titles.length); i++) {
      docs.push({ pdfUrl: urls[i], title: titles[i] });
    }
  }

  console.log(`📚 Найдено ${docs.length} документов\n`);

  if (docs.length === 0) {
    console.log('❌ Документы не найдены. Проверьте HTML парсинг.');
    // Сохраним HTML для отладки
    fs.writeFileSync(TEMP_DIR + '/debug.html', html);
    console.log('HTML сохранён в ' + TEMP_DIR + '/debug.html');
    return;
  }

  // 3. Загрузить каждую страницу для доп. документов
  // Попробуем загрузить страницу 2
  try {
    console.log('📄 Проверяем дополнительные страницы...');
    const page2html = (await fetchUrl(OLD_SITE + '/page/2/')).toString('utf8');
    const page2docs = extractDocuments(page2html);
    if (page2docs.length > 0) {
      docs = [...docs, ...page2docs];
      console.log(`   +${page2docs.length} документов со страницы 2`);
    }
  } catch (e) { /* страницы 2 нет */ }

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const progress = `[${i + 1}/${docs.length}]`;

    // Проверить дубликат
    const exists = await checkExisting(doc.title);
    if (exists) {
      console.log(`${progress} ⏭️  Пропуск (уже есть): ${doc.title}`);
      skipped++;
      continue;
    }

    try {
      // Скачать PDF
      console.log(`${progress} ⬇️  Скачиваем: ${doc.title}`);
      const pdfBuffer = await fetchUrl(doc.pdfUrl);
      
      if (pdfBuffer.length < 1000) {
        console.log(`${progress} ⚠️  Файл слишком маленький, пропуск`);
        failed++;
        continue;
      }

      // Сохранить локально (на всякий случай)
      const localFile = TEMP_DIR + '/' + cleanFilename(doc.title) + '.pdf';
      fs.writeFileSync(localFile, pdfBuffer);

      // Загрузить в Supabase Storage
      const filename = cleanFilename(doc.title) + '-' + Date.now() + '.pdf';
      console.log(`${progress} ⬆️  Загружаем в хранилище...`);
      const publicUrl = await uploadToSupabase(pdfBuffer, filename);

      // Определить паршу
      const parshaId = detectParsha(doc.title);

      // Создать запись
      console.log(`${progress} 💾 Создаём запись в базе...`);
      await createIssue({
        title: doc.title,
        pdf_url: publicUrl,
        parsha_id: parshaId,
        gregorian_date: new Date().toISOString().split('T')[0],
        is_active: true,
      });

      console.log(`${progress} ✅ ${doc.title}\n`);
      migrated++;

      // Пауза
      await sleep(500);
    } catch (err) {
      console.error(`${progress} ❌ Ошибка: ${doc.title} — ${err.message}\n`);
      failed++;
    }
  }

  console.log('\n══════════════════════════════════');
  console.log(`✅ Мигрировано: ${migrated}`);
  console.log(`⏭️  Пропущено (дубли): ${skipped}`);
  console.log(`❌ Ошибки: ${failed}`);
  console.log('══════════════════════════════════\n');

  // Очистить temp
  // fs.rmSync(TEMP_DIR, { recursive: true });
  console.log(`Временные файлы сохранены в ${TEMP_DIR}/`);
}

main().catch(err => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});
