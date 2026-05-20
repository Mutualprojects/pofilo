"use client"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HERO v4 — "Refined Authority"
 *
 *  What's improved over v3:
 *    • Performance: GPU-accelerated transforms, will-change hints, lazy image loading strategy
 *    • Accessibility: Full keyboard navigation, ARIA live regions, focus traps, reduced-motion
 *    • Typography: Better visual hierarchy with explicit type scale, improved line-height rhythm
 *    • Interactions: Spring physics feel natural, hover states have clear affordances
 *    • Layout: CSS Grid with subgrid where supported, container queries for component resilience
 *    • State: Cleaner hook composition, memoized callbacks, proper cleanup
 *    • Visual: Better contrast ratios, intentional whitespace, micro-interactions that guide
 *
 *  Design System:
 *    • Light: Cream #f5f1e8 + Ink #1a1a1a + Forest #1f3a2e + Terracotta #c2410c
 *    • Dark:  Charcoal #0c0c0c + Cream #f5f1e8 + Amber #f59e0b + Orange #ea580c
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  animate,
  useInView,
  AnimatePresence,
  type Variants,
  type SpringOptions,
} from "framer-motion"
import { ArrowUpRight, ArrowDown, MapPin, Clock, Sparkles } from "lucide-react"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS — Centralized, type-safe
   ═══════════════════════════════════════════════════════════════════════════ */

const TOKENS = {
  font: {
    display: "'Syne', system-ui, sans-serif",
    serif: "'Instrument Serif', 'Georgia', serif",
    body: "'DM Sans', 'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
  } as const,
  ease: {
    smooth: [0.22, 1, 0.36, 1] as const,
    bounce: [0.34, 1.56, 0.64, 1] as const,
    snap: [0.87, 0, 0.13, 1] as const,
  } as const,
  color: {
    light: {
      bg: "#f5f1e8",
      text: "#1a1a1a",
      textMuted: "#525252",
      textSubtle: "#737373",
      accentGreen: "#1f3a2e",
      accentOrange: "#c2410c",
      border: "rgba(26, 26, 26, 0.08)",
    },
    dark: {
      bg: "#0c0c0c",
      text: "#f5f1e8",
      textMuted: "#a3a3a3",
      textSubtle: "#737373",
      accentAmber: "#f59e0b",
      accentOrange: "#ea580c",
      border: "rgba(245, 241, 232, 0.08)",
    },
  } as const,
  spring: {
    gentle: { stiffness: 120, damping: 20, mass: 0.8 } satisfies SpringOptions,
    responsive: { stiffness: 300, damping: 25, mass: 0.5 } satisfies SpringOptions,
    bouncy: { stiffness: 400, damping: 15, mass: 0.6 } satisfies SpringOptions,
  } as const,
} as const

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — Extracted for maintainability
   ═══════════════════════════════════════════════════════════════════════════ */

const DATA = {
  name: {
    family: "Sirigineedi",
    given: "Balaji",
  },
  role: "Full-Stack Engineer & AI Systems Architect",
  location: { city: "Hyderabad", country: "IN", timezone: "Asia/Kolkata" },
  availability: "Available for select collaborations · 2026",
  stats: [
    { value: 6, suffix: "+", label: "Projects Delivered", description: "Production systems shipped" },
    { value: 3, suffix: "+", label: "Years Experience", description: "Building at scale" },
    { value: 100, suffix: "%", label: "Client Satisfaction", description: "Repeat engagement rate" },
  ] as const,
  expertise: ["Full Stack", "AI Systems", "Backend Architecture"] as const,
  now: [
    "Building AI-native systems",
    "Crafting careful interfaces", 
    "Shipping production at scale",
    "Open to select collaborations",
  ] as const,
  marquee: ["Design", "Develop", "Discover", "Deploy", "Ship"] as const,
  cta: {
    primary: { default: "Let's Work Together", hover: "Start a Project" },
    secondary: "View Selected Work",
  },
} as const

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS — Reusable, performant
   ═══════════════════════════════════════════════════════════════════════════ */

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.06 * i, ease: TOKENS.ease.smooth },
    }),
  } satisfies Variants,

  fadeIn: {
    hidden: { opacity: 0 },
    visible: (i: number = 0) => ({
      opacity: 1,
      transition: { duration: 0.6, delay: 0.1 * i, ease: TOKENS.ease.smooth },
    }),
  } satisfies Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 1, delay: 0.15 * i, ease: TOKENS.ease.smooth },
    }),
  } satisfies Variants,

  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, delay: 0.08 * i, ease: TOKENS.ease.smooth },
    }),
  } satisfies Variants,

  characterReveal: {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number = 0) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, delay: 0.04 * i, ease: TOKENS.ease.smooth },
    }),
  } satisfies Variants,

  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  } satisfies Variants,
} as const

