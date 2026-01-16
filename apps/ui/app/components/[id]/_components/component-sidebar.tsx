"use client"

import { Search01FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion } from "motion/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { contentMap } from "@/app/components/[id]/constants"
import { Button } from "@/components/ui/button"
import { useTtpCommandPaletteState } from "@/components/ui/totheprod-ui/ttp-command-palette"
import { useDetailsOpen } from "@/hooks/use-details-open"
import { useMinWidth } from "@/hooks/use-min-width"
import { ThemeLogo } from "../../../../components/internal/theme-logo"
import { ComponentSidebarContent } from "./component-sidebar-content"

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
      className="hidden h-full flex-col justify-center overflow-hidden border-r border-dashed bg-secondary md:flex"
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

      <ComponentSidebarContent contentMap={contentMap} currentId={currentId} />
    </motion.aside>
  )
}
