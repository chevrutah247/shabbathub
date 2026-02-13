'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight, ChevronRight, Globe, Users, FileText, Star, Bell, ExternalLink, Library, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Doc { id: string; title: string; thumbnail_url: string; gregorian_date: string; publication_id: string; }

const t: Record<string, Record<string, string>> = {
  heroTitle1: { ru: 'Крупнейшая', en: 'The Largest', he: 'הארכיון', uk: 'Найбільша' },
  heroTitle2: { ru: 'цифровая библиотека', en: 'Digital Library', he: 'הדיגיטלי', uk: 'цифрова бібліотека' },
  heroTitle3: { ru: 'материалов к Шаббату', en: 'of Shabbat Materials', he: 'הגדול ביותר', uk: 'матеріалів до Шаббату' },
  heroSub: { ru: 'Газеты, недельные главы Торы и печатные материалы на русском, английском и иврите', en: 'Newspapers, weekly Torah portions and printable materials in Russian, English and Hebrew', he: 'עיתונים, פרשות שבוע וחומרים להדפסה ברוסית, אנגלית ועברית', uk: 'Газети, тижневі глави Тори та друковані матеріали російською, англійською та івритом' },
  searchPlaceholder: { ru: 'Найти материалы к Шаббату...', en: 'Find Shabbat materials...', he: '...חיפוש חומרי שבת', uk: 'Знайти матеріали до Шаббату...' },
  explore: { ru: 'Открыть каталог', en: 'Explore catalog', he: 'לקטלוג', uk: 'Відкрити каталог' },
  subscribe: { ru: 'Подписаться', en: 'Subscribe', he: 'הרשמה', uk: 'Підписатися' },
  latest: { ru: 'Свежие выпуски', en: 'Latest Issues', he: 'גיליונות אחרונים', uk: 'Свіжі випуски' },
  viewAll: { ru: 'Смотреть все', en: 'View all', he: 'הצג הכל', uk: 'Дивитись все' },
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
  ctaSub: { ru: 'Подпишитесь на уведомления и получайте новые материалы прямо на почту', en: 'Subscribe for notifications and receive new materials directly to your email', he: 'הירשמו להתראות וקבלו חומרים חדשים ישירות למייל', uk: 'Підпишіться на сповіщення та отримуйте нові матеріали прямо на пошту' },
  emailPlaceholder: { ru: 'Ваш email', en: 'Your email', he: 'האימייל שלך', uk: 'Ваш email' },
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
  return <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>{children}</div>;
}

