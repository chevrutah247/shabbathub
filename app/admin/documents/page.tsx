'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Edit2, Trash2, X, Save, ChevronLeft, ChevronRight, FileText } from 'lucide-react';


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

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('issues').select('id, title, issue_number, parsha_id, gregorian_date, thumbnail_url, pdf_url, is_active, created_at', { count: 'exact' }).order('created_at', { ascending: false }).range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    if (search) query = query.ilike('title', `%${search}%`);
    const { data, count } = await query;
    setDocuments(data || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  const handleSave = async () => {
    if (!editingDoc) return;
    setSaving(true);
    await supabase.from('issues').update({ title: editingDoc.title, issue_number: editingDoc.issue_number, parsha_id: editingDoc.parsha_id || null, gregorian_date: editingDoc.gregorian_date || null, is_active: editingDoc.is_active }).eq('id', editingDoc.id);
    setEditingDoc(null);
    fetchDocuments();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Скрыть документ?')) return;
    await supabase.from('issues').update({ is_active: false }).eq('id', id);
    fetchDocuments();
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Документы</h1>
        <span className="text-gray-500">{totalCount.toLocaleString()} всего</span>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} placeholder="Поиск..." className="w-full pl-12 pr-4 py-3 border rounded-xl"/>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Документ</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Номер</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Глава</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Статус</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? <tr><td colSpan={5} className="px-4 py-8 text-center">Загрузка...</td></tr> : documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {doc.thumbnail_url ? <img src={doc.thumbnail_url} alt="" className="w-10 h-14 object-cover rounded"/> : <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center"><FileText className="text-gray-400" size={16}/></div>}
                    <span className="font-medium max-w-xs truncate">{doc.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{doc.issue_number || '—'}</td>
                <td className="px-4 py-3 text-gray-600">{doc.parsha_id ? PARSHAS.find(p => p.id === doc.parsha_id)?.name : '—'}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${doc.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{doc.is_active ? 'Активен' : 'Скрыт'}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditingDoc({...doc})} className="p-2 text-gray-400 hover:text-primary-600"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(doc.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <span className="text-sm text-gray-500">Стр. {page + 1} из {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-2 rounded border disabled:opacity-50"><ChevronLeft size={20}/></button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-2 rounded border disabled:opacity-50"><ChevronRight size={20}/></button>
            </div>
          </div>
        )}
      </div>

      {editingDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg mx-4">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Редактировать</h2>
              <button onClick={() => setEditingDoc(null)}><X size={24}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Название</label><input type="text" value={editingDoc.title} onChange={(e) => setEditingDoc({...editingDoc, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/></div>
              <div><label className="block text-sm font-medium mb-1">Номер выпуска</label><input type="text" value={editingDoc.issue_number || ''} onChange={(e) => setEditingDoc({...editingDoc, issue_number: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/></div>
              <div><label className="block text-sm font-medium mb-1">Глава</label><select value={editingDoc.parsha_id || ''} onChange={(e) => setEditingDoc({...editingDoc, parsha_id: e.target.value ? parseInt(e.target.value) : null})} className="w-full px-4 py-2 border rounded-lg"><option value="">—</option>{PARSHAS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
              <div><label className="block text-sm font-medium mb-1">Дата</label><input type="date" value={editingDoc.gregorian_date || ''} onChange={(e) => setEditingDoc({...editingDoc, gregorian_date: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={editingDoc.is_active} onChange={(e) => setEditingDoc({...editingDoc, is_active: e.target.checked})}/><label>Активен</label></div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setEditingDoc(null)} className="px-4 py-2 text-gray-600">Отмена</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2"><Save size={18}/>{saving ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
