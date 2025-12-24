"use client"

import { Copy02Icon, Tick01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"
import { createHighlighter } from "shiki"
import { ComponentDetailContainer } from "./component-details-panel"

type CodeViewerProps = {
  code: string
  language?: string
  filename?: string
  className?: string
}

export const CodeViewer = ({
  code,
  language = "bash",
  filename = "terminal",
}: CodeViewerProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [copied, setCopied] = useState(false)

  const highlighter = createHighlighter({
    langs: [language],
    themes: [
      {
        name: "custom-theme",
        type: "dark",
        colors: {
          "editor.background": "var(--background)",
          "editor.foreground":
            "color-mix(in srgb, var(--foreground) 60%, transparent)",
        },
        tokenColors: [
          {
            scope: ["comment", "punctuation.definition.comment"],
            settings: {
              foreground: "var(--muted-foreground)",
              fontStyle: "italic",
            },
          },
          {
            scope: ["string", "string.quoted", "string.template"],
            settings: {
              foreground: "var(--primary)",
            },
          },
          {
            scope: [
              "constant.numeric",
              "constant.language",
              "constant.character",
            ],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 85%, transparent)",
            },
          },
          {
            scope: [
              "keyword",
              "keyword.control",
              "keyword.operator",
              "storage.type",
              "storage.modifier",
            ],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 70%, transparent)",
              fontStyle: "italic",
            },
          },
          {
            scope: [
              "entity.name.function",
              "support.function",
              "meta.function-call",
            ],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 90%, transparent)",
            },
          },
          {
            scope: ["entity.name.type", "entity.name.class", "support.class"],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 80%, transparent)",
            },
          },
          {
            scope: ["variable", "variable.other", "variable.parameter"],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 95%, transparent)",
            },
          },
          {
            scope: ["punctuation", "meta.brace"],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 65%, transparent)",
            },
          },
          {
            scope: ["entity.name.tag", "meta.tag"],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 85%, transparent)",
            },
          },
          {
            scope: ["entity.other.attribute-name"],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 75%, transparent)",
            },
          },
          {
            scope: ["support.type.property-name"],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 80%, transparent)",
            },
          },
          {
            scope: ["constant.language.boolean", "constant.language.null"],
            settings: {
              foreground:
                "color-mix(in srgb, var(--foreground) 85%, transparent)",
            },
          },
        ],
      },
    ],
  })

  useEffect(() => {
    const highlightCode = async () => {
      const html = (await highlighter).codeToHtml(code, {
        lang: language,
        theme: "custom-theme",
      })
      setHighlightedCode(html)
    }

    highlightCode()
  }, [code, language, highlighter])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getLanguageDisplay = () => {
    const languageMap: Record<string, string> = {
      bash: "Bash",
      typescript: "TypeScript",
      tsx: "TypeScript",
      ts: "TypeScript",
      javascript: "JavaScript",
      jsx: "JavaScript",
      json: "JSON",
      css: "CSS",
      html: "HTML",
    }
    return languageMap[language] || language.toUpperCase()
  }

  return (
    <>
      {/* Header */}
      <ComponentDetailContainer containerClassName="bg-muted dark:bg-muted/50">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="font-mono text-muted-foreground/70 text-xs">
            {filename}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-muted-foreground/70 text-xs">
              {getLanguageDisplay()}
            </span>
            <HugeiconsIcon
              className="size-4 cursor-pointer text-muted-foreground/70 transition-colors"
              icon={copied ? Tick01Icon : Copy02Icon}
              onClick={handleCopy}
            />
          </div>
        </div>
      </ComponentDetailContainer>

      {/* Code Block */}
      <ComponentDetailContainer>
        <div className="overflow-x-auto">
          {highlightedCode ? (
            <div
              className="[&>pre]:m-0 [&>pre]:border-0 [&>pre]:bg-transparent! [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-relaxed"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: safe
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          ) : (
            <pre className="m-0 bg-transparent p-4 font-mono text-sm leading-relaxed">
              <code className="text-[#c9d1d9]">{code}</code>
            </pre>
          )}
        </div>
      </ComponentDetailContainer>
    </>
  )
}