const networkProjects = [
  { name: 'ShabbatHub', desc: { ru: 'Архив материалов к Шаббату', en: 'Shabbat Materials Archive', he: 'ארכיון חומרי שבת', uk: 'Архів матеріалів до Шаббату' }, url: '/', icon: '📚', color: '#1e3a8a' },
  { name: 'EdOnTheGo', desc: { ru: 'Изучение Торы', en: 'Torah Learning', he: 'לימוד תורה', uk: 'Вивчення Тори' }, url: 'https://edonthego.org', icon: '🎓', color: '#065f46' },
  { name: 'CH Groups', desc: { ru: 'Группы изучения', en: 'Study Groups', he: 'קבוצות לימוד', uk: 'Групи вивчення' }, url: 'https://crownheightsgroups.com', icon: '👥', color: '#7c2d12' },
  { name: 'OpenHearts', desc: { ru: 'Дейтинг для всех', en: 'Dating for Everyone', he: 'היכרויות לכולם', uk: 'Дейтинг для всіх' }, url: 'https://openheartsdating.com', icon: '💙', color: '#4338ca' },
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        .hero-bg {
          background: linear-gradient(165deg, #0c1220 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 800px 600px at 20% 80%, rgba(196,168,130,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 600px 400px at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 70%),
            radial-gradient(circle 300px at 50% 50%, rgba(245,158,11,0.04) 0%, transparent 70%);
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .gold-shimmer {
          background: linear-gradient(120deg, #c4a882 0%, #f5d280 25%, #e8b84a 50%, #f5d280 75%, #c4a882 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }

        .glass-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
        }

        .book-hover { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .book-hover:hover { transform: translateY(-8px) scale(1.02); }
        .book-hover:hover .book-shadow { box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(196,168,130,0.1); }

        .float-1 { animation: float1 6s ease-in-out infinite; }
        .float-2 { animation: float2 8s ease-in-out infinite; }
        .float-3 { animation: float3 7s ease-in-out infinite; }
        @keyframes float1 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(2deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(-1.5deg); } }
        @keyframes float3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .category-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(196,168,130,0.15);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .category-card:hover {
          border-color: rgba(196,168,130,0.4);
          background: linear-gradient(135deg, rgba(196,168,130,0.08) 0%, rgba(255,255,255,0.03) 100%);
          transform: translateY(-4px);
        }

        .stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: 3.5rem;
          line-height: 1;
          background: linear-gradient(180deg, #f5d280 0%, #c4a882 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .network-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .network-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
        }

        .cta-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.1) 0%, transparent 60%);
        }
      `}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="hero-bg min-h-[85vh] flex items-center relative">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[10%] w-20 h-28 rounded-sm opacity-[0.04] float-1" style={{ background: 'linear-gradient(135deg, #c4a882, #8b6914)', transform: 'rotate(-5deg)' }} />
        <div className="absolute top-32 right-[15%] w-16 h-24 rounded-sm opacity-[0.03] float-2" style={{ background: 'linear-gradient(135deg, #3b82f6, #1e3a8a)', transform: 'rotate(8deg)' }} />
        <div className="absolute bottom-24 left-[20%] w-14 h-20 rounded-sm opacity-[0.03] float-3" style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)', transform: 'rotate(-3deg)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-4xl">
            <AnimateIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(196,168,130,0.2), rgba(196,168,130,0.05))', border: '1px solid rgba(196,168,130,0.2)' }}>
                  <Library size={20} style={{ color: '#c4a882' }} />
                </div>
                <span className="text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(196,168,130,0.7)', fontFamily: "'Space Grotesk', sans-serif" }}>ShabbatHub</span>
              </div>
            </AnimateIn>

            <AnimateIn delay={100}>
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                <span className="block text-5xl md:text-7xl lg:text-8xl font-light text-white/90 leading-[1.1] mb-2">{g('heroTitle1')}</span>
                <span className="block text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-2 gold-shimmer">{g('heroTitle2')}</span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-white/50 leading-[1.2]">{g('heroTitle3')}</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={250}>
              <p className="mt-8 text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {g('heroSub')}
              </p>
            </AnimateIn>

            <AnimateIn delay={400}>
              <form onSubmit={handleSearch} className="mt-10 flex gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className={'absolute top-1/2 -translate-y-1/2 text-white/30 ' + (dir === 'rtl' ? 'right-5' : 'left-5')} size={20} />
                  <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={g('searchPlaceholder')}
                    className={'w-full py-4 rounded-2xl glass-card text-white/90 placeholder-white/30 outline-none focus:border-amber-500/30 transition-colors ' + (dir === 'rtl' ? 'pr-14 pl-5' : 'pl-14 pr-5')}
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px' }} />
                </div>
                <Link href="/catalog" className="flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #c4a882, #a68a5b)', color: '#0c1220', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {g('explore')} <ArrowRight size={16} />
                </Link>
              </form>
            </AnimateIn>

            {/* Stats inline */}
            <AnimateIn delay={550}>
              <div className="mt-14 flex gap-10 md:gap-16">
                {[
                  { num: totalCount.toLocaleString(), label: g('materials') },
                  { num: '40+', label: g('publications') },
                  { num: '3', label: g('languages') },
                  { num: '5+', label: g('yearsArchive') },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="stat-num">{s.num}</div>
                    <div className="text-white/30 text-xs mt-1 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ═══════ LATEST ISSUES ═══════ */}
      <section className="py-20 px-6" style={{ background: '#0e0e12' }}>
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-white/90" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{g('latest')}</h2>
                <div className="mt-2 w-16 h-0.5" style={{ background: 'linear-gradient(90deg, #c4a882, transparent)' }} />
              </div>
              <Link href="/catalog" className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {g('viewAll')} <ChevronRight size={16} />
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {docs.map((doc, i) => (
              <AnimateIn key={doc.id} delay={i * 80}>
                <Link href={'/document/' + doc.id} className="book-hover block">
                  <div className="book-shadow rounded-lg overflow-hidden" style={{ aspectRatio: '3/4', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}>
                    {doc.thumbnail_url ? (
                      <img src={doc.thumbnail_url} alt={doc.title} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #2a2a3a, #1a1a28)' }}>
                        <BookOpen size={24} className="text-white/20" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-3 text-xs text-white/60 line-clamp-2 leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{doc.title}</h3>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORIES ═══════ */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #0e0e12, #121218)' }}>
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-3 text-center" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{g('categories')}</h2>
            <div className="w-16 h-0.5 mx-auto mb-14" style={{ background: 'linear-gradient(90deg, transparent, #c4a882, transparent)' }} />
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: g('newspapers'), desc: g('newspapersDesc'), icon: <FileText size={28} />, link: '/catalog' },
              { title: g('torahPortions'), desc: g('torahDesc'), icon: <BookOpen size={28} />, link: '/catalog' },
              { title: g('holidays'), desc: g('holidaysDesc'), icon: <Star size={28} />, link: '/catalog' },
            ].map((cat, i) => (
              <AnimateIn key={i} delay={i * 150}>
                <Link href={cat.link} className="category-card block rounded-2xl p-8 h-full">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, rgba(196,168,130,0.15), rgba(196,168,130,0.05))', color: '#c4a882' }}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white/85 mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{cat.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{cat.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wider" style={{ color: '#c4a882', fontFamily: "'Space Grotesk', sans-serif" }}>
                    {g('explore')} <ArrowRight size={14} />
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CHEVRUTAH NETWORK ═══════ */}
      <section className="py-20 px-6" style={{ background: '#0e0e12' }}>
        <div className="max-w-7xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles size={18} style={{ color: '#c4a882' }} />
                <span className="text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(196,168,130,0.7)', fontFamily: "'Space Grotesk', sans-serif" }}>{g('networkTitle')}</span>
                <Sparkles size={18} style={{ color: '#c4a882' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white/90" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{g('networkSub')}</h2>
              <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #c4a882, transparent)' }} />
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {networkProjects.map((p, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <a href={p.url} target={p.url.startsWith('http') ? '_blank' : '_self'} rel="noopener" className="network-card block rounded-2xl p-6 bg-white/[0.02]">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{p.icon}</span>
                    {p.url.startsWith('http') && <ExternalLink size={14} className="text-white/20" />}
                  </div>
                  <h3 className="text-lg font-medium text-white/80 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</h3>
                  <p className="text-sm text-white/30" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.desc[lang] || p.desc['ru']}</p>
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="cta-section py-20 px-6">
        <div className="relative max-w-3xl mx-auto text-center">
          <AnimateIn>
            <Bell size={36} className="mx-auto mb-6" style={{ color: 'rgba(245,158,11,0.7)' }} />
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{g('ctaTitle')}</h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{g('ctaSub')}</p>
            <Link href="/subscribe" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#0c1220', fontFamily: "'Space Grotesk', sans-serif" }}>
              <Bell size={18} /> {g('subscribe')}
            </Link>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
