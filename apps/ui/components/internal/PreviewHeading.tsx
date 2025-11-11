"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ThemeLogo } from "./ThemeLogo"

interface PreviewHeadingProps {
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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className={cn("mt-4 mb-2 flex flex-col items-center", className ?? "")}
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <ThemeLogo className="mb-3" alt="logo" width={30} height={30} />
    </motion.div>
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center font-heading font-medium text-muted-foreground text-sm"
    >
      {title}
    </motion.h1>
    {description && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-xs text-center text-muted-foreground/75 text-sm"
      >
        {description}
      </motion.p>
    )}
  </motion.div>
)

export default PreviewHeading
