'use client'

import React, { useEffect, useState } from 'react'
import { serialize, type SerializeResult } from 'next-mdx-remote-client/serialize'
import { MDXClient } from 'next-mdx-remote-client'
import { useAtomValue } from 'jotai'
import { currentComponentMdxAtom } from '@/store/atoms'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { CodeBlock, InlineCode } from '@/components/ui/code-block'

export const ComponentDetails = () => {
  const mdxSource = useAtomValue(currentComponentMdxAtom)
  const [mdxData, setMdxData] = useState<SerializeResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const processMDX = async () => {
      let content = mdxSource

      if (!content) {
        // Default content if no MDX source is provided
        content = `# Component Details

This is the details section where you can add component documentation.

## Features
- Supports **GitHub Flavored Markdown**
- Automatic heading links
- Code syntax highlighting
- And much more!

\`\`\`tsx
// Example code block
const MyComponent = () => {
  return <div>Hello World</div>
}
\`\`\`

### Usage
Component documentation will appear here when you select a component with MDX documentation.

> **Tip**: Check out the Rauno Sidebar component to see an example of MDX documentation!`
      }

      try {
        const result = await serialize({
          source: content,
          options: {
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypePrettyCode,
                  {
                    theme: {
                      dark: 'poimandres',
                      light: 'poimandres',
                    },
                    keepBackground: false,
                    defaultLang: 'plaintext',
                  },
                ],
                rehypeAutolinkHeadings,
              ],
            },
          },
        })
        setMdxData(result)
      } catch (error) {
        console.error('Error processing MDX:', error)
      } finally {
        setIsLoading(false)
      }
    }

    processMDX()
  }, [mdxSource])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (!mdxData || 'error' in mdxData) {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-destructive">Error</h2>
        <p className="text-sm text-muted-foreground">Failed to render MDX content.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 overflow-auto h-[unset] prose-invert prose-sm max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-headings:font-clash prose-headings:m-0 prose-h2:text-xl prose-h3:text-lg prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-p:text-muted-foreground">
      <MDXClient
        {...mdxData}
        components={{
          pre: CodeBlock,
          code: InlineCode,
        }}
      />
    </div>
  )
}
