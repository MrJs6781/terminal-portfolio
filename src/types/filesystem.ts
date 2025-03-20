export interface FileSystemItem {
  type: "file" | "directory";
  content?: string;
  children?: Record<string, FileSystemItem>;
}

export interface FileSystemState {
  currentPath: string[];
  root: FileSystemItem;
}
