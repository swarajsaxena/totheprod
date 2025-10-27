import { cn } from '@/lib/utils'
import React from 'react'

interface PreviewHeadingProps {
  title: string
  description?: string
  className?: string
}

const PreviewHeading = ({ title, description, className }: PreviewHeadingProps) => {
  return (
    <div className={cn('flex flex-col items-center mb-2 mt-4', className ?? '')}>
      <div className="w-px bg-muted-foreground/50 h-10 mb-2" />
      <h1 className="text-muted-foreground text-sm text-center font-medium">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground/75 max-w-xs text-center">{description}</p>
      )}
    </div>
  )
}

export default PreviewHeading
