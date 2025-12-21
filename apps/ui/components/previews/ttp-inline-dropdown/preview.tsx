"use client"

import {
  Copy01Icon,
  Download01Icon,
  PencilEdit01Icon,
  Settings01Icon,
  Share01Icon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import CornerPlusContainer from "@/components/internal/corner-plus-container"
import PreviewHeading from "@/components/internal/preview-heading"
import {
  TtpInlineDropdown,
  TtpInlineDropdownItem,
  TtpInlineDropdownItemIcon,
  TtpInlineDropdownItemLabel,
} from "@/components/ui/totheprod-ui/ttp-inline-dropdown"

const DropdownElement = ({
  defaultItemId,
  align = "left",
  interactionType = "hover",
  mode = "icon",
  containerPadding,
  containerGap,
}: {
  defaultItemId?: string
  align?: "left" | "right"
  interactionType?: "hover" | "click"
  mode?: "icon" | "both"
  containerPadding?: number
  containerGap?: number
}) => (
  <TtpInlineDropdown
    align={align}
    containerGap={containerGap}
    containerPadding={containerPadding}
    defaultItemId={defaultItemId}
    interactionType={interactionType}
    mode={mode}
  >
    <TtpInlineDropdownItem id="copy-code">
      <TtpInlineDropdownItemIcon>
        <HugeiconsIcon icon={Copy01Icon} />
      </TtpInlineDropdownItemIcon>
      <TtpInlineDropdownItemLabel>Copy Code</TtpInlineDropdownItemLabel>
    </TtpInlineDropdownItem>
    <TtpInlineDropdownItem id="view-code">
      <TtpInlineDropdownItemIcon>
        <HugeiconsIcon icon={SourceCodeIcon} />
      </TtpInlineDropdownItemIcon>
      <TtpInlineDropdownItemLabel>View Code</TtpInlineDropdownItemLabel>
    </TtpInlineDropdownItem>
    <TtpInlineDropdownItem id="edit">
      <TtpInlineDropdownItemIcon>
        <HugeiconsIcon icon={PencilEdit01Icon} />
      </TtpInlineDropdownItemIcon>
      <TtpInlineDropdownItemLabel>Edit</TtpInlineDropdownItemLabel>
    </TtpInlineDropdownItem>
    <TtpInlineDropdownItem id="download">
      <TtpInlineDropdownItemIcon>
        <HugeiconsIcon icon={Download01Icon} />
      </TtpInlineDropdownItemIcon>
      <TtpInlineDropdownItemLabel>Download</TtpInlineDropdownItemLabel>
    </TtpInlineDropdownItem>
    <TtpInlineDropdownItem id="share">
      <TtpInlineDropdownItemIcon>
        <HugeiconsIcon icon={Share01Icon} />
      </TtpInlineDropdownItemIcon>
      <TtpInlineDropdownItemLabel>Share</TtpInlineDropdownItemLabel>
    </TtpInlineDropdownItem>
    <TtpInlineDropdownItem id="settings">
      <TtpInlineDropdownItemIcon>
        <HugeiconsIcon icon={Settings01Icon} />
      </TtpInlineDropdownItemIcon>
      <TtpInlineDropdownItemLabel>Settings</TtpInlineDropdownItemLabel>
    </TtpInlineDropdownItem>
  </TtpInlineDropdown>
)

type DropdownProps = {
  defaultItemId?: string
  align?: "left" | "right"
  interactionType?: "hover" | "click"
  mode?: "icon" | "both"
  containerPadding?: number
  containerGap?: number
}

type Combination = DropdownProps & {
  description: string
}

export const TtpInlineDropdownPreview = () => {
  const combinations: Combination[] = [
    {
      align: "left",
      description: "Default (icon mode, hover, left aligned)",
    },
    {
      align: "right",
      defaultItemId: "copy-code",
      interactionType: "click",
      description: "Right aligned, click interaction, first item as default",
    },
    {
      defaultItemId: "edit",
      interactionType: "click",
      description: "Click interaction, middle item as default",
    },
    {
      align: "right",
      defaultItemId: "settings",
      description: "Right aligned, last item as default",
    },
    {
      align: "left",
      defaultItemId: "view-code",
      description: "Left aligned, second item as default",
    },
    {
      align: "right",
      defaultItemId: "download",
      interactionType: "click",
      description: "Right aligned, click interaction, fourth item as default",
    },
    {
      mode: "both",
      description: "Both mode (icon + label visible on trigger)",
    },
    {
      interactionType: "click",
      mode: "both",
      description: "Both mode with click interaction",
    },
    {
      interactionType: "click",
      description: "Click interaction",
    },
    {
      containerGap: 6,
      containerPadding: 8,
      description: "Spacious spacing (padding: 8px, gap: 6px)",
    },
    {
      containerGap: 2,
      containerPadding: 2,
      description: "Tight spacing (padding: 2px, gap: 2px)",
    },
    {
      align: "right",
      containerGap: 6,
      containerPadding: 8,
      description: "Spacious spacing, right aligned",
    },
    {
      interactionType: "click",
      mode: "both",
      description: "Both mode, click interaction",
    },
    {
      align: "right",
      interactionType: "click",
      mode: "both",
      description: "Both mode, click, right aligned",
    },
    {
      align: "right",
      description: "Fixed width (200px), right aligned",
    },
  ]

  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto"
      data-preview-padding="false"
    >
      <CornerPlusContainer className="mt-4">
        <PreviewHeading
          className="m-0 p-8 py-4"
          description="A dropdown component that can be used to select an option from a list."
          title="Inline Dropdown"
        />
      </CornerPlusContainer>
      <div className="grid grid-cols-2">
        {combinations.map(({ description, ...props }, index) => (
          <div
            className="flex flex-col items-center gap-4 border-r border-b border-dashed py-16"
            key={index}
          >
            <span className="text-center text-muted-foreground text-xs">
              {description}
            </span>
            <DropdownElement {...props} />
          </div>
        ))}
      </div>
    </div>
  )
}
