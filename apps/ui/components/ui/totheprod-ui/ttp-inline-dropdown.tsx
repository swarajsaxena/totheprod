/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: its a dropdown */
"use client"

import { AnimatePresence, motion } from "motion/react"
import type { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { cn } from "@/lib/utils"
import { Button } from "../button"
import { Kbd } from "../kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"

type InlineDropdownContextType = {
  mode: "icon" | "both"
  align: "left" | "right"
  onItemSelect?: () => void
}

const InlineDropdownContext = createContext<
  InlineDropdownContextType | undefined
>(undefined)

export const useInlineDropdownContext = () => {
  const context = useContext(InlineDropdownContext)
  if (!context) {
    throw new Error(
      "InlineDropdown components must be used within TtpInlineDropdown"
    )
  }
  return context
}

export type TtpInlineDropdownProps = {
  /** Whether the dropdown is open */
  open?: boolean
  /** The dropdown items to render */
  children: ReactNode
  /** Additional CSS classes to apply to the container */
  className?: string
  /** The ID of the item to show as the default trigger */
  defaultItemId?: string
  /** Display mode for the trigger button. Default: "icon" */
  mode?: "icon" | "both"
  /** Interaction type to open the dropdown. Default: "hover" */
  interactionType?: "hover" | "click"
  /** Alignment of the dropdown and icon position. Default: "left" */
  align?: "left" | "right"
  /** Padding around the dropdown container in pixels. Default: 4 */
  containerPadding?: number
  /** Gap between dropdown items in pixels. Default: 4 */
  containerGap?: number
  /** Auto-close dropdown after item selection. Default: true for click mode, false for hover */
  closeOnSelect?: boolean
  /** Callback fired when dropdown open state changes */
  onOpenChange?: (open: boolean) => void
  /** Disable the entire dropdown */
  disabled?: boolean
  /** Accessible label for the trigger button */
  ariaLabel?: string
}

type ItemElement<TId extends string = string> = ReactElement<{
  id: TId
  disabled?: boolean
  isDefault?: boolean
  inDropdown?: boolean
  tabIndex?: number
}>

/**
 * A dropdown that opens inline with smooth hover or click interactions
 *
 * The inline dropdown displays a single item (trigger) by default and expands to show
 * all items when hovered or clicked. The dropdown intelligently positions itself to align the
 * default item in the dropdown with the trigger button, maintaining visual continuity.
 *
 * @param children - The dropdown items to render
 * @param defaultItemId - The ID of the item to show as the default trigger
 * @param mode - Display mode for the trigger button (default: "icon")
 * @param interactionType - Interaction type to open the dropdown (default: "hover")
 * @param align - Alignment of the dropdown and icon position (default: "left")
 * @param containerPadding - Padding around the dropdown container in pixels (default: 4)
 * @param containerGap - Gap between dropdown items in pixels (default: 4)
 * @param className - Additional CSS classes to apply to the container
 *
 * @example Basic usage with hover
 * <TtpInlineDropdown defaultItemId="view-code" mode="icon">
 *   <TtpInlineDropdownItem id="view-code">
 *     <TtpInlineDropdownItemIcon><Icon /></TtpInlineDropdownItemIcon>
 *     <TtpInlineDropdownItemLabel>View Code</TtpInlineDropdownItemLabel>
 *   </TtpInlineDropdownItem>
 * </TtpInlineDropdown>
 *
 * @example With right alignment
 * <TtpInlineDropdown defaultItemId="edit" align="right">
 *   ...items
 * </TtpInlineDropdown>
 */
export const TtpInlineDropdown = ({
  open = false,
  children,
  className,
  defaultItemId,
  mode = "icon",
  interactionType = "hover",
  align = "left",
  containerPadding = 4,
  containerGap = 4,
  closeOnSelect,
  onOpenChange,
  disabled = false,
  ariaLabel,
}: TtpInlineDropdownProps) => {
  const [isOpen, setIsOpen] = useState(open)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const defaultItemRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId()

  // Helper to get button element by index
  const getItemButton = useCallback(
    (index: number): HTMLButtonElement | null => {
      const itemWrapper = dropdownRef.current?.querySelector(
        `[data-item-index="${index}"]`
      )
      return itemWrapper?.querySelector("button") as HTMLButtonElement | null
    },
    []
  )
  const menuId = `dropdown-menu-${uniqueId}`
  const triggerId = `dropdown-trigger-${uniqueId}`
  const childrenArray = Children.toArray(children)

  // Validation: Check for valid children
  const validItems = useMemo(() => {
    return childrenArray.filter(
      (child): child is ItemElement =>
        isValidElement(child) &&
        typeof child.props === "object" &&
        child.props !== null &&
        "id" in child.props &&
        typeof child.props.id === "string"
    )
  }, [childrenArray])

  // Dev-mode validation warnings
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Check for empty children
      if (validItems.length === 0) {
        console.warn(
          "[TtpInlineDropdown] No valid TtpInlineDropdownItem children found. At least one item is required."
        )
      }

      // Check for duplicate IDs
      const ids: string[] = validItems.map(
        (item: ItemElement) => item.props.id as string
      )
      const duplicates: string[] = ids.filter(
        (id: string, index: number) => ids.indexOf(id) !== index
      )
      if (duplicates.length > 0) {
        console.warn(
          `[TtpInlineDropdown] Duplicate item IDs found: ${duplicates.join(", ")}. Each item must have a unique ID.`
        )
      }

      // Check for invalid defaultItemId
      if (defaultItemId && !ids.includes(defaultItemId)) {
        console.warn(
          `[TtpInlineDropdown] defaultItemId "${defaultItemId}" not found in children. Falling back to first item.`
        )
      }
    }
  }, [validItems, defaultItemId])

  const defaultItemIndex = validItems.findIndex(
    (child): child is ItemElement =>
      isValidElement(child) &&
      typeof child.props === "object" &&
      child.props !== null &&
      "id" in child.props &&
      child.props.id === defaultItemId
  )

  const actualDefaultIndex = defaultItemIndex !== -1 ? defaultItemIndex : 0
  const defaultItem = validItems[actualDefaultIndex] as ItemElement | undefined

  // Calculate closeOnSelect default based on interactionType
  const shouldCloseOnSelect =
    closeOnSelect !== undefined ? closeOnSelect : interactionType === "click"

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      onOpenChange?.(open)
      if (!open) {
        setFocusedIndex(null)
        // Return focus to trigger when closing
        if (interactionType === "click") {
          setTimeout(() => {
            containerRef.current?.focus()
          }, 0)
        }
      } else if (interactionType === "click" && open) {
        // Auto-focus default item when opening in click mode
        setTimeout(() => {
          // Check if default item is enabled, otherwise fall back to first enabled
          const defaultItemDisabled = defaultItem?.props.disabled as
            | boolean
            | undefined
          const targetIndex =
            defaultItemDisabled === true
              ? validItems.findIndex(
                  (item: ItemElement) =>
                    !(item.props.disabled as boolean | undefined)
                )
              : actualDefaultIndex

          if (targetIndex !== -1) {
            setFocusedIndex(targetIndex)
            getItemButton(targetIndex)?.focus()
          }
        }, 100)
      }
    },
    [
      interactionType,
      onOpenChange,
      validItems,
      getItemButton,
      actualDefaultIndex,
      defaultItem,
    ]
  )

  // Calculate the top offset based on the default item's position
  // Get the actual height from the DOM element
  const itemHeight = defaultItemRef.current?.offsetHeight || 32
  const topOffset =
    actualDefaultIndex * (itemHeight + containerGap) + containerPadding

  // Get enabled items for keyboard navigation
  const enabledItems = useMemo(() => {
    return validItems
      .map((item: ItemElement, index: number) => ({ item, index }))
      .filter(
        ({ item }: { item: ItemElement }) =>
          !(item.props.disabled as boolean | undefined)
      )
  }, [validItems])

  // Handle click outside to close dropdown when in click mode
  useEffect(() => {
    if (interactionType !== "click" || !isOpen || disabled) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [interactionType, isOpen, disabled, handleOpenChange])

  const handleToggle = () => {
    if (disabled) {
      return
    }
    if (interactionType === "click") {
      handleOpenChange(!isOpen)
    }
  }

  const handleMouseEnter = () => {
    if (disabled) {
      return
    }
    if (interactionType === "hover") {
      handleOpenChange(true)
    }
  }

  const handleMouseLeave = () => {
    if (disabled) {
      return
    }
    if (interactionType === "hover") {
      handleOpenChange(false)
    }
  }

  const handleItemSelect = () => {
    if (shouldCloseOnSelect) {
      handleOpenChange(false)
    }
  }

  // Keyboard navigation handlers
  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) {
      return
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (interactionType === "click") {
        handleToggle()
      }
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault()
      const firstEnabledIndex = enabledItems[0]?.index ?? 0
      setFocusedIndex(firstEnabledIndex)
      getItemButton(firstEnabledIndex)?.focus()
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault()
      const lastEnabledIndex = enabledItems.at(-1)?.index ?? 0
      setFocusedIndex(lastEnabledIndex)
      getItemButton(lastEnabledIndex)?.focus()
    }
  }

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) {
      return
    }

    const currentFocused = focusedIndex ?? actualDefaultIndex
    const currentEnabledIndex = enabledItems.findIndex(
      ({ index }: { index: number }) => index === currentFocused
    )

    switch (e.key) {
      case "Escape": {
        e.preventDefault()
        handleOpenChange(false)
        containerRef.current?.focus()
        break
      }

      case "ArrowDown": {
        e.preventDefault()
        if (currentEnabledIndex < enabledItems.length - 1) {
          const nextItem = enabledItems[currentEnabledIndex + 1]
          setFocusedIndex(nextItem.index)
          getItemButton(nextItem.index)?.focus()
        } else {
          // Wrap to first
          const firstItem = enabledItems[0]
          if (firstItem) {
            setFocusedIndex(firstItem.index)
            getItemButton(firstItem.index)?.focus()
          }
        }
        break
      }

      case "ArrowUp": {
        e.preventDefault()
        if (currentEnabledIndex > 0) {
          const prevItem = enabledItems[currentEnabledIndex - 1]
          setFocusedIndex(prevItem.index)
          getItemButton(prevItem.index)?.focus()
        } else {
          // Wrap to last
          const lastItem = enabledItems.at(-1)
          if (lastItem) {
            setFocusedIndex(lastItem.index)
            getItemButton(lastItem.index)?.focus()
          }
        }
        break
      }

      case "Home": {
        e.preventDefault()
        const firstItem = enabledItems[0]
        if (firstItem) {
          setFocusedIndex(firstItem.index)
          getItemButton(firstItem.index)?.focus()
        }
        break
      }

      case "End": {
        e.preventDefault()
        const lastItem = enabledItems.at(-1)
        if (lastItem) {
          setFocusedIndex(lastItem.index)
          getItemButton(lastItem.index)?.focus()
        }
        break
      }

      case "Tab": {
        // Close dropdown on Tab
        handleOpenChange(false)
        break
      }

      default:
        break
    }
  }

  return (
    <InlineDropdownContext.Provider
      value={{
        mode,
        align,
        onItemSelect: handleItemSelect,
      }}
    >
      <button
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={ariaLabel}
        className={cn(
          "relative inline-flex",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        disabled={disabled}
        id={triggerId}
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        tabIndex={disabled ? -1 : 0}
        type="button"
      >
        <div ref={defaultItemRef}>
          {defaultItem &&
            cloneElement(defaultItem, {
              isDefault: true,
            })}
        </div>
        <AnimatePresence mode="wait">
          {isOpen && validItems.length > 0 && (
            <motion.div
              animate={{ opacity: 1 }}
              aria-labelledby={triggerId}
              className={cn(
                "absolute z-50 flex flex-col rounded-xl border border-solid bg-background shadow"
              )}
              exit={{ opacity: 0 }}
              id={menuId}
              initial={{ opacity: 0 }}
              onKeyDown={handleDropdownKeyDown}
              ref={dropdownRef}
              role="menu"
              style={{
                padding: `${containerPadding}px`,
                gap: `${containerGap}px`,
                ...(align === "left"
                  ? { left: `-${containerPadding + 1}px` }
                  : { right: `-${containerPadding + 1}px` }),
                top: `-${topOffset + 1}px`,
              }}
            >
              {validItems.map((child: ItemElement, index: number) => {
                if (!isValidElement(child)) {
                  return child
                }

                const isFocused = focusedIndex === index
                const itemId = child.props.id as string

                // Calculate distance from default item for stagger delay
                const distanceFromDefault = Math.abs(index - actualDefaultIndex)
                const isAboveDefault = index < actualDefaultIndex
                const isBelowDefault = index > actualDefaultIndex

                // Calculate animation direction based on position relative to default
                let initialY = 0
                if (isAboveDefault) {
                  initialY = 8
                } else if (isBelowDefault) {
                  initialY = -8
                }

                return (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                    data-item-index={index}
                    exit={{ opacity: 0, y: initialY }}
                    initial={{ opacity: 0, y: initialY }}
                    key={itemId}
                    transition={{
                      duration: 0.2,
                      delay: distanceFromDefault * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    {cloneElement(child as ItemElement, {
                      isDefault: index === actualDefaultIndex,
                      inDropdown: true,
                      tabIndex: isFocused ? 0 : -1,
                    })}
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      {/* Screen reader live region */}
      <div aria-atomic="true" aria-live="polite" className="sr-only">
        {isOpen
          ? `Dropdown menu opened with ${validItems.length} item${validItems.length !== 1 ? "s" : ""}`
          : ""}
      </div>
    </InlineDropdownContext.Provider>
  )
}

const itemBaseStyles =
  "relative px-2 flex justify-start select-none items-center gap-2 rounded-lg border border-border bg-background text-sm outline-hidden transition-colors focus:bg-accent data-disabled:pointer-events-none data-inset:pl-8 data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none"

export type TtpInlineDropdownItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
> & {
  /** Unique identifier for the item */
  id: string
  /** The content of the item (typically Icon and Label components) */
  children: ReactNode
  /** Click handler for the item */
  onClick?: () => void
  /** Disable the item */
  disabled?: boolean
  /** Internal prop to mark if this is the default item */
  isDefault?: boolean
  /** Internal prop to indicate if item is rendered in the dropdown */
  inDropdown?: boolean
  /** Text to display in the tooltip */
  shortcut?: string
}

/**
 * An individual item within the inline dropdown
 *
 * Represents a single actionable item in the dropdown. When used as the default item,
 * it renders as the trigger button. When in the dropdown, it shows both icon and label.
 *
 * @param id - Unique identifier for the item
 * @param children - The content of the item (typically Icon and Label components)
 * @param onClick - Click handler for the item
 * @param className - Additional CSS classes to apply to the item
 *
 * @example
 * <TtpInlineDropdownItem id="save" onClick={handleSave}>
 *   <TtpInlineDropdownItemIcon><SaveIcon /></TtpInlineDropdownItemIcon>
 *   <TtpInlineDropdownItemLabel>Save</TtpInlineDropdownItemLabel>
 * </TtpInlineDropdownItem>
 */
export const TtpInlineDropdownItem = ({
  id: _id, // Used by parent component via child.props.id
  children,
  onClick,
  disabled = false,
  isDefault,
  inDropdown,
  shortcut,
}: TtpInlineDropdownItemProps) => {
  const context = useInlineDropdownContext()

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    // If this is the default item used as trigger (not in dropdown), don't execute onClick
    // Let the event bubble up to the trigger button's onClick handler to open the dropdown
    if (isDefault && !inDropdown) {
      // Don't stop propagation - let it bubble to trigger button
      // Don't execute onClick - just let the trigger handle it
      return
    }

    // Stop propagation to prevent triggering the container's onClick
    if (inDropdown) {
      e.stopPropagation()
    }
    onClick?.()
    context.onItemSelect?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }

    // If this is the default item used as trigger (not in dropdown), don't execute onClick
    // The trigger button's keyboard handler will handle opening the dropdown
    if (isDefault && !inDropdown) {
      return
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick?.()
      context.onItemSelect?.()
    }
  }

  const itemProps = {
    "aria-disabled": disabled,
    disabled,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    role: inDropdown ? "menuitem" : undefined,
    tabIndex: 0,
    "data-shortcut": shortcut,
  }

  // If this is the default item and not in dropdown, render icon only
  if (isDefault && !inDropdown && context.mode === "icon") {
    return (
      <Button
        {...itemProps}
        className={itemBaseStyles}
        size={"icon-sm"}
        variant={"outline"}
      >
        {Children.toArray(children).find(
          (child) =>
            isValidElement(child) &&
            typeof child.type === "function" &&
            child.type.name === "TtpInlineDropdownItemIcon"
        )}
      </Button>
    )
  }

  const item = (
    <Button
      {...itemProps}
      className={cn(
        itemBaseStyles,
        inDropdown && "w-full",
        context.align === "right" &&
          inDropdown &&
          "flex-row-reverse justify-end"
      )}
      size={"icon-sm"}
      variant={"outline"}
    >
      {children}
    </Button>
  )

  if (shortcut) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{item}</TooltipTrigger>
        <TooltipContent
          className="px-2 py-0.5"
          side={context.align === "left" ? "right" : "left"}
        >
          <Kbd className="p-0">{shortcut}</Kbd>
        </TooltipContent>
      </Tooltip>
    )
  }
  return item
}

export type TtpInlineDropdownItemIconProps = {
  /** The icon component to render */
  children: ReactNode
}

/**
 * Icon wrapper for dropdown items
 *
 * Wraps icon components for consistent sizing and styling within dropdown items.
 * Icons are automatically sized to 16px (size-4) by the parent item styles.
 *
 * @param children - The icon component to render
 *
 * @example
 * <TtpInlineDropdownItemIcon>
 *   <HugeiconsIcon icon={SourceCodeIcon} />
 * </TtpInlineDropdownItemIcon>
 */
export const TtpInlineDropdownItemIcon = ({
  children,
}: TtpInlineDropdownItemIconProps) => {
  return children
}

export type TtpInlineDropdownItemLabelProps = {
  /** The text label to display */
  children: ReactNode
}

/**
 * Label component for dropdown items
 *
 * Displays text labels for dropdown items. Hidden when the item is used as the
 * trigger button in "icon" mode, visible in the expanded dropdown.
 * Text size is set to "text-xs" (12px) for compact display.
 *
 * @param children - The text label to display
 *
 * @example
 * <TtpInlineDropdownItemLabel>
 *   View Source Code
 * </TtpInlineDropdownItemLabel>
 */
export const TtpInlineDropdownItemLabel = ({
  children,
}: TtpInlineDropdownItemLabelProps) => {
  return <span className="w-full text-left text-xs">{children}</span>
}
