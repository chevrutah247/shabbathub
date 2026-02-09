'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Calendar, Loader2, Check, AlertCircle, Image, FileText } from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Publication {
  id: string;
  title_ru: string;
}

interface Parsha {
  id: number;
  name_ru: string;
  order_num: number;
}

interface Event {
  id: string;
  name_ru: string;
}

const parshaNameToId: Record<string, number> = {
  'Bereishit': 1, 'Noach': 2, 'Lech-Lecha': 3, 'Vayera': 4, 'Chayei Sarah': 5,
  'Toldot': 6, 'Vayetzei': 7, 'Vayishlach': 8, 'Vayeshev': 9, 'Miketz': 10,
  'Vayigash': 11, 'Vayechi': 12, 'Shemot': 13, 'Vaera': 14, 'Bo': 15,
  'Beshalach': 16, 'Yitro': 17, 'Mishpatim': 18, 'Terumah': 19, 'Tetzaveh': 20,
  'Ki Tisa': 21, 'Vayakhel': 22, 'Pekudei': 23, 'Vayikra': 24, 'Tzav': 25,
  'Shmini': 26, 'Tazria': 27, 'Metzora': 28, 'Achrei Mot': 29, 'Kedoshim': 30,
  'Emor': 31, 'Behar': 32, 'Bechukotai': 33, 'Bamidbar': 34, 'Nasso': 35,
  "Beha'alotcha": 36, "Sh'lach": 37, 'Korach': 38, 'Chukat': 39, 'Balak': 40,
  'Pinchas': 41, 'Matot': 42, 'Masei': 43, 'Devarim': 44, 'Vaetchanan': 45,
  'Eikev': 46, "Re'eh": 47, 'Shoftim': 48, 'Ki Teitzei': 49, 'Ki Tavo': 50,
  'Nitzavim': 51, 'Vayeilech': 52, "Ha'azinu": 53, 'Vezot Habracha': 54
};

// Извлечь ID файла из Google Drive ссылки
function extractGoogleDriveId(url: string): string | null {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Генерация thumbnail URL для Google Drive
function generateThumbnailUrl(pdfUrl: string): string | null {
  const fileId = extractGoogleDriveId(pdfUrl);
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  }
  return null;
}

