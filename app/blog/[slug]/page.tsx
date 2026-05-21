import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import { BlogHeaderWrapper } from "@/components/BlogHeaderWrapper";
import { HoverFooter } from "@/components/HoverFooter";
import { ArticleRailWrapper } from "@/components/ArticleRailWrapper";

export const revalidate = 0;

async function getPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      publishedAt,
      mainImage,
      body,
      "slug": slug.current,
      "authorName": author->name,
      "authorImage": author->image
    }
  `;
  return await client.fetch(query, { slug }, { next: { revalidate: 0 } });
}

// Custom Portable Text components with automatic ID mapping for the scroll anchor links
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative w-full aspect-video my-12 overflow-hidden rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog Image"}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          {value.caption && (
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white text-xs font-medium">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => {
      const text = children?.[0] || "";
      const id = typeof text === "string"
        ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        : "";
      return (
        <h2 id={id} className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-[#f5f1e8] mt-16 mb-6 tracking-tighter uppercase scroll-mt-28" style={{ fontFamily: "'Syne', sans-serif" }}>
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const text = children?.[0] || "";
      const id = typeof text === "string"
        ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        : "";
      return (
        <h3 id={id} className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-[#f5f1e8] mt-12 mb-4 tracking-tighter uppercase scroll-mt-28" style={{ fontFamily: "'Syne', sans-serif" }}>
          {children}
        </h3>
      );
    },
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-[#f5f1e8] mt-10 mb-3 tracking-tighter uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-zinc-600 dark:text-zinc-400 text-base leading-[1.8] mb-6 font-medium">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-orange-500 pl-8 my-10 italic text-2xl font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900/50 py-8 pr-8 rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-none space-y-4 mb-8">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-8 mb-8 space-y-4 text-zinc-600 dark:text-zinc-400">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-4 text-zinc-600 dark:text-zinc-400 text-base font-medium leading-relaxed">
        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2.5 shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-black text-zinc-900 dark:text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-zinc-800 dark:text-zinc-200">{children}</em>,
    code: ({ children }: any) => <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-orange-500 font-mono text-sm">{children}</code>,
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-orange-500 underline decoration-2 underline-offset-4 hover:text-orange-600 transition-colors">
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0b]">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Post not found</h1>
          <Link href="/blog" className="text-orange-500 underline">Back to Archive</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500">
      <BlogHeaderWrapper />
      <article className="pb-32">

        {/* Hero Header */}
        <header className="pt-40 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1.5px] bg-orange-500" />
              <span className="text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]" style={{ fontFamily: "'Syne', sans-serif" }}>
                Technical Article
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1] tracking-tighter uppercase mb-12 text-zinc-900 dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 p-0.5">
                  {post.authorImage ? (
                    <Image src={urlFor(post.authorImage).url()} alt={post.authorName} width={48} height={48} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-black">SB</div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Author</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">{post.authorName || "Sirigineedi Balaji"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Published</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Reading Time</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">6 Min Read</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Image */}
        {post.mainImage && (
          <div className="max-w-7xl mx-auto px-6 mb-24">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[3rem] shadow-2xl border border-zinc-100 dark:border-zinc-800">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </div>
        )}

        {/* Sticky Heading Outline Rail & Scrolling Content Column */}
        <ArticleRailWrapper post={post}>
          <PortableText value={post.body} components={ptComponents} />
        </ArticleRailWrapper>

      </article>
      <HoverFooter />
    </div>
  );
}
