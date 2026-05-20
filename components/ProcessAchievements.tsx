"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ContainerScroll, CardSticky } from "./CardSticky"
import { ZoomIn, X, Award, MapPin, Calendar, Sparkles, ChevronRight } from "lucide-react"

interface AchievementType {
  id: string
  title: string
  description: string
  bg?: string
  image?: string
  badge?: string
  category?: string
  location?: string
  date?: string
}

// Clean, high-impact text-only stack
const DETAILED_ACHIEVEMENTS: AchievementType[] = [
  {
    id: "detail-1",
    title: "Enterprise AI Apps",
    description: "Successfully developed and deployed 6+ production-level AI-integrated and full-stack web applications for enterprise use.",
    bg: "rgb(58,148,118)", // Green
  },
  {
    id: "detail-2",
    title: "Performance Optimization",
    description: "Improved application performance by 40% through API optimization, efficient backend architecture, and automation workflows.",
    bg: "rgb(234, 88, 12)", // Orange
  },
  {
    id: "detail-3",
    title: "AI-Based Systems",
    description: "Built scalable AI-based systems including Visitor Management, Secure File Management, Chatbots, and Task Automation platforms.",
    bg: "rgb(30, 64, 175)", // Deep Blue
  },
  {
    id: "detail-4",
    title: "AP State Elections",
    description: "Managed AI surveillance and analytics operations for AP State Elections across 7 constituencies and received appreciation from the District Collector.",
    bg: "rgb(195,97,158)", // Pink
  },
  {
    id: "detail-5",
    title: "AP MLC Elections",
    description: "Led the Central Monitoring Hall operations for AP MLC Elections with real-time analytics and VMS-based surveillance systems.",
    bg: "rgb(135,95,195)", // Purple
  },
  {
    id: "detail-6",
    title: "OCR & Vector Search",
    description: "Designed and integrated OCR, vector databases, and AI-powered search systems handling 1,000+ enterprise documents.",
    bg: "rgb(202,128,53)", // Golden
  },
  {
    id: "detail-7",
    title: "Automation Platforms",
    description: "Developed scalable Sheets-to-API automation platform reducing manual data handling time by 60%.",
    bg: "rgb(58,148,118)", // Green
  },
  {
    id: "detail-8",
    title: "NEET Surveillance",
    description: "Presented AI-powered video analytics solutions for NEET examination surveillance and anomaly detection to government officials.",
    bg: "rgb(234, 88, 12)", // Orange
  },
  {
    id: "detail-9",
    title: "Mentorship & Leadership",
    description: "Mentored junior developers and conducted internal knowledge-sharing sessions on AI integrations and full-stack development practices.",
    bg: "rgb(30, 64, 175)", // Deep Blue
  },
  {
    id: "detail-10",
    title: "Scalable Web Platforms",
    description: "Delivered responsive and scalable web platforms serving 1,000+ users using React.js, Next.js, Node.js, and modern cloud deployment practices.",
    bg: "rgb(195,97,158)", // Pink
  }
];

// Dedicated Photo Milestones
const VISUAL_EVIDENCE: AchievementType[] = [
  {
    id: "visual-award",
    title: "Exemplary Award 2024",
    description: "Awarded by Brihaspathi Technologies for outstanding technical leadership, exceptional full-stack contributions, and executing robust enterprise AI projects.",
    image: "/WhatsApp Image 2026-05-18 at 10.09.18 PM.jpeg",
    badge: "Excellence",
    category: "Technical Leadership",
    location: "Brihaspathi Technologies",
    date: "2024"
  },
  {
    id: "visual-elections-collector",
    title: "Collector's Appreciation",
    description: "District Collector Award from West Godavari for managing election AI surveillance, ANPR-powered scanning, and live security telemetry across 7 constituencies.",
    image: "/WhatsApp Image 2026-05-18 at 10.12.38 PM.jpeg",
    badge: "National Impact",
    category: "GovTech & Surveillance",
    location: "West Godavari Collectorate",
    date: "2024"
  },
  {
    id: "visual-mlc-hall",
    title: "Central Monitoring Hall",
    description: "Command and control operations for AP MLC Elections, leading live VMS telemetry stream integration and coordinating real-time security alerts.",
    image: "/WhatsApp Image 2026-05-18 at 10.15.33 PM.jpeg",
    badge: "Operations",
    category: "VMS Surveillance Hall",
    location: "Visakhapatnam Collectorate",
    date: "2024"
  }
];

