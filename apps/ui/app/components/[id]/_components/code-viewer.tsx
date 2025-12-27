"use client"

import { Copy02Icon, Tick01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"
import {
  getLanguageDisplayName,
  highlightCode,
} from "@/lib/syntax-highlighting"
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

  useEffect(() => {
    const highlight = async () => {
      const html = await highlightCode(code, language)
      setHighlightedCode(html)
    }

    highlight()
  }, [code, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
              {getLanguageDisplayName(language)}
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
