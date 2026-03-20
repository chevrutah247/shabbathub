#!/usr/bin/env node
/**
 * ShabbatHub — Automatic Topic Tagger
 *
 * Scans content_text + title + ai_summary of every issue
 * and assigns topic_keys[] and topic_terms based on keyword matching.
 *
 * NO AI API needed — pure keyword matching, fast and free.
 *
 * Usage:
 *   node auto-tag-topics.mjs              # Process all untagged issues
 *   node auto-tag-topics.mjs --all        # Re-tag ALL issues (overwrite)
 *   node auto-tag-topics.mjs --stats      # Show topic distribution
 *   node auto-tag-topics.mjs --dry-run    # Preview without saving
 */

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY1MzYwMSwiZXhwIjoyMDg1MjI5NjAxfQ.qOKeP8vBe2YjCL8SA-1NkSVNvMzWUQMyd30CAOf4ZVA';

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
};

// ══════════════════════════════════════════
// TOPIC DICTIONARY — keywords in ru/en/he/yi
// ══════════════════════════════════════════
const TOPICS = {
  shabbat_laws: {
    keywords: ['шабб', 'шабат', 'субботн', 'shabb', 'shabbos', 'shabbat', 'שבת', 'הלכות שבת', 'מלאכ', 'melacha', 'мелаха', 'канун субботы', 'зажигание свеч', 'авдала', 'havdalah', 'הבדלה', 'הדלקת נרות', 'кидуш', 'kiddush', 'קידוש'],
    terms: 'шаббат, субботний, shabbat, shabbos, שבת, הלכות שבת, мелаха, melacha, зажигание свечей, авдала, кидуш',
  },
  parsha_commentary: {
    keywords: ['недельн', 'парш', 'parshat', 'parshas', 'parsha', 'פרשת', 'פרשה', 'седра', 'sedra', 'глава торы', 'глав тор', 'weekly portion', 'torah portion'],
    terms: 'недельная глава, парша, parsha, parshat, פרשת השבוע, седра, torah portion',
  },
  chassidus_hashkafa: {
    keywords: ['хасид', 'chassid', 'חסיד', 'חסידות', 'тания', 'tanya', 'תניא', 'маамар', 'maamar', 'מאמר', 'ликутей', 'likutei', 'לקוטי', 'фарбренген', 'farbrengen', 'התוועדות', 'хасидут', 'chassidus', 'chassidut', 'משפיע'],
    terms: 'хасидут, хасидизм, chassidus, chassidut, חסידות, тания, tanya, תניא, маамар, maamar, ликутей, фарбренген',
  },
  rebbe_teachings: {
    keywords: ['ребе', 'rebbe', 'רבי', 'любавич', 'lubavitch', 'חב"ד', 'хабад', 'chabad', 'игрот кодеш', 'igros kodesh', 'אגרות קודש', 'сиха', 'sicha', 'שיחה', 'sichos', 'менахем мендел', 'menachem mendel', 'шнеерсон', 'schneerson', 'מלך המשיח', 'שליט"א'],
    terms: 'ребе, любавичский ребе, rebbe, lubavitcher rebbe, רבי, חב"ד, хабад, chabad, игрот кодеш, сихот',
  },
  moshiach_geula: {
    keywords: ['мошиах', 'mashiach', 'moshiach', 'משיח', 'геула', 'geula', 'גאולה', 'избавлен', 'redemption', 'גואל', 'йемот hа-мошиах', 'ימות המשיח', 'бейт hа-микдаш', 'בית המקדש', 'третий храм'],
    terms: 'мошиах, машиах, moshiach, mashiach, משיח, геула, geula, גאולה, избавление, redemption, бейт hа-микдаш',
  },
  halacha: {
    keywords: ['галах', 'halacha', 'halach', 'הלכ', 'шулхан арух', 'shulchan aruch', 'שולחן ערוך', 'мишна брура', 'mishna berura', 'משנה ברורה', 'פסק', 'псак', 'דין', 'закон', 'запрещен', 'разрешен', 'מותר', 'אסור', 'кашер', 'כשר'],
    terms: 'галаха, halacha, הלכה, шулхан арух, мишна брура, закон, псак, дин',
  },
  kashrut: {
    keywords: ['кашрут', 'kashrut', 'kashrus', 'כשרות', 'кошерн', 'kosher', 'כשר', 'трейф', 'treif', 'טריפ', 'мясо и молоко', 'בשר וחלב', 'шхита', 'shechita', 'שחיטה', 'бдика', 'בדיקה', 'hехшер', 'הכשר'],
    terms: 'кашрут, kashrut, כשרות, кошер, kosher, כשר, мясо и молоко, шхита, hехшер',
  },
  holidays: {
    keywords: ['праздни', 'holiday', 'חג', 'пурим', 'purim', 'פורים', 'песах', 'pesach', 'passover', 'פסח', 'ханук', 'chanuk', 'hanuk', 'חנוכ', 'суккот', 'sukkot', 'סוכות', 'sukk', 'рош а-шан', 'rosh hashan', 'ראש השנה', 'йом кипур', 'yom kippur', 'יום כיפור', 'шавуот', 'shavuot', 'שבועות', 'симхат тора', 'simchat torah', 'שמחת תורה', 'лаг ба-омер', 'lag baomer', 'ל"ג בעומר', 'ту би-шват', 'tu bishvat', 'ט"ו בשבט'],
    terms: 'праздники, holidays, חגים, пурим, песах, ханука, суккот, рош а-шана, йом кипур, шавуот',
  },
  family_education: {
    keywords: ['воспитан', 'chinuch', 'חינוך', 'дет', 'children', 'kids', 'ילד', 'семь', 'family', 'משפחה', 'родител', 'parent', 'הורים', 'школ', 'school', 'ешива', 'yeshiva', 'ישיבה', 'семинар', 'seminary'],
    terms: 'воспитание, chinuch, חינוך, дети, семья, family, children, родители, ешива',
  },
  relationships_shalom_bayit: {
    keywords: ['шалом байт', 'shalom bayit', 'שלום בית', 'брак', 'marriage', 'נישואין', 'супруг', 'spouse', 'муж и жен', 'husband', 'wife', 'בעל', 'אשה', 'шидух', 'shidduch', 'שידוך', 'свадьб', 'wedding', 'חתונה', 'хупа', 'chuppah', 'חופה'],
    terms: 'шалом байт, shalom bayit, שלום בית, брак, marriage, свадьба, шидухим, хупа',
  },
  women_modesty: {
    keywords: ['цниют', 'tznius', 'צניעות', 'скромност', 'modesty', 'modest', 'парик', 'sheitel', 'פאה', 'wig', 'тихель', 'tichel', 'מטפח', 'покрытие голов', 'head cover', 'כיסוי ראש', 'женщин', 'women', 'נשים', 'дочер', 'daughter'],
    terms: 'цниют, tznius, צניעות, скромность, modesty, парик, sheitel, פאה, wig, покрытие головы, тихель',
  },
  prayer_tefilah: {
    keywords: ['молитв', 'prayer', 'תפיל', 'теилим', 'tehillim', 'תהילים', 'сидур', 'siddur', 'סידור', 'давенен', 'daven', 'шмоне эсре', 'shmoneh esrei', 'שמונה עשרה', 'браха', 'beracha', 'ברכ', 'каванот', 'kavanot', 'כוונ'],
    terms: 'молитва, prayer, תפילה, теилим, tehillim, תהילים, сидур, браха, давенинг',
  },
  stories_history: {
    keywords: ['истори', 'рассказ', 'story', 'stories', 'סיפור', 'sippur', 'מעשה', 'маасе', 'maaseh', 'цадик', 'tzaddik', 'צדיק', 'легенд', 'legend', 'биограф', 'biography', 'תולדות', 'йорцайт', 'yahrzeit', 'yahrtzeit', 'הילולא'],
    terms: 'истории, рассказы, stories, סיפורים, маасе, цадиким, биография, йорцайт',
  },
  emunah_bitachon: {
    keywords: ['эмуна', 'emunah', 'אמונ', 'битахон', 'bitachon', 'ביטחון', 'доверие', 'trust', 'вера', 'faith', 'провиден', 'hashgacha', 'השגחה', 'испытан', 'nisayon', 'ניסיון', 'чудо', 'miracle', 'נס'],
    terms: 'эмуна, emunah, אמונה, битахон, bitachon, ביטחון, вера, faith, доверие, испытание',
  },
  mussar_middot: {
    keywords: ['мусар', 'mussar', 'מוסר', 'мидот', 'middot', 'מידות', 'нравствен', 'character', 'гнев', 'anger', 'כעס', 'скромн', 'смирен', 'humble', 'ענווה', 'зависть', 'envy', 'קנאה', 'гордын', 'pride', 'גאווה', 'тшува', 'teshuva', 'teshuvah', 'תשובה', 'раскаяни'],
    terms: 'мусар, mussar, מוסר, мидот, middot, מידות, тшува, teshuva, תשובה, нравственность, характер',
  },
  torah_study: {
    keywords: ['изучен', 'study', 'לימוד', 'урок', 'lesson', 'shiur', 'שיעור', 'хеврута', 'chavruta', 'חברותא', 'мишна', 'mishna', 'משנה', 'гемара', 'gemara', 'גמרא', 'талмуд', 'talmud', 'תלמוד', 'рамбам', 'rambam', 'רמב"ם', 'hалаха йомит', 'daily halacha'],
    terms: 'изучение торы, torah study, לימוד תורה, шиур, мишна, гемара, талмуд, рамбам',
  },
  kabbalah: {
    keywords: ['каббал', 'kabbala', 'קבל', 'зоhар', 'zohar', 'זוהר', 'сфирот', 'sefirot', 'ספירות', 'гематри', 'gematria', 'גימטריא', 'тикун', 'tikkun', 'תיקון', 'нешама', 'neshama', 'נשמה', 'гилгул', 'gilgul', 'גלגול'],
    terms: 'каббала, kabbalah, קבלה, зоhар, zohar, זוהר, сфирот, гематрия, нешама',
  },
  eretz_yisrael: {
    keywords: ['эрец исраэль', 'eretz yisrael', 'ארץ ישראל', 'израил', 'israel', 'ישראל', 'иерусалим', 'jerusalem', 'ירושלים', 'алия', 'aliyah', 'עלייה', 'святая земля', 'holy land'],
    terms: 'эрец исраэль, eretz yisrael, ארץ ישראל, израиль, иерусалим, jerusalem, ירושלים',
  },
  health_mind: {
    keywords: ['здоров', 'health', 'בריאות', 'рефуа', 'refuah', 'רפואה', 'медицин', 'medicine', 'psycholog', 'психолог', 'менталь', 'mental', 'стресс', 'stress', 'тревог', 'anxiety', 'депресс', 'depress'],
    terms: 'здоровье, health, בריאות, рефуа, refuah, רפואה, психология, mental health',
  },
  community: {
    keywords: ['общин', 'community', 'קהילה', 'кагал', 'kehilla', 'синагог', 'synagogue', 'בית כנסת', 'миква', 'mikvah', 'mikveh', 'מקווה', 'раввин', 'rabbi', 'רב', 'бейт дин', 'beis din', 'בית דין'],
    terms: 'община, community, קהילה, синагога, миква, раввин, бейт дин',
  },
};

