/**
 * @file RaycastCommandMenu Component
 * @description A command menu component inspired by Raycast's design with keyboard shortcuts support.
 *
 * Features:
 * - Keyboard shortcut support via react-hotkeys-hook
 * - Context-based state management
 * - Composable components for flexible layouts
 * - Search functionality with sections
 * - Optional banner and footer
 *
 * @example
 * ```tsx
 * <CommandPaletteProvider shortcut="mod+k">
 *   <RaycastCommandMenu>
 *     <CommandPaletteInput placeholder="Search..." />
 *     <CommandPaletteContent>
 *       <CommandPaletteSection title="Navigation">
 *         <CommandPaletteItem icon={<Icon />} title="Home" onSelect={() => {}} />
 *       </CommandPaletteSection>
 *     </CommandPaletteContent>
 *   </RaycastCommandMenu>
 * </CommandPaletteProvider>
 * ```
 */

"use client"

// biome-ignore lint/performance/noNamespaceImport: React namespace needed for complex component patterns
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

/**
 * Types
 */
export type RaycastCommandItem = {
  id: string
  icon: React.ReactNode
  title: string
  description?: string
  type?: string
  onSelect?: () => void
  actions?: RaycastAction[]
}

export type RaycastAction = {
  id: string
  icon?: React.ReactNode
  label: string
  shortcut?: string[]
  onAction?: () => void
}

export type RaycastSection = {
  id: string
  title: string
  items: RaycastCommandItem[]
}

/**
 * Utility function to parse shortcut string to display format
 */
const parseShortcutToDisplay = (shortcut: string): string[] => {
  const isMac =
    typeof window !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0

  return shortcut.split("+").map((key) => {
    const normalizedKey = key.toLowerCase().trim()

    switch (normalizedKey) {
      case "mod":
      case "meta":
      case "cmd":
      case "command":
        return isMac ? "⌘" : "Ctrl"
      case "ctrl":
      case "control":
        return isMac ? "⌃" : "Ctrl"
      case "shift":
        return isMac ? "⇧" : "Shift"
      case "alt":
      case "option":
        return isMac ? "⌥" : "Alt"
      default:
        return key.toUpperCase()
    }
  })
}

/**
 * Context
 */
type RaycastCommandMenuContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  search: string
  setSearch: (search: string) => void
  selectedItem: RaycastCommandItem | null
  setSelectedItem: (item: RaycastCommandItem | null) => void
  showActions: boolean
  setShowActions: (show: boolean) => void
  itemsRegistry: React.MutableRefObject<Map<string, RaycastCommandItem>>
  actionsShortcut: string
}

const RaycastCommandMenuContext = React.createContext<
  RaycastCommandMenuContextType | undefined
>(undefined)

/**
 * Hook to access command menu context
 */
export const useRaycastCommandMenu = () => {
  const context = React.useContext(RaycastCommandMenuContext)

  if (!context) {
    throw new Error(
      "useRaycastCommandMenu must be used within RaycastCommandMenu"
    )
  }

  return context
}

/**
 * Hook to access command menu open state
 * Useful for controlling the menu from external components
 */
export const useTtpCommandPaletteState = () => {
  const context = React.useContext(RaycastCommandMenuContext)

  if (!context) {
    throw new Error(
      "useTtpCommandPaletteState must be used within TtpCommandPalette"
    )
  }

  return {
    open: context.open,
    setOpen: context.setOpen,
  }
}

/**
 * Provider Component (can be used standalone)
 */
export const CommandPaletteProvider = ({
  children,
  shortcut = "mod+k",
  actionsShortcut = "mod+k",
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode
  shortcut?: string
  actionsShortcut?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedItem, setSelectedItem] =
    React.useState<RaycastCommandItem | null>(null)
  const [showActions, setShowActions] = React.useState(false)
  const itemsRegistry = React.useRef<Map<string, RaycastCommandItem>>(new Map())

  // Use controlled state if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const newValue = typeof value === "function" ? value(open) : value

      if (isControlled) {
        onOpenChange?.(newValue)
      } else {
        setInternalOpen(newValue)
      }
    },
    [isControlled, onOpenChange, open]
  )

  // Main menu toggle shortcut
  useHotkeys(
    shortcut,
    (e) => {
      e.preventDefault()
      setOpen((prev) => !prev)
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      enabled: true,
      preventDefault: true,
    },
    [setOpen]
  )

  useHotkeys(
    "esc",
    (e) => {
      e.preventDefault()
      setOpen(false)
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      enabled: open,
      preventDefault: true,
    },
    [open]
  )

  // Actions popover toggle shortcut
  useHotkeys(
    actionsShortcut,
    (e) => {
      if (open && selectedItem?.actions && selectedItem.actions.length > 0) {
        e.preventDefault()
        setShowActions((prev) => !prev)
      }
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      enabled:
        open && !!selectedItem?.actions && selectedItem.actions.length > 0,
      preventDefault: true,
    },
    [open, selectedItem, setShowActions]
  )

  React.useEffect(() => {
    if (!open) {
      setShowActions(false)
      setSelectedItem(null)
      setSearch("")
      itemsRegistry.current.clear()
    }
  }, [open])

  return (
    <RaycastCommandMenuContext.Provider
      value={{
        open,
        setOpen,
        search,
        setSearch,
        selectedItem,
        setSelectedItem,
        showActions,
        setShowActions,
        itemsRegistry,
        actionsShortcut,
      }}
    >
      {children}
    </RaycastCommandMenuContext.Provider>
  )
}

