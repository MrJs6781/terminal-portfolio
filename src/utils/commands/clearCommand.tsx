// utils/commands/clearCommand.tsx
import { TerminalHistoryItem } from "@/components/Terminal";

export const processClearCommand = (
  setHistory: React.Dispatch<React.SetStateAction<TerminalHistoryItem[]>>
): void => {
  setHistory([]);
};
