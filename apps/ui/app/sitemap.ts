import type { MetadataRoute } from "next"
import { components } from "@/lib/component-metadata"
import { SITE_CONFIG } from "@/lib/seo/metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  const componentRoutes = components
    .filter((component) => component.status !== "disabled")
    .map((component) => ({
      url: `${SITE_CONFIG.url}/components/${component.id}`,
      lastModified: component.updatedAt || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...componentRoutes,
  ]
}
