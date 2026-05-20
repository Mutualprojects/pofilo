"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"

const menuItems = [
  { name: "About", href: "/about" },
  { name: "Journey", href: "/journey" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  dark: boolean
  setDark: (dark: boolean) => void
}

export function MobileMenu({ isOpen, setIsOpen, dark, setDark }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const panelVariants = {
    initial: { y: "-100%" },
    animate: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.17, 0.67, 0, 1] as [number, number, number, number],
        delay: i * 0.08,
      },
    }),
    exit: (i: number) => ({
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: [0.17, 0.67, 0, 1] as [number, number, number, number],
        delay: (3 - i) * 0.05,
      },
    }),
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
          {/* Background Panels */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full flex-1 bg-zinc-900 dark:bg-[#0c0c0c] border-x border-white/5" 
              />
            ))}
          </div>

          {/* Menu Content */}
          <div className="relative h-full w-full flex flex-col p-8 pt-24">
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[15vw] leading-[1.1] font-black text-[#f5f1e8] tracking-tighter hover:italic transition-all active:scale-95 origin-left block"
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-8 flex flex-col gap-8">
              {/* Secondary Theme Toggle inside menu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <p className="text-[#f5f1e8]/60 text-[10px] font-black uppercase tracking-[0.4em]">Appearance</p>
                <button
                  onClick={() => setDark(!dark)}
                  className="p-3 rounded-xl border-2 border-[#f5f1e8]/20 bg-[#f5f1e8]/5 text-[#f5f1e8] flex items-center justify-center transition-all active:scale-90"
                >
                  {dark ? <Sun className="w-5 h-5 text-yellow-300 fill-yellow-300" /> : <Moon className="w-5 h-5 fill-white" />}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <p className="text-[#f5f1e8]/60 text-[10px] font-black uppercase tracking-[0.4em]">Get in touch</p>
                <a 
                  href="mailto:sirigineedibalaji4@gmail.com" 
                  className="text-lg font-black text-[#f5f1e8] border-b-4 border-orange-500 pb-1 block w-fit max-w-full truncate"
                >
                  sirigineedibalaji4@gmail.com
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
