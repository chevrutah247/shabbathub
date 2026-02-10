'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Users, Shield, ShieldCheck, ShieldX, Edit2, X, Save } from 'lucide-react';

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
  const supabase = createClientComponentClient();

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [supabase]);

  const handleEdit = (user: any) => {
    setEditingUser({ ...user });
  };

  const handleSave = async () => {
    if (!editingUser) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: editingUser.display_name,
        role: editingUser.role
      })
      .eq('id', editingUser.id);

    if (error) {
      alert('Ошибка сохранения: ' + error.message);
    } else {
      setEditingUser(null);
      fetchUsers();
    }
    setSaving(false);
  };

  const getRoleInfo = (role: string) => {
    return ROLES.find(r => r.id === role) || ROLES[3];
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <ShieldCheck className="text-red-500" size={18} />;
      case 'editor': return <Shield className="text-blue-500" size={18} />;
      case 'author': return <Shield className="text-green-500" size={18} />;
      default: return <ShieldX className="text-gray-400" size={18} />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Пользователи</h1>
        <span className="text-gray-500">{users.length} всего</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {ROLES.map((role) => {
          const count = users.filter(u => u.role === role.id).length;
          return (
            <div key={role.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                {getRoleIcon(role.id)}
                <div>
                  <p className="text-sm text-gray-500">{role.name}</p>
                  <p className="text-xl font-bold">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Пользователь</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Роль</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Дата регистрации</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Загрузка...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Пользователи не найдены
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-medium">
                            {(user.display_name || user.email || '?')[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {user.display_name || 'Без имени'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${roleInfo.color}`}>
                        {roleInfo.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('ru-RU') : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Редактировать пользователя</h2>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="text"
                  value={editingUser.email || ''}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                <input
                  type="text"
                  value={editingUser.display_name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, display_name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
                <select
                  value={editingUser.role || 'subscriber'}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {ROLES.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Save size={18} />
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