function classifyIssue(title, contentText, aiSummary) {
  const combined = [title || '', contentText || '', aiSummary || ''].join(' ').toLowerCase();

  const matchedTopics = [];
  const matchedTerms = new Set();

  for (const [topicKey, topicData] of Object.entries(TOPICS)) {
    let matched = false;
    for (const kw of topicData.keywords) {
      if (combined.includes(kw.toLowerCase())) {
        matched = true;
        break;
      }
    }
    if (matched) {
      matchedTopics.push(topicKey);
      // Add all terms for this topic
      for (const term of topicData.terms.split(',')) {
        matchedTerms.add(term.trim());
      }
    }
  }

  return {
    topic_keys: matchedTopics.length > 0 ? matchedTopics : null,
    topic_terms: matchedTerms.size > 0 ? [...matchedTerms].join(', ') : null,
  };
}

async function processIssues(retagAll, dryRun) {
  const PAGE_SIZE = 500;
  let offset = 0;
  let totalProcessed = 0;
  let totalTagged = 0;
  let totalSkipped = 0;
  const topicCounts = {};

  const filter = retagAll
    ? 'is_active=eq.true'
    : 'is_active=eq.true&topic_keys=is.null';

  while (true) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/issues?${filter}&select=id,title,content_text,ai_summary&order=created_at.desc`,
      { headers: { ...headers, Range: `${offset}-${offset + PAGE_SIZE - 1}`, Prefer: 'count=exact' } }
    );

    if (!res.ok) {
      console.error(`Fetch error: ${res.status}`);
      break;
    }

    const issues = await res.json();
    if (!Array.isArray(issues) || issues.length === 0) break;

    const updates = [];

    for (const issue of issues) {
      const { topic_keys, topic_terms } = classifyIssue(
        issue.title,
        (issue.content_text || '').substring(0, 5000), // first 5000 chars
        issue.ai_summary
      );

      if (topic_keys) {
        updates.push({ id: issue.id, topic_keys, topic_terms });
        for (const tk of topic_keys) {
          topicCounts[tk] = (topicCounts[tk] || 0) + 1;
        }
        totalTagged++;
      } else {
        totalSkipped++;
      }
    }

    // Batch save
    if (!dryRun && updates.length > 0) {
      // Save in chunks of 50
      for (let i = 0; i < updates.length; i += 50) {
        const chunk = updates.slice(i, i + 50);
        const promises = chunk.map(u =>
          fetch(`${SUPABASE_URL}/rest/v1/issues?id=eq.${u.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ topic_keys: u.topic_keys, topic_terms: u.topic_terms }),
          })
        );
        await Promise.all(promises);
      }
    }

    totalProcessed += issues.length;
    process.stdout.write(`\rProcessed: ${totalProcessed} | Tagged: ${totalTagged} | Skipped: ${totalSkipped}`);

    if (issues.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  console.log(`\n\nDone! Processed: ${totalProcessed}, Tagged: ${totalTagged}, Skipped: ${totalSkipped}`);
  console.log(`${dryRun ? '(DRY RUN — nothing saved)' : ''}`);
  console.log('\nTopic distribution:');
  const sorted = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
  for (const [topic, count] of sorted) {
    console.log(`  ${topic}: ${count}`);
  }
}

