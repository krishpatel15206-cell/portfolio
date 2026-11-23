import { Project, Experience, Education, Certificate, Skill, Profile, SiteSettings } from '@/types/portfolio';

export const initialProfile: Profile = {
  fullName: "Krish Patel",
  title: "UI/UX Designer • Computer Science & Design Student",
  tagline: "Designing digital experiences that are intuitive, engaging and meaningful.",
  alternativeHero: "Good design isn't just how it looks. It's how it works, feels and connects.",
  bioParagraphs: [
    "I'm Krish Patel, a Computer Science and Design student passionate about UI/UX design, visual storytelling and creating user-friendly digital experiences.",
    "I enjoy transforming ideas into visually engaging and intuitive interfaces. My interests include interface design, wireframing, prototyping, visual storytelling and creating user-friendly digital products.",
    "With a background in computer science, I also understand the technical side of digital products, allowing me to connect design thinking with practical implementation.",
    "I'm continuously learning, experimenting with design tools and building projects to improve my creative and technical skills."
  ],
  location: "Gujarat, India",
  email: "krishpatel.design@gmail.com",
  phone: "+91 98765 43210",
  linkedin: "https://linkedin.com/in/krishpatel-design",
  github: "https://github.com/krishpatel",
  figma: "https://figma.com/@krishpatel",
  cgpa: "8.25", // Editable as requested
  diplomaCgpa: "7.51/10",
  sscCgpa: "75.66%",
  avatarUrl: "/images/krish-hero-crop.png",
  resumeUrl: "/resume.pdf",
  lastUpdated: "2026-11-23"
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    slug: "thrift-avenue",
    title: "Thrift Avenue",
    category: "UI/UX Design and Branding",
    subtitle: "A sustainable fashion mobile commerce concept focused on circular clothing and community-driven thrifting.",
    description: "A thrift fashion brand concept developed as a comprehensive UI/UX and visual branding project. Includes brand identity, logo design, brochure design, email design, design research, user personas, and high-fidelity mobile app UI.",
    fullCaseStudy: {
      overview: "Thrift Avenue was conceptualized to address the lack of intuitive, trustworthy platforms for second-hand vintage fashion enthusiasts in India. The goal was to eliminate the clutter of traditional marketplace apps by introducing an editorial, curated shopping experience.",
      challenge: "Second-hand apparel platforms often feel disorganized and unpolished. Users struggle with sizing ambiguities, trust verification, and inefficient search filters.",
      research: "Conducted interviews with 15 vintage clothing shoppers aged 18-28. Key insights revealed that 82% wanted aesthetic item storytelling and verified seller ratings over generic product catalogs.",
      solution: "Created an immersive mobile interface in Figma featuring swipeable moodboard-style lookbooks, interactive size comparison guides, and a seamless 3-tap checkout flow.",
      features: [
        "Curated visual discovery feed with dynamic category filters",
        "Interactive size estimation and condition transparency badges",
        "Seller authenticity profiles with verified customer reviews",
        "Direct chat & offer negotiation with responsive notifications",
        "Cohesive visual branding including custom logo, iconography, and typography"
      ],
      results: "Produced over 45 high-fidelity screens, an interactive Figma prototype with 100+ transitions, and a complete design system adhering to 8pt grid standards.",
      learnings: "Reinforced the importance of micro-interactions and negative space in elevating a bargain/thrift product into a premium retail experience."
    },
    coverImage: "/images/project-thrift-avenue.jpg",
    images: [
      "/images/project-thrift-avenue.jpg",
      "/images/thrift-card-crop.png"
    ],
    tags: ["UI/UX", "Branding", "Research", "Figma", "Design System"],
    accentColor: "#CCFF00",
    client: "Concept Brand Project",
    year: "2026",
    figmaUrl: "https://figma.com",
    featured: true,
    published: true,
    order: 1
  },
  {
    id: "proj-2",
    slug: "smart-hire",
    title: "Smart Hire",
    category: "Full-Stack Web Application",
    subtitle: "An intelligent, AI-assisted recruitment portal connecting candidates and recruiters through structured screening.",
    description: "A job recruitment platform designed to connect candidates and recruiters through a structured hiring process with candidate portal, recruiter dashboard, resume parsing, anonymous screening, and AI-based rejection feedback.",
    fullCaseStudy: {
      overview: "Smart Hire bridges the communication gap between aspiring talent and talent acquisition teams by providing transparent real-time tracking, unbiased screening, and actionable AI feedback.",
      challenge: "Recruiters are overwhelmed by unstructured PDF resumes, while applicants suffer from lack of feedback and implicit bias during early resume reviews.",
      research: "Benchmarked popular portals (LinkedIn, Indeed) to discover pain points: applicants felt ghosted after rejections, and recruiters spent under 6 seconds per resume skimming without automated sorting.",
      solution: "Designed an intuitive dual-portal interface (Candidate & Recruiter) paired with automated skill-based matching and automated constructive feedback.",
      features: [
        "Candidate portal with one-click resume upload (PDF/DOC)",
        "Recruiter dashboard with pipeline stages (Applied, Screening, Interview, Offer)",
        "Anonymous application mode to prevent demographic bias",
        "AI-driven constructive feedback for rejected applicants",
        "Real-time application status notifications via Socket.io",
        "Advanced job search with salary, location, and tech stack filters"
      ],
      results: "Designed end-to-end Figma UI/UX and integrated with a React.js, Node.js, Express, and MongoDB backend with JWT authentication.",
      learnings: "Gained deep insights into complex dashboard information architecture and designing for high-density analytical screens."
    },
    coverImage: "/images/project-smart-hire.jpg",
    images: [
      "/images/project-smart-hire.jpg",
      "/images/smarthire-card-crop.png"
    ],
    tags: ["Web App", "UI/UX", "Full-Stack", "React.js", "Node.js"],
    accentColor: "#A855F7",
    client: "Academic Capstone Project",
    year: "2025",
    figmaUrl: "https://figma.com",
    githubUrl: "https://github.com",
    featured: true,
    published: true,
    order: 2
  },
  {
    id: "proj-3",
    slug: "pet-adoption-system",
    title: "Pet Adoption System",
    category: "Web Development",
    subtitle: "A compassionate web platform connecting shelter animals with loving families through seamless database integration.",
    description: "A web-based pet adoption platform featuring frontend and backend integration, structured SQL database management, and full CRUD operations for pet profiles, shelter inquiries, and adoption applications.",
    fullCaseStudy: {
      overview: "A database-driven web application enabling local shelters to catalog rescue animals and manage citizen adoption requests efficiently.",
      challenge: "Local animal shelters lacked digital infrastructure, relying on manual paper forms that delayed urgent adoptions.",
      solution: "Developed an accessible web interface with categorized pet profiles, health records, vaccination tracking, and an adoption approval pipeline.",
      features: [
        "Interactive pet catalog with breed, age, and temperament filters",
        "Shelter administrative dashboard with SQL CRUD operations",
        "Adoption application submission with status tracking",
        "Responsive design optimized for mobile and desktop users"
      ],
      results: "Successfully connected relational MySQL database with a clean responsive web frontend.",
      learnings: "Deepened practical understanding of relational database normalization and user-friendly form validation."
    },
    coverImage: "/images/project-pet-adoption.jpg",
    images: ["/images/project-pet-adoption.jpg"],
    tags: ["Web Development", "SQL", "CRUD", "UI Design"],
    accentColor: "#38BDF8",
    year: "2024",
    githubUrl: "https://github.com",
    featured: false,
    published: true,
    order: 3
  },
  {
    id: "proj-4",
    slug: "gourmetgo",
    title: "GourmetGo",
    category: "UI/UX / Design Project",
    subtitle: "A delightful culinary delivery app designed around visual appetite appeal and effortless cart customization.",
    description: "A modern food-related UI/UX design project exploring micro-interactions, high-contrast meal photography, dynamic menu exploration, and rapid delivery tracking.",
    fullCaseStudy: {
      overview: "GourmetGo re-imagines food ordering by emphasizing visual dish presentation, dietary ingredient badges, and live kitchen preparation updates.",
      challenge: "Most food apps cram excessive text and advertisements, distracting hungry users from finding what they crave.",
      solution: "Employed bold typography, vibrant photography, card-based category browsing, and an interactive dish modifier bottom-sheet in Figma.",
      features: [
        "Visual-first dish cards with dietary labels (Vegan, Gluten-Free, Keto)",
        "Interactive meal customization sheet with live pricing recalculation",
        "Animated checkout progress and real-time courier radar tracking",
        "Dark-mode friendly interface with warm appetizing color accents"
      ],
      results: "Created a 30-screen interactive Figma prototype with animated components and micro-interactions.",
      learnings: "Mastered Figma auto-layout, nested component variants, and interactive prototype states."
    },
    coverImage: "/images/project-gourmetgo.jpg",
    images: ["/images/project-gourmetgo.jpg"],
    tags: ["UI/UX", "Mobile App", "Figma", "Food Delivery"],
    accentColor: "#F97316",
    year: "2025",
    figmaUrl: "https://figma.com",
    featured: false,
    published: true,
    order: 4
  },
  {
    id: "proj-5",
    slug: "soundix",
    title: "Soundix",
    category: "UI/UX / Design Project",
    subtitle: "An immersive music streaming application with dynamic ambient player visuals and spatial audio customization.",
    description: "An audio and music-related design project focusing on dark-mode aesthetic immersion, audio waveform visualizations, dynamic playlist curation, and fluid gesture navigation.",
    fullCaseStudy: {
      overview: "Soundix was crafted for audiophiles and music lovers seeking a minimalist, distraction-free player with ambient background colors matching album cover art.",
      challenge: "Balancing high information density (lyrics, queuing, audio quality toggles) with an uncluttered visual aesthetic.",
      solution: "Designed a gesture-first player interface where the background subtly adapts to album colors with blur mesh shaders and smooth GSAP-inspired transitions.",
      features: [
        "Ambient blurred artwork backdrop dynamically responding to music tracks",
        "Interactive scrubbing waveform with timestamp previews",
        "Time-synced floating lyrics viewer",
        "Curated mood discovery stations and collaborative session queueing"
      ],
      results: "High-fidelity Figma UI design praised for its typography hierarchy and slick dark glassmorphism.",
      learnings: "Learned advanced color theory and designing high-contrast interfaces for low-light environments."
    },
    coverImage: "/images/project-soundix.jpg",
    images: ["/images/project-soundix.jpg"],
    tags: ["UI/UX", "Audio Experience", "Figma", "Music App"],
    accentColor: "#8B5CF6",
    year: "2025",
    figmaUrl: "https://figma.com",
    featured: false,
    published: true,
    order: 5
  },
  {
    id: "proj-6",
    slug: "nike-air",
    title: "Nike Air Concept",
    category: "UI/UX / Design Project",
    subtitle: "A high-energy sneaker e-commerce concept with 3D product inspection and editorial streetwear aesthetics.",
    description: "A sneaker-related design project combining bold brutalist typography, dynamic product angles, interactive colorway selector, and high-impact micro-animations.",
    fullCaseStudy: {
      overview: "An experimental concept exploring how high-fashion sneaker drops can feel like an interactive digital exhibition rather than a standard online shop.",
      challenge: "Creating excitement for limited product releases while maintaining intuitive cart and sizing usability.",
      solution: "Integrated oversized display lettering, interactive 360-degree rotation placeholders, and bold sticky purchase bar.",
      features: [
        "Immersive hero section with diagonal grid cuts and dynamic typography",
        "Interactive colorway and size selector with real-time stock indicators",
        "Storytelling section detailing materials and design inspiration",
        "Instant one-click checkout with animated confirmation"
      ],
      results: "Editorial concept showcasing strong visual design and typography mastery.",
      learnings: "Practiced asymmetric layout compositions and modern luxury streetwear web aesthetics."
    },
    coverImage: "/images/project-nike-air.jpg",
    images: ["/images/project-nike-air.jpg"],
    tags: ["UI/UX", "E-Commerce", "Branding", "Concept"],
    accentColor: "#CCFF00",
    year: "2025",
    figmaUrl: "https://figma.com",
    featured: false,
    published: true,
    order: 6
  },
  {
    id: "proj-7",
    slug: "brew-haven",
    title: "Brew Haven",
    category: "UI/UX / Branding Project",
    subtitle: "An artisanal coffee brand experience celebrating craft roasting and mindful cafe ordering.",
    description: "A specialty coffee brand and design project encompassing logo design, packaging identity, coffee bean roast selector, and interactive cafe ordering interface.",
    fullCaseStudy: {
      overview: "Brew Haven brings the warmth and aroma of artisanal coffee culture to a tactile, beautifully designed digital ordering experience.",
      challenge: "Communicating subtle flavor profiles (notes of citrus, dark chocolate, hazelnut) through visual digital cues.",
      solution: "Used warm earthy color palettes, custom iconography for brewing methods (Pour Over, French Press, Espresso), and a taste profile radar chart.",
      features: [
        "Artisanal bean subscription configurator with custom grind choices",
        "Roast profile visualization with acidity and body gauges",
        "Pick-up time scheduler for local cafe branches",
        "Cohesive visual branding across cups, packaging, and digital app"
      ],
      results: "Complete branding kit and high-fidelity prototype in Figma.",
      learnings: "Refined visual storytelling and emotional design principles."
    },
    coverImage: "/images/project-brew-haven.jpg",
    images: ["/images/project-brew-haven.jpg"],
    tags: ["UI/UX", "Branding", "Packaging", "Mobile App"],
    accentColor: "#D97706",
    year: "2024",
    figmaUrl: "https://figma.com",
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
    description: "Worked on comprehensive UI design assignments, practicing visual layouts, interface design, user personas, and interactive prototyping in Figma.",
    tasks: [
      "Designed a full restaurant menu mobile application in Figma with category filters and dish customizers.",
      "Designed a modern e-commerce website interface in Figma following contemporary grid and typography standards.",
      "Practiced wireframing, component-based design systems, and responsive layout adaptations.",
      "Conducted usability reviews and iterated based on mentor feedback."
    ],
    order: 1
  },
  {
    id: "exp-2",
    company: "Webial Technology",
    position: "AI Intern – GTU Phase 2",
    period: "July – August 2023",
    duration: "2 months",
    description: "Participated in the GTU Phase 2 AI internship program, exploring machine learning algorithms, dataset preprocessing, and intelligent application flows.",
    tasks: [
      "Studied core artificial intelligence and machine learning pipelines.",
      "Gained exposure to computer vision and natural language processing concepts.",
      "Collaborated on practical academic assignments under technical mentorship."
    ],
    order: 2
  },
  {
    id: "exp-3",
    company: "Webial Technology",
    position: "Web Development Intern",
    period: "September 2022",
    duration: "1 month",
    description: "Assisted with frontend and backend web development tasks, HTML/CSS structuring, and basic web application development.",
    tasks: [
      "Developed responsive webpage templates using HTML5 and CSS3.",
      "Learned server-side integration and database connectivity fundamentals.",
      "Gained hands-on experience in version control workflows with Git."
    ],
    order: 3
  }
];

