// utils/commands/skillsCommand.tsx
import React from "react";
import skillsData from "@/data/skills.json";
import { Theme } from "@/components/Terminal";

export const processSkillsCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme
): React.ReactNode => {
  return (
    <div>
      <p className={`font-bold text-[${currentTheme.successColor}] mb-2`}>
        {translate("skills_title")}
      </p>
      <div className="mb-2">
        <p className={`text-[${currentTheme.highlightColor}] mb-1`}>
          {translate("languages")}
        </p>
        <div className="flex flex-wrap gap-2">
          {skillsData.languages.map((skill: any, index: number) => (
            <span
              key={index}
              className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
            >
              {skill.name}{" "}
              <span className={`text-[${currentTheme.successColor}]`}>•</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mb-2">
        <p className={`text-[${currentTheme.highlightColor}] mb-1`}>
          {translate("frameworks")}
        </p>
        <div className="flex flex-wrap gap-2">
          {skillsData.frameworks.map((skill: any, index: number) => (
            <span
              key={index}
              className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
            >
              {skill.name}{" "}
              <span className={`text-[${currentTheme.successColor}]`}>•</span>
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className={`text-[${currentTheme.highlightColor}] mb-1`}>
          {translate("tools")}
        </p>
        <div className="flex flex-wrap gap-2">
          {skillsData.tools.map((skill: any, index: number) => (
            <span
              key={index}
              className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
            >
              {skill.name}{" "}
              <span className={`text-[${currentTheme.successColor}]`}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
