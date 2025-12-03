import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mcpServer: true,
  },
  // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
          defaultLang: "tsx",
          showLineNumbers: true,
        },
      ],
      "rehype-autolink-headings",
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
