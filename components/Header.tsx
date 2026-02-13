'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, BookOpen, Info, Heart, Globe, Plus, FileText, Library, User, LogOut, Trophy, Share2, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage, Lang } from '@/lib/language-context';
import { t } from '@/lib/translations';

const parshaToLocal: Record<string, Record<string, string>> = {
  'Bereishit': { ru: 'Берешит', uk: 'Берешит', he: 'בראשית' },
  'Noach': { ru: 'Ноах', uk: 'Ноах', he: 'נח' },
  'Lech-Lecha': { ru: 'Лех-Леха', uk: 'Лех-Леха', he: 'לך לך' },
  'Vayera': { ru: 'Ваера', uk: 'Ваера', he: 'וירא' },
  'Chayei Sarah': { ru: 'Хаей Сара', uk: 'Хаей Сара', he: 'חיי שרה' },
  'Toldot': { ru: 'Толдот', uk: 'Толдот', he: 'תולדות' },
  'Vayetzei': { ru: 'Ваецей', uk: 'Ваецей', he: 'ויצא' },
  'Vayishlach': { ru: 'Ваишлах', uk: 'Ваишлах', he: 'וישלח' },
  'Vayeshev': { ru: 'Ваешев', uk: 'Ваешев', he: 'וישב' },
  'Miketz': { ru: 'Микец', uk: 'Микец', he: 'מקץ' },
  'Vayigash': { ru: 'Ваигаш', uk: 'Ваигаш', he: 'ויגש' },
  'Vayechi': { ru: 'Ваехи', uk: 'Ваехи', he: 'ויחי' },
  'Shemot': { ru: 'Шмот', uk: 'Шмот', he: 'שמות' },
  'Vaera': { ru: 'Ваэра', uk: 'Ваера', he: 'וארא' },
  'Bo': { ru: 'Бо', uk: 'Бо', he: 'בא' },
  'Beshalach': { ru: 'Бешалах', uk: 'Бешалах', he: 'בשלח' },
  'Yitro': { ru: 'Итро', uk: 'Ітро', he: 'יתרו' },
  'Mishpatim': { ru: 'Мишпатим', uk: 'Мішпатім', he: 'משפטים' },
  'Terumah': { ru: 'Трума', uk: 'Трума', he: 'תרומה' },
  'Tetzaveh': { ru: 'Тецаве', uk: 'Тецаве', he: 'תצוה' },
  'Ki Tisa': { ru: 'Ки Тиса', uk: 'Кі Тіса', he: 'כי תשא' },
  'Vayakhel': { ru: 'Ваякгель', uk: 'Ваякгель', he: 'ויקהל' },
  'Pekudei': { ru: 'Пекудей', uk: 'Пекудей', he: 'פקודי' },
  'Vayikra': { ru: 'Ваикра', uk: 'Ваікра', he: 'ויקרא' },
  'Tzav': { ru: 'Цав', uk: 'Цав', he: 'צו' },
  'Shmini': { ru: 'Шмини', uk: 'Шміні', he: 'שמיני' },
  'Tazria': { ru: 'Тазриа', uk: 'Тазріа', he: 'תזריע' },
  'Metzora': { ru: 'Мецора', uk: 'Мецора', he: 'מצורע' },
  'Achrei Mot': { ru: 'Ахарей Мот', uk: 'Ахарей Мот', he: 'אחרי מות' },
  'Kedoshim': { ru: 'Кдошим', uk: 'Кдошім', he: 'קדושים' },
  'Emor': { ru: 'Эмор', uk: 'Емор', he: 'אמור' },
  'Behar': { ru: 'Бегар', uk: 'Бегар', he: 'בהר' },
  'Bechukotai': { ru: 'Бехукотай', uk: 'Бехукотай', he: 'בחוקותי' },
  'Bamidbar': { ru: 'Бамидбар', uk: 'Бамідбар', he: 'במדבר' },
  'Nasso': { ru: 'Насо', uk: 'Насо', he: 'נשא' },
  "Beha'alotcha": { ru: 'Бегаалотха', uk: 'Бегаалотха', he: 'בהעלותך' },
  "Sh'lach": { ru: 'Шлах', uk: 'Шлах', he: 'שלח' },
  'Korach': { ru: 'Корах', uk: 'Корах', he: 'קורח' },
  'Chukat': { ru: 'Хукат', uk: 'Хукат', he: 'חוקת' },
  'Balak': { ru: 'Балак', uk: 'Балак', he: 'בלק' },
  'Pinchas': { ru: 'Пинхас', uk: 'Пінхас', he: 'פנחס' },
  'Matot': { ru: 'Матот', uk: 'Матот', he: 'מטות' },
  'Masei': { ru: 'Масей', uk: 'Масей', he: 'מסעי' },
  'Devarim': { ru: 'Дварим', uk: 'Дварім', he: 'דברים' },
  'Vaetchanan': { ru: 'Ваэтханан', uk: 'Ваетханан', he: 'ואתחנן' },
  'Eikev': { ru: 'Экев', uk: 'Екев', he: 'עקב' },
  "Re'eh": { ru: 'Реэ', uk: 'Рее', he: 'ראה' },
  'Shoftim': { ru: 'Шофтим', uk: 'Шофтім', he: 'שופטים' },
  'Ki Teitzei': { ru: 'Ки Теце', uk: 'Кі Теце', he: 'כי תצא' },
  'Ki Tavo': { ru: 'Ки Таво', uk: 'Кі Таво', he: 'כי תבוא' },
  'Nitzavim': { ru: 'Ницавим', uk: 'Ніцавім', he: 'ניצבים' },
  'Vayeilech': { ru: 'Ваелех', uk: 'Ваелех', he: 'וילך' },
  "Ha'azinu": { ru: 'Гаазину', uk: 'Гаазіну', he: 'האזינו' },
  'Vezot Habracha': { ru: 'Везот Габраха', uk: 'Везот Габраха', he: 'וזאת הברכה' },
};

