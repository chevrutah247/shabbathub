'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, FileText, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

const PAGE_SIZE = 50;

interface Document {
  id: string;
  title: string;
  pdf_url: string;
  gregorian_date: string;
  publication_id: string;
  thumbnail_url: string;
  parsha_id: number;
  event_id: string;
  issue_number: string;
}

interface Parsha {
  id: number;
  name_ru: string;
  name_en: string;
  order_num: number;
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
  'Nitzavim': 51, 'Vayeilech': 52, "Ha'azinu": 53, 'Vezot Habracha': 54,
};

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function DocumentCard({ doc, currentParshaId, parshaMap }: { doc: Document; currentParshaId: number | null; parshaMap: Record<number, string> }) {
  const [imgError, setImgError] = useState(false);
  const parshaName = doc.parsha_id ? parshaMap[doc.parsha_id] : null;

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
      <Link href={'/document/' + doc.id}>
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
          {doc.thumbnail_url && !imgError ? (
            <img
              src={doc.thumbnail_url}
              alt={doc.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <FileText size={32} className="text-gray-300" />
            </div>
          )}

          {doc.parsha_id === currentParshaId && (
            <div className="absolute top-2 left-2 bg-primary-600 text-white text-[10px] px-2 py-1 rounded-full font-medium">
              Эта неделя
            </div>
          )}

          {doc.issue_number && (
            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full font-medium">
              {'№' + doc.issue_number}
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
          <Link href={'/document/' + doc.id}>
            {doc.title}
          </Link>
        </h3>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {parshaName && (
            <span className="text-[11px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">
              {parshaName}
            </span>
          )}
          {doc.gregorian_date && (
            <span className="text-xs text-gray-400">{formatDate(doc.gregorian_date)}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CatalogPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [parshiot, setParshiot] = useState<Parsha[]>([]);
  const [parshaMap, setParshaMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentParshaId, setCurrentParshaId] = useState<number | null>(null);
  const [selectedParsha, setSelectedParsha] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCurrentParsha() {
      try {
        const today = new Date();
        const res = await fetch(
          'https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=' + today.getFullYear() + '&month=' + (today.getMonth() + 1) + '&ss=off&mf=off&c=off&s=on'
        );
        if (res.ok) {
          const data = await res.json();
          const parashat = data.items?.find((item: any) => {
            if (item.category !== 'parashat') return false;
            const itemDate = new Date(item.date);
            itemDate.setHours(0, 0, 0, 0);
            const t = new Date();
            t.setHours(0, 0, 0, 0);
            return itemDate >= t;
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

  useEffect(() => {
    fetch(SUPABASE_URL + '/rest/v1/parshiot?order=order_num&select=id,name_ru,name_en,order_num', {
      headers: { 'apikey': SUPABASE_KEY }
    })
      .then(r => r.json())
      .then(data => {
        if (!data) return;
        // Build lookup map
        const map: Record<number, string> = {};
        data.forEach((p: Parsha) => { map[p.id] = p.name_ru; });
        setParshaMap(map);

        if (currentParshaId) {
          const sorted = [...data].sort((a: Parsha, b: Parsha) => {
            if (a.id === currentParshaId) return -1;
            if (b.id === currentParshaId) return 1;
            return a.order_num - b.order_num;
          });
          setParshiot(sorted);
        } else {
          setParshiot(data);
        }
      });
  }, [currentParshaId]);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);

    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let url = SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&order=gregorian_date.desc';

    if (searchQuery) {
      url += '&title=ilike.*' + encodeURIComponent(searchQuery) + '*';
    }

    if (selectedParsha) {
      url += '&parsha_id=eq.' + selectedParsha;
    }

    try {
      const res = await fetch(url + '&select=id,title,pdf_url,gregorian_date,publication_id,thumbnail_url,parsha_id,event_id,issue_number', {
        headers: {
          'apikey': SUPABASE_KEY,
          'Range': from + '-' + to,
          'Prefer': 'count=exact'
        }
      });

      const data = await res.json();
      const contentRange = res.headers.get('content-range');
      const total = contentRange ? parseInt(contentRange.split('/')[1]) : 0;

      setDocuments(data || []);
      setTotalCount(total);
    } catch (err) {
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedParsha]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(0);
  };

  const handleParshaChange = (value: string) => {
    setSelectedParsha(value ? Number(value) : null);
    setPage(0);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-900 mb-2">Каталог материалов</h1>
          <p className="text-gray-600">Газеты, недельные главы Торы и материалы к Шаббату</p>
        </div>

        {/* Фильтры */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-3">
            <form onSubmit={handleSearch} className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
              />
            </form>
            <select
              value={selectedParsha || ''}
              onChange={(e) => handleParshaChange(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white min-w-[180px]"
            >
              <option value="">Все главы</option>
              {parshiot.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name_ru}{p.id === currentParshaId ? ' ★' : ''}
                </option>
              ))}
            </select>
            {(searchQuery || selectedParsha) && (
              <button
                onClick={() => { setSearchQuery(''); setSearchInput(''); setSelectedParsha(null); setPage(0); }}
                className="px-4 py-2.5 text-gray-600 hover:text-primary-600 transition-colors"
              >
                Сбросить
              </button>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            Найдено: <span className="font-medium text-gray-900">{totalCount.toLocaleString()}</span> материалов
          </p>
          {totalPages > 1 && (
            <p className="text-gray-500 text-sm">
              Страница {page + 1} из {totalPages}
            </p>
          )}
        </div>

        {/* Сетка документов */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-600" size={32} />
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p>По вашему запросу ничего не найдено</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} currentParshaId={currentParshaId} parshaMap={parshaMap} />
              ))}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button onClick={() => setPage(0)} disabled={page === 0} className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  В начало
                </button>
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) { pageNum = i; }
                    else if (page < 3) { pageNum = i; }
                    else if (page > totalPages - 4) { pageNum = totalPages - 5 + i; }
                    else { pageNum = page - 2 + i; }
                    return (
                      <button key={pageNum} onClick={() => setPage(pageNum)}
                        className={'w-10 h-10 rounded-lg border ' + (page === pageNum ? 'bg-primary-600 text-white border-primary-600' : 'bg-white hover:bg-gray-50')}>
                        {pageNum + 1}
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronRight size={20} />
                </button>
                <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  В конец
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
