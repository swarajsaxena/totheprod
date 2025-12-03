import {
  Alert01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CalloutType = "info" | "warning" | "error" | "success" | "note"

type CalloutProps = {
  type?: CalloutType
  title?: string
  children: ReactNode
  className?: string
}

const calloutConfig = {
  info: {
    icon: InformationCircleIcon,
    className:
      "border-blue-500/50 bg-blue-500/10 text-blue-900 dark:text-blue-100",
    iconClassName: "text-blue-500",
  },
  warning: {
    icon: Alert01Icon,
    className:
      "border-yellow-500/50 bg-yellow-500/10 text-yellow-900 dark:text-yellow-100",
    iconClassName: "text-yellow-500",
  },
  error: {
    icon: AlertCircleIcon,
    className: "border-red-500/50 bg-red-500/10 text-red-900 dark:text-red-100",
    iconClassName: "text-red-500",
  },
  success: {
    icon: CheckmarkCircle02Icon,
    className:
      "border-green-500/50 bg-green-500/10 text-green-900 dark:text-green-100",
    iconClassName: "text-green-500",
  },
  note: {
    icon: InformationCircleIcon,
    className:
      "border-gray-500/50 bg-gray-500/10 text-gray-900 dark:text-gray-100",
    iconClassName: "text-gray-500",
  },
}

export const Callout = ({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) => {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        config.className,
        className
      )}
      role="alert"
    >
      <HugeiconsIcon
        className={cn("size-5 shrink-0", config.iconClassName)}
        icon={Icon}
      />
      <div className="flex-1 space-y-2">
        {title && (
          <div className="font-semibold text-sm leading-none">{title}</div>
        )}
        <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
      </div>
    </div>
  )
}
