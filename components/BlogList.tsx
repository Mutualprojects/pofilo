"use client"

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/image";

export function BlogList({ posts }: { posts: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {posts.map((post: any, index: number) => (
        <Link 
          key={post._id} 
          href={`/blog/${post.slug}`}
          className="block"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-orange-500/10">
              {/* Actual Image from Sanity */}
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 dark:opacity-80 z-10" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-widest text-orange-400">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter mb-4 group-hover:text-orange-400 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                {post.title}
              </h2>
              
              <p className="text-zinc-300 text-sm line-clamp-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {post.overview || "Read my latest thoughts on technology and development architecture."}
              </p>

              <div className="flex items-center gap-4 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <span>Read Article</span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:bg-white group-hover:text-zinc-900">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    ))}
  </div>
);
}
