#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const crypto = require('crypto');

const SERVER_IP = '31.172.69.92';
const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';
const TEMP = './temp_import';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function downloadHTTPS(urlPath) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: SERVER_IP, port: 443, path: urlPath, method: 'GET',
      headers: { 'Host': 'shabbathub.com', 'User-Agent': 'Mozilla/5.0' },
      rejectUnauthorized: false, timeout: 60000,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        const p = loc.startsWith('http') ? new URL(loc).pathname : loc;
        return downloadHTTPS(p).then(resolve).catch(reject);
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

async function uploadToSupabase(buffer, filePath, contentType) {
  const res = await fetch(SUPABASE_URL + '/storage/v1/object/pdfs/' + filePath, {
    method: 'POST',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': contentType, 'x-upsert': 'true' },
    body: buffer,
  });
  if (!res.ok) throw new Error('Upload: ' + (await res.text()));
  return SUPABASE_URL + '/storage/v1/object/public/pdfs/' + filePath;
}

async function createIssue(data) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/issues', {
    method: 'POST',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('DB insert: ' + (await res.text()));
  return await res.json();
}

async function getAllExistingTitles() {
  const res = await fetch(SUPABASE_URL + '/rest/v1/issues?select=title&is_active=eq.true&limit=5000', { headers: { 'apikey': SUPABASE_KEY } });
  const data = await res.json();
  return new Set((data || []).map(d => d.title.toLowerCase().trim()));
}

// Parsha detection
const parshaMap = {
  'bereishit': 1, 'noach': 2, 'lech-lecha': 3, 'lech lecha': 3, 'vayera': 4, 'chayei sarah': 5,
  'toldot': 6, 'vayetzei': 7, 'vayishlach': 8, 'vayeshev': 9, 'miketz': 10,
  'vayigash': 11, 'vayechi': 12, 'shemot': 13, 'vaera': 14, 'bo': 15,
  'beshalach': 16, 'yitro': 17, 'mishpatim': 18, 'terumah': 19, 'tetzaveh': 20,
  'ki tisa': 21, 'vayakhel': 22, 'pekudei': 23, 'vayikra': 24, 'tzav': 25,
  'shmini': 26, 'tazria': 27, 'metzora': 28, 'achrei mot': 29, 'kedoshim': 30,
  'emor': 31, 'behar': 32, 'bechukotai': 33, 'bamidbar': 34, 'nasso': 35,
  'behaalotcha': 36, 'shlach': 37, 'korach': 38, 'chukat': 39, 'balak': 40,
  'pinchas': 41, 'matot': 42, 'masei': 43, 'devarim': 44, 'vaetchanan': 45,
  'eikev': 46, 'reeh': 47, 'shoftim': 48, 'ki teitzei': 49, 'ki tavo': 50,
  'nitzavim': 51, 'vayeilech': 52, 'haazinu': 53,
  // Russian
  'берешит': 1, 'ноах': 2, 'лех-леха': 3, 'ваера': 4, 'хаей сара': 5,
  'толдот': 6, 'ваецей': 7, 'ваишлах': 8, 'ваешев': 9, 'микец': 10,
  'ваигаш': 11, 'ваехи': 12, 'шмот': 13, 'ваэра': 14, 'бо': 15,
  'бешалах': 16, 'итро': 17, 'мишпатим': 18, 'мишпотим': 18, 'трума': 19, 'тецаве': 20,
  'ки тиса': 21, 'ваякель': 22, 'пкудей': 23, 'ваикра': 24, 'цав': 25,
  'шмини': 26, 'тазриа': 27, 'мецора': 28, 'ахарей мот': 29, 'кдошим': 30,
  'эмор': 31, 'бехар': 32, 'бехукотай': 33, 'бамидбар': 34, 'насо': 35,
  'беаалотха': 36, 'шлах': 37, 'корах': 38, 'хукат': 39, 'балак': 40,
  'пинхас': 41, 'матот': 42, 'масей': 43, 'дварим': 44, 'ваэтханан': 45,
  'экев': 46, 'реэ': 47, 'шофтим': 48, 'ки теце': 49, 'ки таво': 50,
  'ницавим': 51, 'ваелех': 52, 'аазину': 53,
  // Hebrew
  'משפטים': 18, 'תרומה': 19, 'יתרו': 17, 'בשלח': 16, 'בא': 15, 'וארא': 14, 'שמות': 13,
};

function detectParsha(title) {
  const t = title.toLowerCase();
  for (const [name, id] of Object.entries(parshaMap)) {
    if (t.includes(name)) return id;
  }
  return null;
}

