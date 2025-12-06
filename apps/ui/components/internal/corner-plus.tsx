import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const cornerPlusVariants = cva("absolute w-4 scale-75 opacity-50", {
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
      rightCenter:
        "translate-x-[calc(50%+0.5px)] top-1/2 -translate-y-1/2 right-0",
      leftCenter:
        "-translate-x-[calc(50%+0.5px)] top-1/2 -translate-y-1/2 left-0",
    },
  },
  defaultVariants: {
    variant: "rightBottom",
  },
})

export const CornerPlus = ({
  variant = "rightBottom",
  className,
  delay = 0,
}: {
  className?: string
  variant?: VariantProps<typeof cornerPlusVariants>["variant"]
  delay?: number
}) => {
  return (
    <motion.div
      animate={{ scale: 1 }}
      className={cn(cornerPlusVariants({ variant }), className)}
      initial={{ scale: 0 }}
      transition={{ delay }}
    >
      <div className="h-0.5 w-4 bg-foreground dark:bg-primary" />
      <div className="absolute bottom-0 left-0 h-0.5 w-4 rotate-90 bg-foreground dark:bg-primary" />
    </motion.div>
  )
}
