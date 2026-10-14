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
  visualTheme: 'forensics' | 'voice' | 'fantasy' | 'assistant' | 'fintech';
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

  // ONLY THE 5 SPECIFIED PROJECTS
  projects: [
    {
      id: "kavach",
      number: "01",
      title: "KAVACH / GoldenHour",
      category: "Cyber-Forensics & Offline Correlator",
      tagline: "AI-assisted offline cyber-fraud evidence correlator",
      description: "AI-assisted offline cyber-fraud evidence correlator analyzing CDR, IPDR, Bank/UPI records, Email Headers, and Android Artifacts. Built for fraud pattern identification, explainable timelines, risk scoring, evidence integrity, and forensic reporting.",
      visualTheme: "forensics",
      accentColor: "#10b981", // Emerald forensic data green
      tags: ["CDR & IPDR", "Bank/UPI", "Email Headers", "Android Artifacts", "Risk Scoring", "Explainable Timelines"],
      features: [
        "Fraud pattern identification correlating CDR, IPDR, and financial UPI/Bank records",
        "Explainable chronological timeline reconstruction of multi-source suspect events",
        "Risk scoring engine flagging anomaly vectors and money-mule networks",
        "Cryptographic evidence integrity logging with standardized reporting module"
      ],
      architecture: "Offline graph correlation engine calculating relational node proximity across telecommunications, banking, and Android forensic data.",
      interactiveData: {
        badge: "CYBER-FORENSICS",
        metrics: [
          { label: "TRIAGE TIME", value: "< 3.8s" },
          { label: "RECORD TYPES", value: "CDR, IPDR, UPI" },
          { label: "INTEGRITY", value: "SHA-256 Hashed" }
        ],
        detailItems: [
          "Data Vectors: CDR, IPDR, Bank/UPI, Email Headers, Android Artifacts",
          "Focus: Fraud pattern identification & explainable timelines",
          "Reporting: Evidence integrity & tamper-evident logs"
        ]
      }
    },
    {
      id: "voice-ai",
      number: "02",
      title: "VoiceForge",
      category: "Real-Time Voice Interaction System",
      tagline: "Interruption-Resilient Voice Interaction",
      description: "AI-powered real-time voice interaction system featuring STT, Rime TTS, LLM tools, personas, conversational memory, RAG, observability, interruption-resilient interaction, generation fencing, AbortController, and browser Web Audio benchmarking.",
      visualTheme: "voice",
      accentColor: "#a855f7", // Futuristic audio violet
      tags: ["Interruption-Resilient", "STT & Rime TTS", "LLM Tools", "AbortController", "Web Audio Benchmark", "RAG & Memory"],
      features: [
        "Interruption-Resilient voice interaction with instant generation fencing via AbortController",
        "STT and Rime TTS pipeline with dynamic persona shifting and conversational memory",
        "RAG retrieval context coupled with end-to-end latency observability",
        "Browser Web Audio API benchmarking for real-time speech processing metrics"
      ],
      architecture: "Streaming audio pipeline utilizing Web Audio buffers, VAD trigger cancellation, AbortController fencing, and low-latency TTS streams.",
      interactiveData: {
        badge: "VOICE INTERACTION",
        metrics: [
          { label: "INTERACTION", value: "Interruption-Safe" },
          { label: "TTS ENGINE", value: "Rime TTS" },
          { label: "CANCELLATION", value: "AbortController" }
        ],
        detailItems: [
          "Core Model: Interruption-Resilient Voice Interaction",
          "Tooling: LLM Tools, Personas, Memory & RAG",
          "Benchmarking: Browser Web Audio latency metrics"
        ]
      }
    },
    {
      id: "emberhold",
      number: "03",
      title: "Emberhold / Life RPG",
      category: "Dark-Fantasy Guild-Themed RPG",
      tagline: "Guild Hall, Quests, Relics & Character Progression",
      description: "Dark-fantasy guild-themed Life RPG transforming self-discipline into an immersive dark-fantasy adventure. Features quests, XP, gold, streaks, character attributes, inventory, titles, rewards, and progression inside an atmospheric guild hall.",
      visualTheme: "fantasy",
      accentColor: "#f97316", // Ember flame orange / gold
      tags: ["Dark-Fantasy RPG", "Guild Hall", "Quests & XP", "Relics & Inventory", "Progression & Streaks"],
      features: [
        "Atmospheric Guild Hall with dynamic ember lighting and character progression",
        "Quests and bounties translating daily milestones into XP and gold rewards",
        "Inventory and Relic vault storing character titles, streaks, and unlocked attributes",
        "Cinematic dark-fantasy visual design avoiding generic productivity dashboard aesthetics"
      ],
      architecture: "Stateful RPG engine modeling attribute scaling, inventory relational schemas, quest dependency trees, and procedural loot rewards.",
      interactiveData: {
        badge: "GUILD HALL RPG",
        metrics: [
          { label: "GUILD STATUS", value: "Rank II" },
          { label: "PROGRESSION", value: "XP & Gold" },
          { label: "THEME", value: "Dark-Fantasy" }
        ],
        detailItems: [
          "Features: Quests, XP, Gold, Streaks, Attributes, Inventory, Titles",
          "Visuals: Atmospheric Guild Hall, Relics, Embers & Lighting",
          "Design: Immersive RPG universe (Not a productivity dashboard)"
        ]
      }
    },
    {
      id: "rpm",
      number: "04",
      title: "RPM / AI Voice Assistant",
      category: "AI Voice Assistant & Spatial Dialogue",
      tagline: "Conversational Voice Interaction & Assistant UI",
      description: "Dedicated AI voice assistant project featuring conversational voice interaction, structured assistant UI, audio visualization, contextual multi-turn dialogue, and desktop workflow automation.",
      visualTheme: "assistant",
      accentColor: "#38bdf8", // Atmospheric sky cyan
      tags: ["Voice Assistant", "Audio Visualization", "Assistant UI", "Conversational AI", "Python Core"],
      features: [
        "Dedicated AI conversation engine with real-time audio visualization",
        "Structured assistant UI with contextual feedback and execution status",
        "Multi-turn context persistence for hands-free queries and commands",
        "Extensible automation plugins for local machine interaction"
      ],
      architecture: "Modular assistant runtime with decoupled speech listeners, intent routing, and spatial audio feedback indicators.",
      interactiveData: {
        badge: "VOICE ASSISTANT",
        metrics: [
          { label: "PROJECT TYPE", value: "Independent" },
          { label: "INTERFACE", value: "Assistant UI" },
          { label: "VISUALIZER", value: "Audio Waveform" }
        ],
        detailItems: [
          "Focus: AI conversation, voice interaction, assistant UI",
          "Audio: Real-time audio visualization & auditory feedback",
          "Architecture: Distinct from VoiceForge real-time voice pipeline"
        ]
      }
    },
    {
      id: "billshield",
      number: "05",
      title: "BillShield AI",
      category: "Fintech Protection & Risk Intelligence",
      tagline: "AI-Powered Financial & Bill Protection Concept",
      description: "AI-powered financial/bill protection concept providing deep bill analysis, financial data parsing, hidden surcharge risk detection, proactive anomaly alerts, and protection-oriented consumer insights.",
      visualTheme: "fintech",
      accentColor: "#06b6d4", // Clean fintech teal / platinum
      tags: ["Fintech Protection", "Bill Analysis", "Risk Detection", "Financial Alerts", "Protection Insights"],
      features: [
        "Deep bill analysis parsing complex statements and line-item recurring charges",
        "Financial data risk detection identifying predatory surcharges and contract creep",
        "Real-time protection alerts flagging anomalous billing spikes",
        "Automated dispute-oriented insights and structured evidence breakdown"
      ],
      architecture: "Financial telemetry parsing engine with heuristic surcharge detection algorithms, statement structuring, and risk analytics.",
      interactiveData: {
        badge: "FINTECH SHIELD",
        metrics: [
          { label: "ANALYSIS", value: "Line-by-Line" },
          { label: "RISK RADAR", value: "Active Scan" },
          { label: "PROTECTION", value: "Alert Insights" }
        ],
        detailItems: [
          "Focus: Bill analysis, financial data, risk detection, alerts",
          "Insights: Protection-oriented financial summaries",
          "Visual Direction: Premium fintech data visualization"
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
      keywords: ["projects", "kavach", "voiceforge", "emberhold", "rpm", "billshield"],
      answer: "Neeraj has built five flagship projects:\n1. KAVACH / GoldenHour (Cyber-forensics & graph intelligence)\n2. Voice AI / VoiceForge (Interruption-Resilient voice interaction)\n3. Emberhold / Life RPG (Dark-fantasy gamified progression)\n4. RPM / AI Voice Assistant (Spatial audio voice assistant)\n5. BillShield AI (Fintech bill anomaly detection & risk radar)."
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
