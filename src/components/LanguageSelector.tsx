// components/LanguageSelector.tsx
import React, { useState } from "react";
import {
  useLanguage,
  Language,
  languageLabels,
} from "@/contexts/LanguageContext";
import { ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <Globe size={16} />
        <span>{languageLabels[language]}</span>
        <ChevronDown
          size={14}
          className={isOpen ? "transform rotate-180" : ""}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 right-0 w-36 bg-gray-800 rounded shadow-lg py-1"
          >
            {Object.entries(languageLabels).map(([langCode, langName]) => (
              <button
                key={langCode}
                onClick={() => handleLanguageChange(langCode as Language)}
                className={`w-full text-left px-3 py-2 hover:bg-gray-700 transition-colors ${
                  language === langCode ? "bg-gray-700 text-green-400" : ""
                }`}
              >
                {langName}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
