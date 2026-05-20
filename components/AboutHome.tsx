"use client"

import { motion } from "framer-motion"
import { Sparkles, Cpu, Target, ArrowRight, Briefcase, GraduationCap, ShieldCheck } from "lucide-react"

export function AboutHome() {
  return (
    <section id="about-home" className="relative py-24 md:py-32 bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-12 lg:px-24 xl:px-32 relative z-10">
        
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 xl:gap-32 items-center">
          
          {/* --- LEFT: The Story --- */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-[#c2410c] dark:bg-orange-500" />
              <span className="text-[#c2410c] dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]" style={{ fontFamily: "'Syne', sans-serif" }}>
                My Narrative
              </span>
            </div>

            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tighter uppercase mb-10 text-zinc-900 dark:text-[#f5f1e8]" style={{ fontFamily: "'Syne', sans-serif" }}>
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c2410c] to-orange-400 dark:from-orange-500 dark:to-yellow-500">Me.</span>
            </h2>

            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-[600px]">
              <p>
                I am a driven Full Stack Developer who swapped mechanical gears for efficient code. 
                With a background in **Mechanical Engineering**, I bring a unique problem-solving 
                perspective to the digital world—focusing on precision, scale, and high-performance systems.
              </p>
              <p>
                Currently at **Brihaspathi Technologies**, I specialize in building AI-integrated 
                applications and scalable backends. From district-level election surveillance 
                to complex SaaS platforms, I thrive on making a real-world impact through innovative code.
              </p>
            </div>

            <motion.button 
              whileHover={{ x: 5 }}
              className="mt-12 flex items-center gap-4 text-zinc-900 dark:text-[#f5f1e8] font-black uppercase text-xs tracking-widest group"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Learn the full story <ArrowRight className="w-4 h-4 text-[#c2410c] dark:text-orange-500 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* --- RIGHT: Quick Highlights --- */}
          <div className="grid grid-cols-1 gap-6">
            {[
              { 
                Icon: Cpu, 
                title: "AI Integration", 
                desc: "Expertise in OpenAI, FaceNet, and LLAMA3.2 for real-time systems.",
                color: "bg-[#1f3a2e]/5 dark:bg-emerald-900/10"
              },
              { 
                Icon: Target, 
                title: "Scalable Architecture", 
                desc: "Building RESTful services and MERN platforms for 1000+ users.",
                color: "bg-zinc-900/5 dark:bg-zinc-900/40"
              },
              { 
                Icon: Sparkles, 
                title: "Awarded Impact", 
                desc: "Honored with the District Collector Award for AI Surveillance systems.",
                color: "bg-[#c2410c]/5 dark:bg-orange-900/10"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl ${item.color} border border-black/5 dark:border-white/5 flex gap-6 items-start transition-transform hover:-translate-y-1`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm shrink-0">
                  <item.Icon className="w-6 h-6 text-zinc-900 dark:text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {item.title}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* --- EDUCATION & WORK EXPERIENCE SECTION (Inspired by reference) --- */}
        <div className="mt-32 pt-32 border-t border-zinc-900/10 dark:border-zinc-800">
          {/* Reference-style Heading */}
          <div className="mb-24">
            <h3 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
              <span className="block text-zinc-900 dark:text-[#f5f1e8]">My Education</span>
              <span className="block text-zinc-900/10 dark:text-zinc-800">And Work</span>
              <span className="block text-zinc-900/10 dark:text-zinc-800">Experience</span>
            </h3>
          </div>

          {/* Alternating Timeline with Spring Animations */}
          <div className="relative max-w-5xl mx-auto py-12">
            {/* Center Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1.5px] bg-zinc-900/10 dark:bg-zinc-800 hidden md:block" />

            <div className="space-y-24 md:space-y-32">
              {[
                {
                  type: "work",
                  title: "Full Stack Developer",
                  company: "Brihaspathi Technologies",
                  date: "Dec 2023 – Present",
                  desc: "Leading development of scalable RESTful APIs and AI-integrated applications. Streamlining business workflows with significant efficiency gains.",
                  icon: Briefcase,
                  color: "accent"
                },
                {
                  type: "management",
                  title: "Head District Coordinator",
                  company: "AP MLC Elections · Visakhapatnam",
                  date: "Election Period",
                  desc: "Led the Central Monitoring Hall overseeing statewide live analytics and VMS-based surveillance across all constituencies.",
                  icon: ShieldCheck,
                  color: "zinc"
                },
                {
                  type: "management",
                  title: "District Coordinator",
                  company: "AP State Elections · West Godavari",
                  date: "Election Period",
                  desc: "Managed AI-based surveillance, ANPR vehicle tracking, and real-time analytics for 7 constituencies. Received formal appreciation from the District Collector.",
                  icon: ShieldCheck,
                  color: "zinc"
                },
                {
                  type: "work",
                  title: "Junior Software Developer",
                  company: "Brihaspathi Technologies",
                  date: "2023 – 2024",
                  desc: "Specialized in MERN stack development, building secure role-based file management and identity verification tools.",
                  icon: Cpu,
                  color: "accent"
                },
                {
                  type: "edu",
                  title: "B.Tech – Mechanical Engineering",
                  company: "Swarnandhra College of Engineering",
                  date: "Class of 2023",
                  desc: "Developed a strong foundation in precision engineering and IoT before transitioning to advanced software systems.",
                  icon: GraduationCap,
                  color: "zinc"
                },
                {
                  type: "edu",
                  title: "Diploma – Mechanical Engineering",
                  company: "Col. D.S. Raju Polytechnic",
                  date: "Class of 2019",
                  desc: "Industrial training at Honda, sharpening technical skills in high-stakes mechanical environments.",
                  icon: GraduationCap,
                  color: "zinc"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20, 
                    delay: 0.1 
                  }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content Side */}
                  <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                      <span className={`text-[10px] font-black uppercase tracking-widest mb-2 ${item.color === 'accent' ? 'text-[#c2410c] dark:text-orange-500' : 'text-zinc-500 dark:text-zinc-500'}`}>
                        {item.date}
                      </span>
                      <h4 className="text-2xl font-black text-zinc-900 dark:text-[#f5f1e8] mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</h4>
                      <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">{item.company}</p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </div>

                  {/* Icon Node */}
                  <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-xl transition-transform hover:scale-110 duration-300 ${item.color === 'accent' ? 'bg-[#c2410c] dark:bg-orange-600' : 'bg-zinc-900 dark:bg-[#f5f1e8]'}`}>
                    <item.icon className={`w-6 h-6 fill-current ${item.color === 'accent' ? 'text-white' : 'text-white dark:text-zinc-900'}`} strokeWidth={2.5} />
                    {/* Horizontal connector to center line */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-[1.5px] bg-zinc-900/10 dark:bg-zinc-800 hidden md:block ${i % 2 === 0 ? 'left-full' : 'right-full'}`} />
                  </div>

                  {/* Spacer for empty side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
