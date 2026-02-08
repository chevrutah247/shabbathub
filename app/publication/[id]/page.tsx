'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Calendar, Loader2, ExternalLink, Download, Globe, Mail, MessageCircle } from 'lucide-react';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Publication {
  id: string;
  title_ru: string;
  title_en: string;
  title_he: string;
  description_ru: string;
  primary_language: string;
  whatsapp_link: string;
  telegram_link: string;
  website_url: string;
  email: string;
  cover_image_url: string;
  total_issues: number;
}

interface Issue {
  id: string;
  title: string;
  pdf_url: string;
  page_count: number;
  gregorian_date: string;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PublicationPage() {
  const params = useParams();
  const id = params.id as string;
  const [publication, setPublication] = useState<Publication | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    
    Promise.all([
      fetch(SUPABASE_URL + '/rest/v1/publications?id=eq.' + id + '&select=*', {
        headers: { 'apikey': SUPABASE_KEY }
      }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/issues?publication_id=eq.' + id + '&is_active=eq.true&order=gregorian_date.desc&limit=50&select=id,title,pdf_url,page_count,gregorian_date', {
        headers: { 'apikey': SUPABASE_KEY }
      }).then(r => r.json())
    ])
      .then(([pubData, issuesData]) => {
        if (pubData.length === 0) {
          setError('Публикация не найдена');
          return;
        }
        setPublication(pubData[0]);
        setIssues(issuesData || []);
      })
      .catch(() => setError('Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <FileText size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-2">{error || 'Публикация не найдена'}</h1>
          <Link href="/catalog" className="text-primary-600 hover:underline">Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  const title = publication.title_ru || publication.title_en || 'Без названия';

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <ArrowLeft size={20} />
            Назад в каталог
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
              {publication.description_ru && (
                <p className="text-gray-600 mb-4">{publication.description_ru}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{publication.total_issues || issues.length} выпусков</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Все выпуски</h2>
            <div className="space-y-3">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText size={24} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{issue.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{formatDate(issue.gregorian_date)}</span>
                        {issue.page_count && <span>{issue.page_count} стр.</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={'/document/' + issue.id} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">
                      Открыть
                    </Link>
                    {issue.pdf_url && (
                      <a href={issue.pdf_url} download className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                        <Download size={18} className="text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {issues.length === 0 && (
                <p className="text-gray-500 text-center py-8">Выпуски не найдены</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Контакты</h2>
              <div className="space-y-3">
                {publication.telegram_link && (
                  <a href={publication.telegram_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                    <MessageCircle size={20} />
                    Telegram
                  </a>
                )}
                {publication.whatsapp_link && (
                  <a href={publication.whatsapp_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                )}
                {publication.website_url && (
                  <a href={publication.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                    <Globe size={20} />
                    Сайт
                  </a>
                )}
                {publication.email && (
                  <a href={'mailto:' + publication.email} className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                    <Mail size={20} />
                    {publication.email}
                  </a>
                )}
                {!publication.telegram_link && !publication.whatsapp_link && !publication.website_url && !publication.email && (
                  <p className="text-gray-400 text-sm">Контакты не указаны</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition">
                Подписаться на обновления
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
