'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const quickLinks = [
  { label: '🕎 Ханука', query: 'Ханука' },
  { label: '🍷 Пурим', query: 'Пурим' },
  { label: '🫓 Песах', query: 'Песах' },
  { label: '📜 Шавуот', query: 'Шавуот' },
  { label: '🏕️ Суккот', query: 'Суккот' },
  { label: '🍎 Рош Ашана', query: 'Рош Ашана' },
  { label: '🕊️ Йом Кипур', query: 'Йом Кипур' },
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

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
          placeholder="Поиск материалов, недельных глав, тем..."
          className="w-full pl-14 pr-32 py-4 text-lg rounded-full border-2 border-white/20 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
        >
          Найти
        </button>
      </div>

      {/* Быстрые ссылки — праздники */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {quickLinks.map((link) => (
          <button
            key={link.query}
            type="button"
            onClick={() => handleQuickLink(link.query)}
            className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>
    </form>
  );
}
