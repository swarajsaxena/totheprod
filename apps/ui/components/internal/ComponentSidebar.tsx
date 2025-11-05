'use client'

import React from 'react'
import {
  RaunoSidebar,
  RaunoSidebarSection,
  RaunoSidebarSectionHeader,
  RaunoSidebarItem,
} from '@/components/ui/totheprod-ui/rauno-sidebar/rauno-sidebar'
import { useParams } from 'next/navigation'
import { contentMap } from '@/app/components/[id]/constants'
import { motion } from 'motion/react'
import Link from 'next/link'

const ComponentSidebar = () => {
  const params = useParams()
  const currentId = params?.id as string

  return (
    <div className="bg-secondary fill-card relative flex h-[unset] justify-center overflow-hidden">
      <div className="text-muted-foreground absolute top-0 left-1/2 flex w-full -translate-x-1/2 items-center justify-between p-4 text-xs">
        <Link href="/">
          <motion.img src="/logo-light.svg" alt="Logo" className="h-6 w-6" layoutId="logo" />
        </Link>
        <span>Components</span>
      </div>
      <RaunoSidebar className="my-auto">
        {contentMap.map((section, sectionIndex) => (
          <RaunoSidebarSection
            key={section.section}
            isLast={sectionIndex === contentMap.length - 1}
          >
            <RaunoSidebarSectionHeader>{section.section}</RaunoSidebarSectionHeader>
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
