import type { MDXComponents } from "mdx/types";

// Required by @next/mdx. Typography/code styling is applied by the
// `.blog-prose` wrapper (see globals.css), so no per-element overrides here.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
