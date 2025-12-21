import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  experimental: {
    mcpServer: true,
  },
}

export default nextConfig
