// components/TerminalHeader.tsx
import React from "react";
import profileData from "@/data/profile.json";

const TerminalHeader = () => {
  return (
    <div className="bg-gray-800 text-white p-2 flex items-center rounded-t-md">
      <div className="flex gap-1.5 mr-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span className="text-sm font-mono">{profileData.terminalTitle}</span>
    </div>
  );
};

export default TerminalHeader;
