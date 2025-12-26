"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { ComponentDetails, ComponentPreviewContainer } from "./_components"

const ComponentPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <motion.div className="flex-1 overflow-hidden">
        <ComponentPreviewContainer>{children}</ComponentPreviewContainer>
      </motion.div>
      <ComponentDetails />
    </>
  )
}

export default ComponentPageLayout
