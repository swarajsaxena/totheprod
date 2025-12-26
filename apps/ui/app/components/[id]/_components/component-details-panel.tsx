import {
  ArrowUpRight02Icon,
  Cancel01FreeIcons,
  Copy02Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useAtomValue } from "jotai"
import { motion } from "motion/react"
import { useState } from "react"
import { ComponentPropsTable } from "@/components/internal/component-props-table"
import { ThemeLogo } from "@/components/internal/theme-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useDetailsOpen } from "@/hooks/use-details-open"
import { useMinWidth } from "@/hooks/use-min-width"
import { cn } from "@/lib/utils"
import { currentComponentAtom } from "@/store/atoms"
import { CodeViewer } from "./code-viewer"
import { MultiFileCodeViewer } from "./multi-file-code-viewer"

export const ComponentDetailContainer = ({
  children,
  className,
  containerClassName,
}: {
  className?: string
  children?: React.ReactNode
  containerClassName?: string
}) => (
  <div className={cn("px-6", containerClassName)}>
    <div
      className={cn(
        "flex flex-col gap-1 border-x border-dashed",
        !children && "p-3",
        className
      )}
    >
      {children}
    </div>
  </div>
)

export const ComponentHeading = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <ComponentDetailContainer containerClassName="bg-muted dark:bg-muted/50 ">
    <h2
      className={cn(
        "px-4 py-2 font-mono! text-muted-foreground/70! text-xs!",
        className
      )}
    >
      {children}
    </h2>
  </ComponentDetailContainer>
)
export const ComponentParagraph = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <ComponentDetailContainer>
    <p
      className={cn(
        "px-4 py-3 text-secondary-foreground text-xl leading-normal",
        className
      )}
    >
      {children}
    </p>
  </ComponentDetailContainer>
)

const ComponentDetailsContent = () => {
  const component = useAtomValue(currentComponentAtom)
  const [copied, setCopied] = useState(false)
  const [_, setDetailsOpen] = useDetailsOpen()
  return (
    <>
      <ComponentDetailContainer className="flex flex-row items-center gap-2 p-4">
        <ThemeLogo alt="Logo" className="h-6 w-6" layoutId="logo" />
        <span className="font-bold font-heading text-xl tracking-wide">
          {component?.title}
        </span>
        <Button
          className="ml-auto hidden p-1 md:block"
          onClick={() => setDetailsOpen(false)}
          size="icon-sm"
          variant="outline"
        >
          <HugeiconsIcon className="size-5" icon={Cancel01FreeIcons} />
        </Button>
      </ComponentDetailContainer>

      {/* <ComponentHeading>{component?.title}</ComponentHeading> */}
      <ComponentParagraph>{component?.description}</ComponentParagraph>

      <ComponentDetailContainer />

      {component?.dependencies && component?.dependencies.length > 0 && (
        <>
          <ComponentHeading className="flex items-center gap-1">
            Dependencies
            <HugeiconsIcon
              className="size-4 cursor-pointer"
              icon={copied ? Tick01Icon : Copy02Icon}
              onClick={() => {
                navigator.clipboard.writeText(
                  `npm install ${component?.dependencies?.join(", ")}`
                )
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            />
          </ComponentHeading>
          <ComponentParagraph className="flex p-0">
            {component?.dependencies?.map((dependency) => (
              <span
                className="border-r border-dashed px-4 py-2 text-base"
                key={dependency}
              >
                {dependency}
              </span>
            ))}
          </ComponentParagraph>

          <ComponentDetailContainer />
        </>
      )}

      <CodeViewer
        className="my-0"
        code={
          component?.installCommand ||
          `npx shadcn@latest add https://ui.totheprod.com/r/${component?.id}.json`
        }
        filename="CLI Install Command"
        language="bash"
      />
      <ComponentDetailContainer />

      {component?.files && component.files.length > 0 && (
        <>
          <ComponentHeading>Source Files</ComponentHeading>
          <MultiFileCodeViewer files={component.files} />
          <ComponentDetailContainer />
        </>
      )}
      <ComponentPropsTable />
      {component?.instructions && (
        <>
          <ComponentHeading>How to Use</ComponentHeading>
          <ComponentParagraph className="text-base text-muted-foreground">
            {component.instructions}
          </ComponentParagraph>
          <ComponentDetailContainer />
        </>
      )}
      {component?.inspirations && component.inspirations.length > 0 && (
        <>
          <ComponentHeading>Inspiration</ComponentHeading>
          <ComponentDetailContainer className="flex flex-row flex-wrap">
            {component.inspirations.map((inspiration, index) => (
              <Button
                asChild
                className="w-max rounded-none border-0 border-border border-r border-dashed px-4 py-2 font-mono font-normal text-xs"
                key={index}
                variant="outline"
              >
                <a
                  href={inspiration.href}
                  rel="noopener noreferrer"
                  target={inspiration.href ? "_blank" : undefined}
                >
                  {inspiration.label}
                  <HugeiconsIcon icon={ArrowUpRight02Icon} />
                </a>
              </Button>
            ))}
          </ComponentDetailContainer>
          <ComponentDetailContainer />
        </>
      )}
      {component?.tags && component.tags.length > 0 && (
        <>
          <ComponentHeading>Tags</ComponentHeading>
          <ComponentDetailContainer className="flex flex-row flex-wrap gap-0 border-t-0!">
            {[...component.tags, ...component.tags].map((tag, index) => (
              <span
                className="w-max flex-1 text-nowrap border-t border-r border-dashed px-4 py-2 font-mono text-xs capitalize"
                key={index}
              >
                {tag}
              </span>
            ))}
          </ComponentDetailContainer>
          <ComponentDetailContainer className="border-b!" />
        </>
      )}
    </>
  )
}

export const ComponentDetails = () => {
  const [detailsOpen, setDetailsOpen] = useDetailsOpen()
  const isNotMobile = useMinWidth("md")

  if (isNotMobile) {
    return (
      <motion.div
        animate={{
          width: isNotMobile && detailsOpen ? "50%" : 0,
          opacity: isNotMobile && detailsOpen ? 1 : 0,
        }}
        className="overflow-auto overflow-x-hidden border-l border-dashed"
        initial={{ width: 0, opacity: 0 }}
        style={{ minHeight: "100vh" }}
      >
        <div className="max-w-full *:border-b *:border-dashed *:last:border-b-0">
          <ComponentDetailsContent />
        </div>
      </motion.div>
    )
  }

  return (
    <Sheet onOpenChange={setDetailsOpen} open={detailsOpen}>
      <SheetContent className="w-full gap-0 *:border-b *:border-dashed sm:w-1/2 sm:max-w-[unset]">
        <ComponentDetailContainer />
        <ComponentDetailsContent />
      </SheetContent>
    </Sheet>
  )
}
