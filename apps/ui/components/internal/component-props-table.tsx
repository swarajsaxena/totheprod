"use client"

import {
  CancelSquareIcon,
  CheckmarkSquare02Icon,
  HelpSquareIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import {
  ComponentDetailContainer,
  ComponentHeading,
  ComponentParagraph,
} from "@/app/components/[id]/_components"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { loadComponentProps } from "@/lib/component-metadata/props-loader"
import type {
  ComponentPropsGroup,
  PropDefinition,
} from "@/lib/component-metadata/types"
import { currentComponentAtom } from "@/store/atoms"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const renderPropsTable = (props: Record<string, PropDefinition>) => {
  const propsArray = Object.entries(props)

  if (propsArray.length === 0) {
    return null
  }

  return (
    <ComponentDetailContainer>
      <Table className="**:border-dashed">
        <TableHeader>
          <TableRow className="grid-cols-4 font-mono">
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead className="w-20 text-center">Required</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propsArray.map(([name, prop]) => (
            <TableRow className="text-muted-foreground text-xs" key={name}>
              <TableCell className="flex items-center gap-1 font-mono text-foreground/75">
                {name}
                {prop.description && (
                  <Tooltip>
                    <TooltipTrigger>
                      <HugeiconsIcon className="size-3" icon={HelpSquareIcon} />
                    </TooltipTrigger>
                    <TooltipContent>{prop.description}</TooltipContent>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell className="font-mono text-xs">{prop.type}</TableCell>
              <TableCell className="font-mono text-xs">
                {prop.default || "-"}
              </TableCell>
              <TableCell className="flex items-end justify-center text-center">
                {prop.required ? (
                  <HugeiconsIcon
                    className="size-4 text-green-500"
                    icon={CheckmarkSquare02Icon}
                  />
                ) : (
                  <HugeiconsIcon
                    className="size-4 text-red-500"
                    icon={CancelSquareIcon}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ComponentDetailContainer>
  )
}

export const ComponentPropsTable = () => {
  const component = useAtomValue(currentComponentAtom)
  const [loadedProps, setLoadedProps] = useState<ComponentPropsGroup[] | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  // Load props from JSON if component metadata doesn't have props
  useEffect(() => {
    if (!component?.id) {
      return
    }

    // If component already has props, don't load from JSON
    if (component.props) {
      setLoadedProps(null)
      return
    }

    // Load props from JSON
    setIsLoading(true)
    loadComponentProps(component.id)
      .then((props) => {
        setLoadedProps(props)
      })
      .catch(() => {
        setLoadedProps(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [component?.id, component?.props])

  // Determine which props to use: metadata props or loaded JSON props
  const propsToUse:
    | ComponentPropsGroup[]
    | Record<string, PropDefinition>
    | null = component?.props || (loadedProps ? loadedProps : null)

  if (!propsToUse) {
    return (
      <>
        <ComponentHeading>Props</ComponentHeading>
        {isLoading ? (
          <ComponentParagraph>Loading props...</ComponentParagraph>
        ) : (
          <ComponentParagraph>
            No props available for this component.
          </ComponentParagraph>
        )}
      </>
    )
  }

  // Check if props is grouped (array) or flat (object)
  const isGrouped = Array.isArray(propsToUse)
  const hasProps = isGrouped
    ? (propsToUse as ComponentPropsGroup[]).length > 0
    : Object.keys(propsToUse as Record<string, PropDefinition>).length > 0

  if (!hasProps) {
    return (
      <>
        <ComponentHeading>Props</ComponentHeading>
        <ComponentParagraph>
          No props available for this component.
        </ComponentParagraph>
      </>
    )
  }

  // Handle grouped props (array of ComponentPropsGroup)
  if (isGrouped) {
    const groupedProps = propsToUse as ComponentPropsGroup[]

    return (
      <>
        <ComponentHeading>Prop Table</ComponentHeading>
        {groupedProps.map((group) => (
          <>
            {/* <ComponentDetailContainer /> */}
            <ComponentHeading
              className="text-foreground!"
              key={group.componentName}
            >
              {group.componentName}
            </ComponentHeading>
            {renderPropsTable(group.props)}
          </>
        ))}
        <ComponentDetailContainer className="p-6" />
      </>
    )
  }

  // Handle flat props (legacy format)
  const flatProps = propsToUse as Record<string, PropDefinition>

  return (
    <>
      <ComponentHeading>Props</ComponentHeading>
      {renderPropsTable(flatProps)}
      <ComponentDetailContainer />
    </>
  )
}