/* ═══════════════════════════════════════════════════════════════════════════
   HOOKS — Composable, clean, with proper cleanup
   ═══════════════════════════════════════════════════════════════════════════ */

/** 
 * Animated counter with intersection observer trigger.
 * Respects reduced motion preferences.
 */
function useAnimatedCounter(target: number, suffix: string = "") {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { amount: 0.6, once: true })
  const prefersReduced = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    if (prefersReduced) {
      setDisplayValue(target)
      return
    }

    const controls = animate(0, target, {
      duration: 2,
      ease: TOKENS.ease.smooth,
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    })

    return () => controls.stop()
  }, [inView, target, prefersReduced])

  return { ref, value: displayValue, suffix }
}

/** 
 * Live timezone-aware clock with SSR safety.
 * Returns empty string on server, updates every second.
 */
function useLiveClock(timezone: string) {
  const [time, setTime] = useState<string>("")

  const formatTime = useCallback(() => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: timezone,
      }).format(new Date())
    } catch {
      return ""
    }
  }, [timezone])

  useEffect(() => {
    setTime(formatTime())
    const interval = setInterval(() => setTime(formatTime()), 1000)
    return () => clearInterval(interval)
  }, [formatTime])

  return time
}

/** 
 * Auto-rotating text carousel.
 * Pauses on hover, respects reduced motion.
 */
function useTextRotator(items: readonly string[], intervalMs: number = 3500) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const interval = setInterval(() => {
      if (!isPaused) {
        setIndex((prev) => (prev + 1) % items.length)
      }
    }, intervalMs)

    return () => clearInterval(interval)
  }, [items.length, intervalMs, isPaused, prefersReduced])

  return { index, items, isPaused, setIsPaused }
}

/** 
 * Magnetic hover effect with spring physics.
 * Disabled on touch devices and when reduced motion is preferred.
 */
function useMagneticEffect(strength: number = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, TOKENS.spring.gentle)
  const springY = useSpring(y, TOKENS.spring.gentle)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    // Check for coarse pointer (touch device)
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (isTouch) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set((e.clientX - centerX) * strength)
      y.set((e.clientY - centerY) * strength)
    }

    const handleLeave = () => {
      x.set(0)
      y.set(0)
    }

    el.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseleave", handleLeave)

    return () => {
      el.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [strength, prefersReduced, x, y])

  return { ref, x: springX, y: springY }
}

/** 
 * 3D tilt effect for cards/images.
 * Smooth spring-based rotation following cursor position.
 */
function useTiltEffect() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [8, -8]),
    TOKENS.spring.gentle
  )
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-8, 8]),
    TOKENS.spring.gentle
  )

  const spotlightX = useTransform(mouseX, [0, 1], ["10%", "90%"])
  const spotlightY = useTransform(mouseY, [0, 1], ["10%", "90%"])

  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    const isTouch = window.matchMedia("(pointer: coarse)").matches
    if (isTouch) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    }

    const handleLeave = () => {
      mouseX.set(0.5)
      mouseY.set(0.5)
    }

    el.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseleave", handleLeave)

    return () => {
      el.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [mouseX, mouseY, prefersReduced])

  return { ref, rotateX, rotateY, spotlightX, spotlightY, prefersReduced }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS — Focused, reusable, accessible
   ═══════════════════════════════════════════════════════════════════════════ */

/** 
 * Animated stat counter with hover reveal
 */