function extractInfo(html) {
  const docs = [];
  // Find all PDF entries - look for links with titles
  // Pattern: <a href="...pdf">...</a> near <h3> or title text
  const blockRegex = /<a[^>]*href="(https?:\/\/shabbathub\.com[^"]*\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi;
  const titleH3Regex = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi;

  // Method 1: direct PDF links
  let m;
  const pdfUrls = new Set();
  while ((m = blockRegex.exec(html)) !== null) {
    const url = m[1];
    if (pdfUrls.has(url)) continue;
    pdfUrls.add(url);
    const linkText = m[2].replace(/<[^>]+>/g, '').trim();
    docs.push({ url, title: linkText || '' });
  }

  // Method 2: find PDF URLs not captured above
  const allPdfRegex = /href="(https?:\/\/shabbathub\.com[^"]*\.pdf)"/gi;
  while ((m = allPdfRegex.exec(html)) !== null) {
    if (!pdfUrls.has(m[1])) {
      pdfUrls.add(m[1]);
      docs.push({ url: m[1], title: '' });
    }
  }

  // Clean up titles
  for (const doc of docs) {
    if (!doc.title || doc.title.length < 3) {
      // Extract from URL
      const filename = decodeURIComponent(doc.url.split('/').pop() || '');
      doc.title = filename.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ').replace(/\d{10,}/g, '').trim();
    }
    // Clean HTML entities
    doc.title = doc.title.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)));
    doc.title = doc.title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

  return docs;
}

async function main() {
  let hasPdftoppm = false;
  try { execSync('which pdftoppm', { stdio: 'pipe' }); hasPdftoppm = true; } catch {}

  if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP, { recursive: true });

  // 1. Download old site
  console.log('📄 Загружаем старый сайт...');
  const html = (await downloadHTTPS('/')).toString('utf8');
  console.log('✅ HTML: ' + html.length + ' символов');

  // 2. Extract PDF links
  const docs = extractInfo(html);
  console.log('📚 Найдено: ' + docs.length + ' PDF\n');

  // 3. Get existing titles
  const existingTitles = await getAllExistingTitles();
  console.log('📋 В базе: ' + existingTitles.size + ' документов\n');

  let added = 0, skipped = 0, failed = 0;

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const progress = `[${i + 1}/${docs.length}]`;
    const urlPath = doc.url.replace(/https?:\/\/shabbathub\.com/, '');

    // Check if already exists
    if (existingTitles.has(doc.title.toLowerCase().trim())) {
      skipped++;
      continue;
    }

    try {
      console.log(`${progress} ⬇️  ${doc.title.substring(0, 55)}...`);

      // Download PDF
      const pdfBuffer = await downloadHTTPS(urlPath);
      if (pdfBuffer.length < 500 || !pdfBuffer.toString('utf8', 0, 5).includes('%PDF')) {
        console.log(`${progress} ⚠️  Не PDF (${pdfBuffer.length} bytes)`);
        failed++;
        continue;
      }

      // Upload PDF
      const uid = crypto.randomUUID().substring(0, 8);
      const safeName = 'doc-' + uid + '.pdf';
      const pdfUrl = await uploadToSupabase(pdfBuffer, 'uploads/' + safeName, 'application/pdf');

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
            const docId = crypto.randomUUID();
            const thumbBuffer = fs.readFileSync(path.join(TEMP, thumbFiles[0]));
            thumbUrl = await uploadToSupabase(thumbBuffer, 'thumbnails/' + uid + '.jpg', 'image/jpeg');
            thumbFiles.forEach(f => { try { fs.unlinkSync(path.join(TEMP, f)); } catch {} });
          }
        } catch {}
        try { fs.unlinkSync(pdfPath); } catch {}
      }

      // Detect parsha
      const parshaId = detectParsha(doc.title);

      // Create DB record
      await createIssue({
        title: doc.title,
        pdf_url: pdfUrl,
        thumbnail_url: thumbUrl,
        parsha_id: parshaId,
        is_active: true,
        gregorian_date: new Date().toISOString().split('T')[0],
      });

      existingTitles.add(doc.title.toLowerCase().trim());
      console.log(`${progress} ✅ ${thumbUrl ? '+ превью' : ''} ${parshaId ? '(парша: ' + parshaId + ')' : ''}`);
      added++;
      await sleep(500);
    } catch (err) {
      console.error(`${progress} ❌ ${err.message}`);
      failed++;
    }
  }

  console.log('\n══════════════════════════════════');
  console.log(`✅ Добавлено: ${added}`);
  console.log(`⏭️  Уже были: ${skipped}`);
  console.log(`❌ Ошибки: ${failed}`);
  console.log('══════════════════════════════════\n');

  try { fs.rmSync(TEMP, { recursive: true }); } catch {}
}

main().catch(err => { console.error(err); process.exit(1); });
