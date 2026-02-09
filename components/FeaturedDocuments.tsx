'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Calendar, Loader2 } from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

// Маппинг названий парш на ID
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
  'Nitzavim': 51, 'Vayeilech': 52, "Ha'azinu": 53, 'Vezot Habracha': 54,
  'Teruma': 19, 'Trumah': 19
};

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

export default function FeaturedDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentParshaId, setCurrentParshaId] = useState<number | null>(null);

  // Получаем текущую паршу
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
            if (id) setCurrentParshaId(id);
          }
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
    fetchCurrentParsha();
  }, []);

  // Загружаем документы после определения текущей парши
  useEffect(() => {
    async function fetchDocs() {
      try {
        // Сначала загружаем документы по текущей главе
        let currentParshaDocsPromise = currentParshaId 
          ? fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&parsha_id=eq.' + currentParshaId + '&order=gregorian_date.desc&limit=8&select=id,title,pdf_url,gregorian_date,publication_id,thumbnail_url,parsha_id', {
              headers: { 'apikey': SUPABASE_KEY }
            }).then(r => r.json())
          : Promise.resolve([]);

        // Также загружаем последние документы с превью
        let recentDocsPromise = fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&thumbnail_url=not.is.null&order=gregorian_date.desc&limit=16&select=id,title,pdf_url,gregorian_date,publication_id,thumbnail_url,parsha_id', {
          headers: { 'apikey': SUPABASE_KEY }
        }).then(r => r.json());

        const [currentParshaItems, recentDocs] = await Promise.all([currentParshaDocsPromise, recentDocsPromise]);

        // Объединяем: сначала по текущей главе, потом остальные (без дубликатов)
        const seenIds = new Set<string>();
        const combined: any[] = [];

        // Сначала документы по текущей главе
        for (const doc of currentParshaItems || []) {
          if (!seenIds.has(doc.id)) {
            seenIds.add(doc.id);
            combined.push(doc);
          }
        }

        // Потом остальные с превью
        for (const doc of recentDocs || []) {
          if (!seenIds.has(doc.id) && combined.length < 8) {
            seenIds.add(doc.id);
            combined.push(doc);
          }
        }

        setDocuments(combined.slice(0, 8));
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    // Ждём определения парши или таймаут
    const timer = setTimeout(() => {
      fetchDocs();
    }, currentParshaId ? 0 : 500);

    if (currentParshaId) {
      fetchDocs();
      return () => clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [currentParshaId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin text-primary-600" size={24} />
      </div>
    );
  }

  if (documents.length === 0) {
    return <div className="text-center py-8 text-gray-500 text-sm">Документы не найдены</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {documents.map((doc) => (
        <article key={doc.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
          <Link href={'/document/' + doc.id}>
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer relative">
              {doc.thumbnail_url ? (
                <img 
                  src={doc.thumbnail_url} 
                  alt={doc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText size={32} className="text-gray-300" />
                </div>
              )}
              {doc.parsha_id === currentParshaId && (
                <div className="absolute top-2 left-2 bg-primary-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                  Эта неделя
                </div>
              )}
            </div>
          </Link>

          <div className="p-3">
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1 group-hover:text-primary-700">
              <Link href={'/document/' + doc.id}>{doc.title}</Link>
            </h3>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{formatDate(doc.gregorian_date)}</span>
              {doc.publication_id && (
                <Link href={'/publication/' + doc.publication_id} className="text-primary-600 hover:underline">
                  Все →
                </Link>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
