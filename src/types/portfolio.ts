export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  fullCaseStudy?: {
    overview: string;
    challenge: string;
    research?: string;
    solution: string;
    features: string[];
    results: string;
    learnings: string;
  };
  coverImage: string;
  images: string[];
  tags: string[];
  accentColor: string; // e.g. '#CCFF00', '#A855F7', '#38BDF8'
  client?: string;
  year: string;
  figmaUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  duration?: string;
  description?: string;
  tasks?: string[];
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score?: string;
  order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  grade?: string;
  imageUrl: string;
  credentialUrl?: string;
  pdfUrl?: string;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'design' | 'technical' | 'tool';
  icon: string;
  level?: string;
  featured?: boolean;
}

export interface Profile {
  fullName: string;
  title: string;
  tagline: string;
  alternativeHero: string;
  bioParagraphs: string[];
  location: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  figma?: string;
  cgpa: string; // Editable field (currently 8.25)
  diplomaCgpa: string;
  sscCgpa: string;
  avatarUrl: string;
  resumeUrl: string;
  lastUpdated: string;
}

export interface SiteSettings {
  heroIntro: string;
  availability: string;
  footerText: string;
  showAdminLink: boolean;
}
