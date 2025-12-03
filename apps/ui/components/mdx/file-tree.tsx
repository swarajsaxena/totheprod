import { File02Icon, Folder01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type FileTreeProps = {
  children: ReactNode
  className?: string
}

type FileTreeItemProps = {
  name: string
  type?: "file" | "folder"
  children?: ReactNode
  className?: string
}

export const FileTree = ({ children, className }: FileTreeProps) => {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border bg-muted/30 p-4 font-mono text-sm",
        className
      )}
    >
      <div className="space-y-1">{children}</div>
    </div>
  )
}

export const FileTreeItem = ({
  name,
  type = "file",
  children,
  className,
}: FileTreeItemProps) => {
  const Icon = type === "folder" ? Folder01Icon : File02Icon

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-2 text-foreground">
        <HugeiconsIcon
          className={cn(
            "size-4 shrink-0",
            type === "folder"
              ? "text-blue-500 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          )}
          icon={Icon}
        />
        <span className={type === "folder" ? "font-semibold" : ""}>{name}</span>
      </div>
      {children && <div className="ml-6 space-y-1">{children}</div>}
    </div>
  )
}
