'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PreviewHeadingProps {
  title: string
  description?: string
  className?: string
  variant?: 'light' | 'dark'
}

const PreviewHeading = ({
  title,
  description,
  className,
  variant = 'dark',
}: PreviewHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('flex flex-col items-center mb-2 mt-4', className ?? '')}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Image
          src={variant === 'light' ? '/logo-light.svg' : '/logo-dark.svg'}
          className="mb-3"
          alt="logo"
          width={30}
          height={30}
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-muted-foreground text-sm text-center font-medium"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-muted-foreground/75 max-w-xs text-center"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export default PreviewHeading
