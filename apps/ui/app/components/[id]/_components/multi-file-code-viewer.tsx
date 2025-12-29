"use client"

import {
  Copy02Icon,
  Tick01Icon,
  UnfoldLessIcon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getLanguageFromPath, highlightCode } from "@/lib/syntax-highlighting"
import { cn } from "@/lib/utils"
import { ComponentDetailContainer } from "./component-details-panel"

type FileData = {
  path: string
  type: string
  label?: string
  content?: string
}

type MultiFileCodeViewerProps = {
  files: FileData[]
}

export const MultiFileCodeViewer = ({ files }: MultiFileCodeViewerProps) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const [fileContents, setFileContents] = useState<Record<string, string>>({})
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  const activeFile = files[activeFileIndex]
  const activeContent = fileContents[activeFile?.path] || ""

  // Load file contents from preloaded data
  useEffect(() => {
    if (files.length === 0) {
      setIsLoading(false)
      return
    }

    const contents: Record<string, string> = {}

    for (const file of files) {
      if (file.content) {
        contents[file.path] = file.content
      }
    }

    setFileContents(contents)
    setIsLoading(false)
  }, [files])

  // Highlight active file
  useEffect(() => {
    const highlight = async () => {
      if (!activeContent) {
        return
      }

      const language = getLanguageFromPath(activeFile.path)
      const html = await highlightCode(activeContent, language)
      setHighlightedCode(html)
    }

    highlight()
  }, [activeContent, activeFile])

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
                className="[&>pre]:wrap-break-word [&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:whitespace-pre [&>pre]:border-0 [&>pre]:bg-transparent! [&>pre]:p-4 [&>pre]:pr-12 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:leading-normal [&_span.line:empty]:h-[1.2em] [&_span.line]:block"
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
            <div className="sticky bottom-[18px] flex items-center justify-center border-t border-dashed bg-background/50 py-2 backdrop-blur-[2px]">
              <Button
                className="mx-auto rounded-md bg-background px-3 py-1 text-foreground/50"
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