async function showStats() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?is_active=eq.true&topic_keys=not.is.null&select=topic_keys&limit=10000`,
    { headers: { ...headers, Range: '0-9999' } }
  );
  const issues = await res.json();

  const topicCounts = {};
  for (const issue of issues) {
    for (const tk of (issue.topic_keys || [])) {
      topicCounts[tk] = (topicCounts[tk] || 0) + 1;
    }
  }

  const totalWithKeys = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?is_active=eq.true&topic_keys=not.is.null&select=id`,
    { headers: { ...headers, Prefer: 'count=exact', Range: '0-0' } }
  );
  const range = totalWithKeys.headers.get('content-range');
  const withKeys = range ? parseInt(range.split('/')[1]) : 0;

  const totalAll = await fetch(
    `${SUPABASE_URL}/rest/v1/issues?is_active=eq.true&select=id`,
    { headers: { ...headers, Prefer: 'count=exact', Range: '0-0' } }
  );
  const range2 = totalAll.headers.get('content-range');
  const all = range2 ? parseInt(range2.split('/')[1]) : 0;

  console.log(`=== Topic Stats ===`);
  console.log(`Total active issues: ${all}`);
  console.log(`With topic_keys: ${withKeys} (${Math.round(withKeys/all*100)}%)`);
  console.log(`Without topic_keys: ${all - withKeys}`);
  console.log('\nDistribution:');
  const sorted = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
  for (const [topic, count] of sorted) {
    console.log(`  ${topic}: ${count}`);
  }
}

const args = process.argv.slice(2);
if (args.includes('--stats')) {
  showStats();
} else {
  const retagAll = args.includes('--all');
  const dryRun = args.includes('--dry-run');
  processIssues(retagAll, dryRun);
}
