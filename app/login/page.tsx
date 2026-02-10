'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-primary-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Email"
            disabled={loading}
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Пароль"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-primary-700 transition"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <a href="/" className="text-gray-500 hover:text-primary-600 transition">← На главную</a>
        </div>
      </div>
    </div>
  );
}
