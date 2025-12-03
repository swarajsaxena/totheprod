import { cn } from "@/lib/utils"
import { CornerPlus } from "./corner-plus"

type CornerPlusContainerProps = {
  className?: string
  children: React.ReactNode
}

const CornerPlusContainer = ({
  children,
  className,
}: CornerPlusContainerProps) => {
  return (
    <div className={cn("w-full border-y border-dashed", className)}>
      <div className="relative mx-auto w-max border-x border-dashed">
        <CornerPlus />
        <CornerPlus variant="leftBottom" />
        <CornerPlus variant="rightTop" />
        <CornerPlus variant="leftTop" />
        {children}
      </div>
    </div>
  )
}

export default CornerPlusContainer
