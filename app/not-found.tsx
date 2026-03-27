'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

const notFoundText = {
  ru: {
    title: 'Страница не найдена',
    message: 'Извините, запрашиваемая страница не существует или была перемещена.',
    home: 'На главную',
    catalog: 'Каталог',
  },
  en: {
    title: 'Page Not Found',
    message: 'Sorry, the page you are looking for does not exist or has been moved.',
    home: 'Go Home',
    catalog: 'Catalog',
  },
  he: {
    title: 'הדף לא נמצא',
    message: 'מצטערים, הדף שאתם מחפשים אינו קיים או הועבר.',
    home: 'לדף הבית',
    catalog: 'קטלוג',
  },
  uk: {
    title: 'Сторінку не знайдено',
    message: 'Вибачте, сторінка, яку ви шукаєте, не існує або була переміщена.',
    home: 'На головну',
    catalog: 'Каталог',
  },
};

export default function NotFound() {
  const { lang } = useLanguage();
  const text = notFoundText[lang] || notFoundText.ru;
  const isRTL = lang === 'he';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center"
    >
      <h1 className="text-7xl font-bold text-primary-800 mb-3">404</h1>
      <p className="text-xl text-gray-700 mb-2">{text.title}</p>
      <p className="text-sm text-gray-500 max-w-md mb-8">{text.message}</p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-2.5 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition text-sm font-medium"
        >
          {text.home}
        </Link>
        <Link
          href="/catalog"
          className="px-6 py-2.5 border border-primary-700 text-primary-700 rounded-lg hover:bg-primary-50 transition text-sm font-medium"
        >
          {text.catalog}
        </Link>
      </div>
    </div>
  );
}
