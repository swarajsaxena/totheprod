'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  children?: React.ReactNode
  'data-language'?: string
  'data-theme'?: string
  className?: string
  raw?: string
  title?: string
  [key: string]: unknown
}

export const CodeBlock = ({ children, title, raw, ...props }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const language = props['data-language'] || 'plaintext'

  const handleCopy = async () => {
    const code = raw || (typeof children === 'string' ? children : '')

    if (!code) {
      // Try to extract text from children if it's a React element
      const pre = document.querySelector(`pre[data-language="${language}"]`)
      if (pre) {
        await navigator.clipboard.writeText(pre.textContent || '')
      }
    } else {
      await navigator.clipboard.writeText(code)
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative">
      {title && (
        <div className="bg-muted border-border flex items-center justify-between rounded-t-lg border border-b-0 px-4 py-2">
          <span className="text-muted-foreground text-xs font-medium">{title}</span>
          <span className="text-muted-foreground/60 text-xs">{language}</span>
        </div>
      )}

      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? <Check className="text-primary h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>

        <pre {...props} className={`${props.className || ''} ${title ? 'rounded-t-none' : ''}`}>
          {children}
        </pre>
      </div>
    </div>
  )
}

interface InlineCodeProps {
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

export const InlineCode = ({ children, ...props }: InlineCodeProps) => {
  return (
    <code {...props} className="bg-muted text-primary font-fira rounded px-1.5 py-0.5 text-sm">
      {children}
    </code>
  )
}
