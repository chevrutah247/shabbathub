'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FileText, Trash2, Check, ExternalLink, ChevronDown, ChevronUp, Eye, X } from 'lucide-react';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

const LOCALE_MAP: Record<string, string> = { ru: 'ru-RU', en: 'en-US', he: 'he-IL', uk: 'uk-UA' };

interface DuplicateGroup {
  title: string;
  count: number;
  items: any[];
}

export default function AdminDuplicates() {
  const { lang } = useLanguage();
  const [groups, setGroups] = useState<DuplicateGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [totalDuplicates, setTotalDuplicates] = useState(0);
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);
  const [viewingTitle, setViewingTitle] = useState<string>('');

  const fetchDuplicates = async () => {
    setLoading(true);

    const { data: allDocs } = await supabase
      .from('issues')
      .select('id, title, pdf_url, thumbnail_url, created_at, gregorian_date')
      .eq('is_active', true)
      .order('title');

    if (!allDocs) {
      setLoading(false);
      return;
    }

    const grouped: Record<string, any[]> = {};
    allDocs.forEach(doc => {
      if (!grouped[doc.title]) grouped[doc.title] = [];
      grouped[doc.title].push(doc);
    });

    const duplicateGroups: DuplicateGroup[] = Object.entries(grouped)
      .filter(([_, items]) => items.length > 1)
      .map(([title, items]) => ({
        title,
        count: items.length,
        items: items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      }))
      .sort((a, b) => b.count - a.count);

    setTotalDuplicates(duplicateGroups.reduce((sum, g) => sum + g.count - 1, 0));
    setGroups(duplicateGroups);
    setLoading(false);
  };

  useEffect(() => { fetchDuplicates(); }, []);

  const handleHide = async (id: string) => {
    if (!confirm(t('admin.confirmHideDoc', lang))) return;
    await supabase.from('issues').update({ is_active: false }).eq('id', id);
    fetchDuplicates();
  };

  const handleKeepOne = async (keepId: string, group: DuplicateGroup) => {
    if (!confirm(t('admin.confirmKeepOne', lang))) return;
    const idsToHide = group.items.filter(item => item.id !== keepId).map(item => item.id);
    await supabase.from('issues').update({ is_active: false }).in('id', idsToHide);
    fetchDuplicates();
  };

  const handleHideAllDuplicates = async () => {
    if (!groups.length) return;
    if (!confirm(t('admin.confirmHideAllDuplicates', lang))) return;
    const idsToHide = groups.flatMap((group) => group.items.slice(1).map((item) => item.id));
    if (idsToHide.length === 0) return;
    await supabase.from('issues').update({ is_active: false }).in('id', idsToHide);
    fetchDuplicates();
  };

  const openViewer = (url: string, title: string) => {
    setViewingPdf(url);
    setViewingTitle(title);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.duplicates', lang)}</h1>
          <p className="text-gray-500 mt-1">{groups.length} {t('admin.groups', lang)} · {totalDuplicates} {t('admin.extras', lang)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleHideAllDuplicates} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
            {t('admin.hideAllDuplicates', lang)}
          </button>
          <button onClick={fetchDuplicates} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            {t('admin.refresh', lang)}
          </button>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <Check className="mx-auto text-green-500 mb-4" size={48} />
          <h2 className="text-xl font-bold">{t('admin.noDuplicates', lang)}</h2>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedGroup(expandedGroup === group.title ? null : group.title)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">×{group.count}</span>
                  <span className="font-medium text-gray-900 text-left">{group.title}</span>
                </div>
                {expandedGroup === group.title ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {expandedGroup === group.title && (
                <div className="border-t px-6 py-4 space-y-3">
                  {group.items.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      {item.thumbnail_url ? (
                        <img
                          src={item.thumbnail_url}
                          alt=""
                          className="w-16 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                          onClick={() => openViewer(item.pdf_url, `${group.title} (#${index + 1})`)}
                        />
                      ) : (
                        <div
                          className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
                          onClick={() => openViewer(item.pdf_url, `${group.title} (#${index + 1})`)}
                        >
                          <FileText className="text-gray-400" size={24} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500">
                          #{index + 1} · {t('admin.added', lang)} {new Date(item.created_at).toLocaleDateString(LOCALE_MAP[lang] || 'en-US')}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-1">{item.pdf_url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openViewer(item.pdf_url, `${group.title} (#${index + 1})`)}
                          className="p-2 text-gray-400 hover:text-primary-600"
                          title={t('admin.view', lang)}
                        >
                          <Eye size={18} />
                        </button>
                        <a href={item.pdf_url} target="_blank" className="p-2 text-gray-400 hover:text-primary-600" title={t('admin.openNewTab', lang)}>
                          <ExternalLink size={18} />
                        </a>
                        <button onClick={() => handleKeepOne(item.id, group)} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                          {t('admin.keep', lang)}
                        </button>
                        <button onClick={() => handleHide(item.id)} className="p-2 text-gray-400 hover:text-red-600" title={t('admin.hide', lang)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg truncate">{viewingTitle}</h3>
              <div className="flex items-center gap-2">
                <a
                  href={viewingPdf}
                  target="_blank"
                  className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
                >
                  {t('admin.openNewTab', lang)}
                </a>
                <button onClick={() => setViewingPdf(null)} className="p-2 hover:bg-gray-100 rounded">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex-1 p-2">
              <iframe
                src={viewingPdf}
                className="w-full h-full rounded border"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
