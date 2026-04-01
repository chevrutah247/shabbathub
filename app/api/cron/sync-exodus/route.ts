import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const CRON_SECRET = process.env.CRON_SECRET || '';

const BASE_URL = 'https://www.exodusmagazine.org';

export const maxDuration = 300; // 5 min timeout for Vercel

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const results: string[] = [];

  for (const lang of ['en', 'ru'] as const) {
    try {
      // Get archive page
      const archiveUrl = lang === 'ru'
        ? `${BASE_URL}/ru/category/exodus-russian-magazine`
        : `${BASE_URL}/category/exodus-english-magazine`;

      const archiveRes = await fetch(archiveUrl, { headers: { 'User-Agent': 'ShabbatHub-Sync/1.0' } });
      const archiveHtml = await archiveRes.text();

      // Find issue links
      const prefix = lang === 'ru' ? '/ru/magazine/' : '/magazine/';
      const linkRegex = new RegExp(`href="(${prefix.replace(/\//g, '\\/')}[^"]+)"`, 'g');
      const links = new Set<string>();
      let match;
      while ((match = linkRegex.exec(archiveHtml)) !== null) {
        links.add(match[1]);
      }

      // Get existing issues to avoid duplicates
      const { data: existing } = await supabase
        .from('issues')
        .select('title')
        .ilike('description', '%exodusmagazine.org%');
      const existingTitles = new Set((existing || []).map(e => e.title.toLowerCase()));

      // Check latest 5 issues for new ones
      const sortedLinks = Array.from(links).slice(0, 5);

      for (const link of sortedLinks) {
        try {
          const pageRes = await fetch(BASE_URL + link, { headers: { 'User-Agent': 'ShabbatHub-Sync/1.0' } });
          const pageHtml = await pageRes.text();

          // Extract PDF
          const pdfMatch = pageHtml.match(/var pdf\s*=\s*'(\/pictures\/[^']+\.pdf)'/);
          if (!pdfMatch) continue;

          const titleMatch = pageHtml.match(/<title>([^<]+)<\/title>/);
          const title = titleMatch
            ? titleMatch[1].replace(/\s*[-–—]\s*Exodus Magazine\s*$/i, '').trim()
            : link;

          if (existingTitles.has(title.toLowerCase())) {
            results.push(`⏭ ${lang}: ${title} (already exists)`);
            continue;
          }

          const numMatch = title.match(/(\d{3})/);
          const issueNumber = numMatch ? numMatch[1] : null;

          // Download PDF
          const pdfRes = await fetch(BASE_URL + pdfMatch[1]);
          const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer());

          if (pdfBuffer.length < 50000) continue;

          // Upload to storage
          const safeName = `exodus-${lang}-${issueNumber || Date.now()}.pdf`;
          const { error: uploadErr } = await supabase.storage
            .from('pdfs')
            .upload(`uploads/${safeName}`, pdfBuffer, { contentType: 'application/pdf', upsert: true });

          if (uploadErr) {
            results.push(`❌ ${lang}: Upload failed: ${uploadErr.message}`);
            continue;
          }

          const pdfUrl = `${SUPABASE_URL}/storage/v1/object/public/pdfs/uploads/${safeName}`;
          const description = `Source: Exodus Magazine (${lang === 'ru' ? 'Russian' : 'English'}). Original: ${BASE_URL}${link}`;

          const { error: insertErr } = await supabase
            .from('issues')
            .insert({
              title,
              description,
              issue_number: issueNumber,
              language: lang,
              pdf_url: pdfUrl,
              is_active: true,
            });

          if (insertErr) {
            results.push(`❌ ${lang}: Insert failed: ${insertErr.message}`);
          } else {
            results.push(`✅ ${lang}: Added ${title}`);
          }
        } catch (e: any) {
          results.push(`❌ ${lang}: Error ${link}: ${e.message}`);
        }
      }
    } catch (e: any) {
      results.push(`❌ ${lang}: Archive error: ${e.message}`);
    }
  }

  return NextResponse.json({ status: 'done', results, timestamp: new Date().toISOString() });
}
