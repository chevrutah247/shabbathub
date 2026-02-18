'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, FileText, Loader2, ChevronLeft, ChevronRight, BookOpen, Filter, X, Scroll, Library, FolderOpen, Share2, Check } from 'lucide-react';
import SubscribeBlock from '@/components/SubscribeBlock';
import { useLanguage, Lang } from '@/lib/language-context';
import { t } from '@/lib/translations';
import { getPublicationIdsForCategory, categoryNames, getCategoryForPublication, orderedCategories } from '@/lib/category-mapping';
import { trackEvent } from '@/lib/analytics';
import { useAuth } from '@/lib/auth-context';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const PAGE_SIZE = 50;

interface Document { id: string; title: string; pdf_url: string; gregorian_date: string; publication_id: string; thumbnail_url: string; parsha_id: number; event_id: string; issue_number: string; }
interface Parsha { id: number; name_ru: string; name_en: string; order_num: number; }
interface Publication { id: string; title_ru?: string | null; title_en?: string | null; title_he?: string | null; }
interface PublicationFull { id: string; title_ru?: string | null; title_en?: string | null; title_he?: string | null; cover_image_url?: string | null; total_issues: number; frequency: string; primary_language: string; description_ru?: string | null; }
interface Event { id: string; name_ru: string; }
interface RecommendationIssue { id: string; title: string; pdf_url: string; thumbnail_url: string; gregorian_date: string; publication_id: string; parsha_id: number; event_id: string; issue_number: string; }

type ViewMode = 'issues' | 'publications';

function getGoogleDriveThumbFromPdfUrl(url?: string | null): string | null {
  if (!url) return null;
  if (!url.includes('drive.google.com') && !url.includes('docs.google.com')) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return 'https://drive.google.com/thumbnail?id=' + match[1] + '&sz=w600';
}

async function fetchLatestIssueThumbMap(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  const pageSize = 1000;
  let from = 0;
  let keepLoading = true;

  while (keepLoading) {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&order=created_at.desc&select=publication_id,thumbnail_url,pdf_url',
      { headers: { apikey: SUPABASE_KEY, Range: from + '-' + (from + pageSize - 1) } }
    );
    if (!res.ok) break;
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) break;

    for (const row of rows) {
      if (!row?.publication_id || map[row.publication_id]) continue;
      if (row.thumbnail_url && row.thumbnail_url.trim()) {
        map[row.publication_id] = row.thumbnail_url;
        continue;
      }
      const fallback = getGoogleDriveThumbFromPdfUrl(row.pdf_url);
      if (fallback) map[row.publication_id] = fallback;
    }

    if (rows.length < pageSize) keepLoading = false;
    from += pageSize;
    if (from > 50000) keepLoading = false;
  }

  return map;
}

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
  'Nitzavim': 51, 'Vayeilech': 52, "Ha'azinu": 53, 'Vezot Habracha': 54,
};

function formatDate(dateString: string | null, lang: Lang): string {
  if (!dateString) return '';
  const locale = lang === 'he' ? 'he-IL' : lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-US' : 'ru-RU';
  return new Date(dateString).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
}

