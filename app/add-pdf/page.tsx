'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Publication, Parsha, Event } from '@/lib/types';
import { 
  FileText, Calendar, ArrowLeft, Upload, AlertCircle, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function AddPdfPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Data from DB
  const [publications, setPublications] = useState<Publication[]>([]);
  const [parshiot, setParshiot] = useState<Parsha[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    publication_id: '',
    title: '',
    description: '',
    issue_number: '',
    gregorian_date: new Date().toISOString().split('T')[0],
    hebrew_day: 0,
    hebrew_month: 0,
    hebrew_year: 5786,
    parsha_id: '',    // Можно указать вместе с event_id
    event_id: '',     // Можно указать вместе с parsha_id
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [copyrightConfirmed, setCopyrightConfirmed] = useState(false);

  // Hebrew months for dropdown
  const hebrewMonths = [
    { num: 7, ru: 'Тишрей', en: 'Tishrei', he: 'תשרי' },
    { num: 8, ru: 'Хешван', en: 'Cheshvan', he: 'חשון' },
    { num: 9, ru: 'Кислев', en: 'Kislev', he: 'כסלו' },
    { num: 10, ru: 'Тевет', en: 'Tevet', he: 'טבת' },
    { num: 11, ru: 'Шват', en: 'Shvat', he: 'שבט' },
    { num: 12, ru: 'Адар', en: 'Adar', he: 'אדר' },
    { num: 13, ru: 'Адар II', en: 'Adar II', he: 'אדר ב׳' },
    { num: 1, ru: 'Нисан', en: 'Nisan', he: 'ניסן' },
    { num: 2, ru: 'Ияр', en: 'Iyar', he: 'אייר' },
    { num: 3, ru: 'Сиван', en: 'Sivan', he: 'סיון' },
    { num: 4, ru: 'Тамуз', en: 'Tammuz', he: 'תמוז' },
    { num: 5, ru: 'Ав', en: 'Av', he: 'אב' },
    { num: 6, ru: 'Элул', en: 'Elul', he: 'אלול' },
  ];

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        // Load publications
        const { data: pubs } = await supabase
          .from('publications')
          .select('*')
          .eq('is_active', true)
          .order('title_ru');
        
        // Load parshiot
        const { data: parshas } = await supabase
          .from('parshiot')
          .select('*')
          .order('order_num');
        
        // Load events
        const { data: evts } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('hebrew_month, hebrew_day');

        if (pubs) setPublications(pubs);
        if (parshas) setParshiot(parshas);
        if (evts) setEvents(evts);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, []);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      setError('Please select a PDF file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pdfFile) {
      setError('Please select a PDF file');
      return;
    }
    
    if (!copyrightConfirmed) {
      setError(t('forms.copyrightConfirm'));
      return;
    }

    setLoading(true);
    setUploading(true);
    setError(null);

    try {
      // 1. Upload PDF to storage
      const fileExt = 'pdf';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `issues/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, pdfFile);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pdfs')
        .getPublicUrl(filePath);

      setUploading(false);

      // 3. Create issue record
      const issueData: any = {
        publication_id: formData.publication_id,
        title: formData.title,
        description: formData.description || null,
        issue_number: formData.issue_number || null,
        gregorian_date: formData.gregorian_date,
        hebrew_year: formData.hebrew_year,
        hebrew_month: formData.hebrew_month || null,
        hebrew_day: formData.hebrew_day || null,
        pdf_url: publicUrl,
        pdf_filename: pdfFile.name,
        file_size: pdfFile.size,
        uploaded_by: user.id,
      };

      // Add parsha if selected
      if (formData.parsha_id) {
        issueData.parsha_id = parseInt(formData.parsha_id);
      }
      
      // Add event if selected (can be together with parsha!)
      if (formData.event_id) {
        issueData.event_id = formData.event_id;
      }

      const { error: insertError } = await supabase
        .from('issues')
        .insert([issueData]);

      if (insertError) throw insertError;

      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/my-documents');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const getLocalizedName = (item: any, prefix: string) => {
    const key = `${prefix}_${lang}` as keyof typeof item;
    return item[key] || item[`${prefix}_ru`] || '';
  };

  if (success) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('messages.uploadSuccess')}
          </h2>
          <p className="text-gray-600">
            {lang === 'ru' && 'Перенаправление...'}
            {lang === 'en' && 'Redirecting...'}
            {lang === 'he' && 'מפנה מחדש...'}
          </p>
        </div>
      </div>
    );
  }

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
            {t('nav.addPdf')}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
              <AlertCircle className="shrink-0 mt-0.5" size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms.title')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          {/* Publication */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms.selectPublication')} <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.publication_id}
              onChange={(e) => setFormData({ ...formData, publication_id: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 bg-white"
              disabled={loadingData}
            >
              <option value="">{t('forms.selectPublication')}</option>
              {publications.map((pub) => (
                <option key={pub.id} value={pub.id}>
                  {getLocalizedName(pub, 'title')}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              <Link href="/add-publication" className="text-primary-600 hover:underline">
                {lang === 'ru' && '+ Создать новую публикацию'}
                {lang === 'en' && '+ Create new publication'}
                {lang === 'he' && '+ צור פרסום חדש'}
              </Link>
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms.description')}
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500</p>
          </div>

          {/* PDF File */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} className="inline mr-2" />
              PDF {t('forms.chooseFile')} <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                {pdfFile ? (
                  <div className="text-green-600">
                    <CheckCircle size={32} className="mx-auto mb-2" />
                    <p className="font-medium">{pdfFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <Upload size={32} className="mx-auto mb-2" />
                    <p>{t('forms.chooseFile')}</p>
                    <p className="text-xs text-gray-400">PDF, max 50MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Issue Number & Date */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.issueNumber')}
              </label>
              <input
                type="text"
                value={formData.issue_number}
                onChange={(e) => setFormData({ ...formData, issue_number: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                placeholder="151"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                {lang === 'ru' ? 'Дата (григорианская)' : lang === 'en' ? 'Date (Gregorian)' : 'תאריך (לועזי)'}
              </label>
              <input
                type="date"
                value={formData.gregorian_date}
                onChange={(e) => setFormData({ ...formData, gregorian_date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Hebrew Date */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-medium text-gray-800 mb-3">
              📅 {lang === 'ru' ? 'Еврейская дата (опционально)' : lang === 'en' ? 'Hebrew Date (optional)' : 'תאריך עברי (אופציונלי)'}
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {lang === 'ru' ? 'День' : lang === 'en' ? 'Day' : 'יום'}
                </label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={formData.hebrew_day || ''}
                  onChange={(e) => setFormData({ ...formData, hebrew_day: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {lang === 'ru' ? 'Месяц' : lang === 'en' ? 'Month' : 'חודש'}
                </label>
                <select
                  value={formData.hebrew_month || ''}
                  onChange={(e) => setFormData({ ...formData, hebrew_month: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
                >
                  <option value="">—</option>
                  {hebrewMonths.map((m) => (
                    <option key={m.num} value={m.num}>
                      {lang === 'he' ? m.he : lang === 'en' ? m.en : m.ru}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  {lang === 'ru' ? 'Год' : lang === 'en' ? 'Year' : 'שנה'}
                </label>
                <input
                  type="number"
                  min={5700}
                  max={5900}
                  value={formData.hebrew_year}
                  onChange={(e) => setFormData({ ...formData, hebrew_year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Parsha Selector (optional) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📖 {t('forms.selectParsha')} 
              <span className="text-gray-400 font-normal ml-2">
                ({lang === 'ru' ? 'опционально' : lang === 'en' ? 'optional' : 'אופציונלי'})
              </span>
            </label>
            <select
              value={formData.parsha_id}
              onChange={(e) => setFormData({ ...formData, parsha_id: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 bg-white"
              disabled={loadingData}
            >
              <option value="">{t('filters.all')}</option>
              {parshiot.map((parsha) => (
                <option key={parsha.id} value={parsha.id}>
                  {getLocalizedName(parsha, 'name')}
                </option>
              ))}
            </select>
          </div>

          {/* Event Selector (optional) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎉 {t('forms.selectEvent')}
              <span className="text-gray-400 font-normal ml-2">
                ({lang === 'ru' ? 'опционально' : lang === 'en' ? 'optional' : 'אופציונלי'})
              </span>
            </label>
            <select
              value={formData.event_id}
              onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 bg-white"
              disabled={loadingData}
            >
              <option value="">{t('filters.all')}</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {getLocalizedName(event, 'name')}
                </option>
              ))}
            </select>
          </div>

          {/* Copyright Confirmation */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={copyrightConfirmed}
                onChange={(e) => setCopyrightConfirmed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {t('forms.copyrightConfirm')} <span className="text-red-500">*</span>
              </span>
            </label>
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
              disabled={loading || !pdfFile || !formData.publication_id || !copyrightConfirmed}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  {uploading ? 
                    (lang === 'ru' ? 'Загрузка файла...' : lang === 'en' ? 'Uploading...' : 'מעלה...') :
                    (lang === 'ru' ? 'Сохранение...' : lang === 'en' ? 'Saving...' : 'שומר...')
                  }
                </>
              ) : (
                <>
                  <Upload size={20} />
                  {t('forms.submit')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
