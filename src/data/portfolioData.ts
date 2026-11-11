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

export interface SkillCategory {
  title: string;
  skills: Array<{ name: string; tag: string }>;
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
  githubUrl?: string;
  liveDemoUrl?: string;
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
  category: 'Competition' | 'Hackathon' | 'Academic' | 'Open Source' | 'Course' | 'Certification';
  description: string;
  year: string;
  highlight?: string;
  status?: 'Completed' | 'In Progress' | 'Verified Credential';
  certificateUrl?: string;
  verificationUrl?: string;
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
    displayName: "Narendra Singh Yadav (Neeraj)",
    role: "Software Developer & B.Tech EEE Student",
    subRole: "Electrical & Electronics Engineering",
    institution: "IPS Academy, Institute of Engineering & Science, Indore",
    department: "Electrical & Electronics Engineering",
    currentStatus: "2nd Year / 3rd Semester",
    firstYearCgpa: "8.45",
    location: "Indore, Madhya Pradesh, India",
    email: "narendraydv8103@gmail.com",
    phone: "+91 8103537584",
    phoneUrl: "tel:+918103537584",
    emailUrl: "mailto:narendraydv8103@gmail.com",
    instagram: "narendraydvv",
    instagramUrl: "https://www.instagram.com/narendraydvv/",
    linkedinUrl: "https://www.linkedin.com/in/narendrayadav07/",
    githubUrl: "https://github.com/narendraydv8103",
    heroManifesto: "Building software, exploring AI, and solving real-world problems through technology.",
    heroSubtext: "B.Tech EEE student at IPS Academy Indore with an 8.45 First-Year CGPA, exploring software engineering, applied AI, and practical systems.",
    statusBadge: "Located in India • Indore, MP",
    footerCopyright: "© 2026 Narendra Singh Yadav. Built with curiosity and code.",
  },

  about: {
    lead: "I am a B.Tech Electrical & Electronics Engineering student at IPS Academy, Institute of Engineering & Science, Indore, currently in my 2nd Year (3rd Semester) with an 8.45 First-Year CGPA.",
    paragraphs: [
      "I started my coding journey in my second year and enjoy turning ideas into practical software while continuously learning modern systems.",
      "Combining disciplined problem solving in C++ and Python with modern web development, applied AI, and hands-on projects.",
      "Actively seeking software development and engineering internships for 2026, collaborative hackathons, and opportunities to learn and build."
    ]
  },

  academicHighlights: [
    {
      label: "B.Tech 1st Year",
      value: "8.45 CGPA",
      subtext: "First-Year Academic Performance",
      badge: "Verified 8.45",
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
  ] as AcademicHighlight[],

  // CHRONOLOGICAL TIMELINE (2022 to 2026)
  journeyMilestones: [
    {
      year: "2022",
      title: "Class 10 Completed",
      stack: "94.8% Board Score",
      description: "Completed Class 10 with 94.8% distinction, building strong mathematical foundations and analytical curiosity.",
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
      stack: "Focused Academic Preparation",
      description: "Took a focused 1-year drop after Class 12 and prepared for JEE from Kota, honing resilience and high-level analytical problem-solving.",
    },
    {
      year: "2025",
      title: "Joined IPS Academy, Indore",
      stack: "B.Tech — Electrical & Electronics Engineering",
      description: "Enrolled in B.Tech Electrical & Electronics Engineering at IPS Academy, Institute of Engineering & Science, Indore.",
    },
    {
      year: "2025–26",
      title: "Completed B.Tech 1st Year",
      stack: "8.45 CGPA • Academic Foundation",
      description: "Completed 1st Year B.Tech in Electrical & Electronics Engineering with an 8.45 CGPA, establishing disciplined engineering fundamentals.",
    },
    {
      year: "2026",
      title: "2nd Year / 3rd Semester & Software Exploration",
      stack: "Software Development, AI & Modern Systems",
      description: "Actively building software projects in C++, Python, and modern web systems. Enrolled in NPTEL Programming in Modern C++ and ISRO IIRS outreach learning programs.",
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
    services: [
      {
        id: "web-apps",
        number: "01",
        title: "Web Applications",
        subtitle: "Full-stack apps, interactive UI & modern frontends",
        capabilities: [
          "Interactive React applications",
          "Responsive, fluid web interfaces",
          "Component-driven architectures",
          "State management & client data sync",
          "Modern styling with Tailwind CSS"
        ],
        tags: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Responsive Design"]
      },
      {
        id: "landing-pages",
        number: "02",
        title: "Landing Pages & Portfolios",
        subtitle: "High-impact visual showcases with smooth interactions",
        capabilities: [
          "Spatial 3D web experiences (Three.js)",
          "Scroll-choreographed animations (GSAP)",
          "Performance-optimized asset pipelines",
          "Clean, memorable typography & layout",
          "Custom interaction design"
        ],
        tags: ["Three.js", "GSAP ScrollTrigger", "Lenis Physics", "3D Canvas", "Web Typography"]
      },
      {
        id: "ai-interfaces",
        number: "03",
        title: "AI Interfaces & Chatbots",
        subtitle: "Conversational assistants, voice tools & prompt workflows",
        capabilities: [
          "Interactive FAQ & knowledge assistants",
          "Real-time voice assistant architectures",
          "LLM API integration & prompt structuring",
          "Interruption-resilient audio pipelines",
          "Context-aware workflow tools"
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

  skillsCategories: [
    {
      title: "Programming Languages",
      skills: [
        { name: "C++", tag: "Core Language / Modern C++" },
        { name: "Python", tag: "Automation & Scripting" },
        { name: "TypeScript", tag: "Type-Safe Development" },
        { name: "JavaScript", tag: "Interactive Web" },
      ],
    },
    {
      title: "Core Fundamentals",
      skills: [
        { name: "OOP", tag: "Object-Oriented Design" },
        { name: "Problem Solving", tag: "Data Structures & Algorithms" },
        { name: "Software Fundamentals", tag: "Clean Architecture" },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React", tag: "Component Architecture" },
        { name: "Tailwind CSS", tag: "Modern Responsive Layouts" },
        { name: "Three.js", tag: "WebGL & 3D Interactive Design" },
        { name: "GSAP", tag: "Motion & ScrollTrigger" },
        { name: "Vite", tag: "Build Tooling & Optimization" },
      ],
    },
    {
      title: "Backend & Systems",
      skills: [
        { name: "FastAPI", tag: "Python REST APIs" },
        { name: "SQL", tag: "Relational Queries" },
        { name: "Supabase", tag: "PostgreSQL & Auth" },
        { name: "API Integration", tag: "REST & Webhooks" },
      ],
    },
    {
      title: "Applied AI & Automation",
      skills: [
        { name: "AI/LLM Integration", tag: "API Orchestration" },
        { name: "Voice Interaction", tag: "Real-Time Conversational Systems" },
        { name: "Workflow Automation", tag: "Custom Bots & Task Scripts" },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git & GitHub", tag: "Version Control & Collaboration" },
        { name: "VS Code", tag: "Development Environment" },
        { name: "Vercel", tag: "Production Web Deployment" },
      ],
    },
  ] as SkillCategory[],

  skillsList: [
    // Core
    { name: "C++", category: "Core Discipline", tag: "Primary Language" },
    { name: "Python", category: "Core Discipline", tag: "Automation & AI" },
    { name: "OOP", category: "Core Discipline", tag: "Object-Oriented Design" },
    { name: "Problem Solving", category: "Core Discipline", tag: "Algorithms & Logic" },
    { name: "Software Development Fundamentals", category: "Core Discipline", tag: "Clean Architecture" },

    // Web & Systems
    { name: "React", category: "Currently Exploring", tag: "Frontend UI" },
    { name: "TypeScript", category: "Currently Exploring", tag: "Type-Safe Web" },
    { name: "Three.js", category: "Currently Exploring", tag: "3D Graphics" },
    { name: "FastAPI", category: "Currently Exploring", tag: "Python Backend" },
    { name: "AI/ML Integration", category: "Currently Exploring", tag: "Intelligent Systems" },
    { name: "Automation", category: "Currently Exploring", tag: "Workflow Bots" },
  ],

  // 5 FLAGSHIP PROJECTS (PORTFOLIO, KAVACH, VOICEFORGE, EMBERHOLD, BILLSHIELD)
  projects: [
    {
      id: "portfolio",
      number: "01",
      title: "Portfolio Website",
      category: "Spatial Web & 3D Interactive Design",
      tagline: "Interactive 3D Engineering Portfolio Showcase",
      statusTag: "LIVE",
      description: "Custom-engineered interactive 3D portfolio showcasing real software engineering projects through spatial design. Built with Three.js graphics, scroll-choreographed lighting, custom typography, an on-site portfolio assistant, and deep-dive technical architecture inspection.",
      visualTheme: "portfolio",
      accentColor: "#5eead4", // Signature spatial turquoise
      tags: ["React 19", "Three.js", "TypeScript", "GSAP & Lenis", "Tailwind CSS v4", "Vite"],
      githubUrl: "https://github.com/narendraydv8103/Portfolio-website",
      liveDemoUrl: "https://narendrasinghyadavportfolio.vercel.app/",
      features: [
        "Dynamic Three.js 3D geometric world synchronized with scroll and active project views",
        "Deep-dive technical architecture inspector with detailed specs and telemetry breakdown",
        "Integrated virtual assistant (Neeraj AI) for instant academic and engineering queries",
        "Strict typography design system with optimized performance and responsive glassmorphism"
      ],
      architecture: "Client-side spatial web application orchestrating Three.js WebGL scenes, Lenis smooth-scroll physics, GSAP timeline triggers, and responsive glassmorphic interfaces.",
      interactiveData: {
        badge: "LIVE",
        metrics: [
          { label: "FRONTEND", value: "React 19" },
          { label: "GRAPHICS", value: "Three.js" },
          { label: "STATUS", value: "Live" }
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
      title: "Academic Performance — 1st Year B.Tech",
      organizer: "IPS Academy, Institute of Engineering & Science, Indore",
      category: "Academic",
      year: "2024–2025",
      description: "Completed 1st Year B.Tech in Electrical & Electronics Engineering with an 8.45 CGPA, demonstrating strong analytical and engineering discipline.",
      highlight: "8.45 First-Year CGPA",
      status: "Completed",
      certificateUrl: "/certificates/Academic Certificate.jpeg"
    },
    {
      id: "dataforge-2026",
      title: "DataForge 2026",
      organizer: "Kharagpur Data Analytics Group, IIT Kharagpur",
      category: "Competition",
      year: "2026",
      description: "Competed in DataForge 2026 national data analytics challenge hosted by Kharagpur Data Analytics Group, IIT Kharagpur.",
      highlight: "KDAG, IIT Kharagpur",
      status: "Completed",
      certificateUrl: "/certificates/Dataforge hackathon certificate.pdf"
    },
    {
      id: "hack-devengers",
      title: "Hack Devengers 2.0",
      organizer: "Devengers / E-Cell IIT Bombay",
      category: "Hackathon",
      year: "2025",
      description: "Certificate of Participation — High-intensity national hackathon held in collaboration with E-Cell IIT Bombay.",
      highlight: "Certificate of Participation",
      status: "Completed",
      certificateUrl: "/certificates/Certificate of Appreciation.jpg"
    },
    {
      id: "hacktoberfest-indore",
      title: "Hacktoberfest Hack Day Indore × PyData Indore",
      organizer: "PyData Indore & Tech Community",
      category: "Open Source",
      year: "2025",
      description: "Certificate of Participation — Open source developer sprint and Python community workshop.",
      highlight: "Certificate of Participation",
      status: "Completed",
      certificateUrl: "/certificates/HactoberFest Certificate.jpeg"
    },
    {
      id: "nptel-modern-cpp",
      title: "Programming in Modern C++",
      organizer: "NPTEL / Swayam (IIT Kharagpur)",
      category: "Course",
      year: "2025–2026",
      description: "Rigorous coursework in Modern C++ (C++11/14/17/20), covering object-oriented architecture, STL algorithms & containers, templates, move semantics, and memory management.",
      highlight: "Modern C++ • NPTEL",
      status: "Completed",
      certificateUrl: "/certificates/NPTEL Certificate.pdf"
    },
    {
      id: "isro-iirs",
      title: "ISRO IIRS Outreach Programme",
      organizer: "Indian Institute of Remote Sensing (ISRO)",
      category: "Course",
      year: "2026",
      description: "Specialized distance learning course by ISRO Indian Institute of Remote Sensing covering remote sensing principles, geospatial technologies, and earth observation data systems.",
      highlight: "In Progress • ISRO IIRS",
      status: "In Progress"
    }
  ] as Achievement[],

  galleryPhotos: [
    { src: '/images/gallery/IMG20251110081816.jpg', alt: 'Scenic mountain ridge trail' },
    { src: '/images/gallery/IMG_20251220_202055.jpg', alt: 'City promenade evening lights' },
    { src: '/images/gallery/IMG_20260912_184523.jpg', alt: 'Misty mountains and river stones' },
    { src: '/images/gallery/IMG20251110064436.jpg', alt: 'Mountain peak scenic overlook' },
    { src: '/images/gallery/IMG_20260118_232048.jpg', alt: 'Ambient cafe profile portrait' },
    { src: '/images/gallery/IMG20251110072448.jpg', alt: 'Forested mountain valley view' },
    { src: '/images/gallery/IMG_20260902_161059.jpg', alt: 'Architectural staircase portrait' },
    { src: '/images/gallery/IMG_20260118_232929.jpg', alt: 'Warm cafe portrait with pampas' },
    { src: '/images/gallery/IMG_1777.jpg', alt: 'Campus architectural portrait' },
    { src: '/images/gallery/IMG_20251210_183907_1.jpg', alt: 'Evening cityscape skyline' },
    { src: '/images/gallery/IMG_20251210_202627.jpg', alt: 'Night ambient street atmosphere' },
    { src: '/images/gallery/IMG_20260324_103743.jpg', alt: 'Daytime outdoor landscape' },
    { src: '/images/gallery/IMG_20260413_133230.jpg', alt: 'Green campus walkway' },
    { src: '/images/gallery/IMG_3622.jpg', alt: 'Casual outdoor portrait' },
    { src: '/images/gallery/IMG_3788.jpeg', alt: 'Warm twilight ambient moment' },
    { src: '/images/gallery/IMG_20260912_185225.jpg', alt: 'Scenic misty winding mountain road' },
    { src: '/images/gallery/IMG_20260118_232200.jpg', alt: 'Full-height indoor architectural portrait' },
  ],

  faqKnowledge: [
    {
      keywords: ["who", "about", "neeraj", "narendra", "intro", "background"],
      answer: "Narendra Singh Yadav (Neeraj) is a B.Tech Electrical & Electronics Engineering student at IPS Academy, Institute of Engineering & Science, Indore (2nd Year / 3rd Semester) with an 8.45 First-Year CGPA. He is passionate about software engineering, C++, Python, and intelligent applications."
    },
    {
      keywords: ["projects", "portfolio", "kavach", "voiceforge", "emberhold", "billshield"],
      answer: "Neeraj's portfolio features five focused engineering projects:\n1. Interactive 3D Portfolio Website (Spatial Web & Three.js showcase)\n2. KAVACH / GoldenHour (Cyber-forensics & offline graph intelligence)\n3. VoiceForge (Interruption-Resilient real-time voice AI)\n4. Emberhold / Life RPG (Dark-fantasy gamified self-discipline system)\n5. BillShield AI (Healthcare fintech hospital bill auditor & dispute dossier generator)."
    },
    {
      keywords: ["skills", "languages", "c++", "python", "oop", "tech", "react", "typescript"],
      answer: "Neeraj's core technical skills include:\n• Languages: C++ (Modern C++), Python, TypeScript, JavaScript\n• Fundamentals: Object-Oriented Programming (OOP), Data Structures & Problem Solving, Software Fundamentals\n• Frontend: React, Tailwind CSS, Three.js, GSAP, Vite\n• Backend & Systems: FastAPI, SQL, Supabase, API Integration\n• Applied AI & Tools: AI/LLM Integration, Git, GitHub."
    },
    {
      keywords: ["education", "cgpa", "college", "marks", "ips", "indore", "academic"],
      answer: "Education background:\n• B.Tech EEE at IPS Academy, Institute of Engineering & Science, Indore (2nd Year / 3rd Semester)\n• 1st Year CGPA: 8.45\n• Class 12th Board: 93.6% (PCM Distinction)\n• Class 10th Board: 94.8% (Distinction)."
    },
    {
      keywords: ["courses", "certifications", "certificate", "nptel", "isro", "iirs", "achievements", "hackathon"],
      answer: "Courses, Certifications & Achievements:\n• NPTEL / Swayam: Programming in Modern C++ (IIT Kharagpur)\n• ISRO IIRS: Distance Learning Outreach Programme (In Progress)\n• DataForge 2026: Kharagpur Data Analytics Group, IIT Kharagpur\n• Hack Devengers 2.0: E-Cell IIT Bombay & Devengers\n• Hacktoberfest Hack Day Indore: PyData Indore\n• Academic Performance: B.Tech 1st Year with 8.45 CGPA at IPS Academy."
    },
    {
      keywords: ["internship", "hiring", "hire", "job", "opportunity", "placement"],
      answer: "Yes! Neeraj is actively looking for software development and engineering internships for 2026. He brings disciplined problem solving in C++/Python, solid analytical rigor, and hands-on project building."
    },
    {
      keywords: ["contact", "email", "reach", "phone", "mobile", "number", "instagram", "insta"],
      answer: "You can reach Neeraj directly:\n• Mobile: +91 8103537584\n• Email: narendraydv8103@gmail.com\n• Instagram: @narendraydvv\n• GitHub: https://github.com/narendraydv8103\n• LinkedIn: https://www.linkedin.com/in/narendrayadav07/\nHe is based in Indore, Madhya Pradesh, India."
    }
  ]
};
