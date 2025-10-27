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

const ComponentSidebar = () => {
  const params = useParams()
  const currentId = params?.id as string

  return (
    <RaunoSidebar>
      {contentMap.map((section, sectionIndex) => (
        <RaunoSidebarSection key={section.section} isLast={sectionIndex === contentMap.length - 1}>
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
  )
}

export default ComponentSidebar
