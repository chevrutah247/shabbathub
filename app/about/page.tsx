'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const content = {
  backHome: { ru: 'На главную', en: 'Home', he: 'דף הבית', uk: 'На головну' },
  title: { ru: 'О проекте ShabbatHub', en: 'About ShabbatHub', he: 'אודות ShabbatHub', uk: 'Про проект ShabbatHub' },
  intro1: {
    ru: '<strong>ShabbatHub</strong> — это бесплатный онлайн-архив материалов к Шаббату.',
    en: '<strong>ShabbatHub</strong> is a free online archive of Shabbat materials.',
    he: '<strong>ShabbatHub</strong> הוא ארכיון מקוון חינמי של חומרי שבת.',
    uk: '<strong>ShabbatHub</strong> — це безкоштовний онлайн-архів матеріалів до Шаббату.',
  },
  intro2: {
    ru: 'Мы собираем и систематизируем еженедельные газеты, учебные материалы и статьи на русском, иврите, английском и украинском языках, чтобы сделать еврейское знание доступным для всех.',
    en: 'We collect and organize weekly newspapers, study materials and articles in Russian, Hebrew, English and Ukrainian to make Jewish knowledge accessible to everyone.',
    he: 'אנו אוספים ומארגנים עיתונים שבועיים, חומרי לימוד ומאמרים ברוסית, עברית, אנגלית ואוקראינית כדי להנגיש ידע יהודי לכולם.',
    uk: 'Ми збираємо та систематизуємо щотижневі газети, навчальні матеріали та статті російською, івритом, англійською та українською мовами, щоб зробити єврейське знання доступним для всіх.',
  },
  whatWeHave: { ru: 'Что у нас есть:', en: 'What we offer:', he: ':מה יש לנו', uk: 'Що в нас є:' },
  item1: { ru: '📰 Еженедельные газеты (Chevrutah, Шомрей Шабос и др.)', en: '📰 Weekly newspapers (Chevrutah, Shomrei Shabbos and more)', he: '📰 עיתונים שבועיים (חברותא, שומרי שבת ועוד)', uk: '📰 Щотижневі газети (Chevrutah, Шомрей Шабос та ін.)' },
  item2: { ru: '📚 Учебные материалы и статьи', en: '📚 Study materials and articles', he: '📚 חומרי לימוד ומאמרים', uk: '📚 Навчальні матеріали та статті' },
  item3: { ru: '🕎 Материалы к праздникам', en: '🕎 Holiday materials', he: '🕎 חומרים לחגים', uk: '🕎 Матеріали до свят' },
  item4: { ru: '👥 Группы для изучения Торы', en: '👥 Torah study groups', he: '👥 קבוצות לימוד תורה', uk: '👥 Групи для вивчення Тори' },
  mission: { ru: 'Наша миссия', en: 'Our Mission', he: 'המשימה שלנו', uk: 'Наша місія' },
  missionText: {
    ru: 'Мы верим, что доступ к еврейскому знанию должен быть свободным и удобным. ShabbatHub создан добровольцами для того, чтобы каждый мог найти материалы для изучения Торы и подготовки к Шаббату — в любое время, из любой точки мира.',
    en: 'We believe that access to Jewish knowledge should be free and convenient. ShabbatHub was created by volunteers so that everyone can find materials for Torah study and Shabbat preparation — anytime, from anywhere in the world.',
    he: 'אנו מאמינים שהגישה לידע יהודי צריכה להיות חופשית ונוחה. ShabbatHub נוצר על ידי מתנדבים כדי שכל אחד יוכל למצוא חומרים ללימוד תורה והכנה לשבת — בכל עת, מכל מקום בעולם.',
    uk: 'Ми віримо, що доступ до єврейського знання має бути вільним та зручним. ShabbatHub створений волонтерами для того, щоб кожен міг знайти матеріали для вивчення Тори та підготовки до Шаббату — у будь-який час, з будь-якої точки світу.',
  },
  howToHelp: { ru: 'Как помочь проекту', en: 'How to help', he: 'איך לעזור', uk: 'Як допомогти проекту' },
  help1: {
    ru: '🔗 Поделитесь ссылкой на ShabbatHub с друзьями и знакомыми',
    en: '🔗 Share a link to ShabbatHub with friends and family',
    he: '🔗 שתפו קישור ל-ShabbatHub עם חברים ומשפחה',
    uk: '🔗 Поділіться посиланням на ShabbatHub з друзями та знайомими',
  },
  help2: {
    ru: '📤 Загружайте материалы, которых ещё нет в архиве',
    en: '📤 Upload materials that are not yet in the archive',
    he: '📤 העלו חומרים שעדיין לא נמצאים בארכיון',
    uk: '📤 Завантажуйте матеріали, яких ще немає в архіві',
  },
  help3: {
    ru: '💰 Поддержите проект финансово',
    en: '💰 Support the project financially',
    he: '💰 תמכו בפרויקט כלכלית',
    uk: '💰 Підтримайте проект фінансово',
  },
  contacts: { ru: 'Контакты', en: 'Contacts', he: 'יצירת קשר', uk: 'Контакти' },
  contactText: {
    ru: 'По вопросам сотрудничества пишите на:',
    en: 'For collaboration inquiries, write to:',
    he: ':לשאלות שיתוף פעולה, כתבו ל',
    uk: 'З питань співпраці пишіть на:',
  },
  donateBtn: { ru: 'Поддержать проект', en: 'Support the project', he: 'תמכו בפרויקט', uk: 'Підтримати проект' },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const c = (key: keyof typeof content) => content[key][lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4" dir={dir}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft size={20} /> {c('backHome')}
        </Link>

        <h1 className="text-4xl font-bold text-primary-900 mb-6">{c('title')}</h1>

        <div className="prose prose-lg text-gray-600">
          <p dangerouslySetInnerHTML={{ __html: c('intro1') }} />
          <p>{c('intro2')}</p>

          <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">{c('whatWeHave')}</h2>
          <ul className="list-disc space-y-2" style={{ paddingInlineStart: '1.5rem' }}>
            <li>{c('item1')}</li>
            <li>{c('item2')}</li>
            <li>{c('item3')}</li>
            <li>{c('item4')}</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">{c('mission')}</h2>
          <p>{c('missionText')}</p>

          <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">{c('howToHelp')}</h2>
          <ul className="list-none space-y-3" style={{ paddingInlineStart: '0' }}>
            <li>{c('help1')}</li>
            <li>{c('help2')}</li>
            <li>{c('help3')}</li>
          </ul>

          <div className="mt-6">
            <Link href="/donate" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition no-underline">
              {c('donateBtn')}
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">{c('contacts')}</h2>
          <p>
            {c('contactText')} <a href="mailto:contact@chevrutah24x7.net" className="text-primary-600 hover:underline">contact@chevrutah24x7.net</a>
          </p>
        </div>
      </div>
    </div>
  );
}
