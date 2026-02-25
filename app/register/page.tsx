'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { t } from '@/lib/translations';
import { Mail, Lock, User, UserPlus, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  
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
      setError(t('auth.emailNoPlus', lang));
      setLoading(false);
      return;
    }

    // Validate names (letters only, if provided)
    const nameRegex = /^[A-Za-zА-Яа-яЁё\u0590-\u05FF\s'-]*$/;
    if (firstName && !nameRegex.test(firstName)) {
      setError(t('auth.nameLettersOnly', lang));
      setLoading(false);
      return;
    }
    if (lastName && !nameRegex.test(lastName)) {
      setError(t('auth.surnameLettersOnly', lang));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('auth.passwordMin6', lang));
      setLoading(false);
      return;
    }

    const res = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        referrerId: searchParams.get('ref') || localStorage.getItem('pending_referrer_id'),
      }),
    });
    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(payload?.error || t('auth.registerError', lang));
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
            {t('auth.checkEmail', lang)}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('auth.confirmSent', lang)}<br />
            <strong>{email}</strong>
          </p>
          <Link href="/login" className="text-primary-600 hover:underline font-medium">
            {t('auth.goToLogin', lang)}
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
          {t('auth.backHome', lang)}
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-gray-800">
              {t('auth.register', lang)}
            </h1>
            <p className="text-gray-500 mt-2">
              {t('auth.registerDesc', lang)}
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
                  {t('auth.name', lang)}
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
                  {t('auth.surname', lang)}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.email', lang)} *</label>
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
                {t('auth.password', lang)} *
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
                {t('auth.minChars', lang)}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors mt-6"
            >
              {loading ? (
                <><span className="animate-spin">⏳</span> {t('auth.creating', lang)}</>
              ) : (
                <>
                  <UserPlus size={20} />
                  {t('auth.createAccount', lang)}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {t('auth.haveAccount', lang)}{' '}
            <Link href="/login" className="text-primary-600 hover:underline font-medium">
              {t('auth.signIn', lang)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
