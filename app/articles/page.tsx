'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, Calendar, Tag } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { articles, getAllTags } from '@/data/articles';

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
};

export default function ArticlesPage() {
  const { lang } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = useMemo(() => getAllTags(lang), [lang]);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchesTag = !selectedTag || article.tag[lang] === selectedTag;
      const matchesSearch =
        !search ||
        article.title[lang].toLowerCase().includes(search.toLowerCase()) ||
        article.subtitle[lang].toLowerCase().includes(search.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [search, selectedTag, lang]);

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

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-lg">{t('noResults')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="h-44 bg-gradient-to-br from-primary-100 via-blue-50 to-gold-400/20 flex items-center justify-center">
                  <span className="text-5xl opacity-60">
                    {article.tag.en === 'Shabbat' && '🕯️'}
                    {article.tag.en === 'Halacha' && '📜'}
                    {article.tag.en === 'Chassidus' && '✨'}
                    {article.tag.en === 'Family' && '👨‍👩‍👧‍👦'}
                    {article.tag.en === 'Holidays' && '🕎'}
                  </span>
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
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {article.subtitle[lang]}
                  </p>

                  <span className="text-sm font-medium text-primary-600 group-hover:text-primary-800 transition-colors">
                    {t('readMore')} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
