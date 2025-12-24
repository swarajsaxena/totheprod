import type { Metadata } from "next"
import type { ComponentMetadata } from "@/lib/component-metadata"

export const SITE_CONFIG = {
  name: "ToTheProd UI",
  title: "ToTheProd - Beautiful UI Components for React",
  description:
    "Premium React components and animations. Production-ready, customizable UI components with beautiful hover effects, seamless navigations, and magical scrolling.",
  url: "https://ui.totheprod.com",
  ogImage: "https://ui.totheprod.com/opengraph-image",
  twitterImage: "https://ui.totheprod.com/twitter-image",
  author: {
    name: "Swaraj Saxena",
    url: "https://totheprod.com",
    twitter: "@swarajsaxena",
  },
  keywords: [
    "react",
    "nextjs",
    "ui components",
    "tailwindcss",
    "framer motion",
    "animations",
    "components library",
    "shadcn",
    "radix ui",
  ],
}

/**
 * Generate site metadata
 */
export const generateSiteMetadata = (): Metadata => {
  return {
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    authors: [
      {
        name: SITE_CONFIG.author.name,
        url: SITE_CONFIG.author.url,
      },
    ],
    creator: SITE_CONFIG.author.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_CONFIG.url,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [SITE_CONFIG.twitterImage],
      creator: SITE_CONFIG.author.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

/**
 * Generate metadata for component page
 */
export const generateComponentMetadata = (
  component: ComponentMetadata
): Metadata => {
  const title = `${component.title}`
  const description = component.description
  const url = `${SITE_CONFIG.url}/components/${component.id}`
  const ogImage = `${SITE_CONFIG.url}/api/og?id=${component.id}`

  return {
    title,
    description,
    keywords: [...SITE_CONFIG.keywords, ...component.tags],
    authors: [
      {
        name: SITE_CONFIG.author.name,
        url: SITE_CONFIG.author.url,
      },
    ],
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: component.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: SITE_CONFIG.author.twitter,
    },
  }
}

/**
 * Generate metadata for homepage
 */
export const generateHomeMetadata = (): Metadata => {
  return {
    ...generateSiteMetadata(),
    alternates: {
      canonical: SITE_CONFIG.url,
    },
  }
}
