/** biome-ignore-all lint/correctness/useImageSize: motion.img with layoutId doesn't support width/height */
/** biome-ignore-all lint/performance/noImgElement: motion.img is required for animation transitions */
"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

type NavContextType = {
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  registerImage: (id: string, image: string) => void
  images: Map<string, string>
}

const NavContext = createContext<NavContextType | null>(null)

const useNavContext = () => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error(
      "TtpBlurFocusNavigationItem must be used within TtpBlurFocusNavigation"
    )
  }
  return context
}

type TtpBlurFocusNavigationProps = {
  /**
   * Navigation items as children
   */
  children: ReactNode
}

/**
 * HomeBlurredNav - A navigation component with blurred background
 *
 * A beautiful navigation bar with backdrop blur effect, perfect for home pages.
 *
 * @example
 * ```tsx
 * <TtpBlurFocusNavigation>
 *   <TtpBlurFocusNavigationItem href="/" id="home" label="Home" />
 *   <TtpBlurFocusNavigationItem href="/about" id="about" label="About" />
 * </TtpBlurFocusNavigation>
 * ```
 */
export const TtpBlurFocusNavigation = ({
  children,
}: TtpBlurFocusNavigationProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [images, setImages] = useState<Map<string, string>>(new Map())

  const registerImage = useCallback((id: string, image: string) => {
    setImages((prev) => {
      const newMap = new Map(prev)
      newMap.set(id, image)
      return newMap
    })
  }, [])

  const contextValue = useMemo<NavContextType>(
    () => ({
      hoveredId,
      setHoveredId,
      registerImage,
      images,
    }),
    [hoveredId, images, registerImage]
  )

  const hoveredImage = hoveredId ? images.get(hoveredId) : null

  return (
    <NavContext.Provider value={contextValue}>
      <motion.nav
        className="relative z-50 flex w-full flex-col items-center justify-between gap-2 border-border/40 border-b bg-background/80 py-2 backdrop-blur-md transition-colors dark:border-border/20"
        style={{
          backgroundColor: "hsl(var(--background) / 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        {children}
      </motion.nav>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence mode="wait">
            {hoveredImage && (
              <motion.img
                alt="Nav preview"
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="pointer-events-none fixed right-4 bottom-4 z-50 max-w-64 origin-bottom-right overflow-hidden rounded-lg border border-border shadow-2xl"
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                key={"image-preview"}
                src={hoveredImage}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </NavContext.Provider>
  )
}

export type TtpBlurFocusNavigationItemProps = {
  className?: string
  label: string
  href: string
  id: string
  image: string
}

/**
 * HomeBlurredNavItem - A navigation item component
 *
 * Individual navigation item that updates the shared hover state via context.
 *
 * @example
 * ```tsx
 * <TtpBlurFocusNavigationItem href="/" id="home" label="Home" />
 * ```
 */
export const TtpBlurFocusNavigationItem = ({
  label,
  href,
  id,
  className,
  image,
}: TtpBlurFocusNavigationItemProps) => {
  const { hoveredId, setHoveredId, registerImage } = useNavContext()
  const isHovered = hoveredId === id

  // Register the image with the id when component mounts
  useEffect(() => {
    if (image) {
      registerImage(id, image)
    }
  }, [id, image, registerImage])

  return (
    <Link
      className={cn(
        "relative font-black text-5xl uppercase blur-none transition-all duration-300",
        !isHovered && "opacity-50 blur-sm",
        hoveredId === null && "opacity-100 blur-none",
        className
      )}
      href={href}
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      {label}
    </Link>
  )
}
