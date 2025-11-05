/**
 * @file RaunoSidebar Component
 * @description A minimal, animated sidebar component inspired by Rauno Freiberg's design aesthetic.
 *
 * Features:
 * - Smooth hover and active state animations
 * - Automatic divider rendering with configurable spacing
 * - Context-based configuration for consistent styling
 * - Composable components for flexible layouts
 *
 * @example
 * ```tsx
 * <RaunoSidebar>
 *   <RaunoSidebarSection>
 *     <RaunoSidebarSectionHeader>Dashboard</RaunoSidebarSectionHeader>
 *     <RaunoSidebarItem href="/overview" isActive={true}>Overview</RaunoSidebarItem>
 *     <RaunoSidebarItem href="/analytics">Analytics</RaunoSidebarItem>
 *   </RaunoSidebarSection>
 * </RaunoSidebar>
 * ```
 */

'use client'

import { useState, createContext, useContext } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Context value for RaunoSidebar configuration
 */
interface RaunoSidebarContextValue {
  /** Number of dividers to render between items within a section */
  itemDividersLength: number
  /** Number of dividers to render between sections */
  sectionDividersLength: number
}

/**
 * Context for sharing divider configuration across sidebar components
 */
const RaunoSidebarContext = createContext<RaunoSidebarContextValue>({
  itemDividersLength: 2,
  sectionDividersLength: 4,
})

/**
 * Hook to access the RaunoSidebar context
 * @returns The current sidebar context value
 */
const useRaunoSidebarContext = () => useContext(RaunoSidebarContext)

/**
 * Props for the RaunoSidebar component
 */
interface RaunoSidebarProps {
  /** The sidebar content (sections, headers, items) */
  children: React.ReactNode
  /** Additional CSS classes to apply to the sidebar container */
  className?: string
  /** Number of dividers to render between items within a section (default: 2) */
  itemDividersLength?: number
  /** Number of dividers to render between sections (default: 4) */
  sectionDividersLength?: number
}

/**
 * RaunoSidebar - Main container for the sidebar component
 *
 * A minimal, animated sidebar component inspired by Rauno's design.
 * Provides context for divider configuration and renders child components.
 *
 * @example
 * ```tsx
 * <RaunoSidebar itemDividersLength={2} sectionDividersLength={4}>
 *   <RaunoSidebarSection>
 *     <RaunoSidebarSectionHeader>Dashboard</RaunoSidebarSectionHeader>
 *     <RaunoSidebarItem href="/overview">Overview</RaunoSidebarItem>
 *   </RaunoSidebarSection>
 * </RaunoSidebar>
 * ```
 */
const RaunoSidebar = ({
  children,
  className,
  itemDividersLength = 2,
  sectionDividersLength = 4,
}: RaunoSidebarProps) => {
  console.log('RaunoSidebar')
  return (
    <RaunoSidebarContext.Provider value={{ itemDividersLength, sectionDividersLength }}>
      <div className={cn('flex flex-col min-w-max w-full p-4', className)}>
        <div className="flex flex-col w-max">{children}</div>
      </div>
    </RaunoSidebarContext.Provider>
  )
}

/**
 * Props for the RaunoSidebarSectionDivider component
 */
interface RaunoSidebarSectionDividerProps {
  /** Additional CSS classes to apply to the divider */
  className?: string
}

/**
 * RaunoSidebarSectionDivider - Visual divider for spacing
 *
 * A subtle horizontal line used for spacing between items and sections.
 * Automatically rendered by headers, items, and sections based on context.
 */
const RaunoSidebarSectionDivider = ({ className }: RaunoSidebarSectionDividerProps) => {
  return (
    <div className={cn('h-2 flex items-center', className)}>
      <div className="w-8 bg-muted-foreground/50 h-px" />
    </div>
  )
}

/**
 * Props for the RaunoSidebarSection component
 */
interface RaunoSidebarSectionProps {
  /** The section content (headers and items) */
  children: React.ReactNode
  /** Additional CSS classes to apply to the section container */
  className?: string
  /** Whether this is the last section (prevents rendering trailing dividers) */
  isLast?: boolean
}

