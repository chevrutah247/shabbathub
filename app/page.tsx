'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, ChevronRight, ArrowRight, Sparkles, Globe2, Download, Search } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FeaturedDocuments from '@/components/FeaturedDocuments';
import SubscribeBlock from '@/components/SubscribeBlock';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

function AnimateOnScroll({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();
  const [totalDocs, setTotalDocs] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          'https://yvgcxmqgvxlvbxsszqcc.supabase.co/rest/v1/issues?is_active=eq.true&select=id',
          {
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY',
              'Prefer': 'count=exact'
            },
          }
        );
        const count = res.headers.get('content-range')?.split('/')[1];
        setTotalDocs(count ? parseInt(count) : 0);
      } catch { setTotalDocs(0); }
    }
    fetchStats();
  }, []);

  const statsNumber = totalDocs !== null ? totalDocs.toLocaleString() : '...';
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <div dir={dir}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-serif-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', -apple-system, sans-serif; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0; } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out 2s infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #c8a44e 0%, #f5d880 25%, #c8a44e 50%, #f5d880 75%, #c8a44e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .hero-gradient {
          background: radial-gradient(ellipse at 30% 20%, rgba(30,58,138,1) 0%, rgba(15,23,42,1) 50%, rgba(10,15,30,1) 100%);
        }
        .glass-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .stat-card:hover .stat-number {
          transform: scale(1.08);
        }
        .cat-card {
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px -12px rgba(0,0,0,0.15);
        }
        .cat-card:hover .cat-icon {
          transform: scale(1.15) rotate(-4deg);
        }
        .cat-icon { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero-gradient relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-[15%] right-[10%] w-96 h-96 bg-amber-500/8 rounded-full blur-[120px] animate-float-delayed" />
          <div className="absolute top-[40%] right-[25%] w-48 h-48 bg-indigo-400/10 rounded-full blur-[80px]" />
          {/* Тонкая сетка */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-0 w-full">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Текст */}
            <div className="md:col-span-7 text-center md:text-start">
              <div
                className="font-body"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s'
                }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-blue-200 text-sm mb-8">
                  <Sparkles size={14} className="text-amber-400" />
                  {statsNumber} {t('home.heroSubtitle', lang)}
                </span>
              </div>

              <h1
                className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s'
                }}
              >
                <span className="text-white">Shabbat</span>
                <span className="shimmer-text">Hub</span>
              </h1>

              <p
                className="font-body text-xl md:text-2xl text-blue-200/80 max-w-xl mb-10 leading-relaxed"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s'
                }}
              >
                {t('home.heroTitle', lang)}
              </p>

              <div
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s'
                }}
              >
                <Link href="/catalog"
                  className="group inline-flex items-center gap-3 bg-white text-slate-900 px-7 py-4 rounded-2xl font-body font-semibold text-lg hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(245,216,128,0.3)]">
                  <BookOpen size={20} />
                  {t('home.catalogBtn', lang)}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/catalog"
                  className="inline-flex items-center gap-3 glass-card text-white px-7 py-4 rounded-2xl font-body font-medium text-lg hover:bg-white/10 transition-all duration-300">
                  <Calendar size={20} />
                  {t('home.latestBtn', lang)}
                </Link>
              </div>
            </div>

            {/* Правая часть — поиск + быстрые статы */}
            <div className="md:col-span-5"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s'
              }}
            >
              <div className="glass-card rounded-3xl p-6 md:p-8">
                <div className="mb-6">
                  <SearchBar />
                </div>
                {/* Мини-статистика */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { num: statsNumber, label: t('home.materials', lang) },
                    { num: '10+', label: t('home.yearsArchive', lang) },
                    { num: '4', label: t('home.languages', lang) },
                  ].map((s, i) => (
                    <div key={i} className="text-center py-3 rounded-xl bg-white/5">
                      <div className="font-serif-display text-2xl font-bold text-amber-400">{s.num}</div>
                      <div className="font-body text-xs text-blue-300 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Волна */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L48 72C96 64 192 48 288 40C384 32 480 32 576 36C672 40 768 48 864 52C960 56 1056 56 1152 52C1248 48 1344 40 1392 36L1440 32V80H0Z" fill="#faf8f5"/>
          </svg>
        </div>
      </section>

      {/* ═══════════ ПОСЛЕДНИЕ ВЫПУСКИ ═══════════ */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                  {t('home.latestTitle', lang)}
                </h2>
                <p className="font-body text-lg text-slate-500">{t('home.latestSubtitle', lang)}</p>
              </div>
              <Link href="/catalog" className="hidden md:flex items-center gap-2 font-body font-semibold text-slate-700 hover:text-amber-600 transition-colors group">
                {t('home.viewAll', lang)}
                <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            <FeaturedDocuments />
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <div className="mt-10 text-center md:hidden">
              <Link href="/catalog" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-body font-semibold hover:bg-slate-800 transition-colors">
                {t('home.viewAllMaterials', lang)}
                <ArrowRight size={18} />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════ КАТЕГОРИИ ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
              {t('home.categoriesTitle', lang)}
            </h2>
            <p className="font-body text-lg text-slate-500 text-center mb-14 max-w-2xl mx-auto">
              {t('home.heroDesc', lang)}
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                href: '/catalog?category=newspapers',
                icon: '📰',
                gradient: 'from-blue-50 via-indigo-50 to-blue-50',
                border: 'border-blue-100',
                title: t('home.catNewspapers', lang),
                desc: t('home.catNewspapersDesc', lang),
                accent: 'text-blue-600',
              },
              {
                href: '/catalog?category=educational',
                icon: '📚',
                gradient: 'from-amber-50 via-orange-50 to-amber-50',
                border: 'border-amber-100',
                title: t('home.catEducational', lang),
                desc: t('home.catEducationalDesc', lang),
                accent: 'text-amber-600',
              },
              {
                href: '/catalog?category=holidays',
                icon: '🕎',
                gradient: 'from-violet-50 via-purple-50 to-violet-50',
                border: 'border-violet-100',
                title: t('home.catHolidays', lang),
                desc: t('home.catHolidaysDesc', lang),
                accent: 'text-violet-600',
              },
            ].map((cat, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <Link href={cat.href}
                  className={`cat-card group block p-8 bg-gradient-to-br ${cat.gradient} rounded-3xl border ${cat.border}`}>
                  <div className="cat-icon text-5xl mb-5 inline-block">{cat.icon}</div>
                  <h3 className="font-serif-display text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="font-body text-slate-600 mb-5 leading-relaxed">{cat.desc}</p>
                  <span className={`font-body font-semibold ${cat.accent} inline-flex items-center gap-1 group-hover:gap-2 transition-all`}>
                    {t('home.viewAll', lang)} <ArrowRight size={16} />
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ГРУППЫ ТОРЫ ═══════════ */}
      <AnimateOnScroll>
        <section className="mx-6 my-16">
          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2rem]"
            style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)' }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-400/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-400/10 rounded-full blur-[60px]" />
            </div>
            <div className="relative px-8 md:px-16 py-16 text-center">
              <div className="text-5xl mb-5">📖</div>
              <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-white mb-4">
                {t('home.torahGroupsTitle', lang)}
              </h2>
              <p className="font-body text-lg text-indigo-200 mb-8 max-w-lg mx-auto">
                {t('home.torahGroupsDesc', lang)}
              </p>
              <Link href="/torah-groups"
                className="inline-flex items-center gap-3 bg-white text-indigo-900 px-8 py-4 rounded-2xl font-body font-bold text-lg hover:bg-amber-400 hover:shadow-[0_8px_40px_rgba(245,216,128,0.25)] transition-all duration-300">
                {t('home.torahGroupsBtn', lang)} <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* ═══════════ ПОДПИСКА ═══════════ */}
      <section className="py-16 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimateOnScroll>
            <SubscribeBlock />
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════ О ПРОЕКТЕ ═══════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <h2 className="font-serif-display text-4xl md:text-5xl font-bold text-slate-900 mb-8">
              {t('home.aboutTitle', lang)}
            </h2>
            <p className="font-body text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t('home.aboutText', lang)}
            </p>
            <Link href="/about"
              className="inline-flex items-center gap-2 font-body font-semibold text-lg text-slate-700 hover:text-amber-600 transition-colors group">
              {t('home.aboutMore', lang)}
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
