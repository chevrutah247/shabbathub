'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Search, BookOpen, Info, Heart, Plus, FileText, 
  Star, User, LogIn, LogOut, Globe, ChevronDown 
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useAuth } from '@/lib/auth-context';
import { Language } from '@/lib/translations';

const languageNames: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
  he: 'עברית',
};

const languageFlags: Record<Language, string> = {
  ru: '🇷🇺',
  en: '🇺🇸',
  he: '🇮🇱',
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { lang, setLang, t } = useLanguage();
  const { user, profile, signOut, loading } = useAuth();

  const navLinks = [
    { href: '/catalog', label: t('nav.catalog'), icon: BookOpen },
    { href: '/about', label: t('nav.about'), icon: Info },
    { href: '/donate', label: t('nav.donate'), icon: Heart },
  ];

  const userLinks = user ? [
    { href: '/add-publication', label: t('nav.addPublication'), icon: Plus },
    { href: '/add-pdf', label: t('nav.addPdf'), icon: FileText },
    { href: '/my-documents', label: t('nav.myDocuments'), icon: FileText },
    { href: '/favorites', label: t('nav.favorites'), icon: Star },
  ] : [];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold">
              <span className="text-primary-700">Shabbat</span>
              <span className="text-gold-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-700 transition-colors font-medium"
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <Link
              href="/search"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              <Search size={18} />
              <span className="text-sm">{t('nav.search')}...</span>
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-primary-700 transition-colors"
              >
                <Globe size={18} />
                <span className="text-sm">{languageFlags[lang]}</span>
                <ChevronDown size={14} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {(['ru', 'en', 'he'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 ${
                        lang === l ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                      }`}
                    >
                      <span>{languageFlags[l]}</span>
                      <span>{languageNames[l]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu / Auth */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-primary-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User size={18} className="text-primary-700" />
                  </div>
                  <span className="text-sm font-medium max-w-24 truncate">
                    {profile?.display_name || profile?.first_name || t('nav.account')}
                  </span>
                  <ChevronDown size={14} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {userLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <link.icon size={18} />
                        {link.label}
                      </Link>
                    ))}
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
              >
                <LogIn size={18} />
                {t('nav.login')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <Link
              href="/search"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl text-gray-600"
            >
              <Search size={20} />
              <span>{t('nav.search')}</span>
            </Link>

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}

            {/* User links (if logged in) */}
            {user && (
              <>
                <hr className="border-gray-200" />
                {userLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <link.icon size={20} />
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            {/* Language Switcher */}
            <div className="flex gap-2 px-4 py-2">
              {(['ru', 'en', 'he'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 px-3 py-2 rounded-lg text-center ${
                    lang === l 
                      ? 'bg-primary-100 text-primary-700 font-medium' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {languageFlags[l]} {languageNames[l]}
                </button>
              ))}
            </div>

            {/* Auth */}
            <hr className="border-gray-200" />
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full"
              >
                <LogOut size={20} />
                {t('nav.logout')}
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl font-medium"
              >
                <LogIn size={20} />
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
