'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader2, Check, AlertCircle, FileText, X, Link as LinkIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const SUPABASE_URL = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z2N4bXFndnhsdmJ4c3N6cWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTM2MDEsImV4cCI6MjA4NTIyOTYwMX0.1oNxdtjuXnBhqU2zpVGCt-JotNN3ZDMS6AH0OlvlYSY';

interface Publication { id: string; title_ru: string; }
interface Parsha { id: number; name_ru: string; order_num: number; }
interface Event { id: string; name_ru: string; }

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

function extractGoogleDriveId(url: string): string | null {
  const patterns = [/\/file\/d\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/, /\/d\/([a-zA-Z0-9_-]+)/];
  for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
  return null;
}

function generateGdriveThumbnailUrl(pdfUrl: string): string | null {
  const fileId = extractGoogleDriveId(pdfUrl);
  return fileId ? 'https://drive.google.com/thumbnail?id=' + fileId + '&sz=w400' : null;
}

const TRANSLIT: Record<string, string> = {
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y',
  'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
  'х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
  'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ё':'Yo','Ж':'Zh','З':'Z','И':'I','Й':'Y',
  'К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F',
  'Х':'Kh','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Shch','Ъ':'','Ы':'Y','Ь':'','Э':'E','Ю':'Yu','Я':'Ya',
  'є':'ye','і':'i','ї':'yi','ґ':'g','Є':'Ye','І':'I','Ї':'Yi','Ґ':'G',
  'א':'a','ב':'b','ג':'g','ד':'d','ה':'h','ו':'v','ז':'z','ח':'ch','ט':'t','י':'y',
  'כ':'k','ך':'k','ל':'l','מ':'m','ם':'m','נ':'n','ן':'n','ס':'s','ע':'a','פ':'p','ף':'p',
  'צ':'ts','ץ':'ts','ק':'k','ר':'r','ש':'sh','ת':'t',
};

function transliterate(str: string): string {
  return str.split('').map(c => TRANSLIT[c] ?? c).join('');
}

function generateUniqueFilename(originalName: string, ext: string = 'pdf'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const translitName = transliterate(originalName);
  const cleanName = translitName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9\-_]/g, '-').replace(/-+/g, '-').substring(0, 50);
  return (cleanName || 'doc') + '-' + timestamp + '-' + random + '.' + ext;
}

async function generateThumbnailFromPdf(file: File): Promise<Blob | null> {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + pdfjsLib.version + '/pdf.worker.min.mjs';
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    await page.render({ canvasContext: ctx, viewport }).promise;
    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.8);
    });
  } catch (err) {
    console.error('Thumbnail generation error:', err);
    return null;
  }
}

function buildHebcalConverterUrl(yy: number, mm: number, dd: number): string {
  return 'https://www.hebcal.com/converter?cfg=json&gy=' + yy + '&gm=' + mm + '&gd=' + dd + '&g2h=1';
}

function buildHebcalParshaUrl(yy: number, mm: number): string {
  return 'https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=' + yy + '&month=' + mm + '&ss=off&mf=off&c=off&s=on';
}

