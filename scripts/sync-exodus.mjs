#!/usr/bin/env node
/**
 * Exodus Magazine Auto-Sync Script
 *
 * Checks exodusmagazine.org for new issues (English + Russian),
 * downloads PDFs, uploads to Supabase storage, and creates
 * issue records in ShabbatHub database.
 *
 * Run monthly via cron or manually:
 *   node scripts/sync-exodus.mjs
 *
 * Env vars needed:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
 */

import https from 'https';
import http from 'http';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.+)$/);
    if (match) process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BASE_URL = 'https://www.exodusmagazine.org';
const EXODUS_EN_PUB_ID = process.env.EXODUS_EN_PUB_ID || null; // Set after creating publication
const EXODUS_RU_PUB_ID = process.env.EXODUS_RU_PUB_ID || null;

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 ShabbatHub-Sync/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function fetchBinary(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 ShabbatHub-Sync/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBinary(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function getIssueLinks(lang) {
  const archiveUrl = lang === 'ru'
    ? `${BASE_URL}/ru/category/exodus-russian-magazine`
    : `${BASE_URL}/category/exodus-english-magazine`;

  const html = await fetchPage(archiveUrl);
  const prefix = lang === 'ru' ? '/ru/magazine/' : '/magazine/';
  const regex = new RegExp(`href="(${prefix.replace('/', '\\/')}[^"]+)"`, 'g');
  const links = new Set();
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.add(match[1]);
  }
  return [...links];
}

async function getIssuePdf(issuePath) {
  const html = await fetchPage(BASE_URL + issuePath);

  // Extract PDF URL from flipbook JS
  const pdfMatch = html.match(/var pdf\s*=\s*'(\/pictures\/[^']+\.pdf)'/);
  if (!pdfMatch) return null;

  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch
    ? titleMatch[1].replace(/\s*[-–—]\s*Exodus Magazine\s*$/i, '').trim()
    : issuePath;

  // Extract issue number
  const numMatch = title.match(/(\d{3})/);
  const issueNumber = numMatch ? numMatch[1] : null;

  return {
    title,
    issueNumber,
    pdfUrl: BASE_URL + pdfMatch[1],
    originalUrl: BASE_URL + issuePath,
  };
}

async function isAlreadyImported(title, pubId) {
  if (!pubId) return false;
  const { data } = await supabase
    .from('issues')
    .select('id')
    .eq('publication_id', pubId)
    .ilike('title', `%${title.slice(0, 30)}%`)
    .limit(1);
  return data && data.length > 0;
}

async function uploadAndCreate(issue, lang, pubId) {
  if (!pubId) {
    console.log(`  ⚠ No publication ID for ${lang}, skipping DB insert`);
    return;
  }

  // Check if already exists
  if (await isAlreadyImported(issue.title, pubId)) {
    console.log(`  ⏭ Already exists: ${issue.title}`);
    return;
  }

  console.log(`  ⬇ Downloading: ${issue.title}`);
  const pdfData = await fetchBinary(issue.pdfUrl);

  if (pdfData.length < 50000) {
    console.log(`  ⚠ Too small (${pdfData.length} bytes), skipping`);
    return;
  }

  // Upload to Supabase storage
  const safeName = `exodus-${lang}-${issue.issueNumber || Date.now()}.pdf`;
  const storagePath = `uploads/${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from('pdfs')
    .upload(storagePath, pdfData, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) {
    console.log(`  ❌ Upload error: ${uploadError.message}`);
    return;
  }

  const pdfPublicUrl = `${SUPABASE_URL}/storage/v1/object/public/pdfs/${storagePath}`;

  // Create issue record with link to original
  const description = `Source: Exodus Magazine (${lang === 'ru' ? 'Russian' : 'English'}). Original: ${issue.originalUrl}`;

  const { error: insertError } = await supabase
    .from('issues')
    .insert({
      title: issue.title,
      description,
      publication_id: pubId,
      issue_number: issue.issueNumber,
      language: lang === 'ru' ? 'ru' : 'en',
      pdf_url: pdfPublicUrl,
      is_active: true,
    });

  if (insertError) {
    console.log(`  ❌ Insert error: ${insertError.message}`);
  } else {
    console.log(`  ✅ Added: ${issue.title}`);
  }
}

async function sync() {
  console.log('🔄 Exodus Magazine Sync — ' + new Date().toISOString());
  console.log('');

  for (const [lang, pubId] of [['en', EXODUS_EN_PUB_ID], ['ru', EXODUS_RU_PUB_ID]]) {
    console.log(`📚 ${lang.toUpperCase()} issues:`);

    try {
      const links = await getIssueLinks(lang);
      console.log(`  Found ${links.length} issue pages`);

      for (const link of links) {
        try {
          const issue = await getIssuePdf(link);
          if (!issue) {
            console.log(`  ⚠ No PDF found: ${link}`);
            continue;
          }
          await uploadAndCreate(issue, lang, pubId);
          await new Promise(r => setTimeout(r, 500)); // Rate limit
        } catch (e) {
          console.log(`  ❌ Error processing ${link}: ${e.message}`);
        }
      }
    } catch (e) {
      console.log(`  ❌ Error fetching ${lang} archive: ${e.message}`);
    }

    console.log('');
  }

  console.log('✅ Sync complete!');
}

sync().catch(console.error);
