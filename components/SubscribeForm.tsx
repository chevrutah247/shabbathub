'use client';

import { useState, useEffect } from 'react';
import { Mail, Check, Loader2, Bell, Newspaper, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Publication {
  id: string;
  title_ru: string;
  title_en: string;
  title_he: string;
  primary_language: string;
}

interface SubscribeFormProps {
  preSelectedPubId?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export default function SubscribeForm({ preSelectedPubId, compact = false, onSuccess }: SubscribeFormProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedPubs, setSelectedPubs] = useState<string[]>(preSelectedPubId ? [preSelectedPubId] : []);
  const [subscribeNews, setSubscribeNews] = useState(true);
  const [subscribePubs, setSubscribePubs] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  useEffect(() => {
    fetch(SUPABASE_URL + '/rest/v1/publications?is_active=eq.true&select=id,title_ru,title_en,title_he,primary_language&order=title_ru', {
      headers: { 'apikey': SUPABASE_KEY }
    })
      .then(r => r.json())
      .then(data => setPublications(data || []));
  }, []);

  useEffect(() => {
    if (preSelectedPubId && !selectedPubs.includes(preSelectedPubId)) {
      setSelectedPubs(prev => [...prev, preSelectedPubId]);
    }
  }, [preSelectedPubId]);

  const togglePub = (id: string) => {
    setSelectedPubs(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedPubs.length === publications.length) {
      setSelectedPubs([]);
    } else {
      setSelectedPubs(publications.map(p => p.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Укажите email'); return; }
    if (!subscribeNews && selectedPubs.length === 0) { setError('Выберите хотя бы одну подписку'); return; }
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        email,
        language: 'ru',
        subscribe_news: subscribeNews,
        publication_ids: subscribePubs ? selectedPubs : [],
        user_id: user?.id || null,
        is_active: true,
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        await supabase.from('subscriptions').update(payload).eq('email', email);
      } else {
        await supabase.from('subscriptions').insert(payload);
      }

      setSuccess(true);
      if (onSuccess) setTimeout(onSuccess, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
          <Check className="text-green-600" size={28} />
        </div>
        <p className="text-lg font-bold text-gray-900">Вы подписаны!</p>
        <p className="text-sm text-gray-500 mt-1">Уведомления придут на {email}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!compact && (
        <div className="text-center mb-2">
          <Bell className="mx-auto text-primary-600 mb-2" size={28} />
          <h3 className="text-lg font-bold text-gray-900">Подписка на обновления</h3>
          <p className="text-sm text-gray-500">Выберите что вас интересует</p>
        </div>
      )}

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
          required
        />
      </div>

      {/* === Подписка на новости === */}
      <div className="border rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={subscribeNews}
            onChange={(e) => setSubscribeNews(e.target.checked)}
            className="rounded text-primary-600 mt-0.5"
          />
          <div>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-amber-500" />
              <span className="font-medium text-gray-900">Новости проекта</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Обновления ShabbatHub, новые функции, важные объявления</p>
          </div>
        </label>
      </div>

      {/* === Подписка на публикации === */}
      <div className="border rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer mb-3">
          <input
            type="checkbox"
            checked={subscribePubs}
            onChange={(e) => setSubscribePubs(e.target.checked)}
            className="rounded text-primary-600 mt-0.5"
          />
          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-primary-600" />
              <span className="font-medium text-gray-900">Новые выпуски публикаций</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Письмо со ссылкой на скачивание при загрузке нового выпуска</p>
          </div>
        </label>

        {subscribePubs && (
          <>
            <div className="flex items-center justify-between mb-2 pl-8">
              <p className="text-xs text-gray-600">Выберите публикации:</p>
              <button type="button" onClick={selectAll} className="text-xs text-primary-600 hover:underline">
                {selectedPubs.length === publications.length ? 'Снять все' : 'Выбрать все'}
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 pl-8">
              {publications.map(pub => (
                <label key={pub.id} className={'flex items-center gap-2.5 py-1.5 px-2 rounded-md cursor-pointer transition-colors ' + (selectedPubs.includes(pub.id) ? 'bg-primary-50' : 'hover:bg-gray-50')}>
                  <input
                    type="checkbox"
                    checked={selectedPubs.includes(pub.id)}
                    onChange={() => togglePub(pub.id)}
                    className="rounded text-primary-600"
                  />
                  <Newspaper size={14} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-800">{pub.title_ru || pub.title_en}</span>
                </label>
              ))}
            </div>
            {selectedPubs.length > 0 && (
              <p className="text-xs text-primary-600 mt-2 pl-8">Выбрано: {selectedPubs.length} из {publications.length}</p>
            )}
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {submitting ? <Loader2 className="animate-spin" size={18} /> : <Mail size={18} />}
        Подписаться
      </button>
    </form>
  );
}
