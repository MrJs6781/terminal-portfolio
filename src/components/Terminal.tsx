// components/Terminal.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TerminalHeader from "./TerminalHeader";
import TerminalHistory from "./TerminalHistory";
import TerminalInput from "./TerminalInput";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { processCommand } from "@/utils/commandProcessor";
import themesData from "@/data/themes.json";

export interface TerminalHistoryItem {
  command: string;
  output: React.ReactNode;
}

export interface Theme {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  promptColor: string;
  highlightColor: string;
  errorColor: string;
  successColor: string;
}

const Terminal: React.FC = () => {
  const { translate, language, currentFont, isRtl } = useLanguage(); // اضافه کردن currentFont
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [themes] = useState<Theme[]>(themesData.themes);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themesData.themes[5]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const welcomeText = `
  ██████  ███████╗ ██████╗  ███╗   ███╗ ██╗ ███╗   ██╗  █████╗  ██╗     
    ██    ██╔════╝ ██╔══██╗ ████╗ ████║ ██║ ████╗  ██║ ██╔══██╗ ██║     
    ██    █████╗   ██████╔╝ ██╔████╔██║ ██║ ██╔██╗ ██║ ███████║ ██║     
    ██    ██╔══╝   ██╔══██╗ ██║╚██╔╝██║ ██║ ██║╚██╗██║ ██╔══██╗ ██║     
    ██    ███████╗ ██║  ██║ ██║ ╚═╝ ██║ ██║ ██║ ╚████║ ██║  ██║ ███████╗
    ╚═╝   ╚══════╝ ╚═╝  ╚═╝ ╚═╝     ╚═╝ ╚═╝ ╚═╝  ╚═══╝ ╚═╝  ╚═╝ ╚══════╝
  `;

  useEffect(() => {
    if (!isInitialized) {
      const welcomeOutput = (
        <div className={`text-[${currentTheme.successColor}]`}>
          <motion.pre
            className="text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              direction: isRtl ? "rtl" : "ltr",
              textAlign: isRtl ? "right" : "left",
            }} // هماهنگی با RTL
          >
            {welcomeText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.006 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.pre>
          <p className="mb-2 text-sm md:text-base">
            {translate("welcome_message")}
          </p>
          <p className="text-sm md:text-base">{translate("best_viewed_on")}</p>
        </div>
      );
      setHistory([{ command: "", output: welcomeOutput }]);
      setIsInitialized(true);
    }
  }, [isInitialized, currentTheme, translate, welcomeText, isRtl]); // اضافه کردن isRtl به وابستگی‌ها

  useEffect(() => {
    setIsInitialized(false);
  }, [language]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleClickAnywhere = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener("click", handleClickAnywhere);
    return () => document.removeEventListener("click", handleClickAnywhere);
  }, []);

  const handleCommand = (cmd: string) => {
    processCommand({
      command: cmd,
      translate,
      currentTheme,
      setCurrentTheme,
      setHistory,
      commandHistory,
      setCommandHistory,
      setHistoryIndex,
      themes,
      language,
    });
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="bg-gray-800 text-white p-2 flex items-center justify-between rounded-t-md"
        style={{ direction: "ltr" }}
      >
        <TerminalHeader />
        <LanguageSelector />
      </div>
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm rounded-b-md"
        style={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.textColor,
          fontFamily: currentFont, // اعمال فونت فعلی
        }}
      >
        <TerminalHistory history={history} currentTheme={currentTheme} />
        <TerminalInput
          input={input}
          setInput={setInput}
          commandHistory={commandHistory}
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          setHistory={setHistory}
          currentTheme={currentTheme}
          onSubmit={handleCommand}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};

export default Terminal;
