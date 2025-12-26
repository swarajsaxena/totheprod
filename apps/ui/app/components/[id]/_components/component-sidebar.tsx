"use client"

import { Search01FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "motion/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { contentMap } from "@/app/components/[id]/constants"
import { Button } from "@/components/ui/button"
import { useTtpCommandPaletteState } from "@/components/ui/totheprod-ui/ttp-command-palette"
import {
  TtpTickerSidebar,
  TtpTickerSidebarItem,
  TtpTickerSidebarSection,
  TtpTickerSidebarSectionHeader,
} from "@/components/ui/totheprod-ui/ttp-ticker-sidebar"
import { useDetailsOpen } from "@/hooks/use-details-open"
import { useMinWidth } from "@/hooks/use-min-width"
import { ThemeLogo } from "../../../../components/internal/theme-logo"

export const ComponentSidebar = () => {
  const isMobile = useMinWidth("md")
  const [detailsOpen] = useDetailsOpen()
  const params = useParams()
  const currentId = (params?.id as string) || ""
  const { open, setOpen } = useTtpCommandPaletteState()
  const handleToggleCommandMenu = () => {
    setOpen(!open)
  }

  return (
    <motion.aside
      animate={{ width: isMobile && detailsOpen ? 0 : "auto" }}
      aria-label="Component navigation sidebar"
      className="flex h-full flex-col justify-center overflow-hidden border-r border-dashed bg-secondary"
      initial={{ width: "auto" }}
    >
      <div className="flex w-full items-center justify-between gap-2 border-b border-dashed p-3 text-muted-foreground text-xs">
        <Link href="/">
          <ThemeLogo className="h-6 w-6" layoutId="logo" />
        </Link>
        <Button
          onClick={handleToggleCommandMenu}
          size="icon-sm"
          variant="outline"
        >
          <HugeiconsIcon className="size-4" icon={Search01FreeIcons} />
        </Button>
      </div>

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
                >
                  {item.title}
                </TtpTickerSidebarItem>
              ))}
          </TtpTickerSidebarSection>
        ))}
      </TtpTickerSidebar>
    </motion.aside>
  )
}
