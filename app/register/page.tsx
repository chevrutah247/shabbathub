'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { Mail, Lock, User, UserPlus, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const { lang } = useLanguage();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Block + in email (anti-alias spam)
    if (email.includes('+')) {
      setError(
        lang === 'ru' ? 'Email не может содержать символ +' :
        lang === 'en' ? 'Email cannot contain the + symbol' :
        'אימייל לא יכול להכיל את הסימן +'
      );
      setLoading(false);
      return;
    }

    // Validate names (letters only, if provided)
    const nameRegex = /^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s'-]*$/;
    if (firstName && !nameRegex.test(firstName)) {
      setError(
        lang === 'ru' ? 'Имя может содержать только буквы' :
        lang === 'en' ? 'Name can only contain letters' :
        'שם יכול להכיל רק אותיות'
      );
      setLoading(false);
      return;
    }
    if (lastName && !nameRegex.test(lastName)) {
      setError(
        lang === 'ru' ? 'Фамилия может содержать только буквы' :
        lang === 'en' ? 'Last name can only contain letters' :
        'שם משפחה יכול להכיל רק אותיות'
      );
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(
        lang === 'ru' ? 'Пароль должен быть не менее 6 символов' :
        lang === 'en' ? 'Password must be at least 6 characters' :
        'הסיסמה חייבת להכיל לפחות 6 תווים'
      );
      setLoading(false);
      return;
    }

    const res = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(
        payload?.error || (
          lang === 'ru' ? 'Ошибка регистрации. Попробуйте позже.' :
          lang === 'en' ? 'Registration error. Please try again later.' :
          'שגיאת הרשמה. נסה שוב מאוחר יותר.'
        )
      );
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-600 to-primary-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {lang === 'ru' ? 'Проверьте почту!' : lang === 'en' ? 'Check your email!' : 'בדוק את הדוא"ל שלך!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {lang === 'ru' ? 'Мы отправили ссылку для подтверждения на' : 
             lang === 'en' ? 'We sent a confirmation link to' : 
             'שלחנו קישור אימות אל'}<br />
            <strong>{email}</strong>
          </p>
          <Link href="/login" className="text-primary-600 hover:underline font-medium">
            {lang === 'ru' ? 'Перейти к входу' : lang === 'en' ? 'Go to Login' : 'עבור להתחברות'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
        >
          <ArrowLeft size={20} />
          {lang === 'ru' ? 'На главную' : lang === 'en' ? 'Back to Home' : 'חזרה לדף הבית'}
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-gray-800">
              {lang === 'ru' ? 'Регистрация' : lang === 'en' ? 'Sign Up' : 'הרשמה'}
            </h1>
            <p className="text-gray-500 mt-2">
              {lang === 'ru' ? 'Создайте аккаунт для загрузки материалов' : 
               lang === 'en' ? 'Create an account to upload materials' : 
               'צור חשבון כדי להעלות חומרים'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'ru' ? 'Имя' : lang === 'en' ? 'First Name' : 'שם פרטי'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'ru' ? 'Фамилия' : lang === 'en' ? 'Last Name' : 'שם משפחה'}
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'ru' ? 'Пароль' : lang === 'en' ? 'Password' : 'סיסמה'} *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'ru' ? 'Минимум 6 символов' : lang === 'en' ? 'Minimum 6 characters' : 'מינימום 6 תווים'}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors mt-6"
            >
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <>
                  <UserPlus size={20} />
                  {lang === 'ru' ? 'Создать аккаунт' : lang === 'en' ? 'Create Account' : 'צור חשבון'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {lang === 'ru' ? 'Уже есть аккаунт?' : lang === 'en' ? 'Already have an account?' : 'כבר יש לך חשבון?'}{' '}
            <Link href="/login" className="text-primary-600 hover:underline font-medium">
              {lang === 'ru' ? 'Войти' : lang === 'en' ? 'Sign In' : 'התחבר'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
