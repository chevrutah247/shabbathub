import { readFileSync } from 'fs';
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
const KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const ELI_ID = '12f5646a-f7c6-45e6-868d-7cbca2b15050';

async function fetchAll(endpoint) {
  const all = [];
  let offset = 0;
  while (true) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}&offset=${offset}&limit=1000`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }
    });
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) break;
    all.push(...data);
    if (data.length < 1000) break;
    offset += 1000;
  }
  return all;
}

async function main() {
  // First check: which publications does Eli have via created_by?
  const pubsByCreated = await fetchAll(`publications?select=id,title_en,title_ru,cover_image_url,created_by&created_by=eq.${ELI_ID}`);
  console.log('Publications where created_by = Eli:', pubsByCreated.length);

  // Also check: Eli's issues and what publications they belong to
  const elisIssues = await fetchAll(`issues?select=id,title,thumbnail_url,pdf_url,publication_id,uploaded_by&uploaded_by=eq.${ELI_ID}&is_active=eq.true`);
  console.log('Eli total issues:', elisIssues.length);

  const noThumb = elisIssues.filter(i => !i.thumbnail_url);
  console.log('Eli issues without thumbnail:', noThumb.length);

  // Get unique publication IDs from Eli's issues
  const pubIds = [...new Set(elisIssues.map(i => i.publication_id))];
  console.log('Unique publications from Eli issues:', pubIds.length);

  // Fetch all those publications
  const allPubs = [];
  for (const pid of pubIds) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/publications?select=id,title_en,title_ru,cover_image_url,created_by&id=eq.${pid}`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length) allPubs.push(data[0]);
  }

  const noCover = allPubs.filter(p => !p.cover_image_url);
  const hasCover = allPubs.filter(p => !!p.cover_image_url);

  console.log('\n=== Publications from Eli issues ===');
  console.log('Total:', allPubs.length);
  console.log('With cover:', hasCover.length);
  console.log('Without cover:', noCover.length);

  console.log('\n=== Without cover ===');
  for (const p of noCover) {
    const title = p.title_en || p.title_ru || p.id;
    // Check issues in this pub
    const pubIssues = elisIssues.filter(i => i.publication_id === p.id);
    const pubIssuesWithThumb = pubIssues.filter(i => !!i.thumbnail_url);
    const pubIssuesWithPdf = pubIssues.filter(i => !!i.pdf_url);
    console.log(`  [${p.id}] "${title}" — Eli's issues: ${pubIssues.length}, with thumb: ${pubIssuesWithThumb.length}, with pdf: ${pubIssuesWithPdf.length}`);

    // Also check ALL issues for this pub (not just Eli's)
    const allPubIssues = await fetchAll(`issues?select=id,thumbnail_url&publication_id=eq.${p.id}&is_active=eq.true`);
    const allWithThumb = allPubIssues.filter(i => !!i.thumbnail_url);
    if (allPubIssues.length !== pubIssues.length) {
      console.log(`    All issues in pub: ${allPubIssues.length}, with thumb: ${allWithThumb.length}`);
    }
  }

  // Show Eli's issues without thumbnails
  console.log('\n=== Eli issues without thumbnails (sample) ===');
  noThumb.slice(0, 20).forEach(i => {
    console.log(`  [${i.id}] "${i.title}" pdf: ${i.pdf_url ? i.pdf_url.substring(0, 80) : 'NONE'}`);
  });
  if (noThumb.length > 20) console.log(`  ... and ${noThumb.length - 20} more`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