const hebrewMonths: Record<string, Record<Lang, string>> = {
  'Nisan': { ru: 'Нисан', en: 'Nisan', he: 'ניסן', uk: 'Нісан' },
  'Iyyar': { ru: 'Ияр', en: 'Iyyar', he: 'אייר', uk: 'Іяр' },
  'Sivan': { ru: 'Сиван', en: 'Sivan', he: 'סיוון', uk: 'Сіван' },
  'Tamuz': { ru: 'Тамуз', en: 'Tamuz', he: 'תמוז', uk: 'Тамуз' },
  'Av': { ru: 'Ав', en: 'Av', he: 'אב', uk: 'Ав' },
  'Elul': { ru: 'Элуль', en: 'Elul', he: 'אלול', uk: 'Елуль' },
  'Tishrei': { ru: 'Тишрей', en: 'Tishrei', he: 'תשרי', uk: 'Тішрей' },
  'Cheshvan': { ru: 'Хешван', en: 'Cheshvan', he: 'חשוון', uk: 'Хешван' },
  'Kislev': { ru: 'Кислев', en: 'Kislev', he: 'כסלו', uk: 'Кіслев' },
  'Tevet': { ru: 'Тевет', en: 'Tevet', he: 'טבת', uk: 'Тевет' },
  'Shvat': { ru: 'Шват', en: 'Shvat', he: 'שבט', uk: 'Шват' },
  "Sh'vat": { ru: 'Шват', en: 'Shvat', he: 'שבט', uk: 'Шват' },
  'Adar': { ru: 'Адар', en: 'Adar', he: 'אדר', uk: 'Адар' },
  'Adar I': { ru: 'Адар I', en: 'Adar I', he: "אדר א'", uk: 'Адар I' },
  'Adar II': { ru: 'Адар II', en: 'Adar II', he: "אדר ב'", uk: 'Адар II' },
};

