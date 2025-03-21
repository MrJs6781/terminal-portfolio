// components/ThemeList.tsx
import React from "react";
import { Theme } from "./Terminal";

interface ThemeListProps {
  themes: Theme[];
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const ThemeList: React.FC<ThemeListProps> = ({
  themes,
  currentTheme,
  setCurrentTheme,
}) => {
  return (
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
            className={`font-medium cursor-pointer ${
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
  );
};

export default ThemeList;
