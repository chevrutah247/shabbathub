'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { t } from '@/lib/translations';
import { useLanguage } from '@/lib/language-context';
import { LayoutDashboard, FileText, Users, BookOpen, LogOut, ChevronLeft, Copy, Mail, MessageCircle, Shield } from 'lucide-react';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const { lang } = useLanguage();

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?redirect=/admin');
        return;
      }

      setUserEmail(session.user.email || '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile?.role === 'admin' || profile?.role === 'editor') {
        setIsAdmin(true);
      } else {
        router.push('/');
        return;
      }

      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-primary-900 text-white shadow-xl">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white mb-6">
            <ChevronLeft size={20} />
            <span>{t('admin.backToSite', lang)}</span>
          </Link>
          <h1 className="text-xl font-bold">ShabbatHub</h1>
          <p className="text-sm text-white/60">{t('admin.panel', lang)}</p>
        </div>

        <nav className="mt-6">
          <Link href="/admin" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white">
            <LayoutDashboard size={20} />
            {t('admin.overview', lang)}
          </Link>
          <Link href="/admin/documents" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white">
            <FileText size={20} />
            {t('admin.documents', lang)}
          </Link>
          <Link href="/admin/publications" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white">
            <BookOpen size={20} />
            {t('admin.publications', lang)}
          </Link>
          <Link href="/admin/duplicates" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white">
            <Copy size={20} />
            {t('admin.duplicates', lang)}
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white">
            <Users size={20} />
            {t('admin.users', lang)}
          </Link>
          <Link href="/admin/subscribers" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white">
            <Mail size={20} />
            {t('admin.subscribers', lang)}
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white">
            <MessageCircle size={20} />
            {t('admin.messagesNav', lang)}
          </Link>
          <Link href="/admin/security" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/10 hover:text-white">
            <Shield size={20} />
            {t('admin.monitoring', lang)}
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="text-sm text-white/60 mb-2 truncate">{userEmail}</div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-white">
            <LogOut size={18} />
            {t('admin.signOut', lang)}
          </button>
        </div>
      </aside>

      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
