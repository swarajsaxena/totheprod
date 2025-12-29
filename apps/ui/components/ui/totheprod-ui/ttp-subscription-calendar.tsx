"use client"

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { useClickOutside } from "@/hooks/totheprod-ui/use-click-outside"
import { cn } from "@/lib/utils"
import { Button } from "../button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"

function getMonthGrid(date: Date) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end })
}

const isDayOfMonth = (date: Date, currentDate: Date) => {
  return isSameMonth(date, currentDate)
}

function getDaysOfWeekLabels() {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  return Array.from({ length: 7 }).map((_, i) =>
    format(addDays(start, i), "EEE")
  )
}

export type TSubscription = {
  id: string
  name: string
  price: number
  interval: "monthly" | "yearly"
  status: "active" | "inactive"
  date: Date
  imageUrl: string
}

export type TtpSubscriptionCalendarProps = {
  subscriptions: TSubscription[]
  /** Currency symbol or code to display (default: "Rs") */
  currency?: string
  /** Custom class name for the calendar container */
  className?: string
  /** Custom class name for individual day cells */
  cellClassName?: string
  /** Custom class name for the modal */
  modalClassName?: string
  /** Show/hide the month total (default: true) */
  showMonthTotal?: boolean
  /** Show/hide the subscription type indicators (default: true) */
  showIndicators?: boolean
  /** Custom colors for subscription types */
  colors?: {
    monthly?: string
    yearly?: string
    both?: string
  }
  /** Animation configuration */
  animationConfig?: {
    stiffness?: number
    damping?: number
  }
  /** Custom render function for subscription items in modal */
  renderSubscriptionItem?: (subscription: TSubscription) => React.ReactNode
}

const baseCellClassNames = cn(
  "flex w-12 flex-col items-center justify-end gap-1 rounded-lg py-1 text-xs"
)

const DEFAULT_COLORS = {
  monthly: "bg-amber-500",
  yearly: "bg-purple-500",
  both: "bg-blue-500",
}

