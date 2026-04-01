'use client';

import { useState, useEffect } from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { hayomYomData } from '@/data/hayom-yom';

const labels = {
  ru: {
    title: 'Гайом Йом',
    titleSub: 'Сегодня День',
    lessons: 'Уроки дня',
    source: 'Из книги «Гайом Йом» Любавичского Ребе',
  },
  en: {
    title: 'HaYom Yom',
    titleSub: 'Today Is The Day',
    lessons: 'Daily Study',
    source: 'From "HaYom Yom" by the Lubavitcher Rebbe',
  },
  he: {
    title: 'היום יום',
    titleSub: '',
    lessons: 'שיעורים יומיים',
    source: 'מתוך "היום יום" של הרבי מליובאוויטש',
  },
  uk: {
    title: 'Гайом Йом',
    titleSub: 'Сьогодні День',
    lessons: 'Уроки дня',
    source: 'З книги «Гайом Йом» Любавицького Ребе',
  },
};

function parseEntry(text: string) {
  const lines = text.split('\n').filter((l) => l.trim());

  // Separate lessons from main text
  const lessonKeywords = ['Пятикнижие:', 'Тегилим:', 'Тания:', 'Теилим:', 'Текилим:', 'Уроки для'];
  const lessons: string[] = [];
  const mainLines: string[] = [];
  let inLessons = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (lessonKeywords.some((k) => trimmed.startsWith(k))) {
      inLessons = true;
      lessons.push(trimmed);
    } else if (inLessons && (trimmed.startsWith('Пятикн') || trimmed.startsWith('Тег') || trimmed.startsWith('Тан'))) {
      lessons.push(trimmed);
    } else {
      inLessons = false;
      // Skip OCR garbage lines (very short or mostly non-cyrillic)
      if (trimmed.length > 3) {
        mainLines.push(trimmed);
      }
    }
  }

  return {
    lessons: lessons.join('\n'),
    mainText: mainLines.join('\n\n'),
  };
}

export default function HayomYomBanner() {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.ru;
  const [entry, setEntry] = useState<{ header: string; text: string } | null>(null);
  const [hebrewDate, setHebrewDate] = useState('');

  useEffect(() => {
    const today = new Date();
    fetch(
      'https://www.hebcal.com/converter?cfg=json&gy=' +
        today.getFullYear() +
        '&gm=' +
        (today.getMonth() + 1) +
        '&gd=' +
        today.getDate() +
        '&g2h=1'
    )
      .then((r) => r.json())
      .then((data) => {
        setHebrewDate(data.hebrew || data.hd + ' ' + data.hm);
        const key = data.hm + '-' + data.hd;
        const found = hayomYomData[key];
        if (found) setEntry(found);
      })
      .catch(() => {});
  }, []);

  if (!entry) return null;

  const { lessons, mainText } = parseEntry(entry.text);

  return (
    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg" style={{ border: '1px solid rgba(120, 53, 15, 0.15)' }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #92400e 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}
          >
            <BookOpen size={20} className="text-amber-400" />
          </div>
          <div>
            <h3
              className="text-white font-bold text-lg leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t.title}{' '}
              <span className="text-amber-300/80 font-normal text-base">— {t.titleSub}</span>
            </h3>
            <p className="text-amber-200/50 text-xs mt-0.5">{hebrewDate}</p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-amber-200/40 text-[10px] uppercase tracking-wider">{entry.header}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 100%)' }}>
        {/* Lessons block */}
        {lessons && (
          <div className="px-6 pt-4 pb-3">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={14} className="text-amber-700/50" />
              <span
                className="text-[11px] font-bold uppercase tracking-wider text-amber-800/50"
              >
                {t.lessons}
              </span>
            </div>
            <div
              className="text-sm text-stone-600 leading-relaxed pl-3"
              style={{
                borderLeft: '3px solid rgba(217, 119, 6, 0.2)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {lessons.split('\n').map((line, i) => (
                <p key={i} className="mb-0.5">
                  {line.startsWith('Пятикнижие:') || line.startsWith('Тегилим:') || line.startsWith('Тания:') ? (
                    <>
                      <span className="font-semibold text-amber-900/70">
                        {line.split(':')[0]}:
                      </span>{' '}
                      {line.split(':').slice(1).join(':')}
                    </>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {lessons && mainText && (
          <div className="mx-6">
            <div className="border-t border-amber-200/50" />
          </div>
        )}

        {/* Main teaching */}
        {mainText && (
          <div className="px-6 py-4">
            <div
              className="text-stone-800 text-[15px] leading-[1.8]"
              style={{ fontFamily: "Georgia, 'Crimson Pro', serif" }}
            >
              {mainText.split('\n\n').map((paragraph, i) => (
                <p key={i} className={i > 0 ? 'mt-3' : ''}>
                  {i === 0 && (
                    <span
                      className="text-3xl font-bold text-amber-800/30 float-left mr-2 leading-none"
                      style={{ marginTop: '2px' }}
                    >
                      {paragraph.charAt(0)}
                    </span>
                  )}
                  {i === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          className="px-6 py-2.5 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(217, 119, 6, 0.1)', background: 'rgba(254, 243, 199, 0.3)' }}
        >
          <span className="text-amber-800/40 text-[10px] italic">{t.source}</span>
          <span className="text-amber-800/30 text-[10px]">ShabbatHub.com</span>
        </div>
      </div>
    </div>
  );
}
