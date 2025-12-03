import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type StepsProps = {
  children: ReactNode
  className?: string
}

type StepProps = {
  children: ReactNode
  title?: string
  className?: string
}

export const Steps = ({ children, className }: StepsProps) => {
  return (
    <div
      className={cn(
        "my-6 ml-4 space-y-4 border-border border-l-2 pl-8",
        className
      )}
    >
      {children}
    </div>
  )
}

export const Step = ({ children, title, className }: StepProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="-left-[calc(2rem+1px)] absolute top-1 size-4 rounded-full border-2 border-border bg-background" />
      {title && (
        <h3 className="mb-2 font-semibold text-base leading-none">{title}</h3>
      )}
      <div className="text-muted-foreground text-sm leading-relaxed [&>p]:mb-4 [&>p]:last:mb-0">
        {children}
      </div>
    </div>
  )
}
