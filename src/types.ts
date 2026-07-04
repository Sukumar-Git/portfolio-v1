export interface Project {
  id: string;
  title: string;
  version?: string;
  year: string;
  problem: string;
  solution: string;
  architecture: string[]; // e.g. ["Frontend", "Backend", "Database", "Cloud", "External APIs"]
  features: string[];
  challenges: string;
  lessonsLearned: string;
  tech: string[];
  github?: string;
  live?: string;
  tagline?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

export type CursorMode = 'WRITE' | 'OPEN' | 'VIEW' | 'EXPLORE' | 'DRAW' | 'DEFAULT';
