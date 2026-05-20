"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useInView,
} from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  Star,
  Milestone,
  ArrowRight,
  ArrowDown,
  Code2,
  Target,
  Cpu,
  Database,
  Settings,
  ChevronDown,
  Zap,
  Globe,
  Layers,
  Terminal,
  GitBranch,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { CoreSpinLoader } from "@/components/CoreSpinLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HoverFooter } from "@/components/HoverFooter";
import { useTheme } from "next-themes";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const MILESTONES = [
  {
    id: "m1",
    year: "Academic Roots",
    title: "Mechanical Engineering Foundation",
    role: "Engineering Graduate",
    company: "Core Focus & Transition",
    description:
      "Began journey as a Mechanical Engineering graduate. Developed a deep interest in software development, automation, and intelligent systems, motivating a bold transition into software engineering and IT.",
    tags: ["Engineering", "Automation", "Systems Thinking"],
    type: "education",
    icon: BookOpen,
    stat: { label: "Core Skills", value: "12+" },
  },
  {
    id: "m2",
    year: "December 2023",
    title: "Professional Career Debut",
    role: "Full Stack Developer",
    company: "Brihaspathi Technologies",
    description:
      "Began professional career, gaining rich experience in building scalable web apps, robust RESTful APIs, and cloud architecture. Programmed extensively in React, Next.js, Node.js, Supabase, and PostgreSQL.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    type: "experience",
    icon: Briefcase,
    stat: { label: "Apps Shipped", value: "8+" },
  },
  {
    id: "m3",
    year: "2024",
    title: "AI Platform Engineering & Tech Scaling",
    role: "Core AI & Systems Engineer",
    company: "Brihaspathi Technologies",
    description:
      "Contributed to multiple intelligent platforms including secure file managers, automated visitor systems, AI chatbots, workflow automators, and Sheets-to-API platforms, mastering backend orchestration.",
    tags: ["AI/ML", "Automation", "Backend Orchestration", "Chatbots"],
    type: "experience",
    icon: Cpu,
    stat: { label: "Platforms Built", value: "5+" },
  },
  {
    id: "m4",
    year: "Mid–Late 2024",
    title: "GovTech Surveillance & Live Telemetry",
    role: "GovTech Architect & Telemetry Lead",
    company: "AP State Elections Command Center",
    description:
      "Engineered critical AI-based surveillance, automated ANPR vehicle tracking, and real-time command analytics dashboards for AP Elections. Proven high-pressure coordination and leadership.",
    tags: ["ANPR", "Real-Time Analytics", "Surveillance AI", "GovTech"],
    type: "experience",
    icon: Star,
    stat: { label: "Live Streams", value: "200+" },
  },
  {
    id: "m5",
    year: "Present",
    title: "Solutions Architect & Future Vision",
    role: "AI & Full-Stack Collaborations",
    company: "Freelance & Open Source",
    description:
      "Actively exploring cutting-edge AI systems, deep cloud infrastructure, autonomous task agents, and hyper-scalable enterprise applications, driving the future of tech with architectural excellence.",
    tags: ["Cloud Architecture", "AI Agents", "Open Source", "Enterprise"],
    type: "experience",
    icon: Sparkles,
    stat: { label: "Ongoing Projects", value: "∞" },
  },
];

const STATS = [
  { value: "2+", label: "Years Experience", icon: Calendar },
  { value: "6+", label: "Projects Shipped", icon: Layers },
  { value: "5+", label: "Tech Stacks", icon: Terminal },
  { value: "3+", label: "Domains Mastered", icon: Globe },
];

/* ─────────────────────────────────────────────────────────
   FLOATING PARTICLES BACKGROUND
───────────────────────────────────────────────────────── */
const ParticleField = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-400/20 dark:bg-[#C2F84F]/10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   CURSOR GLOW
───────────────────────────────────────────────────────── */
const CursorGlow = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 w-[400px] h-[400px] rounded-full opacity-[0.06] dark:opacity-[0.08] blur-[100px]"
      style={{
        x,
        y,
        background:
          "radial-gradient(circle, #f97316 0%, #e11d48 50%, transparent 70%)",
      }}
    />
  );
};

