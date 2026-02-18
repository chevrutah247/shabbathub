'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Loader2, BookOpen, User, Download, Eye } from 'lucide-react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface UploaderProfile {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface UploadedDoc {
  id: string;
  title: string;
  thumbnail_url: string | null;
  gregorian_date: string | null;
  publication_id: string | null;
  view_count: number;
  download_count: number;
  created_at: string;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function DocCard({ doc, pubName }: { doc: UploadedDoc; pubName: string | null }) {
  const [imgError, setImgError] = useState(false);
  return (
    <article className="book-card group relative">
      <Link href={'/document/' + doc.id} className="block">
        <div className="book-cover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <div className="absolute inset-y-0 left-0 w-3 z-10" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)' }} />
          {doc.thumbnail_url && !imgError ? (
            <img src={doc.thumbnail_url} alt={doc.title} loading="lazy" referrerPolicy="no-referrer" onError={() => setImgError(true)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(145deg, #d4a574 0%, #b8854a 50%, #96693a 100%)' }}>
              <BookOpen size={28} className="text-amber-100/60 mb-2" />
              <span className="text-amber-100/50 text-[10px] text-center px-3 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{doc.title?.substring(0, 40)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors duration-300 z-10" />
        </div>
        <div className="mt-3 px-0.5">
          <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{doc.title}</h3>
          {pubName && <p className="text-[11px] text-stone-500 mt-1 line-clamp-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{pubName}</p>}
          <div className="flex items-center gap-3 mt-1">
            {doc.gregorian_date && <span className="text-[10px] text-stone-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>{formatDate(doc.gregorian_date)}</span>}
            <span className="text-[10px] text-stone-400 flex items-center gap-0.5"><Eye size={10} /> {doc.view_count || 0}</span>
            <span className="text-[10px] text-stone-400 flex items-center gap-0.5"><Download size={10} /> {doc.download_count || 0}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function UploaderPage() {
  const params = useParams();
  const uploaderId = params.id as string;
  const [profile, setProfile] = useState<UploaderProfile | null>(null);
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [pubMap, setPubMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uploaderId) return;

    Promise.all([
      fetch(SUPABASE_URL + '/rest/v1/profiles?id=eq.' + uploaderId + '&select=id,display_name,first_name,last_name,avatar_url,created_at', {
        headers: { 'apikey': SUPABASE_KEY }
      }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/issues?uploaded_by=eq.' + uploaderId + '&is_active=eq.true&order=created_at.desc&select=id,title,thumbnail_url,gregorian_date,publication_id,view_count,download_count,created_at', {
        headers: { 'apikey': SUPABASE_KEY }
      }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/publications?select=id,title_ru,title_en,title_he', {
        headers: { 'apikey': SUPABASE_KEY }
      }).then(r => r.json()),
    ])
      .then(([profileData, docs, pubs]) => {
        if (!profileData || profileData.length === 0) {
          setError('Пользователь не найден');
          return;
        }
        setProfile(profileData[0]);
        setDocuments(Array.isArray(docs) ? docs : []);
        const map: Record<string, string> = {};
        if (Array.isArray(pubs)) {
          pubs.forEach((p: any) => { map[p.id] = p.title_ru || p.title_en || p.title_he || ''; });
        }
        setPubMap(map);
      })
      .catch(() => setError('Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, [uploaderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5efe6' }}>
        <Loader2 className="animate-spin text-amber-700" size={48} />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5efe6' }}>
        <div className="text-center">
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-2">{error || 'Пользователь не найден'}</h1>
          <Link href="/catalog" className="text-primary-600 hover:underline">Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  const displayName = profile.display_name || [profile.first_name, profile.last_name].filter(Boolean).join(' ') || 'Пользователь';
  const initials = [(profile.first_name || '')[0], (profile.last_name || '')[0]].filter(Boolean).join('').toUpperCase() || displayName[0]?.toUpperCase() || '?';
  const totalViews = documents.reduce((sum, d) => sum + (d.view_count || 0), 0);
  const totalDownloads = documents.reduce((sum, d) => sum + (d.download_count || 0), 0);
  const memberSince = profile.created_at ? new Date(profile.created_at).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' }) : '';

  return (
    <div className="min-h-screen" style={{ background: '#f5efe6' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .book-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .book-card:hover { transform: translateY(-4px); }
        .book-cover { box-shadow: 3px 3px 8px rgba(120,80,40,0.15), 6px 6px 20px rgba(120,80,40,0.08), inset 0 0 0 1px rgba(120,80,40,0.08); border-radius: 2px 6px 6px 2px; transition: box-shadow 0.35s ease; }
        .book-card:hover .book-cover { box-shadow: 4px 4px 12px rgba(120,80,40,0.2), 8px 8px 30px rgba(120,80,40,0.12), inset 0 0 0 1px rgba(120,80,40,0.1); }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <ArrowLeft size={20} /> Назад в каталог
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-6">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={displayName} className="w-20 h-20 rounded-full object-cover border-2 border-amber-200" />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1e3a6e, #2c5f8a)' }}>
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{initials}</span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{displayName}</h1>
              {memberSince && <p className="text-sm text-gray-500 mt-1">На ShabbatHub с {memberSince}</p>}
            </div>
          </div>
          <div className="flex gap-8 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: '#1e3a6e', fontFamily: "'Playfair Display', serif" }}>{documents.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Загрузок</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: '#1e3a6e', fontFamily: "'Playfair Display', serif" }}>{totalViews.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-0.5">Просмотров</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold" style={{ color: '#1e3a6e', fontFamily: "'Playfair Display', serif" }}>{totalDownloads.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-0.5">Скачиваний</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Материалы ({documents.length})
        </h2>

        {documents.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={56} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Пока нет загруженных материалов</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
              {documents.map((doc) => (
                <DocCard key={doc.id} doc={doc} pubName={doc.publication_id ? pubMap[doc.publication_id] : null} />
              ))}
            </div>
            {/* Wooden shelf */}
            <div className="mt-6 h-3 rounded-full mx-auto" style={{ background: 'linear-gradient(180deg, #b8854a 0%, #96693a 60%, #7a5530 100%)', boxShadow: '0 4px 12px rgba(120,80,40,0.2), inset 0 1px 0 rgba(255,255,255,0.15)', maxWidth: '95%' }} />
          </>
        )}
      </div>
    </div>
  );
}
