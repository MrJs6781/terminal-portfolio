// src/types.ts
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ContactSocial {
  platform: string;
  username: string;
  url: string;
}

export interface Contact {
  email: string;
  phone: string;
  socials: ContactSocial[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SkillChild {
  name: string;
  level: string;
}
