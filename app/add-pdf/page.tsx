'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader2, Check, AlertCircle, FileText, X, Link as LinkIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Publication { id: string; title_ru?: string | null; title_en?: string | null; title_he?: string | null; }
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
  const [pubSearch, setPubSearch] = useState('');
  const [pubDropdownOpen, setPubDropdownOpen] = useState(false);

  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [generatingThumb, setGeneratingThumb] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pubDropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pubDropdownRef.current && !pubDropdownRef.current.contains(e.target as Node)) {
        setPubDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      fetch(SUPABASE_URL + '/rest/v1/publications?is_active=eq.true&order=title_ru&select=id,title_ru,title_en,title_he', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()),
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
      // Get current user for uploaded_by
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError('Необходимо войти в систему'); setSubmitting(false); return; }

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

      const { data: { session } } = await supabase.auth.getSession();
      const authToken = session?.access_token || SUPABASE_KEY;

      const res = await fetch(SUPABASE_URL + '/rest/v1/issues', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + authToken,
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
          uploaded_by: user.id,
          is_active: true
        })
      });

      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Ошибка сохранения'); }
      const savedData = await res.json();
      if (publicationId) {
        try {
          const pub = publications.find(p => p.id === publicationId);
          const pubName = (pub?.title_ru || pub?.title_en || pub?.title_he) || title;
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Serif+4:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .lib-card { background: linear-gradient(145deg, #fffdf7 0%, #faf6ee 100%); border: 2px solid #c9b896; border-radius: 20px; position: relative; overflow: hidden; }
        .lib-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #1e3a6e 0%, #2c5f8a 30%, #b8860b 50%, #2c5f8a 70%, #1e3a6e 100%); }
        .lib-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #1e3a6e 0%, #2c5f8a 30%, #b8860b 50%, #2c5f8a 70%, #1e3a6e 100%); }
        .f-label { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #a09580; margin-bottom: 6px; display: block; }
        .f-input { border: 1px solid #e0d8c8; border-radius: 8px; padding: 9px 14px; font-family: 'Source Serif 4', Georgia, serif; background: white; outline: none; width: 100%; transition: border-color 0.2s; font-size: 0.95rem; color: #2c2416; }
        .f-input:focus { border-color: #b8860b; box-shadow: 0 0 0 2px rgba(184,134,11,0.08); }
        .f-input::placeholder { color: #c9b896; }
        .f-select { border: 1px solid #e0d8c8; border-radius: 8px; padding: 9px 14px; font-family: 'Source Serif 4', Georgia, serif; background: white; outline: none; width: 100%; cursor: pointer; font-size: 0.95rem; color: #2c2416; appearance: auto; }
        .f-select:focus { border-color: #b8860b; }
        .gold-submit { background: linear-gradient(135deg, #b8860b, #d4a012); color: white; font-family: 'Source Serif 4', Georgia, serif; font-weight: 600; transition: all 0.3s; border: none; }
        .gold-submit:hover { box-shadow: 0 4px 16px rgba(184,134,11,0.25); transform: translateY(-1px); }
        .gold-submit:disabled { opacity: 0.5; transform: none; box-shadow: none; }
        .watermark-add { position: absolute; right: 20px; top: 40%; transform: translateY(-50%) rotate(-15deg); font-family: 'Playfair Display', serif; font-size: 7rem; font-weight: 800; color: rgba(30,58,110,0.03); pointer-events: none; }
        .section-divider { height: 1px; background: linear-gradient(90deg, transparent, #e0d8c8, transparent); margin: 8px 0; }
      `}</style>
      <div className="max-w-2xl mx-auto px-4 py-10" style={{ minHeight: '100vh' }}>
        <Link href="/catalog" className="inline-flex items-center gap-2 mb-6 text-sm hover:opacity-80 transition-opacity" style={{ color: '#8a7d6b', fontFamily: "'Source Serif 4', serif" }}>
          <ArrowLeft size={16} /> Вернуться в каталог
        </Link>
        <div className="lib-card p-8 pt-10 pb-10 relative">
          <div className="watermark-add">+</div>
          <div className="text-center mb-6">
            <p className="f-label" style={{ marginBottom: '4px', textAlign: 'center' }}>Карточка нового материала · ShabbatHub Library</p>
            <div className="w-16 h-[1px] mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #b8860b, transparent)' }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#1e3a6e', marginTop: '12px' }}>Добавить материал</h1>
          </div>
          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', fontFamily: "'Source Serif 4', serif" }}>
              <AlertCircle size={16} />{error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="f-label">Название *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например: Шомрей Шабос №805 Мишпатим" className="f-input" required />
            </div>
            <div className="section-divider" />
            <div ref={pubDropdownRef} style={{ position: 'relative' }}>
              <label className="f-label">Публикация (издание)</label>
              <input
                type="text"
                value={pubSearch || (publicationId ? (() => { const p = publications.find(p => p.id === publicationId); return p?.title_ru || p?.title_en || p?.title_he || ''; })() : '')}
                onChange={(e) => { setPubSearch(e.target.value); setPubDropdownOpen(true); if (!e.target.value) setPublicationId(''); }}
                onFocus={() => setPubDropdownOpen(true)}
                placeholder="Начните вводить название..."
                className="f-input"
                autoComplete="off"
              />
              {publicationId && (
                <button type="button" onClick={() => { setPublicationId(''); setPubSearch(''); }} style={{ position: 'absolute', right: '12px', top: '28px', color: '#a09580', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
              )}
              {pubDropdownOpen && (
                <div style={{ position: 'absolute', zIndex: 20, left: 0, right: 0, marginTop: '2px', background: 'white', border: '1px solid #e0d8c8', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', maxHeight: '200px', overflowY: 'auto' }}>
                  {publications.filter(p => {
                    if (!pubSearch) return true;
                    const name = (p.title_ru || p.title_en || p.title_he || '').toLowerCase();
                    return name.includes(pubSearch.toLowerCase());
                  }).map(p => (
                    <button key={p.id} type="button" onClick={() => { setPublicationId(p.id); setPubSearch(''); setPubDropdownOpen(false); }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 14px', fontSize: '0.95rem', fontFamily: "'Source Serif 4', Georgia, serif", color: publicationId === p.id ? '#b8860b' : '#2c2416', fontWeight: publicationId === p.id ? 600 : 400, background: publicationId === p.id ? '#faf6ee' : 'transparent', border: 'none', cursor: 'pointer' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#faf6ee')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = publicationId === p.id ? '#faf6ee' : 'transparent')}
                    >
                      {p.title_ru || p.title_en || p.title_he || '—'}
                    </button>
                  ))}
                  {publications.filter(p => { const name = (p.title_ru || p.title_en || p.title_he || '').toLowerCase(); return !pubSearch || name.includes(pubSearch.toLowerCase()); }).length === 0 && (
                    <p style={{ padding: '8px 14px', fontSize: '0.9rem', color: '#a09580', margin: 0 }}>Не найдено</p>
                  )}
                </div>
              )}
              <Link href="/add-publication" className="text-xs mt-1.5 inline-block hover:opacity-80" style={{ color: '#b8860b', fontFamily: "'Source Serif 4', serif" }}>+ Создать новую публикацию</Link>
            </div>
            <div>
              <label className="f-label">Номер выпуска (опц.)</label>
              <input type="text" value={issueNumber} onChange={(e) => setIssueNumber(e.target.value)} placeholder="805" className="f-input" />
            </div>
            <div className="section-divider" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="f-label">Дата выхода</label>
                <input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} className="f-input" />
              </div>
              <div>
                <label className="f-label">Еврейская дата</label>
                <input type="text" value={hebrewDate} readOnly className="f-input" style={{ background: '#faf6ee', color: '#8a7d6b' }} placeholder="Авто" />
              </div>
            </div>
            <div>
              <label className="f-label">Недельная глава</label>
              <select value={parshaId || ''} onChange={(e) => setParshaId(e.target.value ? Number(e.target.value) : null)} className="f-select">
                <option value="">— Не указана —</option>
                {parshiot.map(p => (
                  <option key={p.id} value={p.id}>{p.name_ru}{p.id === currentParshaId ? ' ✦' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="f-label">Событие / Праздник (опц.)</label>
              <select value={eventId} onChange={(e) => setEventId(e.target.value)} className="f-select">
                <option value="">— Не указано —</option>
                {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name_ru}</option>)}
              </select>
            </div>
            <div>
              <label className="f-label">Язык материала</label>
              <select value={pdfLanguage} onChange={(e) => setPdfLanguage(e.target.value)} className="f-select">
                <option value="ru">Русский</option>
                <option value="he">עברית (Иврит)</option>
                <option value="en">English</option>
                <option value="uk">Українська</option>
              </select>
            </div>
            <div className="section-divider" />
            {/* PDF файл */}
            <div>
              <label className="f-label">PDF файл *</label>
              <div className="flex gap-2 mb-3">
                <button type="button" onClick={() => setUploadMode('file')} className={'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors ' + (uploadMode === 'file' ? 'text-white' : '')} style={uploadMode === 'file' ? { background: 'linear-gradient(135deg, #1e3a6e, #2c5f8a)', fontFamily: "'Source Serif 4', serif", fontWeight: 600 } : { background: '#faf6ee', border: '1px solid #e0d8c8', color: '#8a7d6b', fontFamily: "'Source Serif 4', serif" }}>
                  <Upload size={15} /> Загрузить файл
                </button>
                <button type="button" onClick={() => setUploadMode('url')} className={'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors ' + (uploadMode === 'url' ? 'text-white' : '')} style={uploadMode === 'url' ? { background: 'linear-gradient(135deg, #1e3a6e, #2c5f8a)', fontFamily: "'Source Serif 4', serif", fontWeight: 600 } : { background: '#faf6ee', border: '1px solid #e0d8c8', color: '#8a7d6b', fontFamily: "'Source Serif 4', serif" }}>
                  <LinkIcon size={15} /> Вставить ссылку
                </button>
              </div>

              {uploadMode === 'file' ? (
                <>
                  {!selectedFile ? (
                    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl p-8 text-center cursor-pointer transition-all" style={{ border: isDragging ? '2px dashed #b8860b' : '2px dashed #e0d8c8', background: isDragging ? '#faf6ee' : '#fffdf7' }}>
                      <Upload className="mx-auto mb-3" size={36} style={{ color: isDragging ? '#b8860b' : '#c9b896' }} />
                      <p style={{ fontFamily: "'Source Serif 4', serif", color: '#2c2416', fontWeight: 500 }} className="mb-1">{isDragging ? 'Отпустите файл' : 'Перетащите PDF сюда'}</p>
                      <p className="text-sm" style={{ color: '#8a7d6b', fontFamily: "'Source Serif 4', serif" }}>или <span style={{ color: '#b8860b', textDecoration: 'underline' }}>выберите файл</span> с компьютера</p>
                      <p className="text-xs mt-2" style={{ color: '#c9b896' }}>Только PDF, до 50 MB</p>
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

            <button type="submit" disabled={submitting || uploading} className="gold-submit w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
              {submitting || uploading ? (
                <><Loader2 className="animate-spin" size={18} />{uploading ? 'Загрузка файла...' : 'Сохранение...'}</>
              ) : (
                <><Upload size={18} />Добавить в библиотеку</>
              )}
            </button>
          </form>
          <div className="text-center mt-6"><p className="f-label" style={{ fontSize: '0.55rem', textAlign: 'center' }}>ShabbatHub Digital Library · Формуляр загрузки</p></div>
        </div>
      </div>
    </div>
  );
}
