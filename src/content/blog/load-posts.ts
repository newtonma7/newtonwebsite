import type { ComponentType } from "react";

type PostModule = {
  default: ComponentType;
};

// Turbopack tracks this glob for HMR — unlike `import(\`...${slug}.mdx\`)`,
// edits to any matching file invalidate the module graph immediately.
const postModules = import.meta.glob("./*.mdx", {
  eager: true,
}) as Record<string, PostModule>;

function slugFromPath(path: string) {
  return path.replace(/^\.\//, "").replace(/\.mdx?$/, "");
}

export function getPostComponent(slug: string): ComponentType | undefined {
  const entry = Object.entries(postModules).find(
    ([path]) => slugFromPath(path) === slug,
  );
  return entry?.[1]?.default;
}

export function getGlobSlugs(): string[] {
  return Object.keys(postModules).map(slugFromPath);
}