/* ─────────────────────────────────────────────────────────
   ANIMATED COUNT HOOK
───────────────────────────────────────────────────────── */
const useCountUp = (targetValue: string, trigger: boolean, duration: number = 1500) => {
  const [count, setCount] = useState(0);
  const suffixRef = useRef("");
  const targetNumRef = useRef(0);

  useEffect(() => {
    const match = targetValue.match(/^(\d+)(.*)$/) || targetValue.match(/^(.*)(\d+)$/);
    if (match) {
      if (targetValue.match(/^(\d+)(.*)$/)) {
        targetNumRef.current = parseInt(match[1], 10);
        suffixRef.current = match[2];
      } else {
        targetNumRef.current = parseInt(match[2], 10);
        suffixRef.current = match[1];
      }
    } else {
      targetNumRef.current = 0;
      suffixRef.current = targetValue;
    }
  }, [targetValue]);

  useEffect(() => {
    if (!trigger || targetNumRef.current === 0) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      setCount(Math.floor(easeProgress * targetNumRef.current));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetNumRef.current);
      }
    };

    window.requestAnimationFrame(step);
  }, [trigger, duration]);

  if (targetNumRef.current === 0) return targetValue;
  if (targetValue.startsWith(suffixRef.current) && suffixRef.current !== "") {
    return `${suffixRef.current}${count}`;
  }
  return `${count}${suffixRef.current}`;
};

