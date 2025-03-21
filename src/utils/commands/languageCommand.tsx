// utils/commands/languageCommand.tsx
import React from "react";
import { Theme } from "@/components/Terminal";

export const processLanguageCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme,
  language: string // اضافه کردن language به آرگومان‌ها
): React.ReactNode => {
  return (
    <div>
      <p className="mb-2">
        Current language:{" "}
        <span className={`text-[${currentTheme.highlightColor}]`}>
          {language}
        </span>
      </p>
      <p className="mb-2">
        Use the language selector in the top right to change languages.
      </p>
    </div>
  );
};
