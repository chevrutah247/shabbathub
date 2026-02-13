#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { execSync } = require('child_process');
const crypto = require('crypto');

const SERVER_IP = '31.172.79.235';
const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';
const TEMP = './temp_redownload';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Скачать через IP с Host: shabbathub.com
function downloadViaIP(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SERVER_IP,
      port: 80,
      path: urlPath,
      method: 'GET',
      headers: { 'Host': 'shabbathub.com', 'User-Agent': 'Mozilla/5.0' },
      timeout: 30000,
    };
    const req = http.request(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        const loc = res.headers.location;
        if (loc.startsWith('http')) {
          // Absolute URL — replace domain with IP
          const u = new URL(loc);
          return downloadViaIP(u.pathname + u.search).then(resolve).catch(reject);
        }
        return downloadViaIP(loc).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

// Загрузить главную старого сайта через IP
async function getOldSiteHTML() {
  const html = await downloadViaIP('/');
  return html.toString('utf8');
}

// Извлечь PDF ссылки и названия
function extractPDFs(html) {
  const docs = [];
  const regex = /href="(https?:\/\/shabbathub\.com\/wp-content\/uploads\/[^"]*\.pdf)"/gi;
  const titleRegex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  
  const urls = [];
  let m;
  while ((m = regex.exec(html)) !== null) urls.push(m[1]);
  
  const titles = [];
  while ((m = titleRegex.exec(html)) !== null) titles.push(m[1].replace(/<[^>]+>/g, '').trim());
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const title = titles[i] || 'Document ' + i;
    const urlPath = url.replace(/https?:\/\/shabbathub\.com/, '');
    docs.push({ title, urlPath, originalUrl: url });
  }
  return docs;
}

async function uploadToSupabase(buffer, filePath, contentType) {
  const res = await fetch(SUPABASE_URL + '/storage/v1/object/pdfs/' + filePath, {
    method: 'POST',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': contentType, 'x-upsert': 'true' },
    body: buffer,
  });
  if (!res.ok) throw new Error('Upload: ' + (await res.text()));
  return SUPABASE_URL + '/storage/v1/object/public/pdfs/' + filePath;
}

async function findIssueByTitle(title) {
  // Ищем по точному или частичному совпадению
  const cleanTitle = title.replace(/&#\d+;/g, '').replace(/[""'']/g, '').trim();
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/issues?thumbnail_url=is.null&title=ilike.*' + encodeURIComponent(cleanTitle.substring(0, 20)) + '*&select=id,title,pdf_url&limit=5',
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  const data = await res.json();
  return data && data.length > 0 ? data[0] : null;
}

async function updateIssue(id, updates) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/issues?id=eq.' + id, {
    method: 'PATCH',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Update: ' + (await res.text()));
}

async function main() {
  try { execSync('which pdftoppm', { stdio: 'pipe' }); } catch {
    console.log('❌ brew install poppler'); process.exit(1);
  }

  if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP, { recursive: true });

  // 1. Загрузить HTML старого сайта через IP
  console.log('📄 Загружаем старый сайт через IP ' + SERVER_IP + '...');
  let html;
  try {
    html = await getOldSiteHTML();
    console.log('✅ HTML загружен (' + html.length + ' символов)\n');
  } catch (err) {
    console.error('❌ Не удалось загрузить:', err.message);
    process.exit(1);
  }

  // 2. Извлечь PDF ссылки
  const docs = extractPDFs(html);
  console.log('📚 Найдено ' + docs.length + ' PDF на старом сайте\n');

  let fixed = 0, skipped = 0, failed = 0;

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const progress = `[${i + 1}/${docs.length}]`;

    try {
      // 3. Найти запись в базе
      const issue = await findIssueByTitle(doc.title);
      if (!issue) {
        console.log(`${progress} ⏭️  Не найдено в базе: ${doc.title.substring(0, 40)}`);
        skipped++;
        continue;
      }

      if (issue.pdf_url && !issue.pdf_url.includes('/-')) {
        // PDF URL уже нормальный, нужно только превью
        // Проверим — может уже есть thumbnail
      }

      // 4. Скачать PDF с сервера через IP
      console.log(`${progress} ⬇️  ${doc.title.substring(0, 50)}...`);
      const pdfBuffer = await downloadViaIP(doc.urlPath);

      if (pdfBuffer.length < 500 || !pdfBuffer.toString('utf8', 0, 5).includes('%PDF')) {
        console.log(`${progress} ⚠️  Не PDF (${pdfBuffer.length} bytes)`);
        failed++;
        continue;
      }

      // 5. Загрузить PDF в Supabase
      const uid = crypto.randomUUID().substring(0, 8);
      const safeName = 'doc-' + uid + '.pdf';
      const pdfUrl = await uploadToSupabase(pdfBuffer, 'uploads/' + safeName, 'application/pdf');

      // 6. Генерировать превью
      let thumbUrl = null;
      const pdfPath = path.join(TEMP, 'temp.pdf');
      fs.writeFileSync(pdfPath, pdfBuffer);
      const outPrefix = path.join(TEMP, 'thumb');

      try {
        execSync(`pdftoppm -f 1 -l 1 -jpeg -r 150 -scale-to 600 "${pdfPath}" "${outPrefix}" 2>/dev/null`, { stdio: 'pipe' });
        const thumbFiles = fs.readdirSync(TEMP).filter(f => f.startsWith('thumb') && f.endsWith('.jpg'));
        if (thumbFiles.length > 0) {
          const thumbBuffer = fs.readFileSync(path.join(TEMP, thumbFiles[0]));
          thumbUrl = await uploadToSupabase(thumbBuffer, 'thumbnails/' + issue.id + '.jpg', 'image/jpeg');
          thumbFiles.forEach(f => { try { fs.unlinkSync(path.join(TEMP, f)); } catch {} });
        }
      } catch {}

      try { fs.unlinkSync(pdfPath); } catch {}

      // 7. Обновить запись
      const updates = { pdf_url: pdfUrl };
      if (thumbUrl) updates.thumbnail_url = thumbUrl;
      await updateIssue(issue.id, updates);

      console.log(`${progress} ✅ PDF + ${thumbUrl ? 'превью' : 'без превью'}`);
      fixed++;

      await sleep(500);
    } catch (err) {
      console.error(`${progress} ❌ ${err.message}`);
      failed++;
    }
  }

  console.log('\n══════════════════════════════════');
  console.log(`✅ Исправлено: ${fixed}`);
  console.log(`⏭️  Не в базе: ${skipped}`);
  console.log(`❌ Ошибки: ${failed}`);
  console.log('══════════════════════════════════\n');

  try { fs.rmSync(TEMP, { recursive: true }); } catch {}
}

main().catch(err => { console.error(err); process.exit(1); });
