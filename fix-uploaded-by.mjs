#!/usr/bin/env node
/**
 * Fix uploaded_by — match WordPress authors to Supabase issues by title
 *
 * Reads WP documents from /tmp/wp_docs_all.json (pre-downloaded)
 * Matches by normalized title to Supabase issues
 * Updates uploaded_by to correct author
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

// WP Author ID → Supabase Profile ID
const WP_TO_SUPABASE = {
  11: '12f5646a-f7c6-45e6-868d-7cbca2b15050', // Eli Sokolovskyi
  1:  'd1b8cc7a-2887-41de-b44c-12ca27009a1a',  // adminSH
  14: '820cca46-3ccf-4352-8e7f-bbd41490d174', // Alex Alex
  3:  '45ed17af-7ec0-409c-9008-77cea6b9d0e1',  // Levi Dombrovsky
  10: '8e3c14e3-8fdb-415c-a5aa-d53f98f6b620', // Dmytro Patlatyj
  20: 'ed016538-7278-4eb9-9133-08bd2b0d58b9', // Беерот Ицхак
  12: 'a3665696-64ab-439a-b650-c43668ff56ef', // Элиэзер Фрейдкин
};

const AUTHOR_NAMES = { 11: 'Eli', 1: 'adminSH', 14: 'Alex', 3: 'Levi', 10: 'Dmytro', 20: 'Beerot', 12: 'Eliezer' };

function normalize(s) {
  return (s || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .replace(/[\u200e\u200f\u2068\u2069\u200b\u00ad]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

async function fetchAllIssues() {
  const all = [];
  const pageSize = 1000;
  let from = 0;

  console.log('Fetching Supabase issues...');
  while (true) {
    const url = `${SUPABASE_URL}/rest/v1/issues?select=id,title,uploaded_by&is_active=eq.true&order=id.asc&offset=${from}&limit=${pageSize}`;
    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) throw new Error(`Supabase: ${res.status}`);
    const issues = await res.json();
    if (!issues.length) break;
    all.push(...issues);
    console.log(`  ${all.length} issues...`);
    if (issues.length < pageSize) break;
    from += pageSize;
  }
  console.log(`Total: ${all.length}\n`);
  return all;
}

async function updateUploadedBy(issueId, newUploadedBy) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/issues?id=eq.${issueId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ uploaded_by: newUploadedBy }),
  });
  return res.ok;
}

async function main() {
  console.log('=== Fix uploaded_by ===\n');

  // Load WP docs
  const wpDocs = JSON.parse(readFileSync('/tmp/wp_docs_all.json', 'utf-8'));
  console.log(`WP documents loaded: ${wpDocs.length}`);

  // Fetch Supabase issues
  const issues = await fetchAllIssues();

  // Build title → issue map
  const issueByTitle = new Map();
  for (const issue of issues) {
    const key = normalize(issue.title);
    if (key && !issueByTitle.has(key)) {
      issueByTitle.set(key, issue);
    }
  }
  console.log(`Title lookup: ${issueByTitle.size} unique titles\n`);

  // Match
  const updates = [];
  const unmatched = [];
  let alreadyCorrect = 0;

  for (const doc of wpDocs) {
    const supabaseId = WP_TO_SUPABASE[doc.author];
    if (!supabaseId) {
      unmatched.push({ wpId: doc.id, title: doc.title?.rendered, reason: 'unknown_author' });
      continue;
    }

    const key = normalize(doc.title?.rendered);
    const issue = issueByTitle.get(key);

    if (!issue) {
      unmatched.push({ wpId: doc.id, title: doc.title?.rendered, reason: 'no_match' });
      continue;
    }

    if (issue.uploaded_by === supabaseId) {
      alreadyCorrect++;
      continue;
    }

    updates.push({ issueId: issue.id, newUploadedBy: supabaseId, wpAuthor: doc.author });
  }

  // Summary
  console.log('=== Results ===');
  console.log(`  Need update: ${updates.length}`);
  console.log(`  Already correct: ${alreadyCorrect}`);
  console.log(`  Unmatched: ${unmatched.length}\n`);

  const byAuthor = {};
  for (const u of updates) byAuthor[u.wpAuthor] = (byAuthor[u.wpAuthor] || 0) + 1;
  for (const [aid, cnt] of Object.entries(byAuthor)) {
    console.log(`  ${AUTHOR_NAMES[aid] || aid}: ${cnt} issues to reassign`);
  }

  if (unmatched.length > 0) {
    writeFileSync('fix-uploaded-by-unmatched.json', JSON.stringify(unmatched.slice(0, 50), null, 2));
    console.log(`\nSaved ${Math.min(unmatched.length, 50)} unmatched samples to fix-uploaded-by-unmatched.json`);
  }

  if (updates.length === 0) {
    console.log('\nNothing to update!');
    return;
  }

  // Apply
  console.log(`\nApplying ${updates.length} updates...`);
  let success = 0, failed = 0;

  for (let i = 0; i < updates.length; i++) {
    const ok = await updateUploadedBy(updates[i].issueId, updates[i].newUploadedBy);
    if (ok) success++; else failed++;
    if ((i + 1) % 200 === 0 || i === updates.length - 1) {
      console.log(`  ${i + 1}/${updates.length} (ok: ${success}, fail: ${failed})`);
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`  Updated: ${success}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Already correct: ${alreadyCorrect}`);
  console.log(`  Unmatched: ${unmatched.length}`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
