"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

function groupByYear(list: PostMeta[]) {
  const groups: { year: string; items: PostMeta[] }[] = [];
  for (const p of list) {
    const g = groups.find((x) => x.year === p.year);
    if (g) g.items.push(p);
    else groups.push({ year: p.year, items: [p] });
  }
  return groups;
}

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 pt-16 pb-32 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="mb-8">
          <Link
            href="/"
            className="group flex w-fit items-center gap-1.5 text-sm lowercase text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            back
          </Link>
        </div>

        <header className="mb-16">
          <h1 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            posts
          </h1>
          <p className="mt-3 text-lg lowercase text-zinc-500">
            writing to fight against ai brain drain
          </p>
        </header>

        <div className="flex flex-col gap-14">
          {groupByYear(posts).map((group) => (
            <section key={group.year} className="flex flex-col">
              <div className="mb-4 font-mono text-sm font-medium tracking-wide text-zinc-500">
                {group.year}
              </div>
              <ul className="flex flex-col">
                {group.items.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex w-full cursor-pointer items-baseline gap-4 border-t border-zinc-300 py-4 text-left last:border-b"
                    >
                      <span className="w-12 shrink-0 font-mono text-xs text-zinc-400">
                        {post.monthDay}
                      </span>
                      <span className="text-lg text-zinc-700 lowercase transition-colors group-hover:text-zinc-900">
                        {post.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
