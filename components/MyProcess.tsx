"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { ReactLenis } from 'lenis/react';
import {
  Sparkles,
  Zap,
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  Database,
  MonitorPlay,
  Settings,
  GitBranch,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── TYPE DEFINITIONS ────────────────────────────────────────────────────────

interface Metric {
  label: string;
  value: string;
}

interface ProcessStep {
  id: number;
  phase: string;
  title: string;
  description: string;
  detailedPoints: string[];
  icon: React.ComponentType<{ className?: string }>;
  techTags: string[];
  metrics?: Metric;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CAREER_PROCESS: ProcessStep[] = [
  {
    id: 1,
    phase: "01 — Genesis",
    title: "Career Transition",
    description:
      "Pivoted from Mechanical Engineering to Software Development, channelling thermodynamics logic and systems thinking directly into scalable code architecture.",
    detailedPoints: [
      "Mapped robust analytical and physics-based reasoning onto CS paradigms and data structures",
      "Committed to 200+ coding challenges over 6 months to master algorithms from the ground up",
      "Reframed thermodynamic system models as programmatic architecture—heat flow became data flow",
    ],
    icon: Zap,
    techTags: ["Problem Solving", "System Dynamics", "Logic Modeling", "Algorithms"],
    metrics: { label: "Transition Speed", value: "Sub-1 Year" },
  },
  {
    id: 2,
    phase: "02 — Acquisition",
    title: "Full-Stack Core Mastery",
    description:
      "Deep-dived into real-world project development across JavaScript, React.js, Node.js, and Python—building production-ready platforms from day one.",
    detailedPoints: [
      "Mastered Modern JavaScript ES6+, React state synchronization, and DOM performance optimisation",
      "Engineered backend routes and relational schema designs with Node.js, Express, and PostgreSQL",
      "Shipped 3 full-stack web platforms to production, translating theory into measurable outcomes",
    ],
    icon: BookOpen,
    techTags: ["JavaScript", "React.js", "Node.js", "Python", "PostgreSQL", "REST"],
    metrics: { label: "Languages Mastered", value: "10+" },
  },
  {
    id: 3,
    phase: "03 — Launch",
    title: "Brihaspathi Technologies",
    description:
      "Joined Brihaspathi Technologies as a Junior Developer, immediately taking ownership of enterprise-grade features within high-stakes product squads.",
    detailedPoints: [
      "Integrated with senior squads to deliver critical database layer upgrades on tight deadlines",
      "Participated in daily standups, sprint planning, and code reviews within an Agile Scrum team",
      "Refactored legacy frontend components, reducing load time by 40% and improving maintainability",
    ],
    icon: Briefcase,
    techTags: ["Enterprise Apps", "Agile Scrum", "Git Workflow", "Code Review"],
    metrics: { label: "First Role Grade", value: "Enterprise" },
  },
  {
    id: 4,
    phase: "04 — Expansion",
    title: "Scalable Full-Stack Engineering",
    description:
      "Designed robust, highly scalable systems using the complete MERN Stack, Django backends, and modular REST APIs serving thousands of concurrent users.",
    detailedPoints: [
      "Crafted resilient state-management patterns in complex multi-dashboard React applications",
      "Engineered high-performance Django web portals with multi-tenant scope and role-based access",
      "Integrated REST API endpoints with consistent serialization schemas and automated documentation",
    ],
    icon: Code2,
    techTags: ["MERN Stack", "Django", "REST APIs", "Express.js", "MongoDB"],
    metrics: { label: "API Response Time", value: "< 80ms" },
  },
  {
    id: 5,
    phase: "05 — Cognition",
    title: "AI Integration & Automation",
    description:
      "Pioneered autonomous AI solutions—facial recognition VMS, GenAI streaming chatbots, and enterprise task automation pipelines that saved 30+ hours weekly.",
    detailedPoints: [
      "Integrated FaceNet biometric embeddings for sub-second security gate identification at scale",
      "Architected generative AI streaming pipelines via server-sent events with live token rendering",
      "Automated complex cron-based data pipelines processing 50k+ records nightly without intervention",
    ],
    icon: Cpu,
    techTags: ["FaceNet", "GenAI Chatbots", "SSE Streaming", "Cron Automation", "OpenAI API"],
    metrics: { label: "Weekly Hours Saved", value: "30+" },
  },
  {
    id: 6,
    phase: "06 — Data Depth",
    title: "Vector DBs & Document OCR",
    description:
      "Built semantic vector search clusters and advanced multi-lingual text extraction pipelines using ChromaDB, Pinecone, and Tesseract OCR at enterprise scale.",
    detailedPoints: [
      "Configured high-density text embeddings stored in Pinecone and ChromaDB for retrieval-augmented generation",
      "Engineered resilient multi-lingual document parsing tools via Tesseract with pre-processing pipelines",
      "Implemented hybrid lexical-semantic search systems for classified document archives",
    ],
    icon: Database,
    techTags: ["Pinecone", "ChromaDB", "RAG", "Tesseract OCR", "Embeddings"],
    metrics: { label: "Search Precision", value: "98.4%" },
  },
  {
    id: 7,
    phase: "07 — Civic Impact",
    title: "GovTech AI Surveillance",
    description:
      "Commanded live telemetry surveillance platforms and AI-powered vehicle tracking systems for high-stakes AP State Government election operations.",
    detailedPoints: [
      "Engineered video telemetry integrations managing 100+ live feeds for AP State Election Command halls",
      "Integrated custom YOLOv8 object detection pipelines for real-time ANPR license plate recognition",
      "Built centralised dashboards reviewed by senior cabinet executives during live election operations",
    ],
    icon: MonitorPlay,
    techTags: ["YOLOv8", "ANPR", "Live Telemetry", "GovTech", "OpenCV"],
    metrics: { label: "Live Camera Nodes", value: "100+" },
  },
  {
    id: 8,
    phase: "08 — Execution",
    title: "Agile QA & Production Stability",
    description:
      "Drove product stability through comprehensive Agile QA, continuous API health monitoring, and proactive production support—maintaining 99.9% uptime.",
    detailedPoints: [
      "Authored complete test automation suites for both frontend React components and backend API endpoints",
      "Led code review cycles, memory profiling sessions, and regression debugging under production pressure",
      "Maintained 99.9% uptime SLAs across core client products during peak concurrent load periods",
    ],
    icon: Settings,
    techTags: ["Jest", "Pytest", "CI/CD", "Unit Testing", "Performance Profiling"],
    metrics: { label: "Production Uptime", value: "99.9%" },
  },
  {
    id: 9,
    phase: "09 — Evolution",
    title: "Cloud Architecture & DevOps",
    description:
      "Continuously scaling expertise across microservices, Kubernetes orchestration, and serverless cloud deployments for high-traffic, globally distributed systems.",
    detailedPoints: [
      "Optimising load-balanced Kubernetes and Docker node clusters for high-concurrency traffic routing",
      "Integrating AWS Lambda and Vercel Edge serverless architectures for cost-efficient auto-scaling",
      "Refactoring monolith services into decoupled microservice architectures with independent CI/CD pipelines",
    ],
    icon: GitBranch,
    techTags: ["Kubernetes", "Docker", "AWS Lambda", "Vercel Edge", "Microservices"],
    metrics: { label: "Edge Node Latency", value: "< 45ms" },
  },
  {
    id: 10,
    phase: "10 — Horizon",
    title: "World-Class Product Engineering",
    description:
      "Ready to bring battle-tested technical depth, AI-first thinking, and relentless execution focus to ambitious global product teams building systems that matter.",
    detailedPoints: [
      "Energised to solve core product scaling challenges alongside high-calibre engineering squads",
      "Focused on building systems with real-world impact—platforms that meaningfully serve millions",
      "Bringing full technical presence, ownership mentality, and zero-compromise delivery standards",
    ],
    icon: Rocket,
    techTags: ["Product Engineering", "Technical Leadership", "AI Systems", "Global Scale"],
    metrics: { label: "Status", value: "Launch Ready" },
  },
];

// ─── STEP VISUAL COMPONENTS ───────────────────────────────────────────────────

const ZapVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-orange-400/80"
          style={{
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{
            duration: 2 + (i % 3) * 0.5,
            repeat: Infinity,
            delay: i * 0.35,
          }}
        />
      ))}
    </div>
    <motion.div
      animate={{ scale: [0.95, 1.08, 0.95] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 w-20 h-20 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.2)]"
    >
      <Zap className="w-9 h-9 text-orange-500" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
        <ArrowRight className="w-2.5 h-2.5 text-white" />
      </div>
    </motion.div>
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      MECH → SOFTWARE
    </p>
  </div>
);

const BookVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute top-6 inset-x-0 flex justify-center gap-3 pointer-events-none">
      {["JS", "React", "Node", "PY"].map((t, i) => (
        <motion.span
          key={t}
          className="text-[8px] font-black uppercase text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/25"
          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.55 }}
        >
          {t}
        </motion.span>
      ))}
    </div>
    <motion.div
      animate={{ rotateY: [0, 12, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ perspective: "500px" }}
      className="w-20 h-20 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.18)]"
    >
      <BookOpen className="w-9 h-9 text-orange-500" />
    </motion.div>
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      FULL STACK MASTERY
    </p>
  </div>
);

const BriefcaseVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      className="absolute w-28 h-18 rounded-xl border border-orange-500/20 bg-orange-500/8 flex items-center justify-center gap-2 p-3"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {["", "", ""].map((_, i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: i === 0 ? "#ea580c" : i === 1 ? "rgba(234,88,12,0.5)" : "rgba(234,88,12,0.25)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </motion.div>
    <motion.div
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 border border-orange-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(234,88,12,0.15)]"
    >
      <Briefcase className="w-9 h-9 text-orange-500" />
    </motion.div>
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      ENTERPRISE GRADE
    </p>
  </div>
);

const CodeVisual = () => {
  const [activeLine, setActiveLine] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveLine((p) => (p + 1) % 4), 1600);
    return () => clearInterval(timer);
  }, []);
  const lines = [
    { prefix: "$ ", text: "npm run build --prod", color: "text-orange-400" },
    { prefix: "✓ ", text: "compiled in 1.1s", color: "text-green-400" },
    { prefix: "→ ", text: "GET /api/v2/data 200", color: "text-zinc-300" },
    { prefix: "✓ ", text: "DB connected · 12ms", color: "text-orange-300" },
  ];
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-3">
      <div className="w-full max-w-[260px] rounded-xl bg-zinc-950 border border-zinc-800 p-3 shadow-2xl">
        <div className="flex gap-1.5 mb-2.5">
          {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((c, i) => (
            <span key={i} className={cn("w-2 h-2 rounded-full", c)} />
          ))}
        </div>
        <div className="space-y-1.5 font-mono text-[9px] leading-relaxed">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              className={cn("flex gap-1", i <= activeLine ? l.color : "text-zinc-700")}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: i <= activeLine ? 1 : 0.2, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-zinc-500 select-none">{l.prefix}</span>
              <span>{l.text}</span>
            </motion.div>
          ))}
          <motion.span
            className="inline-block w-1.5 h-3 bg-orange-500 ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>
      <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
        MERN · DJANGO · REST
      </p>
    </div>
  );
};

const CpuVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {[48, 64, 80].map((size, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-orange-500/20"
        style={{ width: size, height: size }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
      />
    ))}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      className="absolute w-20 h-20 rounded-full border border-dashed border-orange-500/20"
    />
    <motion.div
      animate={{ scale: [0.95, 1.06, 0.95] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="relative z-10 w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(234,88,12,0.25)]"
    >
      <Cpu className="w-8 h-8 text-orange-500" />
    </motion.div>
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      AI · AUTOMATION
    </p>
  </div>
);

const DatabaseVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="flex flex-col gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="relative w-16 h-5 rounded-lg border border-orange-500/25 bg-orange-500/8 overflow-hidden flex items-center justify-center"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
        >
          <motion.div
            className="absolute inset-y-0 w-1 bg-orange-400/60 blur-[2px]"
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          />
          <Database className="w-3 h-3 text-orange-400 relative z-10" />
        </motion.div>
      ))}
    </div>
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      VECTOR · OCR · RAG
    </p>
  </div>
);

const MonitorVisual = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-3">
    <div className="w-full max-w-[240px] aspect-video rounded-xl bg-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl">
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-orange-500/70 shadow-[0_0_6px_rgba(234,88,12,0.9)]"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute top-2 left-2.5 flex items-center gap-1.5 z-10">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="font-mono text-[7px] text-orange-400 font-bold uppercase tracking-wider">
          LIVE · CAM_07
        </span>
      </div>
      <motion.div
        className="absolute border border-orange-400 rounded"
        style={{ width: 40, height: 40 }}
        animate={{
          left: ["12%", "52%", "32%", "12%"],
          top: ["18%", "32%", "48%", "18%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute top-0.5 left-0.5 text-[5px] text-orange-300 font-black bg-black/70 px-0.5 rounded leading-none">
          MATCH
        </span>
      </motion.div>
      <MonitorPlay className="absolute bottom-2 right-2 w-8 h-8 text-orange-900/40" />
    </div>
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      GOV TELEMETRY · 100+ FEEDS
    </p>
  </div>
);

const SettingsVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute"
      style={{ top: "22%", left: "22%" }}
    >
      <Settings className="w-11 h-11 text-orange-500/70" />
    </motion.div>
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      className="absolute"
      style={{ bottom: "22%", right: "22%" }}
    >
      <Settings className="w-7 h-7 text-orange-400/50" />
    </motion.div>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      className="absolute"
      style={{ top: "30%", right: "28%" }}
    >
      <Settings className="w-4 h-4 text-orange-300/40" />
    </motion.div>
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      QA · 99.9% UPTIME
    </p>
  </div>
);

const GitVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg className="absolute w-3/4 h-1/2" viewBox="0 0 160 60" fill="none">
      <line x1="20" y1="30" x2="140" y2="30" stroke="rgba(234,88,12,0.15)" strokeWidth="1.5" />
      <path
        d="M 40 30 C 60 30, 60 10, 80 10 C 100 10, 100 30, 120 30"
        stroke="rgba(234,88,12,0.35)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
    </svg>
    {[
      { x: "12%", y: "calc(50% - 6px)", delay: 0 },
      { x: "calc(50% - 6px)", y: "18%", delay: 0.5 },
      { x: "80%", y: "calc(50% - 6px)", delay: 1 },
    ].map((pos, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-orange-500 border-2 border-white dark:border-zinc-950"
        style={{ left: pos.x, top: pos.y }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, delay: pos.delay }}
      />
    ))}
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      MICROSERVICES · DEVOPS
    </p>
  </div>
);

const RocketVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 rounded-full bg-orange-400/60"
        style={{
          height: 8 + (i % 3) * 4,
          left: `${10 + i * 10}%`,
          bottom: "10%",
        }}
        animate={{ y: [0, -90], opacity: [0, 0.8, 0] }}
        transition={{
          duration: 1.2 + (i % 3) * 0.4,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
    <motion.div
      animate={{ y: [-5, 5, -5], rotate: [-44, -46, -44] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 w-20 h-20 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.25)]"
    >
      <Rocket className="w-9 h-9 text-orange-500 -rotate-45" />
    </motion.div>
    <p className="absolute bottom-2 text-[7px] font-black tracking-[0.2em] text-orange-500/50 uppercase">
      LAUNCH READY
    </p>
  </div>
);

function StepVisual({ id }: { id: number }) {
  const map: Record<number, React.ReactNode> = {
    1: <ZapVisual />,
    2: <BookVisual />,
    3: <BriefcaseVisual />,
    4: <CodeVisual />,
    5: <CpuVisual />,
    6: <DatabaseVisual />,
    7: <MonitorVisual />,
    8: <SettingsVisual />,
    9: <GitVisual />,
    10: <RocketVisual />,
  };
  return <>{map[id] ?? null}</>;
}

// ─── CARD COMPONENT (STACKING) ────────────────────────────────────────────────

interface CardProps {
  step: ProcessStep;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  i: number;
}

const Card = ({ step, progress, range, targetScale, i }: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-[85vh] flex items-center justify-center sticky top-0 px-2 sm:px-4"
    >
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 18}px)`,
        }}
        className="relative w-full max-w-5xl flex flex-col bg-[#eae6dc]/80 dark:bg-zinc-950/80 backdrop-blur-[12px] rounded-2xl md:rounded-3xl border border-zinc-300/60 dark:border-zinc-800/60 shadow-xl overflow-hidden origin-top group"
      >
        {/* Accent top bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-600 via-orange-400 to-transparent opacity-80" />

        <div className="p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
          {/* ── Left: Text Content ── */}
          <div className="flex-1 space-y-4">
            {/* Phase label + metric */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.22em] text-orange-600 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                {step.phase}
              </span>
              {step.metrics && (
                <div className="text-right hidden sm:block">
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 leading-none mb-0.5">
                    {step.metrics.label}
                  </p>
                  <p className="text-xs md:text-sm font-black text-zinc-700 dark:text-zinc-200 leading-none">
                    {step.metrics.value}
                  </p>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-none mt-2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium max-w-lg">
              {step.description}
            </p>

            {/* Execution Highlights */}
            <div className="space-y-2 mt-4 hidden sm:block">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
                Execution Highlights
              </p>
              <ul className="space-y-2">
                {step.detailedPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2.5 text-xs font-semibold leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2 sm:pt-4">
              {step.techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-xl border border-zinc-300/60 dark:border-zinc-800 bg-[#eae6dc]/40 dark:bg-zinc-900/40 text-[8px] md:text-[9px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Animated Visual ── */}
          <div className="w-full lg:w-[40%] h-40 sm:h-48 lg:h-auto min-h-[160px] lg:min-h-[250px] rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-[#eae6dc]/30 dark:bg-black/30 backdrop-blur-[2px] overflow-hidden shadow-inner relative flex items-center justify-center">
            <motion.div style={{ scale: imageScale }} className="w-full h-full relative">
               <StepVisual id={step.id} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── HEADER COMPONENT ─────────────────────────────────────────────────────────

const SectionHeader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 md:mb-20 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 bg-[#eae6dc]/40 dark:bg-zinc-950/40 backdrop-blur-sm mb-6 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Strategic Roadmap
      </motion.div>

      <h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase text-zinc-900 dark:text-white"
        style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
      >
        My{" "}
        <span className="text-orange-600 italic relative">
          Process
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-orange-500/40"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </span>
        <span className="text-orange-500">.</span>
      </h2>

      <p className="mt-5 mx-auto max-w-xl text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
        From mechanical engineering roots to AI-powered government surveillance systems—a precise, step-by-step account of how I build and ship software with full ownership.
      </p>

      {/* Stats row */}
      <div className="mt-8 inline-flex items-center gap-6 sm:gap-10 border border-zinc-300/40 dark:border-zinc-800/40 rounded-2xl px-6 py-3 bg-[#eae6dc]/30 dark:bg-zinc-950/30 backdrop-blur-sm">
        {[
          { value: "10+", label: "Technologies" },
          { value: "3+", label: "Years Exp." },
          { value: "100+", label: "Live Feeds" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-base sm:text-xl font-black text-orange-600 leading-none">{value}</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export function MyProcess() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <section ref={container} className="relative w-full bg-[#f7f3ea] dark:bg-[#0b0b0b] py-20 sm:py-28 md:py-36 border-t border-zinc-200/60 dark:border-zinc-900/60 transition-colors duration-500">

        {/* Background container (avoids overflow-hidden on the scroll container so sticky works) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dot-grid background */}
          <div
            className="absolute inset-0 select-none opacity-30 dark:opacity-15"
            style={{
              backgroundImage: "radial-gradient(circle, #ea580c 0.7px, transparent 0.7px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Subtle radial glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-20 dark:opacity-10"
            style={{ background: "radial-gradient(ellipse at center, rgba(234,88,12,0.35) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeader />

          {/* Timeline Stack */}
          <div className="relative mt-8 md:mt-16 pb-[10vh]">
            {CAREER_PROCESS.map((step, i) => {
              const rangeStart = i * (1 / CAREER_PROCESS.length);
              const targetScale = 1 - (CAREER_PROCESS.length - i) * 0.04;
              return (
                <Card
                  key={step.id}
                  step={step}
                  i={i}
                  progress={scrollYProgress}
                  range={[rangeStart, 1]}
                  targetScale={targetScale}
                />
              );
            })}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-black uppercase tracking-widest transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              <Rocket className="w-4 h-4" />
              Let's Build Together
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border border-zinc-300/50 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300 hover:border-orange-500/50 hover:text-orange-600 dark:hover:text-orange-400 text-xs font-black uppercase tracking-widest transition-all duration-200 bg-[#eae6dc]/40 dark:bg-zinc-900/40 backdrop-blur-sm hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </section>
    </ReactLenis>
  );
}

export default MyProcess;