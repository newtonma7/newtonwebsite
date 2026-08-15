"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type BlogUI = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const BlogUIContext = createContext<BlogUI | null>(null);

// Lives in the stable `blog/layout.tsx`, so sidebar state survives every
// navigation within /blog (including switching between posts).
export function BlogUIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <BlogUIContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </BlogUIContext.Provider>
  );
}

export function useBlogUI(): BlogUI {
  const ctx = useContext(BlogUIContext);
  if (!ctx) throw new Error("useBlogUI must be used within BlogUIProvider");
  return ctx;
}
