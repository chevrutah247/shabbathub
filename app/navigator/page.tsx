'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ExternalLink, GraduationCap, ArrowRight, Star, Play, Sparkles, Compass, BookOpen, Video } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

type Lang = 'ru' | 'en' | 'he' | 'uk';

const txt = {
  back: { ru: 'На главную', en: 'Home', he: 'דף הבית', uk: 'На головну' },
  title: { ru: 'Навигатор', en: 'Navigator', he: 'נווט', uk: 'Навігатор' },
  subtitle: {
    ru: 'Ваш путеводитель по миру еврейских ресурсов',
    en: 'Your guide to Jewish resources worldwide',
    he: 'המדריך שלך למשאבים יהודיים בעולם',
    uk: 'Ваш путівник по світу єврейських ресурсів',
  },
  heroDesc: {
    ru: 'Образование, праздники, видео и полезные ссылки — всё в одном месте',
    en: 'Education, holidays, videos and useful links — all in one place',
    he: 'חינוך, חגים, סרטונים וקישורים שימושיים — הכל במקום אחד',
    uk: 'Освіта, свята, відео та корисні посилання — все в одному місці',
  },
  sections: { ru: 'Разделы', en: 'Sections', he: 'חלקים', uk: 'Розділи' },
  visitSite: { ru: 'Открыть ресурс', en: 'Open resource', he: 'פתח משאב', uk: 'Відкрити ресурс' },
  watchOnYoutube: { ru: 'На YouTube', en: 'On YouTube', he: 'ביוטיוב', uk: 'На YouTube' },
  moreComingSoon: {
    ru: 'Новые ресурсы добавляются регулярно',
    en: 'New resources are added regularly',
    he: 'משאבים חדשים מתווספים באופן קבוע',
    uk: 'Нові ресурси додаються регулярно',
  },
  suggestResource: {
    ru: 'Знаете полезный ресурс? Напишите нам!',
    en: 'Know a useful resource? Let us know!',
    he: 'מכירים משאב שימושי? ספרו לנו!',
    uk: 'Знаєте корисний ресурс? Напишіть нам!',
  },
} satisfies Record<string, Record<Lang, string>>;

/* ── Quick nav items ── */
const navItems = [
  { id: 'education', label: { ru: 'Образование', en: 'Education', he: 'חינוך', uk: 'Освіта' }, icon: GraduationCap, color: 'from-blue-500 to-indigo-600' },
  { id: 'holidays', label: { ru: 'Праздники', en: 'Holidays', he: 'חגים', uk: 'Свята' }, icon: Star, color: 'from-amber-500 to-orange-600' },
];

/* ── Resource data ── */
const resources = [
  {
    name: {
      ru: 'Chinuch.org',
      en: 'Chinuch.org',
      he: 'Chinuch.org',
      uk: 'Chinuch.org',
    },
    subtitle: {
      ru: 'Справочник еврейских школ',
      en: 'Jewish Schools Directory',
      he: 'מדריך בתי ספר יהודיים',
      uk: 'Довідник єврейських шкіл',
    },
    description: {
      ru: 'Полная база данных еврейских образовательных учреждений по всему миру — школы, йешивы, семинарии. Поиск по штату, городу и типу учреждения.',
      en: 'Complete database of Jewish educational institutions worldwide — schools, yeshivas, seminaries. Search by state, city and institution type.',
      he: 'מאגר מלא של מוסדות חינוך יהודיים ברחבי העולם — בתי ספר, ישיבות, סמינרים. חיפוש לפי מדינה, עיר וסוג מוסד.',
      uk: 'Повна база даних єврейських навчальних закладів по всьому світу — школи, єшиви, семінарії. Пошук за штатом, містом та типом закладу.',
    },
    url: 'https://www.chinuch.org/',
    gradient: 'from-blue-600 to-indigo-700',
    lightBg: 'bg-blue-50',
    tags: {
      ru: ['Школы', 'Йешивы', 'Семинарии', 'Весь мир'],
      en: ['Schools', 'Yeshivas', 'Seminaries', 'Worldwide'],
      he: ['בתי ספר', 'ישיבות', 'סמינרים', 'כל העולם'],
      uk: ['Школи', 'Єшиви', 'Семінарії', 'Весь світ'],
    },
  },
];

