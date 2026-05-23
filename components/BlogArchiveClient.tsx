"use client"

import React, { useMemo, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowRight, BookOpen, Search, X, ChevronDown, RefreshCw, Mail, Heart, MessageCircle, Share2, Check } from 'lucide-react'
import { urlFor } from "@/lib/image"

// ─────────────────────────────────────────
// 🧩 Type Definitions
// ─────────────────────────────────────────
interface FilterState {
  category: string | null
  search: string
  sortBy: 'newest' | 'oldest'
}

// Helper to dynamically categorize posts if they don't have a category field
const getCategory = (post: any) => {
  if (post.category) return post.category;
  if (post.tags && post.tags.length > 0) {
    const firstTag = post.tags[0];
    return typeof firstTag === 'string' ? firstTag : (firstTag.name || firstTag.tag || "Insights");
  }
  
  const title = post.title?.toLowerCase() || "";
  if (title.includes("ai") || title.includes("gpt") || title.includes("intelligence") || title.includes("agent")) return "AI Integration";
  if (title.includes("react") || title.includes("next") || title.includes("frontend") || title.includes("ui") || title.includes("css")) return "Frontend";
  if (title.includes("database") || title.includes("api") || title.includes("backend") || title.includes("system") || title.includes("architecture")) return "System Architecture";
  
  return "Full-Stack";
};

// ─────────────────────────────────────────
// ✨ Premium UI Components
// ─────────────────────────────────────────

function PremiumBadge({
  children,
  variant = 'default',
  className = '',
  onClick
}: {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'accent' | 'outline'
  className?: string
  onClick?: () => void
}) {
  const variants = {
    default: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80',
    primary: 'bg-orange-500 text-white border-orange-500/20',
    accent: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    outline: 'bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400',
  }

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest border rounded-full transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

function SearchInput({
  value,
  onChange,
  placeholder = "Search insights...",
  className = ""
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 pl-12 pr-12 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-200 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 font-bold text-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function SortDropdown({
  value,
  onChange
}: {
  value: FilterState['sortBy']
  onChange: (value: FilterState['sortBy']) => void
}) {
  const options: { value: FilterState['sortBy']; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
  ]

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
        className="appearance-none w-full h-14 pl-5 pr-12 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-500 transition-all duration-200 text-zinc-900 dark:text-white font-bold text-sm cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="dark:bg-zinc-900">{opt.label}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// 🃏 Premium Blog Card & Skeleton Components
// ─────────────────────────────────────────
function BlogCardSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden aspect-[4/5] relative">
      <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/50" />
      <div className="absolute inset-x-8 bottom-8 space-y-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700/80 rounded w-1/3" />
        <div className="h-7 bg-zinc-200 dark:bg-zinc-700/80 rounded w-3/4" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700/80 rounded w-5/6" />
      </div>
    </div>
  )
}

function BlogCard({ post, index }: { post: any; index: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    // Check if user previously liked it via cookies
    const cookies = document.cookie.split(';');
    const hasLiked = cookies.some(c => c.trim().startsWith(`liked_${post.slug}=true`));
    
    setLiked(hasLiked);
    // Use real Sanity likes, fallback to 0 if undefined
    setLikeCount(post.likes || 0);
  }, [post.slug, post.likes]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the article
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      document.cookie = `liked_${post.slug}=true; path=/; max-age=31536000`;
      
      // Update real database
      try {
        await fetch("/api/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId: post._id, action: "like" }),
        });
      } catch (err) {
        console.error("Error liking post", err);
      }
    } else {
      setLiked(false);
      setLikeCount(prev => prev - 1);
      document.cookie = `liked_${post.slug}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      
      // Update real database
      try {
        await fetch("/api/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId: post._id, action: "unlike" }),
        });
      } catch (err) {
        console.error("Error unliking post", err);
      }
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}/blog/${post.slug}`;
    navigator.clipboard.writeText(url);
    setShowShare(true);
    setTimeout(() => setShowShare(false), 2000);
  };

  const publishedDate = useMemo(() => {
    try {
      return new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    } catch {
      return 'Recently Published'
    }
  }, [post.publishedAt])

  const imageUrl = useMemo(() => {
    if (post.mainImage) {
      try {
        return urlFor(post.mainImage).url();
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  }, [post.mainImage])

  const readTime = useMemo(() => {
    const words = post.overview?.split(' ').length || 150
    return Math.ceil(words / 180)
  }, [post.overview])

  const category = useMemo(() => getCategory(post), [post])

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group relative flex flex-col h-full"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-orange-500/10">
          
          {/* Main Image */}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />
          )}

          {/* Inner Glow and Dark Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 dark:opacity-80 z-10" />
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_80px_rgba(0,0,0,0.4)] pointer-events-none z-15" />

          {/* Top-Left Category Badge */}
          <div className="absolute top-6 left-6 z-20">
            <span className="inline-flex items-center px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/90 dark:bg-zinc-950/90 text-orange-600 dark:text-orange-400 border border-white/20 dark:border-zinc-800/80 rounded-full shadow-sm">
              {category}
            </span>
          </div>

          {/* Content Overlaid on Card */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
            
            {/* Meta Info */}
            <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-widest text-orange-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{publishedDate}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400/40" />
              <span>{readTime} min read</span>
            </div>

            {/* Title */}
            <h2 
              className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter mb-4 group-hover:text-orange-400 transition-colors line-clamp-3 uppercase" 
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-zinc-300 text-sm line-clamp-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
              {post.overview || "Read my latest thoughts on technology and development architecture."}
            </p>

            {/* Action Trigger & Interactions Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-auto">
              {/* Interaction Metrics */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-red-500' : 'text-zinc-400 hover:text-red-400'}`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span className="text-xs font-bold">{likeCount}</span>
                </button>

                <div className="flex items-center gap-1.5 text-zinc-400">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-bold">{(likeCount % 12) + 2}</span>
                </div>

                <div className="relative">
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-400 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {showShare && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-green-400" /> Copied
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Read Article Arrow */}
              <div className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-orange-400 transition-colors">
                <span className="hidden sm:inline-block">Read</span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </Link>
  )
}

// ─────────────────────────────────────────
// 📊 Category Filter
// ─────────────────────────────────────────
function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
  stats
}: {
  categories: string[]
  activeCategory: string | null
  onSelect: (category: string | null) => void
  stats?: Record<string, number>
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(null)}
        className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 border ${
          activeCategory === null
            ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
            : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400'
        }`}
      >
        All Insights
        {stats && <span className="ml-2 opacity-75">({Object.values(stats).reduce((a, b) => a + b, 0)})</span>}
      </motion.button>

      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 border flex items-center gap-2 ${
            activeCategory === cat
              ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
              : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400'
          }`}
        >
          {cat}
          {stats?.[cat] !== undefined && (
            <span className={`opacity-75 ${activeCategory === cat ? 'text-white' : 'text-zinc-400'}`}>
              ({stats[cat]})
            </span>
          )}
        </motion.button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────
