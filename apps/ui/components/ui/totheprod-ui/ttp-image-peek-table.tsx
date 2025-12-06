"use client"

import { motion } from "motion/react"
import Image from "next/image"
import {
  Children,
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type RowIndexContextType = {
  getNextIndex: () => number
  reset: () => void
}

const RowIndexContext = createContext<RowIndexContextType | null>(null)

const useRowIndex = () => {
  const context = useContext(RowIndexContext)
  if (!context) {
    return null
  }
  return context.getNextIndex()
}

type ImageHoverContextType = {
  setHoveredImageUrl: (url: string | null) => void
}

const ImageHoverContext = createContext<ImageHoverContextType | null>(null)

const useImageHover = () => {
  const context = useContext(ImageHoverContext)
  if (!context) {
    return null
  }
  return context
}

type LandoNorrisTableProps = {
  className?: string
  children: ReactNode
}

type LandoNorrisTableHeaderProps = {
  className?: string
  children: ReactNode
}

type LandoNorrisTableBodyProps = {
  className?: string
  children: ReactNode
}

type LandoNorrisTableRowProps = {
  className?: string
  children: ReactNode
  onClick?: () => void
  imageUrl?: string
}

type LandoNorrisTableCellProps = {
  className?: string
  children: ReactNode
}

type LandoNorrisTableHeadProps = {
  className?: string
  children: ReactNode
}

type LandoNorrisTableFooterProps = {
  className?: string
  children: ReactNode
}

type LandoNorrisTableCaptionProps = {
  className?: string
  children: ReactNode
}

export const LandoNorrisTable = ({
  className,
  children,
}: LandoNorrisTableProps) => {
  const [hoveredImageUrl, setHoveredImageUrl] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const imageHoverContextValue = useMemo<ImageHoverContextType>(
    () => ({
      setHoveredImageUrl,
    }),
    []
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <ImageHoverContext.Provider value={imageHoverContextValue}>
      {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: Decorative hover effect */}
      <section
        aria-label="Table with image preview"
        className={cn("w-full overflow-hidden **:text-left", className)}
        onMouseMove={handleMouseMove}
      >
        <Table className="w-full border-collapse">{children}</Table>
        {hoveredImageUrl && (
          <motion.div
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x + 20,
              y: mousePosition.y - 192,
            }}
            className="pointer-events-none fixed z-50 aspect-9/16 h-96 overflow-hidden rounded-lg border border-border shadow-2xl"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
            style={{
              left: 0,
              top: 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Image
              alt="Row preview"
              className="h-full w-full object-cover"
              height={256}
              src={hoveredImageUrl}
              unoptimized
              width={384}
            />
          </motion.div>
        )}
      </section>
    </ImageHoverContext.Provider>
  )
}

export const LandoNorrisTableHeader = ({
  className,
  children,
}: LandoNorrisTableHeaderProps) => {
  return (
    <TableHeader
      className={cn("bg-transparent hover:bg-transparent!", className)}
    >
      {children}
    </TableHeader>
  )
}

export const LandoNorrisTableBody = ({
  className,
  children,
}: LandoNorrisTableBodyProps) => {
  const indexRef = useMemo(() => ({ current: 0 }), [])

  const contextValue = useMemo<RowIndexContextType>(
    () => ({
      getNextIndex: () => {
        const current = indexRef.current
        indexRef.current += 1
        return current
      },
      reset: () => {
        indexRef.current = 0
      },
    }),
    [indexRef]
  )

  return (
    <RowIndexContext.Provider value={contextValue}>
      <TableBody className={cn(className)}>{children}</TableBody>
    </RowIndexContext.Provider>
  )
}

export const LandoNorrisTableRow = ({
  className,
  children,
  onClick,
  imageUrl,
}: LandoNorrisTableRowProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const imageHover = useImageHover()
  const rowIndex = useRowIndex()
  const delay = rowIndex !== null ? rowIndex * 0.02 : 0
  const columnCount = Children.count(children)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (imageUrl && imageHover) {
      imageHover.setHoveredImageUrl(imageUrl)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (imageHover) {
      imageHover.setHoveredImageUrl(null)
    }
  }

  return (
    <TableRow
      className={cn(
        "relative z-10 border-border/50 border-b transition-colors first:border-t! last:border-b! hover:bg-transparent hover:text-background",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onClick()
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <TableCell
        className="role-background absolute inset-0 z-50 p-0"
        colSpan={columnCount}
      >
        <motion.div
          animate={{ width: 0 }}
          className="absolute right-0 z-100 h-full w-full bg-foreground"
          initial={{ width: "100%" }}
          transition={{ duration: 0.3, delay, ease: "easeInOut" }}
        />
      </TableCell>
      <TableCell
        className="role-foreground absolute inset-0 z-0 p-0"
        colSpan={columnCount}
      >
        <motion.div
          animate={{
            height: isHovered ? "100%" : 0,
          }}
          className="-translate-y-1/2 absolute top-1/2 right-0 z-0 h-0 w-full bg-foreground"
          initial={{ height: "0" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </TableCell>
      {children}
    </TableRow>
  )
}

export const LandoNorrisTableCell = ({
  className,
  children,
}: LandoNorrisTableCellProps) => {
  return (
    <TableCell
      className={cn(
        "-tracking-wide relative z-10 p-0 px-1 py-1 text-left font-bold font-heading text-4xl text-inherit",
        className
      )}
    >
      {children}
    </TableCell>
  )
}

export const LandoNorrisTableHead = ({
  className,
  children,
}: LandoNorrisTableHeadProps) => {
  return (
    <TableHead
      className={cn(
        "relative z-10 h-[unset] px-1 pt-1! pb-4 font-normal text-[10px] text-inherit uppercase",
        className
      )}
    >
      {children}
    </TableHead>
  )
}

export const LandoNorrisTableFooter = ({
  className,
  children,
}: LandoNorrisTableFooterProps) => {
  return <TableFooter className={cn(className)}>{children}</TableFooter>
}

export const LandoNorrisTableCaption = ({
  className,
  children,
}: LandoNorrisTableCaptionProps) => {
  return <TableCaption className={cn(className)}>{children}</TableCaption>
}
