"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { useBlogUI } from "./BlogUIContext";

function SidebarList({
  posts,
  currentSlug,
  onNavigate,
}: {
  posts: PostMeta[];
  currentSlug: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col">
      {posts.map((post) => {
        const isActive = post.slug === currentSlug;
        return (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              onClick={onNavigate}
              className={`group flex w-full flex-col gap-1 border-l-2 py-3 pl-4 text-left transition-colors ${
                isActive
                  ? "border-[#E31637]"
                  : "border-transparent hover:border-zinc-300"
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-400">
                {post.dateLabel}
              </span>
              <span
                className={`text-[15px] leading-snug lowercase transition-colors ${
                  isActive
                    ? "text-zinc-900"
                    : "text-zinc-500 group-hover:text-zinc-800"
                }`}
              >
                {post.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function BlogReader({
  posts,
  currentSlug,
  children,
}: {
  posts: PostMeta[];
  currentSlug: string;
  children: ReactNode;
}) {
  const { sidebarOpen, setSidebarOpen } = useBlogUI();
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-14 pb-28 sm:pt-20">
      {/* top controls */}
      <div className="mb-8 flex items-center gap-2">
        <Link
          href="/blog"
          className="group flex items-center gap-1.5 text-sm lowercase text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          back
        </Link>

        <span className="text-zinc-300">·</span>

        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Show posts"}
          className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900 lg:flex"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setMobileNav(true)}
          className="flex cursor-pointer items-center gap-2 text-sm lowercase text-zinc-500 transition-colors hover:text-zinc-900 lg:hidden"
        >
          <PanelLeftOpen className="h-4 w-4" />
          posts
        </button>
      </div>

      <div className="lg:flex lg:gap-12">
        {/* collapsible, top-anchored sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              key="rail"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 248, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden shrink-0 self-start overflow-hidden lg:block"
            >
              <div className="w-[248px] pr-2">
                <SidebarList posts={posts} currentSlug={currentSlug} />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* reading column */}
        <div className="mx-auto min-w-0 max-w-2xl flex-1">{children}</div>
      </div>

      {/* mobile overlay sidebar */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileNav(false)}
              className="fixed inset-0 z-40 bg-zinc-900/20 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[82%] max-w-xs overflow-y-auto border-r border-zinc-200 bg-[#f1eeed] px-6 py-8 lg:hidden"
            >
              <div className="mb-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMobileNav(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-400 hover:text-zinc-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SidebarList
                posts={posts}
                currentSlug={currentSlug}
                onNavigate={() => setMobileNav(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
