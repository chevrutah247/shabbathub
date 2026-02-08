'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { getIssueById, getIssues } from '@/lib/api';
import { Issue } from '@/lib/types';
import PDFViewer from '@/components/PDFViewer';
import {
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  BookOpen,
  Eye,
  Share2,
  Heart,
  Loader2,
  AlertCircle,
  CheckCircle,
  Copy,
  Printer,
  Tag,
  User,
  Clock,
  Globe,
  Bell,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

// Social icons
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TelegramIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

<<<<<<< HEAD
const languageFlags: Record<string, string> = {
  ru: '🇷🇺',
  he: '🇮🇱',
  en: '🇺🇸',
=======
const languageCodes: Record<string, string> = {
  ru: 'RU',
  he: 'HE',
  en: 'EN',
>>>>>>> 5d2fd9c (Fix: dynamic data from Supabase, remove flags)
};

function formatDate(dateString: string | null | undefined, lang: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const locale = lang === 'he' ? 'he-IL' : lang === 'en' ? 'en-US' : 'ru-RU';
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function formatHebrewDate(day: number | null, month: number | null, year: number | null, lang: string): string | null {
  if (!year) return null;
  
  const hebrewMonths: Record<number, { ru: string; en: string; he: string }> = {
    1: { ru: 'Нисан', en: 'Nisan', he: 'ניסן' },
    2: { ru: 'Ияр', en: 'Iyar', he: 'אייר' },
    3: { ru: 'Сиван', en: 'Sivan', he: 'סיון' },
    4: { ru: 'Тамуз', en: 'Tammuz', he: 'תמוז' },
    5: { ru: 'Ав', en: 'Av', he: 'אב' },
    6: { ru: 'Элул', en: 'Elul', he: 'אלול' },
    7: { ru: 'Тишрей', en: 'Tishrei', he: 'תשרי' },
    8: { ru: 'Хешван', en: 'Cheshvan', he: 'חשון' },
    9: { ru: 'Кислев', en: 'Kislev', he: 'כסלו' },
    10: { ru: 'Тевет', en: 'Tevet', he: 'טבת' },
    11: { ru: 'Шват', en: 'Shvat', he: 'שבט' },
    12: { ru: 'Адар', en: 'Adar', he: 'אדר' },
    13: { ru: 'Адар II', en: 'Adar II', he: "אדר ב׳" },
  };

  const parts: string[] = [];
  if (day) parts.push(String(day));
  if (month && hebrewMonths[month]) {
    const m = hebrewMonths[month];
    parts.push(lang === 'he' ? m.he : lang === 'en' ? m.en : m.ru);
  }
  parts.push(String(year));
  return parts.join(' ');
}

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  const id = params?.id as string;

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [relatedIssues, setRelatedIssues] = useState<Issue[]>([]);
  const [downloadCount, setDownloadCount] = useState(0);

  // Load issue
  useEffect(() => {
    if (!id) return;

    async function loadIssue() {
      setLoading(true);
      setError(null);
      try {
        const data = await getIssueById(id);
        if (!data) {
          setError(lang === 'ru' ? 'Документ не найден' : lang === 'en' ? 'Document not found' : 'המסמך לא נמצא');
          return;
        }
        setIssue(data);
        setDownloadCount(data.download_count || 0);

        // Increment view count
        supabase
          .from('issues')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', id)
          .then(() => {});

        // Load related issues
        const relatedPromises: Promise<any>[] = [];
        
        if (data.publication_id) {
          relatedPromises.push(
            getIssues({ publicationId: data.publication_id, pageSize: 5, sort: 'date-desc' })
          );
        }
        if (data.parsha_id) {
          relatedPromises.push(
            getIssues({ parshaId: data.parsha_id, pageSize: 5, sort: 'date-desc' })
          );
        }

        if (relatedPromises.length > 0) {
          const results = await Promise.all(relatedPromises);
          const allRelated = results.flatMap(r => r.data || []);
          const uniqueMap = new Map<string, Issue>();
          allRelated.forEach(i => {
            if (i.id !== id) uniqueMap.set(i.id, i);
          });
          setRelatedIssues(Array.from(uniqueMap.values()).slice(0, 6));
        }
      } catch (err) {
        console.error('Error loading issue:', err);
        setError(lang === 'ru' ? 'Ошибка загрузки' : lang === 'en' ? 'Loading error' : 'שגיאת טעינה');
      } finally {
        setLoading(false);
      }
    }

    loadIssue();
  }, [id, lang]);

  // Check favorite status
  useEffect(() => {
    if (!user || !id) return;
    
    supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('issue_id', id)
      .maybeSingle()
      .then(({ data }) => {
        setIsFavorite(!!data);
      });
  }, [user, id]);

  const toggleFavorite = async () => {
    if (!user || !id) return;
    setFavoriteLoading(true);
    
    try {
      if (isFavorite) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('issue_id', id);
        setIsFavorite(false);
      } else {
        await supabase
          .from('favorites')
          .insert([{ user_id: user.id, issue_id: id }]);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Favorite error:', err);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!issue?.pdf_url) return;
    
    // Increment download count
    supabase
      .from('issues')
      .update({ download_count: (issue.download_count || 0) + 1 })
      .eq('id', id)
      .then(() => {});
    
    setDownloadCount(prev => prev + 1);
    
    // For Google Drive PDFs, convert to download URL
    let downloadUrl = issue.pdf_url;
    const match = issue.pdf_url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      downloadUrl = `https://drive.google.com/uc?id=${match[1]}&export=download`;
    }
    
    window.open(downloadUrl, '_blank');
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareText = lang === 'ru'
      ? `${issue?.title} — ShabbatHub — крупнейший архив материалов к Шаббату`
      : lang === 'he'
      ? `${issue?.title} — ShabbatHub — הארכיון הגדול ביותר של חומרים לשבת`
      : `${issue?.title} — ShabbatHub — The largest Shabbat materials archive`;

    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, url });
        return;
      } catch {}
    }
    
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = () => {
    // TODO: Implement subscription flow
    // For now, show a toast or redirect to subscription
    alert(
      lang === 'ru'
        ? 'Подписка на обновления будет доступна скоро!'
        : lang === 'en'
        ? 'Subscription updates coming soon!'
        : 'הרשמה לעדכונים תהיה זמינה בקרוב!'
    );
  };

  const getLocalizedName = (item: any, prefix: string): string => {
    return item?.[`${prefix}_${lang}`] || item?.[`${prefix}_ru`] || item?.[`${prefix}_en`] || '';
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-200 rounded-2xl animate-pulse" style={{ height: '70vh' }} />
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="h-8 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-6" />
                <div className="h-12 bg-gray-200 rounded-xl mb-3" />
                <div className="h-10 bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !issue) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm max-w-md">
          <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {error || (lang === 'ru' ? 'Документ не найден' : lang === 'en' ? 'Document not found' : 'המסמך לא נמצא')}
          </h2>
          <p className="text-gray-500 mb-6">
            {lang === 'ru' ? 'Возможно, документ был удалён или ссылка неверна.' :
             lang === 'en' ? 'The document may have been removed or the link is incorrect.' :
             'ייתכן שהמסמך הוסר או שהקישור שגוי.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft size={16} className="inline mr-2" />
              {lang === 'ru' ? 'Назад' : lang === 'en' ? 'Back' : 'חזרה'}
            </button>
            <Link
              href="/catalog"
              className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
            >
              {t('nav.catalog')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pubLang = issue.publication?.primary_language || 'ru';
  const pubName = issue.publication ? getLocalizedName(issue.publication, 'title') : '';
  const parshaName = issue.parsha ? getLocalizedName(issue.parsha, 'name') : null;
  const eventName = issue.event ? getLocalizedName(issue.event, 'name') : null;
  const hebrewDate = formatHebrewDate(issue.hebrew_day ?? null, issue.hebrew_month ?? null, issue.hebrew_year ?? null, lang);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${issue.title} — ShabbatHub`;
  const socialLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              {t('nav.home')}
            </Link>
            <ChevronRight size={14} className="text-gray-300" />
            <Link href="/catalog" className="hover:text-primary-600 transition-colors">
              {t('nav.catalog')}
            </Link>
            {pubName && (
              <>
                <ChevronRight size={14} className="text-gray-300" />
                <Link
                  href={`/catalog?publication=${issue.publication_id}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {pubName}
                </Link>
              </>
            )}
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-gray-800 font-medium truncate max-w-[200px]">
              {issue.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ========== LEFT: PDF Viewer ========== */}
          <div className="lg:col-span-2">
            {issue.pdf_url ? (
              <PDFViewer
                url={issue.pdf_url}
                title={issue.title}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  {lang === 'ru' ? 'PDF недоступен для предпросмотра' :
                   lang === 'en' ? 'PDF preview not available' :
                   'תצוגה מקדימה אינה זמינה'}
                </p>
              </div>
            )}

            {/* Related Documents (Desktop) */}
            {relatedIssues.length > 0 && (
              <div className="mt-8 hidden lg:block">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {lang === 'ru' ? 'Похожие материалы' :
                   lang === 'en' ? 'Related Documents' :
                   'מסמכים קשורים'}
                </h3>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                  {relatedIssues.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/document/${rel.id}`}
                      className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-primary-200"
                    >
                      <div className="flex gap-3">
                        {rel.thumbnail_url ? (
                          <img
                            src={rel.thumbnail_url}
                            alt=""
                            className="w-12 h-16 object-cover rounded-lg shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                            <FileText size={20} className="text-blue-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          {rel.publication && (
                            <p className="text-[11px] text-primary-600 font-medium uppercase tracking-wider">
                              {getLocalizedName(rel.publication, 'title')}
                            </p>
                          )}
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-primary-700 transition-colors">
                            {rel.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(rel.gregorian_date, lang)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ========== RIGHT: Document Info Sidebar ========== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4 space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {parshaName && (
                  <Link
                    href={`/catalog?parsha=${issue.parsha_id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-100 transition-colors"
                  >
                    <BookOpen size={14} />
                    {parshaName}
                  </Link>
                )}
                {eventName && (
                  <Link
                    href={`/catalog?event=${issue.event_id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors"
                  >
                    <Tag size={14} />
                    {eventName}
                  </Link>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-sm">
                  <Globe size={14} />
<<<<<<< HEAD
                  {languageFlags[pubLang]} {pubLang.toUpperCase()}
=======
                  {languageCodes[pubLang]} {pubLang.toUpperCase()}
>>>>>>> 5d2fd9c (Fix: dynamic data from Supabase, remove flags)
                </span>
              </div>

              {/* Publication name */}
              {issue.publication && (
                <Link
                  href={`/catalog?publication=${issue.publication_id}`}
                  className="text-xs text-primary-600 font-semibold uppercase tracking-wider hover:text-primary-800 transition-colors"
                >
                  {pubName}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-2xl font-display font-bold text-gray-900 leading-tight">
                {issue.title}
              </h1>

              {/* Issue number */}
              {issue.issue_number && (
                <p className="text-sm text-gray-500">
                  {lang === 'ru' ? 'Выпуск' : lang === 'en' ? 'Issue' : 'גיליון'} #{issue.issue_number}
                </p>
              )}

              {/* Description */}
              {issue.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {issue.description}
                </p>
              )}

              {/* ===== Action Buttons ===== */}
              <div className="space-y-3">
                {/* Download button with branding */}
                <button
                  onClick={handleDownload}
                  className="w-full flex flex-col items-center gap-1 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <Download size={20} />
                    {lang === 'ru' ? 'Скачать PDF' :
                     lang === 'en' ? 'Download PDF' :
                     'הורד PDF'}
                    {issue.file_size && (
                      <span className="text-blue-200 text-sm">
                        ({formatFileSize(issue.file_size)})
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-blue-200 font-normal">
                    {lang === 'ru' ? 'ShabbatHub — крупнейший архив материалов к Шаббату' :
                     lang === 'en' ? 'ShabbatHub — The largest Shabbat materials archive' :
                     'ShabbatHub — הארכיון הגדול ביותר של חומרים לשבת'}
                  </span>
                </button>

                {/* Social share row */}
                <div className="flex gap-2">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <FacebookIcon size={16} />
                  </a>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <WhatsAppIcon size={16} />
                  </a>
                  <a
                    href={socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#26A5E4] hover:bg-[#1E96D1] text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <TelegramIcon size={16} />
                  </a>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                  >
                    {copied ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>

                {/* Favorite + Print row */}
                <div className="flex gap-2">
                  {user && (
                    <button
                      onClick={toggleFavorite}
                      disabled={favoriteLoading}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium transition-all border ${
                        isFavorite
                          ? 'bg-red-50 border-red-200 text-red-600'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Heart
                        size={18}
                        className={isFavorite ? 'fill-red-500' : ''}
                      />
                      {isFavorite
                        ? (lang === 'ru' ? 'В избранном' : lang === 'en' ? 'Saved' : 'נשמר')
                        : (lang === 'ru' ? 'В избранное' : lang === 'en' ? 'Save' : 'שמור')}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (!issue.pdf_url) return;
                      const printWindow = window.open(issue.pdf_url, '_blank');
                      if (printWindow) {
                        printWindow.addEventListener('load', () => {
                          try { printWindow.print(); } catch {}
                        });
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    <Printer size={18} />
                    {lang === 'ru' ? 'Печать' : lang === 'en' ? 'Print' : 'הדפס'}
                  </button>
                </div>
              </div>

              {/* Metadata section */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  {lang === 'ru' ? 'Информация' :
                   lang === 'en' ? 'Details' :
                   'פרטים'}
                </h3>

                {/* Gregorian date */}
                {issue.gregorian_date && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-gray-500">
                        {lang === 'ru' ? 'Дата: ' : lang === 'en' ? 'Date: ' : 'תאריך: '}
                      </span>
                      <span className="text-gray-800">
                        {formatDate(issue.gregorian_date, lang)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Hebrew date */}
                {hebrewDate && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-gray-500">
                        {lang === 'ru' ? 'Евр. дата: ' : lang === 'en' ? 'Hebrew: ' : 'עברי: '}
                      </span>
                      <span className="text-gray-800">{hebrewDate}</span>
                    </div>
                  </div>
                )}

                {/* Views */}
                {(issue.view_count ?? 0) > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <Eye size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-gray-500">
                        {lang === 'ru' ? 'Просмотры: ' : lang === 'en' ? 'Views: ' : 'צפיות: '}
                      </span>
                      <span className="text-gray-800">{issue.view_count}</span>
                    </div>
                  </div>
                )}

                {/* Downloads */}
                {downloadCount > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <Download size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-gray-500">
                        {lang === 'ru' ? 'Скачиваний: ' : lang === 'en' ? 'Downloads: ' : 'הורדות: '}
                      </span>
                      <span className="text-gray-800">{downloadCount}</span>
                    </div>
                  </div>
                )}

                {/* Pages */}
                {issue.page_count && (
                  <div className="flex items-center gap-3 text-sm">
                    <FileText size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-gray-500">
                        {lang === 'ru' ? 'Страниц: ' : lang === 'en' ? 'Pages: ' : 'עמודים: '}
                      </span>
                      <span className="text-gray-800">{issue.page_count}</span>
                    </div>
                  </div>
                )}

                {/* File size */}
                {issue.file_size && (
                  <div className="flex items-center gap-3 text-sm">
                    <FileText size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-gray-500">
                        {lang === 'ru' ? 'Размер: ' : lang === 'en' ? 'Size: ' : 'גודל: '}
                      </span>
                      <span className="text-gray-800">{formatFileSize(issue.file_size)}</span>
                    </div>
                  </div>
                )}

                {/* Uploader */}
                {issue.uploader && (
                  <div className="flex items-center gap-3 text-sm">
                    <User size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-gray-500">
                        {lang === 'ru' ? 'Загрузил: ' : lang === 'en' ? 'Uploaded by: ' : 'הועלה ע״י: '}
                      </span>
                      <span className="text-gray-800">
                        {issue.uploader.display_name ||
                         `${issue.uploader.first_name || ''} ${issue.uploader.last_name || ''}`.trim() ||
                         (lang === 'ru' ? 'Пользователь' : lang === 'en' ? 'User' : 'משתמש')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Created at */}
                {issue.created_at && (
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-gray-400 shrink-0" />
                    <div>
                      <span className="text-gray-500">
                        {lang === 'ru' ? 'Добавлен: ' : lang === 'en' ? 'Added: ' : 'נוסף: '}
                      </span>
                      <span className="text-gray-800">
                        {formatDate(issue.created_at, lang)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Subscribe to publication */}
              {issue.publication_id && (
                <div className="border-t border-gray-100 pt-4">
                  <button
                    onClick={handleSubscribe}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Bell size={16} />
                    {lang === 'ru' ? 'Подписаться на обновления' :
                     lang === 'en' ? 'Subscribe to updates' :
                     'הירשם לעדכונים'}
                  </button>
                </div>
              )}

              {/* Back to catalog */}
              <div className="pt-2 border-t border-gray-100">
                <Link
                  href="/catalog"
                  className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 font-medium"
                >
                  <ArrowLeft size={16} />
                  {lang === 'ru' ? 'Все материалы' :
                   lang === 'en' ? 'All documents' :
                   'כל המסמכים'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Documents (Mobile) */}
        {relatedIssues.length > 0 && (
          <div className="mt-8 lg:hidden">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {lang === 'ru' ? 'Похожие материалы' :
               lang === 'en' ? 'Related Documents' :
               'מסמכים קשורים'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedIssues.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/document/${rel.id}`}
                  className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex gap-3">
                    {rel.thumbnail_url ? (
                      <img
                        src={rel.thumbnail_url}
                        alt=""
                        className="w-12 h-16 object-cover rounded-lg shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-blue-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      {rel.publication && (
                        <p className="text-[11px] text-primary-600 font-medium uppercase tracking-wider">
                          {getLocalizedName(rel.publication, 'title')}
                        </p>
                      )}
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(rel.gregorian_date, lang)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
