import Link from 'next/link';
import { Search, BookOpen, Calendar, Globe, ChevronRight } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FeaturedDocuments from '@/components/FeaturedDocuments';

export default function HomePage() {
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
            {/* Лого / Название */}
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              Shabbat<span className="text-gold-400">Hub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Крупнейший архив материалов к Шаббату
            </p>
            
            <p className="text-lg text-blue-200 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Более 3,500 материалов: газеты, статьи, учебные пособия
            </p>
            
            {/* Поиск */}
            <div className="max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <SearchBar />
            </div>
            
            {/* Быстрые ссылки */}
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
        
        {/* Волна снизу */}
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
            {[
              { number: '3,500+', label: 'Материалов', icon: BookOpen },
              { number: '10+', label: 'Лет архива', icon: Calendar },
              { number: '3', label: 'Языка', icon: Globe },
              { number: '∞', label: 'Бесплатно', icon: '✡' },
            ].map((stat, i) => (
              <div 
                key={i}
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
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
              className="hidden md:inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium"
            >
              Смотреть все
              <ChevronRight size={20} />
            </Link>
          </div>
          
          <FeaturedDocuments />
          
          <div className="mt-8 text-center md:hidden">
            <Link 
              href="/catalog"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium"
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
            {[
              {
                title: 'Еженедельные газеты',
                description: 'Chevrutah, Шомрей Шабос и другие издания',
                count: '2,800+',
                href: '/catalog?category=newspapers',
                color: 'from-blue-500 to-blue-700',
              },
              {
                title: 'Учебные материалы',
                description: 'Статьи, уроки и образовательные материалы',
                count: '450+',
                href: '/catalog?category=educational',
                color: 'from-purple-500 to-purple-700',
              },
              {
                title: 'Праздники',
                description: 'Материалы к еврейским праздникам',
                count: '250+',
                href: '/catalog?category=holidays',
                color: 'from-amber-500 to-amber-700',
              },
            ].map((category, i) => (
              <Link
                key={i}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl p-8 text-white card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                
                <div className="relative">
                  <div className="text-3xl font-bold mb-2">{category.count}</div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                  
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                    Перейти
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
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
