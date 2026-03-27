#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const ARGS = new Set(process.argv.slice(2));
const DRY_RUN = ARGS.has('--dry-run');
const LIMIT_ARG = process.argv.find((arg) => arg.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? Number(LIMIT_ARG.split('=')[1]) : 300;
const EVENT_ARG = process.argv.find((arg) => arg.startsWith('--event='));
const EVENT_FILTER = EVENT_ARG ? String(EVENT_ARG.split('=')[1] || '').trim().toLowerCase() : '';

function loadDotEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex <= 0) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadDotEnvLocal();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'pdfs';
const LOCAL_MIGRATION_DIR = path.join(process.cwd(), 'temp_migration');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)');
  process.exit(1);
}

function assertPdfToPpm() {
  try {
    execSync('which pdftoppm', { stdio: 'pipe' });
  } catch {
    console.error('pdftoppm not found. Install poppler first: brew install poppler');
    process.exit(1);
  }
}

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

async function restGet(query) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`GET ${query} failed: ${await res.text()}`);
  return res.json();
}

async function restPatch(query, payload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    method: 'PATCH',
    headers: { ...HEADERS, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`PATCH ${query} failed: ${await res.text()}`);
}

function getGoogleDriveThumbFromPdfUrl(url) {
  if (!url) return null;
  if (!url.includes('drive.google.com') && !url.includes('docs.google.com')) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`;
}

async function resolveEventIdsByName(token) {
  if (!token) return [];
  const safe = encodeURIComponent(`*${token}*`);
  const rows = await restGet(
    `events?is_active=eq.true&select=id,name_ru,name_en,name_he&or=(name_ru.ilike.${safe},name_en.ilike.${safe},name_he.ilike.${safe})&limit=30`
  );
  if (!Array.isArray(rows)) return [];
  return rows.map((x) => x.id).filter(Boolean);
}

async function storageUpload(objectPath, buffer, contentType) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${objectPath}`, {
    method: 'POST',
    headers: { ...HEADERS, 'Content-Type': contentType, 'x-upsert': 'true' },
    body: buffer,
  });
  if (!res.ok) throw new Error(`Upload ${objectPath} failed: ${await res.text()}`);
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${objectPath}`;
}

async function fetchIssuesMissingThumbs(limit, eventIds = []) {
  const eventFilter = eventIds.length > 0 ? `&event_id=in.(${eventIds.join(',')})` : '';
  const nullThumb = await restGet(
    `issues?is_active=eq.true&thumbnail_url=is.null&pdf_url=not.is.null${eventFilter}&select=id,title,pdf_url&order=created_at.desc&limit=${limit}`
  );
  const emptyThumb = await restGet(
    `issues?is_active=eq.true&thumbnail_url=eq.&pdf_url=not.is.null${eventFilter}&select=id,title,pdf_url&order=created_at.desc&limit=${limit}`
  );
  const map = new Map();
  for (const item of [...(nullThumb || []), ...(emptyThumb || [])]) map.set(item.id, item);
  return Array.from(map.values()).slice(0, limit);
}

async function fetchPublicationsMissingCovers(limit) {
  const nullCover = await restGet(
    `publications?is_active=eq.true&cover_image_url=is.null&select=id,title_ru,title_en,title_he&order=created_at.desc&limit=${limit}`
  );
  const emptyCover = await restGet(
    `publications?is_active=eq.true&cover_image_url=eq.&select=id,title_ru,title_en,title_he&order=created_at.desc&limit=${limit}`
  );
  const map = new Map();
  for (const item of [...(nullCover || []), ...(emptyCover || [])]) map.set(item.id, item);
  return Array.from(map.values()).slice(0, limit);
}

function isLikelyPdf(buffer) {
  if (!buffer || buffer.length < 512) return false;
  return buffer.subarray(0, 20).toString('utf8').includes('%PDF');
}

function normalizeString(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/&#\d+;/g, ' ')
    .replace(/[^a-z0-9а-яёא-ת]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenScore(a, b) {
  const ta = new Set(normalizeString(a).split(' ').filter((x) => x.length > 2));
  const tb = new Set(normalizeString(b).split(' ').filter((x) => x.length > 2));
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  return inter / Math.max(ta.size, tb.size);
}

function tryFindLocalPdf(issueTitle, issuePdfUrl) {
  if (!fs.existsSync(LOCAL_MIGRATION_DIR)) return null;
  const files = fs.readdirSync(LOCAL_MIGRATION_DIR).filter((f) => f.toLowerCase().endsWith('.pdf'));

  if (issuePdfUrl) {
    try {
      const url = new URL(issuePdfUrl);
      const filename = decodeURIComponent(url.pathname.split('/').pop() || '');
      const withoutExt = filename.replace(/\.pdf$/i, '');
      const directBase = withoutExt.replace(/-\d{13}$/, '') + '.pdf';
      const directPath = path.join(LOCAL_MIGRATION_DIR, directBase);
      if (fs.existsSync(directPath)) {
        const data = fs.readFileSync(directPath);
        if (isLikelyPdf(data)) return { filename: directBase, buffer: data };
      }
    } catch {
      // no-op
    }
  }

  let best = null;
  let bestScore = 0;
  const titleNorm = normalizeString(issueTitle);
  const strongTokens = titleNorm.split(' ').filter((t) => t.length >= 4);

  for (const filename of files) {
    const score = tokenScore(issueTitle, filename.replace('.pdf', ''));
    let relaxedScore = score;
    if (strongTokens.length > 0) {
      const nameNorm = normalizeString(filename.replace('.pdf', ''));
      let matches = 0;
      for (const token of strongTokens) {
        if (nameNorm.includes(token)) matches++;
      }
      relaxedScore = Math.max(relaxedScore, matches / strongTokens.length);
    }
    if (relaxedScore > bestScore) {
      bestScore = relaxedScore;
      best = filename;
    }
  }
  if (!best || bestScore < 0.18) return null;
  const fullPath = path.join(LOCAL_MIGRATION_DIR, best);
  const data = fs.readFileSync(fullPath);
  if (!isLikelyPdf(data)) return null;
  return { filename: best, buffer: data };
}

function createThumbnailBufferFromPdf(pdfBuffer) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shabbathub-thumb-'));
  const pdfPath = path.join(tempDir, 'src.pdf');
  const outPrefix = path.join(tempDir, 'page');
  fs.writeFileSync(pdfPath, pdfBuffer);
  try {
    execSync(`pdftoppm -f 1 -l 1 -jpeg -r 140 -scale-to 700 "${pdfPath}" "${outPrefix}"`, { stdio: 'pipe' });
  } catch {
    execSync(`pdftoppm -f 1 -l 1 -jpeg -r 110 "${pdfPath}" "${outPrefix}"`, { stdio: 'pipe' });
  }
  const files = fs.readdirSync(tempDir).filter((f) => f.startsWith('page') && f.endsWith('.jpg'));
  if (files.length === 0) throw new Error('pdftoppm did not produce jpg output');
  const buffer = fs.readFileSync(path.join(tempDir, files[0]));
  fs.rmSync(tempDir, { recursive: true, force: true });
  return buffer;
}

async function backfillIssueThumbnails(limit, eventIds = []) {
  assertPdfToPpm();
  const issues = await fetchIssuesMissingThumbs(limit, eventIds);
  console.log(`Issues without thumbnails: ${issues.length}`);
  let fixed = 0;
  let failed = 0;

  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    const label = `[issue ${i + 1}/${issues.length}]`;
    try {
      let pdfBuffer = null;
      let needPdfUrlReplace = false;
      const res = await fetch(issue.pdf_url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const downloaded = Buffer.from(await res.arrayBuffer());
        if (isLikelyPdf(downloaded)) pdfBuffer = downloaded;
      }

      if (!pdfBuffer) {
        const local = tryFindLocalPdf(issue.title, issue.pdf_url);
        if (!local) throw new Error('Downloaded file is not a valid PDF and no local fallback found');
        pdfBuffer = local.buffer;
        needPdfUrlReplace = true;
      }

      if (DRY_RUN) {
        console.log(`${label} would fix: ${issue.title}${needPdfUrlReplace ? ' (with local PDF fallback)' : ''}`);
        fixed++;
        continue;
      }

      const thumbBuffer = createThumbnailBufferFromPdf(pdfBuffer);
      let nextPdfUrl = null;
      if (needPdfUrlReplace) {
        const pdfPath = `uploads/${issue.id}.pdf`;
        nextPdfUrl = await storageUpload(pdfPath, pdfBuffer, 'application/pdf');
      }
      const objectPath = `thumbnails/${issue.id}.jpg`;
      const thumbUrl = await storageUpload(objectPath, thumbBuffer, 'image/jpeg');
      await restPatch(`issues?id=eq.${issue.id}`, nextPdfUrl ? { thumbnail_url: thumbUrl, pdf_url: nextPdfUrl } : { thumbnail_url: thumbUrl });
      console.log(`${label} fixed: ${issue.title}`);
      fixed++;
    } catch (err) {
      console.error(`${label} failed: ${issue.title} -> ${err.message}`);
      failed++;
    }
  }

  return { fixed, failed, total: issues.length };
}

async function backfillPublicationCovers(limit, eventIds = []) {
  const pubs = await fetchPublicationsMissingCovers(limit);
  console.log(`Publications without covers: ${pubs.length}`);
  let fixed = 0;
  let failed = 0;

  for (let i = 0; i < pubs.length; i++) {
    const pub = pubs[i];
    const label = `[pub ${i + 1}/${pubs.length}]`;
    const pubTitle = pub.title_ru || pub.title_en || pub.title_he || pub.id;
    try {
      const eventFilter = eventIds.length > 0 ? `&event_id=in.(${eventIds.join(',')})` : '';
      const issues = await restGet(
        `issues?publication_id=eq.${pub.id}&is_active=eq.true${eventFilter}&select=thumbnail_url,pdf_url&order=created_at.desc&limit=10`
      );
      const withThumb = Array.isArray(issues) ? issues.find((x) => x?.thumbnail_url && x.thumbnail_url.trim()) : null;
      const thumb = withThumb?.thumbnail_url || null;
      const driveFallback = !thumb && Array.isArray(issues)
        ? (issues.map((x) => getGoogleDriveThumbFromPdfUrl(x?.pdf_url)).find(Boolean) || null)
        : null;
      const cover = thumb || driveFallback;
      if (!cover) {
        console.log(`${label} skipped (no issue thumbnail): ${pubTitle}`);
        continue;
      }

      if (DRY_RUN) {
        console.log(`${label} would set cover: ${pubTitle}`);
        fixed++;
        continue;
      }

      await restPatch(`publications?id=eq.${pub.id}`, { cover_image_url: cover });
      console.log(`${label} fixed: ${pubTitle}`);
      fixed++;
    } catch (err) {
      console.error(`${label} failed: ${pubTitle} -> ${err.message}`);
      failed++;
    }
  }

  return { fixed, failed, total: pubs.length };
}

async function main() {
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Limit: ${LIMIT}`);
  if (EVENT_FILTER) console.log(`Event filter: ${EVENT_FILTER}`);
  const eventIds = EVENT_FILTER ? await resolveEventIdsByName(EVENT_FILTER) : [];
  if (EVENT_FILTER && eventIds.length === 0) {
    console.log(`No events found by filter "${EVENT_FILTER}"`);
  }
  const issueResult = await backfillIssueThumbnails(LIMIT, eventIds);
  const pubResult = await backfillPublicationCovers(LIMIT, eventIds);

  console.log('\nSummary');
  console.log(`Issue thumbnails: fixed=${issueResult.fixed}, failed=${issueResult.failed}, total=${issueResult.total}`);
  console.log(`Publication covers: fixed=${pubResult.fixed}, failed=${pubResult.failed}, total=${pubResult.total}`);
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