/**
 * RaunoSidebarSection - Container for a group of related sidebar items
 *
 * Groups related sidebar items together and automatically adds section dividers
 * after the section (unless it's the last one).
 */
const RaunoSidebarSection = ({ children, className, isLast = false }: RaunoSidebarSectionProps) => {
  const { sectionDividersLength } = useRaunoSidebarContext()

  return (
    <>
      <div className={cn('flex flex-col', className)}>{children}</div>
      {!isLast &&
        Array.from({ length: sectionDividersLength }).map((_, i) => (
          <RaunoSidebarSectionDivider key={`section-divider-${i}`} />
        ))}
    </>
  )
}

/**
 * Props for the RaunoSidebarSectionHeader component
 */
interface RaunoSidebarSectionHeaderProps {
  /** The header text/content */
  children: React.ReactNode
  /** Additional CSS classes to apply to the header */
  className?: string
}

/**
 * RaunoSidebarSectionHeader - Header for a sidebar section
 *
 * Displays a section title with a decorative line prefix.
 * Automatically adds item dividers below the header for spacing.
 */
const RaunoSidebarSectionHeader = ({ children, className }: RaunoSidebarSectionHeaderProps) => {
  const { itemDividersLength } = useRaunoSidebarContext()

  return (
    <>
      <h3
        className={cn(
          'text-sm font-medium text-foreground flex items-center gap-3 h-[10px]',
          className
        )}
      >
        <div className="w-8 bg-foreground/75 h-px" />
        <span>{children}</span>
      </h3>
      {Array.from({ length: itemDividersLength }).map((_, i) => (
        <RaunoSidebarSectionDivider key={`header-divider-${i}`} />
      ))}
    </>
  )
}

/**
 * Props for the RaunoSidebarItem component
 *
 * A clickable sidebar item with smooth hover and active state animations.
 */
interface RaunoSidebarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** The item label/text */
  children: React.ReactNode
  /** The link destination */
  href: string
  /** Whether this item is currently active/selected */
  isActive?: boolean
  /** Additional CSS classes to apply to the item container */
  className?: string
  /** Additional CSS classes to apply to the text/label */
  textClassName?: string
  /** Whether this is the last item (prevents rendering trailing dividers) */
  isLast?: boolean
}

/**
 * RaunoSidebarItem - Interactive navigation item
 *
 * A clickable sidebar item with smooth hover and active state animations.
 * The decorative line expands and changes color on hover/active.
 * Automatically adds item dividers below (unless it's the last one).
 *
 * @example
 * ```tsx
 * <RaunoSidebarItem
 *   href="/dashboard"
 *   isActive={currentPath === '/dashboard'}
 *   isLast={false}
 * >
 *   Dashboard
 * </RaunoSidebarItem>
 * ```
 */
const RaunoSidebarItem = ({
  children,
  isActive = false,
  className,
  textClassName,
  isLast = false,
  ...props
}: RaunoSidebarItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { itemDividersLength } = useRaunoSidebarContext()

  return (
    <>
      <motion.div
        initial={{ paddingRight: 16 }}
        animate={{ paddingRight: isHovered || isActive ? 0 : 16 }}
        transition={{ duration: 0.3 }}
        className={cn('flex items-center h-2', className)}
      >
        <Link
          className="gap-3 h-6 flex items-center w-max z-1 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <motion.div
            className="h-px bg-muted-foreground/50"
            initial={{ width: 32 }}
            animate={{
              width: isHovered || isActive ? 48 : 32,
              backgroundColor: isHovered || isActive ? 'var(--primary)' : undefined,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={cn('text-sm font-medium text-muted-foreground w-max', textClassName)}
            animate={{
              color: isHovered || isActive ? 'var(--primary)' : 'var(--muted-foreground)',
            }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.span>
        </Link>
      </motion.div>
      {!isLast &&
        Array.from({ length: itemDividersLength }).map((_, i) => (
          <RaunoSidebarSectionDivider key={`item-divider-${i}`} />
        ))}
    </>
  )
}

export {
  RaunoSidebar,
  RaunoSidebarSection,
  RaunoSidebarSectionHeader,
  RaunoSidebarSectionDivider,
  RaunoSidebarItem,
}
