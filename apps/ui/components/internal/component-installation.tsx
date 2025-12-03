"use client"

import { useAtomValue } from "jotai"
import { CodeBlock } from "@/components/ui/code-block"
import { currentComponentAtom } from "@/store/atoms"

export const ComponentInstallation = () => {
  const component = useAtomValue(currentComponentAtom)

  if (!component) {
    return (
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Installation</h2>
        <p className="text-muted-foreground text-sm">No component selected.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 font-semibold text-lg">Installation</h2>
        <p className="text-muted-foreground text-sm">
          Install the component using the shadcn CLI.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Via CLI (Recommended)</h3>
        <CodeBlock language="bash">
          {component.installCommand ||
            `npx shadcn@latest add https://ui.totheprod.com/r/${component.id}.json`}
        </CodeBlock>
      </div>

      {component.dependencies.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Dependencies</h3>
          <p className="text-muted-foreground text-sm">
            This component requires the following dependencies:
          </p>
          <CodeBlock language="bash">
            {`npm install ${component.dependencies.join(" ")}`}
          </CodeBlock>
          <div className="flex flex-wrap gap-2">
            {component.dependencies.map((dep) => (
              <span
                className="rounded-md bg-muted px-2 py-1 font-mono text-xs"
                key={dep}
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Component Info</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-medium capitalize">{component.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Complexity:</span>
            <span className="font-medium capitalize">
              {component.complexity}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">{component.category}</span>
          </div>
        </div>
      </div>

      {component.tags.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {component.tags.map((tag) => (
              <span
                className="rounded-full bg-primary/10 px-3 py-1 text-primary text-xs"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
