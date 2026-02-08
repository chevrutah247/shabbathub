'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  Loader2,
  ExternalLink,
} from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Issue {
  id: string;
  title: string;
  description: string;
  pdf_url: string;
  page_count: number;
  gregorian_date: string;
  view_count: number;
  download_count: number;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function DocumentPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadIssue() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/issues?id=eq.${id}&select=*`,
          {
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
          }
        );
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data = await res.json();
        if (data.length === 0) {
          setError('Документ не найден');
          return;
        }
        setIssue(data[0]);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadIssue();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <FileText size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            {error || 'Документ не найден'}
          </h1>
          <Link href="/catalog" className="text-primary-600 hover:underline">
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const googleDocsUrl = issue.pdf_url 
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(issue.pdf_url)}&embedded=true`
    : null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600"
          >
            <ArrowLeft size={20} />
            Назад в каталог
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* PDF Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {googleDocsUrl ? (
                <iframe
                  src={googleDocsUrl}
                  className="w-full"
                  style={{ height: '80vh' }}
                  frameBorder="0"
                />
              ) : (
                <div className="flex items-center justify-center h-96 bg-gray-100">
                  <p className="text-gray-500">PDF недоступен</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {issue.title}
              </h1>
              
              {issue.description && (
                <p className="text-gray-600 mb-4">{issue.description}</p>
              )}

              <div className="space-y-3 text-sm text-gray-600">
                {issue.gregorian_date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(issue.gregorian_date)}
                  </div>
                )}
                {issue.page_count && (
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    {issue.page_count} страниц
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
              {issue.pdf_url && (
                <>
                  
                    href={issue.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition"
                  >
                    <ExternalLink size={20} />
                    Открыть PDF
                  </a>
                  
                    href={issue.pdf_url}
                    download
                    className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                  >
                    <Download size={20} />
                    Скачать
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
