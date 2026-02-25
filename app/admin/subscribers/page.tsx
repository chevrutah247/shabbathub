'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Edit2, Mail, Search, X, Check, Loader2, Send, Globe, Bell, BookOpen } from 'lucide-react';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Subscription {
  id: string;
  email: string;
  language: string;
  subscribe_news: boolean;
  publication_ids: string[];
  is_active: boolean;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

interface Publication {
  id: string;
  title_ru: string;
  title_en: string;
}

export default function AdminSubscribers() {
  const { lang } = useLanguage();
  const [subscribers, setSubscribers] = useState<Subscription[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [pubMap, setPubMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [sending, setSending] = useState<string | null>(null);

  // Form
  const [formEmail, setFormEmail] = useState('');
  const [formLang, setFormLang] = useState('ru');
  const [formNews, setFormNews] = useState(true);
  const [formPubs, setFormPubs] = useState<string[]>([]);
  const [formActive, setFormActive] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSubscribers();
    fetchPublications();
  }, []);

  async function fetchSubscribers() {
    setLoading(true);
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });
    setSubscribers(data || []);
    setLoading(false);
  }

  async function fetchPublications() {
    const res = await fetch(SUPABASE_URL + '/rest/v1/publications?is_active=eq.true&select=id,title_ru,title_en&order=title_ru', {
      headers: { 'apikey': SUPABASE_KEY }
    });
    const data = await res.json();
    setPublications(data || []);
    const map: Record<string, string> = {};
    (data || []).forEach((p: Publication) => { map[p.id] = p.title_ru || p.title_en; });
    setPubMap(map);
  }

  function resetForm() {
    setFormEmail('');
    setFormLang('ru');
    setFormNews(true);
    setFormPubs([]);
    setFormActive(true);
    setShowAddForm(false);
    setEditingSub(null);
  }

  function startEdit(sub: Subscription) {
    setEditingSub(sub);
    setFormEmail(sub.email);
    setFormLang(sub.language || 'ru');
    setFormNews(sub.subscribe_news);
    setFormPubs(sub.publication_ids || []);
    setFormActive(sub.is_active);
    setShowAddForm(true);
  }

  function startAdd() {
    resetForm();
    setShowAddForm(true);
  }

  async function handleSave() {
    if (!formEmail) return;
    setSaving(true);

    const payload = {
      email: formEmail,
      language: formLang,
      subscribe_news: formNews,
      publication_ids: formPubs,
      is_active: formActive,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingSub) {
        await supabase.from('subscriptions').update(payload).eq('id', editingSub.id);
      } else {
        const { data: existing } = await supabase.from('subscriptions').select('id').eq('email', formEmail).maybeSingle();
        if (existing) {
          await supabase.from('subscriptions').update(payload).eq('email', formEmail);
        } else {
          await supabase.from('subscriptions').insert(payload);
        }
      }
      resetForm();
      fetchSubscribers();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm(t('admin.deleteSubscriber', lang))) return;
    await supabase.from('subscriptions').delete().eq('id', id);
    fetchSubscribers();
  }

  async function handleToggleActive(sub: Subscription) {
    await supabase.from('subscriptions').update({ is_active: !sub.is_active }).eq('id', sub.id);
    fetchSubscribers();
  }

  async function handleSendWelcome(sub: Subscription) {
    setSending(sub.id);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'confirmation', email: sub.email, lang: sub.language || 'ru' }),
      });
      const data = await res.json();
      if (data.success) {
        alert(t('admin.emailSentTo', lang) + ' ' + sub.email);
      } else {
        alert(t('admin.error', lang) + ' ' + (data.error || t('admin.sendError', lang)));
      }
    } catch (err) {
      alert(t('admin.sendErrorShort', lang));
    }
    setSending(null);
  }

  async function handleSendWelcomeAll() {
    if (!confirm(t('admin.sendWelcomeAll', lang))) return;
    const active = subscribers.filter(s => s.is_active);
    for (const sub of active) {
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'confirmation', email: sub.email, lang: sub.language || 'ru' }),
        });
      } catch {}
      await new Promise(r => setTimeout(r, 500));
    }
    alert(t('admin.sent', lang) + ' ' + active.length + ' ' + t('admin.emailsSent', lang));
  }

  function togglePub(id: string) {
    setFormPubs(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  }

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = subscribers.filter(s => s.is_active).length;

  const langLabels: Record<string, string> = {
    ru: '\u{1F1F7}\u{1F1FA} ' + t('langNames.ru', lang),
    en: '\u{1F1EC}\u{1F1E7} ' + t('langNames.en', lang),
    he: '\u{1F1EE}\u{1F1F1} ' + t('langNames.he', lang),
    uk: '\u{1F1FA}\u{1F1E6} ' + t('langNames.uk', lang),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.subscribers', lang)}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('admin.total', lang)}: {subscribers.length} · {t('admin.activeStatus', lang)}: {activeCount}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSendWelcomeAll}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm">
            <Send size={16} /> {t('admin.sendToAll', lang)}
          </button>
          <button onClick={startAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
            <Plus size={16} /> {t('admin.add', lang)}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder={t('admin.searchByEmail', lang)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
        />
      </div>

      {/* Add/Edit form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{editingSub ? t('admin.editSubscriber', lang) : t('admin.addSubscriber', lang)}</h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.email', lang)} *</label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                disabled={!!editingSub}
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.emailLang', lang)}</label>
              <select value={formLang} onChange={(e) => setFormLang(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none">
                <option value="ru">{'\u{1F1F7}\u{1F1FA}'} {t('langNames.ru', lang)}</option>
                <option value="en">{'\u{1F1EC}\u{1F1E7}'} {t('langNames.en', lang)}</option>
                <option value="he">{'\u{1F1EE}\u{1F1F1}'} {t('langNames.he', lang)}</option>
                <option value="uk">{'\u{1F1FA}\u{1F1E6}'} {t('langNames.uk', lang)}</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formNews} onChange={(e) => setFormNews(e.target.checked)} className="rounded text-primary-600" />
              <Bell size={16} className="text-amber-500" />
              <span className="text-sm">{t('admin.projectNews', lang)}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formActive} onChange={(e) => setFormActive(e.target.checked)} className="rounded text-green-600" />
              <span className="text-sm">{t('admin.isActive', lang)}</span>
            </label>
          </div>

          {/* Publications */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BookOpen size={16} className="inline text-primary-600 mr-1" />
              {t('admin.pubSubscriptions', lang)}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {publications.map(pub => (
                <label key={pub.id}
                  className={'flex items-center gap-2 p-2 rounded-lg cursor-pointer text-sm ' + (formPubs.includes(pub.id) ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50 border border-transparent hover:bg-gray-100')}>
                  <input type="checkbox" checked={formPubs.includes(pub.id)} onChange={() => togglePub(pub.id)} className="rounded text-primary-600" />
                  {pub.title_ru || pub.title_en}
                </label>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button type="button" onClick={() => setFormPubs(publications.map(p => p.id))} className="text-xs text-primary-600 hover:underline">{t('subscribe.selectAll', lang)}</button>
              <button type="button" onClick={() => setFormPubs([])} className="text-xs text-gray-500 hover:underline">{t('subscribe.deselectAll', lang)}</button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={handleSave} disabled={saving || !formEmail}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 text-sm">
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
              {editingSub ? t('admin.saveBtn', lang) : t('admin.add', lang)}
            </button>
            <button onClick={resetForm} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
              {t('admin.cancelBtn', lang)}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary-600" size={32} /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <p>{t('admin.noData', lang)}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('admin.email', lang)}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('admin.language', lang)}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('admin.news', lang)}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('admin.publications', lang)}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('admin.status', lang)}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('admin.date', lang)}</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">{t('admin.actionsCol', lang)}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((sub) => (
                  <tr key={sub.id} className={'hover:bg-gray-50 ' + (!sub.is_active ? 'opacity-50' : '')}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="font-medium">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs">{langLabels[sub.language] || sub.language || '\u2014'}</span>
                    </td>
                    <td className="px-4 py-3">
                      {sub.subscribe_news ? (
                        <span className="text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded-full">{t('admin.yes', lang)}</span>
                      ) : (
                        <span className="text-gray-400 text-xs">{t('admin.no', lang)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {sub.publication_ids?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {sub.publication_ids.slice(0, 3).map(pid => (
                            <span key={pid} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                              {pubMap[pid] || pid.substring(0, 8)}
                            </span>
                          ))}
                          {sub.publication_ids.length > 3 && (
                            <span className="text-xs text-gray-400">+{sub.publication_ids.length - 3}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">{'\u2014'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggleActive(sub)}
                        className={'text-xs px-2 py-0.5 rounded-full cursor-pointer ' + (sub.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600')}>
                        {sub.is_active ? t('admin.activeStatus', lang) : t('admin.hiddenStatus', lang)}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(sub.created_at).toLocaleDateString(lang === 'he' ? 'he-IL' : lang === 'en' ? 'en-US' : lang === 'uk' ? 'uk-UA' : 'ru-RU')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleSendWelcome(sub)} title={t('admin.sendWelcome', lang)}
                          className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                          {sending === sub.id ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                        </button>
                        <button onClick={() => startEdit(sub)} title={t('admin.edit', lang)}
                          className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(sub.id)} title={t('admin.delete', lang)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
