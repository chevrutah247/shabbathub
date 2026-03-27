#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync } from 'child_process';

const APPLY = process.argv.includes('--apply');
const LIMIT_ARG = process.argv.find((x) => x.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? Number(LIMIT_ARG.split('=')[1]) : 100;
const PAGES_ARG = process.argv.find((x) => x.startsWith('--pages='));
const PAGES = PAGES_ARG ? Number(PAGES_ARG.split('=')[1]) : 12;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const TOPIC_CATALOG = [
  { key: 'wigs_headcovering', labels: ['парик', 'парики', 'косынка', 'покрытие головы', 'wig', 'wigs', 'head covering', 'sheitel', 'tichel', 'פאה', 'פאות', 'כיסוי ראש', 'מטפחת'] },
  { key: 'shabbat_laws', labels: ['шаббат', 'законы шаббата', 'melacha', 'hilchot shabbat', 'שבת', 'הלכות שבת', 'מלאכה'] },
  { key: 'kashrut', labels: ['кашрут', 'кошер', 'kosher', 'kashrut', 'כשרות', 'כשר'] },
  { key: 'family_education', labels: ['воспитание', 'дети', 'семья', 'chinuch', 'family', 'חינוך', 'ילדים', 'משפחה'] },
  { key: 'women_modesty', labels: ['цниют', 'скромность', 'tzniut', 'modesty', 'צניעות'] },
  { key: 'chassidus_hashkafa', labels: ['хасидут', 'хасидский взгляд', 'chassidus', 'hashkafa', 'חסידות', 'השקפה'] },
  { key: 'holidays', labels: ['пурим', 'песах', 'ханука', 'суккот', 'yom tov', 'פורים', 'פסח', 'חנוכה', 'סוכות'] },
  { key: 'relationships_shalom_bayit', labels: ['шалом байт', 'брак', 'отношения', 'shalom bayit', 'marriage', 'שלום בית', 'זוגיות'] },
  { key: 'health_mind', labels: ['здоровье', 'психология', 'стресс', 'health', 'mental', 'בריאות', 'נפש'] },
  { key: 'parsha_commentary', labels: ['недельная глава', 'парша', 'parsha', 'פרשה', 'פרשת השבוע'] },
];

function headers(withJson = false) {
  const h = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };
  if (withJson) h['Content-Type'] = 'application/json';
  return h;
}

async function sb(pathname, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}${pathname}`, {
    method: opts.method || 'GET',
    headers: opts.json ? headers(true) : headers(false),
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const txt = await res.text();
  let data = null;
  try { data = txt ? JSON.parse(txt) : null; } catch { data = txt; }
  if (!res.ok) throw new Error(`Supabase ${res.status} ${pathname}: ${typeof data === 'string' ? data : JSON.stringify(data)}`);
  return data;
}

async function getBatch(limit) {
  const out = [];
  let offset = 0;
  const chunk = 500;

  while (out.length < limit) {
    const rows = await sb(
      `/rest/v1/issues?select=id,title,pdf_url,description,ai_summary,indexed_at,is_active&is_active=eq.true&order=created_at.desc&limit=${chunk}&offset=${offset}`
    );
    if (!rows || rows.length === 0) break;

    for (const r of rows) {
      if (r.indexed_at) continue;
      if (r.ai_summary && String(r.ai_summary).trim().length >= 80) continue;
      out.push(r);
      if (out.length >= limit) break;
    }

    offset += chunk;
  }

  return out;
}

async function detectOptionalColumns() {
  let hasTopicKeys = false;
  let hasTopicTerms = false;
  try {
    await sb('/rest/v1/issues?select=topic_keys&limit=1');
    hasTopicKeys = true;
  } catch {}
  try {
    await sb('/rest/v1/issues?select=topic_terms&limit=1');
    hasTopicTerms = true;
  } catch {}
  return { hasTopicKeys, hasTopicTerms };
}

async function downloadPdf(url, outPath) {
  const res = await fetch(url, { headers: { 'User-Agent': 'ShabbatHub-Indexer/1.0' } });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const arr = new Uint8Array(await res.arrayBuffer());
  fs.writeFileSync(outPath, arr);
}

function runPdftotext(pdfPath, txtPath, pages) {
  try {
    execSync(`pdftotext -f 1 -l ${pages} -layout "${pdfPath.replace(/"/g, '\\"')}" "${txtPath.replace(/"/g, '\\"')}"`, { stdio: 'ignore' });
    if (fs.existsSync(txtPath)) return fs.readFileSync(txtPath, 'utf8') || '';
  } catch {}
  return '';
}

function hasCmd(cmd) {
  try { execSync(`which ${cmd}`, { stdio: 'ignore' }); return true; } catch { return false; }
}

