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

"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Context value for RaunoSidebar configuration
 */
type TtpTickerSidebarContextValue = {
  /** Number of dividers to render between items within a section */
  itemDividersLength: number
  /** Number of dividers to render between sections */
  sectionDividersLength: number
}

/**
 * Context for sharing divider configuration across sidebar components
 */
const TtpTickerSidebarContext = createContext<TtpTickerSidebarContextValue>({
  itemDividersLength: 2,
  sectionDividersLength: 4,
})

/**
 * Hook to access the RaunoSidebar context
 * @returns The current sidebar context value
 */
const useTtpTickerSidebarContext = () => useContext(TtpTickerSidebarContext)

/**
 * Props for the RaunoSidebar component
 */
type TtpTickerSidebarProps = {
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
const TtpTickerSidebar = ({
  children,
  className,
  itemDividersLength = 2,
  sectionDividersLength = 4,
}: TtpTickerSidebarProps) => {
  return (
    <TtpTickerSidebarContext.Provider
      value={{ itemDividersLength, sectionDividersLength }}
    >
      <div className={cn("flex w-full min-w-max flex-col p-4", className)}>
        {children}
      </div>
    </TtpTickerSidebarContext.Provider>
  )
}

/**
 * Props for the RaunoSidebarSectionDivider component
 */
type TtpTickerSidebarSectionDividerProps = {
  /** Additional CSS classes to apply to the divider */
  className?: string
}

/**
 * RaunoSidebarSectionDivider - Visual divider for spacing
 *
 * A subtle horizontal line used for spacing between items and sections.
 * Automatically rendered by headers, items, and sections based on context.
 */
const TtpTickerSidebarSectionDivider = ({
  className,
}: TtpTickerSidebarSectionDividerProps) => {
  return (
    <div className={cn("flex h-2 items-center", className)}>
      <div className="h-px w-8 bg-muted-foreground/50" />
    </div>
  )
}

/**
 * Props for the RaunoSidebarSection component
 */
type TtpTickerSidebarSectionProps = {
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
const TtpTickerSidebarSection = ({
  children,
  className,
  isLast = false,
}: TtpTickerSidebarSectionProps) => {
  const { sectionDividersLength } = useTtpTickerSidebarContext()

  return (
    <div className={cn("flex flex-col", className)}>
      {children}
      {!isLast &&
        Array.from({ length: sectionDividersLength }).map((_, i) => (
          <TtpTickerSidebarSectionDivider key={`section-divider-${i}`} />
        ))}
    </div>
  )
}

/**
 * Props for the RaunoSidebarSectionHeader component
 */
type TtpTickerSidebarSectionHeaderProps = {
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
const TtpTickerSidebarSectionHeader = ({
  children,
  className,
}: TtpTickerSidebarSectionHeaderProps) => {
  const { itemDividersLength } = useTtpTickerSidebarContext()

  return (
    <>
      <div
        className={cn(
          "flex h-[10px] items-center gap-3 font-medium text-foreground text-sm",
          className
        )}
      >
        <div className="h-px w-8 bg-foreground/75" data-role="bar" />
        <span>{children}</span>
      </div>
      {Array.from({ length: itemDividersLength }).map((_, i) => (
        <TtpTickerSidebarSectionDivider key={`header-divider-${i}`} />
      ))}
    </>
  )
}

/**
 * Props for the RaunoSidebarItem component
 *
 * A clickable sidebar item with smooth hover and active state animations.
 */
interface TtpTickerSidebarItemProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
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
const TtpTickerSidebarItem = ({
  children,
  isActive = false,
  className,
  textClassName,
  isLast = false,
  ...props
}: TtpTickerSidebarItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { itemDividersLength } = useTtpTickerSidebarContext()

  return (
    <>
      <motion.div
        animate={{ paddingRight: isHovered || isActive ? 0 : 16 }}
        className={cn("flex h-2 items-center", className)}
        initial={{ paddingRight: 16 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          className="relative z-1 flex h-6 w-max items-center gap-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <motion.div
            animate={{
              width: isHovered || isActive ? 48 : 32,
              backgroundColor:
                isHovered || isActive ? "var(--primary)" : undefined,
            }}
            className="h-px bg-muted-foreground/50"
            initial={{ width: 32 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={{
              color:
                isHovered || isActive
                  ? "var(--primary)"
                  : "var(--muted-foreground)",
            }}
            className={cn(
              "w-max font-medium text-muted-foreground text-sm",
              textClassName
            )}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.span>
        </Link>
      </motion.div>
      {!isLast &&
        Array.from({ length: itemDividersLength }).map((_, i) => (
          <TtpTickerSidebarSectionDivider key={`item-divider-${i}`} />
        ))}
    </>
  )
}

export {
  TtpTickerSidebar,
  TtpTickerSidebarSection,
  TtpTickerSidebarSectionHeader,
  TtpTickerSidebarSectionDivider,
  TtpTickerSidebarItem,
}
