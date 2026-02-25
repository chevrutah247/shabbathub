'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, ShieldCheck, Edit2, X, Save, KeyRound, Mail } from 'lucide-react';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  editor: 'bg-blue-100 text-blue-700',
  author: 'bg-green-100 text-green-700',
  subscriber: 'bg-gray-100 text-gray-700',
};

const ROLE_IDS = ['admin', 'editor', 'author', 'subscriber'] as const;

export default function AdminUsers() {
  const { lang } = useLanguage();
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

  const getRoleName = (role: string) => {
    const key = role === 'author' || role === 'subscriber' ? `admin.${role}` : `roles.${role}`;
    return t(key, lang);
  };
  const getRoleColor = (role: string) => ROLE_COLORS[role] || ROLE_COLORS.subscriber;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{t('admin.users', lang)}</h1>
        <span className="text-gray-500">{users.length} {t('admin.total', lang)}</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {ROLE_IDS.map((roleId) => (
          <div key={roleId} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className={roleId === 'admin' ? 'text-red-500' : 'text-gray-400'} size={18}/>
              <div><p className="text-sm text-gray-500">{getRoleName(roleId)}</p><p className="text-xl font-bold">{users.filter(u => u.role === roleId).length}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.userName', lang)}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t('admin.role', lang)}</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">{t('admin.actionsCol', lang)}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? <tr><td colSpan={4} className="px-4 py-8 text-center">{t('loading', lang)}</td></tr> : users.map((user) => {
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-medium">{(user.display_name || user.email || '?')[0].toUpperCase()}</span>
                      </div>
                      <span className="font-medium">{user.display_name || t('admin.noName', lang)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>{getRoleName(user.role)}</span></td>
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
              <h2 className="text-xl font-bold">{t('admin.edit', lang)}</h2>
              <button onClick={() => setEditingUser(null)}><X size={24}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium mb-1">Email</label><input type="text" value={editingUser.email || ''} disabled className="w-full px-4 py-2 border rounded-lg bg-gray-50"/></div>
              <div><label className="block text-sm font-medium mb-1">{t('profile.firstName', lang)}</label><input type="text" value={editingUser.display_name || ''} onChange={(e) => setEditingUser({...editingUser, display_name: e.target.value})} className="w-full px-4 py-2 border rounded-lg"/></div>
              <div><label className="block text-sm font-medium mb-1">{t('admin.role', lang)}</label><select value={editingUser.role || 'subscriber'} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg">{ROLE_IDS.map(id => <option key={id} value={id}>{getRoleName(id)}</option>)}</select></div>
            </div>
            <div className="p-6 border-t space-y-3">
              {resetMsg && <p className={resetMsg.startsWith(t('admin.error', lang)) ? 'text-red-600 text-sm' : 'text-green-600 text-sm'}>{resetMsg}</p>}
              <button onClick={async () => {
                setResetMsg('');
                try {
                  const { error } = await supabase.auth.resetPasswordForEmail(editingUser.email, { redirectTo: 'https://shabbathub.com/reset-password' });
                  if (error) throw error;
                  setResetMsg(t('admin.passwordResetSent', lang) + ' ' + editingUser.email);
                } catch (e: any) { setResetMsg(t('admin.error', lang) + ' ' + e.message); }
              }} className="w-full px-4 py-2 border border-amber-300 text-amber-700 bg-amber-50 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-100 transition-colors">
                <KeyRound size={16}/>{t('admin.sendPasswordReset', lang)}
              </button>
              <div className="flex justify-end gap-3">
                <button onClick={() => { setEditingUser(null); setResetMsg(''); }} className="px-4 py-2 text-gray-600">{t('admin.cancelBtn', lang)}</button>
                <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2"><Save size={18}/>{saving ? '...' : t('admin.saveBtn', lang)}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
