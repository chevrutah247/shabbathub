'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Edit2, Trash2, X, Save, ChevronLeft, ChevronRight, FileText, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import Image from 'next/image';
import { t } from '@/lib/translations';
import { useLanguage, type Lang } from '@/lib/language-context';


const PARSHAS = [
  { id: 1, name: 'Берешит' }, { id: 2, name: 'Ноах' }, { id: 3, name: 'Лех-Леха' },
  { id: 4, name: 'Ваера' }, { id: 5, name: 'Хаей Сара' }, { id: 6, name: 'Толдот' },
  { id: 7, name: 'Ваецэ' }, { id: 8, name: 'Ваишлах' }, { id: 9, name: 'Ваешев' },
  { id: 10, name: 'Микец' }, { id: 11, name: 'Ваигаш' }, { id: 12, name: 'Ваехи' },
  { id: 13, name: 'Шмот' }, { id: 14, name: 'Ваэра' }, { id: 15, name: 'Бо' },
  { id: 16, name: 'Бешалах' }, { id: 17, name: 'Итро' }, { id: 18, name: 'Мишпатим' },
  { id: 19, name: 'Трума' }, { id: 20, name: 'Тецаве' }, { id: 21, name: 'Ки Тиса' },
  { id: 22, name: 'Ваякгель' }, { id: 23, name: 'Пкудей' }, { id: 24, name: 'Ваикра' },
  { id: 25, name: 'Цав' }, { id: 26, name: 'Шмини' }, { id: 27, name: 'Тазриа' },
  { id: 28, name: 'Мецора' }, { id: 29, name: 'Ахарей Мот' }, { id: 30, name: 'Кдошим' },
  { id: 31, name: 'Эмор' }, { id: 32, name: 'Бегар' }, { id: 33, name: 'Бехукотай' },
  { id: 34, name: 'Бемидбар' }, { id: 35, name: 'Насо' }, { id: 36, name: 'Бегаалотха' },
  { id: 37, name: 'Шлах' }, { id: 38, name: 'Корах' }, { id: 39, name: 'Хукат' },
  { id: 40, name: 'Балак' }, { id: 41, name: 'Пинхас' }, { id: 42, name: 'Матот' },
  { id: 43, name: 'Масэй' }, { id: 44, name: 'Дварим' }, { id: 45, name: 'Ваэтханан' },
  { id: 46, name: 'Экев' }, { id: 47, name: 'Рээ' }, { id: 48, name: 'Шофтим' },
  { id: 49, name: 'Ки Тецэ' }, { id: 50, name: 'Ки Таво' }, { id: 51, name: 'Ницавим' },
  { id: 52, name: 'Ваелех' }, { id: 53, name: 'Гаазину' }, { id: 54, name: 'Везот Габраха' }
];

const PAGE_SIZE = 20;

const previewCopy: Record<Lang, { preview: string; generating: string; noPreview: string; openPdf: string; previewFailed: string }> = {
  ru: {
    preview: 'Превью документа',
    generating: 'Создаю превью...',
    noPreview: 'Превью пока нет',
    openPdf: 'Открыть PDF',
    previewFailed: 'Не удалось создать превью',
  },
  en: {
    preview: 'Document preview',
    generating: 'Generating preview...',
    noPreview: 'No preview yet',
    openPdf: 'Open PDF',
    previewFailed: 'Failed to generate preview',
  },
  he: {
    preview: 'תצוגה מקדימה של המסמך',
    generating: 'יוצר תצוגה מקדימה...',
    noPreview: 'עדיין אין תצוגה מקדימה',
    openPdf: 'פתח PDF',
    previewFailed: 'לא ניתן ליצור תצוגה מקדימה',
  },
  uk: {
    preview: 'Прев’ю документа',
    generating: 'Створюю прев’ю...',
    noPreview: 'Прев’ю поки що немає',
    openPdf: 'Відкрити PDF',
    previewFailed: 'Не вдалося створити прев’ю',
  },
};

