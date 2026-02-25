'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Edit2, Plus, X, Save, ChevronLeft, ChevronRight, BookOpen, FileText, ExternalLink, Trash2, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

interface Publication {
  id: string;
  title_ru: string;
  title_en: string;
  title_he: string;
  description_ru: string;
  description_en: string;
  description_he: string;
  frequency: string;
  primary_language: string;
  whatsapp_link: string;
  telegram_link: string;
  website_url: string;
  email: string;
  cover_image_url: string;
  is_active: boolean;
  total_issues: number;
  total_downloads: number;
  subscribers_count: number;
  created_at: string;
}

const EMPTY_PUBLICATION: Partial<Publication> = {
  title_ru: '', title_en: '', title_he: '',
  description_ru: '', description_en: '', description_he: '',
  frequency: '', primary_language: 'ru',
  whatsapp_link: '', telegram_link: '', website_url: '', email: '',
  cover_image_url: '', is_active: true,
};

const FREQUENCY_KEYS: { value: string; key: string }[] = [
  { value: 'weekly', key: 'admin.weekly' },
  { value: 'monthly', key: 'admin.monthly' },
  { value: 'daily', key: 'admin.daily' },
  { value: 'irregular', key: 'admin.irregular' },
];
const LANGUAGE_KEYS: { value: string; key: string }[] = [
  { value: 'ru', key: 'admin.russian' },
  { value: 'he', key: 'admin.hebrew' },
  { value: 'en', key: 'admin.english' },
];

const PAGE_SIZE = 20;

function levenshtein(a: string, b: string): number {
  const la = a.length, lb = b.length;
  const dp: number[][] = Array.from({ length: la + 1 }, () => Array(lb + 1).fill(0));
  for (let i = 0; i <= la; i++) dp[i][0] = i;
  for (let j = 0; j <= lb; j++) dp[0][j] = j;
  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[la][lb];
}

function isSimilar(a: string, b: string, threshold = 3): boolean {
  const na = a.toLowerCase().trim();
  const nb = b.toLowerCase().trim();
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.includes(nb) || nb.includes(na)) return true;
  return levenshtein(na, nb) <= threshold;
}

function prettyPublicationError(errorMessage: string, lang: string): string {
  const msg = (errorMessage || '').toLowerCase();
  if (msg.includes('uq_publications_active_norm_title')) {
    return t('admin.alreadyExists', lang as any);
  }
  return errorMessage;
}

