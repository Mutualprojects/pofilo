"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import {
  MapPin,
  Download,
  Brain,
  Code2,
  Server,
  Database,
  Layers,
  GitBranch,
  GraduationCap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { CoreSpinLoader } from "@/components/CoreSpinLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HoverFooter } from "@/components/HoverFooter";

// Register GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DESIGN TOKENS (Aligned with Hero) ---
const COLORS = {
  cream: "#f5f1e8",
  charcoal: "#0c0c0c",
  orange: "#ea580c",
  terracotta: "#c2410c",
  amber: "#f59e0b",
};

// --- ICONS (From your recent updates) ---
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// --- FUTURISTIC 3D BACKGROUND ---
function NeuralParticles() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const points = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = 1.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i * 3 + 2] = r * Math.cos(phi);
    }
    return points;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={COLORS.orange}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// --- DATA ---
const skills = [
  { icon: Brain, label: "GenAI & LLMs", desc: "OpenAI, RAG, Vector Search, Prompt Engineering", level: 92 },
  { icon: Code2, label: "Backend Engineering", desc: "Python, Django, Node.js, Scalable APIs", level: 95 },
  { icon: Server, label: "Full Stack", desc: "Next.js, React, Vite, TypeScript", level: 94 },
  { icon: Database, label: "Data Ops", desc: "PostgreSQL, Supabase, ChromaDB, Pinecone", level: 88 },
  { icon: GitBranch, label: "Cloud & Linux", desc: "Ubuntu, Git, API Deployment, CI/CD", level: 82 },
  { icon: Layers, label: "Computer Vision", desc: "RTSP Streams, Anomaly Detection, VMS", level: 85 },
];

const experience = [
  {
    year: "2023 - Present",
    role: "Jr. Software Developer",
    org: "Brihaspathi Technologies",
    impact: "Built AI Visitor Management and Secure File Intelligence systems using GenAI & RAG.",
  },
  {
    year: "2023 - 2024",
    role: "District Coordinator",
    org: "AP State Elections",
    impact: "Managed ANPR vehicle tracking & real-time analytics for 7 constituencies.",
  },
  {
    year: "2023",
    role: "B.Tech Graduation",
    org: "Swarnandhra College",
    impact: "Mechanical Engineering degree with a pivot to Advanced Software Systems.",
  },
];

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

const stats = [
  { value: "1500+", label: "Commits" },
  { value: "10+", label: "Deployments" },
  { value: "2+", label: "Years Exp" },
  { value: "1", label: "National Award" },
];

