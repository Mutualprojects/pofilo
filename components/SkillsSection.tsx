"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

const SKILLS = [
  { name: "GenAI & AI Architecture", level: 92 },
  { name: "Backend (Python & Django)", level: 95 },
  { name: "Full Stack (Next.js & React)", level: 94 },
  { name: "Data Ops (Supabase & ChromaDB)", level: 88 },
  { name: "Computer Vision & RTSP", level: 85 },
  { name: "Cloud Ops (Linux & Git)", level: 80 }
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-12 lg:px-24 xl:px-32">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* --- LEFT: The Heading & Story --- */}
          <div>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 bg-[#eae6dc]/40 dark:bg-zinc-950/40 backdrop-blur-sm mb-6 shadow-sm">
                Expertise & Toolkit
              </div>
              <h2 className="text-[clamp(4rem,12vw,8rem)] font-black leading-[0.8] tracking-tighter uppercase mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                <span className="block text-transparent stroke-black stroke-1 dark:stroke-[#f5f1e8]" style={{ WebkitTextStroke: "1px currentColor" }}>My</span>
                <span className="block text-zinc-900 dark:text-[#f5f1e8] relative">
                  Skills<span className="text-orange-500">.</span>
                </span>
              </h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-md">
              Specializing in building high-performance, AI-integrated systems with 
              precision-engineered code. My expertise spans the complete lifecycle 
              from architecture to deployment.
            </p>
          </div>

          {/* --- RIGHT: Animated Skill Bars --- */}
          <div className="space-y-8">
            {SKILLS.map((skill, i) => (
              <div key={skill.name} className="group">
                <div className="grid grid-cols-[1fr_2fr_auto] items-center gap-6 md:gap-12">
                  {/* Skill Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c2410c] dark:bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h4 className="text-sm md:text-base font-black uppercase tracking-widest text-zinc-900 dark:text-orange-50" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {skill.name}
                    </h4>
                  </div>
                  
                  {/* Bar Container */}
                  <div className="h-[2px] w-full bg-zinc-900/10 dark:bg-zinc-800/50 relative overflow-hidden">
                    {/* Progress Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c2410c] to-orange-400 dark:from-orange-600 dark:to-amber-400"
                    />
                  </div>

                  {/* Percentage */}
                  <div className="w-12 text-right">
                    <span className="text-xs font-black text-[#c2410c] dark:text-orange-500 font-mono italic">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
