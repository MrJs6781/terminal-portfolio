// utils/commands/helpCommand.tsx
import React from "react";
import commandsData from "@/data/commands.json";
import { Theme } from "@/components/Terminal";

export const processHelpCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme
): React.ReactNode => {
  return (
    <div>
      <p className={`font-bold text-[${currentTheme.successColor}] mb-2`}>
        {translate("help_title")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {commandsData.commands.map((cmd, index) => (
          <div key={index} className="flex">
            <span className={`text-[${currentTheme.highlightColor}] w-24`}>
              {cmd.name}
            </span>
            <span className="text-gray-400">
              {translate(`cmd_${cmd.name}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