function DocumentCard({ doc, currentParshaId, parshaMap, pubMap, eventMap, lang }: {
  doc: Document; currentParshaId: number | null; parshaMap: Record<number, string>; pubMap: Record<string, string>; eventMap: Record<string, string>; lang: Lang;
}) {
  const [imgError, setImgError] = useState(false);
  const parshaName = doc.parsha_id ? parshaMap[doc.parsha_id] : null;
  const pubName = doc.publication_id ? pubMap[doc.publication_id] : null;
  const eventName = doc.event_id ? eventMap[doc.event_id] : null;
  const infoParts: string[] = [];
  if (pubName) infoParts.push(pubName);
  if (doc.issue_number) infoParts.push('\u2116' + doc.issue_number);
  if (parshaName) infoParts.push(parshaName);
  if (eventName) infoParts.push(eventName);

  return (
    <article className="book-card group relative">
      <Link href={'/document/' + doc.id} className="block">
        <div className="book-cover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <div className="absolute inset-y-0 left-0 w-3 z-10" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)' }} />
          <div className="absolute inset-x-0 top-0 h-1/3 z-10 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,248,230,0.15) 0%, transparent 100%)' }} />
          {doc.thumbnail_url && !imgError ? (
            <img src={doc.thumbnail_url} alt={doc.title} loading="lazy" referrerPolicy="no-referrer" onError={() => setImgError(true)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(145deg, #d4a574 0%, #b8854a 50%, #96693a 100%)' }}>
              <BookOpen size={28} className="text-amber-100/60 mb-2" />
              <span className="text-amber-100/50 text-[10px] text-center px-3 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{doc.title?.substring(0, 40)}</span>
            </div>
          )}
          {doc.parsha_id === currentParshaId && (
            <div className="absolute top-2 right-2 z-20 px-2 py-1 rounded text-[10px] font-semibold text-amber-900" style={{ background: 'linear-gradient(135deg, #f5d280, #e8b84a)', boxShadow: '0 2px 8px rgba(200,160,60,0.4)' }}>
              {t('catalog.thisWeek', lang)}
            </div>
          )}
          <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors duration-300 z-10" />
        </div>
        <div className="mt-3 px-0.5">
          <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{doc.title}</h3>
          {infoParts.length > 0 && <p className="text-[11px] text-stone-500 mt-1 line-clamp-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{infoParts.join(' \u00b7 ')}</p>}
          {doc.gregorian_date && <p className="text-[10px] text-stone-400 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{formatDate(doc.gregorian_date, lang)}</p>}
        </div>
      </Link>
    </article>
  );
}

function PublicationCard({ pub, lang, onSelect, isExpanded }: { pub: PublicationFull; lang: Lang; onSelect?: (id: string) => void; isExpanded?: boolean }) {
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);
  const title = pub.title_ru || pub.title_en || pub.title_he || '—';
  const freqMap: Record<string, Record<string, string>> = {
    weekly: { ru: 'Еженедельно', en: 'Weekly', he: 'שבועי', uk: 'Щотижнево' },
    daily: { ru: 'Ежедневно', en: 'Daily', he: 'יומי', uk: 'Щоденно' },
    monthly: { ru: 'Ежемесячно', en: 'Monthly', he: 'חודשי', uk: 'Щомісячно' },
    irregular: { ru: 'Нерегулярно', en: 'Irregular', he: 'לא סדיר', uk: 'Нерегулярно' },
  };
  const freq = freqMap[pub.frequency]?.[lang] || freqMap[pub.frequency]?.['ru'] || '';

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.origin + '/publication/' + pub.id;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) { e.preventDefault(); onSelect(pub.id); }
  };

  return (
    <article className={'book-card group relative' + (isExpanded ? ' ring-2 ring-amber-400/60 rounded-lg' : '')}>
      <a href={'/publication/' + pub.id} onClick={handleClick} className="block cursor-pointer">
        <div className="book-cover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <div className="absolute inset-y-0 left-0 w-3 z-10" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)' }} />
          {pub.cover_image_url && !imgError ? (
            <img src={pub.cover_image_url} alt={title} loading="lazy" referrerPolicy="no-referrer" onError={() => setImgError(true)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(145deg, #1e3a6e 0%, #2c5282 50%, #1a365d 100%)' }}>
              <FolderOpen size={32} className="text-blue-200/50 mb-2" />
              <span className="text-blue-100/60 text-[10px] text-center px-3 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{title.substring(0, 40)}</span>
            </div>
          )}
          {pub.total_issues > 0 && (
            <div className="absolute bottom-2 right-2 z-20 px-2 py-1 rounded text-[10px] font-semibold text-white" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
              {pub.total_issues} {t('catalog.issuesCount', lang)}
            </div>
          )}
          <button
            onClick={handleShare}
            className="absolute top-2 right-2 z-20 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            title={t('nav.share', lang)}
          >
            {copied ? <Check size={14} className="text-green-300" /> : <Share2 size={14} className="text-white" />}
          </button>
          <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors duration-300 z-10 pointer-events-none" />
        </div>
        <div className="mt-3 px-0.5">
          <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</h3>
          {freq && <p className="text-[11px] text-stone-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{freq}</p>}
        </div>
      </a>
    </article>
  );
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const { user } = useAuth();
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const [documents, setDocuments] = useState<Document[]>([]);
  const [parshiot, setParshiot] = useState<Parsha[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [parshaMap, setParshaMap] = useState<Record<number, string>>({});
  const [pubMap, setPubMap] = useState<Record<string, string>>({});
  const [eventMap, setEventMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentParshaId, setCurrentParshaId] = useState<number | null>(null);
  const [selectedParsha, setSelectedParsha] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState<ViewMode>('publications');
  const [publicationsList, setPublicationsList] = useState<PublicationFull[]>([]);
  const [pubsLoading, setPubsLoading] = useState(false);
  const [pubsSearchInput, setPubsSearchInput] = useState('');
  const [selectedPubLangs, setSelectedPubLangs] = useState<string[]>([]);
  const [expandedPubId, setExpandedPubId] = useState<string | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<{ id: string; title: string; thumbnail_url: string; gregorian_date: string; issue_number: string }[]>([]);
  const [expandedLoading, setExpandedLoading] = useState(false);
  const [popularWeek, setPopularWeek] = useState<RecommendationIssue[]>([]);
  const [forYouIssues, setForYouIssues] = useState<RecommendationIssue[]>([]);

  const categoryParam = searchParams.get('category');
  const categoryPubIds = categoryParam ? getPublicationIdsForCategory(categoryParam) : null;
  const categoryName = categoryParam && categoryNames[categoryParam] ? (categoryNames[categoryParam][lang] || categoryNames[categoryParam]['ru']) : null;

  useEffect(() => {
    setSelectedPubLangs([]);
  }, [lang]);

  useEffect(() => { const q = searchParams.get('search'); if (q) { setSearchInput(q); setSearchQuery(q); } setInitialized(true); }, [searchParams]);

  useEffect(() => {
    async function fetchCurrentParsha() {
      try {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const res = await fetch('https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=' + today.getFullYear() + '&month=' + (today.getMonth() + 1) + '&ss=off&mf=off&c=off&s=on');
        if (res.ok) { const data = await res.json(); const upcoming = data.items?.filter((item: any) => item.category === 'parashat')?.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())?.find((item: any) => { const d = new Date(item.date); d.setHours(0,0,0,0); return d >= today; }); if (upcoming) { const name = upcoming.title?.replace('Parashat ', ''); const id = parshaNameToId[name]; if (id) setCurrentParshaId(id); } }
      } catch (err) { console.error('Error:', err); }
    }
    fetchCurrentParsha();
  }, []);

  useEffect(() => {
    fetch(SUPABASE_URL + '/rest/v1/parshiot?order=order_num&select=id,name_ru,name_en,order_num', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()).then(data => { if (!data) return; const map: Record<number, string> = {}; data.forEach((p: Parsha) => { map[p.id] = p.name_ru; }); setParshaMap(map); if (currentParshaId) { const sorted = [...data].sort((a: Parsha, b: Parsha) => { if (a.id === currentParshaId) return -1; if (b.id === currentParshaId) return 1; return a.order_num - b.order_num; }); setParshiot(sorted); } else { setParshiot(data); } });
    fetch(SUPABASE_URL + '/rest/v1/publications?select=id,title_ru,title_en,title_he', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()).then(data => { if (!data) return; const map: Record<string, string> = {}; data.forEach((p: Publication) => { map[p.id] = p.title_ru || p.title_en || p.title_he || '—'; }); setPubMap(map); });
    fetch(SUPABASE_URL + '/rest/v1/events?is_active=eq.true&order=name_ru&select=id,name_ru', { headers: { 'apikey': SUPABASE_KEY } }).then(r => r.json()).then(data => { if (!data) return; setEvents(data); const map: Record<string, string> = {}; data.forEach((e: Event) => { map[e.id] = e.name_ru; }); setEventMap(map); });
  }, [currentParshaId]);

  // Fetch publications + latest issue thumbnails (always, needed for language filtering in both views)
  useEffect(() => {
    let cancelled = false;
    setPubsLoading(true);
    (async () => {
      try {
        const fetchPromises: [Promise<PublicationFull[]>, Promise<Record<string, string>>] = [
          fetch(SUPABASE_URL + '/rest/v1/publications?is_active=eq.true&order=title_ru&select=id,title_ru,title_en,title_he,cover_image_url,total_issues,frequency,primary_language,description_ru', { headers: { apikey: SUPABASE_KEY } }).then(r => r.json()),
          viewMode === 'publications' ? fetchLatestIssueThumbMap() : Promise.resolve({} as Record<string, string>),
        ];
        const [pubs, thumbMap] = await Promise.all(fetchPromises);
        if (cancelled) return;
        const enriched = (Array.isArray(pubs) ? pubs : []).map((p: PublicationFull) => ({
          ...p,
          cover_image_url: (p.cover_image_url && p.cover_image_url.trim()) ? p.cover_image_url : (thumbMap[p.id] || null),
        }));
        setPublicationsList(enriched);
      } catch {
        if (!cancelled) setPublicationsList([]);
      } finally {
        if (!cancelled) setPubsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [viewMode]);

  // Extra backfill for publications still without cover after bulk fetch
  useEffect(() => {
    if (viewMode !== 'publications') return;
    const missing = publicationsList.filter((p) => !p.cover_image_url || !p.cover_image_url.trim());
    if (missing.length === 0) return;
    let cancelled = false;

    async function fillMissingCovers() {
      const updates: Record<string, string> = {};
      const chunkSize = 12;
      for (let i = 0; i < missing.length; i += chunkSize) {
        const chunk = missing.slice(i, i + chunkSize);
        const requests = chunk.map(async (pub) => {
          try {
            const res = await fetch(
              SUPABASE_URL +
                '/rest/v1/issues?publication_id=eq.' +
                pub.id +
                '&is_active=eq.true&order=created_at.desc&limit=5&select=thumbnail_url,pdf_url',
              { headers: { apikey: SUPABASE_KEY } }
            );
            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) return;
            const withThumb = data.find((x: any) => x.thumbnail_url && x.thumbnail_url.trim());
            if (withThumb) {
              updates[pub.id] = withThumb.thumbnail_url;
              return;
            }
            const withDrivePdf = data.find((x: any) => getGoogleDriveThumbFromPdfUrl(x.pdf_url));
            if (withDrivePdf) {
              const fallback = getGoogleDriveThumbFromPdfUrl(withDrivePdf.pdf_url);
              if (fallback) updates[pub.id] = fallback;
            }
          } catch {
            // ignore
          }
        });
        await Promise.all(requests);
      }

      if (cancelled) return;
      const updateIds = Object.keys(updates);
      if (updateIds.length === 0) return;
      setPublicationsList((prev) =>
        prev.map((p) => (updates[p.id] ? { ...p, cover_image_url: updates[p.id] } : p))
      );
    }

    fillMissingCovers();
    return () => {
      cancelled = true;
    };
  }, [publicationsList, viewMode]);

  const filteredPubs = publicationsList.filter(p => {
    if (categoryPubIds && !categoryPubIds.includes(p.id)) return false;
    if (selectedPubLangs.length > 0 && !selectedPubLangs.includes(p.primary_language)) return false;
    if (!pubsSearchInput) return true;
    const q = pubsSearchInput.toLowerCase();
    return (p.title_ru || '').toLowerCase().includes(q) || (p.title_en || '').toLowerCase().includes(q) || (p.title_he || '').toLowerCase().includes(q);
  }).sort((a, b) => {
    const langMap: Record<string, string> = { ru: 'ru', en: 'en', he: 'he', uk: 'ru' };
    const userLang = langMap[lang] || 'ru';
    const aMatch = a.primary_language === userLang ? 0 : 1;
    const bMatch = b.primary_language === userLang ? 0 : 1;
    return aMatch - bMatch;
  });

  // Language filter is applied directly via issues.language field in fetchDocuments

  const fetchDocuments = useCallback(async () => {
    if (!initialized) return; setLoading(true);
    const from = page * PAGE_SIZE; const to = from + PAGE_SIZE - 1;
    let url = SUPABASE_URL + '/rest/v1/issues?is_active=eq.true&order=' + (sortOrder === 'oldest' ? 'created_at.asc' : 'created_at.desc');
    if (searchQuery) url += '&title=ilike.*' + encodeURIComponent(searchQuery) + '*';
    if (selectedParsha) url += '&parsha_id=eq.' + selectedParsha;
    if (selectedEvent) url += '&event_id=eq.' + selectedEvent;
    // Language filter: use direct language field on issues table
    if (selectedPubLangs.length > 0) {
      url += '&language=in.(' + selectedPubLangs.join(',') + ')';
    }
    // Category filter: use publication IDs
    if (categoryPubIds && categoryPubIds.length > 0) url += '&publication_id=in.(' + categoryPubIds.join(',') + ')';
    try { const res = await fetch(url + '&select=id,title,pdf_url,gregorian_date,publication_id,thumbnail_url,parsha_id,event_id,issue_number', { headers: { 'apikey': SUPABASE_KEY, 'Range': from + '-' + to, 'Prefer': 'count=exact' } }); const data = await res.json(); const contentRange = res.headers.get('content-range'); setDocuments(data || []); setTotalCount(contentRange ? parseInt(contentRange.split('/')[1]) : 0); } catch (err) { console.error('Error:', err); } finally { setLoading(false); }
  }, [page, searchQuery, selectedParsha, selectedEvent, initialized, sortOrder, categoryPubIds, selectedPubLangs]);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  useEffect(() => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    fetch(
      SUPABASE_URL +
        '/rest/v1/issues?is_active=eq.true&created_at=gte.' +
        encodeURIComponent(weekAgo) +
        '&order=view_count.desc.nullslast,download_count.desc.nullslast,created_at.desc&limit=6&select=id,title,pdf_url,thumbnail_url,gregorian_date,publication_id,parsha_id,event_id,issue_number',
      { headers: { apikey: SUPABASE_KEY } }
    )
      .then((r) => r.json())
      .then((data) => setPopularWeek(Array.isArray(data) ? data : []))
      .catch(() => setPopularWeek([]));
  }, []);

  useEffect(() => {
    if (!user?.email) {
      setForYouIssues([]);
      return;
    }
    fetch(
      SUPABASE_URL +
        '/rest/v1/subscriptions?email=eq.' +
        encodeURIComponent(user.email) +
        '&is_active=eq.true&select=publication_ids,subscribe_news&limit=1',
      { headers: { apikey: SUPABASE_KEY } }
    )
      .then((r) => r.json())
      .then((rows) => {
        const first = Array.isArray(rows) ? rows[0] : null;
        const publicationIds = Array.isArray(first?.publication_ids) ? first.publication_ids : [];
        if (publicationIds.length === 0) {
          setForYouIssues([]);
          return;
        }
        const inList = publicationIds.join(',');
        return fetch(
          SUPABASE_URL +
            '/rest/v1/issues?is_active=eq.true&publication_id=in.(' +
            inList +
            ')&order=created_at.desc&limit=6&select=id,title,pdf_url,thumbnail_url,gregorian_date,publication_id,parsha_id,event_id,issue_number',
          { headers: { apikey: SUPABASE_KEY } }
        )
          .then((r) => r.json())
          .then((data) => setForYouIssues(Array.isArray(data) ? data : []));
      })
      .catch(() => setForYouIssues([]));
  }, [user?.email]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(0);
    if (searchInput.trim()) trackEvent('catalog_search', { query_length: searchInput.trim().length });
  };
  const hasFilters = searchQuery || selectedParsha || selectedEvent || selectedPubLangs.length > 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handlePubSelect = async (pubId: string) => {
    trackEvent('catalog_publication_expand', { publication_id: pubId });
    if (expandedPubId === pubId) { setExpandedPubId(null); return; }
    setExpandedPubId(pubId);
    setExpandedLoading(true);
    setExpandedIssues([]);
    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/issues?publication_id=eq.' + pubId + '&is_active=eq.true&order=created_at.desc&limit=500&select=id,title,thumbnail_url,gregorian_date,issue_number', { headers: { 'apikey': SUPABASE_KEY } });
      const data = await res.json();
      setExpandedIssues(Array.isArray(data) ? data : []);
    } catch { setExpandedIssues([]); }
    finally { setExpandedLoading(false); }
  };
  const groupedPubs = orderedCategories.map((category) => {
    const items = filteredPubs.filter((pub) => {
      const mapped = getCategoryForPublication(pub.id);
      return (mapped || 'other') === category;
    });
    return { category, items };
  }).filter((group) => group.items.length > 0);
  const pubLangOptions = [
    { id: 'ru', label: '\u{1F1F7}\u{1F1FA} \u0420\u0443\u0441\u0441\u043A\u0438\u0439' },
    { id: 'en', label: '\u{1F1FA}\u{1F1F8} English' },
    { id: 'he', label: '\u{1F1EE}\u{1F1F1} \u05E2\u05D1\u05E8\u05D9\u05EA' },
    { id: 'uk', label: '\u{1F1FA}\u{1F1E6} \u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430' },
  ];
  const togglePubLang = (langId: string) => {
    setSelectedPubLangs((prev) => prev.includes(langId) ? prev.filter((x) => x !== langId) : [...prev, langId]);
    setPage(0);
  };
  const clearFilters = () => { setSearchQuery(''); setSearchInput(''); setSelectedParsha(null); setSelectedEvent(null); setSelectedPubLangs([]); setPage(0); };

  return (
    <div dir={dir}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .library-bg { background-color: #f5efe6; background-image: radial-gradient(ellipse at 20% 50%, rgba(180,140,80,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(120,80,40,0.05) 0%, transparent 50%), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a882' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
        .book-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .book-card:hover { transform: translateY(-4px); }
        .book-cover { box-shadow: 3px 3px 8px rgba(120,80,40,0.15), 6px 6px 20px rgba(120,80,40,0.08), inset 0 0 0 1px rgba(120,80,40,0.08); border-radius: 2px 6px 6px 2px; transition: box-shadow 0.35s ease; }
        .book-card:hover .book-cover { box-shadow: 4px 4px 12px rgba(120,80,40,0.2), 8px 8px 30px rgba(120,80,40,0.12), inset 0 0 0 1px rgba(120,80,40,0.1); }
        .search-ornate { background: linear-gradient(135deg, #faf5ed 0%, #f5efe6 100%); border: 1px solid rgba(180,150,100,0.25); box-shadow: 0 4px 20px rgba(120,80,40,0.06), inset 0 1px 0 rgba(255,255,255,0.5); }
        @keyframes shelfSlide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .filter-select { background-color: #fdfaf5; border: 1px solid rgba(180,150,100,0.3); font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .filter-select:focus { border-color: #b8854a; box-shadow: 0 0 0 3px rgba(184,133,74,0.15); }
        .page-btn { font-family: 'DM Sans', sans-serif; border: 1px solid rgba(180,150,100,0.3); background: #fdfaf5; transition: all 0.2s; }
        .page-btn:hover:not(:disabled) { background: #f5efe6; border-color: rgba(180,150,100,0.5); }
        .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .page-btn-active { background: linear-gradient(135deg, #96693a, #b8854a) !important; color: white !important; border-color: #96693a !important; }
      `}</style>

      <div className="library-bg min-h-screen">
        {/* Header */}
        <div className="relative overflow-hidden" style={{ background: 'url(/library-bg.jpg) center/cover no-repeat' }}>
          <div className="absolute inset-0 opacity-10" style={{ background: 'rgba(30,20,10,0.65)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,160,80,0.15) 0%, transparent 60%)' }} />
          <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 text-center">
            <div className="text-2xl mb-3" style={{ color: '#c4a882' }}>{'\u2766'}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-3" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)', fontFamily: "'Playfair Display', Georgia, serif" }}>{t('catalog.title', lang)}</h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(217,191,149,0.9)', textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}>{t('catalog.subtitle', lang)}</p>
            <div className="text-2xl mt-4" style={{ color: '#c4a882' }}>{'\u2766'}</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Search */}
          <div className="search-ornate rounded-2xl p-5 md:p-6 mb-8">
            <form onSubmit={viewMode === 'issues' ? handleSearch : (e) => e.preventDefault()} className="flex gap-3 mb-0">
              <div className="relative flex-1">
                <Search className={'absolute top-1/2 -translate-y-1/2 text-stone-400 ' + (lang === 'he' ? 'right-4' : 'left-4')} size={18} />
                <input type="text" placeholder={t('catalog.searchPlaceholder', lang)} value={viewMode === 'publications' ? pubsSearchInput : searchInput} onChange={(e) => viewMode === 'publications' ? setPubsSearchInput(e.target.value) : setSearchInput(e.target.value)} className={'w-full py-3 rounded-xl filter-select outline-none ' + (lang === 'he' ? 'pr-11 pl-4' : 'pl-11 pr-4')} />
              </div>
              {viewMode === 'issues' && (
                <button type="button" onClick={() => setShowFilters(!showFilters)} className={'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ' + (showFilters || hasFilters ? 'text-white' : 'filter-select text-stone-600 hover:text-stone-800')} style={showFilters || hasFilters ? { background: 'linear-gradient(135deg, #96693a, #b8854a)' } : {}}>
                  <Filter size={16} />
                  <span className="hidden sm:inline">{t('catalog.allParshiot', lang)}</span>
                </button>
              )}
            </form>
            {showFilters && viewMode === 'issues' && (
              <div className="flex flex-wrap gap-3 pt-4 mt-4 border-t" style={{ borderColor: 'rgba(180,150,100,0.2)' }}>
                <select value={selectedParsha || ''} onChange={(e) => { setSelectedParsha(e.target.value ? Number(e.target.value) : null); setPage(0); }} className="px-4 py-2.5 rounded-xl filter-select outline-none min-w-[180px] text-sm">
                  <option value="">{t('catalog.allParshiot', lang)}</option>
                  {parshiot.map(p => (<option key={p.id} value={p.id}>{p.name_ru}{p.id === currentParshaId ? ' \u2605' : ''}</option>))}
                </select>
                <select value={selectedEvent || ''} onChange={(e) => { setSelectedEvent(e.target.value || null); setPage(0); }} className="px-4 py-2.5 rounded-xl filter-select outline-none min-w-[180px] text-sm">
                  <option value="">{t('catalog.allEvents', lang)}</option>
                  {events.map(e => (<option key={e.id} value={e.id}>{e.name_ru}</option>))}
                </select>
                {hasFilters && <button onClick={clearFilters} className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium" style={{ color: '#96693a', fontFamily: "'DM Sans', sans-serif" }}><X size={14} /> {t('reset', lang)}</button>}
              </div>
            )}
          </div>

          {/* Category badge */}
          {categoryName && (
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #96693a, #b8854a)' }}>
                <Library size={14} /> {categoryName}
              </span>
              <Link href="/catalog" className="text-sm text-stone-400 hover:text-stone-600 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <X size={16} />
              </Link>
            </div>
          )}

          {/* View mode toggle + Sort */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(180,150,100,0.3)' }}>
              <button onClick={() => setViewMode('issues')}
                className={'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ' + (viewMode === 'issues' ? 'text-white' : 'text-stone-600')}
                style={viewMode === 'issues' ? { background: 'linear-gradient(135deg, #96693a, #b8854a)' } : { background: '#fdfaf5' }}>
                <FileText size={15} /> {t('catalog.issues', lang)}
              </button>
              <button onClick={() => setViewMode('publications')}
                className={'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ' + (viewMode === 'publications' ? 'text-white' : 'text-stone-600')}
                style={viewMode === 'publications' ? { background: 'linear-gradient(135deg, #96693a, #b8854a)' } : { background: '#fdfaf5' }}>
                <Library size={15} /> {t('catalog.publications', lang)}
              </button>
            </div>
            {viewMode === 'issues' && (
              <div className="flex gap-2">
                {["newest","oldest"].map(s => (
                  <button key={s} onClick={() => { setSortOrder(s); setPage(0); }}
                    className={"px-4 py-2 rounded-xl text-sm font-medium transition-all " + (sortOrder === s ? "text-white" : "filter-select text-stone-600")}
                    style={sortOrder === s ? { background: "linear-gradient(135deg, #96693a, #b8854a)" } : {}}>
                    {t('catalog.' + (s === 'newest' ? 'newest' : 'oldest'), lang)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language filter */}
          <div className="flex items-center flex-wrap gap-2 mb-6">
            <span className="text-xs text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif", marginRight: '2px' }}>{t('catalog.language', lang)}:</span>
            <button
              onClick={() => { setSelectedPubLangs([]); if (viewMode === 'issues') setPage(0); }}
              className={'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border cursor-pointer transition-all ' + (selectedPubLangs.length === 0 ? 'text-white' : 'text-stone-600')}
              style={selectedPubLangs.length === 0 ? { background: 'linear-gradient(135deg, #96693a, #b8854a)', borderColor: '#96693a' } : { borderColor: 'rgba(180,150,100,0.3)', background: '#fdfaf5' }}
            >
              {t('catalog.allLanguages', lang)}
            </button>
            {pubLangOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { togglePubLang(opt.id); if (viewMode === 'issues') setPage(0); }}
                className={'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border cursor-pointer transition-all ' + (selectedPubLangs.includes(opt.id) ? 'text-white' : 'text-stone-600')}
                style={selectedPubLangs.includes(opt.id) ? { background: 'linear-gradient(135deg, #96693a, #b8854a)', borderColor: '#96693a' } : { borderColor: 'rgba(180,150,100,0.3)', background: '#fdfaf5' }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {viewMode === 'issues' ? (
            <>
              {page === 0 && !hasFilters && (
                <div className="space-y-8 mb-8">
                  {forYouIssues.length > 0 && (
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-stone-800" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          Для вас
                        </h2>
                        <span className="text-xs text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          По вашим подпискам
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-8">
                        {forYouIssues.map((doc) => (
                          <DocumentCard key={doc.id} doc={doc} currentParshaId={currentParshaId} parshaMap={parshaMap} pubMap={pubMap} eventMap={eventMap} lang={lang} />
                        ))}
                      </div>
                    </section>
                  )}

                  {popularWeek.length > 0 && (
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-stone-800" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          Популярное за 7 дней
                        </h2>
                        <span className="text-xs text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Тренды недели
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-8">
                        {popularWeek.map((doc) => (
                          <DocumentCard key={doc.id} doc={doc} currentParshaId={currentParshaId} parshaMap={parshaMap} pubMap={pubMap} eventMap={eventMap} lang={lang} />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* Counter */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t('catalog.found', lang)}: <span className="font-semibold text-stone-800">{totalCount.toLocaleString()}</span> {t('catalog.materials', lang)}</p>
                {totalPages > 1 && <p className="text-stone-400 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t('catalog.page', lang)} {page + 1} {t('catalog.of', lang)} {totalPages}</p>}
              </div>

              {/* Issues Content */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Loader2 className="animate-spin text-amber-700 mb-4" size={36} />
                  <p className="text-stone-500 italic" style={{ fontFamily: "Georgia, serif" }}>{t('loading', lang)}</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-24">
                  <Scroll size={56} className="mx-auto mb-4 text-stone-300" />
                  <p className="text-xl text-stone-500 italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t('catalog.notFound', lang)}</p>
                </div>
              ) : (
                <>
                  {(() => {
                    const COLS = 6;
                    const ROWS_PER_BANNER = 5;
                    const CHUNK = COLS * ROWS_PER_BANNER;
                    const chunks: Document[][] = [];
                    for (let i = 0; i < documents.length; i += CHUNK) { chunks.push(documents.slice(i, i + CHUNK)); }
                    return chunks.map((chunk, ci) => (
                      <div key={ci}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
                          {chunk.map((doc) => (<DocumentCard key={doc.id} doc={doc} currentParshaId={currentParshaId} parshaMap={parshaMap} pubMap={pubMap} eventMap={eventMap} lang={lang} />))}
                        </div>
                        {ci < chunks.length - 1 && (
                          <div className="my-8 max-w-2xl mx-auto">
                            <SubscribeBlock />
                          </div>
                        )}
                      </div>
                    ));
                  })()}
                  {/* Wooden shelf */}
                  <div className="mt-6 h-3 rounded-full mx-auto" style={{ background: 'linear-gradient(180deg, #b8854a 0%, #96693a 60%, #7a5530 100%)', boxShadow: '0 4px 12px rgba(120,80,40,0.2), inset 0 1px 0 rgba(255,255,255,0.15)', maxWidth: '95%' }} />
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                      <button onClick={() => setPage(0)} disabled={page === 0} className="page-btn px-3 py-2 rounded-lg text-sm">{t('catalog.toStart', lang)}</button>
                      <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="page-btn p-2 rounded-lg"><ChevronLeft size={18} /></button>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => { let pn; if (totalPages <= 5) pn = i; else if (page < 3) pn = i; else if (page > totalPages - 4) pn = totalPages - 5 + i; else pn = page - 2 + i; return (<button key={pn} onClick={() => setPage(pn)} className={'page-btn w-10 h-10 rounded-lg text-sm font-medium ' + (page === pn ? 'page-btn-active' : '')}>{pn + 1}</button>); })}
                      </div>
                      <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="page-btn p-2 rounded-lg"><ChevronRight size={18} /></button>
                      <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} className="page-btn px-3 py-2 rounded-lg text-sm">{t('catalog.toEnd', lang)}</button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {/* Publications counter */}
              <div className="mb-6">
                <p className="text-stone-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t('catalog.found', lang)}: <span className="font-semibold text-stone-800">{filteredPubs.length}</span> {t('catalog.publications', lang)}</p>
              </div>

              {/* Publications Content */}
              {pubsLoading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Loader2 className="animate-spin text-amber-700 mb-4" size={36} />
                  <p className="text-stone-500 italic" style={{ fontFamily: "Georgia, serif" }}>{t('loading', lang)}</p>
                </div>
              ) : filteredPubs.length === 0 ? (
                <div className="text-center py-24">
                  <FolderOpen size={56} className="mx-auto mb-4 text-stone-300" />
                  <p className="text-xl text-stone-500 italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t('catalog.notFound', lang)}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-8">
                    {groupedPubs.map(({ category, items }) => (
                      <section key={category}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-stone-800" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                            {categoryNames[category]?.[lang] || categoryNames[category]?.ru || category}
                          </h3>
                          <span className="text-xs text-stone-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>{items.length}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
                          {items.map((pub) => (
                            <React.Fragment key={pub.id}>
                              <PublicationCard pub={pub} lang={lang} onSelect={handlePubSelect} isExpanded={expandedPubId === pub.id} />
                              {expandedPubId === pub.id && (
                                <div style={{ gridColumn: '1 / -1', minWidth: 0, background: 'linear-gradient(180deg, #faf5ed 0%, #f5efe6 100%)', border: '1px solid rgba(180,150,100,0.3)', borderRadius: '12px', padding: '1.25rem 1.5rem', boxShadow: 'inset 0 2px 8px rgba(120,80,40,0.06), 0 4px 16px rgba(120,80,40,0.08)', animation: 'shelfSlide 0.3s ease-out' }}>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <BookOpen size={16} className="text-amber-700 flex-shrink-0" />
                                      <h4 className="text-sm font-semibold text-stone-800 truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{pub.title_ru || pub.title_en || pub.title_he}</h4>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      <Link href={'/publication/' + pub.id} className="text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors whitespace-nowrap" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                        {t('catalog.allIssues', lang)} ({pub.total_issues}) →
                                      </Link>
                                      <button onClick={() => setExpandedPubId(null)} className="p-1 rounded-full hover:bg-stone-200/50 transition-colors">
                                        <X size={14} className="text-stone-400" />
                                      </button>
                                    </div>
                                  </div>
                                  {pub.description_ru && <p className="text-xs text-stone-400 mb-2 line-clamp-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{pub.description_ru}</p>}
                                  {expandedLoading ? (
                                    <div className="flex items-center justify-center py-8"><Loader2 className="animate-spin text-amber-600" size={20} /></div>
                                  ) : expandedIssues.length === 0 ? (
                                    <p className="text-xs text-stone-400 italic text-center py-6">{t('catalog.notFound', lang)}</p>
                                  ) : (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-5 pt-3 pb-1">
                                      {expandedIssues.map(issue => (
                                        <Link key={issue.id} href={'/document/' + issue.id} className="book-card group block">
                                          <div className="book-cover rounded overflow-hidden" style={{ aspectRatio: '3/4' }}>
                                            {issue.thumbnail_url ? (
                                              <img src={issue.thumbnail_url} alt={issue.title} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            ) : (
                                              <div className="w-full h-full flex items-center justify-center bg-stone-100"><FileText size={18} className="text-stone-300" /></div>
                                            )}
                                          </div>
                                          <p className="text-[10px] text-stone-600 mt-1.5 line-clamp-2 leading-tight group-hover:text-amber-800 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>{issue.title || ('\u2116' + issue.issue_number)}</p>
                                          {issue.gregorian_date && <p className="text-[9px] text-stone-400 mt-0.5">{formatDate(issue.gregorian_date, lang)}</p>}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                  <div className="mt-2 h-1.5 rounded-full mx-auto" style={{ background: 'linear-gradient(180deg, #b8854a 0%, #96693a 60%, #7a5530 100%)', boxShadow: '0 2px 6px rgba(120,80,40,0.15)', maxWidth: '90%' }} />
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                  {/* Wooden shelf */}
                  <div className="mt-6 h-3 rounded-full mx-auto" style={{ background: 'linear-gradient(180deg, #b8854a 0%, #96693a 60%, #7a5530 100%)', boxShadow: '0 4px 12px rgba(120,80,40,0.2), inset 0 1px 0 rgba(255,255,255,0.15)', maxWidth: '95%' }} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#f5efe6' }}><Loader2 className="animate-spin text-amber-700 mb-3" size={36} /><p style={{ fontFamily: 'Georgia, serif', color: '#8a7260', fontStyle: 'italic' }}>Loading...</p></div>}>
      <CatalogContent />
    </Suspense>
  );
}
