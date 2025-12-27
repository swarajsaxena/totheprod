/**
 * Barrel export for syntax highlighting utilities
 */

export { highlightCode, highlighterPromise } from "./highlighter"
export {
  getLanguageDisplayName,
  getLanguageFromPath,
  type SupportedLanguage,
  supportedLanguages,
} from "./languages"
export { customTheme } from "./theme"
