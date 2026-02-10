'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FileText, Users, Eye, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDocs: 0,
    totalUsers: 0,
    totalViews: 0,
    recentDocs: [] as any[]
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchStats() {
      // Количество документов
      const { count: docsCount } = await supabase
        .from('issues')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Количество пользователей
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Общее количество просмотров
      const { data: viewsData } = await supabase
        .from('issues')
        .select('view_count')
        .eq('is_active', true);
      
      const totalViews = viewsData?.reduce((sum, doc) => sum + (doc.view_count || 0), 0) || 0;

      // Последние добавленные документы
      const { data: recentDocs } = await supabase
        .from('issues')
        .select('id, title, created_at, thumbnail_url')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalDocs: docsCount || 0,
        totalUsers: usersCount || 0,
        totalViews,
        recentDocs: recentDocs || []
      });
      setLoading(false);
    }

    fetchStats();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Обзор</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Документов</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDocs.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Пользователей</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Просмотров</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Активность</p>
              <p className="text-2xl font-bold text-gray-900">+{stats.recentDocs.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Последние добавленные</h2>
        </div>
        <div className="divide-y">
          {stats.recentDocs.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              {doc.thumbnail_url ? (
                <img 
                  src={doc.thumbnail_url} 
                  alt={doc.title}
                  className="w-12 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <FileText className="text-gray-400" size={20} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{doc.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(doc.created_at).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
