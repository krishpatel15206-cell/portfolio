import { Project, Experience, Education, Certificate, Skill, Profile, SiteSettings } from '@/types/portfolio';

export const initialProfile: Profile = {
  fullName: "Krish Patel",
  title: "UI/UX Designer • Computer Science & Design Student",
  tagline: "Designing digital experiences that are intuitive, engaging and meaningful.",
  alternativeHero: "Good design isn't just how it looks. It's how it works, feels and connects.",
  bioParagraphs: [
    "I'm Krish Patel, a Computer Science and Design student passionate about UI/UX design and creating meaningful digital experiences.",
    "I enjoy transforming ideas into visually engaging and intuitive interfaces. My interests include interface design, wireframing, prototyping, visual storytelling and creating user-friendly digital products.",
    "With a background in computer science, I also understand the technical side of digital products, allowing me to connect design thinking with practical implementation.",
    "I'm continuously learning, experimenting with design tools and building projects to improve my creative and technical skills."
  ],
  location: "Gujarat, India",
  email: "krishpatel15206@gmail.com",
  phone: "+91 98765 43210",
  linkedin: "https://linkedin.com/in/krishpatel-design",
  github: "https://github.com/krishpatel15206-cell",
  figma: "https://figma.com/@krishpatel",
  cgpa: "8.25", // Editable field (previously shared 8.17 and 8.25)
  diplomaCgpa: "7.51/10",
  sscCgpa: "75.66%",
  avatarUrl: "/images/krish-hero-crop.png",
  resumeUrl: "/uploads/1795522545298-krish_patel_resume.pdf",
  lastUpdated: "2026-11-23"
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    slug: "thrift-avenue",
    title: "Thrift Avenue",
    category: "UI/UX Design and Branding",
    subtitle: "A thrift fashion brand concept developed as a UI/UX and visual branding project.",
    description: "Brand identity, logo design, brochure design, email design, design research, user personas, and UI/UX design work in Figma.",
    fullCaseStudy: {
      overview: "A comprehensive thrift fashion brand concept developed as a UI/UX and visual branding project. Focused on brand identity, logo creation, brochure design, email templates, and high-fidelity mobile app interfaces.",
      challenge: "Conducting user research and creating realistic user personas for thrifting enthusiasts, designing an aesthetic brand identity, and organizing fashion categories intuitively.",
      solution: "Created the complete visual identity, typography, color palette, brochure, email design, and interactive mobile UI prototype in Figma.",
      features: [
        "Brand identity & logo design",
        "Brochure and email promotional layouts",
        "Design research & user personas",
        "Intuitive mobile catalog and checkout UI in Figma"
      ],
      results: "Complete UI/UX design and branding showcase developed in Figma.",
      learnings: "Deepened practical skills in visual identity systems, typography hierarchy, and mobile layout design."
    },
    coverImage: "/uploads/thrift-avenue-cover.png",
    images: [
      "/images/project-thrift-avenue.jpg",
      "/images/thrift-card-crop.png"
    ],
    tags: ["UI/UX", "Branding", "Research", "Figma", "Logo Design"],
    accentColor: "#CCFF00",
    year: "2026",
    hasCaseStudy: true,
    featured: true,
    published: true,
    order: 1
  },
  {
    id: "proj-2",
    slug: "smart-hire",
    title: "Smart Hire — Job Recruitment System",
    category: "Full-Stack Web Application",
    subtitle: "A job recruitment platform designed to connect candidates and recruiters through a structured hiring process.",
    description: "Candidate portal, recruiter portal, job posting, job search and filtering, resume upload (PDF/DOC), application tracking, anonymous candidate applications, AI-based feedback for rejected candidates, and skill-based job recommendations.",
    fullCaseStudy: {
      overview: "Smart Hire is a comprehensive recruitment platform designed to connect job seekers and talent recruiters through an organized, intelligent application pipeline.",
      challenge: "Building intuitive interfaces for two distinct user groups (job seekers and recruiters) while structuring complex features like resume parsing, status tracking, and automated feedback.",
      solution: "Designed user-friendly UI for both candidate and recruiter portals, integrated with React.js, Node.js, Express.js, MongoDB, Socket.io, JWT authentication, and OpenAI integration.",
      features: [
        "Candidate portal with resume upload (PDF/DOC)",
        "Recruiter dashboard for job postings and applicant review",
        "Real-time application status tracking",
        "Anonymous candidate screening mode",
        "AI-based feedback for rejected candidates",
        "Skill-based job recommendation engine"
      ],
      results: "Built end-to-end full-stack prototype with React.js, Express, and MongoDB.",
      learnings: "Strengthened experience in dashboard design, relational and document databases, and authentication flows."
    },
    coverImage: "/images/project-smart-hire.jpg",
    images: [
      "/images/project-smart-hire.jpg",
      "/images/smarthire-card-crop.png"
    ],
    tags: ["Web App", "UI/UX", "Full-Stack", "React.js", "Node.js", "MongoDB"],
    accentColor: "#A855F7",
    year: "2025",
    hasCaseStudy: true,
    featured: true,
    published: true,
    order: 2
  },
  {
    id: "proj-3",
    slug: "pet-adoption-system",
    title: "Pet Adoption System",
    category: "Web Development",
    subtitle: "A web-based pet adoption platform with SQL database integration.",
    description: "Frontend and backend integration, structured SQL database management, and full CRUD operations for pet profiles and adoption requests.",
    fullCaseStudy: {
      overview: "A database-driven web application enabling animal shelters to catalog adoptable pets and manage adoption applications.",
      challenge: "Designing relational database schemas with SQL and connecting frontend interfaces with backend CRUD operations.",
      solution: "Implemented an accessible web interface with responsive search, pet profile management, and database CRUD integration.",
      features: [
        "Pet catalog with search and category filters",
        "SQL database integration",
        "Full CRUD operations for pet listings",
        "Adoption inquiry form"
      ],
      results: "Functional web development project connecting frontend and relational SQL database.",
      learnings: "Hands-on mastery of SQL queries, data validation, and CRUD integration."
    },
    coverImage: "/images/project-pet-adoption.jpg",
    images: ["/images/project-pet-adoption.jpg"],
    tags: ["Web Development", "SQL", "CRUD", "UI Design"],
    accentColor: "#38BDF8",
    year: "2024",
    hasCaseStudy: false,
    featured: false,
    published: true,
    order: 3
  },
  {
    id: "proj-4",
    slug: "gourmetgo",
    title: "GourmetGo",
    category: "UI/UX / Design Project",
    subtitle: "A food-related design project exploring restaurant menu layouts and ordering flows.",
    description: "Food ordering interface design focusing on visual layouts, appetizing presentation, and mobile user experience. Detailed screenshots and case study will be added by designer.",
    fullCaseStudy: {
      overview: "A culinary interface concept exploring clean food menus, dish presentation, and streamlined order flows in Figma.",
      challenge: "Creating intuitive item customization and uncluttered mobile shopping cart interactions.",
      solution: "Designed high-fidelity mobile prototype with clear typography and appetite appeal in Figma.",
      features: [
        "Food menu categorization",
        "Dish detail screens",
        "Cart customization interface",
        "Interactive Figma prototype"
      ],
      results: "Interactive mobile design project.",
      learnings: "Advanced Figma auto-layout and component design."
    },
    coverImage: "/uploads/1795521711231-gourmetgo-purple-food-app-showcase.png",
    images: ["/images/project-gourmetgo.jpg"],
    tags: ["UI/UX", "Mobile App", "Figma", "Food Design"],
    accentColor: "#F97316",
    year: "2025",
    hasCaseStudy: true,
    featured: false,
    published: true,
    order: 4
  },
  {
    id: "proj-5",
    slug: "soundix",
    title: "Soundix",
    category: "UI/UX / Design Project",
    subtitle: "An audio and music-related design project.",
    description: "Music player and audio interface design focusing on dark mode aesthetic, playlists, and playback controls. Detailed screenshots and case study will be added by designer.",
    fullCaseStudy: {
      overview: "A music interface concept designed for audio streaming and playlist navigation.",
      challenge: "Designing playback controls, album artwork presentation, and audio queues in an elegant dark interface.",
      solution: "Created dark-mode mobile screens in Figma with high-contrast playback controls and subtle neon accents.",
      features: [
        "Audio player interface",
        "Playlist curation screens",
        "Album artwork view",
        "Interactive prototype"
      ],
      results: "UI/UX audio concept project in Figma.",
      learnings: "Refined dark mode contrast, typography hierarchy, and playback UI patterns."
    },
    coverImage: "/uploads/1795521770282-soundix-premium-audio-showcase.png",
    images: ["/images/project-soundix.jpg"],
    tags: ["UI/UX", "Audio Experience", "Figma", "Music App"],
    accentColor: "#8B5CF6",
    year: "2025",
    hasCaseStudy: true,
    featured: false,
    published: true,
    order: 5
  },
  {
    id: "proj-6",
    slug: "nike-air",
    title: "Nike Air Concept",
    category: "UI/UX / Design Project",
    subtitle: "A sneaker-related design project exploring bold e-commerce layouts.",
    description: "Footwear showcase exploring editorial typography, high-impact product presentation, and product selection. Detailed screenshots will be added by designer.",
    fullCaseStudy: {
      overview: "An experimental e-commerce concept exploring editorial product presentation for modern streetwear sneakers.",
      challenge: "Balancing strong visual brand aesthetics with clear sizing and purchasing interactions.",
      solution: "Designed editorial desktop and mobile screens highlighting product angles and colorway selections.",
      features: [
        "Hero sneaker showcase",
        "Interactive colorway picker",
        "Size selection flow",
        "Editorial typography layout"
      ],
      results: "Visual design and UI/UX concept project.",
      learnings: "Practiced bold display typography and modern asymmetric layouts."
    },
    coverImage: "/uploads/1795522048351-nike-air-ui_ux-sneaker-experience.png",
    images: ["/images/project-nike-air.jpg"],
    tags: ["UI/UX", "E-Commerce", "Branding", "Concept"],
    accentColor: "#CCFF00",
    year: "2025",
    hasCaseStudy: true,
    featured: false,
    published: true,
    order: 6
  },
  {
    id: "proj-7",
    slug: "brew-haven",
    title: "Brew Haven",
    category: "UI/UX / Branding Project",
    subtitle: "A coffee brand and design project.",
    description: "Coffee branding and ordering concept covering visual identity, roast presentation, and cafe mobile interface. Detailed screenshots will be added by designer.",
    fullCaseStudy: {
      overview: "A specialty coffee brand concept exploring coffee bean selection and mobile cafe ordering.",
      challenge: "Communicating coffee roast notes and brewing options in an approachable digital layout.",
      solution: "Designed warm branding assets, packaging concept, and a mobile ordering flow in Figma.",
      features: [
        "Brand identity & logo concept",
        "Coffee roast selector",
        "Mobile cafe order UI",
        "Packaging presentation"
      ],
      results: "Branding and UI design project in Figma.",
      learnings: "Explored sensory visual storytelling and cohesive brand touchpoints."
    },
    coverImage: "/uploads/1795521922791-brew-haven-coffee-app-showcase.png",
    images: ["/images/project-brew-haven.jpg"],
    tags: ["UI/UX", "Branding", "Packaging", "Mobile App"],
    accentColor: "#D97706",
    year: "2024",
    hasCaseStudy: true,
    featured: false,
    published: true,
    order: 7
  }
];

