"use client"

import { MoonIcon, Sun02Icon, SunIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"

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
      variant={variant}
      size="icon-sm"
      className={cn("cursor-pointer", className)}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <HugeiconsIcon
        icon={Sun02Icon}
        className="dark:-rotate-90 size-4 rotate-0 scale-100 transition-all dark:scale-0"
      />
      <HugeiconsIcon
        icon={MoonIcon}
        className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="icon-sm"
          className={cn("cursor-pointer", className)}
        >
          <HugeiconsIcon
            icon={Sun02Icon}
            className="dark:-rotate-90 size-4 rotate-0 scale-100 transition-all dark:scale-0"
          />
          <HugeiconsIcon
            icon={MoonIcon}
            className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
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
