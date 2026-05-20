import { client } from "@/lib/sanity";
import { BookOpen } from "lucide-react";
import { BlogList } from "@/components/BlogList";
import { HoverFooter } from "@/components/HoverFooter";
import { BlogHeaderWrapper } from "@/components/BlogHeaderWrapper";

async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      overview,
      mainImage
    }
  `;
  return await client.fetch(query, {}, { next: { revalidate: 3600 } });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500">
      <BlogHeaderWrapper />

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        {/* Header */}
        <header className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[1.5px] bg-orange-500" />
            <span className="text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Insights & Thoughts
            </span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tighter uppercase mb-8 text-zinc-900 dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">Archive.</span>
          </h1>
          <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
            Exploring the intersection of Full-Stack development, AI integration, and high-performance system architecture.
          </p>
        </header>

        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mb-8 border border-zinc-100 dark:border-zinc-800">
              <BookOpen className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">No Posts Found</h3>
            <p className="text-zinc-500 dark:text-zinc-400">The archive is currently empty. Check back soon for new content!</p>
          </div>
        )}
      </main>

      <HoverFooter />
    </div>
  );
}
