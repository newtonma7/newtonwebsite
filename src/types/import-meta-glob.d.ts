interface ImportMeta {
  glob: (
    pattern: string | string[],
    options?: {
      eager?: boolean;
      import?: string;
      query?: string;
      base?: string;
    },
  ) => Record<string, unknown>;
}
