'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Edit2, Mail, Search, X, Check, Loader2, Send, Globe, Bell, BookOpen } from 'lucide-react';

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

const langLabels: Record<string, string> = { ru: '🇷🇺 RU', en: '🇬🇧 EN', he: '🇮🇱 HE', uk: '🇺🇦 UA' };

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscription[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [pubMap, setPubMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [sending, setSending] = useState<string | null>(null);

  // Форма
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
        // Проверим нет ли уже такого email
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
    if (!confirm('Удалить подписчика?')) return;
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
        alert('Письмо отправлено на ' + sub.email);
      } else {
        alert('Ошибка: ' + (data.error || 'Не удалось отправить'));
      }
    } catch (err) {
      alert('Ошибка отправки');
    }
    setSending(null);
  }

  async function handleSendWelcomeAll() {
    if (!confirm('Отправить приветственное письмо всем активным подписчикам?')) return;
    const active = subscribers.filter(s => s.is_active);
    for (const sub of active) {
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'confirmation', email: sub.email, lang: sub.language || 'ru' }),
        });
      } catch {}
      // Пауза между письмами
      await new Promise(r => setTimeout(r, 500));
    }
    alert('Отправлено ' + active.length + ' писем');
  }

  function togglePub(id: string) {
    setFormPubs(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  }

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = subscribers.filter(s => s.is_active).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Подписчики</h1>
          <p className="text-sm text-gray-500 mt-1">Всего: {subscribers.length} · Активных: {activeCount}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSendWelcomeAll}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm">
            <Send size={16} /> Письмо всем
          </button>
          <button onClick={startAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
            <Plus size={16} /> Добавить
          </button>
        </div>
      </div>

      {/* Поиск */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Поиск по email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
        />
      </div>

      {/* Форма добавления/редактирования */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{editingSub ? 'Редактировать подписчика' : 'Добавить подписчика'}</h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                disabled={!!editingSub}
              />
            </div>

            {/* Язык */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Язык писем</label>
              <select value={formLang} onChange={(e) => setFormLang(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none">
                <option value="ru">🇷🇺 Русский</option>
                <option value="en">🇬🇧 English</option>
                <option value="he">🇮🇱 עברית</option>
                <option value="uk">🇺🇦 Українська</option>
              </select>
            </div>
          </div>

          {/* Чекбоксы */}
          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formNews} onChange={(e) => setFormNews(e.target.checked)} className="rounded text-primary-600" />
              <Bell size={16} className="text-amber-500" />
              <span className="text-sm">Новости проекта</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formActive} onChange={(e) => setFormActive(e.target.checked)} className="rounded text-green-600" />
              <span className="text-sm">Активен</span>
            </label>
          </div>

          {/* Публикации */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BookOpen size={16} className="inline text-primary-600 mr-1" />
              Подписка на публикации
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
              <button type="button" onClick={() => setFormPubs(publications.map(p => p.id))} className="text-xs text-primary-600 hover:underline">Выбрать все</button>
              <button type="button" onClick={() => setFormPubs([])} className="text-xs text-gray-500 hover:underline">Снять все</button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={handleSave} disabled={saving || !formEmail}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 text-sm">
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
              {editingSub ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={resetForm} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Таблица */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary-600" size={32} /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <p>Подписчиков пока нет</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Язык</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Новости</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Публикации</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Статус</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Дата</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Действия</th>
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
                      <span className="text-xs">{langLabels[sub.language] || sub.language || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      {sub.subscribe_news ? (
                        <span className="text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded-full">Да</span>
                      ) : (
                        <span className="text-gray-400 text-xs">Нет</span>
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
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleToggleActive(sub)}
                        className={'text-xs px-2 py-0.5 rounded-full cursor-pointer ' + (sub.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600')}>
                        {sub.is_active ? 'Активен' : 'Отключен'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(sub.created_at).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleSendWelcome(sub)} title="Отправить приветственное письмо"
                          className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                          {sending === sub.id ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                        </button>
                        <button onClick={() => startEdit(sub)} title="Редактировать"
                          className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(sub.id)} title="Удалить"
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
