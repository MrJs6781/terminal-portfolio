// contexts/LanguageContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "fr" | "es" | "de" | "zh" | "ja" | "ar" | "fa";

export const languageLabels: Record<Language, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  zh: "中文",
  ja: "日本語",
  ar: "العربية",
  fa: "فارسی",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  isRtl: boolean;
}

const defaultValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  translate: (key: string) => key,
  isRtl: false,
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

export const useLanguage = () => useContext(LanguageContext);

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage = "en",
}) => {
  const getBrowserLanguage = (): Language => {
    if (typeof window === "undefined") return initialLanguage;
    const browserLang = navigator.language.split("-")[0];
    return Object.keys(languageLabels).includes(browserLang)
      ? (browserLang as Language)
      : initialLanguage;
  };

  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [translations, setTranslations] = useState<Translations>({});
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const langData = await import(`../data/translations/${language}.json`);
        setTranslations((prev) => ({
          ...prev,
          [language]: langData.default,
        }));
        setIsRtl(["ar", "fa"].includes(language));
        localStorage.setItem("preferred-language", language);
        document.documentElement.lang = language;
        document.documentElement.dir = isRtl ? "rtl" : "ltr";
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
      }
    };
    loadTranslations();
  }, [language]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "preferred-language"
    ) as Language;
    if (savedLanguage && Object.keys(languageLabels).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      setLanguage(getBrowserLanguage());
    }
  }, []);

  const translate = (key: string): string => {
    return translations[language]?.[key] || key; // فقط کلید رو برگردون، بدون فال‌بک به انگلیسی
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translate, isRtl }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
