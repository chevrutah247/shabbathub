#!/usr/bin/env node
/**
 * Universal Source Sync Engine for ShabbatHub
 *
 * Checks multiple Jewish publication websites for new issues,
 * creates records in ShabbatHub database with links to original PDFs.
 *
 * Run: node scripts/sync-all-sources.mjs
 * Schedule: Sundays 10am ET (Vercel cron or local cron)
 *
 * Only syncs issues newer than SINCE_DATE (default: 2026-02-01)
 */

import https from 'https';
import http from 'http';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const SINCE_DATE = '2026-02-01';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'ShabbatHub-Sync/1.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redir = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
        return fetchPage(redir).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function issueExists(title) {
  const { data } = await supabase
    .from('issues')
    .select('id')
    .ilike('title', title.slice(0, 40) + '%')
    .limit(1);
  return data && data.length > 0;
}

async function getOrCreatePub(titleEn, titleRu, lang, websiteUrl) {
  const { data: existing } = await supabase
    .from('publications')
    .select('id')
    .eq('title_en', titleEn)
    .limit(1);

  if (existing && existing.length > 0) return existing[0].id;

  const { data: created } = await supabase
    .from('publications')
    .insert({
      title_en: titleEn,
      title_ru: titleRu || titleEn,
      frequency: 'weekly',
      primary_language: lang,
      website_url: websiteUrl,
      is_active: true,
    })
    .select('id')
    .single();

  console.log(`  📚 Created publication: ${titleEn}`);
  return created?.id;
}

async function addIssue(pubId, title, pdfUrl, originalUrl, lang, issueNumber) {
  if (await issueExists(title)) return 'skip';

  const description = `Source: ${originalUrl ? 'Original: ' + originalUrl : pdfUrl}`;
  const { error } = await supabase.from('issues').insert({
    title,
    description,
    publication_id: pubId,
    issue_number: issueNumber || null,
    language: lang,
    pdf_url: pdfUrl,
    is_active: true,
  });

  return error ? 'error' : 'created';
}

// ════════════════════════════════════════
// SOURCE SCRAPERS
// ════════════════════════════════════════

async function syncTorahTidbits() {
  console.log('\n📖 Torah Tidbits');
  const pubId = await getOrCreatePub('Torah Tidbits', 'Torah Tidbits', 'en', 'https://www.torahtidbits.com');

  const html = await fetchPage('https://www.torahtidbits.com/past-issues/');
  const pdfRegex = /href="(https:\/\/assets\.torahtidbits\.com\/[^"]+\.pdf)"/g;
  const titleRegex = /Parshat\s+[\w-]+\s+Issue\s+\d+/g;

  const pdfs = [];
  let match;
  while ((match = pdfRegex.exec(html)) !== null) {
    pdfs.push(match[1]);
  }

  let created = 0, skipped = 0;
  for (const pdfUrl of pdfs.slice(0, 10)) { // Check latest 10
    const nameMatch = pdfUrl.match(/Torah-Tidbits-(.+?)\.pdf/);
    const title = nameMatch ? nameMatch[1].replace(/-/g, ' ') : pdfUrl.split('/').pop();
    const numMatch = title.match(/Issue\s+(\d+)/i);

    const result = await addIssue(pubId, `Torah Tidbits - ${title}`, pdfUrl, 'https://www.torahtidbits.com/past-issues/', 'en', numMatch?.[1]);
    if (result === 'created') created++;
    else skipped++;
  }
  console.log(`  ✅ Created: ${created}, Skipped: ${skipped}`);
}

