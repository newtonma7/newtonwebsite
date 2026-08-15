import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "newtonma.dev",
  description: "writing/blog",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="min-h-screen w-full bg-[#f1eeed]">
      <BlogIndex posts={posts} />
    </main>
  );
}
