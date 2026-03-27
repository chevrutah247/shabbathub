#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import { execSync } from 'child_process';

const PHASE = process.argv[2] || 'scan';
const APPLY = process.argv.includes('--apply');
const LIMIT_ARG = process.argv.find((x) => x.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? Number(LIMIT_ARG.split('=')[1]) : 0;
const MAX_MB_ARG = process.argv.find((x) => x.startsWith('--max-mb='));
const MAX_FILE_MB = MAX_MB_ARG ? Number(MAX_MB_ARG.split('=')[1]) : 25;

const ARCHIVE_ROOT = '/Volumes/home/MacBook/***ARCHIVE***';
const FOLDERS = [
  { dir: '🟢RUS🟢', code: 'rus', lang: 'ru', pubHint: 'Chevrutah 24x7', pubRu: 'Chevrutah 24x7', pubEn: 'Chevrutah 24x7 Russian' },
  { dir: '🟣ENG🟣', code: 'eng', lang: 'en', pubHint: 'Chevrutah 24x7', pubRu: 'Chevrutah 24x7 English', pubEn: 'Chevrutah 24x7 English' },
  { dir: '🟠 KIDS 🟠', code: 'kids', lang: 'ru', pubHint: 'Kids', pubRu: 'Chevrutah Kids', pubEn: 'Chevrutah Kids' },
];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const REPORT_PATH = '/tmp/levi-archive-report.json';

if (!SUPABASE_KEY && PHASE !== 'scan') {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY for read-only).');
  process.exit(1);
}

const PARSHA_MAP = new Map([
  [1, ['bereishit', 'берешит', 'בראשית']],
  [2, ['noach', 'ноах', 'נח']],
  [3, ['lech lecha', 'lech-lecha', 'лех-леха', 'לך לך', 'לך-לך']],
  [4, ['vayera', 'vayeira', 'ваера', 'вайера', 'וירא']],
  [5, ['chayei sarah', 'chaiyei sarah', 'хаей сара', 'хайей сара', 'חיי שרה', 'חיי-שרה']],
  [6, ['toldot', 'толдот', 'תולדות']],
  [7, ['vayetzei', 'vayeitzei', 'vaeitzei', 'ваеце', 'ваейцей', 'ויצא']],
  [8, ['vayishlach', 'ваишлах', 'וישלח']],
  [9, ['vayeshev', 'vaeshev', 'ваешев', 'וישב']],
  [10, ['miketz', 'микец', 'מקץ']],
  [11, ['vayigash', 'ваигаш', 'ויגש']],
  [12, ['vayechi', 'ваехи', 'ויחי']],
  [13, ['shemot', 'шмот', 'שמות']],
  [14, ['vaera', 'vaeira', 'ваэра', 'ваера', 'וארא']],
  [15, ['bo', 'бо', 'בא']],
  [16, ['beshalach', 'бешалах', 'בשלח']],
  [17, ['yitro', 'итро', 'יתרו']],
  [18, ['mishpatim', 'мишпатим', 'мишпотим', 'משפטים']],
  [19, ['terumah', 'трума', 'תרומה']],
  [20, ['tetzaveh', 'тецаве', 'תצוה', 'תצווה']],
  [21, ['ki tisa', 'ки тиса', 'כי תשא', 'כי-תשא']],
  [22, ['vayakhel', 'ваякель', 'ויקהל']],
  [23, ['pekudei', 'пкудей', 'פקודי']],
  [24, ['vayikra', 'ваикра', 'ויקרא']],
  [25, ['tzav', 'цав', 'צו']],
  [26, ['shmini', 'шмини', 'שמיני']],
  [27, ['tazria', 'тазриа', 'תזריע']],
  [28, ['metzora', 'мецора', 'מצורע']],
  [29, ['achrei mot', 'ахарей мот', 'אחרי מות', 'אחרי-מות']],
  [30, ['kedoshim', 'кдошим', 'קדושים']],
  [31, ['emor', 'эмор', 'אמור']],
  [32, ['behar', 'бехар', 'בהר']],
  [33, ['bechukotai', 'бехукотай', 'בחוקותי', 'בחקותי']],
  [34, ['bamidbar', 'бамидбар', 'במדבר']],
  [35, ['nasso', 'naso', 'насо', 'נשא']],
  [36, ['behaalotcha', 'беаалотха', 'בהעלותך']],
  [37, ['shlach', 'shelach', 'shelach-lecha', 'шлах', 'שלח']],
  [38, ['korach', 'корах', 'קרח']],
  [39, ['chukat', 'хукат', 'חקת', 'חוקת']],
  [40, ['balak', 'балак', 'בלק']],
  [41, ['pinchas', 'пинхас', 'פינחס']],
  [42, ['matot', 'матот', 'מטות']],
  [43, ['masei', 'масей', 'מסעי']],
  [44, ['devarim', 'дварим', 'דברים']],
  [45, ['vaetchanan', 'ваэтханан', 'ואתחנן']],
  [46, ['eikev', 'экев', 'עקב']],
  [47, ["re'eh", 'reeh', 're eh', 'реэ', 'ראה']],
  [48, ['shoftim', 'шофтим', 'שופטים']],
  [49, ['ki teitzei', 'ки теце', 'כי תצא']],
  [50, ['ki tavo', 'ки таво', 'כי תבוא']],
  [51, ['nitzavim', 'ницавим', 'נצבים', 'ניצבים']],
  [52, ['vayeilech', 'ваелех', 'וילך']],
  [53, ['haazinu', 'аазину', 'האזינו']],
  [54, ['vezot habracha', 'везот габраха', 'וזאת הברכה']],
]);

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

