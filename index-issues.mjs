#!/usr/bin/env node
/**
 * ShabbatHub — PDF Text Extraction Script
 *
 * Downloads each PDF, extracts text with PyMuPDF (fitz),
 * saves to issues.content_text via Supabase REST API.
 *
 * Features:
 * - Batches of 50 (configurable via BATCH_SIZE env)
 * - Resumable: skips issues where indexed_at IS NOT NULL
 * - Error handling: logs failures, continues processing
 * - Rate limiting: 2 sec pause between batches
 *
 * Usage:
 *   node index-issues.mjs              # Process all unindexed
 *   BATCH_SIZE=10 node index-issues.mjs # Smaller batches
 *   node index-issues.mjs --dry-run    # Count only, no changes
 */

import { execSync } from 'child_process'
import { writeFileSync, unlinkSync, existsSync, appendFileSync } from 'fs'

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY1MzYwMSwiZXhwIjoyMDg1MjI5NjAxfQ.qOKeP8vBe2YjCL8SA-1NkSVNvMzWUQMyd30CAOf4ZVA'
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '50')
const MAX_TEXT_LENGTH = 50000
const DRY_RUN = process.argv.includes('--dry-run')
const ERROR_LOG = 'index-errors.log'

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
}

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19)
  console.log(`[${ts}] ${msg}`)
}

function logError(issueId, title, error) {
  const line = `${new Date().toISOString()} | ${issueId} | ${title} | ${error}\n`
  appendFileSync(ERROR_LOG, line)
}

async function fetchUnindexedCount() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?select=id&is_active=eq.true&indexed_at=is.null`,
    { headers: { ...headers, Prefer: 'count=exact', Range: '0-0' } }
  )
  const range = res.headers.get('content-range')
  return range ? parseInt(range.split('/')[1]) : 0
}

async function fetchBatch(offset) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?select=id,pdf_url,title&is_active=eq.true&indexed_at=is.null&order=created_at.asc&limit=${BATCH_SIZE}&offset=${offset}`,
    { headers }
  )
  if (!res.ok) throw new Error(`Fetch batch failed: ${res.status}`)
  return res.json()
}

function extractText(pdfPath) {
  try {
    const script = `
import fitz, sys
doc = fitz.open("${pdfPath}")
text = ""
for page in doc:
    text += page.get_text()
doc.close()
sys.stdout.write(text[:${MAX_TEXT_LENGTH}])
`
    const result = execSync(`arch -arm64 python3 -c '${script.replace(/'/g, "'\\''")}'`, {
      timeout: 30000,
      maxBuffer: 60 * 1024 * 1024,
      encoding: 'utf-8',
    })
    return result || ''
  } catch (e) {
    return null // extraction failed
  }
}

function downloadPdf(url, destPath) {
  try {
    // Handle Google Drive URLs
    let downloadUrl = url
    if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
                    url.match(/id=([a-zA-Z0-9_-]+)/) ||
                    url.match(/\/d\/([a-zA-Z0-9_-]+)/)
      if (match) {
        downloadUrl = `https://drive.google.com/uc?export=download&id=${match[1]}`
      }
    }

    execSync(
      `curl -sL "${downloadUrl}" -o "${destPath}" --max-time 15 --retry 1 --retry-delay 3`,
      { timeout: 20000 }
    )
    return existsSync(destPath)
  } catch {
    return false
  }
}

async function updateIssue(id, contentText) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: { ...headers, Prefer: 'return=minimal' },
      body: JSON.stringify({
        content_text: contentText,
        indexed_at: new Date().toISOString(),
      }),
    }
  )
  if (!res.ok) throw new Error(`Update failed: ${res.status}`)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  log('ShabbatHub PDF Indexer')
  log(`Batch size: ${BATCH_SIZE}`)

  const totalUnindexed = await fetchUnindexedCount()
  log(`Unindexed issues: ${totalUnindexed}`)

  if (DRY_RUN) {
    log('DRY RUN — no changes will be made')
    return
  }

  if (totalUnindexed === 0) {
    log('All issues are already indexed!')
    return
  }

  const totalBatches = Math.ceil(totalUnindexed / BATCH_SIZE)
  let processed = 0
  let errors = 0
  let empty = 0
  const startTime = Date.now()

  for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
    // Always fetch offset=0 since we're filtering indexed_at=is.null
    // and updating indexed_at as we go
    const batch = await fetchBatch(0)
    if (!batch || batch.length === 0) {
      log('No more unindexed issues found')
      break
    }

    for (const issue of batch) {
      const tmpPath = `/tmp/shabbathub_index_${issue.id}.pdf`

      try {
        // Download
        const downloaded = downloadPdf(issue.pdf_url, tmpPath)
        if (!downloaded) {
          errors++
          logError(issue.id, issue.title, 'Download failed')
          // Still mark as indexed to avoid retrying broken URLs
          await updateIssue(issue.id, '')
          continue
        }

        // Extract text
        const text = extractText(tmpPath)
        if (text === null) {
          errors++
          logError(issue.id, issue.title, 'Text extraction failed')
          await updateIssue(issue.id, '')
          continue
        }

        if (text.trim().length === 0) {
          empty++
        }

        // Save to DB
        await updateIssue(issue.id, text.trim())
        processed++
      } catch (e) {
        errors++
        logError(issue.id, issue.title, e.message)
        try { await updateIssue(issue.id, '') } catch {}
      } finally {
        // Cleanup
        try { unlinkSync(tmpPath) } catch {}
      }
    }

    const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1)
    const done = (batchNum + 1) * BATCH_SIZE
    const pct = Math.min(100, ((done / totalUnindexed) * 100)).toFixed(1)
    log(`Batch ${batchNum + 1}/${totalBatches}: ${Math.min(done, totalUnindexed)}/${totalUnindexed} (${pct}%) | ${processed} ok, ${errors} err, ${empty} empty | ${elapsed} min`)

    // Rate limit pause
    if (batchNum < totalBatches - 1) {
      await sleep(2000)
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1)
  log(`\n=== DONE ===`)
  log(`Processed: ${processed}`)
  log(`Errors: ${errors}`)
  log(`Empty text: ${empty}`)
  log(`Time: ${totalTime} minutes`)
  if (errors > 0) log(`See ${ERROR_LOG} for error details`)
}

main().catch(e => { console.error('Fatal error:', e); process.exit(1) })
