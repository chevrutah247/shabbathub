'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Search, ArrowRight, ChevronRight, Users, FileText, Star, Bell, ExternalLink, Library, Sparkles, BookMarked, Flame, Scale, Smile, Crown, FolderOpen, Heart, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Doc { id: string; title: string; thumbnail_url: string; gregorian_date: string; publication_id: string; }
interface SpotlightDoc { id: string; title: string; thumbnail_url: string; ai_summary: string; publication_id: string; }

const t: Record<string, Record<string, string>> = {
  heroTitle1: { ru: 'Крупнейшая', en: 'The Largest', he: 'הארכיון הדיגיטלי', uk: 'Найбільша' },
  heroTitle2: { ru: 'цифровая библиотека', en: 'Digital Library', he: 'הגדול ביותר', uk: 'цифрова бібліотека' },
  heroTitle3: { ru: 'материалов к Шаббату', en: 'of Shabbat Materials', he: 'של חומרי שבת', uk: 'матеріалів до Шаббату' },
  heroSub: { ru: 'Газеты, недельные главы Торы и печатные материалы на русском, английском, украинском и иврите', en: 'Newspapers, weekly Torah portions and printable materials in Russian, English, Ukrainian and Hebrew', he: 'עיתונים, פרשות שבוע וחומרים להדפסה ברוסית, אנגלית, אוקראינית ועברית', uk: 'Газети, тижневі глави Тори та друковані матеріали російською, англійською, українською та івритом' },
  searchPlaceholder: { ru: 'Найти материалы к Шаббату...', en: 'Find Shabbat materials...', he: '...חיפוש חומרי שבת', uk: 'Знайти матеріали до Шаббату...' },
  explore: { ru: 'Открыть каталог', en: 'Explore catalog', he: 'לקטלוג', uk: 'Відкрити каталог' },
  subscribe: { ru: 'Подписаться', en: 'Subscribe', he: 'הרשמה', uk: 'Підписатися' },
  latest: { ru: 'Свежие выпуски', en: 'Latest Issues', he: 'גיליונות אחרונים', uk: 'Свіжі випуски' },
  viewAll: { ru: 'Смотреть все →', en: 'View all →', he: '← הצג הכל', uk: 'Дивитись все →' },
  materials: { ru: 'материалов', en: 'materials', he: 'חומרים', uk: 'матеріалів' },
  publications: { ru: 'публикаций', en: 'publications', he: 'פרסומים', uk: 'публікацій' },
  languages: { ru: 'языка', en: 'languages', he: 'שפות', uk: 'мови' },
  yearsArchive: { ru: 'лет архива', en: 'years of archive', he: 'שנות ארכיון', uk: 'років архіву' },
  catTitle: { ru: 'Разделы библиотеки', en: 'Library Sections', he: 'מדורי הספרייה', uk: 'Розділи бібліотеки' },
  catSub: { ru: 'Выберите тему и найдите нужные материалы', en: 'Choose a topic and find the materials you need', he: 'בחרו נושא ומצאו את החומרים שאתם צריכים', uk: 'Оберіть тему та знайдіть потрібні матеріали' },
  catStories: { ru: 'Истории и история', en: 'Stories & History', he: 'סיפורים והיסטוריה', uk: 'Історії та історія' },
  catStoriesDesc: { ru: 'Увлекательные рассказы и исторические материалы', en: 'Fascinating stories and historical materials', he: 'סיפורים מרתקים וחומרים היסטוריים', uk: 'Захопливі розповіді та історичні матеріали' },
  catChassidut: { ru: 'Хасидут', en: 'Chassidut', he: 'חסידות', uk: 'Хасидут' },
  catChassidutDesc: { ru: 'Учение хасидизма и комментарии', en: 'Chassidic teachings and commentary', he: 'תורת החסידות ופירושים', uk: 'Вчення хасидизму та коментарі' },
  catHalacha: { ru: 'Галаха', en: 'Halacha', he: 'הלכה', uk: 'Галаха' },
  catHalachaDesc: { ru: 'Еврейский закон и практические руководства', en: 'Jewish law and practical guides', he: 'הלכה ומדריכים מעשיים', uk: 'Єврейський закон та практичні настанови' },
  catKids: { ru: 'Детям', en: 'For Kids', he: 'לילדים', uk: 'Дітям' },
  catKidsDesc: { ru: 'Материалы для детей и семейного чтения', en: 'Materials for children and family reading', he: 'חומרים לילדים ולקריאה משפחתית', uk: 'Матеріали для дітей та сімейного читання' },
  catMoshiach: { ru: 'Мошиах', en: 'Moshiach', he: 'משיח', uk: 'Мошіах' },
  catMoshiachDesc: { ru: 'Материалы о Мошиахе и Геуле', en: 'Materials about Moshiach and Redemption', he: 'חומרים על משיח וגאולה', uk: 'Матеріали про Мошіаха та Геулу' },
  catGeneral: { ru: 'Общее', en: 'General', he: 'כללי', uk: 'Загальне' },
  catGeneralDesc: { ru: 'Разнообразные еврейские материалы', en: 'Various Jewish materials', he: 'חומרים יהודיים מגוונים', uk: 'Різноманітні єврейські матеріали' },
  catMussar: { ru: 'Мусар', en: 'Mussar', he: 'מוסר', uk: 'Мусар' },
  catMussarDesc: { ru: 'Этика, самосовершенствование и работа над собой', en: 'Ethics, self-improvement and character development', he: 'מוסר, שיפור עצמי ופיתוח אישי', uk: 'Етика, самовдосконалення та робота над собою' },
  networkTitle: { ru: 'Chevrutah Network', en: 'Chevrutah Network', he: 'Chevrutah Network', uk: 'Chevrutah Network' },
  networkSub: { ru: 'Экосистема еврейских проектов', en: 'Jewish Projects Ecosystem', he: 'אקו-סיסטם של פרויקטים יהודיים', uk: 'Екосистема єврейських проєктів' },
  ctaTitle: { ru: 'Получайте свежие выпуски первыми', en: 'Get fresh issues first', he: 'קבלו גיליונות חדשים ראשונים', uk: 'Отримуйте свіжі випуски першими' },
  ctaSub: { ru: 'Подпишитесь и получайте новые материалы прямо на почту', en: 'Subscribe and receive new materials directly to your email', he: 'הירשמו וקבלו חומרים חדשים ישירות למייל', uk: 'Підпишіться та отримуйте нові матеріали прямо на пошту' },
  nossiToday: { ru: 'Сегодня читаем', en: 'Today we read', he: 'היום קוראים', uk: 'Сьогодні читаємо' },
  nossiTitle: { ru: 'Носси', en: 'Nossi', he: 'נשיא', uk: 'Носсі' },
  nossiDay: { ru: 'день Нисана', en: 'of Nissan', he: 'ניסן', uk: 'день Нісана' },
  nossiRead: { ru: 'Читать Носси', en: 'Read Nossi', he: 'קרא נשיא', uk: 'Читати Носсі' },
  nossiDesc: { ru: 'Каждый день с 1 по 12 Нисана мы читаем главу о приношении Носи (главы колен Израиля)', en: 'Each day from 1-12 Nissan we read the chapter about the offering of the Nasi (tribal leaders)', he: 'בכל יום מא\' עד י"ב ניסן קוראים את פרשת הנשיא של אותו יום', uk: 'Щодня з 1 по 12 Нісана ми читаємо главу про приношення Носі' },
  spotlight: { ru: 'Рекомендуем прочитать', en: 'Recommended Reading', he: 'מומלץ לקריאה', uk: 'Рекомендуємо прочитати' },
  spotlightSub: { ru: 'Интересные выпуски из нашего архива', en: 'Interesting issues from our archive', he: 'גיליונות מעניינים מהארכיון שלנו', uk: 'Цікаві випуски з нашого архіву' },
  readNow: { ru: 'Читать', en: 'Read', he: 'קרא', uk: 'Читати' },
};

function AnimateIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.unobserve(el); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>{children}</div>;
}

const networkProjects = [
  { name: 'ShabbatHub', desc: { ru: 'Архив материалов к Шаббату', en: 'Shabbat Materials Archive', he: 'ארכיון חומרי שבת', uk: 'Архів матеріалів до Шаббату' }, url: '/', icon: '📚', accent: '#1e3a8a' },
  { name: 'EdOnTheGo', desc: { ru: 'Изучение Торы онлайн', en: 'Torah Learning Online', he: 'לימוד תורה אונליין', uk: 'Вивчення Тори онлайн' }, url: 'https://edonthego.org', icon: '🎓', accent: '#065f46' },
  { name: 'CH Groups', desc: { ru: 'Группы изучения', en: 'Study Groups', he: 'קבוצות לימוד', uk: 'Групи вивчення' }, url: 'https://crownheightsgroups.com', icon: '👥', accent: '#92400e' },
  { name: 'GetAShidduch', desc: { ru: 'Еврейские знакомства', en: 'Jewish Matchmaking', he: 'שידוכים יהודיים', uk: 'Єврейські знайомства' }, url: 'https://getashidduch.org', icon: '💍', accent: '#b45309' },
];

const libraryFolders = [
  { slug: 'stories', icon: BookMarked, accent: '#6d28d9', accentLight: '#f5f3ff', title: 'catStories', desc: 'catStoriesDesc' },
  { slug: 'chassidut', icon: Flame, accent: '#0369a1', accentLight: '#f0f9ff', title: 'catChassidut', desc: 'catChassidutDesc' },
  { slug: 'halacha', icon: Scale, accent: '#15803d', accentLight: '#f0fdf4', title: 'catHalacha', desc: 'catHalachaDesc' },
  { slug: 'kids', icon: Smile, accent: '#ea580c', accentLight: '#fff7ed', title: 'catKids', desc: 'catKidsDesc' },
  { slug: 'moshiach', icon: Crown, accent: '#b45309', accentLight: '#fffbeb', title: 'catMoshiach', desc: 'catMoshiachDesc' },
  { slug: 'general', icon: FolderOpen, accent: '#1e3a8a', accentLight: '#eef2ff', title: 'catGeneral', desc: 'catGeneralDesc' },
  { slug: 'mussar', icon: Heart, accent: '#be123c', accentLight: '#fff1f2', title: 'catMussar', desc: 'catMussarDesc' },
];

