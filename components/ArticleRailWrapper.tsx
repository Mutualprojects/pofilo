"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

interface HeadingItem {
  text: string;
  id: string;
  level: "h2" | "h3";
}

export function ArticleRailWrapper({
  post,
  children,
}: {
  post: any;
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = useState("");
  const headingsRef = useRef<HeadingItem[]>([]);

  // Parse headings out of the body on client mount or post change
  useEffect(() => {
    const items: HeadingItem[] = [];
    if (post.body && Array.isArray(post.body)) {
      post.body.forEach((block: any) => {
        if (block._type === "block" && (block.style === "h2" || block.style === "h3")) {
          const text = block.children?.map((c: any) => c.text).join("") || "";
          if (text) {
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            items.push({ text, id, level: block.style });
          }
        }
      });
    }
    headingsRef.current = items;

    // Set initial active state if headings exist
    if (items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [post.body]);

  // Set up intersection observer for active rail highlighting
  useEffect(() => {
    const headings = headingsRef.current;
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // Sort by visibility bounding rect to be super robust
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headingsRef.current]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 120; // safe padding below top fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  const headings = headingsRef.current;

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
      {/* LEFT COLUMN: Sticky Outline Rail */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-36 max-h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-thin select-none">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-[#C2F84F] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500" style={{ fontFamily: "'Syne', sans-serif" }}>
              Table of Contents
            </span>
          </div>

          <nav className="relative pl-4 py-2 border-l border-zinc-200 dark:border-zinc-800">
            {/* Dynamic Active Indicator Dot/Line indicator */}
            <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-orange-500 to-rose-500 dark:from-[#C2F84F] dark:to-emerald-500 scale-y-0 transition-transform duration-500 origin-top" />

            <ul className="space-y-4">
              {headings.map((h) => {
                const isActive = activeId === h.id;
                return (
                  <li key={h.id} className={`${h.level === "h3" ? "pl-4" : ""}`}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => handleScroll(e, h.id)}
                      className={`block text-[11px] font-extrabold uppercase tracking-widest leading-relaxed transition-all duration-300 ${
                        isActive
                          ? "text-orange-600 dark:text-[#C2F84F] translate-x-2 font-black"
                          : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* RIGHT COLUMN: Scrolling Main Content */}
      <main className="col-span-1 lg:col-span-9 max-w-3xl">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {children}
        </div>

        {/* Dynamic Article Footer inside scroller */}
        <div className="mt-24 pt-16 border-t border-zinc-100 dark:border-zinc-900/60 flex flex-col items-center text-center">
          <Sparkles className="w-10 h-10 text-orange-500 mb-6" />
          <h4 className="text-2xl font-black uppercase tracking-tighter mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Thanks for reading
          </h4>
          <p className="text-zinc-500 dark:text-zinc-400 mb-12 max-w-md text-sm leading-relaxed">
            I hope you found this article insightful. Feel free to share it with your network or reach out to discuss these topics further.
          </p>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 bg-zinc-900 dark:bg-[#C2F84F] text-[#f5f1e8] dark:text-zinc-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Archive
          </Link>
        </div>
      </main>
    </div>
  );
}
