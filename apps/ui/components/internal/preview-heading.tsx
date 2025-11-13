"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeLogo } from "./theme-logo"

type PreviewHeadingProps = {
  title: string
  description?: string
  className?: string
}

const PreviewHeading = ({
  title,
  description,
  className,
}: PreviewHeadingProps) => (
  <motion.div
    animate={{ opacity: 1 }}
    className={cn("mt-4 mb-2 flex flex-col items-center", className ?? "")}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <ThemeLogo alt="logo" className="mb-3" height={30} width={30} />
    </motion.div>
    <motion.h1
      animate={{ opacity: 1 }}
      className="text-center font-heading font-medium text-muted-foreground text-sm"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {title}
    </motion.h1>
    {description && (
      <motion.p
        animate={{ opacity: 1 }}
        className="max-w-xs text-center text-muted-foreground/75 text-sm"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {description}
      </motion.p>
    )}
  </motion.div>
)

export default PreviewHeading
