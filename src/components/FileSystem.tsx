import React from "react";
import { FileSystemItem } from "@/types/filesystem";

interface FileSystemProps {
  root: FileSystemItem;
  currentPath: string[];
  handleCommand: (command: string) => void;
}

const FileSystem = ({ root, currentPath, handleCommand }: FileSystemProps) => {
  // Get the current directory based on path
  const getCurrentDirectory = (): FileSystemItem | null => {
    let current: FileSystemItem = root;

    for (const segment of currentPath) {
      if (
        current.type !== "directory" ||
        !current.children ||
        !current.children[segment]
      ) {
        return null;
      }
      current = current.children[segment];
    }

    return current;
  };

  // Get content of a file
  const getFileContent = (filePath: string): string | null => {
    const pathSegments = filePath
      .split("/")
      .filter((segment) => segment !== "");
    const fileName = pathSegments.pop();
    let directory: FileSystemItem = root;

    // Navigate to the directory containing the file
    for (const segment of pathSegments) {
      if (
        directory.type !== "directory" ||
        !directory.children ||
        !directory.children[segment]
      ) {
        return null;
      }
      directory = directory.children[segment];
    }

    // Get the file
    if (
      directory.type !== "directory" ||
      !directory.children ||
      !directory.children[fileName!]
    ) {
      return null;
    }

    const file = directory.children[fileName!];
    if (file.type !== "file" || !file.content) {
      return null;
    }

    return file.content;
  };

  // List files and directories in the current directory
  const listDirectory = (path?: string[]): React.ReactNode => {
    const dirPath = path || currentPath;
    let current: FileSystemItem = root;

    for (const segment of dirPath) {
      if (
        current.type !== "directory" ||
        !current.children ||
        !current.children[segment]
      ) {
        return <p className="text-red-400">Directory not found</p>;
      }
      current = current.children[segment];
    }

    if (current.type !== "directory" || !current.children) {
      return <p className="text-red-400">Not a directory</p>;
    }

    const items = Object.entries(current.children);

    return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {items.map(([name, item]) => (
            <div key={name} className="flex items-center">
              <span
                className={
                  item.type === "directory" ? "text-blue-400" : "text-gray-300"
                }
              >
                {item.type === "directory" ? `📁 ${name}/` : `📄 ${name}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Handle the ls command
  const handleLs = (args: string[]): React.ReactNode => {
    if (args.length === 0) {
      return listDirectory();
    }

    const path = args[0];
    if (path.startsWith("/")) {
      // Absolute path
      const segments = path.split("/").filter((segment) => segment !== "");
      return listDirectory(segments);
    } else {
      // Relative path
      const segments = [
        ...currentPath,
        ...path.split("/").filter((segment) => segment !== ""),
      ];
      return listDirectory(segments);
    }
  };

  // Handle the cd command
  const handleCd = (args: string[]): React.ReactNode => {
    if (args.length === 0) {
      // cd with no args should go to root
      handleCommand("cd /");
      return null;
    }

    const path = args[0];
    let newPath: string[] = [];

    if (path === "/") {
      // Go to root
      handleCommand("__cd_internal /");
      return <p className="text-green-400">Changed directory to /</p>;
    } else if (path === "..") {
      // Go up one directory
      if (currentPath.length > 0) {
        newPath = [...currentPath.slice(0, -1)];
        handleCommand(`__cd_internal ${newPath.join("/")}`);
        return (
          <p className="text-green-400">
            Changed directory to /{newPath.join("/")}
          </p>
        );
      } else {
        return <p className="text-yellow-400">Already at root directory</p>;
      }
    } else if (path.startsWith("/")) {
      // Absolute path
      newPath = path.split("/").filter((segment) => segment !== "");
    } else {
      // Relative path
      newPath = [...currentPath];
      const segments = path.split("/").filter((segment) => segment !== "");

      for (const segment of segments) {
        if (segment === "..") {
          if (newPath.length > 0) {
            newPath.pop();
          }
        } else if (segment !== ".") {
          newPath.push(segment);
        }
      }
    }

    // Verify the path exists and is a directory
    let current: FileSystemItem = root;
    for (const segment of newPath) {
      if (
        current.type !== "directory" ||
        !current.children ||
        !current.children[segment]
      ) {
        return <p className="text-red-400">Directory not found: {segment}</p>;
      }
      current = current.children[segment];
    }

    if (current.type !== "directory") {
      return (
        <p className="text-red-400">
          Not a directory: {newPath[newPath.length - 1]}
        </p>
      );
    }

    handleCommand(`__cd_internal /${newPath.join("/")}`);
    return (
      <p className="text-green-400">
        Changed directory to /{newPath.join("/")}
      </p>
    );
  };

  // Handle the cat command
  const handleCat = (args: string[]): React.ReactNode => {
    if (args.length === 0) {
      return <p className="text-yellow-400">Usage: cat [file_name]</p>;
    }

    const filePath = args[0];
    let pathToCheck: string;

    if (filePath.startsWith("/")) {
      // Absolute path
      pathToCheck = filePath;
    } else {
      // Relative path - join with current path
      pathToCheck =
        currentPath.length > 0
          ? `/${currentPath.join("/")}/${filePath}`
          : `/${filePath}`;
    }

    const content = getFileContent(pathToCheck);

    if (content === null) {
      return <p className="text-red-400">File not found: {filePath}</p>;
    }

    return (
      <div className="whitespace-pre-wrap border-l-2 border-gray-700 pl-4 mt-2">
        {content}
      </div>
    );
  };

  return {
    handleLs,
    handleCd,
    handleCat,
    getCurrentDirectory,
  };
};

export default FileSystem;