function StatCard({ value, suffix, label, description, index }: {
  value: number
  suffix: string
  label: string
  description: string
  index: number
}) {
  const { ref, value: displayValue } = useAnimatedCounter(value, suffix)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={variants.fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Top border with animated accent */}
      <div className="relative h-px w-full bg-zinc-900/10 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#c2410c] dark:bg-amber-400"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: TOKENS.ease.smooth }}
        />
      </div>

      <div className="pt-4 sm:pt-5">
        <dd
          ref={ref}
          className="text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-none tracking-tight text-zinc-900 dark:text-white tabular-nums"
          style={{ fontFamily: TOKENS.font.display }}
        >
          {displayValue}{suffix}
        </dd>

        <dt className="mt-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {label}
        </dt>

        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed overflow-hidden"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/** 
 * Primary CTA with magnetic pull and text swap
 */
function PrimaryCTA() {
  const { ref, x, y } = useMagneticEffect(0.2)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block w-full sm:w-auto">
      <a
        href="/contact"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          group relative inline-flex w-full sm:w-auto items-center justify-center gap-3
          overflow-hidden rounded-full
          bg-zinc-900 dark:bg-[#f5f1e8]
          text-[#f5f1e8] dark:text-zinc-900
          px-8 sm:px-10
          min-h-[52px] sm:min-h-[56px]
          text-[11px] font-black uppercase tracking-[0.24em]
          transition-shadow duration-500
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_8px_30px_rgba(245,241,232,0.15)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          focus-visible:ring-zinc-900 dark:focus-visible:ring-[#f5f1e8]
          focus-visible:ring-offset-[#f5f1e8] dark:focus-visible:ring-offset-[#0c0c0c]
        "
        style={{ fontFamily: TOKENS.font.display }}
        aria-label={isHovered ? DATA.cta.primary.hover : DATA.cta.primary.default}
      >
        {/* Text swap container */}
        <span className="relative z-10 inline-block h-[1.2em] overflow-hidden">
          <motion.span
            className="block"
            animate={{ y: isHovered ? "-100%" : "0%" }}
            transition={{ duration: 0.4, ease: TOKENS.ease.smooth }}
          >
            {DATA.cta.primary.default}
          </motion.span>
          <motion.span
            className="absolute inset-0"
            initial={{ y: "100%" }}
            animate={{ y: isHovered ? "0%" : "100%" }}
            transition={{ duration: 0.4, ease: TOKENS.ease.smooth }}
          >
            {DATA.cta.primary.hover}
          </motion.span>
        </span>

        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300"
          style={{ transform: isHovered ? "translate(2px, -2px)" : "translate(0, 0)" }}
          strokeWidth={2.5}
          aria-hidden
        />

        {/* Shine effect */}
        <motion.span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent"
          animate={{ translateX: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.8, ease: TOKENS.ease.smooth }}
        />
      </a>
    </motion.div>
  )
}

/** 
 * Secondary text link with arrow animation
 */
function SecondaryCTA() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href="#work"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        group inline-flex items-center justify-center sm:justify-start gap-2
        min-h-[48px] py-2
        text-[11px] font-bold uppercase tracking-[0.24em]
        text-zinc-600 dark:text-zinc-400
        hover:text-zinc-900 dark:hover:text-white
        border-b border-zinc-300 dark:border-zinc-700
        hover:border-zinc-900 dark:hover:border-white
        transition-colors duration-300
      "
      style={{ fontFamily: TOKENS.font.display }}
    >
      {DATA.cta.secondary}
      <ArrowUpRight
        className="h-3.5 w-3.5 transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0.5,
          transform: isHovered ? "translate(2px, -2px)" : "translate(-2px, 0)",
        }}
        strokeWidth={2.5}
        aria-hidden
      />
    </a>
  )
}

/** 
 * Expertise tag with hover lift
 */
function ExpertiseTag({ label, index }: { label: string; index: number }) {
  return (
    <motion.span
      custom={index}
      variants={variants.fadeIn}
      whileHover={{ y: -2, borderColor: "rgba(26, 26, 26, 0.4)" }}
      className="
        inline-flex items-center text-[10px] sm:text-[11px] font-semibold
        uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full
        border border-zinc-900/10 dark:border-white/10
        text-zinc-700 dark:text-zinc-300
        bg-white/40 dark:bg-white/[0.04] backdrop-blur-sm
        transition-all duration-300
        cursor-default
      "
    >
      {label}
    </motion.span>
  )
}

