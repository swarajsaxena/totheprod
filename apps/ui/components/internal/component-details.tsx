"use client"

import { useAtomValue } from "jotai"
import { MDXClient } from "next-mdx-remote-client"
import {
  type SerializeResult,
  serialize,
} from "next-mdx-remote-client/serialize"
import { useEffect, useState } from "react"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { CodeBlock, InlineCode } from "@/components/ui/code-block"
import { currentComponentMdxAtom } from "@/store/atoms"

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
                      dark: "poimandres",
                      light: "poimandres",
                    },
                    keepBackground: false,
                    defaultLang: "plaintext",
                  },
                ],
                rehypeAutolinkHeadings,
              ],
            },
          },
        })
        setMdxData(result)
      } catch (error) {
        console.error("Error processing MDX:", error)
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
          <div className="mb-4 h-6 w-1/3 rounded bg-muted" />
          <div className="mb-2 h-4 w-full rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
      </div>
    )
  }

  if (!mdxData || "error" in mdxData) {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-destructive text-lg">Error</h2>
        <p className="text-muted-foreground text-sm">
          Failed to render MDX content.
        </p>
      </div>
    )
  }

  return (
    <div className="prose-invert prose-sm prose-headings:m-0 flex h-[unset] max-w-none flex-col gap-2 overflow-auto prose-blockquote:border-l-primary prose-headings:font-heading prose-headings:font-semibold prose-a:text-primary prose-blockquote:text-muted-foreground prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-muted-foreground prose-strong:text-foreground hover:prose-a:underline">
      <MDXClient
        {...mdxData}
        components={{
          pre: CodeBlock,
          code: InlineCode,
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          Callout,
          Steps,
          Step,
          Tabs,
          TabsList,
          TabsTrigger,
          TabsContent,
          FileTree,
          FileTreeItem,
          Video,
          LinkCard,
        }}
      />
    </div>
  )
}
