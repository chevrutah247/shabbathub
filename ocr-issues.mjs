#!/usr/bin/env node
/**
 * OCR for image-based PDFs that pdftotext couldn't extract text from.
 * Downloads PDF, converts pages to images, runs Tesseract OCR,
 * saves extracted text to content_text and generates ai_summary.
 *
 * Requires: pdftoppm (poppler), tesseract
 *
 * Usage: node ocr-issues.mjs [--limit=20]
 */

import { execSync } from 'child_process';
import { readFileSync, unlinkSync, existsSync, readdirSync } from 'fs';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY1MzYwMSwiZXhwIjoyMDg1MjI5NjAxfQ.qOKeP8vBe2YjCL8SA-1NkSVNvMzWUQMyd30CAOf4ZVA';

const args = process.argv.slice(2);
const LIMIT = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '20');
const MAX_PAGES = 5; // OCR first 5 pages only (enough for summary)

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
};

function cleanup(prefix) {
  try {
    const dir = '/tmp';
    const files = readdirSync(dir).filter(f => f.startsWith(prefix));
    files.forEach(f => { try { unlinkSync(`${dir}/${f}`); } catch {} });
  } catch {}
}

async function main() {
  // Fetch issues with empty content_text (image PDFs)
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?is_active=eq.true&indexed_at=not.is.null&content_text=eq.&select=id,title,pdf_url&order=created_at.desc&limit=${LIMIT}`,
    { headers }
  );
  const issues = await res.json();
  console.log(`Found ${issues.length} image-based PDFs to OCR`);

  let processed = 0, failed = 0;

  for (const issue of issues) {
    const prefix = `ocr-${issue.id.slice(0, 8)}`;
    const tmpPdf = `/tmp/${prefix}.pdf`;

    try {
      // Download PDF
      execSync(`curl -sL -o "${tmpPdf}" "${issue.pdf_url}"`, { timeout: 30000 });

      const fileType = execSync(`file "${tmpPdf}"`).toString();
      if (!fileType.includes('PDF')) {
        console.log(`  SKIP ${issue.title.slice(0, 40)} - not a PDF`);
        failed++;
        cleanup(prefix);
        continue;
      }

      // Convert first N pages to images
      execSync(
        `pdftoppm -jpeg -r 200 -f 1 -l ${MAX_PAGES} "${tmpPdf}" "/tmp/${prefix}"`,
        { timeout: 30000 }
      );

      // Find generated images
      const images = readdirSync('/tmp')
        .filter(f => f.startsWith(prefix) && f.endsWith('.jpg'))
        .sort()
        .map(f => `/tmp/${f}`);

      if (images.length === 0) {
        console.log(`  FAIL ${issue.title.slice(0, 40)} - no images`);
        failed++;
        cleanup(prefix);
        continue;
      }

      // OCR each image with multiple languages (use stdin to avoid sandbox issues)
      let fullText = '';
      for (const img of images) {
        try {
          const imgData = readFileSync(img);
          const text = execSync(
            `tesseract stdin stdout -l heb+rus+eng --psm 1`,
            { input: imgData, timeout: 30000, maxBuffer: 10 * 1024 * 1024 }
          ).toString().trim();
          fullText += text + '\n\n';
        } catch {}
      }

      fullText = fullText.trim();

      if (fullText.length < 20) {
        console.log(`  EMPTY ${issue.title.slice(0, 40)} - OCR returned no text`);
        failed++;
        cleanup(prefix);
        continue;
      }

      // Save to database
      const summary = `${issue.title}. Комментарии и материалы к недельной главе.`;
      const updateRes = await fetch(
        `${SUPABASE_URL}/rest/v1/issues?id=eq.${issue.id}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            content_text: fullText.substring(0, 50000),
            ai_summary: summary,
          }),
        }
      );

      if (updateRes.ok) {
        processed++;
        process.stdout.write('.');
      } else {
        console.log(`  DB error for ${issue.id.slice(0, 8)}`);
        failed++;
      }

    } catch (err) {
      console.log(`  ERROR ${issue.title.slice(0, 40)}: ${err.message?.slice(0, 60)}`);
      failed++;
    }

    cleanup(prefix);
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n\nDone! OCR processed: ${processed}, Failed: ${failed}`);
}

main().catch(console.error);
