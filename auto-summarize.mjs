#!/usr/bin/env node
/**
 * ShabbatHub — Automated AI Summary Generator
 *
 * Uses Claude API (Haiku for cost efficiency) to generate summaries
 * for all issues that have content_text but no ai_summary.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node auto-summarize.mjs [--batch=50] [--limit=1000]
 */

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY1MzYwMSwiZXhwIjoyMDg1MjI5NjAxfQ.qOKeP8vBe2YjCL8SA-1NkSVNvMzWUQMyd30CAOf4ZVA';

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_KEY) {
  console.error('Error: Set ANTHROPIC_API_KEY environment variable');
  console.error('Usage: ANTHROPIC_API_KEY=sk-ant-... node auto-summarize.mjs');
  process.exit(1);
}

const args = process.argv.slice(2);
const BATCH_SIZE = parseInt(args.find(a => a.startsWith('--batch='))?.split('=')[1] || '10');
const TOTAL_LIMIT = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '500');
const TEXT_MAX = 2000; // chars of content_text to send to AI
const CONCURRENCY = 5; // parallel API calls

const supaHeaders = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
};

const SYSTEM_PROMPT = `You are a librarian cataloging Jewish Torah publications. Given the title and text excerpt of an issue, write a concise 1-3 sentence summary in Russian describing what this issue is about. Include the publication name if clear. Mention specific topics: Torah portion discussed, halachic topics, chassidic teachings, stories, holidays, etc. Be specific and informative — this summary will be used for search and filtering. If the text is in Hebrew or English, still write the summary in Russian. Do NOT include technical metadata, just content description.`;

async function summarizeOne(issue) {
  const text = (issue.content_text || '').substring(0, TEXT_MAX);
  if (!text.trim()) return null;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `Title: ${issue.title}\n\nText excerpt:\n${text}` }
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`  API error for ${issue.id.slice(0, 8)}: ${res.status} ${err.slice(0, 100)}`);
      return null;
    }

    const data = await res.json();
    const summary = data.content?.[0]?.text?.trim();
    return summary || null;
  } catch (e) {
    console.error(`  Error for ${issue.id.slice(0, 8)}: ${e.message}`);
    return null;
  }
}

async function saveSummary(id, summary) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: { ...supaHeaders, Prefer: 'return=minimal' },
      body: JSON.stringify({ ai_summary: summary }),
    }
  );
  return res.ok;
}

async function processBatch(issues) {
  const results = [];
  // Process in parallel chunks
  for (let i = 0; i < issues.length; i += CONCURRENCY) {
    const chunk = issues.slice(i, i + CONCURRENCY);
    const summaries = await Promise.all(chunk.map(summarizeOne));

    for (let j = 0; j < chunk.length; j++) {
      const summary = summaries[j];
      if (summary) {
        const saved = await saveSummary(chunk[j].id, summary);
        if (saved) {
          results.push({ id: chunk[j].id, title: chunk[j].title, summary });
          process.stdout.write('.');
        } else {
          process.stdout.write('x');
        }
      } else {
        process.stdout.write('-');
      }
    }
  }
  return results;
}

async function main() {
  console.log(`ShabbatHub Auto-Summarizer`);
  console.log(`Batch: ${BATCH_SIZE}, Limit: ${TOTAL_LIMIT}, Concurrency: ${CONCURRENCY}`);
  console.log('');

  let totalProcessed = 0;
  let totalSaved = 0;
  let offset = 0;

  while (totalProcessed < TOTAL_LIMIT) {
    const fetchSize = Math.min(BATCH_SIZE, TOTAL_LIMIT - totalProcessed);

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/issues?select=id,title,content_text&is_active=eq.true&indexed_at=not.is.null&ai_summary=is.null&content_text=neq.&order=created_at.desc&limit=${fetchSize}`,
      { headers: supaHeaders }
    );

    if (!res.ok) {
      console.error(`\nFetch failed: ${res.status}`);
      break;
    }

    const issues = await res.json();
    if (!issues.length) {
      console.log('\nNo more issues to process!');
      break;
    }

    process.stdout.write(`\nBatch ${Math.floor(totalProcessed / BATCH_SIZE) + 1} (${issues.length} issues): `);
    const results = await processBatch(issues);

    totalProcessed += issues.length;
    totalSaved += results.length;

    console.log(` [${results.length}/${issues.length} saved]`);
  }

  console.log(`\n\nDone! Processed: ${totalProcessed}, Saved: ${totalSaved}`);
}

main().catch(console.error);
