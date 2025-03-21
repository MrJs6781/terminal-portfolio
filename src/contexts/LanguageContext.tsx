"use client";

// contexts/LanguageContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define available languages
export type Language = "en" | "fr" | "es" | "de" | "zh" | "ja" | "ar";

// Define language labels for the selector
export const languageLabels: Record<Language, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  zh: "中文",
  ja: "日本語",
  ar: "العربية",
};

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  isRtl: boolean;
}

// Default values for the context
const defaultValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  translate: (key: string) => key,
  isRtl: false,
};

// Create the context
const LanguageContext = createContext<LanguageContextType>(defaultValue);

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Types for the translations and props
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

// Create the provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage = "en",
}) => {
  // Get the browser language or use the initial language
  const getBrowserLanguage = (): Language => {
    if (typeof window === "undefined") return initialLanguage;

    const browserLang = navigator.language.split("-")[0];
    return (
      Object.keys(languageLabels).includes(browserLang)
        ? browserLang
        : initialLanguage
    ) as Language;
  };

  // State for the current language
  const [language, setLanguage] = useState<Language>(initialLanguage);

  // State for the translations
  const [translations, setTranslations] = useState<Translations>({});

  // State for RTL languages
  const [isRtl, setIsRtl] = useState(false);

  // Load translations when the language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const langData = await import(`../data/translations/${language}.json`);
        setTranslations((prev) => ({
          ...prev,
          [language]: langData.default,
        }));

        // Set RTL status based on language
        setIsRtl(["ar"].includes(language));

        // Save language preference to localStorage
        localStorage.setItem("preferred-language", language);

        // Set HTML lang attribute and dir attribute
        document.documentElement.lang = language;
        document.documentElement.dir = isRtl ? "rtl" : "ltr";
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
      }
    };

    loadTranslations();
  }, [language, isRtl]);

  // Load saved language preference or browser language on first render
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

  // Translation function
  const translate = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      // Fallback to English if translation not found
      if (language !== "en" && translations["en"] && translations["en"][key]) {
        return translations["en"][key];
      }
      // Return the key if no translation found
      return key;
    }
    return translations[language][key];
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
