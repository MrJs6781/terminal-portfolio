// utils/commands/projectsCommand.tsx
import React from "react";
import projectsData from "@/data/projects.json";
import { Theme } from "@/components/Terminal";
import { Project } from "@/types";

export const processProjectsCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme
): React.ReactNode => {
  return (
    <div>
      <p className={`font-bold text-[${currentTheme.successColor}] mb-2`}>
        {translate("projects_title")}
      </p>
      <div className="space-y-4">
        {projectsData.projects.map((project: Project, index: number) => (
          <div
            key={index}
            className="border border-gray-700 p-3 rounded bg-gray-900"
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className={`text-[${currentTheme.highlightColor}] font-bold`}>
                {project.title}
              </h3>
              {project.featured && (
                <span
                  className={`bg-[${currentTheme.successColor}]/20 text-[${currentTheme.successColor}] text-xs px-2 py-0.5 rounded`}
                >
                  {translate("featured")}
                </span>
              )}
            </div>
            <p className="text-gray-300 mb-2 text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {project.technologies.map((tech: string, techIndex: number) => (
                <span
                  key={techIndex}
                  className="bg-gray-800 text-xs text-gray-300 px-1.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3 text-sm">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {translate("github")}
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {translate("live_demo")}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