const parshaNameToId: Record<string, number> = {
  'Bereishit': 1, 'Noach': 2, 'Lech-Lecha': 3, 'Vayera': 4, 'Chayei Sarah': 5,
  'Toldot': 6, 'Vayetzei': 7, 'Vayishlach': 8, 'Vayeshev': 9, 'Miketz': 10,
  'Vayigash': 11, 'Vayechi': 12, 'Shemot': 13, 'Vaera': 14, 'Bo': 15,
  'Beshalach': 16, 'Yitro': 17, 'Mishpatim': 18, 'Terumah': 19, 'Tetzaveh': 20,
  'Ki Tisa': 21, 'Vayakhel': 22, 'Pekudei': 23, 'Vayikra': 24, 'Tzav': 25,
  'Shmini': 26, 'Tazria': 27, 'Metzora': 28, 'Achrei Mot': 29, 'Kedoshim': 30,
  'Emor': 31, 'Behar': 32, 'Bechukotai': 33, 'Bamidbar': 34, 'Nasso': 35,
  "Beha'alotcha": 36, "Sh'lach": 37, 'Korach': 38, 'Chukat': 39, 'Balak': 40,
  'Pinchas': 41, 'Matot': 42, 'Masei': 43, 'Devarim': 44, 'Vaetchanan': 45,
  'Eikev': 46, "Re'eh": 47, 'Shoftim': 48, 'Ki Teitzei': 49, 'Ki Tavo': 50,
  'Nitzavim': 51, 'Vayeilech': 52, "Ha'azinu": 53, 'Vezot Habracha': 54
};

const combinedParshaNameToId: Record<string, number> = {
  'Vayakhel-Pekudei': 22,
  'Tazria-Metzora': 27,
  'Achrei Mot-Kedoshim': 29,
  'Behar-Bechukotai': 32,
  'Chukat-Balak': 39,
  'Matot-Masei': 42,
  'Nitzavim-Vayeilech': 51,
};

function resolveParshaId(rawTitle: string | undefined): number | null {
  if (!rawTitle) return null;
  const name = rawTitle.replace('Parashat ', '').replace(/\u2019/g, "'").trim();
  if (parshaNameToId[name]) return parshaNameToId[name];

  const aliasMap: Record<string, string> = {
    Shelach: "Sh'lach",
    Shlach: "Sh'lach",
    Haazinu: "Ha'azinu",
    Vayetze: 'Vayetzei',
  };
  const alias = aliasMap[name];
  if (alias && parshaNameToId[alias]) return parshaNameToId[alias];
  if (combinedParshaNameToId[name]) return combinedParshaNameToId[name];
  return null;
}

function extractGoogleDriveId(url: string): string | null {
  const patterns = [/\/file\/d\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/, /\/d\/([a-zA-Z0-9_-]+)/];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function generateGdriveThumbnailUrl(pdfUrl: string): string | null {
  const fileId = extractGoogleDriveId(pdfUrl);
  return fileId ? 'https://drive.google.com/thumbnail?id=' + fileId + '&sz=w800' : null;
}

function generateUniqueFilename(originalName: string, ext: string = 'jpg'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const clean = originalName
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9\-_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50);
  return `${clean || 'preview'}-${timestamp}-${random}.${ext}`;
}

function buildHebcalParshaUrl(yy: number, mm: number): string {
  return 'https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=' + yy + '&month=' + mm + '&ss=off&mf=off&c=off&s=on';
}

async function generateThumbnailFromPdfUrl(pdfUrl: string): Promise<Blob | null> {
  try {
    const res = await fetch(pdfUrl);
    if (!res.ok) return null;

    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + pdfjsLib.version + '/pdf.worker.min.mjs';

    const arrayBuffer = await res.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    await page.render({ canvasContext: ctx, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.82);
    });
  } catch (error) {
    console.error('Preview generation error:', error);
    return null;
  }
}

type FilterMode = 'all' | 'review' | 'complete';

// Проверка: документ заполнен полностью?
function isDocComplete(doc: any): boolean {
  return !!(doc.publication_id && doc.issue_number && doc.gregorian_date && doc.parsha_id);
}

// Какие поля не заполнены
function getMissingFields(doc: any, lang: Lang): string[] {
  const missing: string[] = [];
  if (!doc.publication_id) missing.push(t('admin.publication', lang));
  if (!doc.issue_number) missing.push(t('admin.number', lang));
  if (!doc.gregorian_date) missing.push(t('admin.date', lang));
  if (!doc.parsha_id) missing.push(t('admin.parsha', lang));
  return missing;
}

