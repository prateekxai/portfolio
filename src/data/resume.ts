/**
 * Single source of truth — all content sourced directly from
 * Prateek Srivastava's resume (Prateek Srivastava Resume.pdf).
 */

export const PROFILE = {
  name: "Prateek Srivastava",
  firstName: "Prateek",
  lastName: "Srivastava",
  initials: "PS",
  title: "Final Year Undergraduate",
  field: "Electronics Engineering",
  university: "Harcourt Butler Technical University, Kanpur",
  location: "India",
  email: "prateekxai@gmail.com",
  phone: "+91 9918927749",
  github: "https://github.com/prateekxai",
  linkedin: "https://www.linkedin.com/in/prateekxai/",
  portfolio: "https://prateekxai.pages.dev/",
  resumePdf: "/Prateek_Srivastava_Resume.pdf",
  roles: ["Backend Developer", "Full-Stack Developer", "AI Engineer", "Automation Developer"],
  tagline:
    "I build backends, AI agents and automations that take the boring work off people's desks, and I've helped scale products to 100K+ users.",
} as const;

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: "Dualite AI",
    role: "Backend Intern",
    period: "Aug 2025 – Present",
    points: [
      "Scaled backend systems with cross-functional teams, contributing to product growth to 100K+ users.",
      "Delivered 5+ production-ready full-stack applications with robust backend logic, APIs, and deployments.",
      "Contributed to the Prompt Enhancer and Visual Editor, improving manual user interaction efforts by 30%.",
      "Developed an automated bulk Tally voucher creation automation by mapping Weighbridge ERP data to supplier-specific rates through an internal portal; moved a 10–20 day backlog to daily processing and saved 30+ hours/week.",
    ],
  },
  {
    company: "STC, Indian Railways",
    role: "AI Research Intern",
    period: "Jun 2025 – Jul 2025",
    location: "Lucknow",
    points: [
      "Built and deployed a face recognition system using computer vision integrated with a humanoid robot.",
      "Improved model accuracy from 60–70% to 94% via dataset enhancement and model optimization.",
      "Enabled real-time inference (sub-second latency) through collaboration with the robotics team.",
    ],
  },
  {
    company: "SoftPro India",
    role: "SDE Intern",
    period: "Jul 2023 – Sep 2023",
    location: "Lucknow",
    points: [
      "Contributed to an e-learning platform serving 30,000+ users.",
      "Delivered scalable, production-ready features with cross-functional teams.",
    ],
  },
];

export interface Project {
  /** The full story lives at /work/<slug>. */
  slug: string;
  title: string;
  category: string;
  summary: string;
  demo?: string;
  repo?: string;
  image: string;
  span: string;
  aspect: string;
}

/** The featured cards on the home page, in résumé order. */
export const PROJECTS: Project[] = [
  {
    slug: "tally-bookkeeping-automation",
    title: "Tally Bookkeeping Automation",
    category: "ERP Data Integration · Workflow Automation",
    summary:
      "Weighbridge and ERP data in, supplier-priced vouchers out. A backlog of 10 to 20 days now clears every single day.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    slug: "asha-ai",
    title: "ASHA AI",
    category: "Voice-First Rural Health Companion",
    summary:
      "A health companion for rural women who'd rather speak than type. Ask in your own language on WhatsApp or the app, and get safe advice back, out loud.",
    demo: "https://asha-ai.pages.dev/",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    slug: "pulse-ai",
    title: "Pulse AI",
    category: "Clinical Surveillance System",
    summary:
      "Wearable data in, one CareScore out. It notices when your normal starts to drift and tells your doctor and caretaker.",
    demo: "https://pulseai-hackshodh.pages.dev/",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
  {
    slug: "mdrs",
    title: "MDRS",
    category: "Multimodal Deception Risk Scorer · iSAFE World Finalist",
    summary:
      "Scores images, video, audio and text for deception risk, and shows the evidence instead of shouting fake. A world finalist at iSAFE.",
    demo: "https://isafe-hackathon.pages.dev/",
    repo: "https://github.com/prateekhbtu/isafe-hackathon",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    slug: "ai-job-hunting-agent",
    title: "AI Job Hunting Agent",
    category: "Agentic AI + Automation",
    summary:
      "I got tired of checking job boards, so an n8n agent now does it every six hours and emails me the best matches. 10+ hours a week back.",
    demo: "https://www.linkedin.com/posts/prateek-workspace_ai-jobsearch-automation-activity-7348274499743555584-3a0i",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    slug: "ai-commenting-agent",
    title: "Targeted Commenting Agent",
    category: "Agentic AI + Backend",
    summary:
      "Writes specific, on-brand comments, waits for a human yes, and learns from every edit. No more \"Great post!\".",
    demo: "https://auto-commenting-agent.onrender.com/docs",
    repo: "https://github.com/prateekxai/auto-commenting-agent",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[16/11]",
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    items: ["C", "C++", "Python", "JavaScript", "SQL"],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      "Django",
      "Tkinter",
      "Bootstrap",
      "Tailwind CSS",
      "React.js",
      "Node.js",
      "Hono.js",
      "OpenCV",
      "YOLO",
    ],
  },
  {
    label: "Databases & Automations",
    items: [
      "MySQL",
      "PostgreSQL",
      "SQLite3",
      "MongoDB",
      "Supabase",
      "Workflow Automation",
      "n8n",
      "MCP",
      "AI Agents",
      "API Integration",
      "OCR",
      "Gemini",
      "Prompt Engineering",
    ],
  },
  {
    label: "Dev Tools & Utilities",
    items: ["Git", "GitHub", "Notion", "Figma", "Postman", "Docker", "Jira"],
  },
];

