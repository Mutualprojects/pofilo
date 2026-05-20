"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 sm:bottom-28 sm:right-8 z-[150] w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 text-zinc-900 dark:text-[#f5f1e8] flex items-center justify-center shadow-lg hover:shadow-2xl hover:border-orange-500/50 dark:hover:border-[#C2F84F]/50 transition-all duration-300 backdrop-blur-md cursor-pointer group"
          aria-label="Scroll to top"
          style={{
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Neon inner glow for dark mode on hover */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-500/5 to-rose-500/5 dark:from-[#C2F84F]/5 dark:to-emerald-500/5" />
          
          {/* Animated Arrow */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowUp className="w-5 h-5 text-orange-600 dark:text-[#C2F84F] group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
