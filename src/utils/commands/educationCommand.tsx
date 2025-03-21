// utils/commands/educationCommand.tsx
import React from "react";
import educationData from "@/data/education.json";
import { Theme } from "@/components/Terminal";

export const processEducationCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme
): React.ReactNode => {
  return (
    <div>
      <p className={`font-bold text-[${currentTheme.successColor}] mb-2`}>
        {translate("education_title")}
      </p>
      <div className="space-y-4">
        {educationData.education.map((edu: any, index: number) => (
          <div key={index} className="border-l-2 border-gray-700 pl-4">
            <div className="flex justify-between mb-1">
              <h3 className={`text-[${currentTheme.highlightColor}] font-bold`}>
                {edu.degree}
              </h3>
              <span className="text-gray-400 text-sm">
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
            <p className="text-gray-300 mb-1 text-sm">
              {edu.institution} | {edu.location}
            </p>
            <p className="text-gray-400 text-sm">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
