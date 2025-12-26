import { Copy01Icon, ViewIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useAtom } from "jotai"
import { Code2Icon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  TtpInlineDropdown,
  TtpInlineDropdownItem,
  TtpInlineDropdownItemIcon,
  TtpInlineDropdownItemLabel,
} from "@/components/ui/totheprod-ui/ttp-inline-dropdown"
import { contentMap } from "@/lib/component-metadata"
import { detailsOpenAtom } from "@/store/atoms"

type ComponentPreviewContainerProps = {
  children: ReactNode
}

export const ComponentPreviewContainer = ({
  children,
}: ComponentPreviewContainerProps) => {
  const params = useParams()
  const currentId = (params?.id as string) || ""
  const [detailsOpen, setDetailsOpen] = useAtom(detailsOpenAtom)
  const component = contentMap
    .find((item) => item.items.some((item) => item.id === currentId))
    ?.items.find((item) => item.id === currentId)
  return (
    <div
      className="relative flex h-full max-h-screen flex-col items-center overflow-auto"
      id="preview-scroll-container"
    >
      <div className="sticky top-0 z-50 flex w-full items-center justify-between gap-2 bg-background/50 backdrop-blur-md">
        <div className="px-3 py-2 text-muted-foreground text-sm">
          <h1 className="font-medium text-foreground">{component?.title}</h1>
          {/* <p className="text-muted-foreground text-xs">
            {component?.description}
          </p> */}
        </div>
        <div className="flex items-center gap-2 p-2">
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
              <TtpInlineDropdownItemLabel>Copy Code</TtpInlineDropdownItemLabel>
            </TtpInlineDropdownItem>
          </TtpInlineDropdown>
        </div>
      </div>
      {children}
    </div>
  )
}
