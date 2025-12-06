"use client"

import { usePathname, useSearchParams } from "next/navigation"
import PreviewHeading from "@/components/internal/preview-heading"
import {
  TtpTickerSidebar,
  TtpTickerSidebarItem,
  TtpTickerSidebarSection,
  TtpTickerSidebarSectionHeader,
} from "@/components/ui/totheprod-ui/ttp-ticker-sidebar"

const sections = [
  {
    label: "Dashboard",
    items: [
      { label: "Overview", href: "?link=overview" },
      { label: "Insights", href: "?link=insights" },
      { label: "Reports", href: "?link=reports" },
    ],
  },
  {
    label: "Projects",
    items: [
      { label: "Active Projects", href: "?link=active" },
      { label: "Archived Projects", href: "?link=archived" },
      { label: "Create Project", href: "?link=new" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", href: "?link=profile" },
      { label: "Settings", href: "?link=settings" },
      { label: "Log Out", href: "?link=logout" },
    ],
  },
]

const items = [
  { label: "Home", href: "?link=home" },
  { label: "Explore", href: "?link=explore" },
  { label: "Notifications", href: "?link=notifications" },
  { label: "Messages", href: "?link=messages" },
  { label: "Tasks", href: "?link=tasks" },
  { label: "Calendar", href: "?link=calendar" },
  { label: "Files", href: "?link=files" },
  { label: "Team", href: "?link=team" },
  { label: "Help", href: "?link=help" },
]

export const TtpTickerSidebarPreview = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const link = searchParams.get("link")
  const activePath = link ? `${pathname}?link=${link}` : pathname

  return (
    <div className="flex flex-col gap-4 pt-16">
      <PreviewHeading title="Sidebar with Sections" />
      <TtpTickerSidebar className="max-w-xs p-10">
        {sections.map((section, sectionIndex) => (
          <TtpTickerSidebarSection
            isLast={sectionIndex === sections.length - 1}
            key={section.label}
          >
            <TtpTickerSidebarSectionHeader>
              {section.label}
            </TtpTickerSidebarSectionHeader>
            {section.items.map((item, itemIndex) => (
              <TtpTickerSidebarItem
                href={item.href}
                isActive={activePath.endsWith(item.href)}
                isLast={itemIndex === section.items.length - 1}
                key={item.label}
              >
                {item.label}
              </TtpTickerSidebarItem>
            ))}
          </TtpTickerSidebarSection>
        ))}
      </TtpTickerSidebar>
      <PreviewHeading title="Simple Sidebar" />
      <TtpTickerSidebar className="max-w-xs rounded-2xl bg-muted-foreground/5 p-10 shadow-xl">
        {items.map((item, index) => (
          <TtpTickerSidebarItem
            href={item.href}
            isActive={activePath.endsWith(item.href)}
            isLast={index === items.length - 1}
            key={item.label}
          >
            {item.label}
          </TtpTickerSidebarItem>
        ))}
      </TtpTickerSidebar>
    </div>
  )
}
