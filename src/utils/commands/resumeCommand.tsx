// utils/commands/resumeCommand.tsx
import React from "react";
import profileData from "@/data/profile.json";
import { Theme } from "@/components/Terminal";

export const processResumeCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme
): React.ReactNode => {
  window.open(profileData.resumeUrl, "_blank");
  return (
    <p className={`text-[${currentTheme.successColor}]`}>
      {translate("opening_resume")}
    </p>
  );
};
