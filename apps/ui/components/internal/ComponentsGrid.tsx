"use client"

import { ComponentCard } from "./ComponentCard"
import { CornerPlus } from "./CornerPlus"

type ComponentItem = {
  id: string
  title: string
  description?: string
  preview?: React.ComponentType
  docsPath?: string
  logo?: string
}

type ContentSection = {
  section: string
  icon?: React.ReactNode
  items: ComponentItem[]
}

type ComponentsGridProps = {
  contentMap: ContentSection[]
}

export const ComponentsGrid = ({ contentMap }: ComponentsGridProps) => {
  return (
    <div className="mx-auto flex w-full flex-col">
      {contentMap.map((item) => (
        <div
          key={item.section}
          className="mx-auto flex w-full flex-col border-t border-dashed last:border-b"
        >
          <div className="relative flex w-full flex-col gap-4 border-b border-dashed bg-secondary/20 dark:bg-background/20">
            <div className="relative mx-auto flex w-full max-w-6xl items-center gap-0.5 border-x border-dashed px-4 py-2 font-heading text-xl">
              <CornerPlus variant="leftTop" />
              <CornerPlus variant="rightTop" />
              {item.section}
            </div>
          </div>
          <div className="mx-auto grid w-full max-w-6xl grid-cols-3">
            {item.items.map((component) => (
              <ComponentCard
                key={component.id}
                id={component.id}
                title={component.title}
                description={component.description}
              />
            ))}
            {item.items.length % 3 !== 0 && (
              <div
                className="relative grid w-full place-content-center border-x border-dashed font-medium text-muted-foreground text-sm"
                style={{
                  gridColumn: item.items.length % 3 === 1 ? "span 2" : "auto",
                }}
              >
                <CornerPlus variant="leftTop" className="z-10" />
                <CornerPlus variant="leftBottom" className="z-10" />
                <CornerPlus variant="rightTop" className="z-10" />
                <CornerPlus variant="rightBottom" className="z-10" />
                New Components Coming Soon...
              </div>
            )}
          </div>
          <div className="relative w-full border-t border-dashed">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 border-x border-dashed py-4" />
          </div>
        </div>
      ))}
    </div>
  )
}
