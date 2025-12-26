"use client"

import type { ReactNode } from "react"
import { useGlobalShortcuts } from "@/hooks/use-global-shortcuts"

export const GlobalShortcutsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  useGlobalShortcuts()
  return <>{children}</>
}
