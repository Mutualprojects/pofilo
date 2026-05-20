"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, MapPin, Send, Loader2, Check, Sparkles, 
  ArrowUpRight, MessageSquare 
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { CoreSpinLoader } from "@/components/CoreSpinLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HoverFooter } from "@/components/HoverFooter";
import { CrowdCanvas } from "@/components/CrowdCanvas";

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

const SheetPilotLogo = () => (
  <div className="flex items-center gap-2 group/sp">
    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-500 text-[10px] transition-all duration-300 group-hover/sp:scale-105 group-hover/sp:bg-emerald-500 group-hover/sp:text-white">
      SP
    </div>
    <span className="font-black text-[10px] tracking-wider text-emerald-500 uppercase font-heading" style={{ fontFamily: "'Syne', sans-serif" }}>
      SHEET PILOT
    </span>
  </div>
);

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const pageRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setResponseMsg(data.message);
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setResponseMsg("Failed to send message.");
    }
  };

  if (!mounted) return null;

  const contactDetails = [
    {
      icon: Mail,
      label: "Email Me",
      value: "sirigineedibalaji4@gmail.com",
      href: "mailto:sirigineedibalaji4@gmail.com",
      description: "Direct inquiry for collaborations, roles, or questions."
    },
    {
      icon: Phone,
      label: "Call or WhatsApp",
      value: "+91 95533 39219",
      href: "tel:+919553339219",
      description: "Available for urgent calls or discussions."
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, Telangana, India",
      href: "https://maps.google.com/?q=Hyderabad,Telangana,India",
      description: "Open to hybrid, onsite (Hyderabad), or remote opportunities."
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/balaji-sirigineedi/",
      icon: LinkedinIcon,
      color: "hover:bg-blue-600/10 hover:text-blue-500 hover:border-blue-500/30"
    },
    {
      name: "GitHub",
      href: "https://github.com/sirigineedibalaji",
      icon: GithubIcon,
      color: "hover:bg-zinc-800/10 hover:text-orange-500 hover:border-orange-500/30"
    }
  ];

  return (
    <>
      {/* --- LOADER --- */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }} 
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-[200]"
          >
            <CoreSpinLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={pageRef} className="min-h-screen bg-[#f5f1e8] dark:bg-[#0c0c0c] text-zinc-900 dark:text-[#f5f1e8] transition-colors duration-500 overflow-x-hidden relative">
        
        {/* --- NOISE TEXTURE --- */}
        <div 
          ref={noiseRef} 
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035] dark:opacity-[0.06]"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, 
            backgroundSize: "256px 256px" 
          }}
        />

        {/* --- NAV --- */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} dark={true} setDark={() => { }} />
        
        <div className="fixed bottom-6 right-6 z-[100] hidden sm:block">
          <ThemeToggle variant="icon" />
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20">
          
          {/* Background grid lines */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(234,88,12,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating glow circles */}
          <div 
            className="absolute top-1/4 right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(234,88,12,0.1) 0%, transparent 70%)" }}
          />
          <div 
            className="absolute bottom-10 left-[5%] w-[350px] h-[350px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 w-full">
            
            {/* Header Content */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-orange-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600">
                  Connect With Me
                </span>
              </div>
              <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-[-0.03em] uppercase">
                Let's Build <br className="hidden sm:inline" />
                Something <span className="text-orange-600 italic">Great.</span>
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg mt-6 font-medium leading-relaxed">
                Have an exciting project, a role suggestion, or just want to chat? Reach out via the form, direct email, or social profiles below.
              </p>
            </div>

            {/* Split Screen Grid */}
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Contact Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  {contactDetails.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target={item.label === "Location" ? "_blank" : "_self"}
                        rel="noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx, duration: 0.5 }}
                        className="group flex gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/80 hover:border-orange-500/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <div className="w-11 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200/30 dark:border-zinc-800/30 text-orange-600 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1 overflow-hidden">
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                            {item.label}
                          </span>
                          <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                            {item.value}
                          </h4>
                          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-normal">
                            {item.description}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Social links */}
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/80 space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block">
                    Follow & Message
                  </span>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-all duration-300 active:scale-95 ${link.color}`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                          <span>{link.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Contact Form */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="p-6 sm:p-10 rounded-[2rem] bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-center gap-2.5 mb-6">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight">
                      Send a Message
                    </h3>
                  </div>

                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-600 shadow-lg shadow-green-500/5">
                          <Check className="w-8 h-8" />
                        </div>
                        <div className="space-y-2 max-w-sm">
                          <h4 className="font-black text-xl text-zinc-900 dark:text-white uppercase tracking-tight">
                            Message Received!
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {responseMsg || "Your message has been successfully saved to Sanity! Balaji will get back to you shortly."}
                          </p>
                        </div>
                        <button
                          onClick={() => setStatus("idle")}
                          className="mt-4 px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-orange-600 dark:hover:bg-orange-500 text-white dark:text-zinc-900 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors active:scale-95"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                              Your Name <span className="text-orange-600">*</span>
                            </label>
                            <input 
                              type="text" 
                              required 
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                              Your Email <span className="text-orange-600">*</span>
                            </label>
                            <input 
                              type="email" 
                              required 
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                            Mobile Number <span className="text-zinc-400/60 font-medium">(Optional)</span>
                          </label>
                          <input 
                            type="tel" 
                            placeholder="+91 98765 43210"
                            value={formData.mobile}
                            onChange={(e) => setFormData(prev => ({...prev, mobile: e.target.value}))}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                            Your Message <span className="text-orange-600">*</span>
                          </label>
                          <textarea 
                            required 
                            rows={5}
                            placeholder="Tell me about your project, idea, or role opportunity..."
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 resize-none transition-all"
                          />
                        </div>

                        <button 
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full mt-3 py-3.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-orange-600 dark:hover:bg-orange-500 text-white dark:text-zinc-900 hover:text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Message</span>
                            </>
                          )}
                        </button>

                        {status === "error" && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-xs font-bold text-center mt-2"
                          >
                            {responseMsg || "Failed to submit. Please try again."}
                          </motion.p>
                        )}
                      </form>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

            </div>
            
          </div>
        </section>

        {/* --- TRUSTED CLIENTS / PARTNERS --- */}
        <section className="relative z-10 py-16 sm:py-20 border-t border-zinc-200/50 dark:border-zinc-900/60 bg-zinc-50/20 dark:bg-zinc-900/5 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
            
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-600 mb-2">
                Proven Track Record
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Trusted By Innovative Companies
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-items-center">
              {[
                { 
                  type: "image", 
                  src: "https://www.brihaspathi.com/_next/image?url=%2Fhighbtlogo-tm-1.png&w=384&q=75", 
                  name: "Brihaspathi Technologies",
                  className: "max-h-7.5 w-auto object-contain dark:brightness-110 dark:contrast-125"
                },
                { 
                  type: "image", 
                  src: "https://skyvolts.in/_next/static/media/Skyvolt.1040268d.png", 
                  name: "Sky Volts",
                  className: "max-h-8 w-auto object-contain dark:brightness-110"
                },
                { 
                  type: "image", 
                  src: "https://www.trinai.in/assets/logo7-BfDqJGlf.png", 
                  name: "Trinai",
                  className: "max-h-7 w-auto object-contain dark:brightness-110 dark:contrast-125"
                },
                { 
                  type: "custom", 
                  component: SheetPilotLogo, 
                  name: "Sheet Pilot" 
                }
              ].map((client, idx) => {
                const LogoComp = client.component;
                return (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="w-full max-w-[170px] min-h-[72px] py-4 px-3 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/80 hover:border-orange-500/20 dark:hover:border-orange-500/20 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-default group"
                  >
                    {client.type === "image" ? (
                      <img 
                        src={client.src} 
                        alt={client.name} 
                        className={`${client.className} grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`} 
                      />
                    ) : (
                      LogoComp && <LogoComp />
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* --- CROWD CANVAS ACCENT --- */}
        <div className="relative w-full h-[250px] sm:h-[300px] overflow-hidden pointer-events-none border-t border-zinc-200/40 dark:border-zinc-900/60 bg-gradient-to-b from-transparent to-zinc-100/30 dark:to-zinc-950/20">
          <CrowdCanvas />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#faf8f5] dark:to-[#030303] pointer-events-none" />
        </div>

        {/* --- FOOTER --- */}
        <HoverFooter />
      </div>
    </>
  );
}
