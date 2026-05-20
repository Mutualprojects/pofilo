"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Brain, Code2, Server, Database, Globe, Terminal,
  Search, Filter, Cpu, Workflow, ShieldCheck, ChevronRight,
  Monitor, Cloud, Settings, Zap, Sparkles, Trophy,
  GraduationCap, X, ArrowUpRight, Star, Layers, Flame,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { CoreSpinLoader } from "@/components/CoreSpinLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HoverFooter } from "@/components/HoverFooter";

// ─── GSAP Plugin Registration ───────────────────────────────────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ═══════════════════════════════════════════════════════════
//  TECH ICON
// ═══════════════════════════════════════════════════════════
const TechIcon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  const iconMap: Record<string, string> = {
    Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "Django & DRF": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    "Node.js / Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
    "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    "HTML / CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "PostgreSQL / Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "Git / GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "Linux (Ubuntu)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    "GCP (Basics)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  };
  const lucideMap: Record<string, any> = {
    Microservices: Cpu, "RESTful Services": Globe, WebSockets: Zap,
    "OpenAI APIs": Sparkles, "AI-Based Applications": Brain, "Automation Systems": Workflow,
    "Computer Vision": Monitor, "API Integration": Settings, "ChromaDB / Pinecone": Database,
    "API Deployment": Cloud, "Agile / SDLC": ShieldCheck,
  };
  if (iconMap[name]) {
    return <img src={iconMap[name]} alt={name} className={`${className} object-contain`} />;
  }
  const LucideIcon = lucideMap[name] || Code2;
  return <LucideIcon className={className} />;
};

// ═══════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════
const skillCategories = [
  {
    title: "Languages",
    abbr: "LANG",
    icon: Terminal,
    color: "#ea580c",
    description: "Polyglot proficiency across the modern full-stack spectrum.",
    skills: [
      { name: "Python", level: 95, tags: ["Django", "FastAPI", "Flask"] },
      { name: "JavaScript", level: 93, tags: ["ES2024", "Async"] },
      { name: "TypeScript", level: 88, tags: ["Safety", "Scale"] },
    ],
  },
  {
    title: "Backend & APIs",
    abbr: "BACK",
    icon: Server,
    color: "#0891b2",
    description: "Resilient, production-grade server-side systems and RESTful services.",
    skills: [
      { name: "Django & DRF", level: 94, tags: ["Python", "Expert"] },
      { name: "Node.js / Express.js", level: 92, tags: ["REST", "Real-time"] },
      { name: "Microservices", level: 85, tags: ["Architecture"] },
      { name: "RESTful Services", level: 95, tags: ["Design", "Versioning"] },
      { name: "WebSockets", level: 86, tags: ["Sockets.io", "Real-time"] },
    ],
  },
  {
    title: "Frontend & UI",
    abbr: "FRNT",
    icon: Code2,
    color: "#7c3aed",
    description: "High-fidelity, responsive interfaces that delight 1,000+ users.",
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
    abbr: "AI",
    icon: Brain,
    color: "#059669",
    description: "Building intelligent systems — from chatbots to identity verification.",
    skills: [
      { name: "OpenAI APIs", level: 91, tags: ["GPT-4", "Embeddings"] },
      { name: "AI-Based Applications", level: 90, tags: ["Integration"] },
      { name: "Automation Systems", level: 87, tags: ["Workflow", "WhatsApp"] },
      { name: "Computer Vision", level: 84, tags: ["FaceNet", "ANPR"] },
      { name: "API Integration", level: 93, tags: ["Third-party", "Webhooks"] },
    ],
  },
  {
    title: "Databases",
    abbr: "DATA",
    icon: Database,
    color: "#db2777",
    description: "From relational to vector — the right store for every data shape.",
    skills: [
      { name: "MongoDB", level: 90, tags: ["NoSQL", "Aggregation"] },
      { name: "PostgreSQL / Supabase", level: 88, tags: ["Relational", "RLS"] },
      { name: "ChromaDB / Pinecone", level: 84, tags: ["Vector", "RAG"] },
    ],
  },
  {
    title: "Cloud & DevOps",
    abbr: "OPS",
    icon: Globe,
    color: "#d97706",
    description: "Shipping to production — Linux servers, cloud deployment, monitoring.",
    skills: [
      { name: "Linux (Ubuntu)", level: 89, tags: ["Server", "Bash"] },
      { name: "GCP (Basics)", level: 76, tags: ["Cloud"] },
      { name: "Git / GitHub", level: 93, tags: ["Version Control"] },
      { name: "API Deployment", level: 88, tags: ["Vercel", "Linux"] },
      { name: "Agile / SDLC", level: 90, tags: ["Sprint", "KPIs"] },
    ],
  },
];

