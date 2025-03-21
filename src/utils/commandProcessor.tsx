// utils/commandProcessor.tsx
import { processHelpCommand } from "./commands/helpCommand";
import { processAboutCommand } from "./commands/aboutCommand";
import { processSkillsCommand } from "./commands/skillsCommand";
import { processProjectsCommand } from "./commands/projectsCommand";
import { processExperienceCommand } from "./commands/experienceCommand";
import { processEducationCommand } from "./commands/educationCommand";
import { processContactCommand } from "./commands/contactCommand";
import { processResumeCommand } from "./commands/resumeCommand";
import { processClearCommand } from "./commands/clearCommand";
import { processThemeCommand } from "./commands/themeCommand";
import { processLanguageCommand } from "./commands/languageCommand";

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

interface CommandProcessorArgs {
  command: string;
  translate: (key: string, params?: Record<string, string>) => string;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  setHistory: React.Dispatch<React.SetStateAction<TerminalHistoryItem[]>>;
  commandHistory: string[];
  setCommandHistory: (history: string[]) => void;
  setHistoryIndex: (index: number) => void;
  themes: Theme[];
  language: string; // اضافه کردن language به آرگومان‌ها
}

export const processCommand = async ({
  command,
  translate,
  currentTheme,
  setCurrentTheme,
  setHistory,
  commandHistory,
  setCommandHistory,
  setHistoryIndex,
  themes,
  language,
}: CommandProcessorArgs) => {
  const cmd = command.trim().toLowerCase();

  if (cmd === "") return;

  if (cmd !== commandHistory[0]) {
    setCommandHistory([cmd, ...commandHistory]);
  }
  setHistoryIndex(-1);

  let output: React.ReactNode;

  switch (cmd) {
    case "help":
      output = processHelpCommand(translate, currentTheme);
      break;
    case "about":
      output = processAboutCommand(translate, currentTheme);
      break;
    case "skills":
      output = processSkillsCommand(translate, currentTheme);
      break;
    case "projects":
      output = processProjectsCommand(translate, currentTheme);
      break;
    case "experience":
      output = processExperienceCommand(translate, currentTheme);
      break;
    case "education":
      output = processEducationCommand(translate, currentTheme);
      break;
    case "contact":
      output = processContactCommand(translate, currentTheme);
      break;
    case "resume":
      output = processResumeCommand(translate, currentTheme);
      break;
    case "clear":
      processClearCommand(setHistory);
      return;
    case "theme":
    case "themes":
      output = processThemeCommand(
        translate,
        currentTheme,
        themes,
        setCurrentTheme
      );
      break;
    case "language":
      output = processLanguageCommand(translate, currentTheme, language); // پاس دادن language
      break;
    default:
      if (cmd.startsWith("theme ")) {
        const themeName = cmd.split(" ")[1];
        const foundTheme = themes.find(
          (t) => t.id.toLowerCase() === themeName.toLowerCase()
        );
        if (foundTheme) {
          setCurrentTheme(foundTheme);
          output = (
            <p className={`text-[${currentTheme.successColor}]`}>
              Theme changed to {foundTheme.name}
            </p>
          );
        } else {
          output = (
            <p className={`text-[${currentTheme.errorColor}]`}>
              Theme "{themeName}" not found. Type{" "}
              <span className={`text-[${currentTheme.highlightColor}]`}>
                themes
              </span>{" "}
              to see available themes.
            </p>
          );
        }
      } else {
        output = (
          <p className={`text-[${currentTheme.errorColor}]`}>
            {translate("command_not_found", { command: cmd })}
          </p>
        );
      }
  }

  setHistory((prev) => [...prev, { command: cmd, output }]);
};