/**
 * Dialog Component (can be used standalone with provider)
 */
export const CommandPaletteDialog = ({
  children,
  className,
  showCloseButton = false,
  showOverlay = false,
  title = "Command Menu",
  description = "Search for apps, commands, and actions",
}: {
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  showOverlay?: boolean
  title?: string
  description?: string
}) => {
  const { open, setOpen, itemsRegistry, setSelectedItem } =
    useRaycastCommandMenu()
  const [commandValue, setCommandValue] = React.useState<string>("")

  const handleValueChange = React.useCallback(
    (value: string) => {
      setCommandValue(value)
      const item = itemsRegistry.current.get(value)
      if (item) {
        setSelectedItem(item)
      }
    },
    [itemsRegistry, setSelectedItem]
  )

  // Reset command value when dialog closes
  React.useEffect(() => {
    if (!open) {
      setCommandValue("")
    }
  }, [open])

  return (
    <CommandDialog
      className={cn(
        "w-full rounded-2xl bg-background/50 backdrop-blur-md *:bg-transparent sm:max-w-3xl dark:bg-background/50",
        className
      )}
      description={description}
      onOpenChange={setOpen}
      onValueChange={handleValueChange}
      open={open}
      showCloseButton={showCloseButton}
      showOverlay={showOverlay}
      title={title}
      value={commandValue}
    >
      {children}
    </CommandDialog>
  )
}

/**
 * Main Component with built-in provider
 */
type RaycastCommandMenuProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  showOverlay?: boolean
  shortcut?: string
  actionsShortcut?: string
  title?: string
  description?: string
}

export const RaycastCommandMenu = ({
  open,
  onOpenChange,
  children,
  className,
  showCloseButton = false,
  showOverlay = false,
  shortcut = "mod+k",
  actionsShortcut = "mod+k",
  title = "Command Menu",
  description = "Search for apps, commands, and actions",
}: RaycastCommandMenuProps) => {
  return (
    <CommandPaletteProvider
      actionsShortcut={actionsShortcut}
      onOpenChange={onOpenChange}
      open={open}
      shortcut={shortcut}
    >
      <CommandPaletteDialog
        className={className}
        description={description}
        showCloseButton={showCloseButton}
        showOverlay={showOverlay}
        title={title}
      >
        {children}
      </CommandPaletteDialog>
    </CommandPaletteProvider>
  )
}

/**
 * Input Component
 */
type CommandPaletteInputProps = {
  placeholder?: string
  askAiLabel?: string | false
  className?: string
}

export const CommandPaletteInput = ({
  placeholder = "Search for apps and commands...",
  askAiLabel = "Ask AI",
  className,
}: CommandPaletteInputProps) => {
  const { search, setSearch } = useRaycastCommandMenu()

  return (
    <div
      className={cn("relative flex items-center border-b px-4 py-1", className)}
    >
      <CommandInput
        className="h-14 w-full flex-1 border-0 text-base"
        onValueChange={setSearch}
        placeholder={placeholder}
        value={search}
      />
      {askAiLabel && (
        <div className="flex items-center gap-2">
          <button
            className="text-muted-foreground text-sm hover:text-foreground"
            type="button"
          >
            {askAiLabel}
          </button>
          <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-lg border bg-background px-1.5 font-fira font-medium text-[8px] text-muted-foreground opacity-100">
            <span className="text-xs">Tab</span>
          </kbd>
        </div>
      )}
    </div>
  )
}

/**
 * Banner Component
 */
type RaycastCommandMenuBannerProps = {
  icon: React.ReactNode
  title: string
  version?: string
  action: { label: string; onClick: () => void }
  className?: string
}