export default function AddPdfPage() {
  const router = useRouter();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [parshiot, setParshiot] = useState<Parsha[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [currentParshaId, setCurrentParshaId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [publicationId, setPublicationId] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [gregorianDate, setGregorianDate] = useState(new Date().toISOString().split('T')[0]);
  const [hebrewDate, setHebrewDate] = useState('');
  const [parshaId, setParshaId] = useState<number | null>(null);
  const [eventId, setEventId] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [autoThumbnail, setAutoThumbnail] = useState(true);
  const [description, setDescription] = useState('');

  // Загрузка текущей парши
  useEffect(() => {
    async function fetchCurrentParsha() {
      try {
        const today = new Date();
        const res = await fetch(
          `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=${today.getFullYear()}&month=${today.getMonth() + 1}&ss=off&mf=off&c=off&s=on`
        );
        if (res.ok) {
          const data = await res.json();
          const parashat = data.items?.find((item: any) => {
            if (item.category !== 'parashat') return false;
            const itemDate = new Date(item.date);
            return itemDate >= today || (itemDate.getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000);
          });
          if (parashat) {
            const name = parashat.title?.replace('Parashat ', '');
            const id = parshaNameToId[name];
            if (id) {
              setCurrentParshaId(id);
              setParshaId(id);
            }
          }
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
    fetchCurrentParsha();
  }, []);

  // Конвертация даты
  useEffect(() => {
    async function convertDate() {
      if (!gregorianDate) return;
      try {
        const [year, month, day] = gregorianDate.split('-');
        const res = await fetch(
          `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}&g2h=1`
        );
        if (res.ok) {
          const data = await res.json();
          setHebrewDate(`${data.hd} ${data.hm} ${data.hy}`);
        }
      } catch (err) {
        console.error('Error converting date:', err);
      }
    }
    convertDate();
  }, [gregorianDate]);

  // Автогенерация thumbnail при изменении PDF URL
  useEffect(() => {
    if (autoThumbnail && pdfUrl) {
      const thumb = generateThumbnailUrl(pdfUrl);
      if (thumb) {
        setThumbnailUrl(thumb);
      }
    }
  }, [pdfUrl, autoThumbnail]);

  // Загрузка справочников
  useEffect(() => {
    Promise.all([
      fetch(SUPABASE_URL + '/rest/v1/publications?is_active=eq.true&order=title_ru&select=id,title_ru', {
        headers: { 'apikey': SUPABASE_KEY }
      }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/parshiot?order=order_num&select=id,name_ru,order_num', {
        headers: { 'apikey': SUPABASE_KEY }
      }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/events?is_active=eq.true&order=name_ru&select=id,name_ru', {
        headers: { 'apikey': SUPABASE_KEY }
      }).then(r => r.json())
    ]).then(([pubs, parshas, evts]) => {
      setPublications(pubs || []);
      if (currentParshaId && parshas) {
        const sorted = [...parshas].sort((a, b) => {
          if (a.id === currentParshaId) return -1;
          if (b.id === currentParshaId) return 1;
          return a.order_num - b.order_num;
        });
        setParshiot(sorted);
      } else {
        setParshiot(parshas || []);
      }
      setEvents(evts || []);
      setLoading(false);
    });
  }, [currentParshaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!title || !pdfUrl) {
      setError('Заполните обязательные поля: название и ссылку на PDF');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/issues', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          title,
          description: description || null,
          publication_id: publicationId || null,
          issue_number: issueNumber || null,
          gregorian_date: gregorianDate || null,
          parsha_id: parshaId || null,
          event_id: eventId || null,
          pdf_url: pdfUrl,
          thumbnail_url: thumbnailUrl || null,
          is_active: true
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Ошибка сохранения');
      }

      setSuccess(true);
      setTimeout(() => router.push('/catalog'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <Check size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Материал добавлен!</h2>
          <p className="text-gray-600">Перенаправление в каталог...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft size={20} />
          Назад в каталог
        </Link>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Добавить PDF материал</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Название */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Шомрей Шабос №805 Мишпатим"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 outline-none"
                required
              />
            </div>

            {/* Публикация */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Публикация (издание)
              </label>
              <select
                value={publicationId}
                onChange={(e) => setPublicationId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
              >
                <option value="">— Выберите публикацию —</option>
                {publications.map(p => (
                  <option key={p.id} value={p.id}>{p.title_ru}</option>
                ))}
              </select>
              <Link href="/add-publication" className="text-sm text-primary-600 hover:underline mt-1 inline-block">
                + Создать новую публикацию
              </Link>
            </div>

            {/* Номер выпуска */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Номер выпуска (опционально)
              </label>
              <input
                type="text"
                value={issueNumber}
                onChange={(e) => setIssueNumber(e.target.value)}
                placeholder="805"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
              />
            </div>

            {/* Дата */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата выхода
                </label>
                <input
                  type="date"
                  value={gregorianDate}
                  onChange={(e) => setGregorianDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Еврейская дата
                </label>
                <input
                  type="text"
                  value={hebrewDate}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-600"
                  placeholder="Авто-конвертация"
                />
              </div>
            </div>

            {/* Недельная глава */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Недельная глава
              </label>
              <select
                value={parshaId || ''}
                onChange={(e) => setParshaId(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
              >
                <option value="">— Не указана —</option>
                {parshiot.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name_ru} {p.id === currentParshaId ? '(текущая)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Событие */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Событие / Праздник (опционально)
              </label>
              <select
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
              >
                <option value="">— Не указано —</option>
                {events.map(e => (
                  <option key={e.id} value={e.id}>{e.name_ru}</option>
                ))}
              </select>
            </div>

            {/* Ссылка на PDF */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ссылка на PDF *
              </label>
              <input
                type="url"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Вставьте ссылку на PDF с Google Drive, Dropbox или другого хостинга
              </p>
            </div>

            {/* Превью */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Превью (обложка)
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoThumbnail}
                    onChange={(e) => setAutoThumbnail(e.target.checked)}
                    className="rounded"
                  />
                  Авто из Google Drive
                </label>
              </div>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => { setThumbnailUrl(e.target.value); setAutoThumbnail(false); }}
                  placeholder="https://... (URL картинки)"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                />
                {thumbnailUrl && (
                  <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={thumbnailUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Для Google Drive превью генерируется автоматически
              </p>
            </div>

            {/* Описание */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание (опционально)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Краткое описание содержимого..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none"
              />
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Сохранение...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Добавить материал
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
