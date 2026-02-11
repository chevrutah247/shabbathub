'use client';

import { useState, useEffect } from 'react';
import { Mail, Check, Loader2, Bell, Newspaper } from 'lucide-react';
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

type Lang = 'ru' | 'en' | 'he';

const labels: Record<Lang, {
  title: string;
  subtitle: string;
  email: string;
  selectPubs: string;
  news: string;
  newsDesc: string;
  submit: string;
  success: string;
  successDesc: string;
  allPubs: string;
}> = {
  ru: {
    title: 'Подписка на обновления',
    subtitle: 'Получайте новые материалы на почту',
    email: 'Ваш email',
    selectPubs: 'Выберите публикации',
    news: 'Новости проекта',
    newsDesc: 'Получать новости о ShabbatHub',
    submit: 'Подписаться',
    success: 'Вы подписаны!',
    successDesc: 'Вы будете получать уведомления о новых материалах.',
    allPubs: 'Все публикации',
  },
  en: {
    title: 'Subscribe to updates',
    subtitle: 'Get new materials by email',
    email: 'Your email',
    selectPubs: 'Select publications',
    news: 'Project news',
    newsDesc: 'Receive ShabbatHub news',
    submit: 'Subscribe',
    success: "You're subscribed!",
    successDesc: 'You will receive notifications about new materials.',
    allPubs: 'All publications',
  },
  he: {
    title: 'הרשמה לעדכונים',
    subtitle: 'קבלו חומרים חדשים למייל',
    email: 'האימייל שלכם',
    selectPubs: 'בחרו פרסומים',
    news: 'חדשות הפרויקט',
    newsDesc: 'לקבל חדשות על ShabbatHub',
    submit: 'להירשם',
    success: '!נרשמתם בהצלחה',
    successDesc: 'תקבלו התראות על חומרים חדשים.',
    allPubs: 'כל הפרסומים',
  },
};

interface SubscribeFormProps {
  lang?: Lang;
  compact?: boolean;
  onSuccess?: () => void;
}

export default function SubscribeForm({ lang = 'ru', compact = false, onSuccess }: SubscribeFormProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedPubs, setSelectedPubs] = useState<string[]>([]);
  const [subscribeNews, setSubscribeNews] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const t = labels[lang];
  const isRtl = lang === 'he';

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

  const getPubTitle = (pub: Publication): string => {
    if (lang === 'en' && pub.title_en) return pub.title_en;
    if (lang === 'he' && pub.title_he) return pub.title_he;
    return pub.title_ru || pub.title_en || '';
  };

  // Фильтруем публикации: сначала на языке пользователя, потом остальные
  const sortedPubs = [...publications].sort((a, b) => {
    const aMatch = a.primary_language === lang ? 0 : 1;
    const bMatch = b.primary_language === lang ? 0 : 1;
    return aMatch - bMatch;
  });

  const togglePub = (id: string) => {
    setSelectedPubs(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError(lang === 'ru' ? 'Укажите email' : 'Enter email'); return; }
    setError('');
    setSubmitting(true);

    try {
      // Проверяем существующую подписку
      const { data: existing } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        // Обновляем
        await supabase
          .from('subscriptions')
          .update({
            language: lang,
            subscribe_news: subscribeNews,
            publication_ids: selectedPubs,
            user_id: user?.id || null,
            is_active: true,
            updated_at: new Date().toISOString(),
          })
          .eq('email', email);
      } else {
        // Создаём
        await supabase
          .from('subscriptions')
          .insert({
            email,
            language: lang,
            subscribe_news: subscribeNews,
            publication_ids: selectedPubs,
            user_id: user?.id || null,
            is_active: true,
          });
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
      <div className="text-center py-6" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
          <Check className="text-green-600" size={28} />
        </div>
        <p className="text-lg font-bold text-gray-900">{t.success}</p>
        <p className="text-sm text-gray-500 mt-1">{t.successDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} dir={isRtl ? 'rtl' : 'ltr'} className="space-y-4">
      {!compact && (
        <div className="text-center mb-2">
          <Bell className="mx-auto text-primary-600 mb-2" size={28} />
          <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
          <p className="text-sm text-gray-500">{t.subtitle}</p>
        </div>
      )}

      {/* Email */}
      <div className="relative">
        <Mail className={'absolute top-1/2 -translate-y-1/2 text-gray-400 ' + (isRtl ? 'right-3' : 'left-3')} size={18} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.email}
          className={'w-full py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 outline-none ' + (isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4')}
          required
        />
      </div>

      {/* Публикации */}
      {!compact && sortedPubs.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">{t.selectPubs}</p>
          <div className="max-h-48 overflow-y-auto space-y-1.5 border rounded-lg p-3 bg-gray-50">
            {sortedPubs.map(pub => {
              const isLangMatch = pub.primary_language === lang;
              return (
                <label key={pub.id} className={'flex items-center gap-2.5 py-1.5 px-2 rounded-md cursor-pointer transition-colors ' + (selectedPubs.includes(pub.id) ? 'bg-primary-50' : 'hover:bg-white')}>
                  <input
                    type="checkbox"
                    checked={selectedPubs.includes(pub.id)}
                    onChange={() => togglePub(pub.id)}
                    className="rounded text-primary-600"
                  />
                  <Newspaper size={14} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-800">{getPubTitle(pub)}</span>
                  {isLangMatch && (
                    <span className="text-[10px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded-full ml-auto shrink-0">
                      {lang === 'ru' ? 'рус' : lang === 'en' ? 'eng' : 'עב'}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Новости */}
      <label className="flex items-center gap-3 py-2 cursor-pointer">
        <input
          type="checkbox"
          checked={subscribeNews}
          onChange={(e) => setSubscribeNews(e.target.checked)}
          className="rounded text-primary-600"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">{t.news}</p>
          <p className="text-xs text-gray-500">{t.newsDesc}</p>
        </div>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {submitting ? <Loader2 className="animate-spin" size={18} /> : <Mail size={18} />}
        {t.submit}
      </button>
    </form>
  );
}
