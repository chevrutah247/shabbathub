'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, BookOpen, Info, Heart, Globe } from 'lucide-react';

// Маппинг названий парш на русский
const parshaToRussian: Record<string, string> = {
  'Bereishit': 'Берешит', 'Noach': 'Ноах', 'Lech-Lecha': 'Лех-Леха', 'Vayera': 'Ваера', 
  'Chayei Sarah': 'Хаей Сара', 'Toldot': 'Толдот', 'Vayetzei': 'Ваецей', 'Vayishlach': 'Ваишлах',
  'Vayeshev': 'Ваешев', 'Miketz': 'Микец', 'Vayigash': 'Ваигаш', 'Vayechi': 'Ваехи',
  'Shemot': 'Шмот', 'Vaera': 'Ваэра', 'Bo': 'Бо', 'Beshalach': 'Бешалах',
  'Yitro': 'Итро', 'Mishpatim': 'Мишпатим', 'Terumah': 'Трума', 'Tetzaveh': 'Тецаве',
  'Ki Tisa': 'Ки Тиса', 'Vayakhel': 'Ваякгель', 'Pekudei': 'Пекудей',
  'Vayikra': 'Ваикра', 'Tzav': 'Цав', 'Shmini': 'Шмини', 'Tazria': 'Тазриа',
  'Metzora': 'Мецора', 'Achrei Mot': 'Ахарей Мот', 'Kedoshim': 'Кдошим',
  'Emor': 'Эмор', 'Behar': 'Бегар', 'Bechukotai': 'Бехукотай',
  'Bamidbar': 'Бамидбар', 'Nasso': 'Насо', "Beha'alotcha": 'Бегаалотха',
  "Sh'lach": 'Шлах', 'Korach': 'Корах', 'Chukat': 'Хукат', 'Balak': 'Балак',
  'Pinchas': 'Пинхас', 'Matot': 'Матот', 'Masei': 'Масей',
  'Devarim': 'Дварим', 'Vaetchanan': 'Ваэтханан', 'Eikev': 'Экев',
  "Re'eh": 'Реэ', 'Shoftim': 'Шофтим', 'Ki Teitzei': 'Ки Теце', 'Ki Tavo': 'Ки Таво',
  'Nitzavim': 'Ницавим', 'Vayeilech': 'Ваелех', "Ha'azinu": 'Гаазину', 
  'Vezot Habracha': 'Везот Габраха', 'Teruma': 'Трума', 'Trumah': 'Трума'
};

const hebrewMonths: Record<string, string> = {
  'Nisan': 'Нисан', 'Iyyar': 'Ияр', 'Sivan': 'Сиван', 'Tamuz': 'Тамуз',
  'Av': 'Ав', 'Elul': 'Элуль', 'Tishrei': 'Тишрей', 'Cheshvan': 'Хешван',
  'Kislev': 'Кислев', 'Tevet': 'Тевет', 'Shvat': "Шват", "Sh'vat": "Шват",
  'Adar': 'Адар', 'Adar I': 'Адар I', 'Adar II': 'Адар II'
};

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
          const monthRu = hebrewMonths[dateData.hm] || dateData.hm;
          setHebrewDate(`${dateData.hd} ${monthRu} ${dateData.hy}`);
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
            const engName = parashat.title?.replace('Parashat ', '');
            setCurrentParsha(parshaToRussian[engName] || engName);
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
          {hebrewDate && <span>{hebrewDate}</span>}
          {hebrewDate && currentParsha && <span className="mx-2">•</span>}
          {currentParsha && <span>Глава «{currentParsha}»</span>}
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
