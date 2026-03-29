'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, Calendar, Tag, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { articles, getAllTags } from '@/data/articles';

const hebrewMonths: { en: string; ru: string; he: string; uk: string }[] = [
  { en: 'Nisan', ru: 'Нисан', he: 'ניסן', uk: 'Нісан' },
  { en: 'Iyar', ru: 'Ияр', he: 'אייר', uk: 'Іяр' },
  { en: 'Sivan', ru: 'Сиван', he: 'סיוון', uk: 'Сіван' },
  { en: 'Tammuz', ru: 'Тамуз', he: 'תמוז', uk: 'Тамуз' },
  { en: 'Av', ru: 'Ав', he: 'אב', uk: 'Ав' },
  { en: 'Elul', ru: 'Элул', he: 'אלול', uk: 'Елул' },
  { en: 'Tishrei', ru: 'Тишрей', he: 'תשרי', uk: 'Тішрей' },
  { en: 'Cheshvan', ru: 'Хешван', he: 'חשוון', uk: 'Хешван' },
  { en: 'Kislev', ru: 'Кислев', he: 'כסלו', uk: 'Кіслев' },
  { en: 'Tevet', ru: 'Тевет', he: 'טבת', uk: 'Тевет' },
  { en: 'Shvat', ru: 'Шват', he: 'שבט', uk: 'Шват' },
  { en: 'Adar', ru: 'Адар', he: 'אדר', uk: 'Адар' },
];

const pageText = {
  title: { ru: 'Статьи', en: 'Articles', he: 'מאמרים', uk: 'Статті' },
  subtitle: {
    ru: 'Полезные материалы о Шаббате, традициях и еврейской жизни',
    en: 'Useful materials about Shabbat, traditions, and Jewish life',
    he: 'חומרים שימושיים על שבת, מסורות וחיים יהודיים',
    uk: 'Корисні матеріали про Шаббат, традиції та єврейське життя',
  },
  searchPlaceholder: {
    ru: 'Поиск статей...',
    en: 'Search articles...',
    he: '...חיפוש מאמרים',
    uk: 'Пошук статей...',
  },
  allTags: { ru: 'Все', en: 'All', he: 'הכל', uk: 'Всі' },
  monthFilter: { ru: 'По месяцу', en: 'By month', he: 'לפי חודש', uk: 'За місяць' },
  allMonths: { ru: 'Все месяцы', en: 'All months', he: 'כל החודשים', uk: 'Всі місяці' },
  readMore: { ru: 'Читать далее', en: 'Read more', he: 'קרא עוד', uk: 'Читати далі' },
  backHome: { ru: 'На главную', en: 'Home', he: 'דף הבית', uk: 'На головну' },
  noResults: {
    ru: 'Статьи не найдены',
    en: 'No articles found',
    he: 'לא נמצאו מאמרים',
    uk: 'Статті не знайдено',
  },
};