const achievements = [
  { icon: Trophy, title: "Exemplary Award 2024", body: "Honored by Brihaspathi for technical excellence, outstanding engineering leadership, and delivering enterprise full-stack AI platforms." },
  { icon: Trophy, title: "District Collector Award", body: "AP State Elections — District Coordinator, West Godavari. Led AI surveillance, ANPR, and real-time analytics across 7 constituencies." },
  { icon: Trophy, title: "Head District Coordinator", body: "AP MLC Elections, Visakhapatnam — Directed the Central Monitoring Hall for statewide live VMS analytics." },
  { icon: Trophy, title: "NEET Exam Surveillance", body: "Presented AI video-analytics solution for anomaly detection to government officials — selected for institutional deployment." },
];

const keyProjects = [
  { title: "AI Visitor Management", stack: "Python · FaceNet · WebSockets", highlight: "500+ Daily Visitors", description: "Identity verification & access control with real-time camera integration." },
  { title: "Secure File Manager", stack: "React · Node.js · Pinecone", highlight: "1,000+ Documents", description: "Enterprise document platform with intelligent vector-based search." },
  { title: "GenAI Chatbot", stack: "LLAMA3.2 · Strapi · React", highlight: "50+ Dynamic Pages", description: "AI chatbot with real-time contextual responses for business content." },
];

const stats = [
  { value: "2.5y+", label: "Experience" },
  { value: "6+", label: "Deployments" },
  { value: "99.9%", label: "Uptime" },
  { value: "26+", label: "Technologies" },
];

// ═══════════════════════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════
function AnimCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  useEffect(() => {
    if (!ref.current || hasRun.current) return;
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasRun.current) return;
        hasRun.current = true;
        gsap.fromTo({ val: 0 }, { val: target }, {
          duration: 2, ease: "power2.out",
          onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + suffix; },
        });
      },
    });
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════
//  SKILL CARD
// ═══════════════════════════════════════════════════════════
function SkillCard({ skill, catColor, idx }: { skill: any; catColor: string; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const bar = barRef.current;
    if (!card || !bar) return;

    gsap.fromTo(card,
      { opacity: 0, y: 60, rotateY: 15 },
      {
        opacity: 1, y: 0, rotateY: 0, duration: 0.7,
        ease: "power3.out", delay: idx * 0.08,
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
      }
    );

    gsap.fromTo(bar,
      { width: "0%" },
      {
        width: `${skill.level}%`, duration: 1.4, ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
        delay: idx * 0.06 + 0.3,
      }
    );
  }, [skill.level, idx]);

  return (
    <div
      ref={cardRef}
      className="group skill-card relative p-5 sm:p-6 lg:p-7 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl overflow-hidden cursor-default"
      style={{ perspective: "800px" }}
    >
      {/* Glow blob */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 70% 80%, ${catColor}18 0%, transparent 60%)` }}
      />

      <div className="flex items-start justify-between mb-4 sm:mb-5">
        <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <TechIcon name={skill.name} className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="text-right">
          <span className="text-2xl sm:text-3xl font-black italic leading-none" style={{ color: catColor }}>
            {skill.level}%
          </span>
          <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 mt-0.5">Mastery</span>
        </div>
      </div>

      <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-2.5 sm:mb-3">
        {skill.name}
      </h4>

      <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
        {skill.tags.map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[8px] font-black uppercase tracking-widest text-zinc-400">
            {tag}
          </span>
        ))}
      </div>

      <div className="h-[2px] w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div ref={barRef} className="h-full rounded-full" style={{ width: "0%", backgroundColor: catColor }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  HORIZONTAL SCROLL STRIP
// ═══════════════════════════════════════════════════════════
function CategoryStrip({ categories, active, onSelect }: { categories: typeof skillCategories; active: number; onSelect: (i: number) => void }) {
  const stripRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide" ref={stripRef}>
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-400 border-2 ${active === i
            ? "text-white shadow-xl border-transparent scale-105"
            : "bg-white dark:bg-zinc-900 text-zinc-400 border-zinc-100 dark:border-zinc-800 hover:border-orange-500/30"
            }`}
          style={active === i ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
        >
          <cat.icon size={13} />
          {cat.title}
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  GSAP SPLIT TEXT REVEAL
// ═══════════════════════════════════════════════════════════
function SplitReveal({ text, className, tag: Tag = "div", delay = 0 }: { text: string; className?: string; tag?: any; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    // Fallback to word-by-word if SplitText unavailable
    let split: any;
    try {
      split = new SplitText(ref.current, { type: "lines,words" });
      gsap.fromTo(split.words,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1, stagger: 0.04, duration: 0.9,
          ease: "power4.out", delay,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );
    } catch {
      gsap.fromTo(ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );
    }
    return () => { if (split) split.revert(); };
  }, [delay]);
  return <Tag ref={ref} className={className}>{text}</Tag>;
}

