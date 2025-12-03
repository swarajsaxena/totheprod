import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LinkCardProps = {
  href: string
  title: string
  description?: string
  icon?: React.ComponentType
  className?: string
}

export const LinkCard = ({
  href,
  title,
  description,
  icon,
  className,
}: LinkCardProps) => {
  const isExternal = href.startsWith("http")

  return (
    <Link
      className={cn(
        "group my-4 flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:border-primary hover:bg-accent",
        className
      )}
      href={href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <HugeiconsIcon className="size-5" icon={icon} />
        </div>
      )}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <span>{title}</span>
          <HugeiconsIcon
            className="size-4 transition-transform group-hover:translate-x-1"
            icon={ArrowRight01Icon}
          />
        </div>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
    </Link>
  )
}