function runOcrFallback(pdfPath, pages = 2) {
  if (!hasCmd('pdftoppm') || !hasCmd('tesseract')) return '';
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ocr-'));
  try {
    execSync(`pdftoppm -f 1 -l ${pages} -r 200 -png "${pdfPath.replace(/"/g, '\\"')}" "${tmpDir}/p"`, { stdio: 'ignore' });
    const pngs = fs.readdirSync(tmpDir).filter((x) => x.endsWith('.png')).sort();
    let all = '';
    for (const p of pngs) {
      const img = `${tmpDir}/${p}`;
      const out = `${tmpDir}/${p}.txt`;
      try {
        execSync(`tesseract "${img.replace(/"/g, '\\"')}" "${out.replace(/\.txt$/, '').replace(/"/g, '\\"')}" -l rus+eng+heb`, { stdio: 'ignore' });
        if (fs.existsSync(out)) all += '\n' + fs.readFileSync(out, 'utf8');
      } catch {}
    }
    return all.trim();
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
}

function normalizeText(s) {
  return (s || '').replace(/\s+/g, ' ').trim();
}

function pickSentences(text, maxSentences = 8) {
  const sents = text
    .split(/(?<=[.!?։])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => s.length >= 50)
    .slice(0, 200);

  const scored = sents.map((s) => {
    let score = Math.min(s.length, 260);
    if (/[а-яё]{4,}/i.test(s)) score += 10;
    if (/[a-z]{4,}/i.test(s)) score += 10;
    if (/[א-ת]{2,}/.test(s)) score += 10;
    if (/\b(шаббат|parsha|פרשה|кашрут|צניעות|хасид|חסידות|family|משפחה)\b/i.test(s)) score += 25;
    return { s, score };
  }).sort((a, b) => b.score - a.score);

  return scored.slice(0, maxSentences).map((x) => x.s);
}

function detectTopics(text) {
  const low = text.toLowerCase();
  const keys = [];
  const terms = new Set();

  for (const t of TOPIC_CATALOG) {
    if (t.labels.some((w) => low.includes(w.toLowerCase()))) {
      keys.push(t.key);
      for (const w of t.labels) terms.add(w);
    }
  }
  return { keys, terms: [...terms] };
}

function buildDetailedSummary(title, text, topics) {
  const clean = normalizeText(text);
  const chosen = pickSentences(clean, 10);
  const lead = `Выпуск: ${title}.`;
  const topicsLine = topics.keys.length ? ` Темы: ${topics.keys.join(', ')}.` : ' Темы: не определены автоматически.';
  const termsLine = topics.terms.length ? ` Поисковые термины: ${topics.terms.slice(0, 20).join(', ')}.` : '';
  const body = chosen.length ? ' ' + chosen.join(' ') : ' Краткий пересказ не удалось извлечь автоматически.';
  return (lead + topicsLine + termsLine + body).slice(0, 2400);
}

(async () => {
  const optionalCols = await detectOptionalColumns();
  const batch = await getBatch(LIMIT);
  console.log(`Batch selected: ${batch.length} (limit=${LIMIT})`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const issue of batch) {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'issue-idx-'));
    const pdfPath = path.join(tmpDir, `${issue.id}.pdf`);
    const txtPath = path.join(tmpDir, `${issue.id}.txt`);

    try {
      if (issue.ai_summary && String(issue.ai_summary).trim().length >= 80) {
        skipped += 1;
        continue;
      }

      await downloadPdf(issue.pdf_url, pdfPath);
      let text = runPdftotext(pdfPath, txtPath, PAGES);
      if (!normalizeText(text)) text = runOcrFallback(pdfPath, 2);
      text = normalizeText(text);

      if (!text || text.length < 120) {
        if (APPLY) {
          await sb(`/rest/v1/issues?id=eq.${issue.id}`, {
            method: 'PATCH',
            json: true,
            body: { indexed_at: new Date().toISOString() },
          });
        }
        skipped += 1;
        console.log(`skip(no_text): ${issue.id} ${issue.title}`);
        continue;
      }

      const topics = detectTopics(text);
      const aiSummary = buildDetailedSummary(issue.title, text, topics);
      const topicTerms = topics.terms.join(', ');
      const contentText = text.slice(0, 25000);
      const shortDesc = (issue.description && String(issue.description).trim())
        ? issue.description
        : aiSummary.slice(0, 420);

      if (APPLY) {
        const payload = {
          ai_summary: aiSummary,
          content_text: contentText,
          indexed_at: new Date().toISOString(),
          description: shortDesc,
        };
        if (optionalCols.hasTopicKeys) payload.topic_keys = topics.keys;
        if (optionalCols.hasTopicTerms) payload.topic_terms = topicTerms || null;

        await sb(`/rest/v1/issues?id=eq.${issue.id}`, {
          method: 'PATCH',
          json: true,
          body: payload,
        });
      }

      updated += 1;
      console.log(`${APPLY ? 'updated' : 'planned'}: ${issue.id} topics=${topics.keys.length} ${issue.title}`);
    } catch (e) {
      failed += 1;
      console.log(`failed: ${issue.id} ${issue.title} :: ${String(e)}`);
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
    }
  }

  console.log(`Done. apply=${APPLY} updated/planned=${updated} skipped=${skipped} failed=${failed}`);
})();
