import type { ReactNode } from "react";
import BlogReader from "@/components/blog/BlogReader";
import { getAllPosts } from "@/lib/blog";

// This layout persists across navigations between sibling posts, so the
// sidebar's open/closed state is preserved when switching articles.
export default async function BlogPostLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getAllPosts();

  return (
    <main className="min-h-screen w-full bg-[#f1eeed]">
      <BlogReader posts={posts} currentSlug={slug}>
        {children}
      </BlogReader>
    </main>
  );
}
