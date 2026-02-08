'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, FileText, Loader2, Heart, User } from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Document {
  id: string;
  title: string;
  pdf_url: string;
  gregorian_date: string;
  publication_id: string;
  thumbnail_url: string;
}

function formatYear(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width={12} height={12} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width={12} height={12} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width={12} height={12} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function CatalogPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&order=gregorian_date.desc&limit=200&select=id,title,pdf_url,gregorian_date,publication_id,thumbnail_url', {
      headers: { 'apikey': SUPABASE_KEY }
    })
      .then(res => res.json())
      .then(data => setDocuments(data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredDocs = documents.filter(doc => 
    !searchQuery || doc.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-primary-900 mb-1">ShabbatHub — крупнейший архив материалов к Шаббату</h1>
        <p className="text-gray-600 text-sm mb-4">Газеты, недельные главы Торы и печатные материалы</p>

        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
        </div>

        <p className="text-gray-500 text-xs mb-3">Найдено: {filteredDocs.length}</p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {filteredDocs.map((doc) => (
            <article key={doc.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Link href={'/document/' + doc.id}>
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer">
                    {doc.thumbnail_url ? (
                      <img src={doc.thumbnail_url} alt={doc.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText size={20} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                </Link>
                
                <div className="absolute left-1 top-1 flex flex-col gap-0.5">
                  <button className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px]">
                    <FacebookIcon />
                  </button>
                  <button className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <WhatsAppIcon />
                  </button>
                  <button className="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center">
                    <TelegramIcon />
                  </button>
                </div>

                <div className="absolute right-1 top-1 flex flex-col gap-0.5">
                  <button className="w-5 h-5 bg-white/90 text-gray-400 rounded-full flex items-center justify-center hover:text-red-500 shadow-sm">
                    <Heart size={10} />
                  </button>
                  <button className="w-5 h-5 bg-white/90 text-gray-400 rounded-full flex items-center justify-center hover:text-primary-600 shadow-sm">
                    <User size={10} />
                  </button>
                </div>
              </div>

              <div className="p-2">
                <h3 className="font-medium text-[11px] text-gray-900 line-clamp-2 leading-tight">
                  <Link href={'/document/' + doc.id} className="hover:text-primary-600">
                    {doc.title}
                  </Link>
                </h3>
                <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                  <span>{formatYear(doc.gregorian_date)}</span>
                  <span className="text-yellow-400">★★★★★</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
