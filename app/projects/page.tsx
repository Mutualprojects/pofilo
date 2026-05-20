"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { motion, AnimatePresence } from "framer-motion";
import { HoverFooter } from "@/components/HoverFooter";
import { gsap } from "gsap";
import {
  X, Brain, Globe, Shield, Server, Code2, Database,
  Cpu, Layers, ChevronRight, ArrowUpRight, Activity,
  GitBranch, Filter, Search, Zap, Eye, BarChart3,
  CheckCircle, Clock, Users, Star, ExternalLink,
  Camera, FileText, MessageSquare, LayoutDashboard,
  Workflow, MonitorPlay, ShieldCheck, Rocket, Terminal,
  Sun
} from "lucide-react";

const COLOR_MAP = {
  amber: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", dot: "bg-amber-500", badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20", dot: "bg-blue-500", badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  red: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20", dot: "bg-red-500", badge: "bg-red-500/15 text-red-600 dark:text-red-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20", dot: "bg-purple-500", badge: "bg-purple-500/15 text-purple-600 dark:text-purple-400" },
  green: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20", dot: "bg-emerald-500", badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-500", border: "border-teal-500/20", dot: "bg-teal-500", badge: "bg-teal-500/15 text-teal-600 dark:text-teal-400" },
} as const;

const STATUS_COLORS = {
  Production: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  Live: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  Deployed: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Presented: "bg-purple-500/10 text-purple-600 border border-purple-500/20",
} as const;

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  status: keyof typeof STATUS_COLORS;
  year: string;
  icon: React.ComponentType<any>;
  color: keyof typeof COLOR_MAP;
  tech: string[];
  impact: string[];
  desc: string;
  image?: string;
  details: {
    metrics: { label: string; value: string }[];
    flow: { step: string; desc: string }[];
    highlights: string[];
  };
}

interface ProjectDrawerProps {
  project: Project;
  onClose: () => void;
}

