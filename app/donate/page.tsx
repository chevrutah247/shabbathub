'use client';

import Link from 'next/link';
import { ArrowLeft, Heart, BookOpen, Users, Shield } from 'lucide-react';
import { useLang } from '@/lib/language-context';

const texts = {
  back: { ru: 'Назад', en: 'Back', he: 'חזרה', uk: 'Назад' },
  title: {
    ru: 'Поддержать ShabbatHub',
    en: 'Support ShabbatHub',
    he: 'תמכו ב-ShabbatHub',
    uk: 'Підтримати ShabbatHub',
  },
  subtitle: {
    ru: 'ShabbatHub — бесплатная библиотека еврейских газет и публикаций на Шабат. Проект существует благодаря вашей поддержке.',
    en: 'ShabbatHub is a free library of Jewish newspapers and publications for Shabbat. The project runs on your support.',
    he: 'ShabbatHub היא ספרייה חינמית של עיתונים ופרסומים יהודיים לשבת. הפרויקט מתקיים בזכות התמיכה שלכם.',
    uk: 'ShabbatHub — безкоштовна бібліотека єврейських газет та публікацій на Шабат. Проєкт існує завдяки вашій підтримці.',
  },
  donateBtn: {
    ru: 'Поддержать через PayPal',
    en: 'Donate via PayPal',
    he: 'תרמו דרך PayPal',
    uk: 'Підтримати через PayPal',
  },
  secure: {
    ru: 'Безопасный платёж через PayPal. Можно оплатить картой без регистрации.',
    en: 'Secure payment via PayPal. You can pay by card without an account.',
    he: 'תשלום מאובטח דרך PayPal. ניתן לשלם בכרטיס ללא חשבון.',
    uk: 'Безпечний платіж через PayPal. Можна оплатити карткою без реєстрації.',
  },
  whyTitle: {
    ru: 'Куда идут средства',
    en: 'Where your money goes',
    he: 'לאן הולך הכסף',
    uk: 'Куди йдуть кошти',
  },
  reason1title: {
    ru: 'Хостинг и серверы',
    en: 'Hosting & servers',
    he: 'אחסון ושרתים',
    uk: 'Хостинг та сервери',
  },
  reason1desc: {
    ru: 'Хранение тысяч PDF-файлов, база данных и быстрая доставка контента',
    en: 'Storing thousands of PDF files, database and fast content delivery',
    he: 'אחסון אלפי קבצי PDF, מסד נתונים ומשלוח תוכן מהיר',
    uk: 'Зберігання тисяч PDF-файлів, база даних та швидка доставка контенту',
  },
  reason2title: {
    ru: 'Разработка',
    en: 'Development',
    he: 'פיתוח',
    uk: 'Розробка',
  },
  reason2desc: {
    ru: 'Новые функции, улучшение поиска, мобильная версия',
    en: 'New features, better search, mobile version',
    he: 'פיצ\'רים חדשים, שיפור חיפוש, גרסה ניידת',
    uk: 'Нові функції, покращення пошуку, мобільна версія',
  },
  reason3title: {
    ru: 'Контент',
    en: 'Content',
    he: 'תוכן',
    uk: 'Контент',
  },
  reason3desc: {
    ru: 'Добавление новых публикаций, оцифровка архивов',
    en: 'Adding new publications, digitizing archives',
    he: 'הוספת פרסומים חדשים, דיגיטציה של ארכיונים',
    uk: 'Додавання нових публікацій, оцифрування архівів',
  },
  thanksTitle: {
    ru: 'Спасибо!',
    en: 'Thank you!',
    he: '!תודה רבה',
    uk: 'Дякуємо!',
  },
  thanksText: {
    ru: 'Каждый вклад помогает еврейским общинам по всему миру получить доступ к Торе и еврейским знаниям бесплатно.',
    en: 'Every contribution helps Jewish communities worldwide access Torah and Jewish knowledge for free.',
    he: 'כל תרומה עוזרת לקהילות יהודיות ברחבי העולם לגשת לתורה ולידע יהודי בחינם.',
    uk: 'Кожен внесок допомагає єврейським громадам по всьому світу отримати доступ до Тори та єврейських знань безкоштовно.',
  },
};

function t(key: keyof typeof texts, lang: string): string {
  const entry = texts[key];
  return (entry as any)[lang] || (entry as any).en || '';
}

export default function DonatePage() {
  const lang = useLang();
  const isRtl = lang === 'he';

  return (
    <div className="min-h-screen bg-cream" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft size={20} />
          {t('back', lang)}
        </Link>

        {/* Hero */}
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {t('title', lang)}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            {t('subtitle', lang)}
          </p>

          <a
            href="https://www.paypal.com/ncp/payment/LY67CR4F29BKN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary-700 transition shadow-md hover:shadow-lg"
          >
            <Heart size={20} />
            {t('donateBtn', lang)}
          </a>

          <p className="text-gray-400 text-sm mt-4">
            {t('secure', lang)}
          </p>
        </div>

        {/* Where money goes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {t('whyTitle', lang)}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('reason1title', lang)}</p>
                <p className="text-sm text-gray-500">{t('reason1desc', lang)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('reason2title', lang)}</p>
                <p className="text-sm text-gray-500">{t('reason2desc', lang)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('reason3title', lang)}</p>
                <p className="text-sm text-gray-500">{t('reason3desc', lang)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thank you */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-primary-800 mb-2">
            {t('thanksTitle', lang)}
          </h3>
          <p className="text-primary-700 text-sm leading-relaxed">
            {t('thanksText', lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
