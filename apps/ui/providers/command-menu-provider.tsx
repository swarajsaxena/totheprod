"use client"

import type * as React from "react"
import { GlobalCommandMenu } from "@/components/internal/global-command-menu"
import { CommandPaletteProvider } from "@/components/ui/totheprod-ui/ttp-command-palette"

export const CommandMenuProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <CommandPaletteProvider actionsShortcut="alt+k" shortcut="mod+k">
      <GlobalCommandMenu />
      {children}
    </CommandPaletteProvider>
  )
}
