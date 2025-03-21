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
  const { translate, language } = useLanguage();
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [themes] = useState<Theme[]>(themesData.themes);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themesData.themes[5]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const welcomeText = `
  ██████╗ ███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
  ██╔══██╗██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
  ██████╔╝█████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
  ██╔══██╗██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
  ██║  ██║███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
  `;

  // Initialize terminal with welcome message
  useEffect(() => {
    console.log("Current Theme:", currentTheme);
    if (!isInitialized) {
      const welcomeOutput = (
        <div className={`text-[${currentTheme.successColor}]`}>
          <motion.pre
            className="text-xs md:text-sm font-mono mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {welcomeText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.pre>
          <p className="mb-2">{translate("welcome_message")}</p>
          <p>{translate("best_viewed_on")}</p>
        </div>
      );
      setHistory([{ command: "", output: welcomeOutput }]);
      setIsInitialized(true);
    }
  }, [isInitialized, currentTheme, translate, welcomeText]);

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
    });
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-gray-800 text-white p-2 flex items-center justify-between rounded-t-md">
        <TerminalHeader />
        <LanguageSelector />
      </div>
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm rounded-b-md"
        style={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.textColor,
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
