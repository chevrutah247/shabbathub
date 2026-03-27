#!/usr/bin/env node
/**
 * Generate thumbnails for issues that have PDF but no thumbnail.
 * Downloads PDF, converts first page to image, uploads to Supabase Storage.
 *
 * Requires: pdftoppm (from poppler)
 *
 * Usage: node generate-thumbnails.mjs [--limit=50]
 */

import { execSync } from 'child_process';
import { readFileSync, unlinkSync, existsSync } from 'fs';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY1MzYwMSwiZXhwIjoyMDg1MjI5NjAxfQ.qOKeP8vBe2YjCL8SA-1NkSVNvMzWUQMyd30CAOf4ZVA';

const args = process.argv.slice(2);
const LIMIT = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '50');

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
};

async function main() {
  // Fetch issues without thumbnails
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?is_active=eq.true&thumbnail_url=is.null&pdf_url=not.is.null&select=id,title,pdf_url&order=created_at.desc&limit=${LIMIT}`,
    { headers }
  );
  const issues = await res.json();
  console.log(`Found ${issues.length} issues without thumbnails`);

  let generated = 0, failed = 0;

  for (const issue of issues) {
    const pdfUrl = issue.pdf_url;
    if (!pdfUrl) { failed++; continue; }

    const tmpPdf = `/tmp/thumb-${issue.id.slice(0, 8)}.pdf`;
    const tmpImg = `/tmp/thumb-${issue.id.slice(0, 8)}`;

    try {
      // Download PDF
      execSync(`curl -sL -o "${tmpPdf}" "${pdfUrl}"`, { timeout: 30000 });

      // Check if valid PDF
      const fileType = execSync(`file "${tmpPdf}"`).toString();
      if (!fileType.includes('PDF')) {
        console.log(`  SKIP ${issue.title.slice(0, 40)} - not a PDF`);
        failed++;
        if (existsSync(tmpPdf)) unlinkSync(tmpPdf);
        continue;
      }

      // Convert first page to JPEG
      execSync(`pdftoppm -jpeg -f 1 -l 1 -r 150 -singlefile "${tmpPdf}" "${tmpImg}"`, { timeout: 15000 });

      const imgPath = `${tmpImg}.jpg`;
      if (!existsSync(imgPath)) {
        console.log(`  FAIL ${issue.title.slice(0, 40)} - no image generated`);
        failed++;
        if (existsSync(tmpPdf)) unlinkSync(tmpPdf);
        continue;
      }

      // Upload to Supabase Storage
      const imgData = readFileSync(imgPath);
      const storagePath = `thumbnails/${issue.id}.jpg`;

      const uploadRes = await fetch(
        `${SUPABASE_URL}/storage/v1/object/pdfs/${storagePath}`,
        {
          method: 'POST',
          headers: {
            apikey: SERVICE_KEY,
            Authorization: `Bearer ${SERVICE_KEY}`,
            'Content-Type': 'image/jpeg',
          },
          body: imgData,
        }
      );

      if (uploadRes.ok || uploadRes.status === 200) {
        const thumbUrl = `${SUPABASE_URL}/storage/v1/object/public/pdfs/${storagePath}`;

        // Update issue with thumbnail URL
        const updateRes = await fetch(
          `${SUPABASE_URL}/rest/v1/issues?id=eq.${issue.id}`,
          {
            method: 'PATCH',
            headers: { ...headers, Prefer: 'return=minimal' },
            body: JSON.stringify({ thumbnail_url: thumbUrl }),
          }
        );

        if (updateRes.ok) {
          generated++;
          process.stdout.write('.');
        } else {
          console.log(`  DB update failed for ${issue.id.slice(0, 8)}`);
          failed++;
        }
      } else {
        console.log(`  Upload failed: ${uploadRes.status} for ${issue.title.slice(0, 40)}`);
        failed++;
      }

      // Cleanup
      if (existsSync(tmpPdf)) unlinkSync(tmpPdf);
      if (existsSync(imgPath)) unlinkSync(imgPath);

    } catch (err) {
      console.log(`  ERROR ${issue.title.slice(0, 40)}: ${err.message?.slice(0, 60)}`);
      failed++;
      if (existsSync(tmpPdf)) unlinkSync(tmpPdf);
      if (existsSync(`${tmpImg}.jpg`)) unlinkSync(`${tmpImg}.jpg`);
    }

    // Small delay
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n\nDone! Generated: ${generated}, Failed: ${failed}`);
}

main().catch(console.error);