/** Visual focus areas used in the parallax gallery. */
export const FOCUS_AREAS: { label: string; image: string }[] = [
  {
    label: "Agentic AI",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Backend Systems",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Computer Vision",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Real-Time Systems",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Automation",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Full-Stack",
    image:
      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&w=700&q=80",
  },
];

export interface Achievement {
  title: string;
  detail: string;
  meta: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "8x Hackathon Winner",
    detail: "Won Square Hacks Finals (IIT Delhi) among 600+ teams nationwide.",
    meta: "₹40,000 prize",
  },
  {
    title: "iSAFE Hackathon Global Win",
    detail:
      "Global Winner of the iSAFE Hackathon by International Telecommunication (UK) among 10K+ participants worldwide.",
    meta: "10K+ worldwide",
  },
  {
    title: "Best AI Innovative Use Case",
    detail: "GenAI Hackathon Finals among 85+ teams (AI Community Lucknow & TFUG).",
    meta: "Winner",
  },
  {
    title: "Runner-up, TechX Hackathon",
    detail: "Built a cybersecurity solution for Cyber Police Lucknow.",
    meta: "₹10,000 prize",
  },
  {
    title: "Smart India Hackathon (SIH)",
    detail: "Internal Qualifier among 100+ teams across institute-level selection.",
    meta: "Qualifier",
  },
  {
    title: "Community Organizer",
    detail:
      "Organized hackathons and tech events under GDG HBTU & AETE, engaging 500+ students from multiple colleges.",
    meta: "500+ students",
  },
  {
    title: "Mentor",
    detail:
      "Mentored students in Web Development, AI/ML, and emerging technologies across technical communities.",
    meta: "Mentorship",
  },
];

export interface Position {
  role: string;
  org: string;
}

export const POSITIONS: Position[] = [
  { role: "Lead", org: "Google Developers Group On Campus (GDGoC), HBTU Kanpur Chapter" },
  { role: "Technical Team", org: "Association of Electronics Engineers (AETE), HBTU Kanpur" },
  { role: "Technical Team", org: "NSS, HBTU Kanpur" },
];

export const CERTIFICATIONS: string[] = [
  "100 Hours Course on Cyber Security and Digital Forensics, IIIT Kota",
  "Course on Computer Concepts, NIELIT (National Institute of Electronics and Information Technology)",
];

export interface Education {
  exam: string;
  institute: string;
  board: string;
  year: string;
  score: string;
}

export const EDUCATION: Education[] = [
  {
    exam: "B.Tech (Electronics & Telecommunication)",
    institute: "HBTU Kanpur",
    board: "HBTU Kanpur",
    year: "2024 – Present",
    score: "7.0 / 10.0 CPI",
  },
  {
    exam: "Diploma (Information Technology)",
    institute: "Government Polytechnic, Lucknow",
    board: "BTEUP",
    year: "2024",
    score: "77.78%",
  },
  {
    exam: "Class XII",
    institute: "Sri Sai Inter College",
    board: "UP Board",
    year: "2021",
    score: "86.80%",
  },
];

export const STATS: { value: string; label: string }[] = [
  { value: "100K+", label: "Users Reached" },
  { value: "8×", label: "Hackathons Won" },
  { value: "20+", label: "Projects delivered" },
  { value: "600+", label: "Teams Outperformed" },
];
