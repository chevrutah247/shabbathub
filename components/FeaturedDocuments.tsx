'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const languageLabels: Record<string, string> = {
  ru: 'Русский',
  he: 'עברית',
  en: 'English',
};

const languageCodes: Record<string, string> = {
  ru: 'RU',
  he: 'HE',
  en: 'EN',
};

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
    console.log('FeaturedDocuments: useEffect started');
    
    async function fetchDocuments() {
      console.log('FeaturedDocuments: fetchDocuments called');
      try {
        console.log('FeaturedDocuments: calling supabase...');
        const { data, error } = await supabase
          .from('issues')
          .select('id, title, description, pdf_url, page_count, gregorian_date, publication:publication_id(title_ru, primary_language), parsha:parsha_id(name_ru)')
          .eq('is_active', true)
          .order('gregorian_date', { ascending: false })
          .limit(6);

        console.log('FeaturedDocuments: supabase response', { data, error });

        if (error) {
          console.error('FeaturedDocuments: Error fetching documents:', error);
          setError(error.message);
          return;
        }
        console.log('FeaturedDocuments: setting documents', data?.length);
        setDocuments(data || []);
      } catch (err) {
        console.error('FeaturedDocuments: Catch error:', err);
        setError(String(err));
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
        <span className="ml-2">Загрузка...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Ошибка: {error}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Документы не найдены
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => {
        const pub = doc.publication;
        const lang = pub?.primary_language || 'ru';
        const parshaName = doc.parsha?.name_ru;
        
        return (
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

              <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold flex items-center gap-1.5">
                <span className="text-primary-600">{languageCodes[lang] || 'RU'}</span>
                <span className="text-gray-600">{languageLabels[lang] || 'Русский'}</span>
              </div>
            </div>

            <div className="p-5">
              {parshaName && (
                <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium mb-3">
                  📖 {parshaName}
                </span>
              )}

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
        );
      })}
    </div>
  );
}
