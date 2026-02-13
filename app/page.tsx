'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight, ChevronRight, Users, FileText, Star, Bell, ExternalLink, Library, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Doc { id: string; title: string; thumbnail_url: string; gregorian_date: string; publication_id: string; }

const t: Record<string, Record<string, string>> = {
  heroTitle1: { ru: 'Крупнейшая', en: 'The Largest', he: 'הארכיון הדיגיטלי', uk: 'Найбільша' },
  heroTitle2: { ru: 'цифровая библиотека', en: 'Digital Library', he: 'הגדול ביותר', uk: 'цифрова бібліотека' },
  heroTitle3: { ru: 'материалов к Шаббату', en: 'of Shabbat Materials', he: 'של חומרי שבת', uk: 'матеріалів до Шаббату' },
  heroSub: { ru: 'Газеты, недельные главы Торы и печатные материалы на русском, английском и иврите', en: 'Newspapers, weekly Torah portions and printable materials in Russian, English and Hebrew', he: 'עיתונים, פרשות שבוע וחומרים להדפסה ברוסית, אנגלית ועברית', uk: 'Газети, тижневі глави Тори та друковані матеріали російською, англійською та івритом' },
  searchPlaceholder: { ru: 'Найти материалы к Шаббату...', en: 'Find Shabbat materials...', he: '...חיפוש חומרי שבת', uk: 'Знайти матеріали до Шаббату...' },
  explore: { ru: 'Открыть каталог', en: 'Explore catalog', he: 'לקטלוג', uk: 'Відкрити каталог' },
  subscribe: { ru: 'Подписаться', en: 'Subscribe', he: 'הרשמה', uk: 'Підписатися' },
  latest: { ru: 'Свежие выпуски', en: 'Latest Issues', he: 'גיליונות אחרונים', uk: 'Свіжі випуски' },
  viewAll: { ru: 'Смотреть все →', en: 'View all →', he: '← הצג הכל', uk: 'Дивитись все →' },
  materials: { ru: 'материалов', en: 'materials', he: 'חומרים', uk: 'матеріалів' },
  publications: { ru: 'публикаций', en: 'publications', he: 'פרסומים', uk: 'публікацій' },
  languages: { ru: 'языка', en: 'languages', he: 'שפות', uk: 'мови' },
  yearsArchive: { ru: 'лет архива', en: 'years of archive', he: 'שנות ארכיון', uk: 'років архіву' },
  categories: { ru: 'Разделы библиотеки', en: 'Library Sections', he: 'מדורי הספרייה', uk: 'Розділи бібліотеки' },
  newspapers: { ru: 'Еврейские газеты', en: 'Jewish Newspapers', he: 'עיתונים יהודיים', uk: 'Єврейські газети' },
  newspapersDesc: { ru: 'Еженедельные газеты к Шаббату на русском, английском и иврите', en: 'Weekly Shabbat newspapers in Russian, English and Hebrew', he: 'עיתונים שבועיים לשבת ברוסית, אנגלית ועברית', uk: 'Щотижневі газети до Шаббату російською, англійською та івритом' },
  torahPortions: { ru: 'Недельные главы Торы', en: 'Weekly Torah Portions', he: 'פרשות השבוע', uk: 'Тижневі глави Тори' },
  torahDesc: { ru: 'Комментарии и разборы недельных глав от ведущих раввинов', en: 'Commentary and analysis from leading rabbis', he: 'פרשנות וניתוח מרבנים מובילים', uk: 'Коментарі та розбори тижневих глав від провідних равинів' },
  holidays: { ru: 'Праздники и события', en: 'Holidays & Events', he: 'חגים ואירועים', uk: 'Свята та події' },
  holidaysDesc: { ru: 'Специальные выпуски к еврейским праздникам и памятным датам', en: 'Special issues for Jewish holidays and memorial dates', he: 'גיליונות מיוחדים לחגים ולימי זיכרון', uk: 'Спеціальні випуски до єврейських свят та пам\'ятних дат' },
  networkTitle: { ru: 'Chevrutah Network', en: 'Chevrutah Network', he: 'Chevrutah Network', uk: 'Chevrutah Network' },
  networkSub: { ru: 'Экосистема еврейских проектов', en: 'Jewish Projects Ecosystem', he: 'אקו-סיסטם של פרויקטים יהודיים', uk: 'Екосистема єврейських проєктів' },
  ctaTitle: { ru: 'Получайте свежие выпуски первыми', en: 'Get fresh issues first', he: 'קבלו גיליונות חדשים ראשונים', uk: 'Отримуйте свіжі випуски першими' },
  ctaSub: { ru: 'Подпишитесь и получайте новые материалы прямо на почту', en: 'Subscribe and receive new materials directly to your email', he: 'הירשמו וקבלו חומרים חדשים ישירות למייל', uk: 'Підпишіться та отримуйте нові матеріали прямо на пошту' },
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
  { name: 'OpenHearts', desc: { ru: 'Дейтинг для всех', en: 'Dating for Everyone', he: 'היכרויות לכולם', uk: 'Дейтинг для всіх' }, url: 'https://openheartsdating.com', icon: '💙', accent: '#4338ca' },
];