function formatDate(dateStr: string, lang: string): string {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = { ru: 'ru-RU', en: 'en-US', he: 'he-IL', uk: 'uk-UA' };
  return date.toLocaleDateString(localeMap[lang] || 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const tagColors: Record<string, string> = {
  'Шаббат': 'bg-blue-100 text-blue-800',
  'Shabbat': 'bg-blue-100 text-blue-800',
  'שבת': 'bg-blue-100 text-blue-800',
  'Галаха': 'bg-emerald-100 text-emerald-800',
  'Halacha': 'bg-emerald-100 text-emerald-800',
  'הלכה': 'bg-emerald-100 text-emerald-800',
  'Хасидус': 'bg-purple-100 text-purple-800',
  'Chassidus': 'bg-purple-100 text-purple-800',
  'חסידות': 'bg-purple-100 text-purple-800',
  'Семья': 'bg-rose-100 text-rose-800',
  'Family': 'bg-rose-100 text-rose-800',
  'משפחה': 'bg-rose-100 text-rose-800',
  "Сім'я": 'bg-rose-100 text-rose-800',
  'Праздники': 'bg-amber-100 text-amber-800',
  'Holidays': 'bg-amber-100 text-amber-800',
  'חגים': 'bg-amber-100 text-amber-800',
  'Свята': 'bg-amber-100 text-amber-800',
  'Календарь': 'bg-yellow-100 text-yellow-800',
  'Calendar': 'bg-yellow-100 text-yellow-800',
  'לוח שנה': 'bg-yellow-100 text-yellow-800',
  'Календар': 'bg-yellow-100 text-yellow-800',
};

export default function ArticlesPage() {
  const { lang } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const tags = useMemo(() => getAllTags(lang), [lang]);

  // Latest 3 articles (by createdAt descending)
  const latestArticles = useMemo(() => {
    return [...articles].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
  }, []);

  // "Rebbe on Bitachon" articles for interleaving
  const rebbeOnBitachon = useMemo(() => {
    return articles.filter(a => a.tag.en === 'Rebbe on Bitachon');
  }, []);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchesTag = !selectedTag || article.tag[lang] === selectedTag;
      const matchesSearch =
        !search ||
        article.title[lang].toLowerCase().includes(search.toLowerCase()) ||
        article.subtitle[lang].toLowerCase().includes(search.toLowerCase());
      const matchesMonth = !selectedMonth || article.hebrewDate?.month === selectedMonth;
      return matchesTag && matchesSearch && matchesMonth;
    });
  }, [search, selectedTag, selectedMonth, lang]);

  const t = (key: keyof typeof pageText) => pageText[key][lang];

  return (
    <div className="min-h-screen bg-cream py-8 px-4" dir={dir}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-700 mb-6 transition-colors"
        >
          <ChevronLeft size={18} />
          <span>{t('backHome')}</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-3 font-display">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Latest publications */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-amber-500" />
            {lang === 'ru' ? 'Новые публикации' : lang === 'he' ? 'פרסומים חדשים' : lang === 'uk' ? 'Нові публікації' : 'Latest Publications'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex gap-4 p-4 bg-white rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all"
              >
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2 ${tagColors[article.tag[lang]] || 'bg-gray-100 text-gray-700'}`}>
                    {article.tag[lang]}
                  </span>
                  <h3 className="text-sm font-bold text-primary-900 mb-1 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {article.title[lang]}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{article.subtitle[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bitachon intro banner — shown when Bitachon tag is selected */}
        {selectedTag && (selectedTag === 'Битахон' || selectedTag === 'Bitachon' || selectedTag === 'ביטחון' || selectedTag === 'Бітахон') && (
          <div className="mb-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-amber-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-indigo-900 mb-2 font-display">
              {lang === 'ru' ? 'Врата упования: Путь к божественному доверию' : lang === 'he' ? 'שער הביטחון: מדריך לביטחון בה\'' : lang === 'uk' ? 'Ворота уповання: Шлях до божественної довіри' : 'The Gate of Trust: A Guide to Divine Reliance'}
            </h2>
            <p className="text-sm md:text-base text-indigo-800/80 leading-relaxed">
              {lang === 'ru'
                ? 'Представленные материалы содержат фрагменты классического этико-философского труда «Шаар Ха-Битахон» («Врата упования»), входящего в состав книги «Ховот Ха-Левавот» рабби Бахьи ибн Пакуды. Текст подробно раскрывает концепцию упования на Творца, определяя его как полную и безраздельную веру в божественное провидение. Автор подчеркивает, что истинное доверие к Б-гу приносит человеку душевный покой и избавляет от рабской зависимости перед другими людьми или материальными обстоятельствами. Через многочисленные примеры и библейские цитаты объясняется, что только Всевышний является надежным источником благополучия и защиты. Эти фрагменты служат духовным и практическим руководством по достижению внутренней свободы через признание божественного управления миром.'
                : lang === 'he'
                ? 'החומרים המוצגים כוללים קטעים מתוך היצירה האתית-פילוסופית הקלאסית "שער הביטחון" מתוך ספר "חובות הלבבות" של רבינו בחיי אבן פקודה. הטקסט מפרט את מושג הביטחון בבורא כאמונה מלאה בהשגחה האלוקית.'
                : 'These materials contain fragments of the classic ethical-philosophical treatise "Shaar HaBitachon" ("The Gate of Trust"), part of the book "Chovot HaLevavot" by Rabbi Bachya ibn Paquda. The text thoroughly explores the concept of trust in the Creator, defining it as complete and undivided faith in Divine Providence. The author emphasizes that true trust in G-d brings a person peace of mind and frees them from slavish dependence on other people or material circumstances. These fragments serve as both a spiritual and practical guide to achieving inner freedom through recognition of Divine governance of the world.'}
            </p>
          </div>
        )}

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search
              size={20}
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                dir === 'rtl' ? 'right-4' : 'left-4'
              }`}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`w-full py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition ${
                dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'
              }`}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              !selectedTag
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
            }`}
          >
            {t('allTags')}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Month filters — only shown when Calendar tag is selected */}
        {selectedTag && (selectedTag === 'Календарь' || selectedTag === 'Calendar' || selectedTag === 'לוח שנה' || selectedTag === 'Календар') && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedMonth(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              !selectedMonth
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'
            }`}
          >
            {t('allMonths')}
          </button>
          {hebrewMonths.map((m) => (
            <button
              key={m.en}
              onClick={() => setSelectedMonth(selectedMonth === m.en ? null : m.en)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedMonth === m.en
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'
              }`}
            >
              {m[lang]}
            </button>
          ))}
        </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-lg">{t('noResults')}</div>
        ) : (
          <div className="space-y-6">
            {(() => {
              const isBitachonView = selectedTag && (selectedTag === 'Битахон' || selectedTag === 'Bitachon' || selectedTag === 'ביטחון' || selectedTag === 'Бітахон');
              const chunks: typeof filtered[] = [];
              for (let i = 0; i < filtered.length; i += 9) {
                chunks.push(filtered.slice(i, i + 9));
              }
              return chunks.map((chunk, chunkIdx) => (
                <div key={chunkIdx}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chunk.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-primary-100 via-blue-50 to-gold-400/20 flex items-center justify-center overflow-hidden">
                  {article.image ? (
                    <img src={article.image} alt={article.title[lang]} className="w-full h-full object-cover object-top" />
                  ) : (
                    <span className="text-5xl opacity-60">
                      {article.tag.en === 'Shabbat' && '🕯️'}
                      {article.tag.en === 'Halacha' && '📜'}
                      {article.tag.en === 'Chassidus' && '✨'}
                      {article.tag.en === 'Family' && '👨‍👩‍👧‍👦'}
                      {article.tag.en === 'Holidays' && '🕎'}
                      {article.tag.en === 'Bitachon' && '🤲'}
                      {article.tag.en === 'Calendar' && '📅'}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium ${
                        tagColors[article.tag[lang]] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {article.tag[lang]}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} />
                      {formatDate(article.createdAt, lang)}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-primary-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {article.title[lang]}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {article.subtitle[lang]}
                  </p>
                </div>
              </Link>
            ))}
                  </div>
                  {/* Insert "Rebbe on Bitachon" card after every 9 articles when in Bitachon view */}
                  {isBitachonView && rebbeOnBitachon[chunkIdx] && (
                    <div className="mt-6">
                      <Link
                        href={`/articles/${rebbeOnBitachon[chunkIdx].slug}`}
                        className="block bg-gradient-to-r from-indigo-50 via-blue-50 to-amber-50 border-2 border-indigo-200 rounded-2xl p-6 hover:border-indigo-400 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">💬</span>
                          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                            {lang === 'ru' ? 'Что говорит Ребе' : lang === 'he' ? 'מה אומר הרבי' : 'What the Rebbe Says'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-indigo-900 mb-2">{rebbeOnBitachon[chunkIdx].title[lang]}</h3>
                        <p className="text-sm text-indigo-800/70 line-clamp-2">{rebbeOnBitachon[chunkIdx].subtitle[lang]}</p>
                      </Link>
                    </div>
                  )}
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
