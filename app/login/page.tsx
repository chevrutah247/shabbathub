'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { useAuth } from '@/lib/auth-context';
import { Mail, Lock, LogIn, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(
        lang === 'ru' ? 'Неверный email или пароль' :
        lang === 'en' ? 'Invalid email or password' :
        'דוא"ל או סיסמה שגויים'
      );
      setLoading(false);
    } else {
      router.push('/');
    }
  };

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
              {lang === 'ru' ? 'Вход в аккаунт' : lang === 'en' ? 'Sign In' : 'התחברות'}
            </h1>
            <p className="text-gray-500 mt-2">
              {lang === 'ru' ? 'Войдите чтобы загружать материалы' : 
               lang === 'en' ? 'Sign in to upload materials' : 
               'התחבר כדי להעלות חומרים'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'ru' ? 'Пароль' : lang === 'en' ? 'Password' : 'סיסמה'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors"
            >
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <>
                  <LogIn size={20} />
                  {lang === 'ru' ? 'Войти' : lang === 'en' ? 'Sign In' : 'התחבר'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {lang === 'ru' ? 'Нет аккаунта?' : lang === 'en' ? "Don't have an account?" : 'אין לך חשבון?'}{' '}
            <Link href="/register" className="text-primary-600 hover:underline font-medium">
              {lang === 'ru' ? 'Зарегистрироваться' : lang === 'en' ? 'Sign Up' : 'הירשם'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
