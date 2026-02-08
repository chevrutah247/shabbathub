'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, FileText, Calendar, ExternalLink, ChevronDown, Loader2 } from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Document {
  id: string;
  title: string;
  description: string;
  pdf_url: string;
  page_count: number;
  gregorian_date: string;
  publication?: { title_ru: string; primary_language: string };
  parsha?: { name_ru: string };
}

const languageCodes: Record<string, string> = {
  ru: 'RU',
  he: 'HE',
  en: 'EN',
};

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function CatalogPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/issues?is_active=eq.true&order=gregorian_date.desc&limit=100&select=id,title,description,pdf_url,page_count,gregorian_date`,
          {
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setDocuments(data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  // Фильтрация
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = !searchQuery || 
      doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-primary-900 mb-8">
          Каталог материалов
        </h1>

        {/* Поиск */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
        </div>

        {/* Результаты */}
        <p className="text-gray-600 mb-6">Найдено: {filteredDocs.length} материалов</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <article
              key={doc.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[8.5/6] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto text-gray-400 mb-2" />
                    {doc.page_count && (
                      <span className="text-sm text-gray-500">{doc.page_count} стр.</span>
                    )}
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    href={doc.pdf_url || '#'}
                    target="_blank"
                    className="flex items-center gap-2 bg-white text-primary-700 px-4 py-2 rounded-full font-medium"
                  >
                    <ExternalLink size={18} />
                    Открыть PDF
                  </Link>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold">
                  <span className="text-primary-600">RU</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                  {doc.title}
                </h3>

                {doc.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {doc.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(doc.gregorian_date)}
                  </div>
                  <Link
                    href={'/document/' + doc.id}
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
