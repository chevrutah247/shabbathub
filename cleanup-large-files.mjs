#!/usr/bin/env node

const APPLY = process.argv.includes('--apply');
const LIMIT_ARG = process.argv.find((x) => x.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? Number(LIMIT_ARG.split('=')[1]) : 10000;
const MAX_MB_ARG = process.argv.find((x) => x.startsWith('--max-mb='));
const MAX_MB = MAX_MB_ARG ? Number(MAX_MB_ARG.split('=')[1]) : 25;
const MAX_BYTES = MAX_MB * 1024 * 1024;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

function sbHeaders(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    ...extra,
  };
}

function toStorageObjectKey(pdfUrl) {
  if (!pdfUrl || !pdfUrl.startsWith(SUPABASE_URL + '/storage/v1/object/public/pdfs/')) return null;
  const raw = pdfUrl.slice((SUPABASE_URL + '/storage/v1/object/public/pdfs/').length);
  return raw.split('/').map((x) => encodeURIComponent(decodeURIComponent(x))).join('/');
}

async function fetchCandidates() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?select=id,title,file_size,pdf_url&is_active=eq.true&file_size=gt.${MAX_BYTES}&order=file_size.desc&limit=${LIMIT}`,
    { headers: sbHeaders() }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(`Fetch issues failed: ${JSON.stringify(data)}`);
  return data;
}

async function deleteStorageObject(objectKey) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/pdfs/${objectKey}`, {
    method: 'DELETE',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  const txt = await res.text();
  if (!res.ok && !String(txt).toLowerCase().includes('not found')) {
    throw new Error(`Storage delete failed ${res.status}: ${txt}`);
  }
}

async function deleteIssue(issueId) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/issues?id=eq.${issueId}`, {
    method: 'DELETE',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=minimal',
    },
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(`Issue delete failed ${res.status}: ${txt}`);
}

(async () => {
  const rows = await fetchCandidates();
  console.log(`Candidates > ${MAX_MB}MB: ${rows.length}`);
  if (!rows.length) return;

  let deleted = 0;
  let failed = 0;
  let storageDeleted = 0;

  for (const r of rows) {
    const mb = (Number(r.file_size || 0) / 1024 / 1024).toFixed(1);
    if (!APPLY) {
      console.log(`plan | ${r.id} | ${mb}MB | ${r.title}`);
      continue;
    }

    try {
      const key = toStorageObjectKey(r.pdf_url);
      if (key) {
        await deleteStorageObject(key);
        storageDeleted += 1;
      }
      await deleteIssue(r.id);
      deleted += 1;
      console.log(`deleted | ${r.id} | ${mb}MB | ${r.title}`);
    } catch (e) {
      failed += 1;
      console.log(`failed | ${r.id} | ${mb}MB | ${r.title} | ${String(e)}`);
    }
  }

  console.log(`Done. apply=${APPLY} deleted=${deleted} storageDeleted=${storageDeleted} failed=${failed}`);
})();
