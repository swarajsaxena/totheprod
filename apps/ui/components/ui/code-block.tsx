"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type CodeBlockProps = {
  children?: React.ReactNode
  "data-language"?: string
  "data-theme"?: string
  className?: string
  raw?: string
  title?: string
  [key: string]: unknown
}

export const CodeBlock = ({
  children,
  title,
  raw,
  ...props
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const language = props["data-language"] || "plaintext"

  const handleCopy = async () => {
    const code = raw || (typeof children === "string" ? children : "")

    if (code) {
      await navigator.clipboard.writeText(code)
    } else {
      // Try to extract text from children if it's a React element
      const pre = document.querySelector(`pre[data-language="${language}"]`)
      if (pre) {
        await navigator.clipboard.writeText(pre.textContent || "")
      }
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative">
      {title && (
        <div className="flex items-center justify-between rounded-t-lg border border-border border-b-0 bg-muted px-4 py-2">
          <span className="font-medium text-muted-foreground text-xs">
            {title}
          </span>
          <span className="text-muted-foreground/60 text-xs">{language}</span>
        </div>
      )}

      <div className="relative">
        <Button
          aria-label="Copy code"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
          size="sm"
          variant="ghost"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>

        <pre
          {...props}
          className={`${props.className || ""} ${title ? "rounded-t-none" : ""}`}
        >
          {children}
        </pre>
      </div>
    </div>
  )
}

type InlineCodeProps = {
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

export const InlineCode = ({ children, ...props }: InlineCodeProps) => {
  return (
    <code
      {...props}
      className="rounded bg-muted px-1.5 py-0.5 font-fira text-primary text-sm"
    >
      {children}
    </code>
  )
}
