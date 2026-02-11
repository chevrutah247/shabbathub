'use client';

import { useState } from 'react';
import { Mail, Loader2, Check, Bell } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function SubscribeBlock() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    try {
      const { data: existing } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('subscriptions')
          .update({ is_active: true, updated_at: new Date().toISOString() })
          .eq('email', email);
      } else {
        await supabase
          .from('subscriptions')
          .insert({
            email,
            language: 'ru',
            subscribe_news: true,
            publication_ids: [],
            user_id: user?.id || null,
            is_active: true,
          });
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <Check className="mx-auto text-green-600 mb-3" size={32} />
        <p className="text-lg font-bold text-gray-900">Вы подписаны!</p>
        <p className="text-sm text-gray-500 mt-1">Настроить подписку можно на <Link href="/subscribe" className="text-primary-600 underline">странице подписки</Link></p>
      </div>
    );
  }

  return (
    <div className="bg-primary-900 rounded-2xl p-8 text-center text-white">
      <Bell className="mx-auto mb-3 text-gold-400" size={32} />
      <h3 className="text-xl font-bold mb-2">Подпишитесь на обновления</h3>
      <p className="text-blue-200 text-sm mb-6">Получайте новые материалы к Шаббату на почту</p>

      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-gold-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-gold-500 text-primary-900 px-5 py-2.5 rounded-lg font-medium hover:bg-gold-400 transition disabled:opacity-50 shrink-0"
        >
          {submitting ? <Loader2 className="animate-spin" size={18} /> : 'Подписаться'}
        </button>
      </form>

      <p className="text-blue-300 text-xs mt-3">
        <Link href="/subscribe" className="underline hover:text-white">Настроить подписку</Link> — выбрать публикации и язык
      </p>
    </div>
  );
}