export const TtpSubscriptionCalendar = ({
  subscriptions,
  currency = "Rs",
  className,
  cellClassName,
  modalClassName,
  showMonthTotal = true,
  showIndicators = true,
  colors = DEFAULT_COLORS,
  animationConfig = { stiffness: 300, damping: 30 },
  renderSubscriptionItem,
}: TtpSubscriptionCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const monthGrid = getMonthGrid(currentDate)

  const daysOfWeek = getDaysOfWeekLabels()

  const subscriptionsForCurrentMonth = subscriptions.filter((subscription) => {
    if (subscription.interval === "monthly") {
      // All monthly subscriptions count
      return true
    }
    if (subscription.interval === "yearly") {
      // Only yearly subscriptions in the same month
      return subscription.date.getMonth() === currentDate.getMonth()
    }
    // Fallback to exact month match
    return isSameMonth(subscription.date, currentDate)
  })

  const monthTotal = subscriptionsForCurrentMonth
    .reduce((total, subscription) => total + subscription.price, 0)
    .toFixed(2)

  const getSubscriptionsForDay = (day: Date) => {
    return subscriptions.filter((subscription) => {
      // Check if subscription matches based on its interval
      if (subscription.interval === "monthly") {
        // Monthly: show on the same date of every month
        return day.getDate() === subscription.date.getDate()
      }
      if (subscription.interval === "yearly") {
        // Yearly: show on the same date and month every year
        return (
          day.getDate() === subscription.date.getDate() &&
          day.getMonth() === subscription.date.getMonth()
        )
      }
      // Fallback to exact date match
      return isSameDay(subscription.date, day)
    })
  }

  const MONTHLY_BACKGROUND = colors.monthly || DEFAULT_COLORS.monthly
  const YEARLY_BACKGROUND = colors.yearly || DEFAULT_COLORS.yearly
  const BOTH_BACKGROUND = colors.both || DEFAULT_COLORS.both

  return (
    <motion.div
      animate={{ height: "auto" }}
      className={cn(
        "relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border/50 bg-gray-50 p-4 dark:bg-gray-900",
        className
      )}
      transition={{
        type: "spring",
        stiffness: animationConfig.stiffness,
        damping: animationConfig.damping,
      }}
    >
      <div className="flex flex-col justify-between gap-1">
        <div className="flex items-start justify-between">
          <p className="font-medium text-lg leading-none">
            {format(currentDate, "MMMM, yyyy")}
          </p>
          <div className="flex gap-2">
            <Button
              className="rounded-xs bg-transparent! p-0"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              size="icon"
              variant="ghost"
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              className="rounded-xs bg-transparent! p-0"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              size="icon"
              variant="ghost"
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
        {showIndicators && (
          <div className="flex gap-2 text-[10px] text-muted-foreground">
            <p className="flex items-center gap-1">
              Monthly
              <div
                className={cn("size-1 rounded-full", MONTHLY_BACKGROUND)}
              />{" "}
            </p>
            <p className="flex items-center gap-1">
              Yearly
              <div
                className={cn("size-1 rounded-full", YEARLY_BACKGROUND)}
              />{" "}
            </p>
            <p className="flex items-center gap-1">
              Both
              <div
                className={cn("size-1 rounded-full", BOTH_BACKGROUND)}
              />{" "}
            </p>
            {showMonthTotal && (
              <p className="ml-auto flex items-center gap-1 text-sm">
                Total:{" "}
                <span className="font-medium">
                  {currency} {monthTotal}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div
              className={cn(
                baseCellClassNames,
                "mb-1 bg-gray-100 py-1 text-muted-foreground dark:bg-gray-800"
              )}
              key={day}
            >
              {day}
            </div>
          ))}
          {monthGrid.map((day) => (
            <TtpSubscriptionCalendarDay
              animationConfig={animationConfig}
              cellClassName={cellClassName}
              colors={{
                monthly: MONTHLY_BACKGROUND,
                yearly: YEARLY_BACKGROUND,
                both: BOTH_BACKGROUND,
              }}
              currency={currency}
              day={day}
              isDayOfMonth={isDayOfMonth(day, currentDate)}
              key={day.toISOString()}
              modalClassName={modalClassName}
              renderSubscriptionItem={renderSubscriptionItem}
              setCurrentDate={setCurrentDate}
              showIndicators={showIndicators}
              subscriptions={getSubscriptionsForDay(day)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const TtpSubscriptionCalendarDay = ({
  day,
  subscriptions,
  isDayOfMonth,
  setCurrentDate,
  currency,
  cellClassName,
  modalClassName,
  showIndicators,
  colors,
  animationConfig,
  renderSubscriptionItem,
}: {
  day: Date
  subscriptions: TSubscription[]
  isDayOfMonth: boolean
  setCurrentDate: (date: Date) => void
  currency: string
  cellClassName?: string
  modalClassName?: string
  showIndicators: boolean
  colors: {
    monthly: string
    yearly: string
    both: string
  }
  animationConfig: {
    stiffness?: number
    damping?: number
  }
  renderSubscriptionItem?: (subscription: TSubscription) => React.ReactNode
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useClickOutside(() => {
    setIsModalOpen(false)
  })

  const date = Number(format(day, "dd"))
  const month = Number(format(day, "MM"))
  const year = Number(format(day, "yyyy"))
  const dateNumber = Number(`${date}${month}${year}${subscriptions.length}`)

  const hasMonthlySubscription = subscriptions.some(
    (subscription) => subscription.interval === "monthly"
  )
  const hasYearlySubscription = subscriptions.some(
    (subscription) => subscription.interval === "yearly"
  )

  const hasBothSubscriptions = hasMonthlySubscription && hasYearlySubscription

  const stiffness = animationConfig?.stiffness ?? 300
  const damping = animationConfig?.damping ?? 30

  const getIndicatorColor = () => {
    if (hasBothSubscriptions) {
      return colors.both
    }
    if (hasYearlySubscription) {
      return colors.yearly
    }
    return colors.monthly
  }

  const handleClick = () => {
    if (!isDayOfMonth) {
      setCurrentDate(addDays(day, 0))
    } else if (subscriptions.length > 0) {
      setIsModalOpen(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  const renderModal = () => (
    <motion.div
      className={cn(
        "-translate-1/2 absolute top-1/2 left-1/2 z-10 flex w-[75%] flex-col place-items-center gap-2 rounded-xl bg-gray-50 p-4 shadow-lg dark:bg-gray-900",
        modalClassName
      )}
      layoutId={`subscription-calendar-day-${dateNumber}`}
      ref={containerRef}
      transition={{
        type: "spring",
        stiffness,
        damping: damping - 5,
      }}
    >
      {subscriptions.map((subscription, index) =>
        renderSubscriptionItem ? (
          <div className="w-full" key={subscription.id}>
            {renderSubscriptionItem(subscription)}
          </div>
        ) : (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full items-center justify-between gap-1"
            initial={{ opacity: 0, y: -10 }}
            key={subscription.id}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness,
              damping: damping - 5,
            }}
          >
            <div className="flex items-center gap-2">
              {/* biome-ignore lint/performance/noImgElement: motion.img doesn't support Image component */}
              {/* biome-ignore lint/correctness/useImageSize: dynamic image sizes */}
              <motion.img
                alt={subscription.name}
                className="size-6 rounded-md"
                layoutId={`subscription-calendar-day-${dateNumber}-${subscription.name}-image`}
                src={subscription.imageUrl}
              />
              <div className="flex flex-col">
                <p className="font-medium text-muted-foreground text-xs leading-tight! dark:text-foreground/75">
                  {subscription.name}
                </p>
                <p className="text-[10px] text-muted-foreground/75 capitalize leading-tight! dark:text-foreground/50">
                  {subscription.interval}
                </p>
              </div>
            </div>
            <div className="text-foreground/75 text-xs">
              {currency} {subscription.price}
            </div>
          </motion.div>
        )
      )}
      <div className="mt-2 flex w-full items-center justify-between gap-1 border-border border-t pt-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <p className="font-medium text-xs leading-tight!">Total</p>
          </div>
        </div>
        <div className="text-xs">
          {currency}{" "}
          {subscriptions.reduce(
            (prev, subscription) => prev + subscription.price,
            0
          )}
        </div>
      </div>
    </motion.div>
  )

  const renderCell = () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          animate={{ opacity: subscriptions.length > 0 ? 1 : 0.5 }}
          className={cn(
            baseCellClassNames,
            "asp relative h-12 w-full rounded-lg bg-gray-200 pt-2 transition-colors dark:bg-gray-800",
            subscriptions.length > 0
              ? "cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700"
              : "cursor-not-allowed opacity-50",
            isModalOpen ? "hover:bg-gray-200! dark:bg-gray-800!" : "",
            !isDayOfMonth &&
              "cursor-pointer border border-border bg-transparent!",
            cellClassName
          )}
          initial={{ opacity: 0 }}
          layoutId={`subscription-calendar-day-${dateNumber}`}
          transition={{
            type: "spring",
            stiffness,
            damping: damping - 5,
          }}
        >
          {isDayOfMonth && subscriptions.length > 0 && (
            <>
              {showIndicators && (
                <div
                  className={cn(
                    "absolute top-1 right-1 size-1 rounded-full",
                    getIndicatorColor()
                  )}
                />
              )}
              <div className="flex items-center">
                {subscriptions?.[0]?.imageUrl && (
                  // biome-ignore lint/correctness/useImageSize: we don't need to know the size of the image
                  // biome-ignore lint/performance/noImgElement: --
                  <motion.img
                    alt={subscriptions[0]?.name}
                    className="size-4 rounded-full"
                    layoutId={`subscription-calendar-day-${dateNumber}-${subscriptions[0]?.name}-image`}
                    src={subscriptions[0]?.imageUrl}
                  />
                )}
                {subscriptions.length > 1 && (
                  <div className="-ml-2 grid size-4 place-items-center rounded-full border border-gray-400 bg-gray-800 text-[6px] text-gray-50">
                    +{subscriptions.length - 1}
                  </div>
                )}
              </div>
            </>
          )}
          <span>{day.getDate()}</span>
        </motion.div>
      </TooltipTrigger>
      {isDayOfMonth && subscriptions.length > 0 && (
        <TooltipContent>
          {subscriptions
            .map((subscription) => {
              return subscription.name
            })
            .join(", ")}
        </TooltipContent>
      )}
    </Tooltip>
  )

  return (
    <>
      {isModalOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-9 bg-gray-500/10 backdrop-blur-[1px] dark:bg-gray-200/10"
          initial={{ opacity: 0 }}
          onClick={(e) => {
            e.stopPropagation()
            setIsModalOpen(false)
          }}
          transition={{
            type: "spring",
            stiffness: stiffness + 100,
            damping,
          }}
        />
      )}

      <button
        className="w-full border-none bg-transparent p-0 text-left"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        type="button"
      >
        {isModalOpen ? renderModal() : renderCell()}
      </button>
    </>
  )
}