export default function HomePage() {
  const { lang } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const g = (key: string) => t[key]?.[lang] || t[key]?.['ru'] || key;
  const [docs, setDocs] = useState<Doc[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [totalCount, setTotalCount] = useState(4044);
  const [pubCount, setPubCount] = useState(442);
  const [nossiDay, setNossiDay] = useState<number | null>(null);
  const [nossiIssue, setNossiIssue] = useState<{ id: string; title: string; pdf_url: string; thumbnail_url?: string } | null>(null);
  const [spotlightDocs, setSpotlightDocs] = useState<SpotlightDoc[]>([]);
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [spotlightFade, setSpotlightFade] = useState(true);
  const [pubMap, setPubMap] = useState<Record<string, string>>({});

  // Check if today is 1-12 Nissan and show Nossi
  const STORAGE = SUPABASE_URL + '/storage/v1/object/public/pdfs/uploads';
  const nossiPdfs: Record<number, string> = {
    1: STORAGE + '/Nossi-1-Nissan-1--1773976918697-mpkkpe.pdf',
    2: STORAGE + '/Nosi-Nissan-4-1773977063823-owf7mj.pdf',
    3: STORAGE + '/nossi-nissan-3.pdf',
    4: STORAGE + '/nossi-nissan-4.pdf',
    5: STORAGE + '/nossi-nissan-5.pdf',
    6: STORAGE + '/nossi-nissan-6.pdf',
    8: STORAGE + '/nossi-nissan-8.pdf',
    9: STORAGE + '/nossi-nissan-9.pdf',
    10: STORAGE + '/nossi-nissan-10.pdf',
    11: STORAGE + '/nossi-nissan-11.pdf',
    12: STORAGE + '/nossi-nissan-12.pdf',
  };
  useEffect(() => {
    const today = new Date();
    fetch('https://www.hebcal.com/converter?cfg=json&gy=' + today.getFullYear() + '&gm=' + (today.getMonth() + 1) + '&gd=' + today.getDate() + '&g2h=1')
      .then(r => r.json())
      .then(data => {
        if (data.hm === 'Nisan' && data.hd >= 1 && data.hd <= 12) {
          setNossiDay(data.hd);
          const pdfUrl = nossiPdfs[data.hd];
          if (pdfUrl) {
            setNossiIssue({ id: 'nossi-' + data.hd, title: 'Nossi - ' + data.hd + ' Nissan', pdf_url: pdfUrl });
          }
        }
      })
      .catch(() => {});
  }, []);

  // Fetch random spotlight docs with ai_summary
  useEffect(() => {
    // Fetch a batch of random interesting issues
    const offset = Math.floor(Math.random() * 200);
    fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&ai_summary=not.is.null&thumbnail_url=not.is.null&order=view_count.desc.nullslast&select=id,title,thumbnail_url,ai_summary,publication_id', { headers: { 'apikey': SUPABASE_KEY, 'Range': offset + '-' + (offset + 29) } })
      .then(r => r.json()).then(d => {
        if (Array.isArray(d) && d.length > 0) {
          // Filter for good summaries (not just auto-generated topic lists)
          const good = d.filter((x: SpotlightDoc) => x.ai_summary && x.ai_summary.length > 60 && !x.ai_summary.startsWith('Выпуск:'));
          // Shuffle
          for (let i = good.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [good[i], good[j]] = [good[j], good[i]]; }
          setSpotlightDocs(good.length > 0 ? good.slice(0, 12) : d.slice(0, 12));
        }
      });
    // Fetch publication names for spotlight
    fetch(SUPABASE_URL + '/rest/v1/publications?select=id,title_ru,title_en,title_he', { headers: { 'apikey': SUPABASE_KEY } })
      .then(r => r.json()).then(d => {
        if (Array.isArray(d)) {
          const m: Record<string, string> = {};
          d.forEach((p: any) => { m[p.id] = p.title_ru || p.title_en || p.title_he || ''; });
          setPubMap(m);
        }
      });
  }, []);

  // Rotate spotlight every 10 seconds
  useEffect(() => {
    if (spotlightDocs.length < 2) return;
    const timer = setInterval(() => {
      setSpotlightFade(false);
      setTimeout(() => {
        setSpotlightIdx(i => (i + 1) % spotlightDocs.length);
        setSpotlightFade(true);
      }, 400);
    }, 10000);
    return () => clearInterval(timer);
  }, [spotlightDocs]);

  useEffect(() => {
    fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&thumbnail_url=not.is.null&order=created_at.desc&limit=12&select=id,title,thumbnail_url,gregorian_date,publication_id', { headers: { 'apikey': SUPABASE_KEY } })
      .then(r => r.json()).then(d => { if (Array.isArray(d)) setDocs(d); });
    fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&select=id', { headers: { 'apikey': SUPABASE_KEY, 'Prefer': 'count=exact', 'Range': '0-0' } })
      .then(r => { const c = r.headers.get('content-range'); if (c) setTotalCount(parseInt(c.split('/')[1])); });
    fetch(SUPABASE_URL + '/rest/v1/publications?is_active=eq.true&total_issues=gt.0&select=id', { headers: { 'apikey': SUPABASE_KEY, 'Prefer': 'count=exact', 'Range': '0-0' } })
      .then(r => { const c = r.headers.get('content-range'); if (c) setPubCount(parseInt(c.split('/')[1])); });
  }, []);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); window.location.href = searchInput.trim() ? '/catalog?search=' + encodeURIComponent(searchInput) : '/catalog'; };

  return (
    <div dir={dir}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .hero-warm {
          background: linear-gradient(170deg, #fdfbf7 0%, #f8f4ed 40%, #f0e9dc 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-warm::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 80%;
          height: 120%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(30,58,138,0.04) 0%, transparent 70%);
        }

        .accent-gradient { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); }
        .gold-text { color: #b8860b; }

        .search-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 24px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03);
          transition: box-shadow 0.3s ease;
        }
        .search-card:focus-within {
          box-shadow: 0 8px 32px rgba(30,58,138,0.08), 0 1px 3px rgba(0,0,0,0.03);
          border-color: rgba(30,58,138,0.15);
        }

        .book-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .book-card:hover { transform: translateY(-6px); }
        .book-shadow { 
          box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04);
          transition: box-shadow 0.35s ease;
          border-radius: 8px;
          overflow: hidden;
        }
        .book-card:hover .book-shadow { box-shadow: 0 12px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06); }

        .folder-card {
          position: relative;
          background: white;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 4px 4px 16px 16px;
          padding: 1.5rem 1rem 1.25rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          overflow: visible;
        }
        @media (min-width: 640px) {
          .folder-card { padding: 2.5rem 1.75rem 1.75rem; }
        }
        .folder-tab {
          position: absolute;
          top: -14px;
          left: 20px;
          height: 28px;
          padding: 0 16px;
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: white;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
          white-space: nowrap;
        }
        [dir="rtl"] .folder-tab { left: auto; right: 20px; }
        .folder-card::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 10%;
          right: 10%;
          height: 6px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.06) 0%, transparent 70%);
          transition: all 0.4s ease;
        }
        .folder-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
          border-color: rgba(0,0,0,0.1);
        }
        .folder-card:hover .folder-tab {
          top: -18px;
          height: 32px;
          padding: 0 20px;
          box-shadow: 0 -4px 16px rgba(0,0,0,0.1);
        }
        .folder-card:hover::after {
          bottom: -10px;
          left: 5%;
          right: 5%;
          height: 10px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%);
        }
        .folder-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .folder-card:hover .folder-icon { transform: scale(1.08); }
        .folder-arrow {
          position: absolute;
          bottom: 16px;
          right: 16px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.3s ease;
        }
        [dir="rtl"] .folder-arrow { right: auto; left: 16px; transform: translateX(4px) scaleX(-1); }
        .folder-card:hover .folder-arrow { opacity: 1; transform: translateX(0); }
        [dir="rtl"] .folder-card:hover .folder-arrow { transform: translateX(0) scaleX(-1); }
        .library-shelf {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(180deg, #c4a47a 0%, #a8845c 50%, #8c6a42 100%);
          box-shadow: 0 4px 16px rgba(140,106,66,0.2), inset 0 1px 0 rgba(255,255,255,0.2);
          margin-top: 2.5rem;
        }

        .net-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .net-card:hover {
          border-color: rgba(0,0,0,0.1);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .stat-number {
          font-family: 'Crimson Pro', Georgia, serif;
          font-weight: 300;
          font-size: 3rem;
          line-height: 1;
          color: #1e3a8a;
        }

        .section-cream { background: #fdfbf7; }
        .section-white { background: #ffffff; }
        .section-blue { background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%); }
      `}</style>

      {/* ═══════ NOSSI BANNER (1-12 Nissan) ═══════ */}
      {nossiDay && (
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-6 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Nossi thumbnail */}
              {nossiIssue?.thumbnail_url && (
                <div className="flex-shrink-0 w-32 md:w-40 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-2 border-amber-400/30">
                  <Image src={nossiIssue.thumbnail_url} alt={nossiIssue.title} width={160} height={213} className="w-full h-full object-cover" />
                </div>
              )}
              {/* Content */}
              <div className="flex-1 text-center md:text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
                  <span className="text-amber-400 text-lg">✡</span>
                  <span className="text-amber-300 text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {nossiDay} {g('nossiDay')}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                  {g('nossiToday')} <span className="text-amber-400">{g('nossiTitle')} {nossiDay}</span>
                </h2>
                <p className="text-blue-200/70 text-sm md:text-base mb-5 max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {g('nossiDesc')}
                </p>
                {nossiIssue && (
                  <a
                    href={nossiIssue.pdf_url || ('/document/' + nossiIssue.id)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#1a1a2e', fontFamily: "'DM Sans', sans-serif", boxShadow: '0 4px 20px rgba(245,158,11,0.3)' }}
                  >
                    <FileText size={18} />
                    {g('nossiRead')} — {g('nossiTitle')} {nossiDay}
                  </a>
                )}
              </div>
              {/* Big day number */}
              <div className="hidden md:flex flex-shrink-0 items-center justify-center">
                <div className="text-8xl lg:text-9xl font-bold text-amber-400/20" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                  {nossiDay}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ HERO ═══════ */}
      <section className="hero-warm min-h-[80vh] flex items-center">
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 w-full flex items-center">
          <div className="max-w-3xl flex-1">
            <AnimateIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center accent-gradient">
                  <Library size={18} className="text-white" />
                </div>
                <span className="text-sm font-semibold tracking-wider uppercase text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>ShabbatHub</span>
              </div>
            </AnimateIn>

            <AnimateIn delay={80}>
              <h1 style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                <span className="block text-4xl md:text-6xl lg:text-7xl font-light text-stone-800 leading-[1.1]">{g('heroTitle1')}</span>
                <span className="block text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mt-1" style={{ color: '#1e3a8a' }}>{g('heroTitle2')}</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-stone-400 leading-[1.3] mt-2">{g('heroTitle3')}</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={200}>
              <p className="mt-6 text-base md:text-lg text-stone-500 max-w-xl leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {g('heroSub')}
              </p>
            </AnimateIn>

            <AnimateIn delay={320}>
              <form onSubmit={handleSearch} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Search className={'absolute top-1/2 -translate-y-1/2 text-stone-300 ' + (dir === 'rtl' ? 'right-4' : 'left-4')} size={20} />
                  <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={g('searchPlaceholder')}
                    className={'w-full py-3.5 rounded-xl search-card text-stone-700 placeholder-stone-300 outline-none text-sm ' + (dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4')}
                    style={{ fontFamily: "'DM Sans', sans-serif" }} />
                </div>
                <button type="submit" className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 accent-gradient cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <Search size={15} /> {g('explore')}
                </button>
              </form>
            </AnimateIn>

            <AnimateIn delay={440}>
              <div className="mt-12 flex flex-wrap gap-4 sm:gap-10 md:gap-14">
                {[
                  { num: totalCount.toLocaleString(), label: g('materials') },
                  { num: pubCount.toLocaleString(), label: g('publications') },
                  { num: '4', label: g('languages') },
                  { num: '15+', label: g('yearsArchive') },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="stat-number">{s.num}</div>
                    <div className="text-stone-400 text-xs mt-1 uppercase tracking-wider font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
          <div className="hidden lg:flex flex-shrink-0 items-start justify-center ml-12 -mt-8">
            <AnimateIn delay={300}>
              <Image src="/shabbathub-logo-vertical.png" alt="ShabbatHub" width={450} height={310} className="w-80 xl:w-96 h-auto drop-shadow-lg" />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══════ LATEST ISSUES ═══════ */}
      <section className="section-white py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-stone-800" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{g('latest')}</h2>
                <div className="mt-2 w-12 h-0.5 rounded-full accent-gradient" />
              </div>
              <Link href="/catalog" className="text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {g('viewAll')}
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {docs.map((doc, i) => (
              <AnimateIn key={doc.id} delay={i * 60}>
                <Link href={'/document/' + doc.id} className="book-card block">
                  <div className="book-shadow relative" style={{ aspectRatio: '3/4' }}>
                    {doc.thumbnail_url ? (
                      <Image src={doc.thumbnail_url} alt={doc.title} fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-100">
                        <BookOpen size={24} className="text-stone-300" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2.5 text-xs font-medium text-stone-600 line-clamp-2 leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>{doc.title}</h3>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SPOTLIGHT / RECOMMENDED ═══════ */}
      {spotlightDocs.length > 0 && (() => {
        const doc = spotlightDocs[spotlightIdx];
        const pubName = pubMap[doc?.publication_id] || '';
        const summary = (doc?.ai_summary || '').replace(/^Выпуск:.*?\./, '').replace(/Темы:.*?\./,'').replace(/Поисковые термины:.*$/,'').trim();
        return (
          <section className="section-cream py-12 md:py-16 px-6 border-y border-stone-100">
            <div className="max-w-7xl mx-auto">
              <AnimateIn>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-amber-500" />
                      <span className="text-xs font-bold tracking-widest uppercase text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{g('spotlight')}</span>
                    </div>
                    <p className="text-xs text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{g('spotlightSub')}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {spotlightDocs.slice(0, 8).map((_, i) => (
                      <button key={i} onClick={() => { setSpotlightFade(false); setTimeout(() => { setSpotlightIdx(i); setSpotlightFade(true); }, 200); }}
                        className={'w-2 h-2 rounded-full transition-all duration-300 ' + (i === spotlightIdx ? 'bg-blue-700 w-5' : 'bg-stone-300 hover:bg-stone-400')} />
                    ))}
                  </div>
                </div>
              </AnimateIn>

              <div className={'transition-all duration-400 ' + (spotlightFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')} style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
                {doc && (
                  <Link href={'/document/' + doc.id} className="group block">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0 w-full md:w-56 aspect-[3/4] md:aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                        <Image src={doc.thumbnail_url} alt={doc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 224px" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0 py-2">
                        {pubName && <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{pubName}</p>}
                        <h3 className="text-xl md:text-2xl font-semibold text-stone-800 mb-3 group-hover:text-blue-800 transition-colors line-clamp-2" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{doc.title}</h3>
                        <p className="text-sm text-stone-500 leading-relaxed line-clamp-4 md:line-clamp-5 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {summary.slice(0, 300)}{summary.length > 300 ? '...' : ''}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 group-hover:gap-2.5 transition-all" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {g('readNow')} <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ═══════ LIBRARY SECTIONS ═══════ */}
      <section className="section-cream py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-stone-800" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{g('catTitle')}</h2>
              <div className="w-12 h-0.5 rounded-full accent-gradient mx-auto mt-3 mb-3" />
              <p className="text-sm text-stone-400 max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>{g('catSub')}</p>
            </div>
          </AnimateIn>

          <div className="mt-12 flex flex-wrap justify-center gap-5 lg:gap-6">
            {libraryFolders.map((folder, i) => (
              <AnimateIn key={folder.slug} delay={i * 80} className="w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-18px)]">
                <Link href={'/catalog?category=' + folder.slug} className="folder-card block h-full">
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', borderRadius: '4px 4px 0 0', background: folder.accent }} />
                  <div className="folder-tab" style={{ background: folder.accent }}>
                    <folder.icon size={11} />
                    <span>{g(folder.title)}</span>
                  </div>
                  <div className="folder-icon" style={{ background: folder.accentLight, color: folder.accent }}>
                    <folder.icon size={22} />
                  </div>
                  <h3 className="text-base font-semibold text-stone-800 mb-1.5" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{g(folder.title)}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", paddingRight: dir === 'rtl' ? 0 : '1.5rem', paddingLeft: dir === 'rtl' ? '1.5rem' : 0 }}>{g(folder.desc)}</p>
                  <div className="folder-arrow" style={{ background: folder.accentLight, color: folder.accent }}>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>

          <div className="library-shelf max-w-[90%] mx-auto" />
        </div>
      </section>

      {/* ═══════ CHEVRUTAH NETWORK ═══════ */}
      <section className="section-white py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={16} className="text-amber-500" />
                <span className="text-xs font-bold tracking-widest uppercase text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{g('networkTitle')}</span>
                <Sparkles size={16} className="text-amber-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-stone-800" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{g('networkSub')}</h2>
              <div className="w-12 h-0.5 rounded-full accent-gradient mx-auto mt-3" />
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {networkProjects.map((p, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <a href={p.url} target={p.url.startsWith('http') ? '_blank' : '_self'} rel="noopener" className="net-card block p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{p.icon}</span>
                    {p.url.startsWith('http') && <ExternalLink size={13} className="text-stone-300" />}
                  </div>
                  <h3 className="text-base font-semibold text-stone-700 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.name}</h3>
                  <p className="text-xs text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.desc[lang] || p.desc['ru']}</p>
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="section-blue py-16 md:py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <AnimateIn>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Bell size={26} className="text-amber-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{g('ctaTitle')}</h2>
            <p className="text-white/60 mb-8 text-sm max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>{g('ctaSub')}</p>
            <Link href="/subscribe" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ background: '#f59e0b', color: '#1e3a8a', fontFamily: "'DM Sans', sans-serif" }}>
              <Bell size={16} /> {g('subscribe')}
            </Link>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
