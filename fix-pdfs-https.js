#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const crypto = require('crypto');

const SERVER_IP = '31.172.69.92';
const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';
const TEMP = './temp_fix';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function downloadHTTPS(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SERVER_IP,
      port: 443,
      path: urlPath,
      method: 'GET',
      headers: { 'Host': 'shabbathub.com', 'User-Agent': 'Mozilla/5.0' },
      rejectUnauthorized: false,
      timeout: 30000,
    };
    const req = https.request(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        if (loc.startsWith('http')) {
          const u = new URL(loc);
          return downloadHTTPS(u.pathname + u.search).then(resolve).catch(reject);
        }
        return downloadHTTPS(loc).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
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

async function getOldSiteHTML() {
  const buf = await downloadHTTPS('/');
  return buf.toString('utf8');
}

function extractPDFLinks(html) {
  const results = [];
  // Pattern 1: direct PDF links
  const pdfRegex = /href="(https?:\/\/shabbathub\.com[^"]*\.pdf)"/gi;
  let m;
  while ((m = pdfRegex.exec(html)) !== null) {
    results.push(m[1]);
  }
  // Pattern 2: forminator upload links
  const formRegex = /href="(https?:\/\/shabbathub\.com\/wp-content\/uploads\/forminator\/[^"]+)"/gi;
  while ((m = formRegex.exec(html)) !== null) {
    if (!results.includes(m[1])) results.push(m[1]);
  }
  return results;
}

function extractTitleFromUrl(url) {
  const filename = decodeURIComponent(url.split('/').pop() || '');
  return filename.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ').trim();
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

async function getBrokenIssues() {
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/issues?thumbnail_url=is.null&is_active=eq.true&select=id,title,pdf_url&order=created_at.desc&limit=300',
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  return await res.json();
}

async function updateIssue(id, updates) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/issues?id=eq.' + id, {
    method: 'PATCH',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('DB update: ' + (await res.text()));
}

