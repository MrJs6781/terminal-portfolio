// components/TerminalHistory.tsx
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TerminalHistoryItem {
  command: string;
  output: React.ReactNode;
}

interface Theme {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  promptColor: string;
  highlightColor: string;
  errorColor: string;
  successColor: string;
}

interface TerminalHistoryProps {
  history: TerminalHistoryItem[];
  currentTheme: Theme;
}

const TerminalHistory: React.FC<TerminalHistoryProps> = ({
  history,
  currentTheme,
}) => {
  const { isRtl, currentFont } = useLanguage();

  return (
    <div
      style={{
        direction: isRtl ? "rtl" : "ltr",
        textAlign: isRtl ? "right" : "left",
        fontFamily: currentFont,
      }}
    >
      {history.map((item, index) => (
        <div key={index} className="mb-4">
          {item.command && (
            <div className="flex items-center mb-1">
              <span
                className={`text-[${currentTheme.promptColor}] ${
                  isRtl ? "ml-2" : "mr-2"
                }`}
              >
                $
              </span>
              <span className={`text-[${currentTheme.textColor}]`}>
                {item.command}
              </span>
            </div>
          )}
          <div className={isRtl ? "mr-4" : "ml-4"}>{item.output}</div>
        </div>
      ))}
    </div>
  );
};

export default TerminalHistory;