export default function AddPdfPage() {
  const router = useRouter();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [parshiot, setParshiot] = useState<Parsha[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [currentParshaId, setCurrentParshaId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState('');
  const [publicationId, setPublicationId] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [gregorianDate, setGregorianDate] = useState(new Date().toISOString().split('T')[0]);
  const [hebrewDate, setHebrewDate] = useState('');
  const [parshaId, setParshaId] = useState<number | null>(null);
  const [eventId, setEventId] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [autoThumbnail, setAutoThumbnail] = useState(true);
  const [description, setDescription] = useState('');
  const [pdfLanguage, setPdfLanguage] = useState('ru');

  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [generatingThumb, setGeneratingThumb] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Текущая парша — ближайший будущий Шаббат
  useEffect(() => {
    async function fetchCurrentParsha() {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const res = await fetch(buildHebcalParshaUrl(today.getFullYear(), today.getMonth() + 1));
        if (res.ok) {
          const data = await res.json();
          const upcoming = data.items
            ?.filter((item: any) => item.category === 'parashat')
            ?.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
            ?.find((item: any) => {
              const d = new Date(item.date);
              d.setHours(0, 0, 0, 0);
              return d >= today;
            });
          if (upcoming) {
            const name = upcoming.title?.replace('Parashat ', '');
            const id = parshaNameToId[name];
            if (id) { setCurrentParshaId(id); setParshaId(id); }
          }
        }
      } catch (err) { console.error('Error:', err); }
    }
    fetchCurrentParsha();
  }, []);

  // Конвертация даты + автоопределение парши
  useEffect(() => {
    async function convertDateAndParsha() {
      if (!gregorianDate) return;
      try {
        const [year, month, day] = gregorianDate.split('-');
        const yy = parseInt(year), mm = parseInt(month), dd = parseInt(day);

        // Еврейская дата
        const dateRes = await fetch(buildHebcalConverterUrl(yy, mm, dd));
        if (dateRes.ok) {
          const d = await dateRes.json();
          setHebrewDate(d.hd + ' ' + d.hm + ' ' + d.hy);
        }

        // Автоопределение парши
        const parshaRes = await fetch(buildHebcalParshaUrl(yy, mm));
        if (parshaRes.ok) {
          const data = await parshaRes.json();
          const inputDate = new Date(yy, mm - 1, dd);
          inputDate.setHours(0, 0, 0, 0);

          const upcoming = data.items
            ?.filter((item: any) => item.category === 'parashat')
            ?.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
            ?.find((item: any) => {
              const d = new Date(item.date);
              d.setHours(0, 0, 0, 0);
              return d >= inputDate;
            });

          if (upcoming) {
            const name = upcoming.title?.replace('Parashat ', '');
            const id = parshaNameToId[name];
            if (id) setParshaId(id);
          }
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
    convertDateAndParsha();
  }, [gregorianDate]);

  useEffect(() => {
    if (autoThumbnail && pdfUrl && uploadMode === 'url') {
      const thumb = generateGdriveThumbnailUrl(pdfUrl);
      if (thumb) setThumbnailUrl(thumb);
    }
  }, [pdfUrl, autoThumbnail, uploadMode]);

  useEffect(() => {
    Promise.all([
      fetch(SUPABASE_URL + '/rest/v1/publications?is_active=eq.true&order=title_ru&select=id,title_ru', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/parshiot?order=order_num&select=id,name_ru,order_num', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()),
      fetch(SUPABASE_URL + '/rest/v1/events?is_active=eq.true&order=name_ru&select=id,name_ru', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json())
    ]).then(([pubs, parshas, evts]) => {
      setPublications(pubs || []);
      if (currentParshaId && parshas) {
        const sorted = [...parshas].sort((a: Parsha, b: Parsha) => {
          if (a.id === currentParshaId) return -1;
          if (b.id === currentParshaId) return 1;
          return a.order_num - b.order_num;
        });
        setParshiot(sorted);
      } else { setParshiot(parshas || []); }
      setEvents(evts || []);
      setLoading(false);
    });
  }, [currentParshaId]);

  // Генерация превью при выборе файла
  useEffect(() => {
    if (!selectedFile) { setThumbnailPreview(null); return; }
    let cancelled = false;
    setGeneratingThumb(true);
    generateThumbnailFromPdf(selectedFile).then((blob) => {
      if (cancelled || !blob) { setGeneratingThumb(false); return; }
      const url = URL.createObjectURL(blob);
      setThumbnailPreview(url);
      setGeneratingThumb(false);
    });
    return () => { cancelled = true; };
  }, [selectedFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      if (!title) setTitle(file.name.replace(/\.pdf$/i, ''));
    } else { setError('Можно загружать только PDF файлы'); }
  }, [title]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') { setError('Можно загружать только PDF файлы'); return; }
      setSelectedFile(file);
      if (!title) setTitle(file.name.replace(/\.pdf$/i, ''));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setThumbnailPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadFile = async (file: File): Promise<string> => {
    const filename = generateUniqueFilename(file.name, 'pdf');
    const filePath = 'uploads/' + filename;
    setUploading(true); setUploadProgress(0);
    const progressInterval = setInterval(() => { setUploadProgress(prev => Math.min(prev + 10, 90)); }, 200);
    const { error } = await supabase.storage.from('pdfs').upload(filePath, file, { contentType: 'application/pdf', upsert: false });
    clearInterval(progressInterval); setUploadProgress(100);
    if (error) { setUploading(false); throw new Error('Ошибка загрузки: ' + error.message); }
    const { data: urlData } = supabase.storage.from('pdfs').getPublicUrl(filePath);
    setUploading(false);
    return urlData.publicUrl;
  };

  const uploadThumbnail = async (blob: Blob, originalName: string): Promise<string> => {
    const filename = generateUniqueFilename(originalName, 'jpg');
    const filePath = 'thumbnails/' + filename;
    const { error } = await supabase.storage.from('pdfs').upload(filePath, blob, { contentType: 'image/jpeg', upsert: false });
    if (error) throw new Error('Ошибка загрузки превью: ' + error.message);
    const { data: urlData } = supabase.storage.from('pdfs').getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null); setSubmitting(true);
    if (!title) { setError('Укажите название'); setSubmitting(false); return; }
    if (uploadMode === 'file' && !selectedFile) { setError('Выберите PDF файл'); setSubmitting(false); return; }
    if (uploadMode === 'url' && !pdfUrl) { setError('Укажите ссылку на PDF'); setSubmitting(false); return; }

    try {
      let finalPdfUrl = pdfUrl;
      let finalThumbnailUrl = thumbnailUrl;

      if (uploadMode === 'file' && selectedFile) {
        finalPdfUrl = await uploadFile(selectedFile);
        if (thumbnailPreview) {
          try {
            const thumbBlob = await generateThumbnailFromPdf(selectedFile);
            if (thumbBlob) { finalThumbnailUrl = await uploadThumbnail(thumbBlob, selectedFile.name); }
          } catch (err) { console.error('Thumbnail upload error:', err); }
        }
      }

      const res = await fetch(SUPABASE_URL + '/rest/v1/issues', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          title,
          description: description || null,
          publication_id: publicationId || null,
          issue_number: issueNumber || null,
          gregorian_date: gregorianDate || null,
          parsha_id: parshaId || null,
          language: pdfLanguage,
          event_id: eventId || null,
          pdf_url: finalPdfUrl,
          thumbnail_url: finalThumbnailUrl || null,
          is_active: true
        })
      });

      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Ошибка сохранения'); }
      const savedData = await res.json();
      if (publicationId) {
        try {
          const pubName = publications.find(p => p.id === publicationId)?.title_ru || title;
          await fetch('/api/notify-subscribers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publication_id: publicationId, pub_title: pubName, issue_title: title, pdf_url: finalPdfUrl, doc_id: savedData?.[0]?.id })
          });
        } catch (e) { console.warn('Notify failed:', e); }
      }
      setSuccess(true);
      setTimeout(() => router.push('/catalog'), 2000);
    } catch (err: any) { setError(err.message); } finally { setSubmitting(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <Loader2 className="animate-spin text-primary-600" size={32} />
    </div>
  );

  if (success) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <Check size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Материал добавлен!</h2>
        <p className="text-gray-600">Перенаправление в каталог...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6">
          <ArrowLeft size={20} /> Назад в каталог
        </Link>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Добавить PDF материал</h1>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle size={20} />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например: Шомрей Шабос №805 Мишпатим" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Публикация (издание)</label>
              <select value={publicationId} onChange={(e) => setPublicationId(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white">
                <option value="">— Выберите публикацию —</option>
                {publications.map(p => <option key={p.id} value={p.id}>{p.title_ru}</option>)}
              </select>
              <Link href="/add-publication" className="text-sm text-primary-600 hover:underline mt-1 inline-block">+ Создать новую публикацию</Link>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Номер выпуска (опционально)</label>
              <input type="text" value={issueNumber} onChange={(e) => setIssueNumber(e.target.value)} placeholder="805" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата выхода</label>
                <input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Еврейская дата</label>
                <input type="text" value={hebrewDate} readOnly className="w-full px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-600" placeholder="Авто-конвертация" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Недельная глава</label>
              <select value={parshaId || ''} onChange={(e) => setParshaId(e.target.value ? Number(e.target.value) : null)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white">
                <option value="">— Не указана —</option>
                {parshiot.map(p => (
                  <option key={p.id} value={p.id}>{p.name_ru}{p.id === currentParshaId ? ' (текущая)' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Событие / Праздник (опционально)</label>
              <select value={eventId} onChange={(e) => setEventId(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white">
                <option value="">— Не указано —</option>
                {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name_ru}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Язык материала</label>
              <select value={pdfLanguage} onChange={(e) => setPdfLanguage(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white">
                <option value="ru">Русский</option>
                <option value="he">Иврит</option>
                <option value="en">English</option>
                <option value="uk">Українська</option>
              </select>
            </div>

            {/* PDF файл */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PDF файл *</label>
              <div className="flex gap-2 mb-3">
                <button type="button" onClick={() => setUploadMode('file')} className={'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + (uploadMode === 'file' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
                  <Upload size={16} /> Загрузить файл
                </button>
                <button type="button" onClick={() => setUploadMode('url')} className={'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + (uploadMode === 'url' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
                  <LinkIcon size={16} /> Вставить ссылку
                </button>
              </div>

              {uploadMode === 'file' ? (
                <>
                  {!selectedFile ? (
                    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
                      className={'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ' + (isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50')}>
                      <Upload className={'mx-auto mb-3 ' + (isDragging ? 'text-primary-500' : 'text-gray-400')} size={40} />
                      <p className="text-gray-700 font-medium mb-1">{isDragging ? 'Отпустите файл' : 'Перетащите PDF сюда'}</p>
                      <p className="text-sm text-gray-500">или <span className="text-primary-600 underline">выберите файл</span> с компьютера</p>
                      <p className="text-xs text-gray-400 mt-2">Только PDF, до 50 MB</p>
                      <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" onChange={handleFileSelect} className="hidden" />
                    </div>
                  ) : (
                    <div className="border rounded-xl p-4 bg-green-50 border-green-200">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
                          {generatingThumb ? (
                            <div className="w-full h-full flex items-center justify-center"><Loader2 className="animate-spin text-gray-400" size={16} /></div>
                          ) : thumbnailPreview ? (
                            <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><FileText className="text-red-400" size={24} /></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p>
                          {generatingThumb && <p className="text-xs text-primary-600 mt-1">Генерация превью...</p>}
                          {thumbnailPreview && !generatingThumb && <p className="text-xs text-green-600 mt-1">Превью создано ✓</p>}
                        </div>
                        {uploading ? (
                          <div className="w-20">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-primary-600 rounded-full transition-all duration-300" style={{ width: uploadProgress + '%' }} />
                            </div>
                            <p className="text-xs text-gray-500 text-center mt-1">{uploadProgress}%</p>
                          </div>
                        ) : (
                          <button type="button" onClick={removeFile} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><X size={20} /></button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <input type="url" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} placeholder="https://drive.google.com/file/d/..." className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
                  <p className="text-xs text-gray-500 mt-1">Вставьте ссылку на PDF с Google Drive, Dropbox или другого хостинга</p>
                </div>
              )}
            </div>

            {uploadMode === 'url' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Превью (обложка)</label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={autoThumbnail} onChange={(e) => setAutoThumbnail(e.target.checked)} className="rounded" />
                    Авто из Google Drive
                  </label>
                </div>
                <div className="flex gap-3">
                  <input type="url" value={thumbnailUrl} onChange={(e) => { setThumbnailUrl(e.target.value); setAutoThumbnail(false); }} placeholder="https://... (URL картинки)" className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
                  {thumbnailUrl && (
                    <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание (опционально)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Краткое описание содержимого..." className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none" />
            </div>

            <button type="submit" disabled={submitting || uploading} className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {submitting || uploading ? (
                <><Loader2 className="animate-spin" size={20} />{uploading ? 'Загрузка файла...' : 'Сохранение...'}</>
              ) : (
                <><Upload size={20} />Добавить материал</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
