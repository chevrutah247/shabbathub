'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Calendar, Globe, ChevronRight } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FeaturedDocuments from '@/components/FeaturedDocuments';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-700 to-primary-800 text-white overflow-hidden">
        {/* Декоративные элементы */}
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
              Крупнейший архив материалов к Шаббату
            </p>
            
            <p className="text-lg text-blue-200 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {totalDocs !== null ? `${statsNumber} материалов` : 'Загрузка...'}: газеты, статьи, учебные пособия
            </p>
            
            <div className="max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <SearchBar />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link 
                href="/catalog"
                className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-full font-medium hover:bg-gold-400 hover:text-primary-900 transition-all"
              >
                <BookOpen size={20} />
                Каталог материалов
              </Link>
              <Link 
                href="/latest"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all border border-white/20"
              >
                <Calendar size={20} />
                Последние выпуски
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="#faf8f5"
            />
          </svg>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                {statsNumber}
              </div>
              <div className="text-gray-600">Материалов</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                10+
              </div>
              <div className="text-gray-600">Лет архива</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                3
              </div>
              <div className="text-gray-600">Языка</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                ∞
              </div>
              <div className="text-gray-600">Бесплатно</div>
            </div>
          </div>
        </div>
      </section>

      {/* Последние материалы */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary-900 mb-2">
                Последние выпуски
              </h2>
              <p className="text-gray-600">Свежие материалы к Шаббату</p>
            </div>
            <Link 
              href="/catalog"
              className="hidden md:flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium"
            >
              Смотреть все
              <ChevronRight size={20} />
            </Link>
          </div>
          
          <FeaturedDocuments />
          
          <div className="mt-10 text-center md:hidden">
            <Link 
              href="/catalog"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition-colors"
            >
              Смотреть все материалы
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-10 text-center">
            Категории материалов
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/catalog?category=newspapers"
              className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                Еженедельные газеты
              </h3>
              <p className="text-gray-600">
                Chevrutah, Шомрей Шабос и другие издания
              </p>
            </Link>
            
            <Link 
              href="/catalog?category=educational"
              className="group p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                Учебные материалы
              </h3>
              <p className="text-gray-600">
                Статьи, уроки и образовательные материалы
              </p>
            </Link>
            
            <Link 
              href="/catalog?category=holidays"
              className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">🕎</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                Праздники
              </h3>
              <p className="text-gray-600">
                Материалы к еврейским праздникам
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* О проекте */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-primary-900 mb-6">
            О проекте ShabbatHub
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            ShabbatHub — это бесплатный онлайн-архив материалов к Шаббату. 
            Мы собираем и систематизируем еженедельные газеты, учебные материалы 
            и статьи на русском, иврите и английском языках, чтобы сделать 
            еврейское знание доступным для всех.
          </p>
          <Link 
            href="/about"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium"
          >
            Узнать больше о проекте
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
