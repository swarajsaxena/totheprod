"use client"

import { GlobalCommandMenu } from "@/components/internal/GlobalCommandMenu"
import { RaycastCommandMenuProvider } from "@/components/ui/totheprod-ui/raycast-command-menu/raycast-command-menu"
import * as React from "react"

export const CommandMenuProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <RaycastCommandMenuProvider shortcut="mod+k" actionsShortcut="alt+k">
      <GlobalCommandMenu />
      {children}
    </RaycastCommandMenuProvider>
  )
}
