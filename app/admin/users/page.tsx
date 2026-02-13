'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, ShieldCheck, Edit2, X, Save, KeyRound, Mail } from 'lucide-react';


const ROLES = [
  { id: 'admin', name: 'Администратор', color: 'bg-red-100 text-red-700' },
  { id: 'editor', name: 'Редактор', color: 'bg-blue-100 text-blue-700' },
  { id: 'author', name: 'Автор', color: 'bg-green-100 text-green-700' },
  { id: 'subscriber', name: 'Подписчик', color: 'bg-gray-100 text-gray-700' }
];

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSave = async () => {
    if (!editingUser) return;
    setSaving(true);
    await supabase.from('profiles').update({ display_name: editingUser.display_name, role: editingUser.role }).eq('id', editingUser.id);
    setEditingUser(null);
    fetchUsers();
    setSaving(false);
  };

  const getRoleInfo = (role: string) => ROLES.find(r => r.id === role) || ROLES[3];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Пользователи</h1>
        <span className="text-gray-500">{users.length} всего</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {ROLES.map((role) => (
          <div key={role.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className={role.id === 'admin' ? 'text-red-500' : 'text-gray-400'} size={18}/>
              <div><p className="text-sm text-gray-500">{role.name}</p><p className="text-xl font-bold">{users.filter(u => u.role === role.id).length}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Пользователь</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Роль</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? <tr><td colSpan={4} className="px-4 py-8 text-center">Загрузка...</td></tr> : users.map((user) => {
              const roleInfo = getRoleInfo(user.role);
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-medium">{(user.display_name || user.email || '?')[0].toUpperCase()}</span>
                      </div>
                      <span className="font-medium">{user.display_name || 'Без имени'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${roleInfo.color}`}>{roleInfo.name}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditingUser({...user})} className="p-2 text-gray-400 hover:text-primary-600"><Edit2 size={18}/></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Редактировать</h2>
              <button onClick={() => setEditingUser(null)}><X size={24}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Email</label><input type="text" value={editingUser.email || ''} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50"/></div>
              <div><label className="block text-sm font-medium mb-1">Имя</label><input type="text" value={editingUser.display_name || ''} onChange={(e) => setEditingUser({...editingUser, display_name: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/></div>
              <div><label className="block text-sm font-medium mb-1">Роль</label><select value={editingUser.role || 'subscriber'} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg">{ROLES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></div>
            </div>
            <div className="p-6 border-t space-y-3">
              {resetMsg && <p className={resetMsg.includes('Ошибка') ? 'text-red-600 text-sm' : 'text-green-600 text-sm'}>{resetMsg}</p>}
              <button onClick={async () => {
                setResetMsg('');
                try {
                  const { error } = await supabase.auth.resetPasswordForEmail(editingUser.email, { redirectTo: 'https://shabbathub.com/reset-password' });
                  if (error) throw error;
                  setResetMsg('Письмо для сброса пароля отправлено на ' + editingUser.email);
                } catch (e: any) { setResetMsg('Ошибка: ' + e.message); }
              }} className="w-full px-4 py-2 border border-amber-300 text-amber-700 bg-amber-50 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-100 transition-colors">
                <KeyRound size={16}/>Отправить сброс пароля
              </button>
              <div className="flex justify-end gap-3">
                <button onClick={() => { setEditingUser(null); setResetMsg(''); }} className="px-4 py-2 text-gray-600">Отмена</button>
                <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2"><Save size={18}/>{saving ? '...' : 'Сохранить'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
