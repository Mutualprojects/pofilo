"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Database,
  Cpu,
  Globe,
  Layout,
  Terminal,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  Download,
  Zap,
  Star
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TechStack } from "@/components/TechStack";
import { Hero } from "@/components/Hero";
import { CoreSpinLoader } from "@/components/CoreSpinLoader";
import { MobileMenu } from "@/components/MobileMenu";
import { AboutHome } from "@/components/AboutHome";
import { SkillsSection } from "@/components/SkillsSection";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AchievementsSection } from "@/components/ProcessAchievements";
import { ProcessWorkflowSection } from "@/components/ProcessWorkflow";
import { MyProcess } from "@/components/MyProcess";

import { HoverFooter } from "@/components/HoverFooter";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <CoreSpinLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0c0c0c] text-zinc-900 dark:text-[#f5f1e8] transition-colors duration-500 overflow-x-clip">

        {/* --- Mobile Navigation --- */}
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} dark={isDark} setDark={toggleTheme} />

        {/* --- Navbar --- */}
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[100] hidden lg:flex items-center h-14">
          <ThemeToggle variant="icon" />
        </div>

        {/* --- Hero Section --- */}
        <Hero />

        {/* --- Detailed About/Resume Section --- */}
        <AboutHome />

        {/* --- Skills Proficiency Section --- */}
        <SkillsSection />

        {/* --- Achievements Section --- */}
        <AchievementsSection />
        {/* --- Process Section --- */}
        <MyProcess />

        {/* --- Tech Stack Animation Section --- */}
        <TechStack />


        {/* Footer */}
        <HoverFooter />
      </div>
    </>
  );
}