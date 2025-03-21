// utils/commands/themeCommand.tsx
import React from "react";
import { Theme } from "@/components/Terminal";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {themes.map((theme, index) => (
          <div
            key={index}
            className={`px-3 py-2 rounded cursor-pointer border ${
              theme.id === currentTheme.id
                ? `border-[${currentTheme.highlightColor}] bg-[${currentTheme.highlightColor}]/10`
                : "border-gray-700 hover:border-gray-500"
            }`}
            onClick={() => setCurrentTheme(theme)}
          >
            <span
              className={`font-medium ${
                theme.id === currentTheme.id
                  ? `text-[${currentTheme.highlightColor}]`
                  : "text-gray-300"
              }`}
            >
              {theme.name}
            </span>
          </div>
        ))}
      </div>
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
