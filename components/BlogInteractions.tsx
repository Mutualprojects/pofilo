"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Check } from "lucide-react";

export function BlogInteractions({ slug, postId, initialLikes = 0 }: { slug: string, postId: string, initialLikes?: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes); 
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    // Check if user has liked this specific blog using cookies
    const cookies = document.cookie.split(';');
    const hasLiked = cookies.some(c => c.trim().startsWith(`liked_${slug}=true`));
    
    setLiked(hasLiked);
    // Only set it from props initially
  }, [slug]);

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      // Save like state to a cookie valid for 1 year
      document.cookie = `liked_${slug}=true; path=/; max-age=31536000`;
      
      // Update real database
      try {
        await fetch("/api/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, action: "like" }),
        });
      } catch (err) {
        console.error("Error liking post", err);
      }
    } else {
      setLiked(false);
      setLikeCount(prev => prev - 1);
      // Remove cookie
      document.cookie = `liked_${slug}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      
      // Update real database
      try {
        await fetch("/api/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, action: "unlike" }),
        });
      } catch (err) {
        console.error("Error unliking post", err);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2500);
  };

  return (
    <div className="mt-16 pt-8 pb-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-6">
      
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Like Button */}
        <button 
          onClick={handleLike}
          className={`flex items-center gap-3 group transition-colors outline-none ${liked ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-red-500'}`}
        >
          <div className={`p-3.5 rounded-full transition-all duration-300 ${liked ? 'bg-red-50 dark:bg-red-500/10' : 'bg-zinc-100 dark:bg-zinc-900 group-hover:bg-red-50 dark:group-hover:bg-red-500/10'}`}>
            <Heart className={`w-5 h-5 transition-transform duration-300 ${liked ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
          </div>
          <span className="font-bold text-sm tracking-wide">{likeCount} Likes</span>
        </button>

        {/* Comment Button (Mock Action) */}
        <button 
          onClick={() => {
            const commentSection = document.getElementById('comments');
            if (commentSection) commentSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors outline-none"
        >
          <div className="p-3.5 rounded-full bg-zinc-100 dark:bg-zinc-900 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 transition-colors duration-300">
            <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="font-bold text-sm tracking-wide hidden sm:inline-block">Comment</span>
        </button>
      </div>

      {/* Share Button */}
      <div className="relative">
        <button 
          onClick={handleShare}
          className="flex items-center gap-3 group text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors outline-none"
        >
          <span className="font-bold text-sm tracking-wide hidden sm:inline-block">Share Article</span>
          <div className="p-3.5 rounded-full bg-zinc-100 dark:bg-zinc-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors duration-300">
            <Share2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </button>

        <AnimatePresence>
          {showShareTooltip && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              className="absolute -top-12 right-0 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap shadow-xl font-bold uppercase tracking-widest"
            >
              <Check className="w-3.5 h-3.5 text-green-500" /> Copied!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
