'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, BookOpen, Info, Heart, Globe, Plus, FileText, Library, User, LogOut, Trophy } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

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
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hebrewDate, setHebrewDate] = useState('');
  const [currentParsha, setCurrentParsha] = useState('');
  
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const userRole = (profile as any)?.role ?? null;

  useEffect(() => {
    async function fetchHebrewInfo() {
      try {
        const today = new Date();
        const dateRes = await fetch(
          `https://www.hebcal.com/converter?cfg=json&gy=${today.getFullYear()}&gm=${today.getMonth() + 1}&gd=${today.getDate()}&g2h=1`
        );
        if (dateRes.ok) {
          const dateData = await dateRes.json();
          const monthRu = hebrewMonths[dateData.hm] || dateData.hm;
          setHebrewDate(`${dateData.hd} ${monthRu} ${dateData.hy}`);
        }

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

  const handleLogout = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {(hebrewDate || currentParsha) && (
        <div className="bg-primary-900 text-white text-center py-1.5 text-sm">
          {hebrewDate && <span>{hebrewDate}</span>}
          {hebrewDate && currentParsha && <span className="mx-2">•</span>}
          {currentParsha && <span>Глава «{currentParsha}»</span>}
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold">
              <span className="text-primary-600">Shabbat</span>
              <span className="text-gold-500">Hub</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/catalog" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors text-sm">
              <BookOpen size={18} />
              Каталог
            </Link>
            <Link href="/leaders" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors text-sm">
              <Trophy size={18} />
              Лидеры
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

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                className="flex items-center gap-1.5 bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-primary-700 transition"
              >
                <Plus size={16} />
                Добавить
              </button>
              
              {isAddMenuOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setIsAddMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                    <Link href="/add-pdf" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsAddMenuOpen(false)}>
                      <FileText size={16} />
                      Добавить PDF
                    </Link>
                    <Link href="/add-publication" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsAddMenuOpen(false)}>
                      <Library size={16} />
                      Добавить публикацию
                    </Link>
                  </div>
                </>
              )}
            </div>

            <button className="flex items-center gap-1.5 text-gray-500 hover:text-primary-600 text-sm">
              <Search size={18} />
              Поиск...
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 text-sm"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-medium text-sm">
                      {(user.email || '?')[0].toUpperCase()}
                    </span>
                  </div>
                </button>
                
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium truncate">{user.email}</p>
                        <p className="text-xs text-gray-500">{userRole === 'admin' ? 'Администратор' : userRole === 'editor' ? 'Редактор' : 'Пользователь'}</p>
                      </div>
                      {(userRole === 'superadmin' || userRole === 'admin') && (
                        <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsUserMenuOpen(false)}>
                          <BookOpen size={16} />
                          Админ-панель
                        </Link>
                      )}
                      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full">
                        <LogOut size={16} />
                        Выйти
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 text-sm">
                <User size={18} />
                Войти
              </Link>
            )}

            <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600 text-sm">
              <Globe size={18} />
              RU
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 gap-3">
            <Link href="/catalog" className="flex items-center gap-2 text-gray-600 py-2">
              <BookOpen size={20} />
              Каталог
            </Link>
            <Link href="/leaders" className="flex items-center gap-2 text-gray-600 py-2">
              <Trophy size={20} />
              Лидеры
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-gray-600 py-2">
              <Info size={20} />
              О проекте
            </Link>
            <Link href="/donate" className="flex items-center gap-2 text-gray-600 py-2">
              <Heart size={20} />
              Поддержать
            </Link>
            <div className="border-t pt-3 mt-2">
              <Link href="/add-pdf" className="flex items-center gap-2 text-primary-600 py-2">
                <FileText size={20} />
                Добавить PDF
              </Link>
              <Link href="/add-publication" className="flex items-center gap-2 text-primary-600 py-2">
                <Library size={20} />
                Добавить публикацию
              </Link>
            </div>
            <div className="border-t pt-3 mt-2">
              {user ? (
                <>
                  {(userRole === 'superadmin' || userRole === 'admin') && (
                    <Link href="/admin" className="flex items-center gap-2 text-gray-600 py-2">
                      <BookOpen size={20} />
                      Админ-панель
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 py-2">
                    <LogOut size={20} />
                    Выйти
                  </button>
                </>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-primary-600 py-2">
                  <User size={20} />
                  Войти
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
