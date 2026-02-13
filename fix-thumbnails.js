#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function uploadFile(buffer, filePath, contentType) {
  const res = await fetch(SUPABASE_URL + '/storage/v1/object/pdfs/' + filePath, {
    method: 'POST',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': contentType, 'x-upsert': 'true' },
    body: buffer,
  });
  if (!res.ok) throw new Error('Upload: ' + (await res.text()));
  return SUPABASE_URL + '/storage/v1/object/public/pdfs/' + filePath;
}

async function updateIssue(id, pdfUrl, thumbUrl) {
  const body = {};
  if (pdfUrl) body.pdf_url = pdfUrl;
  if (thumbUrl) body.thumbnail_url = thumbUrl;
  const res = await fetch(SUPABASE_URL + '/rest/v1/issues?id=eq.' + id, {
    method: 'PATCH',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Update: ' + (await res.text()));
}

async function getBrokenIssues() {
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/issues?thumbnail_url=is.null&pdf_url=not.is.null&select=id,title,pdf_url&order=created_at.desc&limit=200',
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  return await res.json();
}

function cleanName(s) {
  return s.replace(/[^a-zA-Z0-9\-_]/g, '-').replace(/-+/g, '-').substring(0, 60);
}

function extractTempName(pdfUrl) {
  // URL: .../uploads/CLEANNAME-TIMESTAMP.pdf
  const filename = pdfUrl.split('/').pop(); // e.g. "-1588-5786-1738206302814.pdf"
  // Remove timestamp (last 13 digits before .pdf)
  const withoutExt = filename.replace('.pdf', '');
  const match = withoutExt.match(/^(.*)-(\d{13})$/);
  if (match) return match[1] + '.pdf';
  return filename;
}

async function main() {
  try { execSync('which pdftoppm', { stdio: 'pipe' }); } catch {
    console.log('❌ brew install poppler'); process.exit(1);
  }

  const TEMP = './temp_thumbs';
  if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP, { recursive: true });

  const tempFiles = fs.readdirSync('./temp_migration').filter(f => f.endsWith('.pdf'));
  console.log(`📁 Найдено ${tempFiles.length} файлов в temp_migration/`);

  const issues = await getBrokenIssues();
  console.log(`📄 Найдено ${issues.length} документов без превью\n`);

  let fixed = 0, failed = 0;

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    const progress = `[${i + 1}/${issues.length}]`;

    try {
      // 1. Найти соответствующий temp файл
      const expectedTemp = extractTempName(issue.pdf_url);
      let tempPath = null;

      // Точное совпадение
      if (fs.existsSync('./temp_migration/' + expectedTemp)) {
        tempPath = './temp_migration/' + expectedTemp;
      } else {
        // Ищем по cleanName от title
        const cleanTitle = cleanName(issue.title) + '.pdf';
        if (fs.existsSync('./temp_migration/' + cleanTitle)) {
          tempPath = './temp_migration/' + cleanTitle;
        } else {
          // Ищем частичное совпадение
          const titleParts = issue.title.split(/\s+/).filter(p => /[a-zA-Z0-9]/.test(p)).map(p => p.toLowerCase());
          for (const f of tempFiles) {
            const fLower = f.toLowerCase();
            const matches = titleParts.filter(p => fLower.includes(p.substring(0, 4)));
            if (matches.length >= 2 || (titleParts.length === 1 && matches.length === 1)) {
              tempPath = './temp_migration/' + f;
              break;
            }
          }
        }
      }

      // Попробовать скачать с текущего URL
      let pdfBuffer;
      let needReupload = false;

      if (!tempPath) {
        // Попробовать скачать
        try {
          const res = await fetch(issue.pdf_url);
          if (res.ok) {
            pdfBuffer = Buffer.from(await res.arrayBuffer());
            if (pdfBuffer.length < 1000 || pdfBuffer.toString('utf8', 0, 20).includes('html')) {
              throw new Error('Not a valid PDF');
            }
          } else throw new Error('404');
        } catch {
          console.log(`${progress} ⚠️  Нет temp файла и URL не работает: ${issue.title.substring(0, 40)}`);
          failed++;
          continue;
        }
      } else {
        pdfBuffer = fs.readFileSync(tempPath);
        needReupload = true;
      }

      // Проверить что это PDF
      if (pdfBuffer.length < 500 || !pdfBuffer.toString('utf8', 0, 5).includes('%PDF')) {
        console.log(`${progress} ⚠️  Не PDF: ${issue.title.substring(0, 40)}`);
        failed++;
        continue;
      }

      console.log(`${progress} 🔧 ${issue.title.substring(0, 50)}...`);

      // 2. Перезалить PDF если нужно
      let newPdfUrl = issue.pdf_url;
      if (needReupload) {
        const uid = crypto.randomUUID().substring(0, 8);
        const safeName = 'doc-' + uid + '.pdf';
        newPdfUrl = await uploadFile(pdfBuffer, 'uploads/' + safeName, 'application/pdf');
      }

      // 3. Генерировать превью
      const pdfPath = path.join(TEMP, 'temp.pdf');
      fs.writeFileSync(pdfPath, pdfBuffer);
      const outPrefix = path.join(TEMP, 'thumb');

      try {
        execSync(`pdftoppm -f 1 -l 1 -jpeg -r 150 -scale-to 600 "${pdfPath}" "${outPrefix}" 2>/dev/null`, { stdio: 'pipe' });
      } catch {
        try {
          execSync(`pdftoppm -f 1 -l 1 -jpeg -r 100 "${pdfPath}" "${outPrefix}" 2>/dev/null`, { stdio: 'pipe' });
        } catch {
          console.log(`${progress} ⚠️  Не удалось создать превью`);
          // Всё равно обновим pdf_url если перезалили
          if (needReupload) await updateIssue(issue.id, newPdfUrl, null);
          failed++;
          continue;
        }
      }

      const thumbFiles = fs.readdirSync(TEMP).filter(f => f.startsWith('thumb') && f.endsWith('.jpg'));
      if (thumbFiles.length === 0) {
        if (needReupload) await updateIssue(issue.id, newPdfUrl, null);
        failed++;
        continue;
      }

      const thumbBuffer = fs.readFileSync(path.join(TEMP, thumbFiles[0]));
      const thumbUrl = await uploadFile(thumbBuffer, 'thumbnails/' + issue.id + '.jpg', 'image/jpeg');

      // 4. Обновить запись
      await updateIssue(issue.id, needReupload ? newPdfUrl : null, thumbUrl);

      console.log(`${progress} ✅`);
      fixed++;

      // Cleanup
      thumbFiles.forEach(f => { try { fs.unlinkSync(path.join(TEMP, f)); } catch {} });
      try { fs.unlinkSync(pdfPath); } catch {}

      await sleep(300);
    } catch (err) {
      console.error(`${progress} ❌ ${err.message}`);
      failed++;
    }
  }

  console.log('\n══════════════════════════════════');
  console.log(`✅ Исправлено: ${fixed}`);
  console.log(`❌ Ошибки: ${failed}`);
  console.log('══════════════════════════════════\n');

  try { fs.rmSync(TEMP, { recursive: true }); } catch {}
}

main().catch(err => { console.error(err); process.exit(1); });
