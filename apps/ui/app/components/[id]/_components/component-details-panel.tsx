import { ComponentDetailsTabs } from "@/components/internal/component-details-tabs"

export const ComponentDetailsPanel = () => {
  return (
    <div className="flex h-[unset] flex-1 flex-col overflow-hidden">
      <ComponentDetailsTabs />
    </div>
  )
}
