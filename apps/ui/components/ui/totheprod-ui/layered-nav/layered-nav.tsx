'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { WavyText } from '../wavy-text/wavy-text'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface MenuItem {
  color: string
  text: string
  href?: string
}

interface LayeredNavProps {
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
    { color: '#8E9067', text: 'Home', href: '#' },
    { color: '#BE5B2A', text: 'About', href: '#' },
    { color: '#828D94', text: 'Contact', href: '#' },
    { color: '#D69A3F', text: 'Services', href: '#' },
    { color: '#B6A897', text: 'Products', href: '#' },
  ],
  backgroundColor = '#1C1B19',
  textColor = '#B6A897',
  brandText = 'Layered Nav',
  defaultOpen = false,
  onOpenChange,
  containerClassName,
  openTriggerText = 'Menu',
  closeTriggerText = 'Close',
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
      <MenuTrigger setIsOpen={handleSetIsOpen} text={openTriggerText} textColor={textColor} />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="layered-nav-menu"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, delay: menuItems.length * 0.1 },
            }}
            style={{ backgroundColor }}
            className={cn(
              'absolute top-0 left-0 flex h-full w-full flex-col overflow-hidden',
              containerClassName
            )}
          >
            {showBrandHeader && (
              <div style={{ color: textColor }} className="flex items-center justify-between p-8">
                <span className="text-2xl font-bold">{brandText}</span>
                <MenuTrigger
                  setIsOpen={handleSetIsOpen}
                  text={closeTriggerText}
                  textColor={textColor}
                  className="relative top-0 right-0"
                />
              </div>
            )}
            <div className="relative flex-1">
              {menuItems.map((item, index) => (
                <Link href={item.href || '#'} key={item.text}>
                  <motion.div
                    key={item.text}
                    className={cn(
                      'font-clash absolute bottom-0 left-0 h-screen w-full cursor-pointer rounded-t-4xl border p-[1.4vw] text-center text-[10vw] font-black text-[#1C1B19] shadow-2xl',
                      itemClassName
                    )}
                    onMouseEnter={() => setisMenuItemHover(index)}
                    onMouseLeave={() => setisMenuItemHover(null)}
                    style={{
                      backgroundColor: item.color,
                    }}
                    initial={{
                      top: '100%',
                      opacity: 0,
                    }}
                    animate={{
                      top: `${(100 / menuItems.length) * index}%`,
                      y:
                        isMenuItemHover === null
                          ? 0
                          : index === isMenuItemHover
                            ? -30
                            : index < isMenuItemHover
                              ? -20
                              : 20,
                      opacity: 1,
                    }}
                    exit={{
                      top: '100%',
                      opacity: 0,
                      y: 0,
                      transition: {
                        duration: 1,
                        ease: 'easeIn',
                        type: 'spring',
                        delay: (menuItems.length - 1 - index) * 0.1,
                      },
                    }}
                    transition={{
                      duration: hasAnimated ? 0.5 : 1,
                      ease: 'easeIn',
                      type: 'spring',
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

interface LayeredNavTriggerProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  text: string
  textColor?: string
  className?: string
}

const MenuTrigger = ({
  setIsOpen,
  text,
  textColor = '#B6A897',
  className,
}: LayeredNavTriggerProps) => {
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      style={{
        borderColor: textColor,
        color: textColor,
      }}
      className={cn(
        'flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1',
        className
      )}
    >
      <WavyText text={text} className="flex items-center gap-1 text-sm" textClassName="text-xs" />
    </button>
  )
}
