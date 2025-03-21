// utils/commands/aboutCommand.tsx
import React from "react";
import profileData from "@/data/profile.json";
import { Theme } from "@/components/Terminal";

export const processAboutCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme
): React.ReactNode => {
  return (
    <div>
      <div className="mb-2">
        <span className={`text-[${currentTheme.successColor}] font-bold`}>
          {profileData.name}
        </span>
        <span className="text-gray-400"> - {profileData.title}</span>
      </div>
      <p className="text-gray-300 mb-2">{profileData.bio}</p>
      <p className="text-gray-300">
        <span className="text-gray-400">{translate("location")}</span>{" "}
        {profileData.location}
      </p>
    </div>
  );
};