export default function AdminDocuments() {
  const { lang } = useLanguage();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [editingPreviewUrl, setEditingPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [pubSearch, setPubSearch] = useState('');
  const [pubDropdown, setPubDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [publications, setPublications] = useState<{ id: string; title_ru?: string | null; title_en?: string | null; title_he?: string | null }[]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [reviewCount, setReviewCount] = useState(0);

  // Загрузить публикации для dropdown
  useEffect(() => {
    async function fetchPublications() {
      const { data } = await supabase
        .from('publications')
        .select('id, title_ru, title_en, title_he')
        .eq('is_active', true)
        .order('title_ru', { ascending: true });
      setPublications(data || []);
    }
    fetchPublications();
  }, []);

  // Подсчитать количество документов "На проверке"
  useEffect(() => {
    async function countReview() {
      // Документы где хотя бы одно из ключевых полей пустое
      const { count } = await supabase
        .from('issues')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
        .or('publication_id.is.null,issue_number.is.null,gregorian_date.is.null,parsha_id.is.null');
      setReviewCount(count || 0);
    }
    countReview();
  }, [documents]);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('issues')
      .select('id, title, issue_number, parsha_id, publication_id, gregorian_date, thumbnail_url, pdf_url, is_active, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (search) query = query.ilike('title', `%${search}%`);

    // Фильтрация по режиму
    if (filterMode === 'review') {
      query = query.eq('is_active', true).or('publication_id.is.null,issue_number.is.null,gregorian_date.is.null,parsha_id.is.null');
    } else if (filterMode === 'complete') {
      query = query.eq('is_active', true).not('publication_id', 'is', null).not('issue_number', 'is', null).not('gregorian_date', 'is', null).not('parsha_id', 'is', null);
    }

    const { data, count } = await query;
    setDocuments(data || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [page, search, filterMode]);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  const persistPreviewUrl = useCallback(async (docId: string, previewUrl: string) => {
    const { error } = await supabase.from('issues').update({ thumbnail_url: previewUrl }).eq('id', docId);
    if (!error) {
      setDocuments((prev) => prev.map((doc) => doc.id === docId ? { ...doc, thumbnail_url: previewUrl } : doc));
      setEditingDoc((prev: any) => prev && prev.id === docId ? { ...prev, thumbnail_url: previewUrl } : prev);
    }
  }, []);

  const ensurePreviewForDoc = useCallback(async (doc: any) => {
    if (!doc) return;

    setPreviewError(null);

    if (doc.thumbnail_url) {
      setEditingPreviewUrl(doc.thumbnail_url);
      return;
    }

    if (!doc.pdf_url) {
      setEditingPreviewUrl(null);
      return;
    }

    const gdrivePreview = generateGdriveThumbnailUrl(doc.pdf_url);
    if (gdrivePreview) {
      setEditingPreviewUrl(gdrivePreview);
      await persistPreviewUrl(doc.id, gdrivePreview);
      return;
    }

    setPreviewLoading(true);
    try {
      const blob = await generateThumbnailFromPdfUrl(doc.pdf_url);
      if (!blob) {
        setEditingPreviewUrl(null);
        setPreviewError(previewCopy[lang].previewFailed);
        return;
      }

      const filePath = 'thumbnails/' + generateUniqueFilename(doc.title || 'document-preview');
      const { error: uploadError } = await supabase.storage.from('pdfs').upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: false,
      });

      if (uploadError) {
        setPreviewError(previewCopy[lang].previewFailed);
        return;
      }

      const { data: urlData } = supabase.storage.from('pdfs').getPublicUrl(filePath);
      const previewUrl = urlData.publicUrl;
      setEditingPreviewUrl(previewUrl);
      await persistPreviewUrl(doc.id, previewUrl);
    } catch (error) {
      console.error('Failed to ensure preview:', error);
      setPreviewError(previewCopy[lang].previewFailed);
    } finally {
      setPreviewLoading(false);
    }
  }, [lang, persistPreviewUrl]);

  const autofillParshaFromDate = useCallback(async (dateValue: string) => {
    if (!dateValue) {
      setEditingDoc((prev: any) => prev ? { ...prev, gregorian_date: dateValue } : prev);
      return;
    }

    setEditingDoc((prev: any) => prev ? { ...prev, gregorian_date: dateValue } : prev);

    try {
      const [year, month, day] = dateValue.split('-').map(Number);
      const res = await fetch(buildHebcalParshaUrl(year, month));
      if (!res.ok) return;
      const data = await res.json();
      const inputDate = new Date(year, month - 1, day);
      inputDate.setHours(0, 0, 0, 0);

      const upcoming = data.items
        ?.filter((item: any) => item.category === 'parashat')
        ?.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
        ?.find((item: any) => {
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= inputDate;
        });

      const parshaId = resolveParshaId(upcoming?.title);
      if (parshaId) {
        setEditingDoc((prev: any) => prev ? { ...prev, gregorian_date: dateValue, parsha_id: parshaId } : prev);
      }
    } catch (error) {
      console.error('Parsha autofill error:', error);
    }
  }, []);

  useEffect(() => {
    if (!editingDoc) {
      setEditingPreviewUrl(null);
      setPreviewLoading(false);
      setPreviewError(null);
      return;
    }

    ensurePreviewForDoc(editingDoc);
  }, [editingDoc, ensurePreviewForDoc]);

  const handleSave = async () => {
    if (!editingDoc) return;
    setSaving(true);
    setSaveError(null);
    const { data, error } = await supabase.from('issues').update({
      title: editingDoc.title,
      issue_number: editingDoc.issue_number,
      parsha_id: editingDoc.parsha_id || null,
      publication_id: editingDoc.publication_id || null,
      gregorian_date: editingDoc.gregorian_date || null,
      is_active: editingDoc.is_active,
    }).eq('id', editingDoc.id).select('id');

    if (error) {
      const msg = error.message || '';
      if (error.code === '23505' || msg.includes('uq_issues_active_pub_issue_number')) {
        setSaveError(t('admin.error', lang) + ' Duplicate issue number');
      } else if (error.code === '42501') {
        setSaveError(t('admin.error', lang) + ' RLS permission denied');
      } else {
        setSaveError(t('admin.error', lang) + ' ' + msg);
      }
      setSaving(false);
      return;
    }

    if (!data || data.length === 0) {
      setSaveError(t('admin.error', lang) + ' RLS block');
      setSaving(false);
      return;
    }

    setEditingDoc(null);
    await fetchDocuments();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.hide', lang) + '?')) return;
    await supabase.from('issues').update({ is_active: false }).eq('id', id);
    fetchDocuments();
  };

  const getPublicationName = (pubId: string | null) => {
    if (!pubId) return null;
    const p = publications.find(p => p.id === pubId);
    return p ? (p.title_ru || p.title_en || p.title_he || '—') : null;
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.documents', lang)}</h1>
        <span className="text-gray-500">{totalCount.toLocaleString()} {t('admin.total', lang)}</span>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setFilterMode('all'); setPage(0); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterMode === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
        >
          {t('admin.all', lang)}
        </button>
        <button
          onClick={() => { setFilterMode('review'); setPage(0); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filterMode === 'review' ? 'bg-amber-500 text-white' : 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50'}`}
        >
          <AlertCircle size={16} />
          {t('admin.onReview', lang)}
          {reviewCount > 0 && (
            <span className={`px-2 py-0.5 text-xs rounded-full ${filterMode === 'review' ? 'bg-white/30' : 'bg-amber-100'}`}>
              {reviewCount.toLocaleString()}
            </span>
          )}
        </button>
        <button
          onClick={() => { setFilterMode('complete'); setPage(0); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filterMode === 'complete' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-green-300 hover:bg-green-50'}`}
        >
          <CheckCircle size={16} />
          {t('admin.filled', lang)}
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} placeholder={t('admin.searchPlaceholder', lang)} className="w-full pl-12 pr-4 py-3 border rounded-xl"/>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.document', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.publication', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.number', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.date', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.parsha', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.status', lang)}</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">{t('admin.actionsCol', lang)}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center">{t('loading', lang)}</td></tr>
            ) : documents.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                {filterMode === 'review' ? t('admin.allFilled', lang) : filterMode === 'complete' ? t('admin.noFilled', lang) : t('admin.noDocuments', lang)}
              </td></tr>
            ) : documents.map((doc) => {
              const missing = getMissingFields(doc, lang);
              const complete = missing.length === 0;
              const pubName = getPublicationName(doc.publication_id);

              return (
                <tr key={doc.id} className={`hover:bg-gray-50 ${!doc.is_active ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {doc.thumbnail_url ? <Image src={doc.thumbnail_url} alt="" width={40} height={56} className="object-cover rounded"/> : <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center"><FileText className="text-gray-400" size={16}/></div>}
                      <span className="font-medium max-w-xs truncate">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {pubName ? (
                      <span className="text-sm text-gray-600">{pubName}</span>
                    ) : (
                      <span className="text-sm text-red-400 italic">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {doc.issue_number ? (
                      <span className="text-gray-600">{doc.issue_number}</span>
                    ) : (
                      <span className="text-red-400 italic">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {doc.gregorian_date ? (
                      <span className="text-gray-600 text-sm">{new Date(doc.gregorian_date).toLocaleDateString(lang === 'he' ? 'he-IL' : lang === 'en' ? 'en-US' : lang === 'uk' ? 'uk-UA' : 'ru-RU')}</span>
                    ) : (
                      <span className="text-red-400 italic">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {doc.parsha_id ? (
                      <span className="text-gray-600">{PARSHAS.find(p => p.id === doc.parsha_id)?.name}</span>
                    ) : (
                      <span className="text-red-400 italic">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!doc.is_active ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">{t('admin.hiddenStatus', lang)}</span>
                    ) : complete ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">✓ {t('admin.filled', lang)}</span>
                    ) : (
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">{t('admin.onReview', lang)}</span>
                        <p className="text-xs text-gray-400 mt-1">{t('admin.notFilled', lang)} {missing.join(', ')}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => { setEditingDoc({...doc}); setPubSearch(''); setPubDropdown(false); setSaveError(null); setEditingPreviewUrl(doc.thumbnail_url || null); setPreviewError(null); }} className="p-2 text-gray-400 hover:text-primary-600"><Edit2 size={18}/></button>
                    <button onClick={() => handleDelete(doc.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <span className="text-sm text-gray-500">{t('admin.page', lang)} {page + 1} {t('admin.of', lang)} {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-2 rounded border disabled:opacity-50"><ChevronLeft size={20}/></button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-2 rounded border disabled:opacity-50"><ChevronRight size={20}/></button>
            </div>
          </div>
        )}
      </div>

      {/* Модалка редактирования */}
      {editingDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-5xl mx-4 max-h-[92vh] overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{t('admin.edit', lang)}</h2>
                {getMissingFields(editingDoc, lang).length > 0 && (
                  <p className="text-sm text-amber-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {t('admin.notFilled', lang)} {getMissingFields(editingDoc, lang).join(', ')}
                  </p>
                )}
              </div>
              <button onClick={() => { setEditingDoc(null); setPubDropdown(false); }}><X size={24}/></button>
            </div>
            <div className="grid gap-0 lg:grid-cols-[320px_1fr] max-h-[calc(92vh-160px)] overflow-y-auto">
              <div className="border-b lg:border-b-0 lg:border-r bg-gray-50 p-6">
                <p className="text-sm font-semibold text-gray-900 mb-4">{previewCopy[lang].preview}</p>
                <div className="rounded-xl border bg-white overflow-hidden aspect-[3/4] flex items-center justify-center">
                  {previewLoading ? (
                    <div className="text-sm text-gray-500">{previewCopy[lang].generating}</div>
                  ) : editingPreviewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={editingPreviewUrl} alt={editingDoc.title || 'preview'} className="w-full h-full object-contain bg-white" />
                  ) : (
                    <div className="text-center px-6">
                      <FileText className="mx-auto text-gray-300 mb-3" size={36} />
                      <p className="text-sm text-gray-500">{previewCopy[lang].noPreview}</p>
                    </div>
                  )}
                </div>
                {previewError && <p className="mt-3 text-sm text-amber-700">{previewError}</p>}
                {editingDoc.pdf_url && (
                  <a
                    href={editingDoc.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
                  >
                    <FileText size={16} />
                    {previewCopy[lang].openPdf}
                  </a>
                )}
              </div>
              <div className="p-6 space-y-4">
                {saveError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {saveError}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">{t('admin.issueTitle', lang)}</label>
                  <input type="text" value={editingDoc.title} onChange={(e) => setEditingDoc({...editingDoc, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    {t('admin.publication', lang)}
                    {!editingDoc.publication_id && <span className="text-amber-500 ml-1">⚠</span>}
                  </label>
                  <input
                    type="text"
                    value={pubSearch || (editingDoc.publication_id ? (() => { const p = publications.find(p => p.id === editingDoc.publication_id); return p?.title_ru || p?.title_en || p?.title_he || ''; })() : '')}
                    onChange={(e) => { setPubSearch(e.target.value); setPubDropdown(true); if (!e.target.value) setEditingDoc({...editingDoc, publication_id: null}); }}
                    onFocus={() => setPubDropdown(true)}
                    placeholder={t('admin.searchPlaceholder', lang)}
                    className={`w-full px-4 py-2 border rounded-lg ${!editingDoc.publication_id ? 'border-amber-300 bg-amber-50' : ''}`}
                  />
                  {editingDoc.publication_id && <button type="button" onClick={() => { setEditingDoc({...editingDoc, publication_id: null}); setPubSearch(''); }} className="absolute right-3 top-8 text-gray-400 hover:text-red-500"><X size={16}/></button>}
                  {pubDropdown && (
                    <div className="absolute z-10 left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {publications.filter(p => {
                        if (!pubSearch) return true;
                        const name = (p.title_ru || p.title_en || p.title_he || '').toLowerCase();
                        return name.includes(pubSearch.toLowerCase());
                      }).map(p => (
                        <button key={p.id} type="button" onClick={() => { setEditingDoc({...editingDoc, publication_id: p.id}); setPubSearch(''); setPubDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-50 transition-colors ${editingDoc.publication_id === p.id ? 'bg-primary-50 font-medium text-primary-700' : 'text-gray-700'}`}>
                          {p.title_ru || p.title_en || p.title_he || '—'}
                        </button>
                      ))}
                      {publications.filter(p => { const name = (p.title_ru || p.title_en || p.title_he || '').toLowerCase(); return !pubSearch || name.includes(pubSearch.toLowerCase()); }).length === 0 && (
                        <p className="px-4 py-2 text-sm text-gray-400">{t('admin.notFound', lang)}</p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('admin.issueNumber', lang)}
                    {!editingDoc.issue_number && <span className="text-amber-500 ml-1">⚠</span>}
                  </label>
                  <input type="text" value={editingDoc.issue_number || ''} onChange={(e) => setEditingDoc({...editingDoc, issue_number: e.target.value})} className={`w-full px-4 py-2 border rounded-lg ${!editingDoc.issue_number ? 'border-amber-300 bg-amber-50' : ''}`}/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('admin.date', lang)}
                    {!editingDoc.gregorian_date && <span className="text-amber-500 ml-1">⚠</span>}
                  </label>
                  <input type="date" value={editingDoc.gregorian_date || ''} onChange={(e) => { void autofillParshaFromDate(e.target.value); }} className={`w-full px-4 py-2 border rounded-lg ${!editingDoc.gregorian_date ? 'border-amber-300 bg-amber-50' : ''}`}/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t('admin.parsha', lang)}
                    {!editingDoc.parsha_id && <span className="text-amber-500 ml-1">⚠</span>}
                  </label>
                  <select value={editingDoc.parsha_id || ''} onChange={(e) => setEditingDoc({...editingDoc, parsha_id: e.target.value ? parseInt(e.target.value) : null})} className={`w-full px-4 py-2 border rounded-lg ${!editingDoc.parsha_id ? 'border-amber-300 bg-amber-50' : ''}`}>
                    <option value="">—</option>
                    {PARSHAS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={editingDoc.is_active} onChange={(e) => setEditingDoc({...editingDoc, is_active: e.target.checked})}/>
                  <label>{t('admin.isActive', lang)}</label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setEditingDoc(null)} className="px-4 py-2 text-gray-600">{t('admin.cancelBtn', lang)}</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2">
                <Save size={18}/>{saving ? t('admin.savingBtn', lang) : t('admin.saveBtn', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