export const RaycastCommandMenuBanner = ({
  icon,
  title,
  version,
  action,
  className,
}: RaycastCommandMenuBannerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b px-4 py-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        {version && (
          <span className="text-muted-foreground text-sm">{version}</span>
        )}
      </div>
      <button
        className="rounded-md px-3 py-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
        onClick={action.onClick}
        type="button"
      >
        {action.label}
      </button>
    </div>
  )
}

/**
 * Content Component
 */
type CommandPaletteContentProps = {
  children: React.ReactNode
  emptyText?: string
  className?: string
}

export const CommandPaletteContent = ({
  children,
  emptyText = "No results found.",
  className,
}: CommandPaletteContentProps) => {
  return (
    <CommandList
      className={cn("max-h-[400px] overflow-y-auto py-2!", className)}
    >
      <CommandEmpty className="p-8 text-center">{emptyText}</CommandEmpty>
      {children}
    </CommandList>
  )
}

/**
 * Section Component
 */
type CommandPaletteSectionProps = {
  title: string
  children: React.ReactNode
  isLast?: boolean
  className?: string
}

export const CommandPaletteSection = ({
  title,
  children,
  isLast: _isLast = false,
  className,
}: CommandPaletteSectionProps) => {
  return (
    <div className="group">
      <CommandGroup className={cn("has-[]: p-0!", className)} heading={title}>
        {children}
      </CommandGroup>
      <CommandSeparator className="mt-2" />
    </div>
  )
}

/**
 * Item Component
 */
type CommandPaletteItemProps = {
  id: string
  icon: React.ReactNode
  title: string
  description?: string
  type?: string
  onSelect?: () => void
  actions?: RaycastAction[]
  className?: string
  shortcut?: string
}

export const CommandPaletteItem = ({
  id,
  icon,
  title,
  description,
  type,
  onSelect,
  actions,
  className,
  shortcut,
}: CommandPaletteItemProps) => {
  const { setOpen, setSelectedItem, setShowActions, itemsRegistry } =
    useRaycastCommandMenu()

  const itemData = React.useMemo(
    () => ({ id, icon, title, description, type, onSelect, actions }),
    [id, icon, title, description, type, onSelect, actions]
  )

  useHotkeys(
    // biome-ignore lint/style/noNonNullAssertion: Shortcut is validated before this point
    shortcut!,
    (e) => {
      e.preventDefault()
      onSelect?.()
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      enabled: !!shortcut,
      preventDefault: true,
    },
    [onSelect]
  )

  // Create searchable keywords from id, title, description, and type
  const keywords = React.useMemo(() => {
    const terms = [id, title]
    if (description) {
      terms.push(description)
    }
    if (type) {
      terms.push(type)
    }
    return terms.join(" ")
  }, [id, title, description, type])

  // Register/unregister item in the registry
  React.useEffect(() => {
    itemsRegistry.current.set(id, itemData)
    return () => {
      itemsRegistry.current.delete(id)
    }
  }, [id, itemData, itemsRegistry])

  const handleSelect = React.useCallback(() => {
    if (actions && actions.length > 0) {
      setSelectedItem(itemData)
      setShowActions(true)
    } else {
      onSelect?.()
      setOpen(false)
    }
  }, [actions, itemData, onSelect, setOpen, setSelectedItem, setShowActions])

  const handleMouseEnter = React.useCallback(() => {
    setSelectedItem(itemData)
  }, [itemData, setSelectedItem])

  return (
    <CommandItem
      className={cn(
        "group mx-2 flex items-center justify-between gap-3 rounded-xl p-2! pl-2.5! text-foreground/70 data-[selected=true]:bg-muted-foreground/10! dark:data-[selected=true]:bg-background/40! [&_svg]:text-foreground/50! data-[selected=true]:[&_svg]:text-foreground!",
        className
      )}
      key={id}
      keywords={[keywords]}
      onMouseEnter={handleMouseEnter}
      onSelect={handleSelect}
      value={id}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex size-4! shrink-0 items-center justify-center rounded-md">
          {icon}
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          <span className="truncate font-medium">{title}</span>
          {description && (
            <span className="truncate text-muted-foreground text-xs">
              {description}
            </span>
          )}
        </div>
      </div>
      {type && (
        <span className="shrink-0 text-muted-foreground text-xs">{type}</span>
      )}
      {shortcut && (
        <DropdownMenuShortcut className="flex items-center gap-1">
          {shortcut.split("+").map((key, keyIndex) => (
            <kbd
              className="pointer-events-none inline-flex select-none items-center justify-center rounded border bg-muted/50 px-1 py-0.5 font-fira font-medium text-[10px] text-muted-foreground dark:bg-muted"
              key={keyIndex}
            >
              {key}
            </kbd>
          ))}
        </DropdownMenuShortcut>
      )}
    </CommandItem>
  )
}

