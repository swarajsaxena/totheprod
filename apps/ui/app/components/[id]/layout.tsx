"use client"

import type { ReactNode } from "react"
import { ComponentDetailsSheet, ComponentPreviewContainer } from "./_components"

const ComponentPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="relative flex-1 overflow-hidden">
        <ComponentPreviewContainer>{children}</ComponentPreviewContainer>
      </div>
      <ComponentDetailsSheet />
    </>
  )
}

export default ComponentPageLayout