/* ── Video data ── */
const holidayVideos = {
  purim: {
    label: { ru: 'Пурим', en: 'Purim', he: 'פורים', uk: 'Пурім' },
    emoji: '🎭',
    gradient: 'from-purple-600 to-fuchsia-600',
    videos: [
      {
        youtubeId: 'ET-GpqOk7oY',
        title: { ru: 'Пурим — история и традиции', en: 'Purim — History & Traditions', he: 'פורים — היסטוריה ומסורות', uk: 'Пурім — історія та традиції' },
      },
      {
        youtubeId: '0vIj0u1Ua24',
        title: { ru: 'Пурим — урок и вдохновение', en: 'Purim — Lesson & Inspiration', he: 'פורים — שיעור והשראה', uk: 'Пурім — урок та натхнення' },
      },
      {
        youtubeId: '8uQ8xB-KbYs',
        title: { ru: 'Пурим — радость и мицвот', en: 'Purim — Joy & Mitzvot', he: 'פורים — שמחה ומצוות', uk: 'Пурім — радість та міцвот' },
      },
    ],
  },
};

/* ── Video Card ── */
function VideoCard({ video, lang, featured }: { video: { youtubeId: string; title: Record<Lang, string> }; lang: Lang; featured?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <div className={'group relative rounded-2xl overflow-hidden bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-500 ' + (featured ? 'md:col-span-2 md:row-span-2' : '')}>
      <div className={'relative ' + (featured ? 'aspect-video' : 'aspect-video')}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title[lang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumbUrl} alt={video.title[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={'rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300 ' + (featured ? 'w-20 h-20' : 'w-14 h-14')}>
                <Play size={featured ? 32 : 22} className="text-red-600 ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className={'font-semibold text-white leading-snug drop-shadow-lg ' + (featured ? 'text-lg md:text-xl' : 'text-sm')}>
                {video.title[lang]}
              </h4>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function NavigatorPage() {
  const { lang } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-indigo-900 text-white">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/15 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-4 pt-10 pb-14 md:pt-14 md:pb-20 relative z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-8 transition-colors">
            <ChevronLeft size={16} />
            {txt.back[lang]}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Compass size={26} className="text-amber-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
              {txt.title[lang]}
            </h1>
          </div>

          <p className="text-xl text-white/70 max-w-xl mb-2 font-light">
            {txt.subtitle[lang]}
          </p>
          <p className="text-sm text-white/40 max-w-lg">
            {txt.heroDesc[lang]}
          </p>

          {/* Quick nav pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className={'w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center ' + item.color}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors">
                    {item.label[lang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-16">

        {/* ═══ Education Section ═══ */}
        <section id="education">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                {navItems[0].label[lang]}
              </h2>
            </div>
          </div>

          {resources.map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Accent gradient bar */}
              <div className={'absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ' + res.gradient} />

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className={'w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300 ' + res.gradient}>
                    <BookOpen size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {res.name[lang]}
                        </h3>
                        <p className="text-blue-600 font-medium text-sm mt-0.5">
                          {res.subtitle[lang]}
                        </p>
                      </div>
                      <ExternalLink size={20} className="text-gray-300 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-2xl">
                      {res.description[lang]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {res.tags[lang].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium border border-blue-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-end gap-2 text-sm text-blue-600 font-semibold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  {txt.visitSite[lang]}
                  <ArrowRight size={16} />
                </div>
              </div>
            </a>
          ))}
        </section>

        {/* ═══ Holidays / Videos Section ═══ */}
        <section id="holidays">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Star size={22} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
              {navItems[1].label[lang]}
            </h2>
          </div>

          {/* Purim */}
          {Object.entries(holidayVideos).map(([key, holiday]) => (
            <div key={key}>
              {/* Subcategory header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{holiday.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{holiday.label[lang]}</h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-3" />
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">
                  {holiday.videos.length} {lang === 'ru' ? 'видео' : lang === 'uk' ? 'відео' : lang === 'he' ? 'סרטונים' : 'videos'}
                </span>
              </div>

              {/* Video grid — first video featured (larger) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {holiday.videos.map((v, idx) => (
                  <VideoCard key={v.youtubeId} video={v} lang={lang} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ── Footer CTA ── */}
      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200/60 mb-4">
            <Sparkles size={16} className="text-amber-500" />
            {txt.moreComingSoon[lang]}
          </div>
          <p className="text-gray-400 text-sm">
            {txt.suggestResource[lang]}
          </p>
        </div>
      </section>
    </main>
  );
}
