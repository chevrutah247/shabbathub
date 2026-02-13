'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Globe, Bell, BellOff, BookOpen, FileText, Edit2, Save, X, LogOut, Shield, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

const LANGS: Record<string, string> = { ru: 'Русский', en: 'English', he: 'עברית', uk: 'Українська' };
const ROLES: Record<string, string> = { admin: 'Администратор', editor: 'Редактор', author: 'Автор', subscriber: 'Подписчик' };
const ROLE_COLORS: Record<string, string> = { admin: 'bg-red-100 text-red-700', editor: 'bg-blue-100 text-blue-700', author: 'bg-green-100 text-green-700', subscriber: 'bg-gray-100 text-gray-700' };

interface Subscription {
  id: string;
  publication_id: string;
  language: string;
  is_active: boolean;
  created_at: string;
  pub_title?: string;
}

interface UploadedDoc {
  id: string;
  title: string;
  created_at: string;
  thumbnail_url: string | null;
  view_count: number;
}

export default function ProfilePage() {
  const { user, profile, signOut } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [prefLang, setPrefLang] = useState('ru');
  const [emailNotif, setEmailNotif] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [uploads, setUploads] = useState<UploadedDoc[]>([]);
  const [activeTab, setActiveTab] = useState<'info' | 'subscriptions' | 'uploads'>('info');
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [loadingUploads, setLoadingUploads] = useState(true);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (profile) {
      setFirstName((profile as any).first_name || '');
      setLastName((profile as any).last_name || '');
      setPrefLang((profile as any).preferred_language || 'ru');
      setEmailNotif((profile as any).email_notifications !== false);
    }
  }, [user, profile, router]);

  // Fetch subscriptions
  useEffect(() => {
    if (!user) return;
    async function fetchSubs() {
      setLoadingSubs(true);
      // Get subscriptions by email
      const { data: subs } = await supabase
        .from('subscriptions')
        .select('id, publication_id, language, is_active, created_at')
        .eq('email', user!.email)
        .order('created_at', { ascending: false });

      if (subs && subs.length > 0) {
        // Get publication names
        const pubIds = Array.from(new Set(subs.map(s => s.publication_id).filter(Boolean)));
        let pubMap: Record<string, string> = {};
        if (pubIds.length > 0) {
          const { data: pubs } = await supabase
            .from('publications')
            .select('id, title_ru')
            .in('id', pubIds);
          pubs?.forEach(p => { pubMap[p.id] = p.title_ru; });
        }
        setSubscriptions(subs.map(s => ({ ...s, pub_title: pubMap[s.publication_id] || 'Все публикации' })));
      }
      setLoadingSubs(false);
    }
    fetchSubs();
  }, [user]);

  // Fetch user uploads
  useEffect(() => {
    if (!user) return;
    async function fetchUploads() {
      setLoadingUploads(true);
      const { data } = await supabase
        .from('issues')
        .select('id, title, created_at, thumbnail_url, view_count')
        .eq('uploaded_by', user!.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(50);
      setUploads(data || []);
      setLoadingUploads(false);
    }
    fetchUploads();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true); setSaveMsg('');
    const { error } = await supabase.from('profiles').update({
      first_name: firstName,
      last_name: lastName,
      display_name: [firstName, lastName].filter(Boolean).join(' '),
      preferred_language: prefLang,
      email_notifications: emailNotif,
    }).eq('id', user.id);

    if (error) { setSaveMsg('Ошибка сохранения'); }
    else { setSaveMsg('Сохранено!'); setEditing(false); }
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleUnsubscribe = async (subId: string) => {
    await supabase.from('subscriptions').update({ is_active: false }).eq('id', subId);
    setSubscriptions(prev => prev.map(s => s.id === subId ? { ...s, is_active: false } : s));
  };

  const handleResubscribe = async (subId: string) => {
    await supabase.from('subscriptions').update({ is_active: true }).eq('id', subId);
    setSubscriptions(prev => prev.map(s => s.id === subId ? { ...s, is_active: true } : s));
  };

  if (!user) return null;

  const p = profile as any;
  const role = p?.role || 'subscriber';
  const memberSince = p?.created_at ? new Date(p.created_at).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700">
                  {(p?.display_name || user.email || '?')[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{p?.display_name || 'Пользователь'}</h1>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${ROLE_COLORS[role] || ROLE_COLORS.subscriber}`}>
                    {ROLES[role] || 'Подписчик'}
                  </span>
                  {memberSince && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} /> С {memberSince}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => { signOut(); router.push('/'); }} className="text-gray-400 hover:text-red-500 transition-colors" title="Выйти">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1 mb-6">
          {[
            { id: 'info' as const, label: 'Профиль', icon: <User size={16} /> },
            { id: 'subscriptions' as const, label: 'Подписки', icon: <Bell size={16} />, count: subscriptions.filter(s => s.is_active).length },
            { id: 'uploads' as const, label: 'Загрузки', icon: <FileText size={16} />, count: uploads.length },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-primary-600 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}>
              {tab.icon} {tab.label} {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'}`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Личные данные</h2>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-sm text-primary-600 hover:underline">
                  <Edit2 size={14} /> Редактировать
                </button>
              ) : (
                <button onClick={() => setEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
              )}
            </div>
            {saveMsg && <p className={`mb-4 text-sm ${saveMsg.includes('Ошибка') ? 'text-red-600' : 'text-green-600'}`}>{saveMsg}</p>}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Имя</label>
                  {editing ? (
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:border-primary-500 outline-none" />
                  ) : (
                    <p className="text-gray-800 font-medium">{firstName || '—'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Фамилия</label>
                  {editing ? (
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:border-primary-500 outline-none" />
                  ) : (
                    <p className="text-gray-800 font-medium">{lastName || '—'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Email</label>
                <p className="text-gray-800 font-medium flex items-center gap-2"><Mail size={14} className="text-gray-400" />{user.email}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Предпочитаемый язык</label>
                {editing ? (
                  <select value={prefLang} onChange={e => setPrefLang(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:border-primary-500 outline-none bg-white">
                    {Object.entries(LANGS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium flex items-center gap-2"><Globe size={14} className="text-gray-400" />{LANGS[prefLang] || prefLang}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Email уведомления</label>
                {editing ? (
                  <button onClick={() => setEmailNotif(!emailNotif)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      emailNotif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                    {emailNotif ? <Bell size={16} /> : <BellOff size={16} />}
                    {emailNotif ? 'Включены' : 'Выключены'}
                  </button>
                ) : (
                  <p className="text-gray-800 font-medium flex items-center gap-2">
                    {emailNotif ? <Bell size={14} className="text-green-500" /> : <BellOff size={14} className="text-gray-400" />}
                    {emailNotif ? 'Включены' : 'Выключены'}
                  </p>
                )}
              </div>

              {editing && (
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Мои подписки</h2>
              <Link href="/subscribe" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                + Новая подписка
              </Link>
            </div>

            {loadingSubs ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-gray-400" size={24} /></div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-8">
                <Bell size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">У вас пока нет подписок</p>
                <Link href="/subscribe" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
                  Подписаться
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {subscriptions.map(sub => (
                  <div key={sub.id} className={`flex items-center justify-between p-4 rounded-xl border ${sub.is_active ? 'border-green-200 bg-green-50/50' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
                    <div className="flex items-center gap-3">
                      <BookOpen size={18} className={sub.is_active ? 'text-green-600' : 'text-gray-400'} />
                      <div>
                        <p className="font-medium text-gray-800">{sub.pub_title}</p>
                        <p className="text-xs text-gray-400">
                          Язык: {LANGS[sub.language] || sub.language} · {sub.is_active ? 'Активна' : 'Неактивна'}
                        </p>
                      </div>
                    </div>
                    {sub.is_active ? (
                      <button onClick={() => handleUnsubscribe(sub.id)} className="text-xs text-red-500 hover:underline">Отписаться</button>
                    ) : (
                      <button onClick={() => handleResubscribe(sub.id)} className="text-xs text-green-600 hover:underline">Возобновить</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'uploads' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Мои загрузки</h2>
              <Link href="/add-pdf" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                + Загрузить
              </Link>
            </div>

            {loadingUploads ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-gray-400" size={24} /></div>
            ) : uploads.length === 0 ? (
              <div className="text-center py-8">
                <FileText size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">Вы ещё ничего не загружали</p>
                <Link href="/add-pdf" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
                  Загрузить PDF
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {uploads.map(doc => (
                  <Link key={doc.id} href={'/document/' + doc.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50/50 transition-colors">
                    {doc.thumbnail_url ? (
                      <img src={doc.thumbnail_url} alt="" className="w-12 h-16 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center"><FileText size={18} className="text-gray-400" /></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{doc.title}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(doc.created_at).toLocaleDateString('ru-RU')} · {doc.view_count || 0} просмотров
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
