'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Trophy, Upload, ArrowLeft } from 'lucide-react';

interface Leader {
  id: string;
  display_name: string;
  upload_count: number;
  avatar_url: string | null;
}

const MEDAL_COLORS = [
  'from-yellow-400 to-amber-500',
  'from-gray-300 to-gray-400',
  'from-amber-600 to-amber-700',
];

const MEDAL_BG = [
  'bg-yellow-50 border-yellow-200',
  'bg-gray-50 border-gray-200',
  'bg-amber-50 border-amber-200',
];

export default function LeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUploads, setTotalUploads] = useState(0);

  useEffect(() => {
    async function fetchLeaders() {
      const { data } = await supabase
        .from('upload_leaderboard')
        .select('id, display_name, upload_count, avatar_url')
        .gt('upload_count', 0)
        .order('upload_count', { ascending: false });

      const list = data || [];
      setLeaders(list);
      setTotalUploads(list.reduce((sum, l) => sum + (l.upload_count || 0), 0));
      setLoading(false);
    }
    fetchLeaders();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeft size={18} />
            На главную
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Trophy className="text-primary-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Доска почёта</h1>
            <p className="text-gray-500">Лидеры по загрузке материалов в архив</p>
            <p className="text-sm text-gray-400 mt-1">Всего загружено: {totalUploads.toLocaleString()} документов</p>
          </div>
        </div>

        {leaders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">Пока нет загрузок</div>
        ) : (
          <>
            {leaders.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* 2 место */}
                <div className={`rounded-2xl border p-6 text-center mt-8 ${MEDAL_BG[1]}`}>
                  {leaders[1].avatar_url ? (
                    <img src={leaders[1].avatar_url} alt="" className="w-14 h-14 mx-auto rounded-full object-cover mb-3 border-2 border-gray-300" />
                  ) : (
                    <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[1]} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                      {getInitials(leaders[1].display_name)}
                    </div>
                  )}
                  <div className="text-2xl mb-1">🥈</div>
                  <p className="font-semibold text-gray-800 truncate">{leaders[1].display_name}</p>
                  <p className="text-2xl font-bold text-gray-600 mt-1">{leaders[1].upload_count.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">документов</p>
                </div>

                {/* 1 место */}
                <div className={`rounded-2xl border p-6 text-center ${MEDAL_BG[0]} shadow-lg`}>
                  <div className="text-3xl mb-2">👑</div>
                  {leaders[0].avatar_url ? (
                    <img src={leaders[0].avatar_url} alt="" className="w-16 h-16 mx-auto rounded-full object-cover mb-3 border-2 border-yellow-400 shadow-md" />
                  ) : (
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[0]} flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md`}>
                      {getInitials(leaders[0].display_name)}
                    </div>
                  )}
                  <div className="text-2xl mb-1">🥇</div>
                  <p className="font-bold text-gray-900 truncate">{leaders[0].display_name}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{leaders[0].upload_count.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">документов</p>
                </div>

                {/* 3 место */}
                <div className={`rounded-2xl border p-6 text-center mt-12 ${MEDAL_BG[2]}`}>
                  {leaders[2].avatar_url ? (
                    <img src={leaders[2].avatar_url} alt="" className="w-14 h-14 mx-auto rounded-full object-cover mb-3 border-2 border-amber-600" />
                  ) : (
                    <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[2]} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                      {getInitials(leaders[2].display_name)}
                    </div>
                  )}
                  <div className="text-2xl mb-1">🥉</div>
                  <p className="font-semibold text-gray-800 truncate">{leaders[2].display_name}</p>
                  <p className="text-2xl font-bold text-gray-600 mt-1">{leaders[2].upload_count.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">документов</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="font-semibold text-gray-700">Полный рейтинг</h2>
              </div>
              <div className="divide-y">
                {leaders.map((leader, idx) => (
                  <div key={leader.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="w-10 text-center">
                      {idx === 0 ? <span className="text-2xl">🥇</span> :
                       idx === 1 ? <span className="text-2xl">🥈</span> :
                       idx === 2 ? <span className="text-2xl">🥉</span> :
                       <span className="text-lg font-bold text-gray-400">{idx + 1}</span>}
                    </div>

                    {leader.avatar_url ? (
                      <img src={leader.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                        idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                        idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                        'bg-gradient-to-br from-primary-400 to-primary-600'
                      }`}>
                        {getInitials(leader.display_name)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${idx < 3 ? 'text-gray-900' : 'text-gray-700'}`}>
                        {leader.display_name}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <Upload size={14} className="text-gray-400" />
                        <span className={`font-bold ${idx < 3 ? 'text-xl text-gray-900' : 'text-lg text-gray-600'}`}>
                          {leader.upload_count.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">документов</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
