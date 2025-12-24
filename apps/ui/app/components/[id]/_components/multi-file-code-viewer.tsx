"use client"

import {
  Copy02Icon,
  Tick01Icon,
  UnfoldLessIcon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"
import { createHighlighter } from "shiki"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ComponentDetailContainer } from "./component-details-panel"

type FileData = {
  path: string
  type: string
  label?: string
}

type MultiFileCodeViewerProps = {
  files: FileData[]
  componentId: string
}

export const MultiFileCodeViewer = ({
  files,
  componentId,
}: MultiFileCodeViewerProps) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const [fileContents, setFileContents] = useState<Record<string, string>>({})
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  const activeFile = files[activeFileIndex]
  const activeContent = fileContents[activeFile?.path] || ""

  const highlighter = createHighlighter({
    langs: ["typescript", "tsx", "javascript", "jsx", "bash"],
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

  // Load all file contents
  useEffect(() => {
    // biome-ignore lint: Loading files requires multiple async operations
    const loadFiles = async () => {
      if (files.length === 0) {
        setIsLoading(false)
        return
      }

      try {
        // Fetch the component registry file
        const response = await fetch(`/r/${componentId}.json`)
        if (!response.ok) {
          console.error(`Failed to load registry for ${componentId}`)
          setIsLoading(false)
          return
        }

        const registryData = await response.json()
        const contents: Record<string, string> = {}

        // Extract content for each file
        for (const file of files) {
          // First try to find in registry
          const matchedFile = registryData.files?.find(
            (f: { path: string; content?: string }) => f.path === file.path
          )

          if (matchedFile?.content) {
            contents[file.path] = matchedFile.content
          } else if (file.label === "preview.tsx") {
            // If it's a preview file, use the API route
            try {
              const previewResponse = await fetch(
                `/api/preview-source/${componentId}`
              )
              if (previewResponse.ok) {
                const previewData = await previewResponse.json()
                contents[file.path] = previewData.content
              }
            } catch (error) {
              console.error("Failed to load preview file:", error)
            }
          } else {
            // If not in registry, try to fetch as a source file
            try {
              const sourceResponse = await fetch(`/${file.path}`)
              if (sourceResponse.ok) {
                const sourceCode = await sourceResponse.text()
                contents[file.path] = sourceCode
              }
            } catch (error) {
              console.error(`Failed to load source file ${file.path}:`, error)
            }
          }
        }

        setFileContents(contents)
      } catch (error) {
        console.error("Failed to load files:", error)
      }

      setIsLoading(false)
    }

    loadFiles()
  }, [files, componentId])

  // Highlight active file
  useEffect(() => {
    const highlightCode = async () => {
      if (!activeContent) {
        return
      }

      const extension = activeFile.path.split(".").pop() || "tsx"
      const languageMap: Record<string, string> = {
        tsx: "tsx",
        ts: "typescript",
        jsx: "jsx",
        js: "javascript",
      }
      const language = languageMap[extension] || "tsx"

      const html = (await highlighter).codeToHtml(activeContent, {
        lang: language,
        theme: "custom-theme",
      })
      setHighlightedCode(html)
    }

    highlightCode()
  }, [activeContent, activeFile, highlighter])

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getFileName = (path: string) => {
    const parts = path.split("/")
    return parts.at(-1) || path
  }

  if (!files || files.length === 0) {
    return null
  }

  return (
    <>
      {/* Tab Row */}
      <ComponentDetailContainer>
        <div className="flex items-center gap-0 overflow-x-auto">
          {files.map((file, index) => (
            <Button
              className={cn(
                "rounded-none border-0 border-border border-r border-dashed px-4 py-2 font-mono font-normal text-xs",
                index === activeFileIndex
                  ? "bg-primary/5 text-primary"
                  : "text-muted-foreground/70 hover:text-foreground"
              )}
              key={file.path}
              onClick={() => setActiveFileIndex(index)}
              variant={"outline"}
            >
              {file.label || getFileName(file.path)}
            </Button>
          ))}
          <Button
            className="sticky right-0 ml-auto h-[unset] w-max rounded-none border-y-0 bg-background p-2 text-foreground/50 hover:bg-background"
            onClick={() => setIsExpanded(!isExpanded)}
            size="icon-sm"
            variant="outline"
          >
            <HugeiconsIcon
              icon={isExpanded ? UnfoldLessIcon : UnfoldMoreIcon}
            />
          </Button>
        </div>
      </ComponentDetailContainer>

      {/* Code Container */}
      <ComponentDetailContainer>
        <div className="relative">
          {/* Copy Button */}
          <div className="absolute top-4 right-4 z-10">
            <HugeiconsIcon
              className="size-4 cursor-pointer text-muted-foreground/70 transition-colors hover:text-foreground"
              icon={copied ? Tick01Icon : Copy02Icon}
              onClick={handleCopy}
            />
          </div>

          {/* Code */}
          <div
            className={cn(
              "relative transition-all",
              !isExpanded && "max-h-[200px] overflow-y-hidden"
            )}
          >
            {isLoading && (
              <div className="animate-pulse p-4">
                <div className="mb-4 h-4 w-3/4 rounded bg-muted" />
                <div className="mb-4 h-4 w-1/2 rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
              </div>
            )}
            {!isLoading && highlightedCode && (
              <div
                className="[&>pre]:wrap-break-word [&>pre]:m-0 [&>pre]:whitespace-pre-wrap [&>pre]:border-0 [&>pre]:bg-transparent! [&>pre]:p-4 [&>pre]:pr-12 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-normal"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: safe
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            )}
            {!(isLoading || highlightedCode) && (
              <pre className="m-0 bg-transparent p-4 pr-12 font-mono text-sm leading-relaxed">
                <code className="text-muted-foreground">
                  Failed to load file content
                </code>
              </pre>
            )}

            {/* Gradient Overlay when collapsed */}
            {!(isExpanded || isLoading) && highlightedCode && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
            )}
          </div>

          {/* Expand/Collapse Button */}
          {!isLoading && highlightedCode && (
            <div className="flex items-center justify-center border-t border-dashed py-2">
              <Button
                className="mx-auto rounded-md px-3 py-1 text-foreground/50"
                onClick={() => setIsExpanded(!isExpanded)}
                variant="outline"
              >
                {isExpanded ? "Show less" : "Expand code"}
              </Button>
            </div>
          )}
        </div>
      </ComponentDetailContainer>
    </>
  )
}
