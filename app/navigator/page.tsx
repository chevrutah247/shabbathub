'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ExternalLink, GraduationCap, ChevronRight, Star, Play, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

type Lang = 'ru' | 'en' | 'he' | 'uk';

const txt: Record<string, Record<Lang, string>> = {
  back: { ru: 'На главную', en: 'Home', he: 'דף הבית', uk: 'На головну' },
  title: { ru: 'Навигатор', en: 'Navigator', he: 'נווט', uk: 'Навігатор' },
  subtitle: {
    ru: 'Полезные ресурсы для еврейской жизни, образования и общины',
    en: 'Useful resources for Jewish life, education and community',
    he: 'משאבים שימושיים לחיים יהודיים, חינוך וקהילה',
    uk: 'Корисні ресурси для єврейського життя, освіти та громади',
  },
  visitSite: { ru: 'Перейти на сайт', en: 'Visit website', he: 'בקר באתר', uk: 'Перейти на сайт' },
  watchVideo: { ru: 'Смотреть видео', en: 'Watch video', he: 'צפה בסרטון', uk: 'Дивитися відео' },
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
};

/* ── Resource card types ── */

interface Resource {
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  url: string;
  icon: typeof GraduationCap;
  color: string;
  bgColor: string;
  tags: Record<Lang, string[]>;
}

interface ResourceCategory {
  key: string;
  label: Record<Lang, string>;
  icon: typeof GraduationCap;
  resources: Resource[];
}

/* ── Video types ── */

interface Video {
  youtubeId: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
}

interface VideoSubcategory {
  key: string;
  label: Record<Lang, string>;
  videos: Video[];
}

interface VideoCategory {
  key: string;
  label: Record<Lang, string>;
  icon: typeof Star;
  subcategories: VideoSubcategory[];
}

/* ── Data ── */

const resourceCategories: ResourceCategory[] = [
  {
    key: 'education',
    label: { ru: 'Образование', en: 'Education', he: 'חינוך', uk: 'Освіта' },
    icon: GraduationCap,
    resources: [
      {
        name: {
          ru: 'Chinuch.org — Справочник еврейских школ',
          en: 'Chinuch.org — Jewish Schools Directory',
          he: 'Chinuch.org — מדריך בתי ספר יהודיים',
          uk: 'Chinuch.org — Довідник єврейських шкіл',
        },
        description: {
          ru: 'Полная база данных еврейских образовательных учреждений по всему миру: школы, йешивы, семинарии. Поиск по штату, городу и типу.',
          en: 'Complete database of Jewish educational institutions worldwide: schools, yeshivas, seminaries. Search by state, city and type.',
          he: 'מאגר מלא של מוסדות חינוך יהודיים ברחבי העולם: בתי ספר, ישיבות, סמינרים. חיפוש לפי מדינה, עיר וסוג.',
          uk: 'Повна база даних єврейських навчальних закладів по всьому світу: школи, єшиви, семінарії. Пошук за штатом, містом та типом.',
        },
        url: 'https://www.chinuch.org/',
        icon: GraduationCap,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        tags: {
          ru: ['Школы', 'Йешивы', 'Семинарии', 'Весь мир'],
          en: ['Schools', 'Yeshivas', 'Seminaries', 'Worldwide'],
          he: ['בתי ספר', 'ישיבות', 'סמינרים', 'כל העולם'],
          uk: ['Школи', 'Єшиви', 'Семінарії', 'Весь світ'],
        },
      },
    ],
  },
];

