"use client"

import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { currentComponentAtom } from "@/store/atoms"

export const ComponentSourceCode = () => {
  const component = useAtomValue(currentComponentAtom)
  const [sourceCode, setSourceCode] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!component) {
      setIsLoading(false)
      return
    }

    const loadSourceCode = async () => {
      const code: Record<string, string> = {}

      for (const file of component.files) {
        try {
          const response = await fetch(`/${file.path}`)
          if (response.ok) {
            code[file.path] = await response.text()
          }
        } catch (error) {
          console.error(`Failed to load ${file.path}:`, error)
        }
      }

      setSourceCode(code)
      setIsLoading(false)
    }

    loadSourceCode()
  }, [component])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="mb-4 h-6 w-1/4 rounded bg-muted" />
          <div className="h-64 rounded bg-muted" />
        </div>
      </div>
    )
  }

  if (!component) {
    return (
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Source Code</h2>
        <p className="text-muted-foreground text-sm">No component selected.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-semibold text-lg">Source Code</h2>
        <p className="text-muted-foreground text-sm">
          Component implementation files.
        </p>
      </div>

      {component.files.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No source files available.
        </p>
      ) : (
        component.files.map((file) => (
          <div className="space-y-2" key={file.path}>
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm">{file.path}</h3>
              <span className="rounded-full bg-muted px-2 py-1 text-xs">
                {file.type}
              </span>
            </div>

            {sourceCode[file.path] ? (
              <CodeBlock language="tsx">{sourceCode[file.path]}</CodeBlock>
            ) : (
              <div className="rounded-md border border-dashed p-8 text-center">
                <p className="text-muted-foreground text-sm">
                  Failed to load source code
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