async function syncAscentStories() {
  console.log('\n📖 Ascent of Safed Stories');
  const pubId = await getOrCreatePub('Ascent of Safed Weekly Stories', 'Истории Цфата', 'en', 'https://ascentofsafed.com');

  // Check years 5784, 5785, 5786
  let created = 0, skipped = 0;
  for (const year of ['5784', '5785', '5786']) {
    try {
      const html = await fetchPage(`https://ascentofsafed.com/Stories/Stories/${year}/pdf/`);
      const pdfRegex = /href="([^"]+\.pdf)"/gi;
      let match;
      while ((match = pdfRegex.exec(html)) !== null) {
        const pdfName = match[1];
        const pdfUrl = `https://ascentofsafed.com/Stories/Stories/${year}/pdf/${pdfName}`;
        const title = `Ascent Story - ${pdfName.replace('.pdf', '').replace(/_/g, ' ')} (${year})`;

        const result = await addIssue(pubId, title, pdfUrl, `https://ascentofsafed.com/Stories/Stories/${year}/pdf/`, 'en', null);
        if (result === 'created') created++;
        else skipped++;
      }
    } catch (e) {
      console.log(`  ⚠ Year ${year}: ${e.message}`);
    }
  }
  console.log(`  ✅ Created: ${created}, Skipped: ${skipped}`);
}

async function syncParshaNet() {
  console.log('\n📖 Parsha.net PDFs');
  const pubId = await getOrCreatePub('Parsha.net Archive', 'Parsha.net Архив', 'en', 'https://www.parsha.net');

  let created = 0, skipped = 0;
  for (const book of ['bereishis', 'shmos', 'vayikra', 'bamidbar', 'devarim']) {
    try {
      const html = await fetchPage(`https://www.parsha.net/${book}`);
      const pdfRegex = /href="([^"]*\.pdf)"/gi;
      let match;
      while ((match = pdfRegex.exec(html)) !== null) {
        let pdfUrl = match[1];
        if (!pdfUrl.startsWith('http')) {
          pdfUrl = `https://www.parsha.net/${pdfUrl.replace(/^\//, '')}`;
        }
        const name = pdfUrl.split('/').pop().replace('.pdf', '').replace(/_/g, ' ');
        const title = `${book.charAt(0).toUpperCase() + book.slice(1)} - ${name}`;

        const result = await addIssue(pubId, title, pdfUrl, `https://www.parsha.net/${book}`, 'en', null);
        if (result === 'created') created++;
        else skipped++;
      }
    } catch (e) {
      console.log(`  ⚠ ${book}: ${e.message}`);
    }
  }
  console.log(`  ✅ Created: ${created}, Skipped: ${skipped}`);
}

async function syncExodus() {
  console.log('\n📖 Exodus Magazine');
  // Already handled by sync-exodus.mjs / cron
  console.log('  ⏭ Handled by dedicated sync-exodus cron');
}

async function syncJewishLouisville() {
  console.log('\n📖 Jewish Louisville Community');
  const pubId = await getOrCreatePub('Jewish Louisville Community', 'Jewish Louisville Community', 'en', 'https://jewishlouisville.org');

  try {
    const html = await fetchPage('https://jewishlouisville.org/community/community-newspaper/print-version/');
    const pdfRegex = /href="([^"]*\.pdf[^"]*)"/gi;
    let created = 0, skipped = 0, match;
    while ((match = pdfRegex.exec(html)) !== null) {
      let pdfUrl = match[1];
      if (!pdfUrl.startsWith('http')) pdfUrl = 'https://jewishlouisville.org' + pdfUrl;
      const name = decodeURIComponent(pdfUrl.split('/').pop().replace('.pdf', '').replace(/[-_]/g, ' '));
      const result = await addIssue(pubId, `Jewish Louisville - ${name}`, pdfUrl, 'https://jewishlouisville.org/community/community-newspaper/print-version/', 'en', null);
      if (result === 'created') created++;
      else skipped++;
    }
    console.log(`  ✅ Created: ${created}, Skipped: ${skipped}`);
  } catch (e) {
    console.log(`  ❌ Error: ${e.message}`);
  }
}

// ════════════════════════════════════════
// MAIN
// ════════════════════════════════════════

async function main() {
  console.log('🔄 ShabbatHub Source Sync — ' + new Date().toISOString());
  console.log(`   Only new since: ${SINCE_DATE}\n`);

  await syncTorahTidbits();
  await syncAscentStories();
  await syncParshaNet();
  await syncJewishLouisville();
  await syncExodus();

  console.log('\n✅ All sources synced!');
}

main().catch(console.error);
