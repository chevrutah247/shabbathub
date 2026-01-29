'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { t, Language } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru');

  useEffect(() => {
    // Get saved language from localStorage or browser
    const savedLang = localStorage.getItem('shabbathub-lang') as Language;
    if (savedLang && ['ru', 'en', 'he'].includes(savedLang)) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('shabbathub-lang', newLang);
    // Update HTML dir and lang attributes
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };

  const translate = (key: string) => t(key, lang);

  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for getting translated content based on language
export function useLocalizedField<T extends Record<string, any>>(
  item: T,
  fieldPrefix: string
): string {
  const { lang } = useLanguage();
  const field = `${fieldPrefix}_${lang}` as keyof T;
  const fallbackField = `${fieldPrefix}_ru` as keyof T;
  
  return (item[field] as string) || (item[fallbackField] as string) || '';
}
