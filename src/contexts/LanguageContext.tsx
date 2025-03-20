import React, { createContext, useContext, useState, useEffect } from 'react';
import languageData from '@/data/languages.json';

type Languages = 'en' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Languages;
  setLanguage: (lang: Languages) => void;
  t: (key: string, params?: string[]) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => ''
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Languages>('en');
  
  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('terminal-language');
    if (savedLanguage && ['en', 'es', 'fr', 'de'].includes(savedLanguage)) {
      setLanguage(savedLanguage as Languages);
    }
  }, []);
  
  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('terminal-language', language);
  }, [language]);
  
  // Translation function
  const t = (key: string, params: string[] = []): string => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: any = languageData[language];
    
    // Navigate through nested properties
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // If key doesn't exist, return the key
        return key;
      }
    }
    
    // Replace parameters in the string
    if (typeof value === 'string' && params.length > 0) {
      params.forEach((param, index) => {
        value = value.replace(`{${index}}`, param);