export default function HomePage() {
  const { lang } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const g = (key: string) => t[key]?.[lang] || t[key]?.['ru'] || key;
  const [docs, setDocs] = useState<Doc[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [totalCount, setTotalCount] = useState(4044);

  useEffect(() => {
    fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&thumbnail_url=not.is.null&order=created_at.desc&limit=12&select=id,title,thumbnail_url,gregorian_date,publication_id', { headers: { 'apikey': SUPABASE_KEY } })
      .then(r => r.json()).then(d => { if (Array.isArray(d)) setDocs(d); });
    fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&select=id', { headers: { 'apikey': SUPABASE_KEY, 'Prefer': 'count=exact', 'Range': '0-0' } })
      .then(r => { const c = r.headers.get('content-range'); if (c) setTotalCount(parseInt(c.split('/')[1])); });
  }, []);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if (searchInput.trim()) window.location.href = '/catalog?search=' + encodeURIComponent(searchInput); };

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

        .cat-card {
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 20px;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .cat-card:hover {
          border-color: rgba(30,58,138,0.12);
          box-shadow: 0 12px 40px rgba(30,58,138,0.06);
          transform: translateY(-4px);
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

      {/* ═══════ HERO ═══════ */}
      <section className="hero-warm min-h-[80vh] flex items-center">
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
          <div className="max-w-3xl">
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
              <form onSubmit={handleSearch} className="mt-8 flex gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Search className={'absolute top-1/2 -translate-y-1/2 text-stone-300 ' + (dir === 'rtl' ? 'right-4' : 'left-4')} size={20} />
                  <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={g('searchPlaceholder')}
                    className={'w-full py-3.5 rounded-xl search-card text-stone-700 placeholder-stone-300 outline-none text-sm ' + (dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4')}
                    style={{ fontFamily: "'DM Sans', sans-serif" }} />
                </div>
                <Link href="/catalog" className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 accent-gradient"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {g('explore')} <ArrowRight size={15} />
                </Link>
              </form>
            </AnimateIn>

            <AnimateIn delay={440}>
              <div className="mt-12 flex gap-10 md:gap-14">
                {[
                  { num: totalCount.toLocaleString(), label: g('materials') },
                  { num: '40+', label: g('publications') },
                  { num: '3', label: g('languages') },
                  { num: '5+', label: g('yearsArchive') },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="stat-number">{s.num}</div>
                    <div className="text-stone-400 text-xs mt-1 uppercase tracking-wider font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </div>
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
                  <div className="book-shadow" style={{ aspectRatio: '3/4' }}>
                    {doc.thumbnail_url ? (
                      <img src={doc.thumbnail_url} alt={doc.title} loading="lazy" className="w-full h-full object-cover" />
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

      {/* ═══════ CATEGORIES ═══════ */}
      <section className="section-cream py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <h2 className="text-2xl md:text-3xl font-semibold text-stone-800 text-center mb-3" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{g('categories')}</h2>
            <div className="w-12 h-0.5 rounded-full accent-gradient mx-auto mb-12" />
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: g('newspapers'), desc: g('newspapersDesc'), icon: <FileText size={24} />, bg: '#eef2ff' },
              { title: g('torahPortions'), desc: g('torahDesc'), icon: <BookOpen size={24} />, bg: '#fef3c7' },
              { title: g('holidays'), desc: g('holidaysDesc'), icon: <Star size={24} />, bg: '#ecfdf5' },
            ].map((cat, i) => (
              <AnimateIn key={i} delay={i * 120}>
                <Link href="/catalog" className="cat-card block p-7 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: cat.bg, color: '#1e3a8a' }}>
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-800 mb-2" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{cat.title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cat.desc}</p>
                </Link>
              </AnimateIn>
            ))}
          </div>
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
