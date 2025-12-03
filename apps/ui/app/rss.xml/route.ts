import { components } from "@/lib/component-metadata"
import { SITE_CONFIG } from "@/lib/seo/metadata"

export const GET = () => {
  const rss = generateRSSFeed()

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

const generateRSSFeed = (): string => {
  const latestComponents = components
    .sort((a, b) => {
      const dateA = a.updatedAt || a.createdAt || ""
      const dateB = b.updatedAt || b.createdAt || ""
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
    .slice(0, 20) // Latest 20 components

  const items = latestComponents
    .map((component) => {
      const pubDate = new Date(
        component.updatedAt || component.createdAt || Date.now()
      ).toUTCString()

      return `
    <item>
      <title>${escapeXML(component.title)}</title>
      <link>${SITE_CONFIG.url}/components/${component.id}</link>
      <guid>${SITE_CONFIG.url}/components/${component.id}</guid>
      <description>${escapeXML(component.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXML(component.category)}</category>
      ${component.tags.map((tag) => `<category>${escapeXML(tag)}</category>`).join("\n      ")}
    </item>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXML(SITE_CONFIG.title)}</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${escapeXML(SITE_CONFIG.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`
}

const escapeXML = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
