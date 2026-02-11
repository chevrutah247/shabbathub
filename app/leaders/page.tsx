'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Trophy, Upload, ArrowLeft, Users } from 'lucide-react';

interface UploadLeader {
  id: string;
  display_name: string;
  upload_count: number;
  avatar_url: string | null;
}

interface ReferralLeader {
  referrer_id: string;
  display_name: string;
  referral_count: number;
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
  const [uploadLeaders, setUploadLeaders] = useState<UploadLeader[]>([]);
  const [referralLeaders, setReferralLeaders] = useState<ReferralLeader[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'uploads' | 'referrals'>('uploads');

  useEffect(() => {
    async function fetchData() {
      // Лидеры по загрузкам
      const { data: uploads } = await supabase
        .from('upload_leaderboard')
        .select('id, display_name, upload_count, avatar_url')
        .gt('upload_count', 0)
        .order('upload_count', { ascending: false });

      setUploadLeaders(uploads || []);

      // Лидеры по приглашениям
      const { data: referrals } = await supabase
        .from('referrals')
        .select('referrer_id');

      if (referrals && referrals.length > 0) {
        // Группируем по referrer_id
        const countMap: Record<string, number> = {};
        for (const r of referrals) {
          countMap[r.referrer_id] = (countMap[r.referrer_id] || 0) + 1;
        }

        // Получаем профили
        const referrerIds = Object.keys(countMap);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, display_name, email')
          .in('id', referrerIds);

        const profileMap: Record<string, string> = {};
        for (const p of profiles || []) {
          profileMap[p.id] = p.display_name || p.email?.split('@')[0] || 'Аноним';
        }

        const refLeaders: ReferralLeader[] = referrerIds
          .map(id => ({
            referrer_id: id,
            display_name: profileMap[id] || 'Аноним',
            referral_count: countMap[id],
          }))
          .sort((a, b) => b.referral_count - a.referral_count);

        setReferralLeaders(refLeaders);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
  };

  const totalUploads = uploadLeaders.reduce((sum, l) => sum + (l.upload_count || 0), 0);
  const totalReferrals = referralLeaders.reduce((sum, l) => sum + l.referral_count, 0);

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
        {/* Шапка */}
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
            <p className="text-gray-500">Лидеры нашего сообщества</p>
          </div>
        </div>

        {/* Табы */}
        <div className="flex gap-2 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('uploads')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'uploads'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            <Upload size={18} />
            По загрузкам
            <span className={`px-2 py-0.5 text-xs rounded-full ${activeTab === 'uploads' ? 'bg-white/20' : 'bg-gray-100'}`}>
              {totalUploads.toLocaleString()}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'referrals'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            <Users size={18} />
            По приглашениям
            <span className={`px-2 py-0.5 text-xs rounded-full ${activeTab === 'referrals' ? 'bg-white/20' : 'bg-gray-100'}`}>
              {totalReferrals}
            </span>
          </button>
        </div>

        {/* Контент по загрузкам */}
        {activeTab === 'uploads' && (
          <>
            {uploadLeaders.length === 0 ? (
              <div className="text-center py-16 text-gray-500">Пока нет загрузок</div>
            ) : (
              <>
                {/* Подиум топ-3 */}
                {uploadLeaders.length >= 3 && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {/* 2 место */}
                    <div className={`rounded-2xl border p-6 text-center mt-8 ${MEDAL_BG[1]}`}>
                      {uploadLeaders[1].avatar_url ? (
                        <img src={uploadLeaders[1].avatar_url} alt="" className="w-14 h-14 mx-auto rounded-full object-cover mb-3 border-2 border-gray-300" />
                      ) : (
                        <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[1]} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                          {getInitials(uploadLeaders[1].display_name)}
                        </div>
                      )}
                      <div className="text-2xl mb-1">🥈</div>
                      <p className="font-semibold text-gray-800 truncate">{uploadLeaders[1].display_name}</p>
                      <p className="text-2xl font-bold text-gray-600 mt-1">{uploadLeaders[1].upload_count.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">документов</p>
                    </div>

                    {/* 1 место */}
                    <div className={`rounded-2xl border p-6 text-center ${MEDAL_BG[0]} shadow-lg`}>
                      <div className="text-3xl mb-2">👑</div>
                      {uploadLeaders[0].avatar_url ? (
                        <img src={uploadLeaders[0].avatar_url} alt="" className="w-16 h-16 mx-auto rounded-full object-cover mb-3 border-2 border-yellow-400 shadow-md" />
                      ) : (
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[0]} flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md`}>
                          {getInitials(uploadLeaders[0].display_name)}
                        </div>
                      )}
                      <div className="text-2xl mb-1">🥇</div>
                      <p className="font-bold text-gray-900 truncate">{uploadLeaders[0].display_name}</p>
                      <p className="text-3xl font-bold text-gray-800 mt-1">{uploadLeaders[0].upload_count.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">документов</p>
                    </div>

                    {/* 3 место */}
                    <div className={`rounded-2xl border p-6 text-center mt-12 ${MEDAL_BG[2]}`}>
                      {uploadLeaders[2].avatar_url ? (
                        <img src={uploadLeaders[2].avatar_url} alt="" className="w-14 h-14 mx-auto rounded-full object-cover mb-3 border-2 border-amber-600" />
                      ) : (
                        <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[2]} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                          {getInitials(uploadLeaders[2].display_name)}
                        </div>
                      )}
                      <div className="text-2xl mb-1">🥉</div>
                      <p className="font-semibold text-gray-800 truncate">{uploadLeaders[2].display_name}</p>
                      <p className="text-2xl font-bold text-gray-600 mt-1">{uploadLeaders[2].upload_count.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">документов</p>
                    </div>
                  </div>
                )}

                {/* Таблица */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  <div className="px-6 py-4 border-b bg-gray-50">
                    <h2 className="font-semibold text-gray-700">Полный рейтинг по загрузкам</h2>
                  </div>
                  <div className="divide-y">
                    {uploadLeaders.map((leader, idx) => (
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
                          <p className={`font-medium truncate ${idx < 3 ? 'text-gray-900' : 'text-gray-700'}`}>{leader.display_name}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1.5">
                            <Upload size={14} className="text-gray-400" />
                            <span className={`font-bold ${idx < 3 ? 'text-xl text-gray-900' : 'text-lg text-gray-600'}`}>{leader.upload_count.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-gray-400">документов</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Контент по приглашениям */}
        {activeTab === 'referrals' && (
          <>
            {referralLeaders.length === 0 ? (
              <div className="text-center py-16">
                <Users className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 mb-2">Пока нет приглашений</p>
                <p className="text-sm text-gray-400">Поделитесь ссылкой на сайт — и ваши приглашения будут засчитаны!</p>
              </div>
            ) : (
              <>
                {/* Подиум приглашений */}
                {referralLeaders.length >= 3 && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className={`rounded-2xl border p-6 text-center mt-8 ${MEDAL_BG[1]}`}>
                      <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[1]} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                        {getInitials(referralLeaders[1].display_name)}
                      </div>
                      <div className="text-2xl mb-1">🥈</div>
                      <p className="font-semibold text-gray-800 truncate">{referralLeaders[1].display_name}</p>
                      <p className="text-2xl font-bold text-gray-600 mt-1">{referralLeaders[1].referral_count}</p>
                      <p className="text-xs text-gray-400">приглашений</p>
                    </div>
                    <div className={`rounded-2xl border p-6 text-center ${MEDAL_BG[0]} shadow-lg`}>
                      <div className="text-3xl mb-2">👑</div>
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[0]} flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md`}>
                        {getInitials(referralLeaders[0].display_name)}
                      </div>
                      <div className="text-2xl mb-1">🥇</div>
                      <p className="font-bold text-gray-900 truncate">{referralLeaders[0].display_name}</p>
                      <p className="text-3xl font-bold text-gray-800 mt-1">{referralLeaders[0].referral_count}</p>
                      <p className="text-xs text-gray-500">приглашений</p>
                    </div>
                    <div className={`rounded-2xl border p-6 text-center mt-12 ${MEDAL_BG[2]}`}>
                      <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${MEDAL_COLORS[2]} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                        {getInitials(referralLeaders[2].display_name)}
                      </div>
                      <div className="text-2xl mb-1">🥉</div>
                      <p className="font-semibold text-gray-800 truncate">{referralLeaders[2].display_name}</p>
                      <p className="text-2xl font-bold text-gray-600 mt-1">{referralLeaders[2].referral_count}</p>
                      <p className="text-xs text-gray-400">приглашений</p>
                    </div>
                  </div>
                )}

                {/* Таблица приглашений */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  <div className="px-6 py-4 border-b bg-gray-50">
                    <h2 className="font-semibold text-gray-700">Полный рейтинг по приглашениям</h2>
                  </div>
                  <div className="divide-y">
                    {referralLeaders.map((leader, idx) => (
                      <div key={leader.referrer_id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                        <div className="w-10 text-center">
                          {idx === 0 ? <span className="text-2xl">🥇</span> :
                           idx === 1 ? <span className="text-2xl">🥈</span> :
                           idx === 2 ? <span className="text-2xl">🥉</span> :
                           <span className="text-lg font-bold text-gray-400">{idx + 1}</span>}
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                          idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                          idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                          'bg-gradient-to-br from-primary-400 to-primary-600'
                        }`}>
                          {getInitials(leader.display_name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${idx < 3 ? 'text-gray-900' : 'text-gray-700'}`}>{leader.display_name}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1.5">
                            <Users size={14} className="text-gray-400" />
                            <span className={`font-bold ${idx < 3 ? 'text-xl text-gray-900' : 'text-lg text-gray-600'}`}>{leader.referral_count}</span>
                          </div>
                          <p className="text-xs text-gray-400">приглашений</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
