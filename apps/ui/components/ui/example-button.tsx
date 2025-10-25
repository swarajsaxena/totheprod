'use client'

import * as React from 'react'

interface ExampleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const ExampleButton = React.forwardRef<HTMLButtonElement, ExampleButtonProps>(
  ({ className = '', variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-lg',
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

ExampleButton.displayName = 'ExampleButton'
