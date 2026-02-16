'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Loader2, Download, Globe, Mail, MessageCircle, Bell } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Publication {
  id: string; title_ru: string; title_en: string; title_he: string; description_ru: string;
  primary_language: string; whatsapp_link: string; telegram_link: string; website_url: string;
  email: string; cover_image_url: string; total_issues: number;
}
interface Issue {
  id: string; title: string; pdf_url: string; thumbnail_url: string;
  page_count: number; gregorian_date: string; issue_number: string; parsha_id: number;
}
interface Parsha { id: number; name_ru: string; }

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PublicationPage() {
  const params = useParams();
  const id = params.id as string;
  const [publication, setPublication] = useState<Publication | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [parshaMap, setParshaMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSubscribe, setShowSubscribe] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(SUPABASE_URL + '/rest/v1/publications?id=eq.' + id + '&select=*', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/issues?publication_id=eq.' + id + '&is_active=eq.true&order=gregorian_date.desc&limit=100&select=id,title,pdf_url,thumbnail_url,page_count,gregorian_date,issue_number,parsha_id', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/parshiot?select=id,name_ru', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()),
    ])
      .then(([pubData, issuesData, parshaData]) => {
        if (pubData.length === 0) { setError('Публикация не найдена'); return; }
        setPublication(pubData[0]);
        setIssues(issuesData || []);
        if (parshaData) {
          const map: Record<number, string> = {};
          parshaData.forEach((p: Parsha) => { map[p.id] = p.name_ru; });
          setParshaMap(map);
        }
      })
      .catch(() => setError('Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen bg-cream flex items-center justify-center"><Loader2 className="animate-spin text-primary-600" size={48} /></div>;

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
            <ArrowLeft size={20} /> Назад в каталог
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex items-start gap-5">
                {publication.cover_image_url && (
                  <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img src={publication.cover_image_url} alt={title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                  {publication.description_ru && <p className="text-gray-600 mb-3">{publication.description_ru}</p>}
                  <p className="text-sm text-gray-500">{issues.length} выпусков</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Все выпуски</h2>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                <button onClick={() => setViewMode('grid')}
                  className={'px-3 py-1.5 text-sm rounded-md transition ' + (viewMode === 'grid' ? 'bg-white shadow text-gray-900' : 'text-gray-500')}>Плитка</button>
                <button onClick={() => setViewMode('list')}
                  className={'px-3 py-1.5 text-sm rounded-md transition ' + (viewMode === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-500')}>Список</button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {issues.map((issue) => {
                  const pName = issue.parsha_id ? parshaMap[issue.parsha_id] : null;
                  return (
                    <Link key={issue.id} href={'/document/' + issue.id} className="group">
                      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                          {issue.thumbnail_url ? (
                            <img src={issue.thumbnail_url} alt={issue.title} loading="lazy" referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <FileText size={32} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-primary-600">{issue.title}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {issue.issue_number && <span className="text-xs text-gray-500">{'№' + issue.issue_number}</span>}
                            {pName && <span className="text-xs text-gray-400">{pName}</span>}
                          </div>
                          {issue.gregorian_date && <p className="text-[11px] text-gray-400 mt-0.5">{formatDate(issue.gregorian_date)}</p>}
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {issues.map((issue) => {
                  const pName = issue.parsha_id ? parshaMap[issue.parsha_id] : null;
                  return (
                    <div key={issue.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          {issue.thumbnail_url ? (
                            <img src={issue.thumbnail_url} alt={issue.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><FileText size={20} className="text-gray-300" /></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{issue.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            {issue.issue_number && <span>{'№' + issue.issue_number}</span>}
                            {pName && <span>{pName}</span>}
                            <span>{formatDate(issue.gregorian_date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={'/document/' + issue.id} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">Открыть</Link>
                        {issue.pdf_url && (
                          <a href={issue.pdf_url} download className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Download size={18} className="text-gray-600" /></a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {issues.length === 0 && <p className="text-gray-500 text-center py-8">Выпуски не найдены</p>}
          </div>

          {/* Сайдбар */}
          <div className="space-y-6">
            {/* Подписка с предвыбором публикации */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {showSubscribe ? (
                <SubscribeForm preSelectedPubId={id} compact onSuccess={() => setShowSubscribe(false)} />
              ) : (
                <div className="text-center">
                  <Bell className="mx-auto text-amber-500 mb-3" size={32} />
                  <p className="font-medium text-gray-900 mb-1">Получайте новые выпуски</p>
                  <p className="text-sm text-gray-500 mb-4">Уведомление на email при загрузке нового номера «{title}»</p>
                  <button onClick={() => setShowSubscribe(true)}
                    className="w-full bg-amber-500 text-white py-3 rounded-xl font-medium hover:bg-amber-600 transition flex items-center justify-center gap-2">
                    <Bell size={18} /> Подписаться
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Контакты</h2>
              <div className="space-y-3">
                {publication.telegram_link && (
                  <a href={publication.telegram_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                    <MessageCircle size={20} /> Telegram
                  </a>
                )}
                {publication.whatsapp_link && (
                  <a href={publication.whatsapp_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                    <MessageCircle size={20} /> WhatsApp
                  </a>
                )}
                {publication.website_url && (
                  <a href={publication.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                    <Globe size={20} /> Сайт
                  </a>
                )}
                {publication.email && (
                  <a href={'mailto:' + publication.email} className="flex items-center gap-3 text-gray-600 hover:text-primary-600">
                    <Mail size={20} /> {publication.email}
                  </a>
                )}
                {!publication.telegram_link && !publication.whatsapp_link && !publication.website_url && !publication.email && (
                  <p className="text-gray-400 text-sm">Контакты не указаны</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