/* ─────────────────────────────────────────────────────────
   STATS COUNTER
───────────────────────────────────────────────────────── */
const StatItem = ({
  value,
  label,
  icon: Icon,
  index,
}: {
  value: string;
  label: string;
  icon: any;
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const animatedValue = useCountUp(value, inView, 1200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative flex flex-col items-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-4 sm:py-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md overflow-hidden cursor-default select-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-rose-500/5 dark:from-[#C2F84F]/5 dark:to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        whileHover={{ rotate: 15, scale: 1.2 }}
        className="p-2 rounded-xl bg-orange-500/10 dark:bg-[#C2F84F]/10 mb-1"
      >
        <Icon className="w-5 h-5 text-orange-600 dark:text-[#C2F84F]" />
      </motion.div>
      <span className="text-xl sm:text-3xl font-black text-zinc-900 dark:text-[#f5f1e8] tracking-tighter">
        {animatedValue}
      </span>
      <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-500 text-center">
        {label}
      </span>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   TIMELINE ITEM
───────────────────────────────────────────────────────── */
const TimelineItemComponent = ({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: false });
  const Icon = milestone.icon;
  const animatedStatValue = useCountUp(milestone.stat.value, inView, 1200);

  return (
    <li
      ref={ref}
      className={inView ? "in-view" : ""}
    >
      <div className="timeline-card group">
        {/* Floating Year Badge */}
        <time>
          <Icon className="w-3 h-3 mr-1.5" />
          <span>{milestone.year}</span>
        </time>

        {/* Radial subtle hover background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-rose-500/5 dark:from-[#C2F84F]/5 dark:to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[16px]" />

        {/* Column 1: Discovery (Milestone Info) */}
        <div className="discovery relative z-10">
          <h1>Evolution & Focus</h1>
          <div>
            <p className="font-black text-zinc-900 dark:text-[#f5f1e8] text-base leading-tight mb-2 tracking-tight">
              {milestone.title}
            </p>
            <p className="text-[12px] text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed mb-4">
              {milestone.description}
            </p>
          </div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {milestone.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-orange-500/5 dark:bg-[#C2F84F]/5 text-orange-600 dark:text-[#C2F84F] border border-orange-500/10 dark:border-[#C2F84F]/10 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Column 2: Scientist (Role / Organization / Stats) */}
        <div className="scientist relative z-10">
          <h1>Architect & Impact</h1>
          <div className="flex flex-col">
            <span className="text-[12px] text-zinc-800 dark:text-zinc-200 font-extrabold leading-tight">
              {milestone.role}
            </span>
            <span className="text-[10px] text-orange-600 dark:text-[#C2F84F] font-black uppercase tracking-widest mt-1 mb-3.5">
              {milestone.company}
            </span>
          </div>

          {/* Stat bubble */}
          <div className="inline-flex flex-col items-start px-3 py-1.5 rounded-xl bg-orange-500/5 dark:bg-[#C2F84F]/5 border border-orange-500/10 dark:border-[#C2F84F]/10 mt-auto">
            <span className="text-sm font-black text-orange-600 dark:text-[#C2F84F] leading-none">
              {animatedStatValue}
            </span>
            <span className="text-[8px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-bold mt-0.5">
              {milestone.stat.label}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};


/* ─────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────────────────── */
const ScrollProgressBar = ({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 dark:from-[#C2F84F] dark:via-emerald-400 dark:to-teal-500"
    />
  );
};

/* ─────────────────────────────────────────────────────────
   CHAPTER DIVIDER
───────────────────────────────────────────────────────── */
const ChapterDivider = ({ label }: { label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-4 mb-16 mt-6 max-w-4xl mx-auto"
  >
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
      {label}
    </span>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
  </motion.div>
);

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function JourneyPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const mobileProgressTip = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>{loading && <CoreSpinLoader />}</AnimatePresence>

      {/* Top scroll bar */}
      <ScrollProgressBar scrollYProgress={scrollYProgress} />

      <div
        ref={containerRef}
        className="relative min-h-screen w-full bg-[#f5f1e8] dark:bg-[#0c0c0c] text-zinc-900 dark:text-[#f5f1e8] transition-colors duration-500 overflow-hidden font-sans selection:bg-orange-500/20 dark:selection:bg-[#C2F84F]/20"
      >
        {/* ── Background layers ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Fine grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px]" />
          {/* Ambient blobs */}
          <div className="absolute left-0 right-0 top-0 m-auto h-[500px] w-[500px] rounded-full bg-orange-500/10 dark:bg-[#C2F84F]/5 opacity-40 blur-[140px]" />
          <div className="absolute right-0 bottom-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/10 dark:bg-purple-600/5 opacity-40 blur-[120px]" />
          <div className="absolute left-1/4 bottom-0 h-[350px] w-[350px] rounded-full bg-rose-500/8 dark:bg-rose-600/5 opacity-30 blur-[110px]" />
        </div>

        {/* Cursor glow */}
        <CursorGlow />

        {/* Floating particles */}
        <ParticleField />

        {/* Nav */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileMenu
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          dark={resolvedTheme === "dark"}
          setDark={() => { }}
        />

        {/* Theme toggle */}
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[100] hidden lg:flex items-center h-14">
          <ThemeToggle variant="icon" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-12 lg:px-24 pt-28 sm:pt-36 pb-20 sm:pb-32">
          {/* ─── HERO HEADER ─── */}
          <section className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-950/10 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md mb-8 shadow-sm"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="flex h-2 w-2 rounded-full bg-orange-500 dark:bg-[#C2F84F]"
              />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-700 dark:text-zinc-300">
                The Chronicle
              </span>
              <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 tracking-widest">
                / Ongoing
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-6"
            >
              A Path Of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 dark:from-[#C2F84F] dark:via-emerald-400 dark:to-teal-400">
                Continuous
              </span>
              <br />
              <span className="relative inline-block">
                Evolution
                {/* Underline accent */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-1 left-0 right-0 h-[4px] rounded-full bg-gradient-to-r from-orange-500 to-rose-500 dark:from-[#C2F84F] dark:to-emerald-400 origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 max-w-xl mx-auto text-sm sm:text-base font-semibold text-zinc-500 dark:text-zinc-400 leading-relaxed"
            >
              A high-precision visual timeline tracing the transition from Mechanical
              Engineering to building large-scale GovTech surveillance, advanced enterprise
              systems, and next-gen AI applications.
            </motion.p>

            {/* CTA hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
            >
              <span>Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </motion.div>

            {/* Animated divider line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-12 flex justify-center"
            >
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-orange-500 dark:via-[#C2F84F] to-transparent relative overflow-hidden">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500 dark:via-[#C2F84F] to-transparent h-1/2"
                />
              </div>
            </motion.div>
          </section>

          {/* ─── STATS BAR ─── */}
          <section className="mb-24 md:mb-32">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {STATS.map((s, i) => (
                <StatItem key={s.label} {...s} index={i} />
              ))}
            </div>
          </section>

          <ChapterDivider label="Timeline — Career Arc" />

          {/* ─── TIMELINE ─── */}
          <div className="timeline-container mx-auto max-w-4xl relative min-h-[50vh] sm:min-h-[100vh]">
            <section className="timeline">
              <ul>
                {MILESTONES.map((milestone, idx) => (
                  <TimelineItemComponent key={milestone.id} milestone={milestone} index={idx} />
                ))}
              </ul>
            </section>

            {/* Timeline end node */}
            <div className="relative flex justify-center w-full z-20 pb-20 mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-[#f5f1e8] dark:border-[#0c0c0c] bg-zinc-950 dark:bg-white flex items-center justify-center shadow-xl cursor-pointer group overflow-hidden"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-rose-500 dark:from-[#C2F84F] dark:to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowDown className="w-5 h-5 text-white dark:text-zinc-950 group-hover:text-white transition-colors z-10 rotate-180 relative" />
                {/* Tooltip */}
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-3 whitespace-nowrap text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 pointer-events-none"
                >
                  Back to top
                </motion.span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ─── CTA SECTION ─── */}
        <section className="relative z-20 py-16 sm:py-28 border-t border-zinc-950/5 dark:border-zinc-900/60 overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 bg-[#ffffff]/30 dark:bg-zinc-900/20 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Animated accent orbs */}
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute -left-20 top-1/2 w-[300px] h-[300px] rounded-full bg-orange-500/8 dark:bg-[#C2F84F]/5 blur-[80px]"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
            className="absolute -right-20 top-1/3 w-[250px] h-[250px] rounded-full bg-indigo-500/8 dark:bg-teal-500/5 blur-[80px]"
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="inline-flex items-center justify-center p-4 rounded-2xl bg-orange-500/10 dark:bg-[#C2F84F]/10 border border-orange-500/20 dark:border-[#C2F84F]/20 mb-8"
              >
                <Code2 className="w-9 h-9 text-orange-600 dark:text-[#C2F84F]" />
              </motion.div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.92] mb-6">
                Let's Build The Next
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-500 dark:from-[#C2F84F] dark:via-emerald-400 dark:to-teal-500">
                  Technical Milestone
                </span>
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto mb-12 text-sm sm:text-base">
                Whether you need robust full-stack applications, intelligent automation
                workflows, real-time command metrics, or custom AI integrations—let's
                construct a flawless story together.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-zinc-900 text-[#f5f1e8] dark:bg-white dark:text-zinc-900 font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 dark:from-[#C2F84F] dark:to-emerald-500 opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
                  <span className="relative z-10">Start a project</span>
                  <ArrowRight className="w-4 h-4 text-orange-500 dark:text-emerald-600 group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.a>

                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-zinc-700 dark:text-zinc-300 hover:border-orange-500/50 dark:hover:border-[#C2F84F]/50 transition-all duration-300 group"
                >
                  <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>View work</span>
                </motion.a>
              </div>

              {/* Decorative line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-16 w-32 h-[1px] bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-600 to-transparent"
              />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <HoverFooter />

        {/* Custom Timeline CSS rules mapped perfectly to support all modes */}
        <style dangerouslySetInnerHTML={{
          __html: `
          /* TIMELINE STYLING */
          :root {
            --timeline-line: #e2e8f0;
            --timeline-node-bg: #ffffff;
            --timeline-node-border: #e2e8f0;
            --timeline-node-glow: rgba(249, 115, 22, 0.05);
            --timeline-node-active-bg: #f5af19;
            --timeline-node-active-border: #ffffff;
            --timeline-node-active-glow: rgba(249, 115, 22, 0.4);
            --timeline-card-bg: rgba(255, 255, 255, 0.85);
            --timeline-card-border: rgba(249, 115, 22, 0.12);
            --timeline-card-shadow: 4px 13px 30px 1px rgba(249, 115, 22, 0.12);
            --timeline-card-shadow-hover: 4px 16px 35px 2px rgba(249, 115, 22, 0.22);
            --timeline-badge-bg: #f5af19;
            --timeline-badge-text: #ffffff;
            --timeline-badge-border: #f97316;
            --timeline-divider: rgba(226, 232, 240, 0.8);
            --timeline-col-header: #c2410c;
          }

          .dark {
            --timeline-line: #27272a;
            --timeline-node-bg: #18181b;
            --timeline-node-border: #27272a;
            --timeline-node-glow: rgba(194, 248, 79, 0.03);
            --timeline-node-active-bg: #C2F84F;
            --timeline-node-active-border: #18181b;
            --timeline-node-active-glow: rgba(194, 248, 79, 0.45);
            --timeline-card-bg: rgba(24, 24, 27, 0.7);
            --timeline-card-border: rgba(194, 248, 79, 0.15);
            --timeline-card-shadow: 4px 13px 30px 1px rgba(194, 248, 79, 0.1);
            --timeline-card-shadow-hover: 4px 16px 35px 2px rgba(194, 248, 79, 0.22);
            --timeline-badge-bg: #C2F84F;
            --timeline-badge-text: #09090b;
            --timeline-badge-border: #C2F84F;
            --timeline-divider: rgba(63, 63, 70, 0.5);
            --timeline-col-header: #C2F84F;
          }

          .timeline {
            position: relative;
            width: 100%;
            margin: 0 auto;
            padding-bottom: 50px;
          }

          .timeline ul {
            padding: 0;
            margin: 0;
            width: 100%;
          }

          .timeline ul li {
            list-style-type: none;
            position: relative;
            width: 6px;
            margin: 0 auto;
            padding-top: 50px;
            background: var(--timeline-line);
            transition: background 0.5s ease;
          }

          /* Diamond node */
          .timeline ul li::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%) rotate(45deg);
            width: 20px;
            height: 20px;
            z-index: 2;
            background: var(--timeline-node-bg);
            border: 4px solid var(--timeline-node-border);
            box-shadow: 0 0 15px var(--timeline-node-glow);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .timeline ul li.in-view::after {
            background: var(--timeline-node-active-bg);
            border-color: var(--timeline-node-active-border);
            box-shadow: 0 0 25px var(--timeline-node-active-glow);
            transform: translateX(-50%) rotate(225deg);
          }

          /* Timeline Card styling */
          .timeline ul li .timeline-card {
            position: relative;
            bottom: 0;
            width: 420px;
            padding: 24px;
            background: var(--timeline-card-bg);
            border: 1px solid var(--timeline-card-border);
            box-shadow: var(--timeline-card-shadow);
            border-radius: 16px;
            display: flex;
            align-items: stretch;
            backdrop-filter: blur(12px);
            visibility: hidden;
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 10;
          }

          /* Floating badge */
          .timeline ul li .timeline-card time {
            position: absolute;
            background: var(--timeline-badge-bg);
            color: var(--timeline-badge-text);
            min-width: 140px;
            height: 30px;
            top: -15px;
            border-radius: 9999px;
            display: flex;
            justify-content: center;
            align-items: center;
            letter-spacing: 1.5px;
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border: 1px solid var(--timeline-badge-border);
            padding: 0 14px;
            z-index: 20;
          }

          /* Layout structure for two columns */
          .timeline ul li .timeline-card .discovery {
            flex: 1.3;
            margin-right: 18px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            text-align: left;
          }

          .timeline ul li .timeline-card .scientist {
            flex: 0.9;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            text-align: left;
            border-left: 1px solid var(--timeline-divider);
            padding-left: 18px;
          }

          .timeline ul li .timeline-card .discovery h1,
          .timeline ul li .timeline-card .scientist h1 {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 900;
            color: var(--timeline-col-header);
            margin-bottom: 8px;
          }

          /* Default animation transforms on odd vs even */
          .timeline ul li:nth-of-type(odd) > .timeline-card {
            left: 45px;
            transform: translate3d(100px, -10px, 0) rotate(10deg);
          }

          .timeline ul li:nth-of-type(even) > .timeline-card {
            left: -459px;
            transform: translate3d(-100px, -10px, 0) rotate(10deg);
          }

          /* Card in view */
          .timeline ul li.in-view > .timeline-card {
            transform: none;
            visibility: visible;
            opacity: 1;
          }

          /* Hover behavior */
          .timeline ul li .timeline-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: var(--timeline-card-shadow-hover);
            border-color: var(--timeline-badge-bg);
          }

          .timeline ul li:hover::after {
            transform: translateX(-50%) rotate(405deg);
            background: var(--timeline-node-active-bg);
            border-color: var(--timeline-node-active-border);
            box-shadow: 0 0 25px var(--timeline-node-active-glow);
          }

          /* --- Responsive: Tablet --- */
          @media screen and (max-width: 960px) {
            .timeline ul li .timeline-card {
              width: 310px;
              flex-direction: column;
              align-items: flex-start;
              padding: 24px 20px 20px 20px;
            }
            
            .timeline ul li .timeline-card .scientist {
              border-left: none;
              padding-left: 0;
              margin-top: 18px;
              padding-top: 14px;
              border-top: 1px solid var(--timeline-divider);
              width: 100%;
            }

            .timeline ul li .timeline-card .discovery {
              margin-right: 0;
            }

            .timeline ul li:nth-of-type(even) > .timeline-card {
              left: -349px;
            }
          }

          /* --- Responsive: Mobile --- */
          @media screen and (max-width: 680px) {
            .timeline-container {
              overflow-x: hidden;
            }

            .timeline {
              padding-bottom: 20px;
              overflow: visible;
            }

            .timeline ul {
              overflow: visible;
            }

            .timeline ul li {
              margin-left: 8px;
              padding-top: 45px;
              width: 4px;
            }

            /* Smaller diamond nodes on mobile */
            .timeline ul li::after {
              width: 12px;
              height: 12px;
              border-width: 2px;
            }

            .timeline ul li .timeline-card {
              width: calc(100vw - 75px);
              max-width: 340px;
              padding: 20px 14px 14px 14px;
              border-radius: 14px;
              flex-direction: column;
              align-items: flex-start;
              word-break: break-word;
              overflow-wrap: break-word;
            }

            /* All cards go to the right on mobile */
            .timeline ul li:nth-of-type(odd) > .timeline-card,
            .timeline ul li:nth-of-type(even) > .timeline-card {
              left: 25px;
            }
            
            /* Consistent entry animation for mobile */
            .timeline ul li:nth-of-type(odd) > .timeline-card {
              transform: translate3d(40px, -5px, 0) rotate(3deg);
            }
            .timeline ul li:nth-of-type(even) > .timeline-card {
              transform: translate3d(40px, -5px, 0) rotate(3deg);
            }

            /* Badge sizing on mobile */
            .timeline ul li .timeline-card time {
              min-width: 100px;
              height: 24px;
              font-size: 7px;
              letter-spacing: 1px;
              padding: 0 10px;
              top: -12px;
            }

            /* Column headers */
            .timeline ul li .timeline-card .discovery h1,
            .timeline ul li .timeline-card .scientist h1 {
              font-size: 8px;
              letter-spacing: 1.5px;
              margin-bottom: 6px;
            }

            /* Discovery column - no right margin, full width */
            .timeline ul li .timeline-card .discovery {
              margin-right: 0;
              width: 100%;
              flex: none;
            }

            /* Scientist column - stack below */
            .timeline ul li .timeline-card .scientist {
              border-left: none;
              padding-left: 0;
              margin-top: 14px;
              padding-top: 12px;
              border-top: 1px solid var(--timeline-divider);
              width: 100%;
              flex: none;
            }

            /* Smaller description text */
            .timeline ul li .timeline-card .discovery p {
              font-size: 11px !important;
              line-height: 1.5 !important;
            }

            /* Smaller title text */
            .timeline ul li .timeline-card .discovery p:first-of-type {
              font-size: 13px !important;
            }

            /* Tags wrap nicely */
            .timeline ul li .timeline-card .discovery .flex-wrap {
              gap: 4px;
            }

            /* Hover effect toned down on mobile */
            .timeline ul li .timeline-card:hover {
              transform: translateY(-4px) scale(1.01);
            }
          }

          /* --- Responsive: Very small phones (< 400px) --- */
          @media screen and (max-width: 400px) {
            .timeline ul li {
              margin-left: 4px;
              padding-top: 40px;
              width: 3px;
            }

            .timeline ul li::after {
              width: 10px;
              height: 10px;
              border-width: 2px;
            }

            .timeline ul li .timeline-card {
              width: calc(100vw - 55px);
              max-width: 300px;
              padding: 16px 12px 12px 12px;
              border-radius: 12px;
            }

            .timeline ul li:nth-of-type(odd) > .timeline-card,
            .timeline ul li:nth-of-type(even) > .timeline-card {
              left: 20px;
            }

            .timeline ul li .timeline-card time {
              min-width: 85px;
              height: 22px;
              font-size: 6px;
              padding: 0 8px;
              top: -11px;
            }

            .timeline ul li .timeline-card .discovery p {
              font-size: 10px !important;
            }

            .timeline ul li .timeline-card .discovery p:first-of-type {
              font-size: 12px !important;
            }
          }
        ` }} />
      </div>
    </>
  );
}