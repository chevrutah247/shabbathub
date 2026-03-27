'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const content = {
  backHome: { ru: 'На главную', en: 'Home', he: 'דף הבית', uk: 'На головну' },
  title: { ru: 'О проекте ShabbatHub', en: 'About ShabbatHub', he: 'אודות ShabbatHub', uk: 'Про проект ShabbatHub' },
  orgIntro: {
    ru: 'ShabbatHub — это бесплатный проект цифровой библиотеки организации Education On The Go Corp, некоммерческой организации 501(c)(3). Наша миссия — сделать еврейские субботние публикации свободно доступными для мирового еврейского сообщества.',
    en: 'ShabbatHub is a free digital library project of Education On The Go Corp, a 501(c)(3) nonprofit organization. Our mission is to make Jewish Shabbat publications freely accessible to the global Jewish community.',
    he: 'ShabbatHub הוא פרויקט ספרייה דיגיטלית חינמית של Education On The Go Corp, ארגון ללא מטרות רווח 501(c)(3). המשימה שלנו היא להנגיש פרסומי שבת יהודיים לקהילה היהודית העולמית.',
    uk: 'ShabbatHub — це безкоштовний проект цифрової бібліотеки організації Education On The Go Corp, некомерційної організації 501(c)(3). Наша місія — зробити єврейські суботні публікації вільно доступними для світової єврейської громади.',
  },
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
    ru: 'Сохранять и распространять еврейские субботние публикации, материалы по Торе и образовательные ресурсы — обеспечивая каждой еврейской семье, независимо от местоположения или финансовых возможностей, доступ к содержательному субботнему чтению.',
    en: 'To preserve and distribute Jewish Shabbat publications, Torah materials, and educational resources — ensuring that every Jewish family, regardless of location or financial means, has access to meaningful Shabbat reading.',
    he: 'לשמר ולהפיץ פרסומי שבת יהודיים, חומרי תורה ומשאבים חינוכיים — כדי להבטיח שכל משפחה יהודית, ללא קשר למיקום או ליכולת כלכלית, תהיה לה גישה לקריאת שבת משמעותית.',
    uk: 'Зберігати та поширювати єврейські суботні публікації, матеріали з Тори та освітні ресурси — забезпечуючи кожній єврейській родині, незалежно від місця проживання чи фінансових можливостей, доступ до змістовного суботнього читання.',
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
  orgInfo: { ru: 'Об организации', en: 'Organization', he: 'אודות הארגון', uk: 'Про організацію' },
  orgName: { ru: 'Организация', en: 'Organization', he: 'ארגון', uk: 'Організація' },
  orgStatus: { ru: 'Статус', en: 'Status', he: 'סטטוס', uk: 'Статус' },
  orgFounded: { ru: 'Основана', en: 'Founded', he: 'נוסד', uk: 'Заснована' },
  orgHQ: { ru: 'Штаб-квартира', en: 'Headquarters', he: 'מטה', uk: 'Штаб-квартира' },
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
          <div className="bg-blue-50 border-l-4 border-primary-600 p-4 rounded-r-lg mb-6">
            <p className="text-primary-900 font-medium">{c('orgIntro')}</p>
          </div>

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
          <div className="bg-gold-50 border border-gold-200 rounded-xl p-5 italic text-primary-900">
            {c('missionText')}
          </div>

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

          <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">{c('orgInfo')}</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 not-prose">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">{c('orgName')}</span>
              <span className="text-gray-800 font-semibold">Education On The Go Corp</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">{c('orgStatus')}</span>
              <span className="text-gray-800">501(c)(3) Nonprofit &middot; EIN: 92-1172505</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">{c('orgFounded')}</span>
              <span className="text-gray-800">2022</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">{c('orgHQ')}</span>
              <span className="text-gray-800">Brooklyn, New York</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">{c('contacts')}</h2>
          <p>
            {c('contactText')} <a href="mailto:contact@edonthego.org" className="text-primary-600 hover:underline">contact@edonthego.org</a>
          </p>
        </div>
      </div>
    </div>
  );
}
