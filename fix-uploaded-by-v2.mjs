#!/usr/bin/env node
/**
 * Fix uploaded_by v2 — aggressive title matching for remaining 431 unmatched docs
 *
 * Tries multiple normalization strategies:
 * 1. Strip HTML entities (&#8221; etc.)
 * 2. Remove RTL/LTR markers and zero-width chars
 * 3. Remove underscores/dashes
 * 4. Fuzzy: ignore trailing year like "5786" or "5785"
 * 5. Fuzzy: match by first N significant words
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const content = readFileSync(resolve(__dirname, '.env.local'), 'utf-8');
  const vars = {};
  content.split('\n').forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) vars[m[1].trim()] = m[2].trim().replace(/^"|"$/g, '');
  });
  return vars;
}

const env = loadEnv();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const WP_TO_SUPABASE = {
  11: '12f5646a-f7c6-45e6-868d-7cbca2b15050',
  1:  'd1b8cc7a-2887-41de-b44c-12ca27009a1a',
  14: '820cca46-3ccf-4352-8e7f-bbd41490d174',
  3:  '45ed17af-7ec0-409c-9008-77cea6b9d0e1',
  10: '8e3c14e3-8fdb-415c-a5aa-d53f98f6b620',
  20: 'ed016538-7278-4eb9-9133-08bd2b0d58b9',
  12: 'a3665696-64ab-439a-b650-c43668ff56ef',
};

const AUTHOR_NAMES = { 11: 'Eli', 1: 'adminSH', 14: 'Alex', 3: 'Levi', 10: 'Dmytro', 20: 'Beerot', 12: 'Eliezer' };

// HTML entity decode
function decodeEntities(s) {
  const entities = {
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'",
    '&#8220;': '"', '&#8221;': '"', '&#8216;': "'", '&#8217;': "'",
    '&#8211;': '-', '&#8212;': '-', '&ndash;': '-', '&mdash;': '-',
    '&laquo;': '«', '&raquo;': '»', '&#171;': '«', '&#187;': '»',
    '&nbsp;': ' ',
  };
  let result = s;
  for (const [ent, ch] of Object.entries(entities)) {
    result = result.split(ent).join(ch);
  }
  // Numeric entities
  result = result.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)));
  result = result.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
  return result;
}

function normalizeV1(s) {
  return decodeEntities(s || '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u200e\u200f\u2068\u2069\u200b\u200c\u200d\u00ad\ufeff]/g, '')
    .replace(/[\u05f3\u05f4]/g, "'") // Hebrew geresh/gershayim → apostrophe
    .replace(/[""״]/g, '"')
    .replace(/[''׳]/g, "'")
    .replace(/[«»]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Even more aggressive — remove all punctuation
function normalizeV2(s) {
  return normalizeV1(s)
    .replace(/[_\-–—]/g, ' ')
    .replace(/[^\w\s\u0400-\u04ff\u0590-\u05ff]/g, '') // keep only letters, digits, cyrillic, hebrew
    .replace(/\s+/g, ' ')
    .trim();
}

// Remove trailing year pattern (5786, 5785, 2024, 2025, etc.)
function normalizeNoYear(s) {
  return normalizeV2(s)
    .replace(/\s*(5\d{3}|20\d{2})\s*$/g, '')
    .trim();
}

async function fetchAllIssues() {
  const all = [];
  let from = 0;
  console.log('Fetching Supabase issues...');
  while (true) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/issues?select=id,title,uploaded_by&is_active=eq.true&order=id.asc&offset=${from}&limit=1000`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
    });
    const issues = await res.json();
    if (!issues.length) break;
    all.push(...issues);
    if ((from + 1000) % 5000 === 0) console.log(`  ${all.length}...`);
    if (issues.length < 1000) break;
    from += 1000;
  }
  console.log(`Total: ${all.length}\n`);
  return all;
}

async function updateUploadedBy(issueId, newUploadedBy) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/issues?id=eq.${issueId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json', 'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ uploaded_by: newUploadedBy }),
  });
  return res.ok;
}

async function main() {
  console.log('=== Fix uploaded_by v2 — Aggressive Matching ===\n');

  const wpDocs = JSON.parse(readFileSync('/tmp/wp_docs_all.json', 'utf-8'));
  const issues = await fetchAllIssues();

  // Build multiple lookup maps
  const mapV1 = new Map();
  const mapV2 = new Map();
  const mapNoYear = new Map();

  for (const issue of issues) {
    const k1 = normalizeV1(issue.title);
    const k2 = normalizeV2(issue.title);
    const k3 = normalizeNoYear(issue.title);
    if (k1 && !mapV1.has(k1)) mapV1.set(k1, issue);
    if (k2 && !mapV2.has(k2)) mapV2.set(k2, issue);
    if (k3 && !mapNoYear.has(k3)) mapNoYear.set(k3, issue);
  }

  console.log(`Lookups: V1=${mapV1.size}, V2=${mapV2.size}, NoYear=${mapNoYear.size}\n`);

  const updates = [];
  const unmatched = [];
  let alreadyCorrect = 0;
  let matchedV1 = 0, matchedV2 = 0, matchedNoYear = 0;

  for (const doc of wpDocs) {
    const supabaseId = WP_TO_SUPABASE[doc.author];
    if (!supabaseId) { unmatched.push({ wpId: doc.id, title: doc.title?.rendered, reason: 'unknown_author' }); continue; }

    const raw = doc.title?.rendered || '';

    // Try V1 (improved entity decode)
    let issue = mapV1.get(normalizeV1(raw));
    let matchType = 'v1';

    // Try V2 (no punctuation)
    if (!issue) { issue = mapV2.get(normalizeV2(raw)); matchType = 'v2'; }

    // Try NoYear
    if (!issue) { issue = mapNoYear.get(normalizeNoYear(raw)); matchType = 'noYear'; }

    if (!issue) {
      unmatched.push({ wpId: doc.id, title: raw, reason: 'no_match' });
      continue;
    }

    if (issue.uploaded_by === supabaseId) {
      alreadyCorrect++;
      continue;
    }

    if (matchType === 'v1') matchedV1++;
    else if (matchType === 'v2') matchedV2++;
    else matchedNoYear++;

    updates.push({ issueId: issue.id, newUploadedBy: supabaseId, wpAuthor: doc.author });
  }

  console.log('=== Results ===');
  console.log(`  Need update: ${updates.length} (v1: ${matchedV1}, v2: ${matchedV2}, noYear: ${matchedNoYear})`);
  console.log(`  Already correct: ${alreadyCorrect}`);
  console.log(`  Still unmatched: ${unmatched.length}\n`);

  const byAuthor = {};
  for (const u of updates) byAuthor[u.wpAuthor] = (byAuthor[u.wpAuthor] || 0) + 1;
  for (const [aid, cnt] of Object.entries(byAuthor)) {
    console.log(`  ${AUTHOR_NAMES[aid] || aid}: ${cnt} to reassign`);
  }

  // Count unmatched by author
  const unmatchedByAuthor = {};
  for (const u of unmatched) {
    const wpDoc = wpDocs.find(d => d.id === u.wpId);
    if (wpDoc) unmatchedByAuthor[wpDoc.author] = (unmatchedByAuthor[wpDoc.author] || 0) + 1;
  }
  console.log('\nUnmatched by WP author:');
  for (const [aid, cnt] of Object.entries(unmatchedByAuthor)) {
    console.log(`  ${AUTHOR_NAMES[aid] || aid}: ${cnt} not found in Supabase`);
  }

  if (unmatched.length > 0) {
    writeFileSync('fix-uploaded-by-unmatched-v2.json', JSON.stringify(unmatched, null, 2));
    console.log(`\nSaved all ${unmatched.length} unmatched to fix-uploaded-by-unmatched-v2.json`);
  }

  if (updates.length === 0) { console.log('\nNothing to update!'); return; }

  console.log(`\nApplying ${updates.length} updates...`);
  let success = 0, failed = 0;
  for (let i = 0; i < updates.length; i++) {
    const ok = await updateUploadedBy(updates[i].issueId, updates[i].newUploadedBy);
    if (ok) success++; else failed++;
    if ((i + 1) % 100 === 0 || i === updates.length - 1)
      console.log(`  ${i + 1}/${updates.length} (ok: ${success}, fail: ${failed})`);
  }

  console.log(`\n=== Done ===`);
  console.log(`  Updated: ${success}, Failed: ${failed}`);
  console.log(`  Already correct: ${alreadyCorrect}`);
  console.log(`  Unmatched: ${unmatched.length}`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
