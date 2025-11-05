'use client'

import PreviewHeading from '@/components/internal/PreviewHeading'
import {
  RaunoSidebar,
  RaunoSidebarSection,
  RaunoSidebarSectionHeader,
  RaunoSidebarItem,
} from '@/components/ui/totheprod-ui/rauno-sidebar/rauno-sidebar'
import { usePathname, useSearchParams } from 'next/navigation'

const sections = [
  {
    label: 'Dashboard',
    items: [
      { label: 'Overview', href: '?link=overview' },
      { label: 'Insights', href: '?link=insights' },
      { label: 'Reports', href: '?link=reports' },
    ],
  },
  {
    label: 'Projects',
    items: [
      { label: 'Active Projects', href: '?link=active' },
      { label: 'Archived Projects', href: '?link=archived' },
      { label: 'Create Project', href: '?link=new' },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', href: '?link=profile' },
      { label: 'Settings', href: '?link=settings' },
      { label: 'Log Out', href: '?link=logout' },
    ],
  },
]

const items = [
  { label: 'Home', href: '?link=home' },
  { label: 'Explore', href: '?link=explore' },
  { label: 'Notifications', href: '?link=notifications' },
  { label: 'Messages', href: '?link=messages' },
  { label: 'Tasks', href: '?link=tasks' },
  { label: 'Calendar', href: '?link=calendar' },
  { label: 'Files', href: '?link=files' },
  { label: 'Team', href: '?link=team' },
  { label: 'Help', href: '?link=help' },
]

export const RaunoSidebarPreview = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const link = searchParams.get('link')
  const activePath = link ? `${pathname}?link=${link}` : pathname

  return (
    <div className="flex flex-col gap-4 pt-16">
      <PreviewHeading variant="light" title="Sidebar with Sections" />
      <RaunoSidebar className="max-w-xs p-10">
        {sections.map((section, sectionIndex) => (
          <RaunoSidebarSection key={section.label} isLast={sectionIndex === sections.length - 1}>
            <RaunoSidebarSectionHeader>{section.label}</RaunoSidebarSectionHeader>
            {section.items.map((item, itemIndex) => (
              <RaunoSidebarItem
                key={item.label}
                href={item.href}
                isActive={activePath.endsWith(item.href)}
                isLast={itemIndex === section.items.length - 1}
              >
                {item.label}
              </RaunoSidebarItem>
            ))}
          </RaunoSidebarSection>
        ))}
      </RaunoSidebar>
      <PreviewHeading variant="light" title="Simple Sidebar" />
      <RaunoSidebar className="max-w-xs p-10 bg-muted-foreground/5 shadow-xl rounded-2xl">
        {items.map((item, index) => (
          <RaunoSidebarItem
            key={item.label}
            href={item.href}
            isActive={activePath.endsWith(item.href)}
            isLast={index === items.length - 1}
          >
            {item.label}
          </RaunoSidebarItem>
        ))}
      </RaunoSidebar>
    </div>
  )
}