export const initialExperiences: Experience[] = [
  {
    id: "exp-1",
    company: "InternPe",
    position: "UI/UX Design Intern",
    period: "May – June 2026",
    duration: "4 weeks",
    description: "Worked on UI design assignments, practicing visual layouts, interface design, and prototyping in Figma.",
    tasks: [
      "Designed a restaurant menu mobile application in Figma.",
      "Designed a modern e-commerce website interface in Figma.",
      "Worked on UI design assignments.",
      "Practised visual layouts, interface design and prototyping."
    ],
    order: 1
  },
  {
    id: "exp-2",
    company: "Webial Technology",
    position: "AI Intern – GTU Phase 2",
    period: "July – August 2023",
    duration: "2 months",
    description: "Participated in the GTU Phase 2 AI internship program. Project description and responsibilities to be added by designer.",
    tasks: [
      "GTU Phase 2 Programme participant.",
      "Explored artificial intelligence and machine learning fundamentals."
    ],
    order: 2
  },
  {
    id: "exp-3",
    company: "Webial Technology",
    position: "Web Development Intern",
    period: "September 2022",
    duration: "1 month",
    description: "Web development internship. Tasks and responsibilities to be added by designer.",
    tasks: [
      "Worked on frontend and web development basics.",
      "Practiced HTML, CSS and web structuring."
    ],
    order: 3
  }
];

