import type { PreviewConfig } from "@/lib/component-metadata/types"

/**
 * Preview configuration
 * Hide the preview file since it's complex with many dependencies
 */
export const previewConfig: PreviewConfig = {
  showPreviewFile: false,
}

// biome-ignore lint/performance/noBarrelFile: Re-export for preview component consistency
export { TtpPerspectiveCarousel } from "@/components/ui/totheprod-ui/ttp-perspective-carousel"