// ═══════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════
export default function SkillsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTab, setActiveTab] = useState<"skills" | "projects" | "achievements">("skills");
  const [searchQuery, setSearchQuery] = useState("");
  const [minLevel, setMinLevel] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // ── Refs ────────────────────────────────────────────────
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);

  // Framer scroll for parallax
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // ── Filter logic ────────────────────────────────────────
  const currentCat = skillCategories[activeCategory];
  const filteredSkills = currentCat.skills.filter(s =>
    (!searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    s.level >= minLevel
  );
  const clearFilters = () => { setSearchQuery(""); setMinLevel(0); };

  // ── Mount & Loader ──────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  // ── GSAP Master Timeline ─────────────────────────────────
  useLayoutEffect(() => {
    if (loading || !mounted) return;
    const ctx = gsap.context(() => {

      // ── 1. HERO: chars fly in ─────────────────────────────
      if (heroTitleRef.current) {
        try {
          const split = new SplitText(heroTitleRef.current, { type: "chars,words" });
          gsap.fromTo(split.chars,
            { y: 140, opacity: 0, rotateX: -90 },
            { y: 0, opacity: 1, rotateX: 0, stagger: 0.025, duration: 1.1, ease: "power4.out", delay: 0.2 }
          );
        } catch {
          gsap.fromTo(heroTitleRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.2 }
          );
        }
      }

      // ── 2. HERO: subtitle + stats slide in ───────────────
      gsap.fromTo(".hero-sub",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.7, stagger: 0.12 }
      );

      gsap.fromTo(".stat-box",
        { y: 50, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "back.out(1.7)", delay: 0.9 }
      );

      // ── 3. HERO: floating badge ───────────────────────────
      gsap.fromTo(".hero-badge",
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.1 }
      );

      // ── 4. HERO scrollY parallax scale ───────────────────
      if (heroRef.current) {
        gsap.to(".hero-bg-circle", {
          scale: 2.2, opacity: 0,
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
        });
        gsap.to(".hero-grid-lines", {
          yPercent: 40,
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      }

      // ── 5. SECTION HEADING reveal on scroll ──────────────
      gsap.utils.toArray<HTMLElement>(".scroll-reveal-heading").forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } }
        );
      });

      // ── 6. SECTION LINE expand ───────────────────────────
      gsap.utils.toArray<HTMLElement>(".line-expand").forEach(el => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      // ── 7. TAB SECTION: pinned category cards ─────────────
      // (categories animate in from left on scroll)
      gsap.utils.toArray<HTMLElement>(".cat-pill").forEach((el, i) => {
        gsap.fromTo(el,
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: i * 0.07,
            scrollTrigger: { trigger: el, start: "top 90%", once: true }
          }
        );
      });

      // ── 8. PROJECTS: staggered cards ─────────────────────
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, scale: 0.92 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
          }
        );
      });

      // ── 9. ACHIEVEMENT: slide from alternate sides ────────
      gsap.utils.toArray<HTMLElement>(".achievement-card").forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%", once: true }
          }
        );
      });

      // ── 10. MARQUEE: speed change on scroll ──────────────
      if (marqueeRef.current) {
        gsap.to(".marquee-inner", {
          x: "-50%",
          ease: "none",
          duration: 35,
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const speed = 1 + self.getVelocity() * 0.0002;
            gsap.to(".marquee-inner", { timeScale: Math.max(0.5, Math.min(speed, 6)), duration: 0.5 });
          },
        });
      }

      // ── 11. FOOTER: big text reveal ───────────────────────
      if (footerRef.current) {
        gsap.fromTo(".footer-text",
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 80%", once: true }
          }
        );
      }

      // ── 12. NOISE overlay subtle drift ───────────────────
      gsap.to(noiseRef.current, {
        backgroundPosition: "100% 100%",
        duration: 8, ease: "none", repeat: -1, yoyo: true,
      });

      // ── 13. Horizontal scroll panel (skills teaser) ───────
      if (horizontalRef.current) {
        const panels = horizontalRef.current.querySelectorAll<HTMLElement>(".h-panel");
        const totalWidth = Array.from(panels).reduce((acc, p) => acc + p.offsetWidth + 24, 0);

        gsap.to(horizontalRef.current, {
          x: () => -(totalWidth - window.innerWidth + 48),
          ease: "none",
          scrollTrigger: {
            trigger: stickyPanelRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }

    }, pageRef);

    return () => ctx.revert();
  }, [loading, mounted]);

  // Refresh ScrollTrigger on tab/category change
  useEffect(() => {
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [activeTab, activeCategory]);

  if (!mounted) return null;

  return (
    <>
      {/* ── LOADER ─────────────────────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-[200]">
            <CoreSpinLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={pageRef} className="min-h-screen bg-[#f5f1e8] dark:bg-[#080808] text-zinc-900 dark:text-[#f5f1e8] transition-colors duration-500 overflow-x-hidden">

        {/* ── NOISE TEXTURE ───────────────────────────────── */}
        <div ref={noiseRef} className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035] dark:opacity-[0.06]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px 256px" }}
        />

        {/* ── NAV ─────────────────────────────────────────── */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} dark={true} setDark={() => { }} />
        <div className="fixed bottom-6 right-6 z-[100] hidden sm:block"><ThemeToggle variant="icon" /></div>

        {/* ══════════════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24">

          {/* Background grid lines */}
          <div className="hero-grid-lines absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(234,88,12,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.06) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating glow circles */}
          <div className="hero-bg-circle absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)" }}
          />
          <div className="hero-bg-circle absolute bottom-20 left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
          />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Hero Content */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Eyebrow */}
                <div className="hero-sub flex items-center gap-3 mb-8 sm:mb-12">
                  <div className="h-px w-8 sm:w-14 bg-orange-600" />
                  <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.5em] text-orange-600">
                    Skills & Expertise
                  </span>
                </div>

                {/* Main title */}
                <div className="overflow-hidden mb-6 sm:mb-10">
                  <h1
                    ref={heroTitleRef}
                    className="text-[clamp(3.5rem,15vw,8.5rem)] font-black leading-[0.82] tracking-[-0.03em] uppercase"
                  >
                    My
                    <span className="block text-orange-600 italic">Skills.</span>
                  </h1>
                </div>

                {/* Sub row */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-12">
                  <p className="hero-sub text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-snug max-w-sm">
                    A carefully curated stack refined through 2.5+ years of building
                    high-performance systems and AI-driven experiences.
                  </p>

                  {/* Stats */}
                  <div ref={statsRef} className="flex gap-6 sm:gap-8 flex-wrap">
                    {stats.map((s, i) => (
                      <div key={i} className="stat-box flex flex-col">
                        <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white leading-none mb-1">
                          {s.value}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-orange-600">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scroll hint */}
                <div className="hero-sub mt-14 sm:mt-20 flex items-center gap-3 text-zinc-400">
                  <div className="w-px h-10 sm:h-14 bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em]">Scroll to explore</span>
                </div>
              </div>

              {/* Right Column: Orbiting tech stack circles */}
              <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] lg:min-h-[480px] overflow-visible">
                <div className="relative w-full aspect-square max-w-[420px] flex items-center justify-center overflow-visible">
                  
                  {/* Core Glowing center */}
                  <div className="absolute w-20 h-20 rounded-full bg-[#f5f1e8] dark:bg-[#121212] border border-orange-500/30 flex items-center justify-center shadow-xl z-20">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="flex items-center justify-center text-orange-600"
                    >
                      <Brain className="w-8 h-8" />
                    </motion.div>
                    {/* Subtle center pulse */}
                    <div className="absolute inset-0 rounded-full bg-orange-600/10 animate-ping -z-10" />
                  </div>

                  {/* Orbit 1: Inner (Radius 80px) */}
                  <div className="absolute w-[160px] h-[160px] rounded-full border border-dashed border-zinc-300 dark:border-zinc-800/80 pointer-events-none" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                    className="absolute w-[160px] h-[160px] pointer-events-none"
                  >
                    {/* React */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% - 18px)", top: "-18px" }}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                    {/* TypeScript */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% + 51px)", top: "calc(50% + 22px)" }}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                    {/* Python */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% - 87px)", top: "calc(50% + 22px)" }}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Orbit 2: Middle (Radius 140px) */}
                  <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-zinc-300/80 dark:border-zinc-800/60 pointer-events-none" />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    className="absolute w-[280px] h-[280px] pointer-events-none"
                  >
                    {/* Node.js at 45° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% + 99px - 18px)", top: "calc(50% - 99px - 18px)" }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                    {/* Django at 135° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% + 99px - 18px)", top: "calc(50% + 99px - 18px)" }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" className="w-full h-full object-contain dark:invert" />
                      </motion.div>
                    </div>
                    {/* PostgreSQL at 225° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% - 99px - 18px)", top: "calc(50% + 99px - 18px)" }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="Postgres" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                    {/* MongoDB at 315° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% - 99px - 18px)", top: "calc(50% - 99px - 18px)" }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Orbit 3: Outer (Radius 200px) */}
                  <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-zinc-300/60 dark:border-zinc-800/40 pointer-events-none" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                    className="absolute w-[400px] h-[400px] pointer-events-none"
                  >
                    {/* Next.js at 0° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% + 200px - 18px)", top: "calc(50% - 18px)" }}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-full h-full object-contain dark:invert" />
                      </motion.div>
                    </div>
                    {/* Tailwind at 72° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% + 61.8px - 18px)", top: "calc(50% + 190.2px - 18px)" }}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                    {/* GCP at 144° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% - 161.8px - 18px)", top: "calc(50% + 117.6px - 18px)" }}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" alt="GCP" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                    {/* Git at 216° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% - 161.8px - 18px)", top: "calc(50% - 117.6px - 18px)" }}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                    {/* Redux at 288° */}
                    <div className="absolute pointer-events-auto" style={{ left: "calc(50% + 61.8px - 18px)", top: "calc(50% - 190.2px - 18px)" }}>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                        className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-1.5 shadow-md hover:scale-110 hover:border-orange-500 transition-all duration-300"
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="Redux" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                  </motion.div>

                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 2 — HORIZONTAL CATEGORY SHOWCASE (sticky pin)
        ══════════════════════════════════════════════════ */}
        <div ref={stickyPanelRef} className="relative overflow-hidden h-screen hidden lg:flex items-center">
          <div ref={horizontalRef} className="flex gap-6 pl-12 will-change-transform">
            {skillCategories.map((cat, i) => (
              <div key={i} className="h-panel flex-shrink-0 w-[360px] xl:w-[400px] h-[480px] rounded-[3rem] p-10 relative overflow-hidden flex flex-col justify-between"
                style={{ background: `linear-gradient(135deg, ${cat.color}15 0%, ${cat.color}05 100%)`, border: `1px solid ${cat.color}30` }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                    style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                    <cat.icon size={26} />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] mb-3 block" style={{ color: cat.color }}>
                    {cat.abbr}
                  </span>
                  <h3 className="text-3xl xl:text-4xl font-black uppercase tracking-tighter leading-none mb-4">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {cat.description}
                  </p>
                </div>
                <div className="space-y-3">
                  {cat.skills.slice(0, 3).map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: cat.color }} />
                        </div>
                        <span className="text-[10px] font-black" style={{ color: cat.color }}>{skill.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: cat.color }} />
              </div>
            ))}
            {/* End spacer */}
            <div className="flex-shrink-0 w-12" />
          </div>

          {/* progress hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-400">
            <span className="text-[9px] font-black uppercase tracking-widest">Scroll to pan</span>
            <ChevronRight size={12} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 3 — MAIN TABS (Skills / Projects / Achievements)
        ══════════════════════════════════════════════════ */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-24 pb-16 relative z-10">

          {/* Section label */}
          <div className="mb-10 sm:mb-16 flex items-center gap-4">
            <div className="line-expand h-px w-12 sm:w-20 bg-orange-600 origin-left" />
            <span className="scroll-reveal-heading text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-orange-600">
              Deep Dive
            </span>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-10 sm:mb-16">
            {(["skills", "projects", "achievements"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`relative px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all duration-400 overflow-hidden ${activeTab === tab
                  ? "bg-zinc-900 dark:bg-[#f5f1e8] text-white dark:text-zinc-900 shadow-xl"
                  : "bg-white dark:bg-zinc-900/60 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
                  }`}
              >
                {activeTab === tab && (
                  <motion.span layoutId="tab-pill" className="absolute inset-0 bg-orange-600/20 mix-blend-overlay" />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* ─── TAB CONTENT ─────────────────────────────── */}
          <AnimatePresence mode="wait">

            {/* ══ SKILLS ══════════════════════════════════ */}
            {activeTab === "skills" && (
              <motion.div key="skills"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              >
                <div className="lg:grid lg:grid-cols-12 lg:gap-14">

                  {/* ── DESKTOP SIDEBAR ── */}
                  <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
                    <div className="sticky top-32 space-y-3">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Categories</h3>
                        <button onClick={() => setShowFilters(!showFilters)}
                          className={`p-2.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${showFilters ? "bg-orange-600 text-white" : "bg-white dark:bg-zinc-900 text-zinc-400 border border-zinc-100 dark:border-zinc-800"}`}>
                          <Filter size={14} />
                        </button>
                      </div>

                      {/* Filter box */}
                      <AnimatePresence>
                        {showFilters && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-5">
                              <div className="relative">
                                <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                  placeholder="Search skills…"
                                  className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-[11px] font-bold outline-none focus:ring-2 focus:ring-orange-500/40" />
                              </div>
                              <div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-2">
                                  Min Mastery: {minLevel}%
                                </span>
                                <input type="range" min={0} max={95} step={5} value={minLevel}
                                  onChange={e => setMinLevel(Number(e.target.value))} className="w-full accent-orange-600" />
                                <div className="flex justify-between mt-1 text-[8px] font-bold text-zinc-400">
                                  <span>0%</span><span>{minLevel}%+</span>
                                </div>
                              </div>
                              {(searchQuery || minLevel > 0) && (
                                <button onClick={clearFilters} className="text-[10px] font-bold text-orange-600 underline">Clear filters</button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {skillCategories.map((cat, i) => (
                        <button key={i} onClick={() => setActiveCategory(i)}
                          className={`cat-pill w-full p-4 xl:p-5 rounded-2xl text-left flex items-center gap-4 transition-all duration-400 border-2 ${activeCategory === i
                            ? "bg-white dark:bg-zinc-900 shadow-xl border-l-4 scale-[1.02]"
                            : "bg-transparent border-transparent opacity-40 hover:opacity-100 hover:bg-white/50 dark:hover:bg-zinc-900/30"
                            }`}
                          style={activeCategory === i ? { borderLeftColor: cat.color } : {}}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors`}
                            style={activeCategory === i ? { backgroundColor: cat.color, color: "#fff" } : { backgroundColor: "transparent" }}>
                            <cat.icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black uppercase tracking-widest truncate">{cat.title}</h4>
                            <p className="text-[10px] font-bold text-zinc-400">{cat.skills.length} Skills</p>
                          </div>
                          {activeCategory === i && <ChevronRight size={14} style={{ color: cat.color }} />}
                        </button>
                      ))}

                      {/* CTA */}
                      <div className="mt-6 p-6 xl:p-8 rounded-3xl text-white relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, #ea580c 0%, #c2410c 100%)` }}>
                        <Flame className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10" />
                        <h5 className="text-lg font-black uppercase tracking-tighter italic mb-2 leading-tight">
                          High Velocity<br />Dev.
                        </h5>
                        <p className="text-[11px] opacity-80 mb-5 leading-relaxed">AI-first, production-ready builds.</p>
                        <Link href="/contact" className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-white text-orange-600 px-4 py-2 rounded-full hover:scale-105 transition-transform">
                          Build <ChevronRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </aside>

                  {/* ── SKILLS GRID ── */}
                  <div className="lg:col-span-8 xl:col-span-9">

                    {/* Mobile category strip */}
                    <div className="lg:hidden mb-5">
                      <CategoryStrip categories={skillCategories} active={activeCategory} onSelect={setActiveCategory} />
                    </div>

                    {/* Mobile filter */}
                    <div className="lg:hidden mb-5">
                      <button onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${showFilters ? "bg-orange-600 text-white" : "bg-white dark:bg-zinc-900 text-zinc-400 border border-zinc-200 dark:border-zinc-800"}`}>
                        <Filter size={12} />{showFilters ? "Hide Filters" : "Filters"}
                      </button>
                      <AnimatePresence>
                        {showFilters && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3">
                            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-4">
                              <div className="relative">
                                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                  placeholder="Search skills…"
                                  className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-[11px] font-bold outline-none focus:ring-2 focus:ring-orange-500/40" />
                              </div>
                              <div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Min: {minLevel}%</span>
                                <input type="range" min={0} max={95} step={5} value={minLevel}
                                  onChange={e => setMinLevel(Number(e.target.value))} className="w-full accent-orange-600" />
                              </div>
                              {(searchQuery || minLevel > 0) && (
                                <button onClick={clearFilters} className="text-[10px] font-bold text-orange-600 underline">Clear</button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Category heading */}
                    <AnimatePresence mode="wait">
                      <motion.div key={activeCategory}
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }}
                        className="mb-8 sm:mb-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentCat.color }} />
                          <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: currentCat.color }}>
                            {currentCat.abbr}
                          </span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-2">
                          {currentCat.title}
                        </h2>
                        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 italic max-w-xl">
                          "{currentCat.description}"
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Skill cards */}
                    <AnimatePresence mode="wait">
                      <motion.div key={`${activeCategory}-${searchQuery}-${minLevel}`}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {filteredSkills.length === 0 ? (
                          <div className="col-span-full py-16 text-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30">
                            <Search className="mx-auto mb-4 text-zinc-300" size={32} />
                            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">No matching skills</p>
                            <button onClick={clearFilters} className="text-xs font-bold text-orange-600 underline">Clear filters</button>
                          </div>
                        ) : (
                          filteredSkills.map((skill, idx) => (
                            <SkillCard key={`${activeCategory}-${skill.name}`} skill={skill} catColor={currentCat.color} idx={idx} />
                          ))
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Mobile CTA */}
                    <div className="lg:hidden mt-8 p-6 rounded-2xl text-white relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg,#ea580c,#c2410c)" }}>
                      <Flame className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10" />
                      <h5 className="text-lg font-black uppercase tracking-tighter italic mb-2">High Velocity Dev.</h5>
                      <p className="text-xs opacity-80 mb-4">AI-first, production-ready builds.</p>
                      <Link href="/contact" className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-white text-orange-600 px-4 py-2 rounded-full">
                        Build <ChevronRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══ PROJECTS ════════════════════════════════ */}
            {activeTab === "projects" && (
              <motion.div key="projects"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              >
                <div className="mb-10 sm:mb-14">
                  <h2 className="scroll-reveal-heading text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                    Key<br /><span className="text-orange-600 italic">Projects.</span>
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-lg">
                    Flagship builds that combine AI, real-time systems, and enterprise-grade architecture.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                  {keyProjects.map((project, i) => (
                    <div key={i} className="project-card group p-7 sm:p-9 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-100 dark:border-zinc-800 hover:border-orange-500/30 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-11 h-11 rounded-2xl bg-orange-600/10 text-orange-600 flex items-center justify-center font-black text-sm">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                          {project.highlight}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-3">{project.title}</h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-7 leading-relaxed font-medium">{project.description}</p>
                      <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-600">{project.stack}</span>
                        <ArrowUpRight size={14} className="text-zinc-300 dark:text-zinc-600 group-hover:text-orange-600 group-hover:scale-110 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══ ACHIEVEMENTS ════════════════════════════ */}
            {activeTab === "achievements" && (
              <motion.div key="achievements"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              >
                <div className="mb-10 sm:mb-14">
                  <h2 className="scroll-reveal-heading text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                    Awards &<br /><span className="text-orange-600 italic">Recognition.</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
                  {achievements.map((a, i) => (
                    <div key={i} className="achievement-card flex gap-6 sm:gap-8 p-7 sm:p-9 rounded-3xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-100 dark:border-zinc-800 hover:border-orange-500/20 hover:-translate-y-1 transition-all duration-500">
                      <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-900 dark:bg-[#f5f1e8] text-[#f5f1e8] dark:text-zinc-900 flex items-center justify-center shadow-xl">
                        <Star size={22} className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2.5 italic leading-tight">{a.title}</h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{a.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education block */}
                <div className="achievement-card p-8 sm:p-12 lg:p-16 rounded-[2.5rem] lg:rounded-[3.5rem] bg-zinc-900 dark:bg-[#f5f1e8] text-white dark:text-zinc-900 flex flex-col md:flex-row gap-8 sm:gap-12 lg:gap-16 items-center">
                  <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-orange-600 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-white/10 dark:bg-zinc-900/10 flex items-center justify-center">
                      <GraduationCap size={40} className="text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-7">
                    <h4 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">Academic<br />Foundation</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {[
                        { year: "2023 Graduation", degree: "B.Tech Mechanical", school: "Swarnandhra College · CGPA 7.69" },
                        { year: "2019 Diploma", degree: "Diploma Mechanical", school: "Col. D.S. Raju Polytechnic · 74%" },
                      ].map((edu, i) => (
                        <div key={i}>
                          <p className="text-orange-600 text-[9px] sm:text-xs font-black uppercase tracking-widest mb-1.5">{edu.year}</p>
                          <h5 className="text-base sm:text-xl font-bold mb-1">{edu.degree}</h5>
                          <p className="text-xs sm:text-sm opacity-60">{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* ══════════════════════════════════════════════════
            SECTION 4 — MARQUEE
        ══════════════════════════════════════════════════ */}
        <div ref={marqueeRef} className="py-14 sm:py-20 border-y border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden mt-8">
          <div className="flex will-change-transform marquee-inner" style={{ width: "max-content" }}>
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="flex gap-12 sm:gap-20 items-center pr-12 sm:pr-20">
                {["Ubuntu", "Git", "Postman", "OpenAI", "Supabase", "Pinecone", "Framer Motion", "Vite", "FastAPI", "Strapi", "Redis", "Docker"].map((tool) => (
                  <div key={tool + ri} className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-600" />
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter text-zinc-200 dark:text-zinc-800 hover:text-orange-600 transition-colors duration-300 cursor-default whitespace-nowrap">
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 5 — FOOTER CTA
        ══════════════════════════════════════════════════ */}
        <footer ref={footerRef}>
          <HoverFooter />
        </footer>

      </div>
    </>
  );
}