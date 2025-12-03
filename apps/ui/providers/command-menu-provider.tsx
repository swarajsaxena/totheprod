"use client"

import type * as React from "react"
import { GlobalCommandMenu } from "@/components/internal/global-command-menu"
import { RaycastCommandMenuProvider } from "@/components/ui/totheprod-ui/ttp-raycast-command-menu"

export const CommandMenuProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <RaycastCommandMenuProvider actionsShortcut="alt+k" shortcut="mod+k">
      <GlobalCommandMenu />
      {children}
    </RaycastCommandMenuProvider>
  )
}
