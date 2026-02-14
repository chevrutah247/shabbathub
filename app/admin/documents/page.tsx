'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Edit2, Trash2, X, Save, ChevronLeft, ChevronRight, FileText, AlertCircle, CheckCircle, Filter } from 'lucide-react';


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

type FilterMode = 'all' | 'review' | 'complete';

// Проверка: документ заполнен полностью?
function isDocComplete(doc: any): boolean {
  return !!(doc.publication_id && doc.issue_number && doc.gregorian_date && doc.parsha_id);
}

// Какие поля не заполнены
function getMissingFields(doc: any): string[] {
  const missing: string[] = [];
  if (!doc.publication_id) missing.push('публикация');
  if (!doc.issue_number) missing.push('номер');
  if (!doc.gregorian_date) missing.push('дата');
  if (!doc.parsha_id) missing.push('глава');
  return missing;
}

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [pubSearch, setPubSearch] = useState('');
  const [pubDropdown, setPubDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publications, setPublications] = useState<{ id: string; title_ru: string }[]>([]);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [reviewCount, setReviewCount] = useState(0);

  // Загрузить публикации для dropdown
  useEffect(() => {
    async function fetchPublications() {
      const { data } = await supabase
        .from('publications')
        .select('id, title_ru')
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

  const handleSave = async () => {
    if (!editingDoc) return;
    setSaving(true);
    await supabase.from('issues').update({
      title: editingDoc.title,
      issue_number: editingDoc.issue_number,
      parsha_id: editingDoc.parsha_id || null,
      publication_id: editingDoc.publication_id || null,
      gregorian_date: editingDoc.gregorian_date || null,
      is_active: editingDoc.is_active,
    }).eq('id', editingDoc.id);
    setEditingDoc(null);
    fetchDocuments();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Скрыть документ?')) return;
    await supabase.from('issues').update({ is_active: false }).eq('id', id);
    fetchDocuments();
  };

  const getPublicationName = (pubId: string | null) => {
    if (!pubId) return null;
    return publications.find(p => p.id === pubId)?.title_ru || null;
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Документы</h1>
        <span className="text-gray-500">{totalCount.toLocaleString()} всего</span>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setFilterMode('all'); setPage(0); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterMode === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
        >
          Все
        </button>
        <button
          onClick={() => { setFilterMode('review'); setPage(0); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filterMode === 'review' ? 'bg-amber-500 text-white' : 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50'}`}
        >
          <AlertCircle size={16} />
          На проверке
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
          Заполнены
        </button>
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
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Публикация</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Номер</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Дата</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Глава</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Статус</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center">Загрузка...</td></tr>
            ) : documents.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                {filterMode === 'review' ? 'Все документы заполнены!' : filterMode === 'complete' ? 'Нет полностью заполненных документов' : 'Нет документов'}
              </td></tr>
            ) : documents.map((doc) => {
              const missing = getMissingFields(doc);
              const complete = missing.length === 0;
              const pubName = getPublicationName(doc.publication_id);

              return (
                <tr key={doc.id} className={`hover:bg-gray-50 ${!doc.is_active ? 'opacity-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {doc.thumbnail_url ? <img src={doc.thumbnail_url} alt="" className="w-10 h-14 object-cover rounded"/> : <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center"><FileText className="text-gray-400" size={16}/></div>}
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
                      <span className="text-gray-600 text-sm">{new Date(doc.gregorian_date).toLocaleDateString('ru-RU')}</span>
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
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Скрыт</span>
                    ) : complete ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">✓ Заполнен</span>
                    ) : (
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">На проверке</span>
                        <p className="text-xs text-gray-400 mt-1">Нет: {missing.join(', ')}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => { setEditingDoc({...doc}); setPubSearch(''); setPubDropdown(false); }} className="p-2 text-gray-400 hover:text-primary-600"><Edit2 size={18}/></button>
                    <button onClick={() => handleDelete(doc.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                  </td>
                </tr>
              );
            })}
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

      {/* Модалка редактирования */}
      {editingDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg mx-4">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Редактировать</h2>
                {getMissingFields(editingDoc).length > 0 && (
                  <p className="text-sm text-amber-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    Не заполнено: {getMissingFields(editingDoc).join(', ')}
                  </p>
                )}
              </div>
              <button onClick={() => { setEditingDoc(null); setPubDropdown(false); }}><X size={24}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название</label>
                <input type="text" value={editingDoc.title} onChange={(e) => setEditingDoc({...editingDoc, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Публикация
                  {!editingDoc.publication_id && <span className="text-amber-500 ml-1">⚠</span>}
                </label>
                <input
                  type="text"
                  value={pubSearch || (editingDoc.publication_id ? (publications.find(p => p.id === editingDoc.publication_id)?.title_ru || '') : '')}
                  onChange={(e) => { setPubSearch(e.target.value); setPubDropdown(true); if (!e.target.value) setEditingDoc({...editingDoc, publication_id: null}); }}
                  onFocus={() => setPubDropdown(true)}
                  placeholder="Начните вводить название..."
                  className={`w-full px-4 py-2 border rounded-lg ${!editingDoc.publication_id ? 'border-amber-300 bg-amber-50' : ''}`}
                />
                {editingDoc.publication_id && <button type="button" onClick={() => { setEditingDoc({...editingDoc, publication_id: null}); setPubSearch(''); }} className="absolute right-3 top-8 text-gray-400 hover:text-red-500"><X size={16}/></button>}
                {pubDropdown && (
                  <div className="absolute z-10 left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {publications.filter(p => {
                      if (!pubSearch) return true;
                      return p.title_ru.toLowerCase().includes(pubSearch.toLowerCase());
                    }).map(p => (
                      <button key={p.id} type="button" onClick={() => { setEditingDoc({...editingDoc, publication_id: p.id}); setPubSearch(''); setPubDropdown(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-50 transition-colors ${editingDoc.publication_id === p.id ? 'bg-primary-50 font-medium text-primary-700' : 'text-gray-700'}`}>
                        {p.title_ru}
                      </button>
                    ))}
                    {publications.filter(p => !pubSearch || p.title_ru.toLowerCase().includes(pubSearch.toLowerCase())).length === 0 && (
                      <p className="px-4 py-2 text-sm text-gray-400">Не найдено</p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Номер выпуска
                  {!editingDoc.issue_number && <span className="text-amber-500 ml-1">⚠</span>}
                </label>
                <input type="text" value={editingDoc.issue_number || ''} onChange={(e) => setEditingDoc({...editingDoc, issue_number: e.target.value})} className={`w-full px-4 py-2 border rounded-lg ${!editingDoc.issue_number ? 'border-amber-300 bg-amber-50' : ''}`}/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Глава
                  {!editingDoc.parsha_id && <span className="text-amber-500 ml-1">⚠</span>}
                </label>
                <select value={editingDoc.parsha_id || ''} onChange={(e) => setEditingDoc({...editingDoc, parsha_id: e.target.value ? parseInt(e.target.value) : null})} className={`w-full px-4 py-2 border rounded-lg ${!editingDoc.parsha_id ? 'border-amber-300 bg-amber-50' : ''}`}>
                  <option value="">—</option>
                  {PARSHAS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Дата
                  {!editingDoc.gregorian_date && <span className="text-amber-500 ml-1">⚠</span>}
                </label>
                <input type="date" value={editingDoc.gregorian_date || ''} onChange={(e) => setEditingDoc({...editingDoc, gregorian_date: e.target.value})} className={`w-full px-4 py-2 border rounded-lg ${!editingDoc.gregorian_date ? 'border-amber-300 bg-amber-50' : ''}`}/>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editingDoc.is_active} onChange={(e) => setEditingDoc({...editingDoc, is_active: e.target.checked})}/>
                <label>Активен</label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setEditingDoc(null)} className="px-4 py-2 text-gray-600">Отмена</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2">
                <Save size={18}/>{saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