/**
 * Actions Dropdown Component (used internally by Footer)
 */
type RaycastCommandMenuActionsDropdownProps = {
  className?: string
  itemClassName?: string
}

export const RaycastCommandMenuActionsDropdown = ({
  className,
  itemClassName,
}: RaycastCommandMenuActionsDropdownProps = {}) => {
  const { selectedItem } = useRaycastCommandMenu()

  const actions = selectedItem?.actions || []

  const handleActionExecute = React.useCallback((action: RaycastAction) => {
    action.onAction?.()
    // Keep dialog open as per requirements
  }, [])

  if (!selectedItem || actions.length === 0) {
    return null
  }

  return (
    <DropdownMenuContent
      align="end"
      alignOffset={-8}
      className={cn(
        "w-80 rounded-2xl bg-muted/10 backdrop-blur-sm dark:bg-background/30",
        className
      )}
      side="top"
      sideOffset={17}
    >
      {/* Header */}
      <div className="px-2 py-1 text-muted-foreground text-xs">Actions</div>

      <DropdownMenuSeparator />

      {/* Actions List */}
      {actions.map((action) => (
        <DropdownMenuItem
          className={cn(
            "group mx-0 flex cursor-pointer items-center justify-between gap-3 rounded-xl p-2! pl-2.5! text-foreground/70 hover:bg-muted-foreground/10! focus:bg-muted-foreground/10! dark:focus:bg-background/40! dark:hover:bg-background/40! [&_svg]:text-foreground/50! hover:[&_svg]:text-foreground!",
            itemClassName
          )}
          key={action.id}
          onClick={() => handleActionExecute(action)}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {action.icon && (
              <div className="flex size-4 shrink-0">{action.icon}</div>
            )}
            <span className="truncate font-medium text-sm">{action.label}</span>
          </div>
          {action.shortcut && action.shortcut.length > 0 && (
            <DropdownMenuShortcut className="flex items-center gap-1">
              {action.shortcut.map((key, keyIndex) => (
                <kbd
                  className="pointer-events-none inline-flex select-none items-center justify-center rounded border bg-muted/50 px-1 py-0.5 font-fira font-medium text-[10px] text-muted-foreground dark:bg-muted"
                  key={keyIndex}
                >
                  {key}
                </kbd>
              ))}
            </DropdownMenuShortcut>
          )}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  )
}

/**
 * Footer Component
 */
type CommandPaletteFooterProps = {
  onBack?: () => void
  secondaryActionLabel?: string
  className?: string
}

export const CommandPaletteFooter = ({
  onBack,
  secondaryActionLabel = "Actions",
  className,
}: CommandPaletteFooterProps) => {
  const {
    selectedItem,
    showActions,
    setShowActions,
    setSelectedItem,
    actionsShortcut,
  } = useRaycastCommandMenu()

  const hasActions = selectedItem?.actions && selectedItem.actions.length > 0

  const displayShortcut = React.useMemo(
    () => parseShortcutToDisplay(actionsShortcut),
    [actionsShortcut]
  )

  const handleBack = React.useCallback(() => {
    setShowActions(false)
    setSelectedItem(null)
    onBack?.()
  }, [setShowActions, setSelectedItem, onBack])

  return (
    <div className={cn("border-t bg-muted/20 p-3", className)}>
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-muted-foreground text-sm"
          onClick={handleBack}
          type="button"
        >
          <kbd className="pointer-events-none inline-flex select-none items-center justify-center rounded border bg-muted/50 px-1 py-0.5 font-fira font-medium text-[10px] text-muted-foreground dark:bg-muted">
            Esc
          </kbd>
        </button>

        {hasActions && (
          <DropdownMenu onOpenChange={setShowActions} open={showActions}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 text-sm transition-colors",
                  showActions
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                type="button"
              >
                <span className="font-medium">{secondaryActionLabel}</span>
                <div className="flex items-center gap-1">
                  {displayShortcut.map((key, index) => (
                    <kbd
                      className="pointer-events-none inline-flex select-none items-center justify-center rounded border bg-muted/50 px-1 py-0.5 font-fira font-medium text-[10px] text-muted-foreground dark:bg-muted"
                      key={index}
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </button>
            </DropdownMenuTrigger>
            <RaycastCommandMenuActionsDropdown />
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}
