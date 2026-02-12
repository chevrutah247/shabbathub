'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Calendar, Globe, ChevronRight } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FeaturedDocuments from '@/components/FeaturedDocuments';
import SubscribeBlock from '@/components/SubscribeBlock';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

export default function HomePage() {
  const { lang } = useLanguage();
  const [totalDocs, setTotalDocs] = useState<number | null>(null);

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
      } catch (err) {
        console.error('Stats fetch error:', err);
        setTotalDocs(0);
      }
    }
    fetchStats();
  }, []);

  const statsNumber = totalDocs !== null ? totalDocs.toLocaleString() : '...';
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <div dir={dir}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              Shabbat<span className="text-gold-400">Hub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {t('home.heroTitle', lang)}
            </p>
            
            <p className="text-lg text-blue-200 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {totalDocs !== null ? statsNumber + ' ' + t('home.heroSubtitle', lang) : t('loading', lang)}: {t('home.heroDesc', lang)}
            </p>
            
            <div className="max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <SearchBar />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/catalog"
                className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-full font-medium hover:bg-gold-400 hover:text-primary-900 transition-all">
                <BookOpen size={20} />
                {t('home.catalogBtn', lang)}
              </Link>
              <Link href="/catalog"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all border border-white/20">
                <Calendar size={20} />
                {t('home.latestBtn', lang)}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#faf8f5"/>
          </svg>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">{statsNumber}</div>
              <div className="text-gray-600">{t('home.materials', lang)}</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">10+</div>
              <div className="text-gray-600">{t('home.yearsArchive', lang)}</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">4</div>
              <div className="text-gray-600">{t('home.languages', lang)}</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">∞</div>
              <div className="text-gray-600">{t('free', lang)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Последние материалы */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary-900 mb-2">{t('home.latestTitle', lang)}</h2>
              <p className="text-gray-600">{t('home.latestSubtitle', lang)}</p>
            </div>
            <Link href="/catalog" className="hidden md:flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium">
              {t('home.viewAll', lang)}
              <ChevronRight size={20} />
            </Link>
          </div>
          
          <FeaturedDocuments />
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/catalog" className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors">
              {t('home.viewAllMaterials', lang)}
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-10 text-center">{t('home.categoriesTitle', lang)}</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/catalog?category=newspapers" className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{t('home.catNewspapers', lang)}</h3>
              <p className="text-gray-600">{t('home.catNewspapersDesc', lang)}</p>
            </Link>
            <Link href="/catalog?category=educational" className="group p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{t('home.catEducational', lang)}</h3>
              <p className="text-gray-600">{t('home.catEducationalDesc', lang)}</p>
            </Link>
            <Link href="/catalog?category=holidays" className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🕎</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{t('home.catHolidays', lang)}</h3>
              <p className="text-gray-600">{t('home.catHolidaysDesc', lang)}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Группы для изучения Торы */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-3xl font-display font-bold mb-4">{t('home.torahGroupsTitle', lang)}</h2>
          <p className="text-lg text-indigo-200 mb-8">{t('home.torahGroupsDesc', lang)}</p>
          <Link href="/torah-groups" className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-all">
            {t('home.torahGroupsBtn', lang)} →
          </Link>
        </div>
      </section>

      {/* Подписка */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <SubscribeBlock />
        </div>
      </section>

      {/* О проекте */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-6">{t('home.aboutTitle', lang)}</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t('home.aboutText', lang)}</p>
          <Link href="/about" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium">
            {t('home.aboutMore', lang)}
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
