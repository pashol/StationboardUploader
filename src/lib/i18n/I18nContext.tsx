'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, Language, Translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: { code: Language; name: string; flag: string }[];
}

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
];

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    // Store preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('stationboard-language', lang);
    }
  }, []);

  // Get translations for current language
  const t = translations[language];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
