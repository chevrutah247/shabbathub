'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, Calendar, Loader2, ExternalLink, X, Maximize2, Bell } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Issue {
  id: string;
  title: string;
  description: string;
  pdf_url: string;
  thumbnail_url: string;
  page_count: number;
  gregorian_date: string;
  parsha_id: number;
  event_id: string;
  issue_number: string;
  publication_id: string;
  view_count: number;
  download_count: number;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com') || url.includes('docs.google.com');
}

function getGoogleDriveViewerUrl(url: string): string {
  // Для Google Drive — используем встроенный просмотрщик
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return 'https://drive.google.com/file/d/' + match[1] + '/preview';
  }
  return 'https://docs.google.com/viewer?url=' + encodeURIComponent(url) + '&embedded=true';
}

function getDirectViewerUrl(url: string): string {
  // Для прямых ссылок (Supabase storage и др.)
  if (isGoogleDriveUrl(url)) return getGoogleDriveViewerUrl(url);
  // Прямой PDF embed
  return url;
}

export default function DocumentPage() {
  const params = useParams();
  const id = params.id as string;
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewerMode, setViewerMode] = useState<'embed' | 'google'>('embed');
  const [fullscreen, setFullscreen] = useState(false);
  const [parshaName, setParshaName] = useState('');
  const [eventName, setEventName] = useState('');
  const [pubName, setPubName] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(SUPABASE_URL + '/rest/v1/issues?id=eq.' + id + '&select=*', {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) setError('Документ не найден');
        else {
          const doc = data[0];
          setIssue(doc);
          if (isGoogleDriveUrl(doc.pdf_url)) setViewerMode('google');
          // Increment view count (fire and forget)
          fetch(SUPABASE_URL + '/rest/v1/issues?id=eq.' + id, {
            method: 'PATCH',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({ view_count: (doc.view_count || 0) + 1 })
          }).catch(() => {});
        }
      })
      .catch(() => setError('Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, [id]);

  // Загрузка названий парши, события, публикации
  useEffect(() => {
    if (!issue) return;
    if (issue.parsha_id) {
      fetch(SUPABASE_URL + '/rest/v1/parshiot?id=eq.' + issue.parsha_id + '&select=name_ru', { headers: { 'apikey': SUPABASE_KEY } })
        .then(r => r.json()).then(d => { if (d[0]) setParshaName(d[0].name_ru); });
    }
    if (issue.event_id) {
      fetch(SUPABASE_URL + '/rest/v1/events?id=eq.' + issue.event_id + '&select=name_ru', { headers: { 'apikey': SUPABASE_KEY } })
        .then(r => r.json()).then(d => { if (d[0]) setEventName(d[0].name_ru); });
    }
    if (issue.publication_id) {
      fetch(SUPABASE_URL + '/rest/v1/publications?id=eq.' + issue.publication_id + '&select=title_ru', { headers: { 'apikey': SUPABASE_KEY } })
        .then(r => r.json()).then(d => { if (d[0]) setPubName(d[0].title_ru); });
    }
  }, [issue]);

  if (loading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center"><Loader2 className="animate-spin text-primary-600" size={48} /></div>;
  }

  if (error || !issue) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <FileText size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-2">{error || 'Документ не найден'}</h1>
          <Link href="/catalog" className="text-primary-600 hover:underline">Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  const viewerUrl = viewerMode === 'google'
    ? getGoogleDriveViewerUrl(issue.pdf_url)
    : issue.pdf_url;

  // Полноэкранный режим
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-black">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button onClick={() => setFullscreen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white">
            <X size={24} />
          </button>
        </div>
        {viewerMode === 'embed' && !isGoogleDriveUrl(issue.pdf_url) ? (
          <object data={viewerUrl} type="application/pdf" className="w-full h-full">
            <iframe src={'https://docs.google.com/viewer?url=' + encodeURIComponent(issue.pdf_url) + '&embedded=true'} className="w-full h-full" />
          </object>
        ) : (
          <iframe src={viewerUrl} className="w-full h-full" allow="autoplay" />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <ArrowLeft size={20} /> Назад в каталог
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* PDF Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Панель управления */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
                <div className="flex gap-2">
                  <button onClick={() => setViewerMode('embed')}
                    className={'px-3 py-1 text-xs rounded-md ' + (viewerMode === 'embed' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300')}>
                    Встроенный
                  </button>
                  <button onClick={() => setViewerMode('google')}
                    className={'px-3 py-1 text-xs rounded-md ' + (viewerMode === 'google' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300')}>
                    Google Viewer
                  </button>
                </div>
                <button onClick={() => setFullscreen(true)} className="p-1.5 text-gray-500 hover:text-primary-600" title="На весь экран">
                  <Maximize2 size={18} />
                </button>
              </div>
              {/* Просмотрщик */}
              {viewerMode === 'embed' && !isGoogleDriveUrl(issue.pdf_url) ? (
                <object data={viewerUrl} type="application/pdf" className="w-full" style={{ height: '80vh' }}>
                  <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <FileText size={48} className="mb-4 text-gray-300" />
                    <p className="mb-3">Не удалось отобразить PDF</p>
                    <button onClick={() => setViewerMode('google')} className="text-primary-600 hover:underline text-sm">
                      Попробовать Google Viewer
                    </button>
                  </div>
                </object>
              ) : (
                <iframe src={viewerUrl} className="w-full" style={{ height: '80vh' }} frameBorder="0" allow="autoplay" />
              )}
            </div>
          </div>

          {/* Инфо-панель */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{issue.title}</h1>
              {issue.description && <p className="text-gray-600 mb-4">{issue.description}</p>}
              <div className="space-y-2.5 text-sm text-gray-600">
                {issue.gregorian_date && (
                  <div className="flex items-center gap-2"><Calendar size={16} className="text-gray-400" />{formatDate(issue.gregorian_date)}</div>
                )}
                {pubName && (
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" />
                    <Link href={'/publication/' + issue.publication_id} className="text-primary-600 hover:underline">{pubName}</Link>
                    {issue.issue_number && <span className="text-gray-400">№{issue.issue_number}</span>}
                  </div>
                )}
                {parshaName && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📖</span>
                    {parshaName}
                  </div>
                )}
                {eventName && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">🎉</span>
                    {eventName}
                  </div>
                )}
                {issue.page_count && (
                  <div className="flex items-center gap-2"><FileText size={16} className="text-gray-400" />{issue.page_count} страниц</div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
              <a href={issue.pdf_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition">
                <ExternalLink size={20} />Открыть PDF
              </a>
              <a href={issue.pdf_url} download
                onClick={() => {
                  // Increment download count (fire and forget)
                  fetch(SUPABASE_URL + '/rest/v1/issues?id=eq.' + id, {
                    method: 'PATCH',
                    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ download_count: (issue.download_count || 0) + 1 })
                  }).catch(() => {});
                }}
                className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
                <Download size={20} />Скачать
              </a>
              <div className="flex items-center justify-center pt-2">
                <ShareButtons url={`https://shabbathub.com/document/${id}`} title={issue.title} />
              </div>
            </div>

            {/* Подписка */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Link href={'/subscribe' + (issue.publication_id ? '?pub=' + issue.publication_id : '')}
                className="flex items-center justify-center gap-2 w-full bg-amber-500 text-white py-3 rounded-xl font-medium hover:bg-amber-600 transition">
                <Bell size={20} />Подписаться на обновления
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
