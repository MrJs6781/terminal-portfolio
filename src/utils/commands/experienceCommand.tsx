// utils/commands/experienceCommand.tsx
import React from "react";
import experienceData from "@/data/experience.json";
import { Theme } from "@/components/Terminal";
import { Experience } from "@/types";

export const processExperienceCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme
): React.ReactNode => {
  return (
    <div>
      <p className={`font-bold text-[${currentTheme.successColor}] mb-2`}>
        {translate("experience_title")}
      </p>
      <div className="space-y-4">
        {experienceData.experiences.map((job: Experience, index: number) => (
          <div key={index} className="border-l-2 border-gray-700 pl-4">
            <div className="flex justify-between mb-1">
              <h3 className={`text-[${currentTheme.highlightColor}] font-bold`}>
                {job.title}
              </h3>
              <span className="text-gray-400 text-sm">
                {job.startDate} - {job.endDate}
              </span>
            </div>
            <p className="text-gray-300 mb-1 text-sm">
              {job.company} | {job.location}
            </p>
            <p className="text-gray-400 mb-2 text-sm">{job.description}</p>
            {job.achievements && job.achievements.length > 0 && (
              <ul className="list-disc list-inside text-sm ml-2 text-gray-300">
                {job.achievements.map(
                  (achievement: string, achIndex: number) => (
                    <li key={achIndex}>{achievement}</li>
                  )
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
