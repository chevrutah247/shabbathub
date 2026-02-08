#!/usr/bin/env node
/**
 * ShabbatHub Migration: WordPress → Supabase
 * 
 * Перед запуском:
 *   1. Убедитесь что в .env.local есть NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   2. Добавьте колонки в Supabase (SQL Editor):
 *      ALTER TABLE issues ADD COLUMN IF NOT EXISTS wp_original_id INTEGER UNIQUE;
 *      ALTER TABLE issues ADD COLUMN IF NOT EXISTS wp_original_url TEXT;
 *      ALTER TABLE publications ADD COLUMN IF NOT EXISTS wp_original_id INTEGER UNIQUE;
 * 
 * Запуск:
 *   cd shabbathub-next
 *   node migrate-wp.mjs
 * 
 * Скрипт безопасен для повторного запуска — уже импортированные документы пропускаются.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const WP_API = 'https://shabbathub.com/wp-json/wp/v2';
const PER_PAGE = 50;
const DELAY_MS = 300;

// ── Load .env.local ──
const __dirname = dirname(fileURLToPath(import.meta.url));
function loadEnv() {
  try {
    const content = readFileSync(resolve(__dirname, '.env.local'), 'utf-8');
    const vars = {};
    content.split('\n').forEach(line => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) vars[m[1].trim()] = m[2].trim();
    });
    return vars;
  } catch {
    console.error('❌ Не могу прочитать .env.local — запускайте из папки shabbathub-next');
    process.exit(1);
  }
}

const env = loadEnv();
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── WP API helper ──
async function wpFetch(endpoint) {
  const url = `${WP_API}${endpoint}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WP API ${res.status}: ${url}`);
  return {
    data: await res.json(),
    total: parseInt(res.headers.get('X-WP-Total') || '0'),
    totalPages: parseInt(res.headers.get('X-WP-TotalPages') || '0'),
  };
}

// ── Parsha detection ──
const P = [
  [1,'берешит','bereish?it','בראשית'],
  [2,'ноах','noa[ch]h?','נח(?:\\s|$)'],
  [3,'лех[\\s-]?леха?','lech[\\s-]?lecha','לך[\\s-]?לך'],
  [4,'ваера|ваейра','vay?eira','וירא'],
  [5,'хаей[\\s-]?сара','chayei[\\s-]?sarah?','חיי[\\s-]?שרה'],
  [6,'толдот','toldos|toldot','תולדות'],
  [7,'ваец[еэ]й?','vayeitz?ei|vayetze','ויצא'],
  [8,'ваишлах','vayishlach','וישלח'],
  [9,'ваешев','vayeshev','וישב'],
  [10,'микец','miketz','מקץ'],
  [11,'ваигаш','vayigash','ויגש'],
  [12,'ваехи|вайехи','vayechi','ויחי'],
  [13,'шмот|шемот','shm?ot|shemos','שמות'],
  [14,'ваэра|воэйро',"va'?eira",'וארא'],
  [15,'(?<![а-яa-z])бо(?![а-яa-z])','(?<![a-z])bo(?![a-z])','(?<![\\u0590-\\u05FF])בא(?![\\u0590-\\u05FF])'],
  [16,'бешалах','beshalach','בשלח'],
  [17,'итро|исро','yis?ro|jethro','יתרו'],
  [18,'мишпатим','mishpatim','משפטים'],
  [19,'трума|терума','terumah?|trumah?','תרומה'],
  [20,'тецаве','tetzaveh?','תצוה'],
  [21,'ки[\\s-]?тиса','ki[\\s-]?tis[sa]','כי[\\s-]?תשא'],
  [22,'ваякгел|ваякхел','vayakhel','ויקהל'],
  [23,'пекудей|пкудей','p[ie]kudei','פקודי'],
  [24,'ваикра','vayikra','ויקרא'],
  [25,'(?<![а-яa-z])цав(?![а-яa-z])','(?<![a-z])tzav(?![a-z])','(?<![\\u0590-\\u05FF])צו(?![\\u0590-\\u05FF])'],
  [26,'шмини|шемини','sh[e]?mini','שמיני'],
  [27,'тазриа','tazria','תזריע'],
  [28,'мецора','metzora','מצורע'],
  [29,'ахарей','acharei','אחרי'],
  [30,'кдошим|кедошим','kedoshim','קדושים'],
  [31,'эмор','emor','אמור'],
  [32,'бехар|беhар','behar','בהר'],
  [33,'бехукотай','bechukot','בחוקותי'],
  [34,'бамидбар','bamidbar','במדבר'],
  [35,'насо','nasso?','נשא'],
  [36,'бехаалотха','behaalot','בהעלותך'],
  [37,'шлах|шелах',"sh[e']?lach",'שלח(?![\\u0590-\\u05FF])'],
  [38,'корах','korach','קרח|קורח'],
  [39,'хукат','chuk[as]t','חוקת'],
  [40,'балак','balak','בלק'],
  [41,'пинхас','pinchas','פינחס'],
  [42,'матот','mato[st]','מטות'],
  [43,'масэй','mas.?ei','מסעי'],
  [44,'дварим','devarim','דברים'],
  [45,'ваэтханан','vaes?chanan','ואתחנן'],
  [46,'экев|эйкев','e[i]?kev','עקב'],
  [47,'реэ|рээ',"re'?eh",'ראה'],
  [48,'шофтим','shoftim','שופטים'],
  [49,'ки[\\s-]?тецэ|ки[\\s-]?тецей','ki[\\s-]?teitz','כי[\\s-]?תצא'],
  [50,'ки[\\s-]?таво','ki[\\s-]?tavo','כי[\\s-]?תבוא'],
  [51,'ницавим','nitzavim','ניצבים'],
  [52,'ваелех|вайелех','vayelech','וילך'],
  [53,'аазину|гаазину|хаазину','haazinu','האזינו'],
  [54,'везот','v.?zot','וזאת'],
];

const parshaRegexes = P.map(([orderNum, ...patterns]) => ({
  orderNum,
  regex: new RegExp(patterns.join('|'), 'i'),
}));

function detectParsha(title) {
  for (const { orderNum, regex } of parshaRegexes) {
    if (regex.test(title)) return orderNum;
  }
  return null;
}

function extractYear(title) {
  const m = title.match(/\b(57[0-9]{2})\b/);
  return m ? parseInt(m[1]) : null;
}

function extractIssueNumber(title) {
  for (const p of [/№\s*(\d+)/, /#\s*(\d+)/, /[\s_](\d{3,4})[\s_-]/]) {
    const m = title.match(p);
    if (m) return m[1];
  }
  return null;
}

function detectLang(title) {
  if (/[\u0590-\u05FF]/.test(title)) return 'he';
  if (/[\u0400-\u04FF]/.test(title)) return 'ru';
  return 'en';
}

// ════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════
async function main() {
  console.log('🚀 ShabbatHub: WordPress → Supabase');
  console.log('═'.repeat(45) + '\n');

  // 1. Load parshiot
  console.log('📖 Загружаю парашиёт из Supabase...');
  const { data: parshiot } = await supabase.from('parshiot').select('id, order_num, name_ru').order('order_num');
  if (!parshiot?.length) { console.error('❌ Парашиёт не найдены. Заполните таблицу parshiot!'); process.exit(1); }
  const parshaMap = {};
  parshiot.forEach(p => { parshaMap[p.order_num] = p; });
  console.log(`   ✅ ${parshiot.length} парашиёт\n`);

  // 2. Load existing migrated IDs
  const { data: existing } = await supabase.from('issues').select('wp_original_id').not('wp_original_id', 'is', null);
  const doneSet = new Set((existing || []).map(r => r.wp_original_id));
  console.log(`⏭️  Уже импортировано: ${doneSet.size}\n`);

  // 3. Count WP documents
  const { total, totalPages } = await wpFetch('/document?per_page=1');
  const pages = Math.ceil(total / PER_PAGE);
  console.log(`📄 Всего в WordPress: ${total} документов (${pages} страниц)\n`);

  let ok = 0, skip = 0, fail = 0;
  const failedDocs = [];

  // 4. Process page by page
  for (let page = 1; page <= pages; page++) {
    console.log(`── Страница ${page}/${pages} ──`);
    
    let docs;
    try {
      const result = await wpFetch(`/document?per_page=${PER_PAGE}&page=${page}`);
      docs = result.data;
    } catch (err) {
      console.error(`   ❌ Ошибка загрузки страницы ${page}: ${err.message}`);
      continue;
    }

    for (const doc of docs) {
      const title = doc.title?.rendered || `[untitled-${doc.id}]`;

      if (doneSet.has(doc.id)) { skip++; continue; }

      // Fetch media (PDF + thumbnail)
      let pdfUrl = null, thumbUrl = null, fileSize = null;

      if (doc.featured_media) {
        try {
          await sleep(DELAY_MS);
          const { data: media } = await wpFetch(`/media/${doc.featured_media}`);
          pdfUrl = media.source_url;
          fileSize = media.media_details?.filesize || null;
          const sizes = media.media_details?.sizes;
          thumbUrl = sizes?.medium?.source_url || sizes?.large?.source_url || sizes?.thumbnail?.source_url || null;
        } catch (err) {
          // Try attachment endpoint
          try {
            const { data: atts } = await wpFetch(`/media?parent=${doc.id}&per_page=1`);
            if (atts?.[0]?.source_url) {
              pdfUrl = atts[0].source_url;
              fileSize = atts[0].media_details?.filesize || null;
              const sizes = atts[0].media_details?.sizes;
              thumbUrl = sizes?.medium?.source_url || sizes?.thumbnail?.source_url || null;
            }
          } catch {}
        }
      }

      if (!pdfUrl) {
        console.log(`   ⚠️  Нет PDF: "${title.substring(0, 50)}"`);
        failedDocs.push({ id: doc.id, title, reason: 'no_pdf' });
        fail++;
        continue;
      }

      // Parse metadata
      const parshaNum = detectParsha(title);
      const parshaId = parshaNum ? parshaMap[parshaNum]?.id : null;
      const hebrewYear = extractYear(title);
      const issueNum = extractIssueNumber(title);

      const row = {
        title,
        pdf_url: pdfUrl,
        thumbnail_url: thumbUrl,
        file_size: fileSize,
        gregorian_date: doc.date_gmt?.split('T')[0] || null,
        hebrew_year: hebrewYear,
        issue_number: issueNum || null,
        parsha_id: parshaId,
        is_active: true,
        wp_original_id: doc.id,
        wp_original_url: doc.link,
      };

      const { error } = await supabase.from('issues').insert([row]);

      if (error) {
        console.log(`   ❌ "${title.substring(0, 40)}": ${error.message}`);
        failedDocs.push({ id: doc.id, title, reason: error.message });
        fail++;
      } else {
        ok++;
        const pName = parshaNum ? ` [${parshaMap[parshaNum]?.name_ru}]` : '';
        console.log(`   ✅ ${ok}: ${title.substring(0, 50)}${pName}`);
      }
    }

    await sleep(DELAY_MS);
  }

  // 5. Summary
  console.log('\n' + '═'.repeat(45));
  console.log('📊 Итоги миграции:');
  console.log(`   ✅ Импортировано: ${ok}`);
  console.log(`   ⏭️  Пропущено (уже есть): ${skip}`);
  console.log(`   ❌ Ошибок: ${fail}`);
  console.log(`   📄 Всего в WP: ${total}`);
  console.log('═'.repeat(45));

  // Save failed docs log
  if (failedDocs.length > 0) {
    writeFileSync('migration-errors.json', JSON.stringify(failedDocs, null, 2));
    console.log('\n💡 Ошибки сохранены в migration-errors.json');
    console.log('   Перезапустите скрипт — уже импортированные будут пропущены.');
  }

  console.log('\n✨ Готово!');
}

main().catch(err => {
  console.error('💀 Критическая ошибка:', err);
  process.exit(1);
});
