"use client"

import { MoonIcon, Sun02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { VariantProps } from "class-variance-authority"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ThemeToggle({
  className,
  variant = "ghost",
}: {
  className?: string
  variant?: VariantProps<typeof Button>["variant"]
}) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      className={cn("cursor-pointer", className)}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon-sm"
      variant={variant}
    >
      <HugeiconsIcon
        className="dark:-rotate-90 size-4 rotate-0 scale-100 transition-all dark:scale-0"
        icon={Sun02Icon}
      />
      <HugeiconsIcon
        className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        icon={MoonIcon}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("cursor-pointer", className)}
          size="icon-sm"
          variant={variant}
        >
          <HugeiconsIcon
            className="dark:-rotate-90 size-4 rotate-0 scale-100 transition-all dark:scale-0"
            icon={Sun02Icon}
          />
          <HugeiconsIcon
            className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            icon={MoonIcon}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="text-xs" onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
