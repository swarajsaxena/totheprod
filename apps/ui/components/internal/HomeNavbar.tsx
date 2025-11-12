"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useRaycastCommandMenuState } from "@/components/ui/totheprod-ui/raycast-command-menu/raycast-command-menu"
import {
  GithubIcon,
  NewTwitterIcon,
  Search01FreeIcons,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { CornerPlus } from "./CornerPlus"
import { ThemeLogo } from "./ThemeLogo"

type HomeNavbarProps = {
  componentsUrl: string
}

export const HomeNavbar = ({ componentsUrl }: HomeNavbarProps) => {
  const { open, setOpen } = useRaycastCommandMenuState()

  const handleToggleCommandMenu = () => {
    setOpen(!open)
  }

  return (
    <div className="-top-2 sticky z-10 w-full rounded-t-xl border-b border-dashed bg-background/70 px-4 backdrop-blur-md dark:bg-secondary/70">
      <div className="relative mx-auto flex w-full max-w-6xl items-center gap-2 border-x border-dashed p-4">
        <div className="flex items-center gap-2">
          <ThemeLogo alt="Logo" className="h-6 w-6" layoutId="logo" />
          <span className="font-bold font-heading text-xl tracking-wide">
            ToTheProd
          </span>
        </div>
        <div className="ml-auto flex items-center gap-4 font-archivo text-muted-foreground text-sm *:transition-all *:hover:text-foreground">
          <Link href={componentsUrl}>Components</Link>
          <Link href={componentsUrl}>Changelog</Link>
          <Link href="https://x.com/totheprod" target="_blank">
            <HugeiconsIcon icon={NewTwitterIcon} className="size-4" />
          </Link>
          <Link href="https://github.com/ToTheProd/ui" target="_blank">
            <HugeiconsIcon icon={GithubIcon} className="size-4" />
          </Link>
          <ThemeToggle className="size-max bg-transparent! p-0" />
          <button
            onClick={handleToggleCommandMenu}
            className="transition-all hover:text-foreground"
            aria-label="Open command menu"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleToggleCommandMenu()
              }
            }}
          >
            <HugeiconsIcon icon={Search01FreeIcons} className="size-4" />
          </button>
        </div>
        <CornerPlus />
        <CornerPlus variant="leftBottom" />
      </div>
    </div>
  )
}
