'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, BookOpen, Info, Heart, Globe } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hebrewDate, setHebrewDate] = useState('');
  const [currentParsha, setCurrentParsha] = useState('');

  useEffect(() => {
    async function fetchHebrewInfo() {
      try {
        const today = new Date();
        // Получаем еврейскую дату
        const dateRes = await fetch(
          `https://www.hebcal.com/converter?cfg=json&gy=${today.getFullYear()}&gm=${today.getMonth() + 1}&gd=${today.getDate()}&g2h=1`
        );
        if (dateRes.ok) {
          const dateData = await dateRes.json();
          setHebrewDate(`${dateData.hd} ${dateData.hebrew}`);
        }

        // Получаем текущую паршу
        const parshaRes = await fetch(
          `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=${today.getFullYear()}&month=${today.getMonth() + 1}&ss=off&mf=off&c=off&s=on`
        );
        if (parshaRes.ok) {
          const parshaData = await parshaRes.json();
          const parashat = parshaData.items?.find((item: any) => {
            if (item.category !== 'parashat') return false;
            const itemDate = new Date(item.date);
            return itemDate >= today || (itemDate.getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000);
          });
          if (parashat) {
            setCurrentParsha(parashat.hebrew || parashat.title?.replace('Parashat ', ''));
          }
        }
      } catch (err) {
        console.error('Error fetching Hebrew info:', err);
      }
    }
    fetchHebrewInfo();
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Верхняя строка с еврейской датой */}
      {(hebrewDate || currentParsha) && (
        <div className="bg-primary-900 text-white text-center py-1.5 text-sm">
          <span className="font-hebrew">
            {hebrewDate && <span>{hebrewDate}</span>}
            {hebrewDate && currentParsha && <span className="mx-2">•</span>}
            {currentParsha && <span>פרשת {currentParsha}</span>}
          </span>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Лого */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold">
              <span className="text-primary-600">Shabbat</span>
              <span className="text-gold-500">Hub</span>
            </span>
          </Link>

          {/* Навигация (десктоп) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/catalog" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors text-sm">
              <BookOpen size={18} />
              Каталог
            </Link>
            <Link href="/about" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors text-sm">
              <Info size={18} />
              О проекте
            </Link>
            <Link href="/donate" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors text-sm">
              <Heart size={18} />
              Поддержать
            </Link>
          </nav>

          {/* Поиск и язык */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-primary-600 text-sm">
              <Search size={18} />
              Поиск...
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 text-sm">
              <Globe size={18} />
              RU
            </button>
          </div>

          {/* Мобильное меню */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 gap-3">
            <Link href="/catalog" className="flex items-center gap-2 text-gray-600 py-2">
              <BookOpen size={20} />
              Каталог
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-gray-600 py-2">
              <Info size={20} />
              О проекте
            </Link>
            <Link href="/donate" className="flex items-center gap-2 text-gray-600 py-2">
              <Heart size={20} />
              Поддержать
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