function normalizeTitle(v) {
  return (v || '')
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[_\-–—]+/g, ' ')
    .replace(/[^a-z0-9а-яёא-ת\s]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function detectParsha(title) {
  const t = normalizeTitle(title);
  for (const [id, aliases] of PARSHA_MAP.entries()) {
    if (aliases.some((a) => t.includes(normalizeTitle(a)))) return id;
  }
  return null;
}

function detectIssueNumber(name) {
  const direct = name.match(/(?:№|#|\bno\.?|\bn\.?|\bissue\b)\s*([0-9]{1,4})/i);
  if (direct) return direct[1];

  const nums = [...name.matchAll(/\b([0-9]{1,4})\b/g)].map((m) => Number(m[1]));
  const candidate = nums.find((n) => n > 0 && n < 2000 && n !== 5782 && n !== 5783 && n !== 5784 && n !== 5785 && n !== 5786);
  return candidate ? String(candidate) : null;
}

function detectDate(fileName, stat) {
  const n = fileName;
  let m = n.match(/\b(20\d{2})[._-](0?[1-9]|1[0-2])[._-](0?[1-9]|[12]\d|3[01])\b/);
  if (m) return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;

  m = n.match(/\b(0?[1-9]|[12]\d|3[01])[._-](0?[1-9]|1[0-2])[._-](20\d{2})\b/);
  if (m) return `${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;

  const d = new Date(stat.mtimeMs);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isArchiveAggregate(title, fileName, fileSize) {
  const t = normalizeTitle(`${title} ${fileName}`);
  if (fileSize > 200 * 1024 * 1024) return true;
  if (t.includes('archiv') || t.includes('архив')) return true;
  if (/(\\b\\d{1,4}\\s*[-–]\\s*\\d{1,4}\\b)/.test(t)) return true;
  return false;
}

function walkPdfs(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkPdfs(full, acc);
    } else if (e.isFile() && /\.pdf$/i.test(e.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function sha256File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

function sanitizePathPart(v) {
  return (v || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120) || 'file';
}

async function sb(pathname, options = {}) {
  const res = await fetch(`${SUPABASE_URL}${pathname}`, {
    method: options.method || 'GET',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const txt = await res.text();
  const data = txt ? (() => { try { return JSON.parse(txt); } catch { return txt; } })() : null;
  if (!res.ok) {
    throw new Error(`Supabase ${res.status} ${pathname}: ${typeof data === 'string' ? data : JSON.stringify(data)}`);
  }
  return data;
}

async function getAdminUserId() {
  const rows = await sb('/rest/v1/profiles?select=id,role,created_at&role=in.(admin,editor)&order=created_at.asc&limit=1');
  if (rows?.[0]?.id) return rows[0].id;
  const fallback = await sb('/rest/v1/profiles?select=id,created_at&order=created_at.asc&limit=1');
  if (!fallback?.[0]?.id) throw new Error('No profiles found for uploaded_by');
  return fallback[0].id;
}

async function issueHasLanguageColumn() {
  try {
    await sb('/rest/v1/issues?select=language&limit=1');
    return true;
  } catch {
    return false;
  }
}

function publicationNameScore(pub, folder) {
  const title = `${pub.title_ru || ''} ${pub.title_en || ''} ${pub.title_he || ''}`.toLowerCase();
  let score = 0;
  if (title.includes('chevrutah')) score += 2;
  if (folder.code === 'eng' && (pub.primary_language === 'en' || title.includes('english'))) score += 3;
  if (folder.code === 'rus' && (pub.primary_language === 'ru' || title.includes('рус') || title.includes('russian'))) score += 3;
  if (folder.code === 'kids' && (title.includes('kids') || title.includes('дет'))) score += 4;
  return score;
}

async function resolvePublication(folder, createdBy) {
  const pubs = await sb('/rest/v1/publications?select=id,title_ru,title_en,title_he,primary_language,is_active&is_active=eq.true&limit=2000');
  let best = null;
  for (const p of pubs) {
    const s = publicationNameScore(p, folder);
    if (!best || s > best.score) best = { pub: p, score: s };
  }

  if (best && best.score >= 4) {
    log(`Publication match for ${folder.dir}: ${best.pub.id}`);
    return best.pub.id;
  }

  const created = await sb('/rest/v1/publications', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: {
      title_ru: folder.pubRu,
      title_en: folder.pubEn,
      frequency: 'weekly',
      primary_language: folder.lang,
      created_by: createdBy,
      is_active: true,
    },
  });

  log(`Publication created for ${folder.dir}: ${created?.[0]?.id || 'unknown'}`);
  return created?.[0]?.id;
}

async function preloadExistingIssues(publicationId) {
  const out = [];
  let from = 0;
  while (true) {
    const to = from + 999;
    const rows = await sb(`/rest/v1/issues?select=id,title,issue_number,gregorian_date,pdf_filename,is_active,created_at,publication_id&publication_id=eq.${publicationId}&is_active=eq.true&order=created_at.desc`, {
      headers: {
        Range: `${from}-${to}`,
        Prefer: 'count=exact',
      },
    });
    if (!rows?.length) break;
    out.push(...rows);
    if (rows.length < 1000) break;
    from += 1000;
  }
  return out;
}

async function buildMeta(filePath, folderCode) {
  const stat = fs.statSync(filePath);
  const base = path.basename(filePath);
  const titleBase = base.replace(/\.pdf$/i, '').replace(/[_\-]+/g, ' ').trim();
  const title = titleBase;
  const issueNumber = detectIssueNumber(titleBase);
  const parshaId = detectParsha(titleBase);
  const gregorianDate = detectDate(titleBase, stat);
  const tooLarge = stat.size > MAX_FILE_MB * 1024 * 1024;
  const archiveAggregate = isArchiveAggregate(titleBase, base, stat.size);
  const hash = tooLarge ? null : await sha256File(filePath);
  return {
    filePath,
    folderCode,
    fileName: base,
    fileSize: stat.size,
    tooLarge,
    archiveAggregate,
    hash,
    title,
    normTitle: normalizeTitle(title),
    issueNumber,
    parshaId,
    gregorianDate,
  };
}

function makeExistingIndexes(rows) {
  const byTitle = new Set();
  const byIssueNumber = new Set();
  const byFileName = new Set();
  for (const r of rows) {
    byTitle.add(normalizeTitle(r.title || ''));
    if (r.issue_number) byIssueNumber.add(String(r.issue_number).trim());
    if (r.pdf_filename) byFileName.add(String(r.pdf_filename).toLowerCase());
  }
  return { byTitle, byIssueNumber, byFileName };
}

function tryExtractPageCount(filePath) {
  try {
    const out = execSync(`pdfinfo "${filePath.replace(/"/g, '\\"')}" 2>/dev/null | rg -n '^Pages:' | head -n 1 | sed -E 's/.*Pages:[[:space:]]*([0-9]+).*/\\1/'`, { encoding: 'utf8' }).trim();
    const n = Number(out);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

function generateLocalThumb(filePath) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'levi-thumb-'));
  const outPrefix = path.join(tmpDir, 'p');
  try {
    execSync(`pdftoppm -f 1 -l 1 -jpeg -r 120 "${filePath.replace(/"/g, '\\"')}" "${outPrefix}"`, { stdio: 'ignore' });
    const jpg = `${outPrefix}-1.jpg`;
    if (fs.existsSync(jpg)) return { tmpDir, jpg };
    return { tmpDir, jpg: null };
  } catch {
    return { tmpDir, jpg: null };
  }
}

