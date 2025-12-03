import {
  BlockGameIcon,
  CursorMagicSelection02Icon,
  File02Icon,
  Navigation04Icon,
  VerticalScrollPointIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Component categories with icons and descriptions
 */
const categoriesData = {
  BASE_COMPONENTS: {
    id: "base-components",
    section: "Base Components",
    icon: <HugeiconsIcon className="size-4" icon={BlockGameIcon} />,
    description: "Essential UI components for building interfaces",
  },
  SEAMLESS_NAVIGATIONS: {
    id: "seamless-navigations",
    section: "Seamless Navigations",
    icon: <HugeiconsIcon className="size-4" icon={Navigation04Icon} />,
    description: "Smooth and fluid navigation components",
  },
  UNREAL_PAGE_ENTRANCES: {
    id: "unreal-page-entrances",
    section: "Unreal Page Entrances",
    icon: <HugeiconsIcon className="size-4" icon={File02Icon} />,
    description: "Cinematic page load and transition effects",
  },
  HOVER_LIKE_A_PRO: {
    id: "hover-like-a-pro",
    section: "Hover Like A Pro",
    icon: (
      <HugeiconsIcon className="size-4" icon={CursorMagicSelection02Icon} />
    ),
    description: "Interactive hover effects and animations",
  },
  MAGIC_SCROLLING: {
    id: "magic-scrolling",
    section: "Magic Scrolling",
    icon: <HugeiconsIcon className="size-4" icon={VerticalScrollPointIcon} />,
    description: "Scroll-based animations and effects",
  },
} as const

export const categories = categoriesData
export type CategoryId = keyof typeof categoriesData
