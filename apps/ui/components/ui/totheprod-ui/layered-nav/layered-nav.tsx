"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { WavyText } from "../wavy-text/wavy-text"

export type MenuItem = {
  color: string
  text: string
  href?: string
}

type LayeredNavProps = {
  /** Array of menu items with color and text */
  menuItems?: MenuItem[]
  /** Background color of the menu overlay */
  backgroundColor?: string
  /** Text color for header and trigger */
  textColor?: string
  /** Brand text displayed in the header */
  brandText?: string
  /** Whether the menu starts open */
  defaultOpen?: boolean
  /** Callback fired when menu open state changes */
  onOpenChange?: (isOpen: boolean) => void
  /** Custom class name for the container */
  containerClassName?: string
  /** Text for the open trigger button */
  openTriggerText?: string
  /** Text for the close trigger button */
  closeTriggerText?: string
  /** Whether to show the brand header */
  showBrandHeader?: boolean
  /** Custom class name for the menu items */
  itemClassName?: string
}

export const LayeredNav = ({
  menuItems = [
    { color: "#8E9067", text: "Home", href: "#" },
    { color: "#BE5B2A", text: "About", href: "#" },
    { color: "#828D94", text: "Contact", href: "#" },
    { color: "#D69A3F", text: "Services", href: "#" },
    { color: "#B6A897", text: "Products", href: "#" },
  ],
  backgroundColor = "#1C1B19",
  textColor = "#B6A897",
  brandText = "Layered Nav",
  defaultOpen = false,
  onOpenChange,
  containerClassName,
  openTriggerText = "Menu",
  closeTriggerText = "Close",
  showBrandHeader = true,
  itemClassName,
}: LayeredNavProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isMenuItemHover, setisMenuItemHover] = useState<number | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setHasAnimated(false)
      const timer = setTimeout(() => {
        setHasAnimated(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  const handleSetIsOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    setIsOpen(value)
  }

  return (
    <>
      <MenuTrigger
        setIsOpen={handleSetIsOpen}
        text={openTriggerText}
        textColor={textColor}
      />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            animate={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            className={cn(
              "absolute top-0 left-0 flex h-full w-full flex-col overflow-hidden",
              containerClassName
            )}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, delay: menuItems.length * 0.1 },
            }}
            initial={{ opacity: 0 }}
            key="layered-nav-menu"
            style={{ backgroundColor }}
          >
            {showBrandHeader && (
              <div
                className="flex items-center justify-between p-8"
                style={{ color: textColor }}
              >
                <span className="font-bold text-2xl">{brandText}</span>
                <MenuTrigger
                  className="relative top-0 right-0"
                  setIsOpen={handleSetIsOpen}
                  text={closeTriggerText}
                  textColor={textColor}
                />
              </div>
            )}
            <div className="relative flex-1">
              {menuItems.map((item, index) => (
                <Link href={item.href || "#"} key={item.text}>
                  <motion.div
                    animate={{
                      top: `${(100 / menuItems.length) * index}%`,
                      y: (() => {
                        if (isMenuItemHover === null) {
                          return 0
                        }
                        if (index === isMenuItemHover) {
                          return -30
                        }
                        if (index < isMenuItemHover) {
                          return -20
                        }
                        return 20
                      })(),
                      opacity: 1,
                    }}
                    className={cn(
                      "absolute bottom-0 left-0 h-screen w-full cursor-pointer rounded-t-4xl border p-[1.4vw] text-center font-black font-heading text-[#1C1B19] text-[10vw] shadow-2xl",
                      itemClassName
                    )}
                    exit={{
                      top: "100%",
                      opacity: 0,
                      y: 0,
                      transition: {
                        duration: 1,
                        ease: "easeIn",
                        type: "spring",
                        delay: (menuItems.length - 1 - index) * 0.1,
                      },
                    }}
                    initial={{
                      top: "100%",
                      opacity: 0,
                    }}
                    key={item.text}
                    onMouseEnter={() => setisMenuItemHover(index)}
                    onMouseLeave={() => setisMenuItemHover(null)}
                    style={{
                      backgroundColor: item.color,
                    }}
                    transition={{
                      duration: hasAnimated ? 0.5 : 1,
                      ease: "easeIn",
                      type: "spring",
                      delay: hasAnimated ? 0 : index * 0.1,
                    }}
                  >
                    <span>{item.text}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

type LayeredNavTriggerProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  text: string
  textColor?: string
  className?: string
}

const MenuTrigger = ({
  setIsOpen,
  text,
  textColor = "#B6A897",
  className,
}: LayeredNavTriggerProps) => {
  return (
    <button
      className={cn(
        "flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1",
        className
      )}
      onClick={() => setIsOpen((prev) => !prev)}
      style={{
        borderColor: textColor,
        color: textColor,
      }}
      type="button"
    >
      <WavyText
        className="flex items-center gap-1 text-sm"
        text={text}
        textClassName="text-xs"
      />
    </button>
  )
}
