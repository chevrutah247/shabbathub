'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Calendar, Loader2 } from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

export default function FeaturedDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&thumbnail_url=not.is.null&order=gregorian_date.desc&limit=8&select=id,title,pdf_url,gregorian_date,publication_id,thumbnail_url', {
      headers: { 'apikey': SUPABASE_KEY }
    })
      .then(res => res.json())
      .then(data => setDocuments(data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {documents.map((doc) => (
        <article key={doc.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
          <Link href={'/document/' + doc.id}>
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer">
              {doc.thumbnail_url ? (
                <img 
                  src={doc.thumbnail_url} 
                  alt={doc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText size={24} className="text-gray-300" />
                </div>
              )}
            </div>
          </Link>

          <div className="p-2">
            <h3 className="font-medium text-xs text-gray-900 line-clamp-2 mb-1 group-hover:text-primary-700">
              <Link href={'/document/' + doc.id}>{doc.title}</Link>
            </h3>
            <div className="flex items-center justify-between text-[10px] text-gray-500">
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
