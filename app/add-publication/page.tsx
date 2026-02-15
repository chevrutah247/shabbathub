'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Library, Loader2, Check, AlertCircle, Globe, Mail, MessageCircle } from 'lucide-react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default function AddPublicationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [titleHe, setTitleHe] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('ru');
  const [frequency, setFrequency] = useState('weekly');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [rabbiName, setRabbiName] = useState('');
  const [rabbiWebsite, setRabbiWebsite] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!titleRu && !titleEn && !titleHe) {
      setError('Введите название публикации хотя бы на одном языке');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/publications', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          title_ru: titleRu || null,
          title_en: titleEn || null,
          title_he: titleHe || null,
          description_ru: descriptionRu || null,
          primary_language: primaryLanguage,
          frequency: frequency,
          website_url: websiteUrl || null,
          email: email || null,
          telegram_link: telegramLink || null,
          whatsapp_link: whatsappLink || null,
          is_active: true
        })
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('[ShabbatHub] Publication create error:', err);
        throw new Error(err.message || err.details || err.hint || JSON.stringify(err));
      }

      setSuccess(true);
      setTimeout(() => router.push('/add-pdf'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <Check size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Публикация создана!</h2>
          <p className="text-gray-600">Теперь добавьте PDF...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft size={20} />
          Назад в каталог
        </Link>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Создать публикацию</h1>
          <p className="text-gray-600 text-sm mb-6">
            Публикация — это издание (газета, журнал, листок), которое выходит регулярно. 
            После создания публикации вы сможете добавлять отдельные выпуски (PDF).
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Названия */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Название публикации</h3>
                <p className="text-xs text-gray-500 mt-1">Заполните хотя бы на одном языке *</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  На русском
                </label>
                <input
                  type="text"
                  value={titleRu}
                  onChange={(e) => setTitleRu(e.target.value)}
                  placeholder="Шомрей Шабос"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  На английском
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Shomrei Shabbos"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  На иврите
                </label>
                <input
                  type="text"
                  value={titleHe}
                  onChange={(e) => setTitleHe(e.target.value)}
                  placeholder="שומרי שבת"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none text-right"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Описание */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={descriptionRu}
                onChange={(e) => setDescriptionRu(e.target.value)}
                rows={3}
                placeholder="Краткое описание публикации..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none"
              />
            </div>

            {/* Язык и частота */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Основной язык
                </label>
                <select
                  value={primaryLanguage}
                  onChange={(e) => setPrimaryLanguage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
                >
                  <option value="ru">🇷🇺 Русский</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="he">🇮🇱 עברית</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Периодичность
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
                >
                  <option value="weekly">Еженедельно</option>
                  <option value="monthly">Ежемесячно</option>
                  <option value="daily">Ежедневно</option>
                  <option value="irregular">Нерегулярно / По праздникам</option>
                </select>
              </div>
            </div>

            {/* Контакты */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 pt-2">Контактная информация</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Globe size={14} className="inline mr-1" />
                  Сайт издания
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail size={14} className="inline mr-1" />
                  Email издательства
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MessageCircle size={14} className="inline mr-1" />
                    Telegram
                  </label>
                  <input
                    type="url"
                    value={telegramLink}
                    onChange={(e) => setTelegramLink(e.target.value)}
                    placeholder="https://t.me/..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MessageCircle size={14} className="inline mr-1" />
                    WhatsApp
                  </label>
                  <input
                    type="url"
                    value={whatsappLink}
                    onChange={(e) => setWhatsappLink(e.target.value)}
                    placeholder="https://wa.me/..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Раввин */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 pt-2">Ответственный раввин (опционально)</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя раввина
                  </label>
                  <input
                    type="text"
                    value={rabbiName}
                    onChange={(e) => setRabbiName(e.target.value)}
                    placeholder="Рав Моше Коэн"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Сайт / Новости раввина
                  </label>
                  <input
                    type="url"
                    value={rabbiWebsite}
                    onChange={(e) => setRabbiWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Сохранение...
                </>
              ) : (
                <>
                  <Library size={20} />
                  Создать публикацию
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
