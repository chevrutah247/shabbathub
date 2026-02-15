'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageCircle, Trash2, RefreshCw, Clock, User, Mail, Phone } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  contact: string;
  message: string;
  ip: string | null;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    setMessages(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить это сообщение?')) return;
    setDeleting(id);
    await supabase.from('contact_messages').delete().eq('id', id);
    setMessages(prev => prev.filter(m => m.id !== id));
    setDeleting(null);
  };

  const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleString('ru-RU', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Сообщения</h1>
          <p className="text-gray-500 mt-1">Обращения через форму обратной связи</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">{messages.length} всего</span>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <RefreshCw size={18} />
            Обновить
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500">Загрузка...</div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Сообщений пока нет</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-900">{msg.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEmail(msg.contact) ? (
                        <Mail size={16} className="text-gray-400" />
                      ) : (
                        <Phone size={16} className="text-gray-400" />
                      )}
                      {isEmail(msg.contact) ? (
                        <a href={`mailto:${msg.contact}`} className="text-primary-600 hover:underline text-sm">
                          {msg.contact}
                        </a>
                      ) : (
                        <span className="text-gray-600 text-sm">{msg.contact}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock size={12} />
                      {formatDate(msg.created_at)}
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(msg.id)}
                  disabled={deleting === msg.id}
                  className="p-2 text-gray-300 hover:text-red-500 transition flex-shrink-0 disabled:opacity-50"
                  title="Удалить"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