export const initialEducations: Education[] = [
  {
    id: "edu-1",
    degree: "B.Tech in Computer Science & Design",
    institution: "G H Patel College of Engineering & Technology (GCET), CVM University",
    period: "Expected 2027",
    score: "CGPA: 8.25",
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
    institution: "Gujarat Secondary and Higher Secondary Education Board",
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
    imageUrl: "/images/cert-nptel-cloud.jpg",
    credentialUrl: "https://nptel.ac.in",
    order: 1
  },
  {
    id: "cert-2",
    title: "Internet of Things (IoT)",
    issuer: "NPTEL",
    grade: "Elite, 86%",
    imageUrl: "/images/cert-nptel-iot.jpg",
    credentialUrl: "https://nptel.ac.in",
    order: 2
  },
  {
    id: "cert-3",
    title: "Python Programming (Python for Everybody)",
    issuer: "Coursera – University of Michigan",
    grade: "Verified Specialization",
    imageUrl: "/images/cert-coursera-python.jpg",
    credentialUrl: "https://coursera.org",
    order: 3
  }
];

export const initialSkills: Skill[] = [
  // Design Skills (Prominent!)
  { id: "sk-1", name: "Figma", category: "design", icon: "Figma", level: "Primary Tool", featured: true },
  { id: "sk-2", name: "UI/UX Design", category: "design", icon: "Layout", level: "Core Strength", featured: true },
  { id: "sk-3", name: "Wireframing", category: "design", icon: "Grid", level: "Core Strength", featured: true },
  { id: "sk-4", name: "Prototyping", category: "design", icon: "Layers", level: "Interactive", featured: true },
  { id: "sk-5", name: "Design Systems", category: "design", icon: "Component", level: "Atomic Design", featured: true },
  { id: "sk-6", name: "Visual Design", category: "design", icon: "Palette", level: "Aesthetics & Hierarchy", featured: true },
  { id: "sk-7", name: "User Research", category: "design", icon: "Users", level: "Fundamentals", featured: true },
  { id: "sk-8", name: "UX Principles", category: "design", icon: "Sparkles", level: "Usability & Heuristics", featured: true },

  // Technical Skills
  { id: "sk-9", name: "HTML5 / CSS3", category: "technical", icon: "Code", level: "Frontend Foundation", featured: true },
  { id: "sk-10", name: "SQL & CRUD", category: "technical", icon: "Database", level: "Data Architecture", featured: true },
  { id: "sk-11", name: "React.js", category: "technical", icon: "Atom", level: "Project Exposure", featured: true },
  { id: "sk-12", name: "Node.js & Express", category: "technical", icon: "Server", level: "Project Exposure", featured: true },
  { id: "sk-13", name: "MongoDB", category: "technical", icon: "HardDrive", level: "Project Exposure", featured: true },
  { id: "sk-14", name: "Python", category: "technical", icon: "Terminal", level: "Basic Programming", featured: true },

  // Tools
  { id: "sk-15", name: "GitHub", category: "tool", icon: "GitBranch", level: "Version Control", featured: true },
  { id: "sk-16", name: "Google Drive", category: "tool", icon: "Cloud", level: "Collaboration", featured: false },
  { id: "sk-17", name: "WPS Office", category: "tool", icon: "FileText", level: "Documentation", featured: false }
];

export const initialSiteSettings: SiteSettings = {
  heroIntro: "Designing Digital Experiences That Matter.",
  availability: "Available for UI/UX Design Internships & Junior Roles",
  footerText: "© 2026 Krish Patel. Designed with passion for digital craft.",
  showAdminLink: true
};
