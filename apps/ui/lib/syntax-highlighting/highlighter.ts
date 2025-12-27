import { createHighlighter } from "shiki"
import { supportedLanguages } from "./languages"
import { customTheme } from "./theme"

/**
 * Shared Shiki highlighter instance
 * Created once and reused across all code viewers for better performance
 */
export const highlighterPromise = createHighlighter({
  langs: [...supportedLanguages],
  themes: [customTheme],
})

/**
 * Highlight code with the shared highlighter
 */
export const highlightCode = async (
  code: string,
  language: string
): Promise<string> => {
  const highlighter = await highlighterPromise
  return highlighter.codeToHtml(code, {
    lang: language,
    theme: "custom-theme",
  })
}
