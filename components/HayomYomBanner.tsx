'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { hayomYomData } from '@/data/hayom-yom';

const labels = {
  ru: { title: 'Гайом Йом — Сегодня День', subtitle: 'Ежедневная запись из книги наставлений Любавичского Ребе', loading: 'Загрузка...' },
  en: { title: 'HaYom Yom — Today Is The Day', subtitle: 'Daily entry from the Lubavitcher Rebbe\'s book of teachings', loading: 'Loading...' },
  he: { title: 'היום יום', subtitle: 'רשימה יומית מספר ההדרכות של הרבי מליובאוויטש', loading: '...טוען' },
  uk: { title: 'Гайом Йом — Сьогодні День', subtitle: 'Щоденний запис із книги настанов Любавицького Ребе', loading: 'Завантаження...' },
};

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
        const month = data.hm; // e.g. "Kislev", "Nisan"
        const day = data.hd;   // e.g. 19
        setHebrewDate(data.hebrew || (day + ' ' + month));

        // Look up in our data
        const key = month + '-' + day;
        const found = hayomYomData[key];
        if (found) {
          setEntry(found);
        } else {
          // Try alternate month names
          const altKeys = [
            month + '-' + day,
            month.replace('Iyyar', 'Iyar') + '-' + day,
            month.replace('Cheshvan', 'Marcheshvan') + '-' + day,
          ];
          for (const k of altKeys) {
            if (hayomYomData[k]) {
              setEntry(hayomYomData[k]);
              break;
            }
          }
        }
      })
      .catch(() => {});
  }, []);

  if (!entry) return null;

  // Clean and truncate text for display
  const displayText = entry.text
    .replace(/\n+/g, '\n')
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .slice(0, 12) // Show first 12 meaningful lines
    .join('\n');

  return (
    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-amber-200/50" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)' }}>
      {/* Header */}
      <div className="px-5 py-3 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)' }}>
        <span className="text-2xl">📖</span>
        <div>
          <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
            {t.title}
          </h3>
          <p className="text-amber-200/70 text-xs">{hebrewDate}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-amber-900/60 text-xs font-semibold uppercase tracking-wider mb-2">
          {entry.header}
        </p>
        <div className="text-stone-800 text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: "'DM Sans', Georgia, sans-serif" }}>
          {displayText}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-amber-300/30 text-right">
        <span className="text-amber-700/50 text-[10px] italic">{t.subtitle}</span>
      </div>
    </div>
  );
}