export const AchievementsSection = () => {
  const [activeImage, setActiveImage] = useState<AchievementType | null>(null)

  return (
    <section className="w-full bg-[#f5f1e8] dark:bg-[#0c0c0c] py-24 sm:py-32 lg:py-48 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* --- TOP PORTION: STACKED TEXT MILESTONES --- */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-32">
          {/* Sticky Sidebar Info */}
          <div className="lg:sticky lg:top-40 lg:h-fit">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-800 text-xs font-black uppercase tracking-[0.2em] text-[#3a9476] bg-[#eae6dc] dark:bg-[#121212] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Key Milestones
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-8 uppercase text-zinc-900 dark:text-white">
              Proven <br />
              <span className="text-[#3a9476] relative inline-block">
                Track Record
                <span className="absolute left-0 bottom-0.5 w-full h-[4px] bg-[#3a9476]/30 rounded" />
              </span>{" "}
              & Impact
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-prose">
              A detailed track record of delivering high-performance AI solutions, state-level infrastructure projects, and enterprise automation platforms that drive real-world results.
            </p>
          </div>

          {/* Clean scrolling stacked text cards */}
          <ContainerScroll className="space-y-8 lg:py-12">
            {DETAILED_ACHIEVEMENTS.map((achievement, index) => (
              <CardSticky
                key={achievement.id}
                index={index}
                incrementY={30}
                incrementZ={10}
                className="rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 transition-all duration-500 bg-[#eae6dc] dark:bg-[#121212] shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-zinc-300/40 dark:border-zinc-800/60"
              >
                <div className="flex items-start justify-between gap-4 mb-8">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-tight pr-4 text-zinc-800 dark:text-zinc-100">
                    {achievement.title}
                  </h2>
                  <h3 className="text-4xl font-black italic text-[#3a9476] font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </h3>
                </div>

                <p className="text-base font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {achievement.description}
                </p>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>

        {/* --- BOTTOM PORTION: SEPARATE VISUAL RECOGNITION CARDS --- */}
        <div className="pt-24 border-t border-zinc-300/40 dark:border-zinc-800/40">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a9476]/10 text-[#3a9476] text-[10px] font-black uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Visual Evidence
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none uppercase text-zinc-900 dark:text-white">
              Moments of <span className="text-[#3a9476]">Impact & Recognition</span>
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-prose mt-4">
              Click on any card below to open the official certificates and command operations photography in an immersive fullscreen view.
            </p>
          </div>

          {/* Grid of 3 side-by-side premium visual cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {VISUAL_EVIDENCE.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                onClick={() => setActiveImage(item)}
                className="group relative cursor-pointer flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#eae6dc]/80 dark:bg-[#121212]/80 p-8 border border-zinc-300/50 dark:border-zinc-800/50 shadow-sm hover:shadow-2xl transition-all duration-500 backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="px-3.5 py-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-450 text-[10px] font-black uppercase tracking-wider">
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 font-mono">
                      {item.date}
                    </span>
                  </div>

                  {/* Glassmorphic Image Frame */}
                  <div className="group relative overflow-hidden rounded-2xl border border-zinc-400/20 dark:border-zinc-850/40 mb-6 aspect-[4/3] bg-zinc-200/50 dark:bg-zinc-900/50 shadow-inner">
                    <Image
                      src={item.image!}
                      alt={item.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 text-zinc-900 dark:bg-zinc-900/90 dark:text-white text-[10px] font-black uppercase shadow-lg backdrop-blur-sm">
                        <ZoomIn className="w-3.5 h-3.5" />
                        View Full Screen
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-800 dark:text-zinc-100 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs font-bold uppercase tracking-wider text-[#3a9476] dark:text-[#42a886] mb-4">
                    {item.category}
                  </p>

                  <p className="text-sm font-medium leading-relaxed text-zinc-550 dark:text-zinc-400 mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer detail */}
                <div className="pt-4 border-t border-zinc-300/40 dark:border-zinc-800/40 flex items-center justify-between text-xs font-bold uppercase text-zinc-400 dark:text-zinc-550">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#3a9476]" />
                    {item.location}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#3a9476] transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Immersive Cinematic Lightbox --- */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            {/* Click backdrop to close */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActiveImage(null)} />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative max-w-5xl w-full bg-[#fbf9f4] dark:bg-[#121212] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 z-10"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all backdrop-blur-md border border-white/10"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-12 items-stretch min-h-[450px]">
                {/* Photo Pane */}
                <div className="md:col-span-7 relative bg-black/20 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                  <Image
                    src={activeImage.image!}
                    alt={activeImage.title}
                    fill
                    className="object-contain p-4 md:p-6"
                    priority
                  />
                </div>

                {/* Content Pane */}
                <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-[#f5f1e8] dark:bg-[#0c0c0c] border-t md:border-t-0 md:border-l border-zinc-200/50 dark:border-zinc-800/50">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3a9476]/10 text-[#3a9476] text-[10px] font-black uppercase tracking-wider mb-6">
                      <Award className="w-3.5 h-3.5" />
                      {activeImage.badge}
                    </div>

                    <h3 className="text-2xl font-black tracking-tight uppercase text-zinc-900 dark:text-white mb-2 leading-none">
                      {activeImage.title}
                    </h3>
                    
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">
                      {activeImage.category}
                    </p>

                    <div className="space-y-4 mb-8">
                      {activeImage.location && (
                        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                          <div className="p-2 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50">
                            <MapPin className="w-4 h-4 text-[#3a9476]" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-0.5">Location</p>
                            <p className="font-semibold leading-tight">{activeImage.location}</p>
                          </div>
                        </div>
                      )}
                      
                      {activeImage.date && (
                        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                          <div className="p-2 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50">
                            <Calendar className="w-4 h-4 text-[#3a9476]" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-0.5">Timeline</p>
                            <p className="font-semibold leading-tight">{activeImage.date}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-300/40 dark:border-zinc-800/40">
                    <p className="text-sm font-medium leading-relaxed text-zinc-550 dark:text-zinc-400">
                      {activeImage.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
