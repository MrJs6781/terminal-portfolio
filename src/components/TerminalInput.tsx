// components/TerminalInput.tsx
import React, { KeyboardEvent, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import commandsData from "@/data/commands.json";

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

interface TerminalInputProps {
  input: string;
  setInput: (value: string) => void;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  setHistory: React.Dispatch<React.SetStateAction<TerminalHistoryItem[]>>;
  currentTheme: Theme;
  onSubmit: (command: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  input,
  setInput,
  commandHistory,
  historyIndex,
  setHistoryIndex,
  setHistory,
  currentTheme,
  onSubmit,
  inputRef,
}) => {
  const { isRtl, translate, currentFont } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  const handleTabCompletion = () => {
    if (!input) return;

    const allCommands = commandsData.commands.map((cmd) => cmd.name);
    const matchingCommands = allCommands.filter((cmd) => cmd.startsWith(input));

    if (matchingCommands.length === 1) {
      setInput(matchingCommands[0]);
    } else if (matchingCommands.length > 1) {
      const completionsOutput = (
        <div
          style={{
            direction: isRtl ? "rtl" : "ltr",
            textAlign: isRtl ? "right" : "left",
          }}
        >
          <p className="text-gray-400 mb-1">
            {translate("available_completions") || "Available completions:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {matchingCommands.map((cmd, index) => (
              <span
                key={index}
                className={`text-[${currentTheme.highlightColor}] cursor-pointer hover:underline`}
                onClick={() => setInput(cmd)}
              >
                {cmd}
              </span>
            ))}
          </div>
        </div>
      );
      setHistory((prev) => [
        ...prev,
        { command: "", output: completionsOutput },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center"
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <span
        className={`text-[${currentTheme.promptColor}] ${
          isRtl ? "ml-2" : "mr-2"
        }`}
      >
        $
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`flex-1 bg-transparent outline-none text-[${currentTheme.textColor}]`}
        style={{
          direction: isRtl ? "rtl" : "ltr",
          textAlign: isRtl ? "right" : "left",
          fontFamily: currentFont,
        }}
        placeholder={translate("type_command") || "Type a command..."}
        autoFocus
      />
    </form>
  );
};

export default TerminalInput;
