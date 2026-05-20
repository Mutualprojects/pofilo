"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sun, Moon, Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <nav className="fixed top-0 w-full z-[60] bg-[#f5f1e8]/80 dark:bg-[#0c0c0c]/80 backdrop-blur-md border-b border-transparent dark:border-zinc-900/50 transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-12 lg:px-24 h-20 flex items-center justify-between">
        <Link href="/" className="font-black text-2xl tracking-tighter text-zinc-900 dark:text-[#f5f1e8]">
          BALAJI<span className="text-[#c2410c] dark:text-orange-500">.</span>
        </Link>
        
        <div className="flex items-center gap-8">
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-500">
            <Link href="/about" className="hover:text-zinc-900 dark:hover:text-[#f5f1e8] transition-colors">About</Link>
            <Link href="/journey" className="hover:text-zinc-900 dark:hover:text-[#f5f1e8] transition-colors">Journey</Link>
            <Link href="/skills" className="hover:text-zinc-900 dark:hover:text-[#f5f1e8] transition-colors">Skills</Link>
            <Link href="/projects" className="hover:text-zinc-900 dark:hover:text-[#f5f1e8] transition-colors">Projects</Link>
            <Link href="/blog" className="text-[#c2410c] dark:text-orange-500 hover:opacity-80 transition-opacity">Blogs</Link>
            <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-[#f5f1e8] transition-colors">Contact</Link>
          </div>

          {/* Global Theme & Menu Controls */}
          <div className="flex items-center gap-4 pl-8 border-l border-zinc-900/10 dark:border-zinc-800">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {isDark ? "Dark" : "Light"}
              </span>
              <button 
                onClick={toggleTheme}
                className="w-12 h-6 rounded-full bg-zinc-900/10 dark:bg-zinc-800 relative flex items-center px-1 transition-colors duration-300"
                aria-label="Toggle Theme"
              >
                <motion.div 
                  animate={{ x: isDark ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4 rounded-full bg-white dark:bg-orange-500 shadow-sm flex items-center justify-center"
                >
                  {isDark ? <Moon className="w-2.5 h-2.5 text-white fill-white" /> : <Sun className="w-2.5 h-2.5 text-zinc-900 fill-zinc-900" />}
                </motion.div>
              </button>
            </div>

            <button 
              onClick={toggleTheme}
              className="md:hidden w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white dark:bg-zinc-900 shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-400 fill-yellow-400" /> : <Moon className="w-4 h-4 text-zinc-900 fill-zinc-900" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1 border border-zinc-900 dark:border-white rounded-full bg-zinc-900 dark:bg-white transition-all active:scale-90"
              aria-label="Toggle Menu"
            >
              <motion.div 
                animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="w-4 h-0.5 bg-white dark:bg-zinc-900 rounded-full" 
              />
              <motion.div 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-4 h-0.5 bg-white dark:bg-zinc-900 rounded-full" 
              />
              <motion.div 
                animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="w-4 h-0.5 bg-white dark:bg-zinc-900 rounded-full" 
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
