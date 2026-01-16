"use client"

import { ComponentCard } from "./component-card"
import { CornerPlus } from "./corner-plus"

type ComponentItem = {
  id: string
  title: string
  description?: string
  preview?: React.ComponentType
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
          className="mx-auto flex w-full flex-col border-t border-dashed last:border-b"
          key={item.section}
        >
          <div className="relative flex w-full flex-col gap-4 border-b border-dashed bg-secondary/20 px-4 dark:bg-background/20">
            <div className="relative mx-auto flex w-full max-w-6xl items-center gap-0.5 border-x border-dashed px-4 py-2 font-heading text-xl">
              <CornerPlus variant="leftTop" />
              <CornerPlus variant="rightTop" />
              {item.section}
            </div>
          </div>
          <div className="relative flex w-full flex-col gap-4 border-b border-dashed px-4">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-3">
              {item.items.map((component) => (
                <ComponentCard
                  description={component.description}
                  id={component.id}
                  key={component.id}
                  title={component.title}
                />
              ))}
              {item.items.length % 3 !== 0 && (
                <div
                  className="relative hidden w-full place-content-center border-x border-dashed font-medium text-muted-foreground text-sm md:grid"
                  style={{
                    gridColumn: item.items.length % 3 === 1 ? "span 2" : "auto",
                  }}
                >
                  <CornerPlus className="z-10" variant="leftTop" />
                  <CornerPlus className="z-10" variant="leftBottom" />
                  <CornerPlus className="z-10" variant="rightTop" />
                  <CornerPlus className="z-10" variant="rightBottom" />
                  New Components Coming Soon...
                </div>
              )}
            </div>
          </div>
          <div className="relative w-full border-dashed px-4 group-last:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 border-x border-dashed py-4" />
          </div>
        </div>
      ))}
    </div>
  )
}
