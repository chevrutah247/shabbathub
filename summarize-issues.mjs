#!/usr/bin/env node
/**
 * ShabbatHub — AI Summary Generator for Issues
 *
 * Designed for batch processing in Claude Code sessions.
 * Fetches issues with content_text but no ai_summary,
 * outputs text for Claude to summarize, then saves summaries.
 *
 * Usage:
 *   node summarize-issues.mjs fetch          # Fetch next batch, save to /tmp/batch.json
 *   node summarize-issues.mjs save           # Read /tmp/summaries.json, update DB
 *   node summarize-issues.mjs stats          # Show indexing statistics
 *   node summarize-issues.mjs preview [N]    # Show first N chars of next batch texts
 *
 * Workflow in Claude Code sessions:
 *   1. Run: node summarize-issues.mjs fetch
 *   2. Claude reads /tmp/shabbathub-batch.json, generates summaries
 *   3. Claude writes summaries to /tmp/shabbathub-summaries.json
 *   4. Run: node summarize-issues.mjs save
 *   5. Repeat
 */

import { readFileSync, writeFileSync } from 'fs'

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY1MzYwMSwiZXhwIjoyMDg1MjI5NjAxfQ.qOKeP8vBe2YjCL8SA-1NkSVNvMzWUQMyd30CAOf4ZVA'

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '20')
const BATCH_FILE = '/tmp/shabbathub-batch.json'
const SUMMARIES_FILE = '/tmp/shabbathub-summaries.json'
const TEXT_PREVIEW_LEN = 3000

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
}

async function fetchCount(filter) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?select=id&is_active=eq.true&${filter}`,
    { headers: { ...headers, Prefer: 'count=exact', Range: '0-0' } }
  )
  const range = res.headers.get('content-range')
  return range ? parseInt(range.split('/')[1]) : 0
}

async function stats() {
  const counts = await Promise.all([
    fetchCount('indexed_at=not.is.null'),
    fetchCount('indexed_at=is.null'),
    fetchCount('content_text=neq.&ai_summary=is.null&indexed_at=not.is.null'),
    fetchCount('ai_summary=not.is.null'),
    fetchCount('content_text=eq.&indexed_at=not.is.null'),
  ])
  console.log('=== ShabbatHub Indexing Stats ===')
  console.log(`Total indexed (text extracted):  ${counts[0]}`)
  console.log(`Awaiting text extraction:        ${counts[1]}`)
  console.log(`Has text, needs AI summary:      ${counts[2]}`)
  console.log(`Has AI summary (done):           ${counts[3]}`)
  console.log(`Empty text (no content):         ${counts[4]}`)
}

async function fetchBatch() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?select=id,title,content_text,publication_id&is_active=eq.true&indexed_at=not.is.null&ai_summary=is.null&content_text=neq.&order=created_at.desc&limit=${BATCH_SIZE}`,
    { headers }
  )
  if (!res.ok) { console.error('Fetch failed:', res.status); return }
  const issues = await res.json()

  if (!issues.length) {
    console.log('No issues need summarization!')
    return
  }

  const batch = issues.map(i => ({
    id: i.id,
    title: i.title,
    publication_id: i.publication_id,
    text: (i.content_text || '').substring(0, TEXT_PREVIEW_LEN),
  }))

  writeFileSync(BATCH_FILE, JSON.stringify(batch, null, 2))
  console.log(`Fetched ${batch.length} issues -> ${BATCH_FILE}`)
  console.log('Issues:')
  batch.forEach((b, i) => console.log(`  ${i + 1}. [${b.id.slice(0, 8)}] ${b.title} (${b.text.length} chars)`))
  console.log(`\nNext: Generate summaries and save to ${SUMMARIES_FILE}`)
  console.log('Format: [{ "id": "...", "summary": "2-3 sentence summary" }, ...]')
}

async function saveSummaries() {
  let summaries
  try {
    summaries = JSON.parse(readFileSync(SUMMARIES_FILE, 'utf-8'))
  } catch (e) {
    console.error(`Cannot read ${SUMMARIES_FILE}:`, e.message)
    return
  }

  if (!Array.isArray(summaries)) {
    console.error('Expected array in summaries file')
    return
  }

  let saved = 0, errors = 0

  for (const s of summaries) {
    if (!s.id || !s.summary) { console.error('Skipping invalid entry:', s); errors++; continue }

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/issues?id=eq.${s.id}`,
      {
        method: 'PATCH',
        headers: { ...headers, Prefer: 'return=minimal' },
        body: JSON.stringify({ ai_summary: s.summary }),
      }
    )
    if (res.ok) { saved++ } else { console.error(`Failed to save ${s.id}: ${res.status}`); errors++ }
  }

  console.log(`Saved: ${saved}, Errors: ${errors}`)
}

async function preview() {
  const n = parseInt(process.argv[3] || '3')
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?select=id,title,content_text&is_active=eq.true&indexed_at=not.is.null&ai_summary=is.null&content_text=neq.&order=created_at.desc&limit=${n}`,
    { headers }
  )
  const issues = await res.json()
  for (const issue of issues) {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`ID: ${issue.id}`)
    console.log(`Title: ${issue.title}`)
    console.log(`Text (first 500 chars):\n${(issue.content_text || '').substring(0, 500)}`)
  }
}

const cmd = process.argv[2] || 'stats'
switch (cmd) {
  case 'fetch': fetchBatch(); break
  case 'save': saveSummaries(); break
  case 'stats': stats(); break
  case 'preview': preview(); break
  default: console.log('Usage: node summarize-issues.mjs [fetch|save|stats|preview]')
}
