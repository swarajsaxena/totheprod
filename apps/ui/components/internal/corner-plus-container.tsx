import { cn } from "@/lib/utils"
import { CornerPlus } from "./corner-plus"

type CornerPlusContainerProps = {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

const CornerPlusContainer = ({
  children,
  className,
  containerClassName,
}: CornerPlusContainerProps) => {
  return (
    <div className={cn("w-full border-y border-dashed px-4", className)}>
      <div
        className={cn(
          "relative mx-auto border-x border-dashed",
          containerClassName || "w-max"
        )}
      >
        <CornerPlus delay={0.1} variant="leftTop" />
        <CornerPlus delay={0.2} variant="rightTop" />
        <CornerPlus delay={0.3} />
        <CornerPlus delay={0.4} variant="leftBottom" />
        {children}
      </div>
    </div>
  )
}

export default CornerPlusContainer