export const initialEducations: Education[] = [
  {
    id: "edu-1",
    degree: "B.Tech in Computer Science & Design",
    institution: "G H Patel College of Engineering & Technology (GCET), CVM University",
    period: "Expected graduation: 2027",
    score: "Currently Pursuing",
    order: 1
  },
  {
    id: "edu-2",
    degree: "Diploma in Computer Engineering",
    institution: "Bhailalbhai & Bhikhabhai Institute of Technology (BBIT), GTU",
    period: "Completed",
    score: "CGPA: 7.51 / 10",
    order: 2
  },
  {
    id: "edu-3",
    degree: "Secondary School Certificate (SSC)",
    institution: "Gujarat Board",
    period: "Completed",
    score: "75.66%",
    order: 3
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Cloud Computing",
    issuer: "NPTEL",
    grade: "Elite Certificate",
    imageUrl: "/uploads/1795523255257-screenshot-2026-11-24-175725.png",
    credentialUrl: "https://nptel.ac.in",
    order: 1
  },
  {
    id: "cert-2",
    title: "Internet of Things (IoT)",
    issuer: "NPTEL",
    grade: "Elite, 86%",
    imageUrl: "/uploads/1795523295953-screenshot-2026-11-24-175809.png",
    credentialUrl: "https://nptel.ac.in",
    order: 2
  },
  {
    id: "cert-3",
    title: "Python Programming",
    issuer: "Coursera – University of Michigan",
    grade: "Course Certificate",
    imageUrl: "/uploads/1795523338951-screenshot-2026-11-24-175852.png",
    credentialUrl: "https://coursera.org",
    order: 3
  }
];

