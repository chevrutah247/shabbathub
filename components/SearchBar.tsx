'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

const holidayKeys = ['chanukah', 'purim', 'pesach', 'shavuot', 'sukkot', 'roshHashana', 'yomKippur'] as const;
const holidayEmojis: Record<string, string> = {
  chanukah: '🕎', purim: '🍷', pesach: '🫓', shavuot: '📜', sukkot: '🏕️', roshHashana: '🍎', yomKippur: '🕊️',
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { lang } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push('/catalog?search=' + encodeURIComponent(query.trim()));
    }
  };

  const handleQuickLink = (q: string) => {
    setQuery(q);
    router.push('/catalog?search=' + encodeURIComponent(q));
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search
          size={22}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('home.searchPlaceholder', lang)}
          className="w-full pl-14 pr-32 py-4 text-lg rounded-full border-2 border-white/20 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
        >
          {t('find', lang)}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {holidayKeys.map((key) => {
          const label = t(`holidays.${key}`, lang);
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleQuickLink(label)}
              className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors"
            >
              {holidayEmojis[key]} {label}
            </button>
          );
        })}
      </div>
    </form>
  );
}
