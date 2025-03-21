// utils/commands/themeCommand.tsx
import React from "react";
import { Theme } from "@/components/Terminal";
import ThemeList from "@/components/ThemeList"; // اضافه کردن ایمپورت

export const processThemeCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme,
  themes: Theme[],
  setCurrentTheme: (theme: Theme) => void
): React.ReactNode => {
  return (
    <div>
      <p className={`font-bold text-[${currentTheme.successColor}] mb-2`}>
        {translate("help_title")}
      </p>
      <ThemeList
        themes={themes}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
      <p className="mt-3 text-gray-400">
        Type{" "}
        <span className={`text-[${currentTheme.highlightColor}]`}>
          theme [name]
        </span>{" "}
        to switch themes
      </p>
    </div>
  );
};