function normalizeTitle(t) {
  return t.toLowerCase()
    .replace(/[#&;]/g, '')
    .replace(/\d{4,}/g, '') // remove HTML entities like 8211
    .replace(/[^a-zа-яёа-яіїєґא-ת0-9\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchScore(title1, title2) {
  const t1 = normalizeTitle(title1);
  const t2 = normalizeTitle(title2);
  if (t1 === t2) return 100;
  
  const words1 = t1.split(' ').filter(w => w.length > 2);
  const words2 = t2.split(' ').filter(w => w.length > 2);
  if (words1.length === 0 || words2.length === 0) return 0;
  
  let matches = 0;
  for (const w1 of words1) {
    for (const w2 of words2) {
      if (w1 === w2 || w1.includes(w2) || w2.includes(w1)) { matches++; break; }
    }
  }
  return Math.round((matches / Math.max(words1.length, words2.length)) * 100);
}

async function main() {
  let hasPdftoppm = false;
  try { execSync('which pdftoppm', { stdio: 'pipe' }); hasPdftoppm = true; } catch {}
  
  if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP, { recursive: true });

  // Step 1: Get old site HTML
  console.log('📄 Загружаем старый сайт через HTTPS ' + SERVER_IP + '...');
  let html;
  try {
    html = await getOldSiteHTML();
    console.log('✅ HTML: ' + html.length + ' символов');
  } catch (err) {
    console.error('❌ ' + err.message);
    process.exit(1);
  }

  // Step 2: Extract PDF links
  const pdfUrls = extractPDFLinks(html);
  console.log('📚 Найдено ' + pdfUrls.length + ' PDF ссылок\n');

  if (pdfUrls.length === 0) {
    // Save HTML for debugging
    fs.writeFileSync(TEMP + '/debug.html', html);
    console.log('⚠️  0 ссылок. HTML сохранён в ' + TEMP + '/debug.html для проверки');
    process.exit(0);
  }

  // Step 3: Get broken issues from DB
  const brokenIssues = await getBrokenIssues();
  console.log('🔧 Документов без превью: ' + brokenIssues.length + '\n');

  let fixed = 0, notFound = 0, failed = 0, alreadyOk = 0;

  for (let i = 0; i < pdfUrls.length; i++) {
    const url = pdfUrls[i];
    const urlPath = url.replace(/https?:\/\/shabbathub\.com/, '');
    const urlTitle = extractTitleFromUrl(url);
    const progress = `[${i + 1}/${pdfUrls.length}]`;

    // Find matching issue in DB
    let bestMatch = null;
    let bestScore = 0;
    for (const issue of brokenIssues) {
      const score = matchScore(issue.title, urlTitle);
      if (score > bestScore) { bestScore = score; bestMatch = issue; }
    }

    if (!bestMatch || bestScore < 30) {
      // Try also checking by URL fragments
      const urlParts = urlPath.toLowerCase().split('/').pop().replace('.pdf', '').split(/[-_]/);
      for (const issue of brokenIssues) {
        const titleLower = issue.title.toLowerCase();
        let partMatches = 0;
        for (const part of urlParts) {
          if (part.length > 2 && titleLower.includes(part)) partMatches++;
        }
        const score2 = urlParts.length > 0 ? Math.round((partMatches / urlParts.length) * 100) : 0;
        if (score2 > bestScore) { bestScore = score2; bestMatch = issue; }
      }
    }

    if (!bestMatch || bestScore < 25) {
      notFound++;
      continue;
    }

    try {
      console.log(`${progress} ⬇️  ${bestMatch.title.substring(0, 50)}... (score:${bestScore})`);
      
      // Download PDF
      const pdfBuffer = await downloadHTTPS(urlPath);
      
      if (pdfBuffer.length < 500 || !pdfBuffer.toString('utf8', 0, 5).includes('%PDF')) {
        console.log(`${progress} ⚠️  Не PDF (${pdfBuffer.length} bytes)`);
        failed++;
        continue;
      }

      // Upload to Supabase
      const uid = crypto.randomUUID().substring(0, 8);
      const safeName = 'doc-' + uid + '.pdf';
      const newPdfUrl = await uploadToSupabase(pdfBuffer, 'uploads/' + safeName, 'application/pdf');

      // Generate thumbnail
      let thumbUrl = null;
      if (hasPdftoppm) {
        const pdfPath = path.join(TEMP, 'temp.pdf');
        fs.writeFileSync(pdfPath, pdfBuffer);
        const outPrefix = path.join(TEMP, 'thumb');
        try {
          execSync(`pdftoppm -f 1 -l 1 -jpeg -r 150 -scale-to 600 "${pdfPath}" "${outPrefix}" 2>/dev/null`, { stdio: 'pipe' });
          const thumbFiles = fs.readdirSync(TEMP).filter(f => f.startsWith('thumb') && f.endsWith('.jpg'));
          if (thumbFiles.length > 0) {
            const thumbBuffer = fs.readFileSync(path.join(TEMP, thumbFiles[0]));
            thumbUrl = await uploadToSupabase(thumbBuffer, 'thumbnails/' + bestMatch.id + '.jpg', 'image/jpeg');
            thumbFiles.forEach(f => { try { fs.unlinkSync(path.join(TEMP, f)); } catch {} });
          }
        } catch {}
        try { fs.unlinkSync(pdfPath); } catch {}
      }

      // Update DB
      const updates = { pdf_url: newPdfUrl };
      if (thumbUrl) updates.thumbnail_url = thumbUrl;
      await updateIssue(bestMatch.id, updates);

      // Remove from broken list
      const idx = brokenIssues.indexOf(bestMatch);
      if (idx > -1) brokenIssues.splice(idx, 1);

      console.log(`${progress} ✅ ${thumbUrl ? '+ превью' : 'без превью'}`);
      fixed++;
      await sleep(500);
    } catch (err) {
      console.error(`${progress} ❌ ${err.message}`);
      failed++;
    }
  }

  // Step 4: For remaining broken issues, try to download their current PDF and just generate thumbnail
  if (hasPdftoppm) {
    console.log('\n📸 Генерируем превью для оставшихся...');
    for (let i = 0; i < brokenIssues.length; i++) {
      const issue = brokenIssues[i];
      if (!issue.pdf_url) continue;
      const progress = `[thumb ${i + 1}/${brokenIssues.length}]`;
      try {
        const res = await fetch(issue.pdf_url);
        if (!res.ok) continue;
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 500 || !buf.toString('utf8', 0, 5).includes('%PDF')) continue;

        const pdfPath = path.join(TEMP, 'temp.pdf');
        fs.writeFileSync(pdfPath, buf);
        const outPrefix = path.join(TEMP, 'thumb');
        execSync(`pdftoppm -f 1 -l 1 -jpeg -r 150 -scale-to 600 "${pdfPath}" "${outPrefix}" 2>/dev/null`, { stdio: 'pipe' });
        const thumbFiles = fs.readdirSync(TEMP).filter(f => f.startsWith('thumb') && f.endsWith('.jpg'));
        if (thumbFiles.length > 0) {
          const thumbBuffer = fs.readFileSync(path.join(TEMP, thumbFiles[0]));
          const thumbUrl = await uploadToSupabase(thumbBuffer, 'thumbnails/' + issue.id + '.jpg', 'image/jpeg');
          await updateIssue(issue.id, { thumbnail_url: thumbUrl });
          console.log(`${progress} ✅ ${issue.title.substring(0, 40)}`);
          fixed++;
          thumbFiles.forEach(f => { try { fs.unlinkSync(path.join(TEMP, f)); } catch {} });
        }
        try { fs.unlinkSync(pdfPath); } catch {}
        await sleep(300);
      } catch {}
    }
  }

  console.log('\n══════════════════════════════════');
  console.log(`✅ Исправлено: ${fixed}`);
  console.log(`⏭️  Не найдено в базе: ${notFound}`);
  console.log(`❌ Ошибки: ${failed}`);
  console.log('══════════════════════════════════\n');

  try { fs.rmSync(TEMP, { recursive: true }); } catch {}
}

main().catch(err => { console.error(err); process.exit(1); });
