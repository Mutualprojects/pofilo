"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// --- CUSTOM SOCIAL BRAND ICONS ---
const GithubIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// --- TEXT HOVER EFFECT ---
export const TextHoverEffect = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <div className={cn("w-full h-40 md:h-64 relative overflow-hidden select-none", className)}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          setCursor({ x: e.clientX, y: e.clientY });
        }}
        className="w-full h-full cursor-default"
      >
        <defs>
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ea580c" /> {/* Brand Orange */}
            <stop offset="33%" stopColor="#3a9476" /> {/* Forest Green */}
            <stop offset="66%" stopColor="#f59e0b" /> {/* Amber Accent */}
            <stop offset="100%" stopColor="#c2410c" /> {/* Terracotta */}
          </linearGradient>

          <radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            cx={maskPosition.cx}
            cy={maskPosition.cy}
            r="20%"
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <mask id="text-mask">
            <rect width="100%" height="100%" fill="black" />
            <circle
              cx={maskPosition.cx}
              cy={maskPosition.cy}
              r={hovered ? "35%" : "0%"}
              fill="url(#revealMask)"
              className="transition-all duration-300"
            />
          </mask>
        </defs>

        {/* Stroked background text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="fill-transparent stroke-zinc-300/40 dark:stroke-zinc-800/40 font-heading text-[65px] font-black tracking-[-0.04em] uppercase"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {text}
        </text>

        {/* Animated stroke path text */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="fill-transparent stroke-[#3a9476] dark:stroke-[#ea580c] opacity-30 font-heading text-[65px] font-black tracking-[-0.04em] uppercase"
          style={{ fontFamily: "'Syne', sans-serif" }}
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        >
          {text}
        </motion.text>

        {/* Vibrant masked text revealed on hover */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="url(#textGradient)"
          strokeWidth="0.3"
          fill="url(#textGradient)"
          className="font-heading text-[65px] font-black tracking-[-0.04em] uppercase select-none pointer-events-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
          mask="url(#text-mask)"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

// --- BACKGROUND GRADIENT ---
export const FooterBackgroundGradient = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Light Mode Radial Glows */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] md:h-[600px] opacity-100 dark:opacity-0 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(58, 148, 118, 0.08) 0%, rgba(245, 241, 232, 0) 70%)"
        }}
      />
      {/* Dark Mode Radial Glows */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] md:h-[600px] opacity-0 dark:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(234, 88, 12, 0.08) 0%, rgba(12, 12, 12, 0) 70%)"
        }}
      />
    </div>
  );
};

// --- MAIN HOVER FOOTER ---
export const HoverFooter = () => {
  return (
    <footer className="relative w-full pt-20 md:pt-32 pb-12 bg-[#f5f1e8] dark:bg-[#0c0c0c] border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500 overflow-hidden">
      {/* Dynamic Background Gradient */}
      <FooterBackgroundGradient />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Upper Brand Grid */}
        <div className="grid md:grid-cols-12 gap-16 md:gap-8 items-start mb-16">
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-heading text-3xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                S. Balaji<span className="text-[#ea580c]">.</span>
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3a9476]/10 text-[#3a9476] dark:text-[#52c49a] text-[9px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3a9476] animate-pulse" />
                Available for Projects
              </div>
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-base font-medium leading-relaxed max-w-sm">
              Full-Stack Engineer & AI Systems Architect building high-performance web applications and enterprise automation solutions.
            </p>

            {/* Social Grid */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://github.com/SirigineediBalaji"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 hover:border-[#ea580c]/40 hover:text-[#ea580c] dark:hover:text-[#ea580c] transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com/in/sirigineedi-balaji"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 hover:border-[#3a9476]/40 hover:text-[#3a9476] dark:hover:text-[#52c49a] transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="mailto:sirigineedibalaji4@gmail.com"
                className="p-3 rounded-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 hover:border-[#ea580c]/40 hover:text-[#ea580c] dark:hover:text-[#ea580c] transition-all duration-300 hover:-translate-y-1"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Navigation</p>
            <ul className="flex flex-col gap-3 font-heading text-lg font-bold text-zinc-800 dark:text-zinc-200">
              <li>
                <Link href="/about" className="hover:text-[#ea580c] transition-colors inline-flex items-center gap-1 group">
                  About
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-[#ea580c] transition-colors inline-flex items-center gap-1 group">
                  Skills
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#ea580c] transition-colors inline-flex items-center gap-1 group">
                  Projects
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#ea580c] transition-colors inline-flex items-center gap-1 group">
                  Blog
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Contact</p>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 font-medium">
              <a href="mailto:sirigineedibalaji4@gmail.com" className="flex items-center gap-3 hover:text-[#ea580c] transition-colors">
                <Mail size={16} className="text-[#ea580c]" />
                <span className="text-sm truncate">sirigineedibalaji4@gmail.com</span>
              </a>
              <a href="tel:+919553339219" className="flex items-center gap-3 hover:text-[#ea580c] transition-colors">
                <Phone size={16} className="text-[#3a9476]" />
                <span className="text-sm">+91 95533 39219</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#ea580c]" />
                <span className="text-sm">Hyderabad, Telangana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Majestic TextHoverEffect */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-900/60 pt-4 mb-8">
          <TextHoverEffect text="BALAJI" />
        </div>

        {/* Copyright & Bottom Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-200/40 dark:border-zinc-950/60 text-[11px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          <div>
            © {new Date().getFullYear()} SIRIGINEEDI BALAJI. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-[#ea580c] animate-pulse" />
            <span>CRAFTED WITH PASSION & PRECISION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HoverFooter;
