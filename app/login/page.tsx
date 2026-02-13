'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/language-context';

const txt: Record<string, Record<string, string>> = {
  title: { ru: 'Вход', en: 'Sign In', he: 'התחברות', uk: 'Вхід' },
  email: { ru: 'Email', en: 'Email', he: 'אימייל', uk: 'Email' },
  password: { ru: 'Пароль', en: 'Password', he: 'סיסמה', uk: 'Пароль' },
  login: { ru: 'Войти', en: 'Sign In', he: 'התחבר', uk: 'Увійти' },
  logging: { ru: 'Вход...', en: 'Signing in...', he: '...מתחבר', uk: 'Вхід...' },
  forgot: { ru: 'Забыли пароль?', en: 'Forgot password?', he: 'שכחת סיסמה?', uk: 'Забули пароль?' },
  back: { ru: '← На главную', en: '← Home', he: '← דף הבית', uk: '← На головну' },
  success: { ru: '✓ Вход выполнен!', en: '✓ Signed in!', he: '✓ !התחברת', uk: '✓ Вхід виконано!' },
  goHome: { ru: 'Перейти на главную', en: 'Go to home', he: 'לדף הבית', uk: 'На головну' },
  resetTitle: { ru: 'Сброс пароля', en: 'Reset Password', he: 'איפוס סיסמה', uk: 'Скидання пароля' },
  resetDesc: { ru: 'Введите email и мы отправим ссылку для сброса пароля', en: 'Enter your email and we\'ll send a reset link', he: 'הכנס את האימייל ונשלח לך קישור לאיפוס', uk: 'Введіть email і ми надішлемо посилання для скидання' },
  sendReset: { ru: 'Отправить ссылку', en: 'Send reset link', he: 'שלח קישור', uk: 'Надіслати посилання' },
  sending: { ru: 'Отправка...', en: 'Sending...', he: '...שולח', uk: 'Надсилання...' },
  resetSent: { ru: '✓ Ссылка отправлена! Проверьте почту.', en: '✓ Reset link sent! Check your email.', he: '✓ !הקישור נשלח! בדוק את האימייל', uk: '✓ Посилання надіслано! Перевірте пошту.' },
  backToLogin: { ru: '← Вернуться к входу', en: '← Back to login', he: '← חזרה להתחברות', uk: '← Повернутися до входу' },
};

export default function LoginPage() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [resetSent, setResetSent] = useState(false);
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const t = (key: string) => txt[key]?.[lang] || txt[key]?.['ru'] || key;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    supabase.auth.signInWithPassword({ email, password })
      .then(({ error }) => {
        setLoading(false);
        if (error) {
          setError(error.message);
        } else {
          setDone(true);
        }
      });
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://shabbathub.com/reset-password',
    }).then(({ error }) => {
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        setResetSent(true);
      }
    });
  };

  if (done) {
    return (
      <div className="min-h-screen bg-primary-700 flex items-center justify-center" dir={dir}>
        <div className="bg-white rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">{t('success')}</h1>
          <a href="/" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg">
            {t('goHome')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-700 flex items-center justify-center p-4" dir={dir}>
      <div className="w-full max-w-md bg-white rounded-2xl p-8">

        {mode === 'login' ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">{t('title')}</h1>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg" placeholder={t('email')} disabled={loading} />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg" placeholder={t('password')} disabled={loading} />
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-primary-600 text-white rounded-lg disabled:bg-gray-400 font-medium">
                {loading ? t('logging') : t('login')}
              </button>
            </form>
            <div className="mt-4 text-center">
              <button onClick={() => { setMode('reset'); setError(''); }}
                className="text-primary-600 hover:underline text-sm font-medium">
                {t('forgot')}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">{t('resetTitle')}</h1>
            <p className="text-gray-500 text-sm text-center mb-6">{t('resetDesc')}</p>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            {resetSent ? (
              <div className="text-center">
                <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg font-medium">{t('resetSent')}</div>
                <button onClick={() => { setMode('login'); setResetSent(false); }}
                  className="text-primary-600 hover:underline text-sm">{t('backToLogin')}</button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg" placeholder={t('email')} disabled={loading} />
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg disabled:bg-gray-400 font-medium">
                  {loading ? t('sending') : t('sendReset')}
                </button>
              </form>
            )}
            {!resetSent && (
              <div className="mt-4 text-center">
                <button onClick={() => { setMode('login'); setError(''); }}
                  className="text-gray-500 hover:underline text-sm">{t('backToLogin')}</button>
              </div>
            )}
          </>
        )}

        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-600 hover:underline text-sm font-medium">{'Регистрация / Register'}</a><br/><a href="/" className="text-gray-400 text-sm">{t('back')}</a>
        </div>
      </div>
    </div>
  );
}