const langLabels: Record<Lang, string> = { ru: 'RU', en: 'EN', he: 'HE', uk: 'UA' };
const langOrder: Lang[] = ['ru', 'en', 'he', 'uk'];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [parshaEng, setParshaEng] = useState('');
  const [hebrewDateRaw, setHebrewDateRaw] = useState<{ hd: number; hm: string; hy: number } | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { user, profile, signOut } = useAuth();
  const { lang, setLang } = useLanguage();
  const router = useRouter();
  const userRole = (profile as any)?.role ?? null;

  useEffect(() => {
    async function fetchHebrewInfo() {
      try {
        const today = new Date();
        const dateRes = await fetch(
          'https://www.hebcal.com/converter?cfg=json&gy=' + today.getFullYear() + '&gm=' + (today.getMonth() + 1) + '&gd=' + today.getDate() + '&g2h=1'
        );
        if (dateRes.ok) {
          const dateData = await dateRes.json();
          setHebrewDateRaw({ hd: dateData.hd, hm: dateData.hm, hy: dateData.hy });
        }
        const parshaRes = await fetch(
          'https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=' + today.getFullYear() + '&month=' + (today.getMonth() + 1) + '&ss=off&mf=off&c=off&s=on'
        );
        if (parshaRes.ok) {
          const parshaData = await parshaRes.json();
          const parashat = parshaData.items?.find((item: any) => {
            if (item.category !== 'parashat') return false;
            const itemDate = new Date(item.date);
            const dayDiff = (itemDate.getTime() - today.getTime()) / (24*60*60*1000); return dayDiff >= -1 && dayDiff <= 6;
          });
          if (parashat) setParshaEng(parashat.title?.replace('Parashat ', ''));
        }
      } catch (err) { console.error('Error fetching Hebrew info:', err); }
    }
    fetchHebrewInfo();
  }, []);

  const getDate = () => {
    if (!hebrewDateRaw) return '';
    const m = hebrewMonths[hebrewDateRaw.hm];
    return hebrewDateRaw.hd + ' ' + (m ? m[lang] : hebrewDateRaw.hm) + ' ' + hebrewDateRaw.hy;
  };

  const getParsha = () => {
    if (!parshaEng) return '';
    if (lang === 'en') return parshaEng;
    const local = parshaToLocal[parshaEng];
    return local ? (local[lang] || local['ru'] || parshaEng) : parshaEng;
  };

  const fDate = getDate();
  const fParsha = getParsha();

  const handleLogout = async () => { await signOut(); setIsUserMenuOpen(false); router.push('/'); router.refresh(); };

  const handleShare = async () => {
    if (!user) return;
    const url = window.location.origin + '?ref=' + user.id;
    if (navigator.share) { try { await navigator.share({ title: 'ShabbatHub', url }); return; } catch {} }
    try { await navigator.clipboard.writeText(url); } catch { const i = document.createElement('input'); i.value = url; document.body.appendChild(i); i.select(); document.execCommand('copy'); document.body.removeChild(i); }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {(fDate || fParsha) && (
        <div className="bg-primary-900 text-white text-center py-1.5 text-sm">
          {fDate}{fDate && fParsha && <span className="mx-2">•</span>}
          {fParsha && <span>{t('parsha.prefix', lang)}{fParsha}{t('parsha.suffix', lang)}</span>}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-2xl font-display font-bold">
            <span className="text-primary-600">Shabbat</span><span className="text-gold-500">Hub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/catalog" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 text-sm"><BookOpen size={18} />{t('nav.catalog', lang)}</Link>
            <Link href="/leaders" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 text-sm"><Trophy size={18} />{t('nav.leaders', lang)}</Link>
            <Link href="/about" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 text-sm"><Info size={18} />{t('nav.about', lang)}</Link>
            <Link href="/donate" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 text-sm"><Heart size={18} />{t('nav.donate', lang)}</Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <button onClick={handleShare} className={'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ' + (copied ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700 hover:bg-amber-100')}>
                {copied ? <Check size={16} /> : <Share2 size={16} />}{copied ? t('nav.copied', lang) : t('nav.share', lang)}
              </button>
            )}
            <div className="relative">
              <button onClick={() => setIsAddMenuOpen(!isAddMenuOpen)} className="flex items-center gap-1.5 bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-primary-700">
                <Plus size={16} />{t('nav.add', lang)}
              </button>
              {isAddMenuOpen && (<><div className="fixed inset-0" onClick={() => setIsAddMenuOpen(false)} /><div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                <Link href="/add-pdf" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsAddMenuOpen(false)}><FileText size={16} />{t('nav.addPdf', lang)}</Link>
                <Link href="/add-publication" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsAddMenuOpen(false)}><Library size={16} />{t('nav.addPublication', lang)}</Link>
              </div></>)}
            </div>
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-primary-600 text-sm"><Search size={18} />{t('search', lang)}</button>
            {user ? (
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-medium text-sm">{(user.email || '?')[0].toUpperCase()}</span>
                </button>
                {isUserMenuOpen && (<><div className="fixed inset-0" onClick={() => setIsUserMenuOpen(false)} /><div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                  <div className="px-4 py-2 border-b"><p className="text-sm font-medium truncate">{user.email}</p><p className="text-xs text-gray-500">{userRole === 'admin' ? t('roles.admin', lang) : userRole === 'editor' ? t('roles.editor', lang) : t('roles.user', lang)}</p></div>
                  {(userRole === 'superadmin' || userRole === 'admin') && <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsUserMenuOpen(false)}><BookOpen size={16} />{t('nav.admin', lang)}</Link>}
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full"><LogOut size={16} />{t('nav.logout', lang)}</button>
                </div></>)}
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 text-sm"><User size={18} />{t('nav.login', lang)}</Link>
            )}
            {/* Language Switcher */}
            <div className="relative">
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 text-gray-500 hover:text-primary-600 text-sm px-2 py-1 rounded-md hover:bg-gray-50">
                <Globe size={18} />{langLabels[lang]}
              </button>
              {isLangMenuOpen && (<><div className="fixed inset-0" onClick={() => setIsLangMenuOpen(false)} /><div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-1 z-50">
                {langOrder.map(l => (
                  <button key={l} onClick={() => { setLang(l); setIsLangMenuOpen(false); }}
                    className={'flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-50 ' + (lang === l ? 'text-primary-600 font-medium bg-primary-50' : 'text-gray-700')}>
                    <span>{t('langNames.' + l, l)}</span><span className="text-xs text-gray-400">{langLabels[l]}</span>
                  </button>
                ))}
              </div></>)}
            </div>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      {/* Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t"><nav className="flex flex-col p-4 gap-3">
          <Link href="/catalog" className="flex items-center gap-2 text-gray-600 py-2" onClick={() => setIsMenuOpen(false)}><BookOpen size={20} />{t('nav.catalog', lang)}</Link>
          <Link href="/leaders" className="flex items-center gap-2 text-gray-600 py-2" onClick={() => setIsMenuOpen(false)}><Trophy size={20} />{t('nav.leaders', lang)}</Link>
          <Link href="/about" className="flex items-center gap-2 text-gray-600 py-2" onClick={() => setIsMenuOpen(false)}><Info size={20} />{t('nav.about', lang)}</Link>
          <Link href="/donate" className="flex items-center gap-2 text-gray-600 py-2" onClick={() => setIsMenuOpen(false)}><Heart size={20} />{t('nav.donate', lang)}</Link>
          {user && <button onClick={handleShare} className="flex items-center gap-2 text-amber-700 py-2">{copied ? <Check size={20} /> : <Share2 size={20} />}{copied ? t('nav.linkCopied', lang) : t('nav.shareSite', lang)}</button>}
          <div className="border-t pt-3 mt-2">
            <Link href="/add-pdf" className="flex items-center gap-2 text-primary-600 py-2" onClick={() => setIsMenuOpen(false)}><FileText size={20} />{t('nav.addPdf', lang)}</Link>
            <Link href="/add-publication" className="flex items-center gap-2 text-primary-600 py-2" onClick={() => setIsMenuOpen(false)}><Library size={20} />{t('nav.addPublication', lang)}</Link>
          </div>
          <div className="border-t pt-3 mt-2">
            <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm"><Globe size={16} />{t('langNames.' + lang, lang)}</div>
            <div className="flex gap-2">{langOrder.map(l => (
              <button key={l} onClick={() => { setLang(l); setIsMenuOpen(false); }} className={'px-3 py-1.5 rounded-lg text-sm font-medium ' + (lang === l ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600')}>{langLabels[l]}</button>
            ))}</div>
          </div>
          <div className="border-t pt-3 mt-2">
            {user ? (<>
              {(userRole === 'superadmin' || userRole === 'admin') && <Link href="/admin" className="flex items-center gap-2 text-gray-600 py-2" onClick={() => setIsMenuOpen(false)}><BookOpen size={20} />{t('nav.admin', lang)}</Link>}
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 py-2"><LogOut size={20} />{t('nav.logout', lang)}</button>
            </>) : (
              <Link href="/login" className="flex items-center gap-2 text-primary-600 py-2" onClick={() => setIsMenuOpen(false)}><User size={20} />{t('nav.login', lang)}</Link>
            )}
          </div>
        </nav></div>
      )}
    </header>
  );
}
