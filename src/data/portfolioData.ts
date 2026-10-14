export interface AcademicHighlight {
  label: string;
  value: string;
  subtext: string;
  badge?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  tag: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  visualTheme: 'forensics' | 'voice' | 'fantasy' | 'assistant' | 'fintech' | 'portfolio';
  statusTag?: string;
  accentColor: string;
  tags: string[];
  features: string[];
  architecture: string;
  interactiveData: {
    badge: string;
    metrics: Array<{ label: string; value: string }>;
    detailItems: string[];
  };
}

export interface Achievement {
  id: string;
  title: string;
  organizer: string;
  category: 'Competition' | 'Hackathon' | 'Academic' | 'Open Source';
  description: string;
  year: string;
  highlight?: string;
  certificateUrl?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  capabilities: string[];
  tags: string[];
}

export const portfolioData = {
  profile: {
    fullName: "Narendra Singh Yadav",
    preferredName: "Neeraj",
    displayName: "Neeraj",
    role: "Student Developer | AI & Software Development",
    subRole: "B.Tech — Electrical & Electronics Engineering",
    institution: "IPS Academy, Indore",
    department: "Electrical & Electronics Engineering",
    currentStatus: "2nd Year / 3rd Semester",
    location: "Indore, Madhya Pradesh, India",
    email: "narendraydv8103@gmail.com",
    phone: "+91 8103537584",
    phoneUrl: "tel:+918103537584",
    emailUrl: "mailto:narendraydv8103@gmail.com",
    instagram: "narendraydvv",
    instagramUrl: "https://www.instagram.com/narendraydvv/",
    linkedinUrl: "https://www.linkedin.com/in/narendrayadav07/",
    githubUrl: "https://github.com/narendraydv8103",
    heroManifesto: "Building software, exploring AI, and turning ideas into practical products.",
    heroSubtext: "Student Developer exploring software engineering, applied AI/ML, and automation with strong foundations in C++ and Python.",
    statusBadge: "Located in India • Indore, MP",
    footerCopyright: "© 2026 Narendra Singh Yadav. Built with curiosity and code.",
  },

  about: {
    lead: "I am a B.Tech Electrical & Electronics Engineering student at IPS Academy, Indore, currently exploring software development, AI/ML and automation.",
    paragraphs: [
      "I started my coding journey in my second year and enjoy turning ideas into practical projects while continuously learning new technologies.",
      "Combining disciplined problem solving in C++ and Python with modern software development, voice interaction systems, and applied machine learning.",
      "Open to software development internships, collaborations, hackathons and opportunities to learn and build."
    ]
  },

  academicHighlights: [
    {
      label: "B.Tech 1st Year",
      value: "8.43 CGPA",
      subtext: "1st Position / Academic Topper",
      badge: "Rank 1",
    },
    {
      label: "Class 12th Board",
      value: "93.6%",
      subtext: "Senior Secondary (PCM)",
      badge: "Distinction",
    },
    {
      label: "Class 10th Board",
      value: "94.8%",
      subtext: "Secondary School Examination",
      badge: "Distinction",
    },
    {
      label: "Current Status",
      value: "3rd Sem",
      subtext: "2nd Year • B.Tech EEE",
      badge: "Active",
    },
  ],

  // EXACT TIMELINE SPECIFIED BY USER (2022 to 2026)
  journeyMilestones: [
    {
      year: "2022",
      title: "Class 10 Completed",
      stack: "94.8% Board Score",
      description: "Completed Class 10 with 94.8% distinction, building strong mathematical foundations and analytical curiosity.",
    },
    {
      year: "2023",
      title: "Class 11 Science Stream",
      stack: "Physics, Chemistry & Mathematics",
      description: "Pursued rigorous physical sciences and mathematics, establishing foundational analytical problem-solving habits.",
    },
    {
      year: "2024",
      title: "Class 12 Completed",
      stack: "93.6% Distinction",
      description: "Completed Class 12 Senior Secondary Examination with 93.6% distinction across core PCM subjects.",
    },
    {
      year: "2024–25",
      title: "JEE Preparation (Kota)",
      stack: "1-Year Academic Drop",
      description: "Took a focused 1-year drop after Class 12 and prepared for JEE from Kota, honing resilience and high-level problem-solving.",
    },
    {
      year: "2025",
      title: "Joined IPS Academy, Indore",
      stack: "B.Tech — Electrical & Electronics Engineering",
      description: "Enrolled in B.Tech Electrical & Electronics Engineering at IPS Academy, Indore, establishing a high academic benchmark.",
    },
    {
      year: "2025–26",
      title: "Completed B.Tech 1st Year",
      stack: "8.95 CGPA • 1st Position Topper",
      description: "Completed 1st Year with an exceptional 8.95 CGPA, securing 1st Position across the entire department.",
    },
    {
      year: "2026",
      title: "Entered 2nd Year / 3rd Semester",
      stack: "Coding & Software Journey",
      description: "Started my coding and software development journey. Began with C++, Python, OOP, and Problem Solving. Currently exploring React, TypeScript, AI/ML, Automation, and Modern Web Development while building practical software and AI projects.",
    },
  ],

  whatIDo: [
    {
      tag: "01",
      title: "SOFTWARE DEVELOPMENT",
      subtitle: "Robust, efficient & practical software",
      description: "Specializing in algorithmic problem solving, clean Object-Oriented Programming (OOP) in C++ and Python, and structured application development.",
      skills: ["C++", "Python", "OOP", "Problem Solving", "Software Fundamentals"],
    },
    {
      tag: "02",
      title: "AI & AUTOMATION",
      subtitle: "Applied AI, voice interaction & automation",
      description: "Building practical AI solutions, exploring interruption-resilient voice interaction, machine learning workflows, and automated tools.",
      skills: ["AI/ML", "Voice Interaction", "Automation", "React & TypeScript", "Modern Web"],
    },
  ],

  whatICanBuild: {
    tagline: "INDEPENDENT DEVELOPER SERVICES",
    heading: "What I Can Build",
    positioning: "I design and build websites, digital experiences and AI-powered solutions for individuals, startups and businesses.",
    subtext: "As an independent student developer, I take on suitable freelance projects and engineering collaborations to craft focused, modern digital solutions without agency overhead.",
    cta: {
      heading: "Have an idea? Let’s build it.",
      supporting: "Available for freelance projects, collaborations and opportunities to build meaningful digital products.",
      buttonText: "Let's Build It",
      href: "#contact"
    },
    services: [
      {
        id: "ui-web-design",
        number: "01",
        title: "UI / Web Design",
        subtitle: "Visual craft, immersive layouts & modern interfaces",
        capabilities: [
          "Modern website UI",
          "Landing pages",
          "Portfolio websites",
          "Responsive interfaces",
          "Interactive / 3D web experiences"
        ],
        tags: ["Modern UI", "Interactive 3D", "Responsive", "Design Systems", "Web Aesthetics"]
      },
      {
        id: "website-development",
        number: "02",
        title: "Website Development",
        subtitle: "Fast, performant & responsive frontend development",
        capabilities: [
          "Business websites",
          "E-commerce websites",
          "Portfolio websites",
          "Custom web applications",
          "Responsive frontend development"
        ],
        tags: ["React & Vite", "TypeScript", "Tailwind CSS", "Next.js", "Clean Architecture"]
      },
      {
        id: "ai-integration",
        number: "03",
        title: "AI Integration",
        subtitle: "Practical intelligence & conversational product features",
        capabilities: [
          "AI-powered features",
          "AI chat interfaces",
          "AI assistants",
          "LLM / API integration",
          "AI-based product features"
        ],
        tags: ["LLM APIs", "AI Assistants", "Prompt Engineering", "Chat Interfaces", "AI Workflows"]
      },
      {
        id: "automation",
        number: "04",
        title: "Automation",
        subtitle: "Streamlined business workflows & scheduled tasks",
        capabilities: [
          "AI automation",
          "Business workflow automation",
          "Repetitive-task automation",
          "API-based workflows",
          "Custom automation solutions"
        ],
        tags: ["Python Scripts", "Workflow Automation", "API Webhooks", "Data Pipelines", "Bot Systems"]
      },
      {
        id: "ui-ux-design",
        number: "05",
        title: "UI/UX Design",
        subtitle: "User-flow focused interfaces & scalable design systems",
        capabilities: [
          "Website UI",
          "Dashboard UI",
          "Product interfaces",
          "Design systems",
          "User-flow focused interfaces"
        ],
        tags: ["Dashboard UX", "User Journeys", "Component Systems", "Micro-Interactions", "Wireframing"]
      }
    ]
  },

  skillsList: [
    // Core
    { name: "C++", category: "Core Discipline", tag: "Primary Language" },
    { name: "Python", category: "Core Discipline", tag: "Automation & AI" },
    { name: "OOP", category: "Core Discipline", tag: "Object-Oriented Design" },
    { name: "Problem Solving", category: "Core Discipline", tag: "Algorithms & Logic" },
    { name: "Software Development Fundamentals", category: "Core Discipline", tag: "Clean Architecture" },

    // Currently Exploring
    { name: "React", category: "Currently Exploring", tag: "Frontend UI" },
    { name: "TypeScript", category: "Currently Exploring", tag: "Type-Safe Web" },
    { name: "AI/ML", category: "Currently Exploring", tag: "Intelligent Systems" },
    { name: "Automation", category: "Currently Exploring", tag: "Workflow Bots" },
    { name: "Modern Web Development", category: "Currently Exploring", tag: "Interactive Web" },
  ],

  // 5 CORE PROJECTS (PORTFOLIO, KAVACH, VOICEFORGE, EMBERHOLD, BILLSHIELD)
  projects: [
    {
      id: "portfolio",
      number: "01",
      title: "Portfolio Website",
      category: "Spatial Web & 3D Interactive Design",
      tagline: "Interactive 3D Engineering Portfolio Showcase",
      statusTag: "In development",
      description: "Custom-engineered interactive 3D portfolio showcasing real software engineering projects through spatial design. Built with Three.js graphics, scroll-choreographed lighting, custom typography, an on-site portfolio assistant, and deep-dive technical architecture inspection.",
      visualTheme: "portfolio",
      accentColor: "#5eead4", // Signature spatial turquoise
      tags: ["React 19", "Three.js", "TypeScript", "GSAP & Lenis", "Tailwind CSS v4", "Vite"],
      features: [
        "Dynamic Three.js 3D geometric world synchronized with scroll and active project views",
        "Deep-dive technical architecture inspector with detailed specs and telemetry breakdown",
        "Integrated virtual assistant (Neeraj AI) for instant academic and engineering queries",
        "Strict typography design system using Playfair Display, Jost, and JetBrains Mono"
      ],
      architecture: "Client-side spatial web application orchestrating Three.js WebGL scenes, Lenis smooth-scroll physics, GSAP timeline triggers, and responsive glassmorphic interfaces.",
      interactiveData: {
        badge: "IN DEVELOPMENT",
        metrics: [
          { label: "FRONTEND", value: "React 19" },
          { label: "GRAPHICS", value: "Three.js" },
          { label: "STATUS", value: "Active Dev" }
        ],
        detailItems: [
          "Engine: Three.js WebGL & custom scene lighting",
          "Motion: GSAP triggers & Lenis smooth scrolling",
          "Design: Responsive glassmorphism & strict typography"
        ]
      }
    },
    {
      id: "kavach",
      number: "02",
      title: "KAVACH / GoldenHour",
      category: "Cyber-Forensics & Offline Correlator",
      tagline: "Offline Cyber Fraud Triage & Evidence Correlator",
      statusTag: "Completed",
      description: "AI-assisted offline cyber-fraud evidence correlator analyzing CDR, IPDR, Bank/UPI records, Email Headers, and Android Artifacts. Built for rapid fraud pattern identification, explainable timelines, risk scoring, evidence integrity, and statutory forensic reporting during the critical first hour.",
      visualTheme: "forensics",
      accentColor: "#10b981", // Emerald forensic data green
      tags: ["CDR & IPDR", "Bank/UPI", "Email Headers", "Android Artifacts", "Risk Scoring", "Explainable Timelines"],
      features: [
        "100% air-gapped and offline local workstation operation (zero cloud dependencies)",
        "Tamper-evident SHA-256 hash-chained custody log ensuring court-admissible evidence integrity",
        "Multi-source entity resolution across Phone (+91), UPI, IMEI, IP, Email, and APK hashes",
        "Automated directional fraud graph (NetworkX) tracing fund dissipation from victim to mule accounts",
        "Offline vector PDF investigation brief generation with embedded cryptographic QR verification"
      ],
      architecture: "Offline graph correlation engine calculating relational node proximity across telecommunications, banking, and Android forensic data with NetworkX and ReportLab.",
      interactiveData: {
        badge: "CYBER-FORENSICS",
        metrics: [
          { label: "ARCHITECTURE", value: "100% Offline" },
          { label: "RECORD TYPES", value: "CDR, IPDR, UPI" },
          { label: "INTEGRITY", value: "SHA-256 Hashed" }
        ],
        detailItems: [
          "Data Vectors: CDR, IPDR, Bank/UPI, Email Headers, Android Artifacts",
          "Intelligence: NetworkX graph traversal & CGNAT false-link protection",
          "Reporting: Bilingual statutory dossier with QR verification seal"
        ]
      }
    },
    {
      id: "voice-ai",
      number: "03",
      title: "VoiceForge",
      category: "Real-Time Voice Interaction System",
      tagline: "Interruption-Resilient Voice Conversational AI",
      statusTag: "Completed",
      description: "Interruption-resilient conversational voice assistant prototype engineered for hands-busy environments. Features monotonic generation fencing, instant synchronous audio cessation (<25ms), and in-flight request cancellation via AbortController to guarantee zero speech collisions.",
      visualTheme: "voice",
      accentColor: "#a855f7", // Futuristic audio violet
      tags: ["Interruption-Resilient", "Rime Neural TTS", "Groq LLM", "AbortController", "Web Audio API", "Observability"],
      features: [
        "Sub-25ms synchronous audio cutoff upon vocal interruption without event-loop lag",
        "Monotonic generation ticket fencing preventing stale audio playback and out-of-order race conditions",
        "Immediate in-flight network request cancellation via browser AbortController",
        "Dynamic persona switching and domain RAG powered by Rime AI Neural TTS and Groq LLM",
        "Real-time engineering command center with live latency measurements and telemetry logging"
      ],
      architecture: "Client-gated duplex speech pipeline combining browser Web Audio API buffers, VAD trigger cancellation, AbortController fencing, and low-latency TTS streams.",
      interactiveData: {
        badge: "VOICE INTERACTION",
        metrics: [
          { label: "HALT LATENCY", value: "< 25ms" },
          { label: "TTS ENGINE", value: "Rime Neural" },
          { label: "CANCELLATION", value: "AbortController" }
        ],
        detailItems: [
          "Core Runtime: Monotonic generation ticket fencing (#N -> #N+1)",
          "Audio Layer: Synchronous buffer discard with Web Audio API",
          "Telemetry: Real-time latency HUD & BroadcastChannel ledger"
        ]
      }
    },
    {
      id: "emberhold",
      number: "04",
      title: "Emberhold / Life RPG",
      category: "Dark-Fantasy Guild-Themed RPG",
      tagline: "Guild Hall, Quests, Relics & Character Progression",
      statusTag: "Completed",
      description: "Full-stack dark-fantasy Life RPG web application turning daily habits, chores, and study into an engaging adventure. Mundane tasks become Quests yielding XP, Gold, and streak multipliers to power 5 core hero attributes across 7 historical guild ranks.",
      visualTheme: "fantasy",
      accentColor: "#f97316", // Ember flame orange / gold
      tags: ["React 19", "TanStack Start", "Nitro Engine", "Supabase PostgreSQL", "Web Audio API", "Tailwind CSS v4"],
      features: [
        "Guild Notice Board with full quest CRUD, difficulty tiers, and recurring daily rites",
        "Non-linear leveling curve across 7 guild ranks (Novice to Dragonsworn)",
        "5 core hero attributes (Strength, Intellect, Endurance, Charisma, Spirit) fueled by real tasks",
        "Consecutive day streak multipliers (+5% per day up to +70% bonus cap)",
        "Vault of Relics economy with title equipping and native Web Audio synthesizer sound effects"
      ],
      architecture: "Full-stack server-validated RPG engine running on Nitro with TanStack RPC, Supabase PostgreSQL Row-Level Security (RLS), and Web Audio synthesizer.",
      interactiveData: {
        badge: "GUILD HALL RPG",
        metrics: [
          { label: "RANKS", value: "7 Guild Tiers" },
          { label: "ATTRIBUTES", value: "5 Core Stats" },
          { label: "AUDIO", value: "Web Audio API" }
        ],
        detailItems: [
          "Quests: Notice Board with Trivial, Common, Perilous & Legendary tiers",
          "Security: Server-side progression math & Supabase Row Level Security",
          "Audio: Pure browser-synthesized fanfare, chimes, and coin clinks"
        ]
      }
    },
    {
      id: "billshield",
      number: "05",
      title: "BillShield AI",
      category: "Healthcare Fintech & Statutory Audit",
      tagline: "AI-Assisted Hospital Bill Audit & Dispute Dossier Generator",
      statusTag: "Completed",
      description: "Healthcare fintech auditing platform for Indian patients that evaluates medical bills against 37 codified statutory regulations (IRDAI Master Circular, GST Council Notifications, CGHS Tariffs, NPPA Drug Price Orders). Detects arithmetic discrepancies, duplicate tests, and unbundled charges, then generates formal dispute letters.",
      visualTheme: "fintech",
      accentColor: "#06b6d4", // Clean fintech teal / platinum
      tags: ["FastAPI (Python)", "Next.js 16", "PyMuPDF", "Gemini AI", "Tailwind CSS v4", "Statutory Rules"],
      features: [
        "Multi-format bill ingestion (PDF, PNG, JPG) extracting line items with PyMuPDF",
        "Deterministic rule engine evaluating 37 codified Indian healthcare statutory regulations",
        "Line-by-line arithmetic reconciliation and duplicate diagnostic test detection",
        "ICU unbundling detection identifying unlawful separate nursing and monitoring fees",
        "One-click printable dispute dossier generator with patient UHID and legal circular citations"
      ],
      architecture: "FastAPI Python backend coordinating PyMuPDF coordinate extraction, a 37-rule statutory engine, and Google Gemini AI for explainable dispute generation.",
      interactiveData: {
        badge: "FINTECH AUDITOR",
        metrics: [
          { label: "STATUTORY RULES", value: "37 Codified" },
          { label: "PARSER", value: "PyMuPDF PDF" },
          { label: "DISPUTES", value: "Formal Dossier" }
        ],
        detailItems: [
          "Regulations: IRDAI Master Circular, GST Exemption 12/2017, CGHS Tariffs",
          "Verification: Line-item math & ICU unbundling verification",
          "Actions: Printable formal dispute letters for hospital grievance cells"
        ]
      }
    }
  ] as Project[],

  achievements: [
    {
      id: "academic-achievement",
      title: "Academic Achievement",
      organizer: "IPS Academy, Indore",
      category: "Academic",
      year: "2025–2026",
      description: "1st Position — B.Tech 1st Year with an exceptional 8.95 CGPA.",
      highlight: "1st Position • 8.95 CGPA",
      certificateUrl: "/certificates/Academic Certificate.jpeg"
    },
    {
      id: "dataforge-2026",
      title: "DataForge 2026",
      organizer: "Kharagpur Data Analytics Group, IIT Kharagpur",
      category: "Competition",
      year: "2026",
      description: "Competed in DataForge 2026 hosted by Kharagpur Data Analytics Group, IIT Kharagpur.",
      highlight: "KDAG, IIT Kharagpur",
      certificateUrl: "/certificates/Dataforge hackathon certificate.pdf"
    },
    {
      id: "hack-devengers",
      title: "Hack Devengers 2.0",
      organizer: "Devengers / E-Cell IIT Bombay",
      category: "Hackathon",
      year: "2025",
      description: "Certificate of Participation — High-intensity hackathon held with E-Cell IIT Bombay.",
      highlight: "Certificate of Participation",
      certificateUrl: "/certificates/Certificate of Appreciation.jpg"
    },
    {
      id: "hacktoberfest-indore",
      title: "Hacktoberfest Hack Day Indore × PyData Indore",
      organizer: "PyData Indore & Tech Community",
      category: "Open Source",
      year: "2025",
      description: "Certificate of Participation — Open source developer sprint and Python workshop.",
      highlight: "Certificate of Participation",
      certificateUrl: "/certificates/HactoberFest Certificate.jpeg"
    }
  ] as Achievement[],

  faqKnowledge: [
    {
      keywords: ["who", "about", "neeraj", "narendra", "intro", "background"],
      answer: "Neeraj (Narendra Singh Yadav) is a B.Tech Electrical & Electronics Engineering student at IPS Academy, Indore. He is the department Academic Topper (8.95 CGPA, 1st Rank) passionate about software engineering, C++, Python, and AI systems."
    },
    {
      keywords: ["projects", "portfolio", "kavach", "voiceforge", "emberhold", "billshield"],
      answer: "Neeraj's portfolio features five focused engineering projects:\n1. Interactive 3D Portfolio Website (Spatial Web & Three.js showcase — in development)\n2. KAVACH / GoldenHour (Cyber-forensics & offline graph intelligence)\n3. VoiceForge (Interruption-Resilient real-time voice AI)\n4. Emberhold / Life RPG (Dark-fantasy gamified self-discipline system)\n5. BillShield AI (Healthcare fintech hospital bill auditor & dispute dossier generator)."
    },
    {
      keywords: ["skills", "languages", "c++", "python", "oop", "tech"],
      answer: "Neeraj's established core skills are C++, Python, Object-Oriented Programming (OOP), Data Structures & Problem Solving, and Software Development fundamentals. He is actively exploring modern frontend tooling and applied AI/ML."
    },
    {
      keywords: ["education", "cgpa", "college", "marks", "ips", "indore", "topper"],
      answer: "Education background:\n• B.Tech EEE at IPS Academy, Indore (2nd Year / 3rd Sem)\n• 1-Year CGPA: 8.95 (1st Position / Academic Topper, Session 2025–2026)\n• Class 12th: 93.6%\n• Class 10th: 94.8%."
    },
    {
      keywords: ["internship", "hiring", "hire", "job", "opportunity", "placement"],
      answer: "Yes! Neeraj is actively looking for software development and IT internships for 2026. He brings disciplined problem-solving in C++/Python, top academic rigor, and hands-on project building."
    },
    {
      keywords: ["contact", "email", "reach", "phone", "mobile", "number", "instagram", "insta"],
      answer: "You can reach Neeraj directly:\n• Mobile: +91 8103537584\n• Email: narendraydv8103@gmail.com\n• Instagram: @narendraydvv\n• LinkedIn & GitHub links are available in the footer.\nHe is based in Indore, Madhya Pradesh, India."
    }
  ]
};
