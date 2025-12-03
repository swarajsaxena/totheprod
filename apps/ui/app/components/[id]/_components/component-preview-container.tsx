import type { ReactNode } from "react"

type ComponentPreviewContainerProps = {
  children: ReactNode
}

export const ComponentPreviewContainer = ({
  children,
}: ComponentPreviewContainerProps) => {
  return (
    <div
      className="relative flex h-full max-h-screen flex-col items-center overflow-auto bg-background p-8 dark:bg-secondary [&:has([data-preview-padding='false'])]:p-0"
      id="preview-scroll-container"
    >
      {children}
    </div>
  )
}