const gallery = [
  { src: "/5T0A2784.JPG.jpeg", label: "Professional Workspace" },
  { src: "/WhatsApp Image 2026-05-12 at 12.07.36 AM.jpeg", label: "System Research" },
  { src: "/WhatsApp Image 2026-05-12 at 12.37.14 AM.jpeg", label: "Engineering Milestone" },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && mounted) {
      const ctx = gsap.context(() => {
        gsap.to(".hero-content", {
          yPercent: 30,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            }
          });
        });
      });
      return () => ctx.revert();
    }
  }, [loading, mounted]);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <CoreSpinLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0c0c0c] text-zinc-900 dark:text-[#f5f1e8] transition-colors duration-500 selection:bg-orange-500/20">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Syne:wght@700;800&display=swap');
          
          body { font-family: 'Outfit', sans-serif; overflow-x: hidden; }
          .font-heading { font-family: 'Syne', sans-serif; }
          
          .glass-card {
            background: rgba(0, 0, 0, 0.02);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }
          
          .dark .glass-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }

          .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
          }
        `}</style>

        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} dark={true} setDark={() => {}} />

        <div className="fixed bottom-10 right-10 z-[100]">
          <ThemeToggle variant="icon" />
        </div>

        <main ref={scrollRef}>
          {/* --- HERO --- */}
          <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <Canvas camera={{ position: [0, 0, 1] }}>
                 <NeuralParticles />
               </Canvas>
            </div>

            <div className="hero-content relative z-10 text-center max-w-4xl px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center justify-center gap-3"
              >
                <div className="h-[1px] w-12 bg-orange-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600">Architecting Intelligence</span>
                <div className="h-[1px] w-12 bg-orange-600" />
              </motion.div>

              <h1 className="font-heading text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.9] tracking-tighter uppercase mb-8">
                About <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-terracotta text-glow">Balaji.</span>
              </h1>
            </div>
          </section>

          {/* --- CONTENT --- */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-40 space-y-32">
            
            {/* BIO SECTION */}
            <div className="grid lg:grid-cols-5 gap-20 items-center reveal">
               <div className="lg:col-span-3">
                  <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">
                    The <span className="text-orange-600 italic">Vision.</span>
                  </h2>
                  <div className="space-y-6 text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                    <p>
                      I translate complex mechanical principles into efficient, high-performance digital solutions.
                    </p>
                    <p>
                      Leading AI-driven projects at **Brihaspathi Technologies**, focusing on real-time analytics and scalable infrastructure.
                    </p>
                  </div>
                  <div className="mt-12 flex flex-wrap gap-8 items-center">
                     <Link href="mailto:sirigineedibalaji4@gmail.com" className="px-10 py-5 bg-zinc-900 dark:bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform">Get In Touch</Link>
                     <div className="flex gap-6">
                        <a href="https://github.com/SirigineediBalaji" target="_blank" className="p-4 rounded-xl glass-card hover:text-orange-600 transition-colors"><GithubIcon className="w-5 h-5" /></a>
                        <a href="https://linkedin.com/in/sirigineedi-balaji" target="_blank" className="p-4 rounded-xl glass-card hover:text-orange-600 transition-colors"><LinkedinIcon className="w-5 h-5" /></a>
                     </div>
                  </div>
               </div>
               
               <div className="lg:col-span-2">
                  <div className="relative aspect-[4/5] max-w-[320px] mx-auto rounded-[3rem] overflow-hidden border-[12px] border-white dark:border-zinc-800 shadow-2xl">
                    <Image
                      src="/WhatsApp Image 2026-05-12 at 12.07.36 AM.jpeg"
                      alt="Sirigineedi Balaji"
                      fill
                      className="object-cover"
                    />
                  </div>
               </div>
            </div>

            {/* GALLERY SECTION */}
            <section className="reveal">
               <div className="mb-16 flex items-end justify-between">
                  <div>
                    <h3 className="font-heading text-4xl font-bold uppercase tracking-tighter">Presence & <span className="text-orange-600 italic">Impact.</span></h3>
                    <p className="text-zinc-500 text-sm mt-3 font-medium">Moments from the professional journey.</p>
                  </div>
                  <div className="h-[1px] flex-1 bg-zinc-900/10 dark:bg-white/10 mx-10 hidden lg:block" />
               </div>
               
               <div className="image-grid">
                  {gallery.map((img, i) => (
                    <div key={i} className="group relative flex flex-col gap-6">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-zinc-900/5 dark:border-white/5 shadow-xl">
                            <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="flex items-center justify-between px-4">
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{img.label}</span>
                            <div className="h-[1px] w-12 bg-orange-600 opacity-40" />
                        </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* TRAJECTORY SECTION */}
            <section className="reveal">
               <h3 className="font-heading text-5xl font-bold uppercase tracking-tighter mb-16 text-center">Trajectory.</h3>
               <div className="max-w-4xl mx-auto grid gap-6">
                  {experience.map((item, i) => (
                    <div key={i} className="group relative p-10 rounded-[2rem] border border-zinc-900/10 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.02] transition-all flex flex-col md:flex-row gap-10 md:items-center">
                       <div className="md:w-48 shrink-0">
                          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-2">{item.year}</div>
                          <h4 className="text-xl font-bold text-zinc-900 dark:text-white uppercase leading-none">{item.role}</h4>
                       </div>
                       <div className="flex-1">
                          <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium leading-relaxed mb-1">{item.org}</p>
                          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{item.impact}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* RESUMES: THE DOSSIER */}
            <section id="resumes" className="reveal pt-20 border-t border-zinc-900/10 dark:border-white/10">
               <div className="max-w-4xl mx-auto">
                  <h3 className="font-heading text-3xl font-bold uppercase tracking-tighter mb-12">The <span className="text-orange-600 italic">Dossier.</span></h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                      { img: "/WhatsApp Image 2026-05-12 at 12.05.49 AM.jpeg", label: "General", file: "/Balaji_S_resume_may2025 (2).pdf" },
                      { img: "/WhatsApp Image 2026-05-12 at 12.05.49 AM (1).jpeg", label: "Wipro Special", file: "/Balaji_Wipro_Final.docx" },
                    ].map((doc, i) => (
                      <div key={i} className="group relative">
                          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-900/10 dark:border-white/10 shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                             <Image src={doc.img} alt={doc.label} fill className="object-cover" />
                             <div className="absolute inset-0 bg-zinc-900/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                                <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4">{doc.label} Resume</h4>
                                <div className="flex gap-3">
                                  <a href={doc.file} target="_blank" className="px-4 py-2 bg-white text-zinc-900 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-colors">Open</a>
                                  <a href={doc.file} download className="w-10 h-10 flex items-center justify-center bg-orange-600 text-white rounded-lg hover:scale-110 transition-transform">
                                     <Download size={14} />
                                  </a>
                                </div>
                             </div>
                          </div>
                      </div>
                    ))}
                    
                    <div className="hidden md:flex flex-col justify-center p-8 rounded-2xl border-2 border-dashed border-zinc-900/10 dark:border-white/10 bg-zinc-900/[0.02] dark:bg-white/[0.02]">
                        <h4 className="text-xs font-bold uppercase tracking-tight text-zinc-400">Next Chapter</h4>
                        <p className="text-[9px] text-zinc-500 mt-2 uppercase tracking-widest leading-loose">Always evolving, always building.</p>
                    </div>
                  </div>
               </div>
            </section>

          </div>
        </main>

        <HoverFooter />
      </div>
    </>
  );
}