'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Library, Loader2, Check, AlertCircle, Globe, Mail, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/language-context';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default function AddPublicationPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const tr = (ru: string, en: string) => (isEn ? en : ru);
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

  useEffect(() => {
    if (lang === 'en') setPrimaryLanguage('en');
    if (lang === 'he') setPrimaryLanguage('he');
    if (lang === 'uk') setPrimaryLanguage('uk');
    if (lang === 'ru') setPrimaryLanguage('ru');
  }, [lang]);

  const normalizeTitle = (value: string) =>
    value
      .toLowerCase()
      .replace(/&#\d+;/g, ' ')
      .replace(/[^a-z0-9а-яёא-ת]+/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!titleRu && !titleEn && !titleHe) {
      setError(tr('Введите название публикации хотя бы на одном языке', 'Enter publication title in at least one language'));
      setSubmitting(false);
      return;
    }

    try {
      const candidateTitles = [titleRu, titleEn, titleHe].map(normalizeTitle).filter(Boolean);
      const { data: existingPubs } = await supabase
        .from('publications')
        .select('id,title_ru,title_en,title_he,is_active')
        .eq('is_active', true)
        .limit(5000);
      const duplicate = (existingPubs || []).find((pub: any) => {
        const existingTitles = [pub.title_ru, pub.title_en, pub.title_he].map((x: string) => normalizeTitle(x || '')).filter(Boolean);
        return existingTitles.some((et: string) => candidateTitles.includes(et));
      });
      if (duplicate) {
        const duplicateTitle = duplicate.title_ru || duplicate.title_en || duplicate.title_he || tr('Без названия', 'Untitled');
        throw new Error(tr('Дубликат публикации: «', 'Duplicate publication: "') + duplicateTitle + tr('». Сначала используйте существующую публикацию.', '". Please use the existing publication first.'));
      }

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
        const raw = (err.message || err.details || err.hint || '').toString().toLowerCase();
        if (raw.includes('uq_publications_active_norm_title') || raw.includes('duplicate key value violates unique constraint "uq_publications_active_norm_title"')) {
          throw new Error(tr('Публикация с таким названием уже существует.', 'A publication with this title already exists.'));
        }
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{tr('Публикация создана!', 'Publication created!')}</h2>
          <p className="text-gray-600">{tr('Теперь добавьте PDF...', 'Now add a PDF...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft size={20} />
          {tr('Назад в каталог', 'Back to catalog')}
        </Link>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{tr('Создать публикацию', 'Create publication')}</h1>
          <p className="text-gray-600 text-sm mb-6">
            {tr(
              'Публикация — это издание (газета, журнал, листок), которое выходит регулярно. После создания публикации вы сможете добавлять отдельные выпуски (PDF).',
              'A publication is a recurring edition (newspaper, magazine, leaflet). After creating a publication, you can add individual PDF issues.'
            )}
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
                <h3 className="font-medium text-gray-900">{tr('Название публикации', 'Publication title')}</h3>
                <p className="text-xs text-gray-500 mt-1">{tr('Заполните хотя бы на одном языке *', 'Fill at least one language *')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tr('На русском', 'In Russian')}
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
                  {tr('На английском', 'In English')}
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
                  {tr('На иврите', 'In Hebrew')}
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
                {tr('Описание', 'Description')}
              </label>
              <textarea
                value={descriptionRu}
                onChange={(e) => setDescriptionRu(e.target.value)}
                rows={3}
                placeholder={tr('Краткое описание публикации...', 'Short publication description...')}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none"
              />
            </div>

            {/* Язык и частота */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tr('Основной язык', 'Primary language')}
                </label>
                <select
                  value={primaryLanguage}
                  onChange={(e) => setPrimaryLanguage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
                >
                  <option value="ru">{tr('🇷🇺 Русский', '🇷🇺 Russian')}</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="he">🇮🇱 עברית</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tr('Периодичность', 'Frequency')}
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
                >
                  <option value="weekly">{tr('Еженедельно', 'Weekly')}</option>
                  <option value="monthly">{tr('Ежемесячно', 'Monthly')}</option>
                  <option value="daily">{tr('Ежедневно', 'Daily')}</option>
                  <option value="irregular">{tr('Нерегулярно / По праздникам', 'Irregular / Holiday-based')}</option>
                </select>
              </div>
            </div>

            {/* Контакты */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 pt-2">{tr('Контактная информация', 'Contact information')}</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Globe size={14} className="inline mr-1" />
                  {tr('Сайт издания', 'Publication website')}
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
                  {tr('Email издательства', 'Publisher email')}
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
              <h3 className="font-medium text-gray-900 pt-2">{tr('Ответственный раввин (опционально)', 'Responsible rabbi (optional)')}</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {tr('Имя раввина', 'Rabbi name')}
                  </label>
                  <input
                    type="text"
                    value={rabbiName}
                    onChange={(e) => setRabbiName(e.target.value)}
                    placeholder={tr('Рав Моше Коэн', 'Rabbi Moshe Cohen')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {tr('Сайт / Новости раввина', 'Rabbi website / news')}
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
                  {tr('Сохранение...', 'Saving...')}
                </>
              ) : (
                <>
                  <Library size={20} />
                  {tr('Создать публикацию', 'Create publication')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
