import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

// Plugins are passed as strings so the config stays serializable for Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter"]],
    rehypePlugins: [["@shikijs/rehype", { theme: "github-light" }]],
  },
});

export default withMDX(nextConfig);