export default function AdminPublications() {
  const { lang } = useLanguage();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [editingPub, setEditingPub] = useState<Partial<Publication> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [viewingIssues, setViewingIssues] = useState<{ pubId: string; pubTitle: string; issues: any[] } | null>(null);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [similarPubs, setSimilarPubs] = useState<Publication[]>([]);

  useEffect(() => {
    async function fetchAll() {
      const { data } = await supabase.from('publications').select('*').order('title_ru', { ascending: true });
      setAllPublications(data || []);
    }
    fetchAll();
  }, []);

  const fetchPublications = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('publications')
      .select('*', { count: 'exact' })
      .order('title_ru', { ascending: true })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    if (search) {
      query = query.or(`title_ru.ilike.%${search}%,title_en.ilike.%${search}%,title_he.ilike.%${search}%`);
    }
    const { data, count } = await query;
    setPublications(data || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetchPublications(); }, [fetchPublications]);

  // Проверка похожих при создании
  useEffect(() => {
    const anyTitle = editingPub?.title_ru || editingPub?.title_en || editingPub?.title_he || '';
    if (!editingPub || !isNew || anyTitle.length < 3) {
      setSimilarPubs([]);
      return;
    }
    const found = allPublications.filter(p =>
      isSimilar(editingPub.title_ru || '', p.title_ru || '') ||
      (editingPub.title_en && p.title_en && isSimilar(editingPub.title_en, p.title_en)) ||
      (editingPub.title_he && p.title_he && isSimilar(editingPub.title_he, p.title_he))
    );
    setSimilarPubs(found);
  }, [editingPub?.title_ru, editingPub?.title_en, editingPub?.title_he, isNew, allPublications]);

  const refreshAll = async () => {
    const { data } = await supabase.from('publications').select('*').order('title_ru', { ascending: true });
    setAllPublications(data || []);
    fetchPublications();
  };

  const handleSave = async () => {
    if (!editingPub || (!editingPub.title_ru && !editingPub.title_en && !editingPub.title_he)) return;
    setSaving(true);
    const payload = {
      title_ru: editingPub.title_ru || null,
      title_en: editingPub.title_en || null,
      title_he: editingPub.title_he || null,
      description_ru: editingPub.description_ru || '',
      description_en: editingPub.description_en || '',
      description_he: editingPub.description_he || '',
      frequency: editingPub.frequency || null,
      primary_language: editingPub.primary_language || 'ru',
      whatsapp_link: editingPub.whatsapp_link || '',
      telegram_link: editingPub.telegram_link || '',
      website_url: editingPub.website_url || '',
      email: editingPub.email || '',
      cover_image_url: editingPub.cover_image_url || '',
      is_active: editingPub.is_active ?? true,
    };
    if (isNew) {
      const { error } = await supabase.from('publications').insert(payload);
      if (error) { alert(t('admin.error', lang) + ' ' + prettyPublicationError(error.message, lang)); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('publications').update(payload).eq('id', editingPub.id);
      if (error) { alert(t('admin.error', lang) + ' ' + prettyPublicationError(error.message, lang)); setSaving(false); return; }
    }
    setEditingPub(null);
    setIsNew(false);
    setSimilarPubs([]);
    refreshAll();
    setSaving(false);
  };

  const handleDelete = async (pub: Publication) => {
    const issuesCount = pub.total_issues || 0;
    const title = pub.title_ru || pub.title_en || pub.title_he || '';
    const msg = issuesCount > 0
      ? t('admin.confirmDeleteWithIssues', lang).replace(/%s/g, title).replace(/%n/g, String(issuesCount))
      : t('admin.confirmDelete', lang).replace(/%s/g, title);
    if (!confirm(msg)) return;

    setDeleting(pub.id);

    if (issuesCount > 0) {
      await supabase.from('issues').update({ publication_id: null }).eq('publication_id', pub.id);
    }

    const { error } = await supabase.from('publications').delete().eq('id', pub.id);
    if (error) {
      const { error: e2 } = await supabase.from('publications').update({ is_active: false }).eq('id', pub.id);
      if (e2) {
        alert(t('admin.error', lang) + ' ' + e2.message);
      } else {
        alert(t('admin.pubHidden', lang));
      }
    }

    setDeleting(null);
    refreshAll();
  };

  const handleMerge = async (source: Publication, target: Publication) => {
    const srcTitle = source.title_ru || source.title_en || source.title_he || '';
    const tgtTitle = target.title_ru || target.title_en || target.title_he || '';
    if (!confirm(t('admin.confirmMerge', lang).replace(/%s/g, srcTitle).replace(/%t/g, tgtTitle))) return;

    // Перенести issues
    await supabase.from('issues').update({ publication_id: target.id }).eq('publication_id', source.id);

    // Удалить источник
    const { error } = await supabase.from('publications').delete().eq('id', source.id);
    if (error) {
      await supabase.from('publications').update({ is_active: false }).eq('id', source.id);
    }

    setEditingPub(null);
    setIsNew(false);
    setSimilarPubs([]);
    refreshAll();
  };

  const viewIssues = async (pubId: string, pubTitle: string) => {
    setIssuesLoading(true);
    setViewingIssues({ pubId, pubTitle, issues: [] });
    const { data } = await supabase
      .from('issues')
      .select('id, title, issue_number, gregorian_date, thumbnail_url, pdf_url, is_active')
      .eq('publication_id', pubId)
      .order('gregorian_date', { ascending: false })
      .limit(50);
    setViewingIssues({ pubId, pubTitle, issues: data || [] });
    setIssuesLoading(false);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.publications', lang)}</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">{totalCount} {t('admin.total', lang)}</span>
          <button
            onClick={() => { setEditingPub({ ...EMPTY_PUBLICATION }); setIsNew(true); setSimilarPubs([]); }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700"
          >
            <Plus size={18} />
            {t('admin.add', lang)}
          </button>
        </div>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} placeholder={t('admin.searchByTitle', lang)} className="w-full pl-12 pr-4 py-3 border rounded-xl" />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.publication', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.language', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.frequency', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.issuesCount', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.status', lang)}</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">{t('admin.actionsCol', lang)}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center">{t('loading', lang)}</td></tr>
            ) : publications.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">{t('admin.noData', lang)}</td></tr>
            ) : publications.map((pub) => (
              <tr key={pub.id} className={`hover:bg-gray-50 ${!pub.is_active ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {pub.cover_image_url ? (
                      <img src={pub.cover_image_url} alt="" className="w-10 h-14 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center"><BookOpen className="text-gray-400" size={16} /></div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium truncate max-w-xs">{pub.title_ru || pub.title_en || pub.title_he || '—'}</p>
                      {pub.title_en && pub.title_en !== pub.title_ru && <p className="text-sm text-gray-500 truncate">{pub.title_en}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{LANGUAGE_KEYS.find(l => l.value === pub.primary_language) ? t(LANGUAGE_KEYS.find(l => l.value === pub.primary_language)!.key, lang) : '—'}</td>
                <td className="px-4 py-3 text-gray-600">{FREQUENCY_KEYS.find(f => f.value === pub.frequency) ? t(FREQUENCY_KEYS.find(f => f.value === pub.frequency)!.key, lang) : pub.frequency || '—'}</td>
                <td className="px-4 py-3">
                  <button onClick={() => viewIssues(pub.id, pub.title_ru)} className="text-primary-600 hover:underline font-medium">{pub.total_issues || 0}</button>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${pub.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{pub.is_active ? t('admin.activeStatus', lang) : t('admin.hiddenStatus', lang)}</span>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => { setEditingPub({ ...pub }); setIsNew(false); setSimilarPubs([]); }} className="p-2 text-gray-400 hover:text-primary-600" title={t('admin.edit', lang)}><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(pub)} disabled={deleting === pub.id} className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50" title={t('admin.delete', lang)}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <span className="text-sm text-gray-500">{t('admin.page', lang)} {page + 1} {t('admin.of', lang)} {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-2 rounded border disabled:opacity-50"><ChevronLeft size={20} /></button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-2 rounded border disabled:opacity-50"><ChevronRight size={20} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Модалка создания/редактирования */}
      {editingPub && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">{isNew ? t('admin.newPublication', lang) : t('admin.edit', lang)}</h2>
              <button onClick={() => { setEditingPub(null); setIsNew(false); setSimilarPubs([]); }}><X size={24} /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

              {/* Похожие публикации */}
              {isNew && similarPubs.length > 0 && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                    <AlertTriangle size={18} />
                    {t('admin.similarFound', lang)} ({similarPubs.length})
                  </div>
                  <div className="space-y-2">
                    {similarPubs.map(sp => (
                      <div key={sp.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-200">
                        <div>
                          <p className="font-medium text-sm">{sp.title_ru}</p>
                          <p className="text-xs text-gray-500">{sp.total_issues || 0} {t('admin.issuesCount', lang).toLowerCase()} · {sp.is_active ? t('admin.activeStatus', lang) : t('admin.hiddenStatus', lang)}</p>
                        </div>
                        <button
                          onClick={() => { setEditingPub({ ...sp }); setIsNew(false); setSimilarPubs([]); }}
                          className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 flex items-center gap-1"
                        >
                          <ArrowRightLeft size={14} />
                          {t('open', lang)}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('admin.titleRu', lang)}</label>
                  <input type="text" value={editingPub.title_ru || ''} onChange={(e) => setEditingPub({ ...editingPub, title_ru: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('admin.titleEn', lang)}</label>
                  <input type="text" value={editingPub.title_en || ''} onChange={(e) => setEditingPub({ ...editingPub, title_en: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('admin.titleHe', lang)}</label>
                  <input type="text" value={editingPub.title_he || ''} onChange={(e) => setEditingPub({ ...editingPub, title_he: e.target.value })} className="w-full px-4 py-2 border rounded-lg" dir="rtl" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.descRu', lang)}</label>
                <textarea value={editingPub.description_ru || ''} onChange={(e) => setEditingPub({ ...editingPub, description_ru: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.descEn', lang)}</label>
                <textarea value={editingPub.description_en || ''} onChange={(e) => setEditingPub({ ...editingPub, description_en: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('admin.mainLang', lang)}</label>
                  <select value={editingPub.primary_language || 'ru'} onChange={(e) => setEditingPub({ ...editingPub, primary_language: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                    {LANGUAGE_KEYS.map(l => <option key={l.value} value={l.value}>{t(l.key, lang)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('admin.periodicity', lang)}</label>
                  <select value={editingPub.frequency || ''} onChange={(e) => setEditingPub({ ...editingPub, frequency: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                    <option value="">—</option>
                    {FREQUENCY_KEYS.map(f => <option key={f.value} value={f.value}>{t(f.key, lang)}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" value={editingPub.email || ''} onChange={(e) => setEditingPub({ ...editingPub, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('pub.site', lang)}</label>
                  <input type="url" value={editingPub.website_url || ''} onChange={(e) => setEditingPub({ ...editingPub, website_url: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">WhatsApp</label>
                  <input type="url" value={editingPub.whatsapp_link || ''} onChange={(e) => setEditingPub({ ...editingPub, whatsapp_link: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telegram</label>
                  <input type="url" value={editingPub.telegram_link || ''} onChange={(e) => setEditingPub({ ...editingPub, telegram_link: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.coverUrl', lang)}</label>
                <input type="url" value={editingPub.cover_image_url || ''} onChange={(e) => setEditingPub({ ...editingPub, cover_image_url: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editingPub.is_active ?? true} onChange={(e) => setEditingPub({ ...editingPub, is_active: e.target.checked })} />
                <label>{t('admin.activeStatus', lang)}</label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => { setEditingPub(null); setIsNew(false); setSimilarPubs([]); }} className="px-4 py-2 text-gray-600">{t('admin.cancelBtn', lang)}</button>
              <button onClick={handleSave} disabled={saving || (!editingPub.title_ru && !editingPub.title_en && !editingPub.title_he)} className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 hover:bg-primary-700">
                <Save size={18} />{saving ? t('admin.savingBtn', lang) : t('admin.saveBtn', lang)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка выпусков */}
      {viewingIssues && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 my-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">{t('admin.showIssues', lang)} {viewingIssues.pubTitle}</h2>
              <button onClick={() => setViewingIssues(null)}><X size={24} /></button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {issuesLoading ? (
                <div className="p-8 text-center">{t('loading', lang)}</div>
              ) : viewingIssues.issues.length === 0 ? (
                <div className="p-8 text-center text-gray-500">{t('admin.noIssues', lang)}</div>
              ) : (
                <div className="divide-y">
                  {viewingIssues.issues.map((issue) => (
                    <div key={issue.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                      {issue.thumbnail_url ? <img src={issue.thumbnail_url} alt="" className="w-10 h-14 object-cover rounded" /> : <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center"><FileText className="text-gray-400" size={16} /></div>}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{issue.title}</p>
                        <p className="text-sm text-gray-500">{issue.issue_number && `№${issue.issue_number} · `}{issue.gregorian_date ? new Date(issue.gregorian_date).toLocaleDateString(lang === 'he' ? 'he-IL' : lang === 'en' ? 'en-US' : lang === 'uk' ? 'uk-UA' : 'ru-RU') : ''}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${issue.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{issue.is_active ? t('admin.activeStatus', lang) : t('admin.hiddenStatus', lang)}</span>
                      {issue.pdf_url && <a href={issue.pdf_url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-primary-600"><ExternalLink size={18} /></a>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t text-center text-sm text-gray-500">{t('admin.shownUpTo', lang)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
