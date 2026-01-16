"use client"

import {
  TtpTickerSidebar,
  TtpTickerSidebarItem,
  TtpTickerSidebarSection,
  TtpTickerSidebarSectionHeader,
} from "@/components/ui/totheprod-ui/ttp-ticker-sidebar"
import type { ComponentCategory } from "@/lib/component-metadata"

type ComponentSidebarContentProps = {
  contentMap: ComponentCategory[]
  currentId: string
}

export const ComponentSidebarContent = ({
  contentMap,
  currentId,
}: ComponentSidebarContentProps) => {
  return (
    <TtpTickerSidebar
      className="mb-auto flex max-h-full w-full flex-1 flex-col overflow-y-auto p-0"
      sectionDividersLength={0}
    >
      {contentMap.map((section, sectionIndex) => (
        <TtpTickerSidebarSection
          className="group relative border-t border-dashed px-4 py-4 first:border-t-0 last:border-b"
          isLast={sectionIndex === contentMap.length - 1}
          key={section.section}
        >
          {/* <CornerPlus variant="rightTop" />
            <CornerPlus
              className="hidden group-last:block"
              variant="rightBottom"
            /> */}
          <TtpTickerSidebarSectionHeader>
            {section.section}
          </TtpTickerSidebarSectionHeader>
          {section.items
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((item, itemIndex) => (
              <TtpTickerSidebarItem
                href={`/components/${item.id}`}
                isActive={currentId === item.id}
                isLast={itemIndex === section.items.length - 1}
                key={item.id}
                textClassName="[[data-active=false]_&]:text-muted-foreground/85!"
              >
                {item.title}
              </TtpTickerSidebarItem>
            ))}
        </TtpTickerSidebarSection>
      ))}
    </TtpTickerSidebar>
  )
}
