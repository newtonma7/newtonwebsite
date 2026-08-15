import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string; // e.g. "aug 2026"
  monthDay: string; // e.g. "08.14"
  year: string; // e.g. "2026"
  tags: string[];
  excerpt: string;
};

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

function formatDates(iso: string) {
  // Parse as a plain calendar date to avoid timezone drift.
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return {
    dateLabel: `${MONTHS[m - 1]} ${y}`,
    monthDay: `${mm}.${dd}`,
    year: String(y),
  };
}

function toMeta(fileName: string): PostMeta {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data } = matter(raw);
  const date = String(data.date);
  return {
    slug,
    title: String(data.title ?? slug),
    date,
    ...formatDates(date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: String(data.excerpt ?? ""),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(toMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getPostMeta(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