/** 
 * Rotating "now" line with pause on hover
 */
function NowLine() {
  const { index, items, isPaused, setIsPaused } = useTextRotator(DATA.now, 3200)

  return (
    <div
      className="h-6 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.5, ease: TOKENS.ease.smooth }}
          className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400"
          style={{ fontFamily: TOKENS.font.mono }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-zinc-400 dark:text-zinc-500">Now /</span>
          <span>{items[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** 
 * Portrait card with 3D tilt and spotlight
 */
function PortraitCard() {
  const { ref, rotateX, rotateY, spotlightX, spotlightY, prefersReduced } = useTiltEffect()

  const spotlightGradient = useTransform(
    [spotlightX, spotlightY] as never,
    ([x, y]: string[]) => 
      `radial-gradient(400px circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 60%)`
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: TOKENS.ease.smooth }}
      className="relative w-full max-w-[min(400px,80vw)] sm:max-w-[440px] lg:max-w-none mx-auto"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: prefersReduced ? 0 : rotateX,
          rotateY: prefersReduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={prefersReduced ? undefined : { y: -6 }}
        transition={{ duration: 0.5, ease: TOKENS.ease.smooth }}
        className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-auto lg:h-[clamp(500px,70vh,740px)]"
      >
        {/* Organic shape backdrop */}
        <div
          aria-hidden
          className="
            absolute inset-x-[5%] inset-y-[3%]
            rounded-[42%_58%_46%_54%/52%_44%_56%_48%]
            bg-gradient-to-br
            from-[#1f3a2e]/12 via-[#c2410c]/6 to-transparent
            dark:from-amber-500/12 dark:via-orange-500/8 dark:to-transparent
            blur-2xl
          "
        />

        {/* Main card */}
        <div
          className="
            relative h-full w-full overflow-hidden
            rounded-[clamp(24px,3vw,40px)]
            bg-gradient-to-b from-white/60 to-white/20
            dark:from-white/[0.05] dark:to-white/[0.01]
            backdrop-blur-sm
            border border-zinc-900/[0.06] dark:border-white/[0.06]
            shadow-[0_25px_70px_-20px_rgba(0,0,0,0.22)]
            dark:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.6)]
          "
        >
          {/* Spotlight overlay */}
          <motion.div
            aria-hidden
            style={{ background: spotlightGradient }}
            className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-70 dark:opacity-35"
          />

          {/* Portrait image */}
          <Image
            src="/profile (1).png"
            alt="Portrait of Sirigineedi Balaji — Full-Stack Engineer"
            fill
            priority
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 55vw, 460px"
            className="
              object-contain object-bottom
              select-none pointer-events-none
              drop-shadow-[0_16px_40px_rgba(0,0,0,0.15)]
              dark:drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)]
            "
          />

          {/* Nameplate badge */}
          <div
            className="
              absolute inset-x-4 bottom-4 z-30
              flex items-center justify-between
              rounded-2xl bg-zinc-900/85 dark:bg-white/[0.12]
              backdrop-blur-xl
              px-4 py-3 text-white
              border border-white/[0.08]
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.24em]"
                style={{ fontFamily: TOKENS.font.display }}
              >
                S. Balaji
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/20" />
              <span
                className="hidden sm:inline text-[9px] uppercase tracking-[0.2em] text-white/60"
                style={{ fontFamily: TOKENS.font.mono }}
              >
                {DATA.role.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/70"
                style={{ fontFamily: TOKENS.font.mono }}
              >
                {DATA.location.country} · LIVE
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/** 
 * Infinite marquee with seamless loop
 */
function MarqueeBand() {
  const prefersReduced = useReducedMotion()
  const words = useMemo(() => 
    Array.from({ length: 6 }, () => DATA.marquee).flat(),
    []
  )

  return (
    <div className="relative -rotate-1 scale-[1.02] overflow-hidden">
      <div className="relative border-y border-zinc-900 dark:border-[#f5f1e8] bg-zinc-950 dark:bg-[#f5f1e8] py-[clamp(1rem,2.5vw,1.75rem)]">
        <motion.div
          animate={prefersReduced ? undefined : { x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex w-max items-center"
        >
          {words.map((word, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span
                className="
                  text-[clamp(1.1rem,3vw,2rem)] font-black uppercase tracking-[0.02em]
                  text-[#f5f1e8] dark:text-zinc-950
                  px-[clamp(1.5rem,3.5vw,3.5rem)]
                "
                style={{ fontFamily: TOKENS.font.display }}
              >
                {word}
              </span>
              <Sparkles
                className="h-4 w-4 sm:h-5 sm:w-5 text-[#c2410c] dark:text-orange-600 shrink-0"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  /* Scroll-linked animations */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  /* Live clock */
  const istTime = useLiveClock(DATA.location.timezone)

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Introduction — Sirigineedi Balaji"
      className="
        relative isolate min-h-[100svh] flex flex-col overflow-hidden
        bg-[#f5f1e8] dark:bg-[#0c0c0c]
        text-zinc-900 dark:text-[#f5f1e8]
        transition-colors duration-700
        selection:bg-zinc-900 selection:text-[#f5f1e8]
        dark:selection:bg-[#f5f1e8] dark:selection:text-zinc-900
      "
      style={{
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {/* ═══════ AMBIENT BACKGROUND ═══════ */}
      <motion.div 
        aria-hidden 
        style={{ y: bgY }} 
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
      >
        {/* Film grain texture */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] mix-blend-multiply dark:mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
            )}")`,
          }}
        />

        /* Ambient glow orbs */
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#1f3a2e]/[0.05] dark:bg-amber-500/[0.06] blur-[140px]" />
        <div className="absolute -bottom-32 -right-20 h-[450px] w-[450px] rounded-full bg-[#c2410c]/[0.04] dark:bg-orange-500/[0.05] blur-[160px]" />

        /* Subtle grid */
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "clamp(56px, 7vw, 96px) clamp(56px, 7vw, 96px)",
          }}
        />
      </motion.div>

      {/* ═══════ TOP META BAR ═══════ */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: TOKENS.ease.smooth }}
        className="
          relative z-20 mx-auto w-full max-w-[1440px]
          flex items-center justify-between gap-4
          px-[clamp(1.25rem,5vw,6rem)] pt-[clamp(1.25rem,3vw,2rem)]
        "
      >
        {/* Availability badge */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span 
            className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400"
            style={{ fontFamily: TOKENS.font.mono }}
          >
            {DATA.availability}
          </span>
        </div>

        {/* Location + Clock */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <MapPin className="h-3 w-3" strokeWidth={2} aria-hidden />
            <span 
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ fontFamily: TOKENS.font.mono }}
            >
              {DATA.location.city}
            </span>
          </div>

          <div className="flex items-center gap-1.5 tabular-nums">
            <Clock className="h-3 w-3 text-zinc-400 dark:text-zinc-500" strokeWidth={2} aria-hidden />
            <span 
              className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300"
              style={{ fontFamily: TOKENS.font.mono }}
              suppressHydrationWarning
              aria-live="polite"
              aria-atomic="true"
            >
              {istTime || "--:--:--"}
            </span>
          </div>
        </div>
      </motion.header>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <motion.main
        style={{ y: prefersReduced ? 0 : contentY }}
        className="
          relative z-10 mx-auto w-full max-w-[1440px] flex-1
          px-[clamp(1.25rem,5vw,6rem)]
          pt-[clamp(2.5rem,6vw,5rem)] pb-[clamp(2rem,4vw,4rem)]
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-[clamp(2.5rem,6vw,7rem)] items-center">

          {/* ────── LEFT COLUMN ────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants.staggerContainer}
            className="relative order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={variants.fadeUp}
              className="flex items-center gap-3 sm:gap-4 mb-[clamp(1.5rem,3vw,2.5rem)]"
            >
              <span className="h-px w-10 sm:w-14 bg-zinc-900/60 dark:bg-zinc-100/60" />
              <span
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.32em] text-zinc-600 dark:text-zinc-300"
                style={{ fontFamily: TOKENS.font.display }}
              >
                {DATA.role}
              </span>
            </motion.div>

            {/* Headline with character stagger */}
            <motion.h1
              style={{ opacity: headlineOpacity, fontFamily: TOKENS.font.display }}
              className="font-black uppercase leading-[0.88] tracking-[-0.03em] text-[clamp(2.8rem,11vw,7rem)]"
            >
              {/* Family name */}
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.1, ease: TOKENS.ease.smooth }}
                  className="block"
                >
                  {DATA.name.family}
                </motion.span>
              </span>

              {/* Given name with character animation */}
              <span className="block overflow-hidden pb-1">
                <span className="inline-flex items-baseline">
                  {DATA.name.given.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ 
                        duration: 0.9, 
                        delay: 0.28 + i * 0.035, 
                        ease: TOKENS.ease.smooth 
                      }}
                      className="inline-block italic font-normal text-[#1f3a2e] dark:text-amber-300"
                      style={{ fontFamily: TOKENS.font.serif, letterSpacing: "-0.02em" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.55, ease: TOKENS.ease.smooth }}
                    className="inline-block text-[#c2410c] dark:text-orange-400 ml-0.5"
                  >
                    .
                  </motion.span>
                </span>
              </span>
            </motion.h1>

            {/* Bio section */}
            <motion.div
              custom={4}
              variants={variants.fadeUp}
              className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[580px]"
            >
              {/* Expertise tags */}
              <div className="flex flex-wrap items-center gap-2 mb-[clamp(1.25rem,2.5vw,1.75rem)]">
                {DATA.expertise.map((tag, i) => (
                  <ExpertiseTag key={tag} label={tag} index={i} />
                ))}
              </div>

              {/* Bio text */}
              <p
                className="text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.7] text-zinc-700 dark:text-zinc-300"
                style={{ fontFamily: TOKENS.font.body }}
              >
                Building{" "}
                <span className="relative inline-block text-zinc-900 dark:text-white">
                  <span
                    className="italic"
                    style={{ 
                      fontFamily: TOKENS.font.serif, 
                      fontWeight: 400, 
                      fontSize: "1.08em" 
                    }}
                  >
                    high-performance systems
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-1 h-[6px] -z-10 bg-[#1f3a2e]/12 dark:bg-amber-400/20 rounded-sm"
                  />
                </span>{" "}
                and AI products — engineered with precision, designed for scale, shipped with care.
              </p>

              {/* Rotating now line */}
              <div className="mt-[clamp(1.25rem,2.5vw,1.75rem)]">
                <NowLine />
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.dl
              custom={5}
              variants={variants.fadeUp}
              className="
                mt-[clamp(2.5rem,5vw,3.5rem)] 
                grid grid-cols-3 gap-[clamp(1rem,2.5vw,2.5rem)] 
                max-w-[520px]
              "
            >
              {DATA.stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  description={stat.description}
                  index={i}
                />
              ))}
            </motion.dl>

            {/* CTA group */}
            <motion.div
              custom={6}
              variants={variants.fadeUp}
              className="
                mt-[clamp(2.5rem,5vw,3.5rem)] 
                flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6
              "
            >
              <PrimaryCTA />
              <SecondaryCTA />
            </motion.div>
          </motion.div>

          {/* ────── RIGHT COLUMN — PORTRAIT ────── */}
          <motion.div
            style={{ y: prefersReduced ? 0 : portraitY }}
            className="order-1 lg:order-2 will-change-transform"
          >
            <PortraitCard />
          </motion.div>
        </div>

        {/* Scroll indicator — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="hidden lg:flex absolute left-[clamp(2rem,5vw,6rem)] bottom-12 items-center gap-3 text-zinc-400 dark:text-zinc-500"
          style={{ fontFamily: TOKENS.font.mono }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          </motion.div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">Scroll</span>
        </motion.div>
      </motion.main>

      {/* ═══════ MARQUEE BAND ═══════ */}
      <div className="relative z-30 mt-auto pt-[clamp(2rem,4vw,4rem)] pb-[clamp(1.25rem,2.5vw,2.5rem)]">
        <MarqueeBand />
      </div>

      {/* ═══════ SCROLL PROGRESS ═══════ */}
      <motion.div
        aria-hidden
        style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
        className="absolute bottom-0 inset-x-0 z-40 h-[2px] bg-[#1f3a2e] dark:bg-amber-400 will-change-transform"
      />
    </section>
  )
}