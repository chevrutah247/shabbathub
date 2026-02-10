'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FileText, Trash2, Check, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface DuplicateGroup {
  title: string;
  count: number;
  items: any[];
}

export default function AdminDuplicates() {
  const [groups, setGroups] = useState<DuplicateGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [totalDuplicates, setTotalDuplicates] = useState(0);

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
    if (!confirm('Скрыть этот документ?')) return;
    await supabase.from('issues').update({ is_active: false }).eq('id', id);
    fetchDuplicates();
  };

  const handleKeepOne = async (keepId: string, group: DuplicateGroup) => {
    if (!confirm('Оставить только этот и скрыть остальные?')) return;
    const idsToHide = group.items.filter(item => item.id !== keepId).map(item => item.id);
    await supabase.from('issues').update({ is_active: false }).in('id', idsToHide);
    fetchDuplicates();
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
          <h1 className="text-3xl font-bold">Дубликаты</h1>
          <p className="text-gray-500 mt-1">{groups.length} групп · {totalDuplicates} лишних</p>
        </div>
        <button onClick={fetchDuplicates} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          Обновить
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <Check className="mx-auto text-green-500 mb-4" size={48} />
          <h2 className="text-xl font-bold">Дубликатов нет!</h2>
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
                  {group.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      {item.thumbnail_url ? (
                        <img src={item.thumbnail_url} alt="" className="w-16 h-20 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                          <FileText className="text-gray-400" size={24} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500">Добавлен: {new Date(item.created_at).toLocaleDateString('ru-RU')}</p>
                        <p className="text-xs text-gray-400 truncate mt-1">{item.pdf_url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={item.pdf_url} target="_blank" className="p-2 text-gray-400 hover:text-primary-600">
                          <ExternalLink size={18} />
                        </a>
                        <button onClick={() => handleKeepOne(item.id, group)} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                          Оставить
                        </button>
                        <button onClick={() => handleHide(item.id)} className="p-2 text-gray-400 hover:text-red-600">
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
    </div>
  );
}
