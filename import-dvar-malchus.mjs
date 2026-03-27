#!/usr/bin/env node
/**
 * Import Dvar Malchus PDFs from dvarmalchus.org into ShabbatHub
 *
 * Usage:
 *   node import-dvar-malchus.mjs scan       # Scan archive and show what would be imported
 *   node import-dvar-malchus.mjs import      # Actually import PDFs into database
 *   node import-dvar-malchus.mjs import-all  # Import including re-hosting PDFs to Supabase
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

const ARCHIVE_BASE = 'https://dvarmalchus.org/dvar-malchus/';
const ARCHIVE_PAGES = 5;
const SCAN_FILE = '/tmp/dvar-malchus-scan.json';

const PHASE = process.argv[2] || 'help';

// Hebrew parsha name → parsha_id mapping (matching schema.sql parshiot table)
// Note: DB has name_he with nikkud sometimes, so we match without dashes/spaces variants
const HEBREW_TO_PARSHA = {
  'בראשית': 1,
  'נח': 2,
  'לך לך': 3, 'לך-לך': 3,
  'וירא': 4,
  'חיי שרה': 5, 'חיי-שרה': 5,
  'תולדות': 6,
  'ויצא': 7,
  'וישלח': 8,
  'וישב': 9,
  'מקץ': 10,
  'ויגש': 11,
  'ויחי': 12,
  'שמות': 13,
  'וארא': 14,
  'בא': 15,
  'בשלח': 16,
  'יתרו': 17,
  'משפטים': 18,
  'תרומה': 19,
  'תצוה': 20, 'תצווה': 20,
  'כי תשא': 21, 'כי-תשא': 21, 'תשא': 21,
  'ויקהל': 22,
  'פקודי': 23,
  'ויקרא': 24,
  'צו': 25,
  'שמיני': 26,
  'תזריע': 27,
  'מצורע': 28,
  'אחרי מות': 29, 'אחרי-מות': 29, 'אחרי': 29,
  'קדושים': 30,
  'אמור': 31,
  'בהר': 32,
  'בחוקותי': 33, 'בחקותי': 33, 'בחוקתי': 33,
  'במדבר': 34,
  'נשא': 35, 'נשוא': 35,
  'בהעלותך': 36, 'בהעלתך': 36,
  'שלח': 37, 'שלח לך': 37, 'שלח-לך': 37,
  'קרח': 38, 'קורח': 38,
  'חקת': 39, 'חוקת': 39,
  'בלק': 40,
  'פינחס': 41, 'פנחס': 41,
  'מטות': 42,
  'מסעי': 43,
  'דברים': 44,
  'ואתחנן': 45,
  'עקב': 46,
  'ראה': 47, 'ראה': 47,
  'שופטים': 48,
  'כי תצא': 49, 'כי-תצא': 49, 'תצא': 49,
  'כי תבוא': 50, 'כי-תבוא': 50, 'תבוא': 50,
  'נצבים': 51, 'ניצבים': 51,
  'וילך': 52, 'וַיֵּלֶךְ': 52,
  'האזינו': 53, 'הַאֲזִינוּ': 53,
  'וזאת הברכה': 54,
};

// Holiday name → event name mapping (for matching events table)
const HOLIDAY_KEYWORDS = {
  'סוכות': 'Sukkot',
  'שמיני עצרת': 'Shemini Atzeret',
  'שמחת תורה': 'Simchat Torah',
  'חנוכה': 'Chanukah',
  'פורים': 'Purim',
  'פסח': 'Passover',
  'שבועות': 'Shavuot',
  'ראש השנה': 'Rosh Hashanah',
  'יום כיפור': 'Yom Kippur',
  'יום הכיפורים': 'Yom Kippur',
  'ט"ו בשבט': "Tu B'Shvat",
  'ל"ג בעומר': "Lag B'Omer",
};

// Hebrew year mapping
const HEBREW_YEARS = {
  "תשפ\"ג": 5783, 'תשפ"ג': 5783, 'תשפג': 5783,
  "תשפ\"ד": 5784, 'תשפ"ד': 5784, 'תשפד': 5784,
  "תשפ\"ה": 5785, 'תשפ"ה': 5785, 'תשפה': 5785,
  "תשפ\"ו": 5786, 'תשפ"ו': 5786, 'תשפו': 5786,
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Detect parsha from Hebrew title text
function detectParsha(title) {
  const parshas = [];

  // Check for combined parshas first (e.g., "מטות-מסעי", "נצבים וילך")
  for (const [name, id] of Object.entries(HEBREW_TO_PARSHA)) {
    if (title.includes(name)) {
      if (!parshas.find(p => p.id === id)) {
        parshas.push({ name, id });
      }
    }
  }

  // Sort by position in title to get primary parsha
  parshas.sort((a, b) => title.indexOf(a.name) - title.indexOf(b.name));

  return parshas.length > 0 ? parshas[0].id : null;
}

// Detect all parshas (for combined portions)
function detectAllParshas(title) {
  const parshas = [];
  for (const [name, id] of Object.entries(HEBREW_TO_PARSHA)) {
    if (title.includes(name) && !parshas.find(p => p.id === id)) {
      parshas.push({ name, id, pos: title.indexOf(name) });
    }
  }
  parshas.sort((a, b) => a.pos - b.pos);
  return parshas.map(p => p.id);
}

// Detect holiday from title
function detectHoliday(title) {
  for (const [heb, eng] of Object.entries(HOLIDAY_KEYWORDS)) {
    if (title.includes(heb)) return eng;
  }
  return null;
}

// Detect Hebrew year from title
function detectHebrewYear(title) {
  for (const [heb, num] of Object.entries(HEBREW_YEARS)) {
    if (title.includes(heb)) return num;
  }
  // Try pattern like תשפ"ו or תשפו
  const m = title.match(/תש[פ-ת][א-ת"׳]+/);
  if (m) {
    for (const [heb, num] of Object.entries(HEBREW_YEARS)) {
      if (m[0].replace(/["\u05F3\u05F4]/g, '').includes(heb.replace(/["\u05F3\u05F4]/g, ''))) {
        return num;
      }
    }
  }
  return null;
}

// Fetch a URL and return text
async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

// Parse archive page HTML and extract PDF entries
function parseArchivePage(html) {
  const entries = [];

  // Look for article blocks with PDF links
  // Pattern: <article> ... <h2><a href="page-url">title</a></h2> ... <a href="pdf-url">download</a> ... </article>

  // Method 1: Find article/entry blocks
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/gi;
  let match;

  while ((match = articleRegex.exec(html)) !== null) {
    const block = match[1];

    // Extract title from h2/h3
    const titleMatch = block.match(/<h[23][^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>\s*<\/h[23]>/i);
    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#\d+;/g, '').trim()
      : '';

    // Extract page URL
    const pageUrlMatch = block.match(/<h[23][^>]*>\s*<a[^>]*href="([^"]+)"/i);
    const pageUrl = pageUrlMatch ? pageUrlMatch[1] : '';

    // Extract PDF download link
    const pdfMatch = block.match(/href="([^"]*\.pdf[^"]*)"/i);
    const pdfUrl = pdfMatch ? pdfMatch[1] : '';

    // Extract date
    const dateMatch = block.match(/<time[^>]*datetime="([^"]+)"/i) ||
                      block.match(/(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1].substring(0, 10) : '';

    if (title) {
      entries.push({ title, pageUrl, pdfUrl, date });
    }
  }

  // Method 2: If no articles found, try generic link extraction
  if (entries.length === 0) {
    const linkRegex = /<a[^>]*href="(https?:\/\/dvarmalchus\.org\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    while ((match = linkRegex.exec(html)) !== null) {
      const url = match[1];
      const text = match[2].replace(/<[^>]+>/g, '').trim();
      if (text.length > 5 && !url.includes('/page/') && url !== ARCHIVE_BASE) {
        entries.push({ title: text, pageUrl: url, pdfUrl: '', date: '' });
      }
    }
  }

  return entries;
}

// Fetch individual post page to find PDF link if not in archive
async function fetchPdfFromPost(postUrl) {
  try {
    const html = await fetchText(postUrl);

    // Look for PDF download links
    const patterns = [
      /href="(https?:\/\/dvarmalchus\.com\/Download\/[^"]+\.pdf)"/i,
      /href="(https?:\/\/dvarmalchus\.org\/wp-content\/uploads\/[^"]+\.pdf)"/i,
      /href="([^"]*\.pdf[^"]*)"/i,
    ];

    for (const pattern of patterns) {
      const m = html.match(pattern);
      if (m) return m[1];
    }

    // Also try data attributes or onclick handlers
    const dataMatch = html.match(/data-href="([^"]*\.pdf[^"]*)"/i);
    if (dataMatch) return dataMatch[1];

    return null;
  } catch (err) {
    console.error(`  Failed to fetch ${postUrl}: ${err.message}`);
    return null;
  }
}

// ============================================================
// Phase: SCAN - Crawl archive and collect all PDF entries
// ============================================================
async function phaseScan() {
  console.log('=== Сканирование архива dvarmalchus.org ===\n');

  const allEntries = [];

  for (let page = 1; page <= ARCHIVE_PAGES; page++) {
    const url = page === 1 ? ARCHIVE_BASE : `${ARCHIVE_BASE}page/${page}/`;
    process.stdout.write(`  Страница ${page}/${ARCHIVE_PAGES}...`);

    try {
      const html = await fetchText(url);
      const entries = parseArchivePage(html);
      console.log(` ${entries.length} записей`);
      allEntries.push(...entries);
    } catch (err) {
      console.error(` ошибка: ${err.message}`);
    }

    await sleep(1000); // Be polite
  }

  console.log(`\nВсего записей из архива: ${allEntries.length}`);

  // For entries without PDF URL, fetch from individual post pages
  let needFetch = allEntries.filter(e => !e.pdfUrl).length;
  if (needFetch > 0) {
    console.log(`\nЗагрузка PDF-ссылок из ${needFetch} отдельных страниц...`);

    let fetched = 0;
    for (const entry of allEntries) {
      if (entry.pdfUrl || !entry.pageUrl) continue;

      fetched++;
      process.stdout.write(`\r  ${fetched}/${needFetch}...`);

      const pdfUrl = await fetchPdfFromPost(entry.pageUrl);
      if (pdfUrl) entry.pdfUrl = pdfUrl;

      await sleep(500);
    }
    console.log(`\r  Готово: ${fetched}/${needFetch}`);
  }

  // Analyze each entry
  const results = allEntries.map(entry => {
    const parshaId = detectParsha(entry.title);
    const allParshas = detectAllParshas(entry.title);
    const holiday = detectHoliday(entry.title);
    const hebrewYear = detectHebrewYear(entry.title);

    return {
      title: entry.title,
      pdfUrl: entry.pdfUrl,
      pageUrl: entry.pageUrl,
      date: entry.date,
      parshaId,
      allParshas,
      holiday,
      hebrewYear,
      hasPdf: !!entry.pdfUrl,
    };
  });

  // Summary
  const withPdf = results.filter(r => r.hasPdf).length;
  const withParsha = results.filter(r => r.parshaId).length;
  const withHoliday = results.filter(r => r.holiday).length;
  const combined = results.filter(r => r.allParshas.length > 1).length;

  console.log(`\n=== Результаты сканирования ===`);
  console.log(`  Всего записей: ${results.length}`);
  console.log(`  С PDF-ссылкой: ${withPdf}`);
  console.log(`  С парашой: ${withParsha}`);
  console.log(`  Праздничные: ${withHoliday}`);
  console.log(`  Двойные парашиёт: ${combined}`);
  console.log(`  Без PDF: ${results.length - withPdf}`);

  // Show by year
  const byYear = {};
  for (const r of results) {
    const y = r.hebrewYear || 'unknown';
    byYear[y] = (byYear[y] || 0) + 1;
  }
  console.log(`\n  По годам:`);
  for (const [y, cnt] of Object.entries(byYear).sort()) {
    console.log(`    ${y}: ${cnt}`);
  }

  // Save
  fs.writeFileSync(SCAN_FILE, JSON.stringify(results, null, 2));
  console.log(`\nСохранено: ${SCAN_FILE}`);

  // Show samples
  console.log('\n=== Примеры ===');
  for (const r of results.slice(0, 10)) {
    console.log(`\n  "${r.title}"`);
    console.log(`  PDF: ${r.hasPdf ? '✅' : '❌'} | Парша: ${r.parshaId || '-'} | Праздник: ${r.holiday || '-'} | Год: ${r.hebrewYear || '-'}`);
    if (r.pdfUrl) console.log(`  URL: ${r.pdfUrl.substring(0, 80)}...`);
  }
}

// ============================================================
// Phase: IMPORT - Import scanned entries into ShabbatHub DB
// ============================================================
async function phaseImport() {
  console.log('=== Импорт Двар Малхус в ShabbatHub ===\n');

  if (!fs.existsSync(SCAN_FILE)) {
    console.log('Сначала выполните: node import-dvar-malchus.mjs scan');
    return;
  }

  const entries = JSON.parse(fs.readFileSync(SCAN_FILE, 'utf-8'));
  const withPdf = entries.filter(e => e.pdfUrl);
  console.log(`Записей с PDF: ${withPdf.length}\n`);

  // Auto-detect parshaId from title if not set
  for (const e of withPdf) {
    if (!e.parshaId) e.parshaId = detectParsha(e.title);
    if (!e.holiday) e.holiday = detectHoliday(e.title);
  }

  const withParsha = withPdf.filter(e => e.parshaId).length;
  const withHoliday = withPdf.filter(e => e.holiday).length;
  console.log(`  С парашой: ${withParsha}, Праздничные: ${withHoliday}\n`);

  // 1. Find or create "Dvar Malchus" publication
  console.log('Ищем публикацию "Двар Малхус"...');
  let publication = await findPublication('דבר מלכות');

  if (!publication) {
    console.log('Создаём публикацию "Двар Малхус"...');
    publication = await createPublication({
      title_ru: 'Двар Малхус',
      title_en: 'Dvar Malchus',
      title_he: 'דבר מלכות',
      description_ru: 'Еженедельный листок с учениями Любавичского Ребе',
      description_en: 'Weekly pamphlet with teachings of the Lubavitcher Rebbe',
      description_he: 'עלון שבועי עם תורת הרבי מליובאוויטש',
      frequency: 'weekly',
      primary_language: 'he',
      website_url: 'https://dvarmalchus.org',
    });
    console.log(`  Создана: ${publication.id}`);
  } else {
    console.log(`  Найдена: ${publication.id}`);
  }

  // 2. Get existing issues to avoid duplicates
  const existingPdfs = await getExistingPdfUrls(publication.id);
  console.log(`Существующих выпусков: ${existingPdfs.size}\n`);

  // 3. Get events for holiday matching
  const events = await getEvents();
  console.log(`Праздников в БД: ${events.length}\n`);

  // 4. Get admin user ID
  const adminId = await getAdminUserId();
  console.log(`Admin ID: ${adminId}\n`);

  // 5. Import each entry
  let added = 0, skipped = 0, failed = 0;

  for (let i = 0; i < withPdf.length; i++) {
    const entry = withPdf[i];
    const progress = `[${i + 1}/${withPdf.length}]`;

    // Check for duplicate
    if (existingPdfs.has(entry.pdfUrl)) {
      skipped++;
      continue;
    }

    try {
      // Find event_id if holiday
      let eventId = null;
      if (entry.holiday) {
        const ev = events.find(e => e.name_en === entry.holiday);
        if (ev) eventId = ev.id;
      }

      // Build title for ShabbatHub
      const issueTitle = `דבר מלכות - ${entry.title}`;

      const issueData = {
        publication_id: publication.id,
        title: issueTitle,
        pdf_url: entry.pdfUrl,
        parsha_id: entry.parshaId || null,
        event_id: eventId,
        hebrew_year: entry.hebrewYear || null,
        is_active: true,
        uploaded_by: adminId,
      };

      await createIssue(issueData);
      existingPdfs.add(entry.pdfUrl);

      console.log(`${progress} ✅ ${entry.title.substring(0, 50)} (парша: ${entry.parshaId || '-'}, праздник: ${entry.holiday || '-'})`);
      added++;

      await sleep(300);
    } catch (err) {
      console.error(`${progress} ❌ ${entry.title.substring(0, 40)}: ${err.message}`);
      failed++;
    }
  }

  console.log('\n══════════════════════════════════');
  console.log(`✅ Добавлено: ${added}`);
  console.log(`⏭️  Уже были: ${skipped}`);
  console.log(`❌ Ошибки: ${failed}`);
  console.log('══════════════════════════════════');
}

// ============================================================
// Supabase API helpers
// ============================================================
async function findPublication(titleHe) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/publications?title_he=eq.${encodeURIComponent(titleHe)}&limit=1`,
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  const data = await res.json();
  return data && data.length > 0 ? data[0] : null;
}

async function createPublication(data) {
  // First get admin user for created_by
  const adminId = await getAdminUserId();
  data.created_by = adminId;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/publications`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Create publication: ' + (await res.text()));
  const result = await res.json();
  return result[0] || result;
}

async function getAdminUserId() {
  // Get first admin user
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?role=eq.admin&limit=1`,
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  const data = await res.json();
  if (!data || data.length === 0) throw new Error('No admin user found');
  return data[0].id;
}

async function getEvents() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/events?is_active=eq.true`,
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  return await res.json();
}

async function getExistingPdfUrls(publicationId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?publication_id=eq.${publicationId}&select=pdf_url&limit=5000`,
    { headers: { 'apikey': SUPABASE_KEY } }
  );
  const data = await res.json();
  return new Set((data || []).map(d => d.pdf_url));
}

async function createIssue(data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/issues`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Create issue: ' + (await res.text()));
  return await res.json();
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('📖 Импорт Двар Малхус в ShabbatHub\n');

  switch (PHASE) {
    case 'scan':
      await phaseScan();
      break;
    case 'import':
      await phaseImport();
      break;
    default:
      console.log('Использование:\n');
      console.log('  Шаг 1: node import-dvar-malchus.mjs scan     # Сканировать архив');
      console.log('  Шаг 2: node import-dvar-malchus.mjs import   # Импортировать в БД');
      console.log('\nСайт: https://dvarmalchus.org');
  }
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