const videoCategories: VideoCategory[] = [
  {
    key: 'holidays',
    label: { ru: 'Праздники', en: 'Holidays', he: 'חגים', uk: 'Свята' },
    icon: Star,
    subcategories: [
      {
        key: 'purim',
        label: { ru: 'Пурим', en: 'Purim', he: 'פורים', uk: 'Пурім' },
        videos: [
          {
            youtubeId: 'ET-GpqOk7oY',
            title: {
              ru: 'Пурим — история и традиции',
              en: 'Purim — History & Traditions',
              he: 'פורים — היסטוריה ומסורות',
              uk: 'Пурім — історія та традиції',
            },
            description: {
              ru: 'Видео о празднике Пурим',
              en: 'Video about the holiday of Purim',
              he: 'סרטון על חג הפורים',
              uk: 'Відео про свято Пурім',
            },
          },
          {
            youtubeId: '0vIj0u1Ua24',
            title: {
              ru: 'Пурим — урок и вдохновение',
              en: 'Purim — Lesson & Inspiration',
              he: 'פורים — שיעור והשראה',
              uk: 'Пурім — урок та натхнення',
            },
            description: {
              ru: 'Видео о празднике Пурим',
              en: 'Video about the holiday of Purim',
              he: 'סרטון על חג הפורים',
              uk: 'Відео про свято Пурім',
            },
          },
          {
            youtubeId: '8uQ8xB-KbYs',
            title: {
              ru: 'Пурим — радость и мицвот',
              en: 'Purim — Joy & Mitzvot',
              he: 'פורים — שמחה ומצוות',
              uk: 'Пурім — радість та міцвот',
            },
            description: {
              ru: 'Видео о празднике Пурим',
              en: 'Video about the holiday of Purim',
              he: 'סרטון על חג הפורים',
              uk: 'Відео про свято Пурім',
            },
          },
        ],
      },
    ],
  },
];

/* ── Video Card Component ── */

function VideoCard({ video, lang }: { video: Video; lang: Lang }) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 overflow-hidden">
      <div className="relative aspect-video bg-gray-900">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title[lang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl}
              alt={video.title[lang]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 text-sm leading-snug mb-1">
          {video.title[lang]}
        </h4>
        <p className="text-gray-500 text-xs">{video.description[lang]}</p>
      </div>
    </div>
  );
}

/* ── Subcategory with toggle ── */

function SubcategorySection({ sub, lang }: { sub: VideoSubcategory; lang: Lang }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 mb-4 group cursor-pointer"
      >
        <span className="text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
          {sub.label[lang]}
        </span>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {sub.videos.length}
        </span>
        <ChevronDown
          size={18}
          className={'text-gray-400 transition-transform ' + (open ? 'rotate-180' : '')}
        />
      </button>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sub.videos.map((v) => (
            <VideoCard key={v.youtubeId} video={v} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */

export default function NavigatorPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft size={16} />
            {txt.back[lang]}
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            {txt.title[lang]}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {txt.subtitle[lang]}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <div className="space-y-14">

          {/* Resource categories (Education, etc.) */}
          {resourceCategories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.key}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <CatIcon size={22} className="text-primary-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900">
                    {cat.label[lang]}
                  </h2>
                </div>

                <div className="grid gap-4 md:gap-5">
                  {cat.resources.map((res, idx) => {
                    const ResIcon = res.icon;
                    return (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 overflow-hidden"
                      >
                        <div className="p-5 md:p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 ${res.bgColor} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                              <ResIcon size={24} className={res.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                  {res.name[lang]}
                                </h3>
                                <ExternalLink size={16} className="text-gray-400 group-hover:text-primary-500 shrink-0 transition-colors" />
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                {res.description[lang]}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {res.tags[lang].map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-end gap-1 text-sm text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {txt.visitSite[lang]}
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Video categories (Holidays → Purim, etc.) */}
          {videoCategories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.key}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <CatIcon size={22} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900">
                    {cat.label[lang]}
                  </h2>
                </div>

                {cat.subcategories.map((sub) => (
                  <SubcategorySection key={sub.key} sub={sub} lang={lang} />
                ))}
              </div>
            );
          })}
        </div>

        {/* Coming Soon Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            {txt.moreComingSoon[lang]}
          </div>
          <p className="mt-3 text-gray-500 text-sm">
            {txt.suggestResource[lang]}
          </p>
        </div>
      </section>
    </main>
  );
}
