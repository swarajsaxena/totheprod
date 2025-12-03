/**
 * @deprecated This file is kept for backwards compatibility during migration.
 * All new code should import directly from @/lib/component-metadata
 */

export type { ComponentIdType } from "@/lib/component-metadata"
// Re-export everything from the new metadata system
// biome-ignore lint/performance/noBarrelFile: x
export {
  contentMap,
  type TComponentId,
} from "@/lib/component-metadata"
