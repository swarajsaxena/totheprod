"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type TabsProps = {
  defaultValue: string
  children: ReactNode
  className?: string
}

type TabsListProps = {
  children: ReactNode
  className?: string
}

type TabsTriggerProps = {
  value: string
  children: ReactNode
  className?: string
}

type TabsContentProps = {
  value: string
  children: ReactNode
  className?: string
}

export const Tabs = ({ defaultValue, children, className }: TabsProps) => {
  return (
    <Root className={cn("my-6", className)} defaultValue={defaultValue}>
      {children}
    </Root>
  )
}

export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <List
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </List>
  )
}

export const TabsTrigger = ({
  value,
  children,
  className,
}: TabsTriggerProps) => {
  return (
    <Trigger
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      value={value}
    >
      {children}
    </Trigger>
  )
}

export const TabsContent = ({
  value,
  children,
  className,
}: TabsContentProps) => {
  return (
    <Content
      className={cn(
        "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      value={value}
    >
      {children}
    </Content>
  )
}
