'use client';

import { useState } from 'react';
import { Mail, Bell, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

export default function SubscribeBlock() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleQuickSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const payload = {
        email,
        language: lang,
        subscribe_news: true,
        publication_ids: [],
        user_id: user?.id || null,
        is_active: true,
        updated_at: new Date().toISOString(),
      };
      const { data: existing } = await supabase.from('subscriptions').select('id').eq('email', email).maybeSingle();
      if (existing) {
        await supabase.from('subscriptions').update(payload).eq('email', email);
      } else {
        await supabase.from('subscriptions').insert(payload);
      }
      setSuccess(true);
    } catch {}
    finally { setSubmitting(false); }
  };

  const dir = lang === 'he' ? 'rtl' : 'ltr';

  if (success) {
    return (
      <div className="bg-primary-900 rounded-2xl p-8 text-center text-white" dir={dir}>
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/20 rounded-full mb-3">
          <Check className="text-green-400" size={28} />
        </div>
        <p className="text-lg font-bold">{t('subscribe.success', lang)}</p>
        <p className="text-sm text-blue-200 mt-1">{t('subscribe.successDesc', lang)} {email}</p>
        <Link href="/subscribe" className="inline-block mt-4 text-sm text-gold-400 hover:underline">
          {t('subscribe.quickSettings', lang)}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-primary-900 rounded-2xl p-8 text-center" dir={dir}>
      <Bell className="mx-auto text-gold-400 mb-3" size={32} />
      <h3 className="text-xl font-bold text-white mb-2">{t('subscribe.quickTitle', lang)}</h3>
      <p className="text-blue-200 text-sm mb-6">{t('subscribe.quickDesc', lang)}</p>

      <form onSubmit={handleQuickSubscribe} className="flex gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className={'absolute top-1/2 -translate-y-1/2 text-gray-400 ' + (lang === 'he' ? 'right-3' : 'left-3')} size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('subscribe.email', lang)}
            className={'w-full py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:border-gold-400 outline-none ' + (lang === 'he' ? 'pr-10 pl-4' : 'pl-10 pr-4')}
            required
          />
        </div>
        <button type="submit" disabled={submitting}
          className="px-5 py-2.5 bg-gold-500 text-primary-900 rounded-lg font-medium hover:bg-gold-400 transition disabled:opacity-50 flex items-center gap-2 shrink-0">
          {submitting ? <Loader2 className="animate-spin" size={18} /> : null}
          {t('subscribe.quickBtn', lang)}
        </button>
      </form>

      <Link href="/subscribe" className="inline-block mt-4 text-sm text-gold-400 hover:underline">
        {t('subscribe.quickSettings', lang)}
      </Link>
    </div>
  );
}