async function uploadStorage(localPath, storagePath, contentType) {
  const buf = fs.readFileSync(localPath);
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/pdfs/${storagePath}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': contentType,
      'x-upsert': 'false',
    },
    body: buf,
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(`Storage upload failed ${res.status}: ${txt}`);
  return `${SUPABASE_URL}/storage/v1/object/public/pdfs/${storagePath}`;
}

async function phaseScan() {
  const all = [];
  for (const folder of FOLDERS) {
    const dir = path.join(ARCHIVE_ROOT, folder.dir);
    const files = walkPdfs(dir);
        for (const f of files) all.push(await buildMeta(f, folder.code));
  }

  const byHash = new Map();
  const duplicatesLocal = [];
  for (const item of all) {
    if (!item.hash) continue;
    if (byHash.has(item.hash)) {
      duplicatesLocal.push({ first: byHash.get(item.hash).filePath, second: item.filePath, hash: item.hash });
    } else {
      byHash.set(item.hash, item);
    }
  }

  const parshaMissing = all.filter((x) => !x.parshaId).length;
  const byFolder = FOLDERS.map((f) => {
    const items = all.filter((x) => x.folderCode === f.code);
    return {
      folder: f.dir,
      count: items.length,
      withParsha: items.filter((x) => !!x.parshaId).length,
      withoutParsha: items.filter((x) => !x.parshaId).length,
    };
  });

  const report = {
    scannedAt: new Date().toISOString(),
    totalPdf: all.length,
    tooLargeSkippedByDefault: all.filter((x) => x.tooLarge).length,
    archiveAggregateDetected: all.filter((x) => x.archiveAggregate).length,
    localDuplicatesByHash: duplicatesLocal.length,
    parshaMissing,
    folders: byFolder,
    sampleMissingParsha: all.filter((x) => !x.parshaId).slice(0, 80).map((x) => ({ filePath: x.filePath, title: x.title })),
    sampleTooLarge: all.filter((x) => x.tooLarge).slice(0, 40).map((x) => ({ filePath: x.filePath, fileSize: x.fileSize })),
    sampleDuplicates: duplicatesLocal.slice(0, 80),
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  log(`Scan complete. Total PDF: ${all.length}`);
  log(`Local duplicate files (same hash): ${duplicatesLocal.length}`);
  log(`No parsha detected: ${parshaMissing}`);
  log(`Report: ${REPORT_PATH}`);
}

async function phaseImport() {
  const createdBy = await getAdminUserId();
  const hasLanguage = await issueHasLanguageColumn();
  const publicationByFolder = {};

  for (const folder of FOLDERS) {
    publicationByFolder[folder.code] = await resolvePublication(folder, createdBy);
  }

  const existingByPub = {};
  const existingIdxByPub = {};
  for (const folder of FOLDERS) {
    const pubId = publicationByFolder[folder.code];
    const existing = await preloadExistingIssues(pubId);
    existingByPub[pubId] = existing;
    existingIdxByPub[pubId] = makeExistingIndexes(existing);
    log(`Preloaded issues for pub ${pubId}: ${existing.length}`);
  }

  const all = [];
  for (const folder of FOLDERS) {
    const dir = path.join(ARCHIVE_ROOT, folder.dir);
    const files = walkPdfs(dir);
    for (const f of files) all.push(await buildMeta(f, folder.code));
  }

  all.sort((a, b) => a.filePath.localeCompare(b.filePath, 'ru'));

  const seenHash = new Set();
  let processed = 0;
  let inserted = 0;
  let skipped = 0;
  let failed = 0;

  const rowsLog = [];

  for (const item of all) {
    if (LIMIT && processed >= LIMIT) break;
    processed += 1;

    const folder = FOLDERS.find((f) => f.code === item.folderCode);
    const pubId = publicationByFolder[item.folderCode];
    const idx = existingIdxByPub[pubId];

    let skipReason = null;
    if (item.archiveAggregate) skipReason = 'archive_aggregate_file';
    if (!skipReason && item.tooLarge) skipReason = `too_large_over_${MAX_FILE_MB}mb`;
    if (seenHash.has(item.hash)) skipReason = 'local_hash_duplicate';
    if (!skipReason && idx.byFileName.has(item.fileName.toLowerCase())) skipReason = 'existing_same_pdf_filename';
    if (!skipReason && idx.byTitle.has(item.normTitle)) skipReason = 'existing_same_title';
    if (!skipReason && item.issueNumber && idx.byIssueNumber.has(String(item.issueNumber))) skipReason = 'existing_same_issue_number';

    if (skipReason) {
      skipped += 1;
      rowsLog.push({ status: 'skipped', reason: skipReason, filePath: item.filePath, title: item.title });
      continue;
    }

    seenHash.add(item.hash);

    const safeFile = sanitizePathPart(item.fileName);
    const storagePdfPath = `imports/levi/${item.folderCode}/${safeFile}`;

    try {
      if (!APPLY) {
        rowsLog.push({ status: 'planned', filePath: item.filePath, title: item.title, pubId, parshaId: item.parshaId, date: item.gregorianDate });
        inserted += 1;
        continue;
      }

      const pdfUrl = await uploadStorage(item.filePath, storagePdfPath, 'application/pdf');

      let thumbUrl = null;
      const thumb = generateLocalThumb(item.filePath);
      if (thumb.jpg) {
        const thumbPath = `thumbnails/levi/${item.folderCode}/${safeFile.replace(/\.pdf$/i, '.jpg')}`;
        thumbUrl = await uploadStorage(thumb.jpg, thumbPath, 'image/jpeg');
      }
      try { fs.rmSync(thumb.tmpDir, { recursive: true, force: true }); } catch {}

      const insertBody = {
        publication_id: pubId,
        title: item.title,
        issue_number: item.issueNumber,
        gregorian_date: item.gregorianDate,
        parsha_id: item.parshaId,
        pdf_url: pdfUrl,
        pdf_filename: item.fileName,
        file_size: item.fileSize,
        page_count: tryExtractPageCount(item.filePath),
        thumbnail_url: thumbUrl,
        uploaded_by: createdBy,
        is_active: true,
      };
      if (hasLanguage) insertBody.language = folder.lang;

      const insertedRows = await sb('/rest/v1/issues', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: insertBody,
      });

      idx.byTitle.add(item.normTitle);
      if (item.issueNumber) idx.byIssueNumber.add(String(item.issueNumber));
      idx.byFileName.add(item.fileName.toLowerCase());

      inserted += 1;
      rowsLog.push({ status: 'inserted', id: insertedRows?.[0]?.id || null, filePath: item.filePath, pubId, title: item.title });
      log(`[${processed}] inserted: ${item.fileName}`);
    } catch (err) {
      if (String(err).includes('Payload too large') || String(err).includes('\"413\"') || String(err).includes(' 413 ')) {
        skipped += 1;
        rowsLog.push({ status: 'skipped', reason: 'storage_payload_too_large', filePath: item.filePath, title: item.title });
        log(`[${processed}] skipped large for storage: ${item.fileName}`);
        continue;
      }
      failed += 1;
      rowsLog.push({ status: 'failed', filePath: item.filePath, error: String(err) });
      log(`[${processed}] failed: ${item.fileName} :: ${err.message}`);
    }
  }

  const report = {
    importedAt: new Date().toISOString(),
    apply: APPLY,
    processed,
    inserted,
    skipped,
    failed,
    rows: rowsLog,
  };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  log(`Import done. processed=${processed} inserted=${inserted} skipped=${skipped} failed=${failed}`);
  log(`Report: ${REPORT_PATH}`);
}

(async () => {
  try {
    if (PHASE === 'scan') await phaseScan();
    else if (PHASE === 'import') await phaseImport();
    else {
      console.log('Usage:');
      console.log('  node import-levi-archive.mjs scan');
      console.log('  node import-levi-archive.mjs import --limit=20');
      console.log('  node import-levi-archive.mjs import --apply --limit=20');
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
