'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/language-context';

const txt: Record<string, Record<string, string>> = {
  title: { ru: 'Новый пароль', en: 'New Password', he: 'סיסמה חדשה', uk: 'Новий пароль' },
  desc: { ru: 'Введите новый пароль', en: 'Enter your new password', he: 'הכנס סיסמה חדשה', uk: 'Введіть новий пароль' },
  password: { ru: 'Новый пароль', en: 'New password', he: 'סיסמה חדשה', uk: 'Новий пароль' },
  confirm: { ru: 'Повторите пароль', en: 'Confirm password', he: 'אשר סיסמה', uk: 'Повторіть пароль' },
  save: { ru: 'Сохранить', en: 'Save', he: 'שמור', uk: 'Зберегти' },
  saving: { ru: 'Сохранение...', en: 'Saving...', he: '...שומר', uk: 'Збереження...' },
  success: { ru: '✓ Пароль изменён!', en: '✓ Password changed!', he: '!✓ הסיסמה שונתה', uk: '✓ Пароль змінено!' },
  goHome: { ru: 'Перейти на главную', en: 'Go to home', he: 'לדף הבית', uk: 'На головну' },
  mismatch: { ru: 'Пароли не совпадают', en: 'Passwords do not match', he: 'הסיסמאות לא תואמות', uk: 'Паролі не збігаються' },
  minLength: { ru: 'Минимум 6 символов', en: 'Minimum 6 characters', he: 'מינימום 6 תווים', uk: 'Мінімум 6 символів' },
};

export default function ResetPasswordPage() {
  const { lang } = useLanguage();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const t = (key: string) => txt[key]?.[lang] || txt[key]?.['ru'] || key;

  useEffect(() => {
    // Supabase автоматически обрабатывает токен из URL
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Пользователь перешёл по ссылке сброса
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { setError(t('minLength')); return; }
    if (password !== confirm) { setError(t('mismatch')); return; }

    setLoading(true);
    setError('');

    supabase.auth.updateUser({ password }).then(({ error }) => {
      setLoading(false);
      if (error) {
        setError(error.message);
      } else {
        setDone(true);
      }
    });
  };

  if (done) {
    return (
      <div className="min-h-screen bg-primary-700 flex items-center justify-center" dir={dir}>
        <div className="bg-white rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">{t('success')}</h1>
          <a href="/" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg">{t('goHome')}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-700 flex items-center justify-center p-4" dir={dir}>
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-2 text-center">{t('title')}</h1>
        <p className="text-gray-500 text-sm text-center mb-6">{t('desc')}</p>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg" placeholder={t('password')} disabled={loading} minLength={6} />
          <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg" placeholder={t('confirm')} disabled={loading} minLength={6} />
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg disabled:bg-gray-400 font-medium">
            {loading ? t('saving') : t('save')}
          </button>
        </form>
      </div>
    </div>
  );
}
