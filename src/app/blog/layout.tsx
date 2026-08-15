import type { ReactNode } from "react";
import { BlogUIProvider } from "@/components/blog/BlogUIContext";

// Stable layout for all of /blog — holds the UI provider so state (e.g. the
// sidebar's open/closed flag) persists across every navigation within /blog.
export default function BlogLayout({ children }: { children: ReactNode }) {
  return <BlogUIProvider>{children}</BlogUIProvider>;
}
