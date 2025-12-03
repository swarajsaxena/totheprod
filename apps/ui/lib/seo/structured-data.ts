import type { ComponentMetadata } from "@/lib/component-metadata"
import { SITE_CONFIG } from "./metadata"

type Schema = {
  "@context": string
  "@type": string
  [key: string]: unknown
}

/**
 * Generate Organization schema
 */
export const generateOrganizationSchema = (): Schema => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: [SITE_CONFIG.author.url],
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
  }
}

/**
 * Generate WebSite schema with search action
 */
export const generateWebsiteSchema = (): Schema => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Generate SoftwareApplication schema for a component
 */
export const generateSoftwareApplicationSchema = (
  component: ComponentMetadata
): Schema => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: component.title,
    description: component.description,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Web Component",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    softwareVersion: component.version || "1.0.0",
    softwareRequirements: component.dependencies.join(", "),
    keywords: component.tags.join(", "),
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.url,
    },
  }
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): Schema => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate HowTo schema for installation instructions
 */
export const generateHowToSchema = (component: ComponentMetadata): Schema => {
  const steps = [
    {
      name: "Install dependencies",
      text: `Install required dependencies: ${component.dependencies.join(", ")}`,
      url: `${SITE_CONFIG.url}/components/${component.id}#installation`,
    },
    {
      name: "Add component",
      text:
        component.installCommand ||
        `npx shadcn@latest add https://ui.totheprod.com/r/${component.id}.json`,
      url: `${SITE_CONFIG.url}/components/${component.id}#installation`,
    },
    {
      name: "Import and use",
      text: `Import the ${component.title} component and use it in your application`,
      url: `${SITE_CONFIG.url}/components/${component.id}#usage`,
    },
  ]

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to install ${component.title}`,
    description: `Step-by-step guide to install and use ${component.title} component`,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  }
}

/**
 * Generate complete schema for component page
 */
export const generateComponentPageSchema = (
  component: ComponentMetadata
): Schema[] => {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    {
      name: "Components",
      url: `${SITE_CONFIG.url}/components`,
    },
    {
      name: component.title,
      url: `${SITE_CONFIG.url}/components/${component.id}`,
    },
  ])

  const software = generateSoftwareApplicationSchema(component)
  const howTo = generateHowToSchema(component)

  return [breadcrumbs, software, howTo]
}

/**
 * Generate complete schema for homepage
 */
export const generateHomePageSchema = (): Schema[] => {
  const organization = generateOrganizationSchema()
  const website = generateWebsiteSchema()

  return [organization, website]
}
