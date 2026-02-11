'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';

export default function SuggestGroupPage() {
  const [formData, setFormData] = useState({
    name: '', platform: 'whatsapp', link: '', description: '',
    language: 'russian', submitterEmail: '', adminContact: '', adminContactType: 'whatsapp'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [linkTested, setLinkTested] = useState(false);
  const [linkConfirmed, setLinkConfirmed] = useState(false);

  const handleTestLink = () => {
    if (formData.link) { window.open(formData.link, '_blank'); setLinkTested(true); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkConfirmed) { setError('Проверьте ссылку и подтвердите'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/suggest-group', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) setSubmitted(true);
      else setError(data.error || 'Ошибка');
    } catch { setError('Ошибка'); }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Спасибо!</h1>
          <p className="text-gray-600 mb-8">Ваше предложение отправлено на модерацию</p>
          <Link href="/torah-groups" className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700">
            <ArrowLeft size={20} /> К группам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/torah-groups" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={20} /> Назад
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">📚 Добавить группу</h1>
          <p className="text-gray-600 mb-6">Знаете хорошую группу? Поделитесь!</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">⚠️ {error}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Название *</label>
              <input type="text" required value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="например: Ежедневный Хитас"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Платформа *</label>
              <select value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
                <option value="facebook">Facebook</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ссылка *</label>
              <div className="flex gap-2">
                <input type="url" required value={formData.link}
                  onChange={e => { setFormData({...formData, link: e.target.value}); setLinkTested(false); setLinkConfirmed(false); setError(''); }}
                  placeholder="https://chat.whatsapp.com/..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl" />
                <button type="button" onClick={handleTestLink} disabled={!formData.link}
                  className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>

            {formData.link && (
              <div className={`p-4 rounded-xl border ${linkConfirmed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={linkConfirmed} onChange={e => setLinkConfirmed(e.target.checked)} className="mt-1 w-5 h-5" />
                  <span className="text-sm text-gray-700">
                    <strong>Я проверил ссылку</strong> — она работает
                    {!linkTested && <span className="block text-yellow-600 mt-1">👆 Сначала нажмите кнопку проверки</span>}
                  </span>
                </label>
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <label className="block text-sm font-medium text-blue-800 mb-2">👤 Контакт админа</label>
              <p className="text-xs text-blue-600 mb-3">Если группа заполнится, как связаться?</p>
              <div className="flex gap-2">
                <select value={formData.adminContactType} onChange={e => setFormData({...formData, adminContactType: e.target.value})}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option value="whatsapp">WhatsApp</option>
                  <option value="telegram">Telegram</option>
                  <option value="email">Email</option>
                </select>
                <input type="text" value={formData.adminContact}
                  onChange={e => setFormData({...formData, adminContact: e.target.value})}
                  placeholder={formData.adminContactType === 'email' ? 'email@example.com' : formData.adminContactType === 'telegram' ? '@username' : '+1234567890'}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Язык</label>
              <select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                <option value="russian">🇷🇺 Русский</option>
                <option value="hebrew">🇮🇱 Иврит</option>
                <option value="english">🇺🇸 English</option>
                <option value="yiddish">🕎 Идиш</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Какие темы? Как часто публикации?" rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ваш email</label>
              <input type="email" value={formData.submitterEmail}
                onChange={e => setFormData({...formData, submitterEmail: e.target.value})}
                placeholder="Уведомим когда одобрим"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            </div>

            <button type="submit" disabled={loading || !linkConfirmed}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${loading || !linkConfirmed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}>
              {loading ? 'Отправка...' : !linkConfirmed ? '☝️ Подтвердите ссылку' : '📚 Отправить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
