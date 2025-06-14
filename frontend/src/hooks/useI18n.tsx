"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  availableLocales: string[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  en,
  ru,
};

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setCurrentLocale] = useState<string>('en');

  useEffect(() => {
    // Load locale from localStorage or browser preference
    const savedLocale = localStorage.getItem('locale');
    const browserLocale = navigator.language.split('-')[0];
    const initialLocale = savedLocale || (browserLocale === 'ru' ? 'ru' : 'en');
    setCurrentLocale(initialLocale);
  }, []);

  const setLocale = (newLocale: string) => {
    setCurrentLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace parameters in the translation
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  };

  const value: I18nContextType = {
    locale,
    setLocale,
    t,
    availableLocales: ['en', 'ru'],
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
