import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { getPostMeta, getSlugs } from "@/lib/blog";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — newtonma.dev`,
    description: meta.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) notFound();

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <BlogArticle title={meta.title} dateLabel={meta.dateLabel}>
      <Post />
    </BlogArticle>
  );
}
