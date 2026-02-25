'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FileText, Users, Eye, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

const LOCALE_MAP: Record<string, string> = { ru: 'ru-RU', en: 'en-US', he: 'he-IL', uk: 'uk-UA' };

export default function AdminDashboard() {
  const { lang } = useLanguage();
  const [stats, setStats] = useState({
    totalDocs: 0,
    totalUsers: 0,
    totalViews: 0,
    missingIssueThumbs: 0,
    missingPubCovers: 0,
    downloadDenied24h: 0,
    downloadLimited24h: 0,
    recentDocs: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { count: docsCount } = await supabase.from('issues').select('*', { count: 'exact', head: true }).eq('is_active', true);
      const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { data: viewsData } = await supabase.from('issues').select('view_count').eq('is_active', true);
      const totalViews = viewsData?.reduce((sum, doc) => sum + (doc.view_count || 0), 0) || 0;
      const { data: recentDocs } = await supabase.from('issues').select('id, title, created_at, thumbnail_url').eq('is_active', true).order('created_at', { ascending: false }).limit(5);
      const { count: missingIssueThumbsNull } = await supabase.from('issues').select('*', { count: 'exact', head: true }).eq('is_active', true).is('thumbnail_url', null);
      const { count: missingIssueThumbsEmpty } = await supabase.from('issues').select('*', { count: 'exact', head: true }).eq('is_active', true).eq('thumbnail_url', '');
      const { count: missingPubCoversNull } = await supabase.from('publications').select('*', { count: 'exact', head: true }).eq('is_active', true).is('cover_image_url', null);
      const { count: missingPubCoversEmpty } = await supabase.from('publications').select('*', { count: 'exact', head: true }).eq('is_active', true).eq('cover_image_url', '');
      const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { count: deniedCount } = await supabase.from('download_events').select('*', { count: 'exact', head: true }).gte('created_at', since24h).eq('status', 'denied');
      const { count: limitedCount } = await supabase.from('download_events').select('*', { count: 'exact', head: true }).gte('created_at', since24h).eq('status', 'rate_limited');

      setStats({
        totalDocs: docsCount || 0,
        totalUsers: usersCount || 0,
        totalViews,
        missingIssueThumbs: (missingIssueThumbsNull || 0) + (missingIssueThumbsEmpty || 0),
        missingPubCovers: (missingPubCoversNull || 0) + (missingPubCoversEmpty || 0),
        downloadDenied24h: deniedCount || 0,
        downloadLimited24h: limitedCount || 0,
        recentDocs: recentDocs || [],
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('admin.overview', lang)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg"><FileText className="text-blue-600" size={24} /></div>
            <div><p className="text-sm text-gray-500">{t('admin.documentsCount', lang)}</p><p className="text-2xl font-bold">{stats.totalDocs.toLocaleString()}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg"><Users className="text-green-600" size={24} /></div>
            <div><p className="text-sm text-gray-500">{t('admin.usersCount', lang)}</p><p className="text-2xl font-bold">{stats.totalUsers}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg"><Eye className="text-purple-600" size={24} /></div>
            <div><p className="text-sm text-gray-500">{t('admin.viewsCount', lang)}</p><p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg"><TrendingUp className="text-amber-600" size={24} /></div>
            <div><p className="text-sm text-gray-500">{t('admin.newToday', lang)}</p><p className="text-2xl font-bold">+{stats.recentDocs.length}</p></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <p className="text-sm text-orange-700">{t('admin.noPreview', lang)}</p>
          <p className="text-2xl font-bold text-orange-900 mt-1">{stats.missingIssueThumbs}</p>
          <p className="text-xs text-orange-700 mt-2">{t('admin.fixPreviewHint', lang)}</p>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <p className="text-sm text-rose-700">{t('admin.noCover', lang)}</p>
          <p className="text-2xl font-bold text-rose-900 mt-1">{stats.missingPubCovers}</p>
          <p className="text-xs text-rose-700 mt-2">{t('admin.coverHint', lang)}</p>
        </div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-700">{t('admin.downloadProtection', lang)}</p>
            <p className="text-lg font-semibold text-slate-900 mt-1">
              Denied: {stats.downloadDenied24h} · Rate limited: {stats.downloadLimited24h}
            </p>
          </div>
          <Link href="/admin/security" className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
            {t('admin.openMonitoring', lang)}
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b"><h2 className="text-lg font-semibold">{t('admin.recentlyAdded', lang)}</h2></div>
        <div className="divide-y">
          {stats.recentDocs.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              {doc.thumbnail_url ? <img src={doc.thumbnail_url} alt="" className="w-12 h-16 object-cover rounded"/> : <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center"><FileText className="text-gray-400" size={20}/></div>}
              <div className="flex-1 min-w-0"><p className="font-medium truncate">{doc.title}</p><p className="text-sm text-gray-500">{new Date(doc.created_at).toLocaleDateString(LOCALE_MAP[lang] || 'en-US')}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
