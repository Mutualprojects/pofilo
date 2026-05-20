import { Terminal, Server, Code2, Brain, Database, Globe } from "lucide-react";

export const skillCategories = [
  {
    title: "Languages",
    icon: Terminal,
    color: "#e11d48",
    description: "Polyglot proficiency across the modern full-stack spectrum.",
    skills: [
      { name: "Python", level: 95, tags: ["Django", "FastAPI", "Flask"] },
      { name: "JavaScript", level: 93, tags: ["ES2024", "Async"] },
      { name: "TypeScript", level: 88, tags: ["Safety", "Scale"] },
    ],
  },
  {
    title: "Backend & APIs",
    icon: Server,
    color: "#7c3aed",
    description: "Production-grade server-side systems and RESTful services.",
    skills: [
      { name: "Django & DRF", level: 94, tags: ["Python", "Expert"] },
      { name: "Node.js / Express", level: 92, tags: ["REST", "Real-time"] },
      { name: "Microservices", level: 85, tags: ["Architecture"] },
      { name: "RESTful Services", level: 95, tags: ["Design", "Versioning"] },
      { name: "WebSockets", level: 86, tags: ["Sockets.io", "Real-time"] },
    ],
  },
  {
    title: "Frontend & UI",
    icon: Code2,
    color: "#0ea5e9",
    description: "High-fidelity responsive interfaces across platforms.",
    skills: [
      { name: "Next.js", level: 93, tags: ["App Router", "SSR"] },
      { name: "React.js", level: 94, tags: ["Hooks", "Context"] },
      { name: "Vite", level: 88, tags: ["Build", "Speed"] },
      { name: "Tailwind CSS", level: 95, tags: ["Styling", "Responsive"] },
      { name: "HTML / CSS", level: 92, tags: ["Semantic", "A11y"] },
    ],
  },
  {
    title: "AI / Automation",
    icon: Brain,
    color: "#f59e0b",
    description: "Intelligent systems — chatbots to identity verification.",
    skills: [
      { name: "OpenAI APIs", level: 91, tags: ["GPT-4", "Embeddings"] },
      { name: "AI Applications", level: 90, tags: ["Integration"] },
      { name: "Automation Systems", level: 87, tags: ["Workflow", "WhatsApp"] },
      { name: "Computer Vision", level: 84, tags: ["FaceNet", "ANPR"] },
      { name: "API Integration", level: 93, tags: ["Third-party", "Webhooks"] },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    color: "#10b981",
    description: "From relational to vector — the right store for every shape.",
    skills: [
      { name: "MongoDB", level: 90, tags: ["NoSQL", "Aggregation"] },
      { name: "PostgreSQL / Supabase", level: 88, tags: ["Relational", "RLS"] },
      { name: "ChromaDB / Pinecone", level: 84, tags: ["Vector", "RAG"] },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Globe,
    color: "#ec4899",
    description: "Shipping to production — Linux, cloud deployment, monitoring.",
    skills: [
      { name: "Linux (Ubuntu)", level: 89, tags: ["Server", "Bash"] },
      { name: "GCP (Basics)", level: 76, tags: ["Cloud"] },
      { name: "Git / GitHub", level: 93, tags: ["Version Control"] },
      { name: "API Deployment", level: 88, tags: ["Vercel", "Linux"] },
      { name: "Agile / SDLC", level: 90, tags: ["Sprint", "KPIs"] },
    ],
  },
];

export const keyProjects = [
  {
    title: "AI-Based Visitor Management",
    stack: "Python · Django · FaceNet · WebSockets",
    highlight: "500+ daily records",
    description: "Identity verification & access control with real-time camera integration.",
  },
  {
    title: "AI Secure File Management",
    stack: "React · Node.js · MongoDB · Pinecone",
    highlight: "1,000+ doc retrieval",
    description: "Enterprise document platform with vector-based intelligent search.",
  },
  {
    title: "GenAI Chatbot – brihaspathi.com",
    stack: "REST APIs · LLAMA3.2 · Strapi · React",
    highlight: "50+ dynamic pages",
    description: "AI chatbot with real-time contextual responses across business pages.",
  },
  {
    title: "AI Task Management – TMS",
    stack: "Django · Next.js · AI Estimation APIs",
    highlight: "35% efficiency boost",
    description: "Workflow automation with AI-powered effort estimation.",
  },
  {
    title: "SheetPilot – Sheets-to-API",
    stack: "Node.js · Express · Google Sheets API",
    highlight: "60% less manual work",
    description: "Converts Google Sheets into live RESTful APIs.",
  },
  {
    title: "Full-Stack Platforms (4 Apps)",
    stack: "Next.js · React · Strapi CMS · MongoDB",
    highlight: "4 production apps",
    description: "End-to-end scalable web apps with dashboards & CMS.",
  },
];

export const achievements = [
  {
    title: "Exemplary Award 2024",
    body: "Honored with the Exemplary Award by Brihaspathi for technical excellence, outstanding engineering leadership, and delivering enterprise full-stack AI platforms.",
  },
  {
    title: "District Collector Award",
    body: "AP State Elections — District Coordinator, West Godavari. Led AI surveillance, ANPR, and real-time analytics.",
  },
  {
    title: "Head District Coordinator",
    body: "AP MLC Elections, Visakhapatnam — Directed the Central Monitoring Hall for statewide live VMS analytics.",
  },
  {
    title: "NEET Exam Surveillance",
    body: "AI video-analytics solution for anomaly detection — selected for institutional deployment.",
  },
];

export const tools = [
  "Ubuntu", "Git", "Postman", "OpenAI", "ChromaDB", "Pinecone",
  "Supabase", "GCP", "Strapi CMS", "Framer Motion", "Vite",
  "LLAMA3.2", "FaceNet", "FastAPI", "Flask",
];

export function getAllTags() {
  const tags = new Set<string>();
  skillCategories.forEach((cat) =>
    cat.skills.forEach((s) => s.tags.forEach((t) => tags.add(t)))
  );
  return Array.from(tags).sort();
}
