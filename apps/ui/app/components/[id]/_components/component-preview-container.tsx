import {
  Copy01Icon,
  Menu01Icon,
  RefreshIcon,
  Search01FreeIcons,
  ViewIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Code2Icon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useState,
} from "react"
import { ThemeLogo } from "@/components/internal/theme-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTtpCommandPaletteState } from "@/components/ui/totheprod-ui/ttp-command-palette"
import {
  TtpInlineDropdown,
  TtpInlineDropdownItem,
  TtpInlineDropdownItemIcon,
  TtpInlineDropdownItemLabel,
} from "@/components/ui/totheprod-ui/ttp-inline-dropdown"
import { useDetailsOpen } from "@/hooks/use-details-open"
import { contentMap } from "@/lib/component-metadata"
import { ComponentSidebarContent } from "./component-sidebar-content"

type ComponentPreviewContainerProps = {
  children: ReactNode
}

export const ComponentPreviewContainer = ({
  children,
}: ComponentPreviewContainerProps) => {
  const params = useParams()
  const currentId = (params?.id as string) || ""
  const [detailsOpen, setDetailsOpen] = useDetailsOpen()
  const [refreshKey, setRefreshKey] = useState(0)
  const { open, setOpen } = useTtpCommandPaletteState()
  const component = contentMap
    .find((item) => item.items.some((item) => item.id === currentId))
    ?.items.find((item) => item.id === currentId)

  const handleRefresh = () => {
    setRefreshKey((prev: number) => prev + 1)
  }

  const clonedChildren = isValidElement(children)
    ? cloneElement(children as ReactElement, { key: refreshKey })
    : children

  const handleToggleCommandMenu = () => {
    setOpen(!open)
  }

  return (
    <div
      className="relative flex h-full max-h-screen flex-col items-center overflow-auto"
      id="preview-scroll-container"
    >
      <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-background/50 pl-2 backdrop-blur-md md:pl-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="outline">
              <HugeiconsIcon className="size-4" icon={Menu01Icon} />
            </Button>
          </SheetTrigger>
          <SheetContent isCloseIconVisible={false} side="left">
            <div className="flex w-full items-center justify-between gap-2 border-b border-dashed p-3 text-muted-foreground text-xs">
              <Link href="/">
                <ThemeLogo className="h-6 w-6" layoutId="logo" />
              </Link>
              <Button
                onClick={handleToggleCommandMenu}
                size="icon-sm"
                variant="outline"
              >
                <HugeiconsIcon className="size-4" icon={Search01FreeIcons} />
              </Button>
            </div>
            <ComponentSidebarContent
              contentMap={contentMap}
              currentId={currentId}
            />
          </SheetContent>
        </Sheet>

        <motion.div
          animate={{ opacity: 1 }}
          className="mr-auto px-3 py-2 font-medium text-foreground text-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key={component?.title}
          transition={{ duration: 0.5 }}
        >
          {component?.title}
        </motion.div>
        <div className="flex items-center gap-2 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleRefresh} size="icon" variant="outline">
                <HugeiconsIcon className="size-4" icon={RefreshIcon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">
              <p>Refresh Component</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size="icon" variant="outline">
                <Link href={`/preview/${currentId}`}>
                  <HugeiconsIcon className="size-4" icon={ViewIcon} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">
              <p>Preview</p>
            </TooltipContent>
          </Tooltip>
          <TtpInlineDropdown
            align="right"
            className="z-50"
            defaultItemId="view-code"
          >
            <TtpInlineDropdownItem
              id="view-code"
              onClick={() => setDetailsOpen(!detailsOpen)}
              shortcut="Meta + B"
            >
              <TtpInlineDropdownItemIcon>
                <Code2Icon className="size-4" />
              </TtpInlineDropdownItemIcon>
              <TtpInlineDropdownItemLabel>View Code</TtpInlineDropdownItemLabel>
            </TtpInlineDropdownItem>
            <TtpInlineDropdownItem id="copy-code">
              <TtpInlineDropdownItemIcon>
                <HugeiconsIcon className="size-4" icon={Copy01Icon} />
              </TtpInlineDropdownItemIcon>
              <TtpInlineDropdownItemLabel>
                Install Command
              </TtpInlineDropdownItemLabel>
            </TtpInlineDropdownItem>
          </TtpInlineDropdown>
        </div>
      </div>
      {clonedChildren}
    </div>
  )
}
