'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Frequency, Language as LangType } from '@/lib/types';
import { 
  FileText, Link as LinkIcon, Mail, MessageCircle, 
  Globe, Calendar, ArrowLeft, Upload 
} from 'lucide-react';
import Link from 'next/link';

export default function AddPublicationPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title_ru: '',
    title_en: '',
    title_he: '',
    description_ru: '',
    description_en: '',
    description_he: '',
    frequency: 'weekly' as Frequency,
    primary_language: 'ru' as LangType,
    whatsapp_link: '',
    telegram_link: '',
    website_url: '',
    email: '',
  });

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t('messages.loginRequired')}</p>
          <Link 
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full"
          >
            {t('nav.login')}
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('publications')
        .insert([
          {
            ...formData,
            created_by: user.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      router.push(`/publication/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const frequencyOptions: { value: Frequency; label: Record<string, string> }[] = [
    { value: 'daily', label: { ru: 'Ежедневная', en: 'Daily', he: 'יומי' } },
    { value: 'weekly', label: { ru: 'Еженедельная', en: 'Weekly', he: 'שבועי' } },
    { value: 'monthly', label: { ru: 'Ежемесячная', en: 'Monthly', he: 'חודשי' } },
    { value: 'irregular', label: { ru: 'Нерегулярная', en: 'Irregular', he: 'לא קבוע' } },
  ];

  const languageOptions: { value: LangType; label: string; code: string }[] = [
    { value: 'ru', label: 'Русский', code: 'RU' },
    { value: 'en', label: 'English', code: 'EN' },
    { value: 'he', label: 'עברית', code: 'HE' },
  ];

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft size={20} />
            {t('nav.home')}
          </Link>
          <h1 className="text-3xl font-display font-bold text-primary-900">
            {t('nav.addPublication')}
          </h1>
          <p className="text-gray-600 mt-2">
            {lang === 'ru' && 'Создайте новую серию публикаций (газету, журнал и т.д.)'}
            {lang === 'en' && 'Create a new publication series (newspaper, magazine, etc.)'}
            {lang === 'he' && 'צור סדרת פרסומים חדשה (עיתון, מגזין וכו\')'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          {/* Title - Russian */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms.title')} (Русский) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title_ru}
              onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder="Например: Chevrutah 24x7"
            />
          </div>

          {/* Title - English */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms.title')} (English)
            </label>
            <input
              type="text"
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          {/* Title - Hebrew */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms.title')} (עברית)
            </label>
            <input
              type="text"
              dir="rtl"
              value={formData.title_he}
              onChange={(e) => setFormData({ ...formData, title_he: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          {/* Description - Russian */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms.description')} (Русский)
            </label>
            <textarea
              rows={3}
              value={formData.description_ru}
              onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description_ru.length}/500</p>
          </div>

          {/* Frequency & Primary Language */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                {lang === 'ru' ? 'Периодичность' : lang === 'en' ? 'Frequency' : 'תדירות'}
                <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Frequency })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 bg-white"
              >
                {frequencyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label[lang]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe size={16} className="inline mr-2" />
                {t('forms.selectLanguage')} <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.primary_language}
                onChange={(e) => setFormData({ ...formData, primary_language: e.target.value as LangType })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 bg-white"
              >
                {languageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.code} {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Links */}
          <div className="border-t border-gray-100 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {lang === 'ru' ? 'Контакты (опционально)' : lang === 'en' ? 'Contacts (optional)' : 'פרטי קשר (אופציונלי)'}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageCircle size={16} className="inline mr-2 text-green-600" />
                  WhatsApp
                </label>
                <input
                  type="url"
                  value={formData.whatsapp_link}
                  onChange={(e) => setFormData({ ...formData, whatsapp_link: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="https://chat.whatsapp.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageCircle size={16} className="inline mr-2 text-blue-500" />
                  Telegram
                </label>
                <input
                  type="url"
                  value={formData.telegram_link}
                  onChange={(e) => setFormData({ ...formData, telegram_link: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="https://t.me/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <LinkIcon size={16} className="inline mr-2" />
                  {t('forms.website')}
                </label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="contact@example.com"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t('forms.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title_ru}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors"
            >
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <>
                  <Upload size={20} />
                  {t('forms.save')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
