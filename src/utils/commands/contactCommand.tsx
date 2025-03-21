// utils/commands/contactCommand.tsx
import React from "react";
import contactData from "@/data/contact.json";
import { Theme } from "@/components/Terminal";

export const processContactCommand = (
  translate: (key: string, params?: Record<string, string>) => string,
  currentTheme: Theme
): React.ReactNode => {
  return (
    <div>
      <p className={`font-bold text-[${currentTheme.successColor}] mb-2`}>
        {translate("contact_title")}
      </p>
      <p className="mb-1">
        <span className={`text-[${currentTheme.highlightColor}]`}>
          {translate("email")}
        </span>
        <a
          href={`mailto:${contactData.email}`}
          className="text-blue-400 ml-2 hover:underline"
        >
          {contactData.email}
        </a>
      </p>
      <p className="mb-2">
        <span className={`text-[${currentTheme.highlightColor}]`}>
          {translate("phone")}
        </span>
        <span className="text-gray-300 ml-2">{contactData.phone}</span>
      </p>
      <p className={`text-[${currentTheme.highlightColor}] mb-1`}>
        {translate("social_media")}
      </p>
      <div className="flex flex-wrap gap-3">
        {contactData.socials.map((social: any, index: number) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            {social.platform}: {social.username}
          </a>
        ))}
      </div>
    </div>
  );
};
