'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';

export default function LoginPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [resetSent, setResetSent] = useState(false);
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const redirectTo = useMemo(() => {
    const redirect = searchParams.get('redirect');
    return redirect && redirect.startsWith('/') ? redirect : '/admin';
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 429 || payload?.code === 'TEMP_BLOCKED') {
            const minutes = Math.ceil((payload?.retryAfterSec || 600) / 60);
            const msg = lang === 'ru'
              ? `Слишком много попыток. Попробуйте через ${minutes} мин.`
              : lang === 'he'
                ? `יותר מדי ניסיונות. נסו שוב בעוד ${minutes} דק'`
                : `Too many attempts. Try again in ${minutes} min.`;
            throw new Error(msg);
          }
          throw new Error(payload?.error || 'Login failed');
        }
        const accessToken = payload?.session?.access_token;
        const refreshToken = payload?.session?.refresh_token;
        if (!accessToken || !refreshToken) {
          throw new Error('Login failed');
        }
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) throw error;
        router.replace(redirectTo);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://www.shabbathub.com/reset-password',
    }).then(({ error }) => {
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        setResetSent(true);
      }
    });
  };

  return (
    <div className="min-h-screen bg-primary-700 flex items-center justify-center p-4" dir={dir}>
      <div className="w-full max-w-md bg-white rounded-2xl p-8">

        {mode === 'login' ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">{t('auth.login', lang)}</h1>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg" placeholder={t('auth.email', lang)} disabled={loading} />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg" placeholder={t('auth.password', lang)} disabled={loading} />
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-primary-600 text-white rounded-lg disabled:bg-gray-400 font-medium">
                {loading ? t('auth.signingIn', lang) : t('auth.signIn', lang)}
              </button>
            </form>
            <div className="mt-4 text-center">
              <button onClick={() => { setMode('reset'); setError(''); }}
                className="text-primary-600 hover:underline text-sm font-medium">
                {t('auth.forgotPassword', lang)}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">{t('auth.resetPassword', lang)}</h1>
            <p className="text-gray-500 text-sm text-center mb-6">{t('auth.resetDesc', lang)}</p>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            {resetSent ? (
              <div className="text-center">
                <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg font-medium">{t('auth.linkSent', lang)}</div>
                <button onClick={() => { setMode('login'); setResetSent(false); }}
                  className="text-primary-600 hover:underline text-sm">{t('auth.backToLogin', lang)}</button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg" placeholder={t('auth.email', lang)} disabled={loading} />
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg disabled:bg-gray-400 font-medium">
                  {loading ? t('auth.sending', lang) : t('auth.sendLink', lang)}
                </button>
              </form>
            )}
            {!resetSent && (
              <div className="mt-4 text-center">
                <button onClick={() => { setMode('login'); setError(''); }}
                  className="text-gray-500 hover:underline text-sm">{t('auth.backToLogin', lang)}</button>
              </div>
            )}
          </>
        )}

        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-600 hover:underline text-sm font-medium">{t('auth.register', lang)}</a><br/><a href="/" className="text-gray-400 text-sm">{t('auth.backHome', lang)}</a>
        </div>
      </div>
    </div>
  );
}
