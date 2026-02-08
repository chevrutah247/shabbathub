'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Calendar, ExternalLink, Loader2 } from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function FeaturedDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocuments() {
      console.log('Fetching with direct fetch...');
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/issues?is_active=eq.true&order=gregorian_date.desc&limit=6&select=id,title,description,pdf_url,page_count,gregorian_date`,
          {
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
          }
        );
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Got data:', data.length, 'items');
        setDocuments(data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Ошибка: {error}</div>;
  }

  if (documents.length === 0) {
    return <div className="text-center py-12 text-gray-500">Документы не найдены</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <article key={doc.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="relative aspect-[8.5/6] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-2" />
                {doc.page_count && <span className="text-sm text-gray-500">{doc.page_count} стр.</span>}
              </div>
            </div>
            <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Link href={doc.pdf_url || '#'} target="_blank" className="flex items-center gap-2 bg-white text-primary-700 px-4 py-2 rounded-full font-medium">
                <ExternalLink size={18} />
                Открыть PDF
              </Link>
            </div>
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold">
              <span className="text-primary-600">RU</span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{doc.title}</h3>
            {doc.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(doc.gregorian_date)}
              </div>
              <Link href={'/document/' + doc.id} className="text-primary-600 hover:text-primary-800 font-medium">
                Подробнее →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