// 🎯 Main Editorial Archive Client Component
// ─────────────────────────────────────────
export function BlogArchiveClient({ initialPosts }: { initialPosts: any[] }) {
  const [mounted, setMounted] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    search: '',
    sortBy: 'newest'
  })
  const [displayCount, setDisplayCount] = useState(9)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enriched blogs data with fallback categories
  const enrichedBlogs = useMemo(() => {
    return initialPosts.map(post => ({
      ...post,
      assignedCategory: getCategory(post)
    }))
  }, [initialPosts])

  // Extract unique categories with counts
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {}
    enrichedBlogs.forEach((post) => {
      const cat = post.assignedCategory
      stats[cat] = (stats[cat] || 0) + 1
    })
    return stats
  }, [enrichedBlogs])

  const categories = useMemo(() => {
    return Object.keys(categoryStats).sort()
  }, [categoryStats])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = enrichedBlogs.filter((post) => {
      const matchesCategory = !filters.category || post.assignedCategory === filters.category
      const matchesSearch = !filters.search ||
        post.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.overview?.toLowerCase().includes(filters.search.toLowerCase())
      return matchesCategory && matchesSearch
    })

    // Apply sorting
    if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    } else {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
    }

    return result
  }, [enrichedBlogs, filters])

  // Handlers
  const handleCategorySelect = useCallback((category: string | null) => {
    setFilters(prev => ({ ...prev, category }))
    setDisplayCount(9) // Reset display count on filter change
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
    setDisplayCount(9) // Reset display count on filter change
  }, [])

  const handleSortChange = useCallback((sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }))
  }, [])

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 6)
      setIsLoadingMore(false)
    }, 600)
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({ category: null, search: '', sortBy: 'newest' })
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500">
      
      {/* 🌌 State-of-the-art Neon Orbs Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden flex items-center justify-center bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500 border-b border-zinc-200/30 dark:border-zinc-800/30">
        
        {/* Top-left orb */}
        <div
          className={`absolute transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
          style={{
            top: "-40%",
            left: "-20%",
            width: "80vw",
            height: "80vw",
            maxWidth: "800px",
            maxHeight: "800px",
          }}
        >
          <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
            <div className="beam-container beam-spin-8">
              <div className="beam-light" />
            </div>
          </div>
        </div>

        {/* Bottom-center orb */}
        <div
          className={`absolute transition-all duration-1000 ease-out delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            bottom: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            height: "100vw",
            maxWidth: "1000px",
            maxHeight: "1000px",
          }}
        >
          <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
            <div className="beam-container beam-spin-10-reverse">
              <div className="beam-light" />
            </div>
          </div>
        </div>

        {/* Top-right orb */}
        <div
          className={`absolute transition-all duration-1000 ease-out delay-500 ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{
            top: "-30%",
            right: "-25%",
            width: "70vw",
            height: "70vw",
            maxWidth: "700px",
            maxHeight: "700px",
          }}
        >
          <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
            <div className="beam-container beam-spin-6">
              <div className="beam-light" />
            </div>
          </div>
        </div>

        {/* Bottom-right orb */}
        <div
          className={`absolute transition-all duration-1000 ease-out delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            bottom: "-35%",
            right: "-15%",
            width: "75vw",
            height: "75vw",
            maxWidth: "750px",
            maxHeight: "750px",
          }}
        >
          <div className="w-full h-full rounded-full relative orb-light transition-all duration-500">
            <div className="beam-container beam-spin-7-reverse">
              <div className="beam-light" />
            </div>
          </div>
        </div>

        {/* Center text */}
        <div className="relative z-10 text-center text-zinc-900 dark:text-white transition-colors duration-500 px-6">
          <div className="flex justify-center mb-6">
            <PremiumBadge variant="accent" className="animate-pulse">
              Insights & Thoughts
            </PremiumBadge>
          </div>
          
          <h1 
            className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tighter uppercase mb-6 text-zinc-900 dark:text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {"MY BLOGS".split("").map((char, i) => (
              <span
                key={i}
                className={`inline-block transition-all duration-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${400 + i * 50}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          
          <p 
            className="text-sm md:text-base font-black tracking-[0.3em] uppercase text-orange-600 dark:text-orange-400 transition-all duration-1000 ease-out"
            style={{ transitionDelay: "1000ms", fontFamily: "'Syne', sans-serif" }}
          >
            THE FUTURE IS NOW
          </p>
        </div>

        {/* Custom Scroller indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            Scroll Down
          </span>
          <div className="w-5 h-8 border-2 border-zinc-300 dark:border-zinc-700 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 rounded-full bg-orange-500"
            />
          </div>
        </div>

        {/* Global Styles for Spinning beams and orbs custom-colored to orange */}
        <style dangerouslySetInnerHTML={{ __html: `
          .beam-container {
            position: absolute;
            inset: -2px;
            border-radius: 50%;
            will-change: transform;
          }
          
          .beam-light {
            position: absolute;
            top: 0;
            left: 50%;
            width: 60px;
            height: 4px;
            margin-left: -30px;
            border-radius: 2px;
            transform: translateY(-50%);
            transition: all 0.5s;
            
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(249, 115, 22, 0.4) 30%,
              rgba(249, 115, 22, 0.8) 70%,
              rgba(249, 115, 22, 1) 100%
            );

            box-shadow: 
              0 0 20px 4px rgba(249, 115, 22, 0.6),
              0 0 40px 8px rgba(249, 115, 22, 0.3);
          }
          
          .dark .beam-light {
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(249, 115, 22, 0.5) 30%,
              rgba(253, 186, 116, 0.9) 70%,
              rgba(254, 215, 170, 1) 100%
            );

            box-shadow: 
              0 0 20px 4px rgba(249, 115, 22, 0.8),
              0 0 40px 8px rgba(253, 186, 116, 0.4);
          }
          
          .orb-light {
            background: radial-gradient(
              circle at 50% 50%,
              #fafaf9 0%,
              #f5f1e8 85%,
              transparent 100%
            );

            box-shadow: 
              0 0 60px 2px rgba(249, 115, 22, 0.15),
              0 0 100px 5px rgba(249, 115, 22, 0.08),
              inset 0 0 60px 2px rgba(249, 115, 22, 0.04);

            border: 1px solid rgba(249, 115, 22, 0.2);
          }
          
          .dark .orb-light {
            background: radial-gradient(
              circle at 50% 50%,
              #18181b 0%,
              #0c0c0c 85%,
              transparent 100%
            );

            box-shadow: 
              0 0 60px 2px rgba(249, 115, 22, 0.3),
              0 0 100px 5px rgba(249, 115, 22, 0.15),
              inset 0 0 60px 2px rgba(249, 115, 22, 0.08);

            border: 1px solid rgba(249, 115, 22, 0.3);
          }
          
          .beam-spin-6 {
            animation: spin 6s linear infinite;
          }
          
          .beam-spin-7-reverse {
            animation: spin-reverse 7s linear infinite;
          }
          
          .beam-spin-8 {
            animation: spin 8s linear infinite;
          }
          
          .beam-spin-10-reverse {
            animation: spin-reverse 10s linear infinite;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
        ` }} />
      </section>

      {/* Main Content: Controls, Active Filters, Cards Grid */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white/85 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl shadow-lg shadow-zinc-200/5 dark:shadow-none border border-zinc-200/60 dark:border-zinc-800/80 p-5 md:p-6">
            <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
              {/* Category Filters */}
              <div className="flex-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                <CategoryFilter
                  categories={categories}
                  activeCategory={filters.category}
                  onSelect={handleCategorySelect}
                  stats={categoryStats}
                />
              </div>

              {/* Search & Sort */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="w-full sm:w-72">
                  <SearchInput
                    value={filters.search}
                    onChange={handleSearchChange}
                    placeholder="Search articles..."
                  />
                </div>
                <div className="w-full sm:w-52">
                  <SortDropdown
                    value={filters.sortBy}
                    onChange={handleSortChange}
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.category || filters.search) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-2"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Active filters:</span>
                {filters.category && (
                  <PremiumBadge variant="outline" className="cursor-pointer" onClick={() => handleCategorySelect(null)}>
                    {filters.category} ×
                  </PremiumBadge>
                )}
                {filters.search && (
                  <PremiumBadge variant="outline" className="cursor-pointer" onClick={() => handleSearchChange('')}>
                    "{filters.search}" ×
                  </PremiumBadge>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs font-black uppercase tracking-widest text-orange-500 hover:text-orange-600 transition-colors ml-auto"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filters.category}-${filters.search}-${filters.sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-16"
          >
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filteredPosts.slice(0, displayCount).map((post, index) => (
                  <BlogCard key={post._id} post={post} index={index} />
                ))}
                
                {isLoadingMore && Array.from({ length: 3 }).map((_, i) => (
                  <BlogCardSkeleton key={`loading-more-${i}`} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24 bg-white/50 dark:bg-zinc-900/10 rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-850/30 shadow-inner relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                    <BookOpen className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-tighter" style={{ fontFamily: "'Syne', sans-serif" }}>No Insights Found</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto leading-relaxed font-medium">
                    We couldn't find any articles matching your search query or filters. Try adjusting your fields or explore other categories.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetFilters}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-md shadow-zinc-950/10"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {filteredPosts.length > displayCount && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-3 px-10 py-5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-lg disabled:opacity-50"
            >
              {isLoadingMore ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Loading Articles...
                </>
              ) : (
                <>
                  Load More Articles
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Premium Footer CTA (Newsletter Subscription) */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-orange-600 to-yellow-500 dark:from-orange-700 dark:to-amber-500 text-white relative overflow-hidden shadow-2xl shadow-orange-500/10 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20 backdrop-blur-md">
              <Mail className="w-5 h-5 text-white" />
            </div>
            
            <h3 
              className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter" 
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Stay Ahead of the Curve
            </h3>
            
            <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium">
              Subscribe to receive premium executive briefs, system design architectures, and advanced engineering articles directly in your inbox.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 h-14 px-6 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white transition-all text-white placeholder-white/60 font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-8 h-14 bg-white text-orange-600 hover:bg-orange-50 font-black uppercase text-xs tracking-widest rounded-2xl shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </form>
            
            <p className="mt-6 text-[10px] text-white/50 font-black uppercase tracking-wider">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.footer>
      </main>
    </div>
  )
}

