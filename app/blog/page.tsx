import { client } from "@/lib/sanity";
import { BlogHeaderWrapper } from "@/components/BlogHeaderWrapper";
import { HoverFooter } from "@/components/HoverFooter";
import { BlogArchiveClient } from "@/components/BlogArchiveClient";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Blog & Insights",
  description: "Deep-dive technical archives on Full-Stack development, AI integration, and high-performance system architecture by Sirigineedi Balaji.",
  openGraph: {
    title: "Engineering Blog & Insights | Sirigineedi Balaji",
    description: "Deep-dive technical archives on Full-Stack development, AI integration, and high-performance system architecture.",
  }
};

export const revalidate = 0;

async function getPosts() {
  const query = `
    *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      overview,
      mainImage,
      category,
      tags
    }
  `;
  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500">
      <BlogHeaderWrapper />
      <BlogArchiveClient initialPosts={posts} />
      <HoverFooter />
    </div>
  );
}