const CATEGORIES = ["All", "AI & ML", "GovTech", "SaaS & APIs", "Web Platforms", "Computer Vision"];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Secure File Management",
    subtitle: "Enterprise Document Intelligence",
    category: "AI & ML",
    status: "Production",
    year: "2024",
    icon: FileText,
    color: "amber",
    tech: ["Next.js", "Django", "ChromaDB", "Pinecone", "OCR", "OpenAI"],
    impact: ["1,000+ documents indexed", "< 45ms search latency", "98.4% semantic accuracy"],
    desc: "Enterprise-grade intelligent file repository featuring cutting-edge OCR document extraction and vector database synergy. Empowers organizations with semantic search capabilities across thousands of classified documents ensuring rapid and precise information retrieval.",
    details: {
      metrics: [
        { label: "Search Latency", value: "< 45ms" },
        { label: "Semantic Accuracy", value: "98.4%" },
        { label: "Index Rate", value: "100 docs/min" },
        { label: "Docs Indexed", value: "1,000+" },
      ],
      flow: [
        { step: "Upload", desc: "User uploads PDF/DOCX via Next.js client with chunked uploading for fault tolerance." },
        { step: "OCR Parse", desc: "Django backend extracts raw textual data using Tesseract/Pytesseract." },
        { step: "Vectorize", desc: "Text is embedded via OpenAI embeddings API for semantic representation." },
        { step: "Index & Search", desc: "Vectors stored in Pinecone/ChromaDB for lightning-fast semantic lookups." },
      ],
      highlights: [
        "Multi-tenant architecture with metadata filtering for scope protection",
        "Hybrid BM25 keyword + dense vector similarity search",
        "Resumable upload pipeline via PostgreSQL transaction tracking",
        "Intelligent chunking strategies for optimal embedding quality",
      ],
    },
  },
  {
    id: 2,
    title: "Cognitive Visitor Management",
    subtitle: "AI Facial Recognition System",
    category: "Computer Vision",
    status: "Production",
    year: "2024",
    icon: Camera,
    color: "blue",
    tech: ["React.js", "Django", "FastAPI", "FaceNet", "PostgreSQL", "WebSockets"],
    impact: ["500+ daily visitors", "< 120ms match time", "99.1% recognition rate"],
    desc: "Next-generation visitor management ecosystem fortified with state-of-the-art facial recognition technology. Seamlessly orchestrates automated access workflows, processes live hardware camera streams, and provides dynamic real-time administrative monitoring.",
    details: {
      metrics: [
        { label: "Match Time", value: "< 120ms" },
        { label: "Recognition Rate", value: "99.1%" },
        { label: "Daily Visitors", value: "500+" },
        { label: "Concurrent Feeds", value: "Up to 8" },
      ],
      flow: [
        { step: "Video Capture", desc: "Real-time webcam feeds captured and processed frame-by-frame at 30 FPS." },
        { step: "Face Detection", desc: "MTCNN/Haar Cascade algorithms localize face regions with sub-100ms latency." },
        { step: "Feature Extract", desc: "FaceNet neural network extracts a robust 128-dim feature vector per face." },
        { step: "Identity Match", desc: "Vector similarity search matches detected faces against PostgreSQL registry." },
      ],
      highlights: [
        "Anti-spoofing detection identifying live faces vs static images",
        "Sub-second alert pipeline via WebSockets for administrator alerts",
        "Optimized PostgreSQL vector similarity for instant matching at scale",
        "Audit trail logging all access attempts for compliance and security",
      ],
    },
  },
  {
    id: 3,
    title: "GovTech Surveillance Network",
    subtitle: "Electoral Monitoring Infrastructure",
    category: "GovTech",
    status: "Deployed",
    year: "2024",
    icon: MonitorPlay,
    color: "red",
    tech: ["Node.js", "WebSockets", "RTSP", "YOLOv8", "FFmpeg", "OpenCV"],
    impact: ["100+ camera nodes", "7 constituencies", "District Collector Award"],
    desc: "High-stakes government surveillance infrastructure utilized for electoral monitoring. Successfully integrated live RTSP telemetry, ANPR vehicle tracking, and centralized AI-driven command dashboards to ensure uncompromising situational awareness.",
    details: {
      metrics: [
        { label: "Frame Rate", value: "30 FPS" },
        { label: "Object Match Rate", value: "96.5%" },
        { label: "Camera Nodes", value: "100+" },
        { label: "Constituencies", value: "7" },
      ],
      flow: [
        { step: "Transcode", desc: "RTSP camera feeds transcoded via FFmpeg into HTTP-compatible streams." },
        { step: "AI Inference", desc: "YOLOv8 models on edge devices identify vehicles, plates, and persons." },
        { step: "Event Hub", desc: "Detected events aggregated to a central Node.js event broker." },
        { step: "Alert Dashboard", desc: "Live feeds, heat maps, and actionable alerts displayed to operators." },
      ],
      highlights: [
        "Handles 100+ concurrent camera feeds with load-balanced Node.js cluster",
        "Automated License Plate Recognition (ANPR) via Tesseract + OpenCV",
        "Geo-spatial heat mapping and real-time pattern analysis",
        "99.9% uptime with redundant failover for critical deployments",
      ],
    },
  },
  {
    id: 4,
    title: "GenAI Conversational Platform",
    subtitle: "Enterprise AI Chatbot Framework",
    category: "AI & ML",
    status: "Production",
    year: "2024",
    icon: MessageSquare,
    color: "purple",
    tech: ["Next.js", "OpenAI GPT-4o", "Strapi CMS", "SSE", "Node.js"],
    impact: ["50+ content pages", "< 1.2s response", "128k token context"],
    desc: "Highly adaptive AI-powered conversational agent framework deployed across enterprise touchpoints. Provides context-aware interactions, maintains seamless CMS synchronicity, and automates intelligent customer engagement workflows.",
    details: {
      metrics: [
        { label: "Response Delay", value: "< 1.2s" },
        { label: "Token Efficiency", value: "+35%" },
        { label: "Context Window", value: "128k" },
        { label: "Content Pages", value: "50+" },
      ],
      flow: [
        { step: "Stream Input", desc: "User queries streamed word-by-word via Server-Sent Events (SSE)." },
        { step: "Prompt Engineer", desc: "System injects context from Strapi CMS, prompts, and conversation history." },
        { step: "LLM Process", desc: "GPT-4o generates intelligent responses with fine-tuned instructions." },
        { step: "Markdown Render", desc: "Client renders rich markdown, code blocks, and interactive elements live." },
      ],
      highlights: [
        "Prompt caching reducing token costs by 35% for repeated patterns",
        "Strapi CMS integration for non-technical teams to update system prompts",
        "Comprehensive telemetry tracking user intents and topic performance",
        "Streaming architecture providing perceived responsiveness for long content",
      ],
    },
  },
  {
    id: 5,
    title: "SheetPilot SaaS Platform",
    subtitle: "Sheets-to-REST API Engine",
    category: "SaaS & APIs",
    status: "Production",
    year: "2024",
    icon: Zap,
    color: "green",
    tech: ["Node.js", "Express.js", "Google Sheets API", "Redis", "OAuth 2.0"],
    impact: ["60% less manual work", "< 18ms API latency", "99.95% uptime"],
    desc: "Robust SaaS solution that transforms traditional Google Sheets into dynamic live RESTful APIs. Engineered for massive scale with automated CRUD generation, sophisticated Redis caching, and rigorous authentication protocols.",
    image: "/projects/Screenshot 2026-05-19 115110.png",
    details: {
      metrics: [
        { label: "API Latency", value: "< 18ms" },
        { label: "Sync Frequency", value: "Real-time" },
        { label: "Uptime", value: "99.95%" },
        { label: "Manual Work Cut", value: "60%" },
      ],
      flow: [
        { step: "Sheet Connect", desc: "Developers connect Google Sheets via secure OAuth 2.0 with granular scoping." },
        { step: "Schema Parse", desc: "Node.js auto-scans column headers to generate fully-typed REST endpoints." },
        { step: "Cache Layer", desc: "Redis caches API data with intelligent invalidation for sub-ms lookups." },
        { step: "Endpoint Deploy", desc: "Auto-generated CRUD routes available immediately, zero configuration." },
      ],
      highlights: [
        "Advanced rate limiting and API key governance for multiple dev tiers",
        "Webhook system triggering auto-regeneration on sheet modifications",
        "Optimized Redis structures supporting complex queries and aggregations",
        "Developer dashboard with analytics and real-time performance monitoring",
      ],
    },
  },
  {
    id: 6,
    title: "Omega AI Task Platform",
    subtitle: "Intelligent Workflow Automation",
    category: "SaaS & APIs",
    status: "Production",
    year: "2024",
    icon: Workflow,
    color: "teal",
    tech: ["React.js", "Node.js", "ML Pipeline", "Zustand", "Slack API", "Discord"],
    impact: ["35% efficiency gain", "< 8% estimate error", "Slack/Discord integrated"],
    desc: "Advanced AI-augmented task management paradigm integrating automated effort forecasting and sophisticated workflow orchestrations. Features immersive real-time productivity dashboards deployed at tms.brihaspathi.com.",
    image: "/projects/Screenshot 2026-05-19 115143.png",
    details: {
      metrics: [
        { label: "Estimation Error", value: "< 8%" },
        { label: "Efficiency Gain", value: "35%" },
        { label: "Render Lag", value: "< 12ms" },
        { label: "Integrations", value: "Slack + Discord" },
      ],
      flow: [
        { step: "Task Creation", desc: "Engineers log detailed tickets with descriptions, criteria, and dependencies." },
        { step: "ML Estimation", desc: "ML pipeline analyzes historical velocity to suggest accurate time estimates." },
        { step: "Dependency Graph", desc: "System auto-generates task graphs and calculates critical paths." },
        { step: "Live Boards", desc: "Interactive Kanban boards with drag-and-drop and instant state updates." },
      ],
      highlights: [
        "Gantt chart rendering with algorithmic critical-path highlighting",
        "Slack/Discord webhooks notifying teams of blockers and milestones",
        "Zustand state management for lightning-fast UI responsiveness",
        "Burndown chart analytics with predictive sprint forecasting",
      ],
    },
  },
  {
    id: 7,
    title: "Trinai.ai Platform",
    subtitle: "Dynamic AI Brand Website",
    category: "Web Platforms",
    status: "Live",
    year: "2024",
    icon: Globe,
    color: "amber",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "SEO"],
    impact: ["SEO Optimized", "Mobile First", "Production Deployed"],
    desc: "Dynamic and responsive brand platform for Trinai.ai built with React and Tailwind CSS. Features backend RESTful APIs with MongoDB for data persistence, full SEO optimization, and maintained production uptime.",
    image: "/projects/Screenshot 2026-05-19 114913.png",
    details: {
      metrics: [
        { label: "Lighthouse Score", value: "95+" },
        { label: "Mobile Score", value: "100%" },
        { label: "Load Time", value: "< 1.5s" },
        { label: "SEO Rank", value: "Optimized" },
      ],
      flow: [
        { step: "Design System", desc: "Responsive UI built with React and Tailwind CSS component architecture." },
        { step: "API Layer", desc: "RESTful APIs developed in Node.js connected to MongoDB for persistence." },
        { step: "SEO Pipeline", desc: "Meta tags, structured data, and performance optimization implemented." },
        { step: "Deployment", desc: "Production deployment with uptime monitoring and performance maintenance." },
      ],
      highlights: [
        "Mobile-first responsive design with Tailwind CSS utility framework",
        "RESTful API architecture with MongoDB for flexible data management",
        "Full SEO optimization including meta tags and structured data",
        "Continuous performance monitoring and proactive maintenance",
      ],
    },
  },
  {
    id: 8,
    title: "Akshara Degree College Portal",
    subtitle: "Academic Management System",
    category: "Web Platforms",
    status: "Deployed",
    year: "2023",
    icon: LayoutDashboard,
    color: "blue",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
    impact: ["Role-based access", "Real-time attendance", "Admin + Student portals"],
    desc: "Full-stack web application for academic student and admin management using the MERN stack. Implements secure authentication, role-based access, real-time attendance, and performance modules with seamless CRUD integrations.",
    image: "/projects/Screenshot 2026-05-19 114938.png",
    details: {
      metrics: [
        { label: "User Roles", value: "3 Tiers" },
        { label: "Modules", value: "Attendance + Grades" },
        { label: "Auth", value: "JWT Secure" },
        { label: "API Coverage", value: "Full CRUD" },
      ],
      flow: [
        { step: "Auth System", desc: "Secure JWT authentication with role-based access for admins, faculty, students." },
        { step: "Student Module", desc: "Student profiles, attendance tracking, and performance analytics." },
        { step: "Admin Dashboard", desc: "Admin portal for managing users, courses, and institutional workflows." },
        { step: "REST APIs", desc: "Integrated REST APIs with React for seamless CRUD and state management." },
      ],
      highlights: [
        "Role-based access control across three user tiers",
        "Real-time attendance and performance tracking modules",
        "Collaborated with faculty to customize academic workflows",
        "End-to-end testing, deployment, and performance optimization",
      ],
    },
  },
  {
    id: 9,
    title: "Brihaspathi Query Bot",
    subtitle: "LLM-Powered Customer Support",
    category: "AI & ML",
    status: "Live",
    year: "2024",
    icon: Brain,
    color: "purple",
    tech: ["React", "Node.js", "LLAMA 3.2", "Vector Search", "Tailwind CSS"],
    impact: ["LLAMA 3.2 powered", "Dynamic routing", "Mobile-first UI"],
    desc: "Interactive chat interface supporting customer inquiries powered by LLAMA 3.2 and vector-based semantic search. Enables dynamic redirection to forms and quotation flows, featuring a user-friendly mobile-first layout.",
    details: {
      metrics: [
        { label: "LLM Engine", value: "LLAMA 3.2" },
        { label: "Search Type", value: "Vector Semantic" },
        { label: "Routing", value: "Dynamic Forms" },
        { label: "Layout", value: "Mobile-First" },
      ],
      flow: [
        { step: "Chat Input", desc: "User queries processed through interactive conversational interface." },
        { step: "Vector Search", desc: "Semantic search retrieves relevant context from knowledge base." },
        { step: "LLM Generate", desc: "LLAMA 3.2 generates contextual responses using retrieved context." },
        { step: "Dynamic Route", desc: "Smart routing redirects to forms or quotation flows via React Router." },
      ],
      highlights: [
        "LLAMA 3.2 integration with vector-based knowledge retrieval",
        "Dynamic routing to forms and quotation workflows via React Router",
        "Mobile-first Tailwind CSS layout with accessibility focus",
        "Backend API integration for real-time business context injection",
      ],
    },
  },
  {
    id: 10,
    title: "Multi-Brand Web Ecosystem",
    subtitle: "Brihaspathi · Solar · Skyvolts · Trinai",
    category: "Web Platforms",
    status: "Live",
    year: "2023–2024",
    icon: Layers,
    color: "teal",
    tech: ["Next.js", "React", "Strapi CMS", "Vite", "Tailwind CSS", "PostgreSQL"],
    impact: ["4 production platforms", "1,000+ users served", "CMS-driven content"],
    desc: "Developed and maintained 4 end-to-end scalable web applications across multiple brand verticals. Features dashboards, onboarding flows, and full content management systems with Strapi CMS and responsive design systems.",
    details: {
      metrics: [
        { label: "Platforms", value: "4 Active" },
        { label: "Users Served", value: "1,000+" },
        { label: "CMS Pages", value: "CMS Driven" },
        { label: "Response Time", value: "40% Faster" },
      ],
      flow: [
        { step: "Design System", desc: "Shared component library built with Next.js and Tailwind CSS." },
        { step: "CMS Setup", desc: "Strapi CMS configuration for each brand's content structure and workflows." },
        { step: "Dashboard Build", desc: "Custom dashboards, onboarding flows, and admin interfaces per platform." },
        { step: "Deploy & Monitor", desc: "Linux server deployments with WhatsApp alert monitoring systems." },
      ],
      highlights: [
        "Shared design system across 4 brand identities with unique theming",
        "Strapi CMS enabling non-technical teams to manage all content",
        "40% improvement in application response times post-optimization",
        "Automated WhatsApp alert system for operational reliability monitoring",
      ],
    },
  },
  {
    id: 11,
    title: "NEET Exam Surveillance",
    subtitle: "AI Video Analytics for Government",
    category: "GovTech",
    status: "Presented",
    year: "2024",
    icon: ShieldCheck,
    color: "red",
    tech: ["Python", "YOLOv8", "OpenCV", "FastAPI", "Real-time Analytics"],
    impact: ["Anomaly detection", "Crowd monitoring", "Gov official presentation"],
    desc: "AI-integrated video analytics solution for anomaly detection and crowd monitoring designed for NEET examination security. Presented to government officials and selected for institutional deployment consideration.",
    details: {
      metrics: [
        { label: "Detection Type", value: "Anomaly + Crowd" },
        { label: "Processing", value: "Real-time" },
        { label: "Model", value: "YOLOv8" },
        { label: "Status", value: "Gov Selected" },
      ],
      flow: [
        { step: "Video Ingest", desc: "Live camera feeds from exam halls ingested for real-time analysis." },
        { step: "Object Detect", desc: "YOLOv8 detects persons, anomalous objects, and suspicious behavior." },
        { step: "Crowd Analysis", desc: "Crowd density mapping and movement pattern analysis." },
        { step: "Alert System", desc: "Instant alerts to exam supervisors for detected violations." },
      ],
      highlights: [
        "YOLOv8-based anomaly detection for exam hall security monitoring",
        "Real-time crowd density monitoring and movement tracking",
        "Presented to government officials for institutional consideration",
        "FastAPI backend enabling low-latency real-time video analytics",
      ],
    },
  },
  {
    id: 12,
    title: "AP MLC Elections Command Hub",
    subtitle: "Statewide Central Monitoring Hall",
    category: "GovTech",
    status: "Deployed",
    year: "2024",
    icon: Terminal,
    color: "red",
    tech: ["Node.js", "WebSockets", "RTSP", "AI Analytics", "VMS"],
    impact: ["All constituencies", "Statewide oversight", "Head Coordinator role"],
    desc: "Led the Central Monitoring Hall for AP MLC Elections in Visakhapatnam, overseeing statewide live analytics and VMS-based surveillance across all constituencies. Served as Head District Coordinator with full operational responsibility.",
    details: {
      metrics: [
        { label: "Scope", value: "Statewide" },
        { label: "Role", value: "Head Coordinator" },
        { label: "Surveillance", value: "VMS-Based" },
        { label: "Analytics", value: "Live" },
      ],
      flow: [
        { step: "Command Setup", desc: "Central monitoring hall infrastructure configured for live statewide feeds." },
        { step: "VMS Oversight", desc: "Visitor Management System tracking all election personnel and entries." },
        { step: "Live Analytics", desc: "Real-time dashboards displaying statewide surveillance analytics." },
        { step: "Coordination", desc: "Cross-district coordination and incident response management." },
      ],
      highlights: [
        "Head District Coordinator for Visakhapatnam MLC Elections",
        "Centralized command hall overseeing all constituency surveillance",
        "VMS-based tracking integrated with live AI analytics feeds",
        "Managed real-time statewide monitoring and rapid incident response",
      ],
    },
  },
  {
    id: 13,
    title: "PWD Maharashtra Monitoring Portal",
    subtitle: "Public Works Infrastructure System",
    category: "GovTech",
    status: "Production",
    year: "2024",
    icon: ShieldCheck,
    color: "red",
    tech: ["React.js", "Node.js", "PostgreSQL", "GIS Mapping", "REST APIs", "JWT Auth"],
    impact: ["Statewide tracking", "36+ districts active", "Real-time road progress reports"],
    desc: "Enterprise tracking and monitoring system developed for the Maharashtra Public Works Department. Enables real-time visualization of civil infrastructure projects, road development progress, contractor bidding lifecycles, and automated field report ingestion.",
    details: {
      metrics: [
        { label: "Search Latency", value: "< 25ms" },
        { label: "Active Districts", value: "36+" },
        { label: "Projects Monitored", value: "1,200+" },
        { label: "Uptime", value: "99.9%" },
      ],
      flow: [
        { step: "Authenticate", desc: "Contractors and field engineers log in securely using dual-factor authentication." },
        { step: "Report Ingestion", desc: "Field engineers upload status reports, geo-tagged photos, and construction milestones." },
        { step: "GIS Mapping", desc: "Node.js API processes geo-coordinates and plots them on interactive ArcGIS dashboards." },
        { step: "Central Review", desc: "State officials review progress, verify contractor milestones, and disburse budgets." },
      ],
      highlights: [
        "Developed interactive geo-spatial mapping for statewide project visualization.",
        "Custom JWT role-based access control protecting highly confidential budget documents.",
        "Automated offline data synchronization for remote site reports.",
        "99.9% operational reliability with optimized PostgreSQL queries under heavy load.",
      ],
    },
  },
  {
    id: 14,
    title: "Brihaspathi Technologies Brand Portal",
    subtitle: "Corporate Website & Strapi CMS",
    category: "Web Platforms",
    status: "Live",
    year: "2024",
    icon: Globe,
    color: "blue",
    tech: ["Next.js", "Strapi CMS", "GraphQL", "Tailwind CSS", "SEO Suite", "PostgreSQL"],
    impact: ["100% headless speed", "Strapi CMS integrated", "45% faster loading speed"],
    desc: "Comprehensive headless brand portal developed for Brihaspathi Technologies. Configured with a modular Strapi Content Management System to empower marketing teams, dynamic routing, high-performance static rendering, and extensive search engine optimization.",
    image: "/projects/Screenshot 2026-05-19 114832.png",
    details: {
      metrics: [
        { label: "Lighthouse Score", value: "98/100" },
        { label: "Content Pages", value: "120+" },
        { label: "API Response", value: "< 15ms" },
        { label: "CMS Editors", value: "12+" },
      ],
      flow: [
        { step: "Content Editing", desc: "Non-technical editors input blogs, service updates, and career opportunities inside Strapi." },
        { step: "GraphQL Fetch", desc: "Next.js queries Strapi content dynamically via optimized GraphQL endpoints." },
        { step: "Build Trigger", desc: "Incremental Static Regeneration (ISR) builds changed pages instantly." },
        { step: "Delivery", desc: "Optimized server rendering delivers lightning-fast pages to regional users." },
      ],
      highlights: [
        "Fully decoupled frontend and backend for uncompromising performance and scalability.",
        "Engineered content caching strategies reducing database overhead by 60%.",
        "Extensive schema custom fields supporting infinite page configurations.",
        "Lighthouse performance score elevated to 98% through asset optimization.",
      ],
    },
  },
  {
    id: 15,
    title: "Skyvolts Solar Platform",
    subtitle: "Premium Renewable Brand Website",
    category: "Web Platforms",
    status: "Live",
    year: "2024",
    icon: Zap,
    color: "amber",
    tech: ["React.js", "Next.js", "Vite", "Tailwind CSS", "CRM Integration", "Dynamic Forms"],
    impact: ["Lead Conversion +28%", "High-fidelity solar graphics", "Interactive load calculator"],
    desc: "High-end digital platform for Skyvolts Solar featuring dynamic UI animations, an interactive energy savings calculator, direct CRM integration for instant lead capture, and a highly responsive design tailored for mobile-first visitors.",
    image: "/projects/Screenshot 2026-05-19 114855.png",
    details: {
      metrics: [
        { label: "Load Calculator", value: "Interactive" },
        { label: "Conversion Lift", value: "+ 28%" },
        { label: "Uptime", value: "100%" },
        { label: "Mobile Score", value: "99%" },
      ],
      flow: [
        { step: "Capture", desc: "User interacts with HSL-themed solar product layouts and load estimator forms." },
        { step: "Calculation", desc: "Real-time client calculator evaluates solar power requirements and savings." },
        { step: "Lead Sync", desc: "Form fields are pushed to centralized CRM via secured REST endpoints." },
        { step: "Notify", desc: "Instantly registers customer requirements and schedules direct consultant follow-ups." },
      ],
      highlights: [
        "Built premium custom calculations that output precise solar panel numbers based on monthly bills.",
        "Lead ingestion pipelines integrated with Webhooks for real-time sales team alerts.",
        "Sophisticated glassmorphism components with clean light and dark transitions.",
        "Fully optimized search indexing bringing in organic regional leads.",
      ],
    },
  },
  {
    id: 16,
    title: "AP Solar Onboarding Portal",
    subtitle: "Statewide Renewable Entrepreneurship Hub",
    category: "SaaS & APIs",
    status: "Production",
    year: "2024",
    icon: Rocket,
    color: "green",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "WhatsApp API", "Email Delivery", "State/District Logins"],
    impact: ["Statewide scale", "District-wise stats dashboard", "WhatsApp & Email notifications"],
    desc: "Highly sophisticated statewide onboarding platform for solar entrepreneurs in Andhra Pradesh. Features secure multi-tier logins (State Coordinator, District Coordinator, Entrepreneurs/Students), real-time district statistics dashboards, automated WhatsApp API welcome notifications, and instant entrepreneur welcome emails upon successful registration.",
    image: "/projects/Screenshot 2026-05-19 115016.png",
    details: {
      metrics: [
        { label: "User Tiers", value: "3 Tiers" },
        { label: "Dist. Dashboards", value: "26 Districts" },
        { label: "Welcome Speed", value: "< 1.5s" },
        { label: "Registered", value: "5,000+ Students" },
      ],
      flow: [
        { step: "Coordinator Login", desc: "State and District Coordinators log in to their designated secure monitoring hubs." },
        { step: "Student Registration", desc: "Students register as Solar Entrepreneurs, specifying their district, talent details, and contact numbers." },
        { step: "WhatsApp & Email Ingest", desc: "System automatically triggers a WhatsApp API welcome notification and fires high-fidelity welcome emails." },
        { step: "District Stats Compiles", desc: "Dynamic dashboards display individual district totals and aggregate telemetry for real-time monitoring." },
      ],
      highlights: [
        "Implemented robust multi-tenant role-based permissions (State, District, Student, Entrepreneur).",
        "Fully integrated third-party WhatsApp API pipelines with failover handling.",
        "State coordinator dashboard showing complete district-by-district student registration tallies.",
        "Optimized MongoDB aggregation pipelines to compile stats from 26 districts in sub-10ms.",
      ],
    },
  },
];



