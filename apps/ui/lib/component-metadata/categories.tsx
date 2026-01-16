import {
  BlockGameIcon,
  File02Icon,
  Navigation04Icon,
  TextFontIcon,
  VerticalScrollPointIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Component categories with icons and descriptions
 */
const categoriesData = {
  NAVIGATION_AND_MENUS: {
    id: "navigation-and-menus",
    section: "Navigation & Menus",
    icon: <HugeiconsIcon className="size-4" icon={Navigation04Icon} />,
    description: "Navigation systems, sidebars, and command menus",
  },
  DATA_DISPLAY: {
    id: "data-display",
    section: "Data Display",
    icon: <HugeiconsIcon className="size-4" icon={BlockGameIcon} />,
    description: "Tables, lists, and data presentation components",
  },
  TEXT_ANIMATIONS: {
    id: "text-animations",
    section: "Text Animations",
    icon: <HugeiconsIcon className="size-4" icon={TextFontIcon} />,
    description: "Dynamic text effects and typography animations",
  },
  PAGE_TRANSITIONS_AND_LOADERS: {
    id: "page-transitions-and-loaders",
    section: "Page Transitions & Loaders",
    icon: <HugeiconsIcon className="size-4" icon={File02Icon} />,
    description: "Page load effects and transition animations",
  },
  // CURSOR_AND_HOVER_EFFECTS: {
  //   id: "cursor-and-hover-effects",
  //   section: "Cursor & Hover Effects",
  //   icon: (
  //     <HugeiconsIcon className="size-4" icon={CursorMagicSelection02Icon} />
  //   ),
  //   description: "Interactive cursor trails and hover animations",
  // },
  SCROLL_INTERACTIONS: {
    id: "scroll-interactions",
    section: "Scroll Interactions",
    icon: <HugeiconsIcon className="size-4" icon={VerticalScrollPointIcon} />,
    description: "Scroll-triggered effects and parallax components",
  },
} as const

export const categories = categoriesData
export type CategoryId = keyof typeof categoriesData
