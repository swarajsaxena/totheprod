import { useEffect, useState } from "react"

/**
 * Tailwind CSS default breakpoints
 * @see https://tailwindcss.com/docs/breakpoints
 */
export const TAILWIND_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export type TailwindBreakpoint = keyof typeof TAILWIND_BREAKPOINTS

/**
 * Hook to check if viewport width is greater than or equal to a minimum width.
 * Handles resize and zoom changes automatically.
 *
 * @param minWidth - Minimum width in pixels or Tailwind breakpoint name
 * @returns true if viewport width >= minWidth, false otherwise
 *
 * @example
 * // Using pixel value
 * const isWide = useMinWidth(1024)
 *
 * @example
 * // Using Tailwind breakpoint
 * const isDesktop = useMinWidth('lg')
 * const isTablet = useMinWidth('md')
 */
export const useMinWidth = (minWidth: number | TailwindBreakpoint) => {
  const [isMinWidth, setIsMinWidth] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const breakpointValue =
      typeof minWidth === "string" ? TAILWIND_BREAKPOINTS[minWidth] : minWidth

    const mql = window.matchMedia(`(min-width: ${breakpointValue}px)`)

    const handleChange = () => {
      setIsMinWidth(window.innerWidth >= breakpointValue)
    }

    mql.addEventListener("change", handleChange)
    setIsMinWidth(window.innerWidth >= breakpointValue)

    return () => mql.removeEventListener("change", handleChange)
  }, [minWidth])

  return !!isMinWidth
}
