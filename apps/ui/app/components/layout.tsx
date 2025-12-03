"use client"

import type { ReactNode } from "react"
import { ComponentSidebar } from "./[id]/_components"

const ComponentsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-full max-h-screen flex-1 flex-row overflow-hidden rounded-lg border border-dashed">
      <ComponentSidebar />
      {children}
    </div>
  )
}

export default ComponentsLayout