function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const { details, color } = project;
  const c = COLOR_MAP[color];
  const Icon = project.icon;

  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Set initial states to prevent FOUC (flash of unstyled content)
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(containerRef.current, { x: "100%" });
    
    // Initial states for inner elements for cascading entrance
    gsap.set([
      ".drawer-banner",
      ".drawer-header",
      ".drawer-desc",
      ".drawer-metric",
      ".drawer-tech-title",
      ".drawer-tech-pill",
      ".drawer-flow-title",
      ".drawer-flow-line",
      ".drawer-flow-item",
      ".drawer-highlight-title",
      ".drawer-highlight-item",
      ".drawer-close-btn"
    ], { opacity: 0, y: 15 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(backdropRef.current, { opacity: 1, duration: 0.35 })
      .to(containerRef.current, { x: "0%", duration: 0.6, ease: "power4.out" }, "-=0.2")
      .to(".drawer-banner", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
      .to(".drawer-header", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
      .to(".drawer-desc", { opacity: 1, y: 0, duration: 0.4 }, "-=0.35")
      .to(".drawer-metric", { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.35")
      .to([".drawer-tech-title", ".drawer-tech-pill"], { opacity: 1, y: 0, duration: 0.4, stagger: 0.03 }, "-=0.3")
      .to(".drawer-flow-title", { opacity: 1, y: 0, duration: 0.3 }, "-=0.3")
      .to(".drawer-flow-line", { height: "100%", opacity: 1, duration: 0.5 }, "-=0.15")
      .to(".drawer-flow-item", { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.3")
      .to(".drawer-highlight-title", { opacity: 1, y: 0, duration: 0.3 }, "-=0.3")
      .to(".drawer-highlight-item", { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.3")
      .to(".drawer-close-btn", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
      defaults: { ease: "power3.in" }
    });

    tl.to([
      ".drawer-close-btn",
      ".drawer-highlight-item",
      ".drawer-highlight-title",
      ".drawer-flow-item",
      ".drawer-flow-line",
      ".drawer-flow-title",
      ".drawer-tech-pill",
      ".drawer-tech-title",
      ".drawer-metric",
      ".drawer-desc",
      ".drawer-header",
      ".drawer-banner"
    ], { opacity: 0, y: -10, duration: 0.15, stagger: 0.02 })
      .to(containerRef.current, { x: "100%", duration: 0.5, ease: "power4.in" }, "-=0.1")
      .to(backdropRef.current, { opacity: 0, duration: 0.25 }, "-=0.3");
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />
      {/* Drawer Container */}
      <div
        ref={containerRef}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800/80 overflow-y-auto shadow-2xl"
      >
        {/* Showcase Image Banner */}
        <div className="relative h-72 w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden border-b border-zinc-200 dark:border-zinc-800/60 shadow-inner drawer-banner">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 relative">
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              <Icon className={`w-16 h-16 opacity-20 ${c.text}`} />
            </div>
          )}
        </div>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8 gap-4 drawer-header">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-7 h-7 ${c.text}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_COLORS[project.status]}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-zinc-400">{project.year}</span>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  {project.title}
                </h2>
                <p className={`text-xs font-bold uppercase tracking-widest ${c.text} mt-0.5`}>
                  {project.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-zinc-500" />
            </button>
          </div>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm mb-8 drawer-desc">
            {project.desc}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {details.metrics.map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 drawer-metric">
                <p className={`text-lg font-black ${c.text}`}>{m.value}</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3 drawer-tech-title">Technology Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${c.bg} ${c.text} border ${c.border} drawer-tech-pill`}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Pipeline Flow */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5 drawer-flow-title">
              <Activity className={`w-4 h-4 ${c.text}`} />
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Pipeline Architecture</p>
            </div>
            <div className="relative pl-6 space-y-6">
              {/* Animated pipeline connector line */}
              <div className={`absolute left-2.5 top-2 w-[2px] bg-zinc-200 dark:bg-zinc-800 bottom-2 drawer-flow-line`} />
              {details.flow.map((f, i) => (
                <div key={i} className="relative drawer-flow-item">
                  <div className={`absolute -left-[28px] top-1.5 w-3 h-3 rounded-full ${c.dot} ring-4 ring-white dark:ring-zinc-950`} />
                  <p className="text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-white">{f.step}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 drawer-highlight-title">
              <GitBranch className={`w-4 h-4 ${c.text}`} />
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Engineering Highlights</p>
            </div>
            <ul className="space-y-3">
              {details.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 drawer-highlight-item">
                  <ChevronRight className={`w-4 h-4 ${c.text} flex-shrink-0 mt-0.5`} />
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{h}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Close */}
          <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 drawer-close-btn">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Close Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const c = COLOR_MAP[project.color];
  const Icon = project.icon;

  const cardRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const flare = flareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    // Smooth tilt calculations
    const angleX = -(y - yc) / 18;
    const angleY = (x - xc) / 18;

    gsap.to(card, {
      rotateX: angleX,
      rotateY: angleY,
      scale: 1.015,
      z: 10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
      duration: 0.25,
      ease: "power2.out",
    });

    if (flare) {
      gsap.to(flare, {
        x: x - 40,
        y: y - 40,
        opacity: 0.15,
        duration: 0.2,
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const flare = flareRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      z: 0,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      duration: 0.45,
      ease: "power3.out",
    });

    if (flare) {
      gsap.to(flare, {
        opacity: 0,
        duration: 0.35,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group relative rounded-3xl border border-zinc-200/80 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 overflow-hidden cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-colors duration-300"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${c.dot}`} />

      {/* Glossy spotlight flare */}
      <div
        ref={flareRef}
        className="absolute pointer-events-none rounded-full w-20 h-20 bg-amber-400 dark:bg-white blur-xl opacity-0 z-20 mix-blend-overlay"
        style={{ left: 0, top: 0 }}
      />

      {/* Project Image Banner */}
      <div 
        className="relative h-44 w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden border-b border-zinc-200 dark:border-zinc-800/60"
        style={{ transform: "translateZ(20px)" }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 relative">
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <Icon className={`w-12 h-12 opacity-20 ${c.text}`} />
          </div>
        )}
      </div>

      <div className="p-7" style={{ transform: "translateZ(30px)" }}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-350`}>
            <Icon className={`w-6 h-6 ${c.text}`} />
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${STATUS_COLORS[project.status]}`}>
              {project.status}
            </span>
            <span className="text-[10px] text-zinc-400 font-semibold">{project.year}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors mb-1">
          {project.title}
        </h3>
        <p className={`text-[10px] font-bold uppercase tracking-widest ${c.text} mb-4`}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-5">
          {project.desc}
        </p>

        {/* Impact pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.impact.map((imp, i) => (
            <span key={i} className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${c.badge} border ${c.border}`}>
              {imp}
            </span>
          ))}
        </div>

        {/* Tech list */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
          <span>Examine Architecture</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Hero Entrance Timeline
    const ctx = gsap.context(() => {
      // Set initial values to prevent flash of unstyled content
      gsap.set(".hero-badge", { opacity: 0, y: 15 });
      gsap.set(".hero-title", { opacity: 0, y: 30 });
      gsap.set(".hero-desc", { opacity: 0, y: 20 });
      gsap.set(".hero-stat-card", { opacity: 0, scale: 0.9, y: 20 });
      gsap.set(".filter-section", { opacity: 0, y: 15 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-badge", { opacity: 1, y: 0, duration: 0.55 })
        .to(".hero-title", { opacity: 1, y: 0, duration: 0.75 }, "-=0.35")
        .to(".hero-desc", { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
        .to(".hero-stat-card", {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "back.out(1.15)"
        }, "-=0.4")
        .to(".filter-section", { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const filtered = PROJECTS.filter(p => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const stats = {
    total: PROJECTS.length,
    production: PROJECTS.filter(p => p.status === "Production" || p.status === "Live").length,
    aiPowered: PROJECTS.filter(p => p.category === "AI & ML" || p.category === "Computer Vision").length,
    govtech: PROJECTS.filter(p => p.category === "GovTech").length,
  };

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} dark={isDark} setDark={toggleTheme} />
      
      <div 
        ref={heroRef}
        className="min-h-screen bg-[#f5f1e8] dark:bg-[#0c0c0c] text-zinc-900 dark:text-[#f5f1e8] transition-colors duration-500 pt-20"
      >

      {/* Hero */}
      <section className="relative border-b border-zinc-200 dark:border-zinc-800/60 pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[20%] w-[500px] h-[300px] rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute bottom-0 left-[10%] w-[400px] h-[200px] rounded-full bg-purple-500/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-4 hero-badge">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-amber-500">
              Full Portfolio Registry
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 hero-title">
            All Projects <br />
            <span className="text-zinc-400 dark:text-zinc-600">& Deployments</span>
          </h1>
          <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 text-base leading-relaxed hero-desc">
            A comprehensive catalogue of {PROJECTS.length} engineered systems spanning AI/ML platforms, government surveillance infrastructure, SaaS APIs, and full-stack web ecosystems — built and deployed at Brihaspathi Technologies.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { label: "Total Projects", value: stats.total, icon: Layers },
              { label: "In Production", value: stats.production, icon: Rocket },
              { label: "AI-Powered", value: stats.aiPowered, icon: Brain },
              { label: "GovTech", value: stats.govtech, icon: ShieldCheck },
            ].map((s, i) => {
              const SIcon = s.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hero-stat-card">
                  <SIcon className="w-5 h-5 text-amber-500 mb-3" />
                  <p className="text-3xl font-black text-zinc-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/60 py-4 filter-section">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 w-56"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-200 ${selectedCategory === cat
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 scale-105"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-amber-500/30"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ml-auto text-xs text-zinc-400 font-semibold flex-shrink-0">
            {filtered.length} / {PROJECTS.length} projects
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-400 text-sm">No projects match your filter.</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <ProjectCard
                    project={project}
                    onClick={setActiveProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Category legend */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-5">Project Categories</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { cat: "AI & ML", count: PROJECTS.filter(p => p.category === "AI & ML").length, color: "text-purple-500", desc: "Conversational AI, LLM integrations, vector search" },
              { cat: "Computer Vision", count: PROJECTS.filter(p => p.category === "Computer Vision").length, color: "text-blue-500", desc: "Facial recognition, real-time video analytics" },
              { cat: "GovTech", count: PROJECTS.filter(p => p.category === "GovTech").length, color: "text-red-500", desc: "Electoral surveillance, ANPR, government deployments" },
              { cat: "SaaS & APIs", count: PROJECTS.filter(p => p.category === "SaaS & APIs").length, color: "text-emerald-500", desc: "Platform products, REST APIs, workflow automation" },
              { cat: "Web Platforms", count: PROJECTS.filter(p => p.category === "Web Platforms").length, color: "text-teal-500", desc: "Full-stack web apps, CMS, multi-brand ecosystems" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                onClick={() => setSelectedCategory(item.cat)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-black uppercase tracking-tight ${item.color}`}>{item.cat}</span>
                  <span className="text-xs font-black text-zinc-400">{item.count}</span>
                </div>
                <p className="text-xs text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HoverFooter />

      {/* Drawer */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDrawer project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
      </div>
    </>
  );
}