export const initialSkills: Skill[] = [
  // Design Skills (Prominent & Strongest)
  { id: "sk-1", name: "Figma", category: "design", icon: "Figma", level: "Primary Tool", featured: true },
  { id: "sk-2", name: "UI/UX Design", category: "design", icon: "Layout", level: "Core Strength", featured: true },
  { id: "sk-3", name: "User Interface Design", category: "design", icon: "Layout", level: "Core Strength", featured: true },
  { id: "sk-4", name: "Wireframing", category: "design", icon: "Grid", level: "Core Strength", featured: true },
  { id: "sk-5", name: "Prototyping", category: "design", icon: "Layers", level: "Core Strength", featured: true },
  { id: "sk-6", name: "Design Systems", category: "design", icon: "Component", level: "Components & Tokens", featured: true },
  { id: "sk-7", name: "Visual Design", category: "design", icon: "Palette", level: "Layout & Typography", featured: true },
  { id: "sk-8", name: "UX Principles", category: "design", icon: "Sparkles", level: "User-Centered Design", featured: true },
  { id: "sk-9", name: "User Research", category: "design", icon: "Users", level: "Fundamentals", featured: true },

  // Technical Skills (Secondary Advantage)
  { id: "sk-10", name: "HTML5 / CSS3", category: "technical", icon: "Code", level: "Web Foundation", featured: true },
  { id: "sk-11", name: "SQL & CRUD", category: "technical", icon: "Database", level: "Database Operations", featured: true },
  { id: "sk-12", name: "Basic Python", category: "technical", icon: "Terminal", level: "Programming", featured: true },
  { id: "sk-13", name: "React.js", category: "technical", icon: "Atom", level: "Project Exposure", featured: true },
  { id: "sk-14", name: "Node.js & Express", category: "technical", icon: "Server", level: "Project Exposure", featured: true },
  { id: "sk-15", name: "MongoDB", category: "technical", icon: "HardDrive", level: "Project Exposure", featured: true },

  // Tools
  { id: "sk-16", name: "GitHub", category: "tool", icon: "GitBranch", level: "Version Control", featured: true },
  { id: "sk-17", name: "Google Drive", category: "tool", icon: "Cloud", level: "Collaboration", featured: false },
  { id: "sk-18", name: "WPS Office", category: "tool", icon: "FileText", level: "Documentation", featured: false }
];

export const initialSiteSettings: SiteSettings = {
  heroIntro: "Designing Digital Experiences That Matter.",
  availability: "Available for UI/UX Design Internships & Junior Roles",
  footerText: "© 2026 Krish Patel. Designed with passion for digital craft.",
  showAdminLink: false
};
