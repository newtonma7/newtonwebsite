"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

export default function BlogArticle({
  title,
  dateLabel,
  children,
}: {
  title: string;
  dateLabel: string;
  children: ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="mb-3 font-mono text-xs lowercase tracking-wide text-zinc-400">
        {dateLabel}
      </p>
      <h1 className="text-4xl leading-tight text-zinc-900 lowercase">{title}</h1>
      <hr className="my-9 border-t border-zinc-300" />
      <div className="blog-prose">{children}</div>
    </motion.article>
  );
}
