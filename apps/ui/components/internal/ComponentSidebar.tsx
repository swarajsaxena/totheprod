"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"
import { contentMap } from "@/app/components/[id]/constants"
import {
  RaunoSidebar,
  RaunoSidebarItem,
  RaunoSidebarSection,
  RaunoSidebarSectionHeader,
} from "@/components/ui/totheprod-ui/rauno-sidebar/rauno-sidebar"

const ComponentSidebar = () => {
  const params = useParams()
  const currentId = params?.id as string

  return (
    <div className="relative flex h-[unset] justify-center overflow-hidden bg-secondary fill-card">
      <div className="-translate-x-1/2 absolute top-0 left-1/2 flex w-full items-center justify-between p-4 text-muted-foreground text-xs">
        <Link href="/">
          <motion.img
            src="/logo-light.svg"
            alt="Logo"
            className="h-6 w-6"
            layoutId="logo"
          />
        </Link>
        <span>Components</span>
      </div>
      <RaunoSidebar className="my-auto">
        {contentMap.map((section, sectionIndex) => (
          <RaunoSidebarSection
            key={section.section}
            isLast={sectionIndex === contentMap.length - 1}
          >
            <RaunoSidebarSectionHeader>
              {section.section}
            </RaunoSidebarSectionHeader>
            {section.items.map((item, itemIndex) => (
              <RaunoSidebarItem
                key={item.id}
                href={`/components/${item.id}`}
                isActive={currentId === item.id}
                isLast={itemIndex === section.items.length - 1}
              >
                {item.title}
              </RaunoSidebarItem>
            ))}
          </RaunoSidebarSection>
        ))}
      </RaunoSidebar>
    </div>
  )
}

export default React.memo(ComponentSidebar)
