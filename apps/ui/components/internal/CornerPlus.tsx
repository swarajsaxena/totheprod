import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const cornerPlusVariants = cva(
  "absolute w-4 scale-75 opacity-50 dark:opacity-50",
  {
    variants: {
      variant: {
        leftBottom:
          "-translate-x-[calc(50%+0.5px)]  translate-y-[calc(1.5px)] bottom-0 left-0",
        rightBottom:
          "translate-x-[calc(50%+0.5px)]  translate-y-[calc(1.5px)] bottom-0 right-0",
        leftTop:
          "-translate-x-[calc(50%+0.5px)]  -translate-y-[calc(1.5px)] top-0 left-0",
        rightTop:
          "translate-x-[calc(50%+0.5px)]  -translate-y-[calc(1.5px)] top-0 right-0",
      },
    },
    defaultVariants: {
      variant: "rightBottom",
    },
  },
)

export const CornerPlus = ({
  variant = "rightBottom",
  className,
}: {
  className?: string
  variant?: VariantProps<typeof cornerPlusVariants>["variant"]
}) => {
  return (
    <div className={cn(cornerPlusVariants({ variant }), className)}>
      <div className="h-0.5 w-4 bg-primary" />
      <div className="absolute bottom-0 left-0 h-0.5 w-4 rotate-90 bg-primary" />
    </div>
  )
}
