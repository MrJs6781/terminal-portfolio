import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Types for downloadable content
export interface DownloadableItem {
  id: string;
  name: string;
  description: string;
  type: "pdf" | "image" | "code" | "data";
  url: string;
  fileSize?: string;
}

// Sample data
export const downloadableItems: DownloadableItem[] = [
  {
    id: "resume",
    name: "Resume",
    description: "My professional resume in PDF format",
    type: "pdf",
    url: "/files/resume.pdf",
    fileSize: "215 KB",
  },
  {
    id: "portfolio",
    name: "Portfolio PDF",
    description: "A PDF version of this portfolio",
    type: "pdf",
    url: "/files/portfolio.pdf",
    fileSize: "1.2 MB",
  },
  {
    id: "project-source",
    name: "Project Source Code",
    description: "Source code for this terminal portfolio",
    type: "code",
    url: "/files/terminal-portfolio-source.zip",
    fileSize: "3.5 MB",
  },
  {
    id: "business-card",
    name: "Digital Business Card",
    description: "My digital business card in vCard format",
    type: "data",
    url: "/files/business-card.vcf",
    fileSize: "1 KB",
  },
];

// Component to display a list of downloadable items
const DownloadableContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-green-400 font-bold mb-2">Downloadable Files:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {downloadableItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-700 rounded-md p-3 bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <div className="flex justify-between mb-1">
              <h4 className="text-yellow-400 font-bold">{item.name}</h4>
              <span className="text-gray-400 text-xs">{item.fileSize}</span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{item.description}</p>
            <a
              href={item.url}
              download
              className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
            >
              <Button variant="outline" size="sm" className="border-gray-700">
                <Download className="mr-1 h-4 w-4" />
                Download
              </Button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for a single downloadable item
export const DownloadItem: React.FC<{ item: DownloadableItem }> = ({
  item,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <a
        href={item.url}
        download
        className="inline-flex items-center text-blue-400 hover:text-blue-300"
      >
        <Download className="mr-1 h-4 w-4" />
        {item.name}
      </a>
      <span className="text-gray-400 text-xs">({item.fileSize})</span>
    </div>
  );
};

export default DownloadableContent;
