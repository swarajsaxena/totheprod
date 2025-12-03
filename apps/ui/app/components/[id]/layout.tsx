"use client"

import { useAtomValue } from "jotai"
import type { ReactNode } from "react"
import { detailsOpenAtom } from "@/store/atoms"
import { ComponentDetailsPanel, ComponentPreviewContainer } from "./_components"

const ComponentPageLayout = ({ children }: { children: ReactNode }) => {
  const detailsOpen = useAtomValue(detailsOpenAtom)

  return (
    <>
      <div className="relative flex-1 overflow-hidden">
        <ComponentPreviewContainer>{children}</ComponentPreviewContainer>
      </div>
      {detailsOpen && <ComponentDetailsPanel />}
    </>
  )
}

export default ComponentPageLayout
