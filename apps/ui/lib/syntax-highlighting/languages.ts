/**
 * Language detection and mapping utilities
 */

/**
 * Map file extensions to Shiki language identifiers
 */
const extensionToLanguage: Record<string, string> = {
  tsx: "tsx",
  ts: "typescript",
  jsx: "jsx",
  js: "javascript",
  json: "json",
  css: "css",
  html: "html",
  bash: "bash",
  sh: "bash",
  md: "markdown",
  mdx: "mdx",
}

/**
 * Map language identifiers to display names
 */
const languageDisplayNames: Record<string, string> = {
  bash: "Bash",
  typescript: "TypeScript",
  tsx: "TypeScript",
  ts: "TypeScript",
  javascript: "JavaScript",
  jsx: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  css: "CSS",
  html: "HTML",
  markdown: "Markdown",
  mdx: "MDX",
}

/**
 * Get Shiki language identifier from file path or extension
 */
export const getLanguageFromPath = (path: string): string => {
  const extension = path.split(".").pop()?.toLowerCase() || ""
  return extensionToLanguage[extension] || "tsx"
}

/**
 * Get display name for a language
 */
export const getLanguageDisplayName = (language: string): string => {
  return languageDisplayNames[language] || language.toUpperCase()
}

/**
 * Supported languages for the highlighter
 */
export const supportedLanguages = [
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "bash",
  "json",
  "css",
  "html",
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]
