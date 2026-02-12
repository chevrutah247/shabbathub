'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'ru' | 'en' | 'he' | 'uk';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('shabbathub-lang') as Lang | null;
    if (saved && ['ru', 'en', 'he', 'uk'].includes(saved)) {
      setLangState(saved);
    } else {
      // Автоопределение по браузеру
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('he')) setLangState('he');
      else if (browserLang.startsWith('uk')) setLangState('uk');
      else if (browserLang.startsWith('en')) setLangState('en');
      else setLangState('ru');
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('shabbathub-lang', newLang);
    // Обновляем атрибуты html
    document.documentElement.lang = newLang === 'uk' ? 'uk' : newLang;
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = lang === 'uk' ? 'uk' : lang;
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    }
  }, [lang, mounted]);

  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useLang() {
  const { lang } = useContext(LanguageContext);
  return lang;
}
