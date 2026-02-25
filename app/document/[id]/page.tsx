'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, Calendar, Loader2, ExternalLink, X, Maximize2, Bell, Printer, User } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';
import { trackEvent } from '@/lib/analytics';
import { useAuth } from '@/lib/auth-context';
import { secureDownloadIssue } from '@/lib/download-client';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

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
  uploaded_by: string;
}

interface UploaderProfile {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface RelatedIssue {
  id: string;
  title: string;
  thumbnail_url: string;
  gregorian_date: string;
  publication_id: string;
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
  const { session } = useAuth();
  const { lang } = useLanguage();
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
  const [relatedIssues, setRelatedIssues] = useState<RelatedIssue[]>([]);
  const [uploader, setUploader] = useState<UploaderProfile | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(SUPABASE_URL + '/rest/v1/issues?id=eq.' + id + '&select=*', {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) setError(t('doc.notFound', lang));
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
      .catch(() => setError(t('docExtra.loadError', lang)))
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
      fetch(SUPABASE_URL + '/rest/v1/publications?id=eq.' + issue.publication_id + '&select=title_ru,title_en,title_he', { headers: { 'apikey': SUPABASE_KEY } })
        .then(r => r.json()).then(d => { if (d[0]) setPubName(d[0].title_ru || d[0].title_en || d[0].title_he || ''); });
    }
    if (issue.uploaded_by) {
      fetch(SUPABASE_URL + '/rest/v1/profiles?id=eq.' + issue.uploaded_by + '&select=id,display_name,first_name,last_name,avatar_url', { headers: { 'apikey': SUPABASE_KEY } })
        .then(r => r.json()).then(d => { if (d[0]) setUploader(d[0]); });
    }
  }, [issue]);

  useEffect(() => {
    if (!issue) return;
    trackEvent('document_open', {
      document_id: issue.id,
      publication_id: issue.publication_id || '',
    });
  }, [issue]);

  useEffect(() => {
    if (!issue) return;
    const queries: Promise<any>[] = [];
    if (issue.publication_id) {
      queries.push(
        fetch(
          SUPABASE_URL +
            '/rest/v1/issues?is_active=eq.true&publication_id=eq.' +
            issue.publication_id +
            '&id=neq.' +
            issue.id +
            '&order=created_at.desc&limit=4&select=id,title,thumbnail_url,gregorian_date,publication_id',
          { headers: { apikey: SUPABASE_KEY } }
        ).then((r) => r.json())
      );
    }
    if (issue.parsha_id) {
      queries.push(
        fetch(
          SUPABASE_URL +
            '/rest/v1/issues?is_active=eq.true&parsha_id=eq.' +
            issue.parsha_id +
            '&id=neq.' +
            issue.id +
            '&order=created_at.desc&limit=4&select=id,title,thumbnail_url,gregorian_date,publication_id',
          { headers: { apikey: SUPABASE_KEY } }
        ).then((r) => r.json())
      );
    }

    Promise.all(queries)
      .then((lists) => {
        const map = new Map<string, RelatedIssue>();
        for (const list of lists) {
          if (!Array.isArray(list)) continue;
          for (const item of list) {
            if (!map.has(item.id)) map.set(item.id, item);
          }
        }
        setRelatedIssues(Array.from(map.values()).slice(0, 6));
      })
      .catch(() => setRelatedIssues([]));
  }, [issue]);

  if (loading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center"><Loader2 className="animate-spin text-primary-600" size={48} /></div>;
  }

  if (error || !issue) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <FileText size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-2">{error || t('doc.notFound', lang)}</h1>
          <Link href="/catalog" className="text-primary-600 hover:underline">{t('doc.backToCatalog', lang)}</Link>
        </div>
      </div>
    );
  }

  const viewerUrl = viewerMode === 'google'
    ? getGoogleDriveViewerUrl(issue.pdf_url)
    : issue.pdf_url;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: issue.title,
    description: issue.description || undefined,
    image: issue.thumbnail_url || undefined,
    datePublished: issue.gregorian_date || undefined,
    isPartOf: pubName
      ? {
          '@type': 'Periodical',
          name: pubName,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'ShabbatHub',
      url: 'https://shabbathub.com',
    },
    mainEntityOfPage: `https://shabbathub.com/document/${issue.id}`,
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <ArrowLeft size={20} /> {t('doc.backToCatalog', lang)}
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
                    {t('doc.embedded', lang)}
                  </button>
                  <button onClick={() => setViewerMode('google')}
                    className={'px-3 py-1 text-xs rounded-md ' + (viewerMode === 'google' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300')}>
                    {t('doc.googleViewer', lang)}
                  </button>
                </div>
                <button onClick={() => setFullscreen(true)} className="p-1.5 text-gray-500 hover:text-primary-600" title={t('docExtra.fullscreen', lang)}>
                  <Maximize2 size={18} />
                </button>
              </div>
              {/* Просмотрщик */}
              {viewerMode === 'embed' && !isGoogleDriveUrl(issue.pdf_url) ? (
                <object data={viewerUrl} type="application/pdf" className="w-full" style={{ height: '80vh' }}>
                  <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <FileText size={48} className="mb-4 text-gray-300" />
                    <p className="mb-3">{t('doc.cantDisplay', lang)}</p>
                    <button onClick={() => setViewerMode('google')} className="text-primary-600 hover:underline text-sm">
                      {t('doc.tryGoogle', lang)}
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
                  <div className="flex items-center gap-2"><FileText size={16} className="text-gray-400" />{issue.page_count} {t('doc.pages', lang)}</div>
                )}
                {uploader && (
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-500">{t('docExtra.uploadedBy', lang)}</span>
                    <Link href={'/uploader/' + uploader.id} className="text-primary-600 hover:underline font-medium">
                      {uploader.display_name || [uploader.first_name, uploader.last_name].filter(Boolean).join(' ') || t('docExtra.user', lang)}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
              <a href={issue.pdf_url} target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent('document_pdf_open', { document_id: issue.id })}
                className="flex items-center justify-center gap-2 w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition">
                <ExternalLink size={20} />{t('doc.openPdf', lang)}
              </a>
              <button
                type="button"
                disabled={downloading}
                onClick={async () => {
                  setDownloading(true);
                  trackEvent('document_download', { document_id: issue.id });
                  const result = await secureDownloadIssue({
                    issueId: issue.id,
                    title: issue.title,
                    accessToken: session?.access_token || null,
                  });
                  if (!result.ok) alert(result.message);
                  setDownloading(false);
                }}
                className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
                <Download size={20} />{downloading ? t('docExtra.downloading', lang) : t('actions.download', lang)}
              </button>
              <button
                onClick={() => {
                  const w = window.open(issue.pdf_url, '_blank');
                  if (w) { w.addEventListener('load', () => { try { w.print(); } catch {} }); }
                }}
                className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
                <Printer size={20} />{t('actions.print', lang)}
              </button>
              <div className="flex items-center justify-center pt-2">
                <ShareButtons url={`https://shabbathub.com/document/${id}`} title={issue.title} />
              </div>
            </div>

            {/* Подписка */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Link href={'/subscribe' + (issue.publication_id ? '?pub=' + issue.publication_id : '')}
                className="flex items-center justify-center gap-2 w-full bg-amber-500 text-white py-3 rounded-xl font-medium hover:bg-amber-600 transition">
                <Bell size={20} />{t('doc.subscribe', lang)}
              </Link>
            </div>
          </div>
        </div>

        {relatedIssues.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('docExtra.similarMaterials', lang)}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedIssues.map((doc) => (
                <Link
                  key={doc.id}
                  href={'/document/' + doc.id}
                  onClick={() => trackEvent('related_document_click', { from_document_id: issue.id, to_document_id: doc.id })}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                    {doc.thumbnail_url ? (
                      <img src={doc.thumbnail_url} alt={doc.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText size={22} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-medium text-gray-900 line-clamp-2">{doc.title}</p>
                    {doc.gregorian_date && <p className="text-[11px] text-gray-500 mt-1">{formatDate(doc.gregorian_date)}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
