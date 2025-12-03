import {
  TtpCursorCometPreview,
  TtpHomeBlurredNavPreview,
  TtpHorizontalTextRevealPreview,
  TtpLandoNorrisTablePreview,
  TtpLayeredNavPreview,
  TtpNotionNavigatorPreview,
  TtpPerspectiveCarousel,
  TtpPixelLoaderPreview,
  TtpRaunoSidebarPreview,
  TtpRaycastCommandMenuPreview,
  TtpTextScramblePreview,
  TtpWavyTextPreview,
  TtpWordShufflerPreview,
} from "@/app/components/[id]/_preview-components"
import { categories } from "./categories"
import type { ComponentMetadata } from "./types"

/**
 * Component IDs - centralized constants
 */
export const ComponentId = {
  RAUNO_SIDEBAR: "ttp-rauno-sidebar",
  LAYERED_NAV: "ttp-layered-nav",
  NOTION_NAVIGATOR: "ttp-notion-navigator",
  PIXEL_LOADER: "ttp-pixel-loader",
  WAVY_TEXT: "ttp-wavy-text",
  HORIZONTAL_TEXT_REVEAL: "ttp-horizontal-text-reveal",
  PERSPECTIVE_CAROUSEL: "ttp-perspective-carousel",
  CURSOR_COMET: "ttp-cursor-comet",
  WORD_SHUFFLER: "ttp-word-shuffler",
  RAYCAST_COMMAND_MENU: "ttp-raycast-command-menu",
  TEXT_SCRAMBLE: "ttp-text-scramble",
  LANDO_NORRIS_TABLE: "ttp-lando-norris-table",
  HOME_BLURRED_NAV: "ttp-home-blurred-nav",
} as const

export type ComponentIdType = (typeof ComponentId)[keyof typeof ComponentId]

/**
 * All component metadata definitions
 */
export const components: ComponentMetadata[] = [
  // Base Components
  {
    id: ComponentId.NOTION_NAVIGATOR,
    title: "Notion Navigator",
    description: "Hierarchical navigation sidebar with collapsible sections",
    category: categories.BASE_COMPONENTS.id,
    tags: ["navigation", "sidebar", "hierarchy", "collapsible"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-notion-navigator.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-notion-navigator.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpNotionNavigatorPreview,
    docsPath: "ttp-notion-navigator.mdx",
    registryType: "registry:block",
  },
  {
    id: ComponentId.RAYCAST_COMMAND_MENU,
    title: "Raycast Command Menu",
    description: "Command palette with beautiful keyboard-first navigation",
    category: categories.BASE_COMPONENTS.id,
    tags: ["command", "menu", "keyboard", "search", "palette"],
    dependencies: ["motion", "cmdk"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-raycast-command-menu.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-raycast-command-menu.json",
    complexity: "advanced",
    status: "stable",
    preview: TtpRaycastCommandMenuPreview,
    docsPath: "ttp-raycast-command-menu.mdx",
    logo: "/logos/raycast.png",
    registryType: "registry:block",
    inspiration: {
      author: "Raycast",
      url: "https://raycast.com",
    },
  },
  {
    id: ComponentId.LANDO_NORRIS_TABLE,
    title: "Lando Norris Table",
    description:
      "Beautiful table component with hover effects and clickable rows",
    category: categories.BASE_COMPONENTS.id,
    tags: ["table", "data", "hover", "interactive"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-lando-norris-table.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-lando-norris-table.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpLandoNorrisTablePreview,
    docsPath: "ttp-lando-norris-table.mdx",
    registryType: "registry:block",
  },

  // Seamless Navigations
  {
    id: ComponentId.RAUNO_SIDEBAR,
    title: "Rauno Sidebar",
    description: "Smooth expandable sidebar with fluid section transitions",
    category: categories.SEAMLESS_NAVIGATIONS.id,
    tags: ["sidebar", "navigation", "expandable", "smooth"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-rauno-sidebar.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-rauno-sidebar.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpRaunoSidebarPreview,
    docsPath: "ttp-rauno-sidebar.mdx",
    registryType: "registry:block",
    inspiration: {
      author: "Rauno Freiberg",
      url: "https://rauno.me",
      twitter: "@raunofreiberg",
    },
  },
  {
    id: ComponentId.LAYERED_NAV,
    title: "Layered Nav",
    description: "Multi-depth navigation with stacked drawer animations",
    category: categories.SEAMLESS_NAVIGATIONS.id,
    tags: ["navigation", "drawer", "layered", "multi-level"],
    dependencies: ["motion", "vaul"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-layered-nav.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-layered-nav.json",
    complexity: "advanced",
    status: "stable",
    preview: TtpLayeredNavPreview,
    docsPath: "ttp-layered-nav.mdx",
    registryType: "registry:block",
  },
  {
    id: ComponentId.HOME_BLURRED_NAV,
    title: "Home Blurred Nav",
    description: "Beautiful navigation bar with blurred background effect",
    category: categories.SEAMLESS_NAVIGATIONS.id,
    tags: ["navigation", "navbar", "blur", "glassmorphism"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-home-blurred-nav.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-home-blurred-nav.json",
    complexity: "simple",
    status: "stable",
    preview: TtpHomeBlurredNavPreview,
    docsPath: "ttp-home-blurred-nav.mdx",
    registryType: "registry:block",
  },

  // Unreal Page Entrances
  {
    id: ComponentId.PIXEL_LOADER,
    title: "Pixel Loader",
    description: "Cinematic pixelated transition for page load effects",
    category: categories.UNREAL_PAGE_ENTRANCES.id,
    tags: ["loader", "transition", "pixel", "animation"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-pixel-loader.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-pixel-loader.json",
    complexity: "advanced",
    status: "stable",
    preview: TtpPixelLoaderPreview,
    docsPath: "ttp-pixel-loader.mdx",
    registryType: "registry:block",
  },
  {
    id: ComponentId.WORD_SHUFFLER,
    title: "Word Shuffler",
    description: "Dynamic text shuffle animation on component mount",
    category: categories.UNREAL_PAGE_ENTRANCES.id,
    tags: ["text", "animation", "shuffle", "entrance"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-word-shuffler.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-word-shuffler.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpWordShufflerPreview,
    docsPath: "ttp-word-shuffler.mdx",
    registryType: "registry:block",
  },
  {
    id: ComponentId.TEXT_SCRAMBLE,
    title: "Text Scramble",
    description: "Scrambled text effect that reveals characters sequentially",
    category: categories.UNREAL_PAGE_ENTRANCES.id,
    tags: ["text", "animation", "scramble", "reveal"],
    dependencies: [],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-text-scramble.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-text-scramble.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpTextScramblePreview,
    docsPath: "ttp-text-scramble.mdx",
    registryType: "registry:block",
  },

  // Hover Like A Pro
  {
    id: ComponentId.WAVY_TEXT,
    title: "Wavy Text",
    description: "Playful wave animation triggered on text hover",
    category: categories.HOVER_LIKE_A_PRO.id,
    tags: ["text", "hover", "animation", "wave"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-wavy-text.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-wavy-text.json",
    complexity: "simple",
    status: "stable",
    preview: TtpWavyTextPreview,
    docsPath: "ttp-wavy-text.mdx",
    registryType: "registry:block",
  },
  {
    id: ComponentId.CURSOR_COMET,
    title: "Cursor Comet",
    description: "Trailing comet effect that follows cursor movement",
    category: categories.HOVER_LIKE_A_PRO.id,
    tags: ["cursor", "trail", "comet", "effect"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-cursor-comet.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-cursor-comet.json",
    complexity: "advanced",
    status: "stable",
    preview: TtpCursorCometPreview,
    docsPath: "ttp-cursor-comet.mdx",
    registryType: "registry:block",
  },

  // Magic Scrolling
  {
    id: ComponentId.HORIZONTAL_TEXT_REVEAL,
    title: "Horizontal Text Reveal",
    description: "Text gradually reveals as you scroll horizontally",
    category: categories.MAGIC_SCROLLING.id,
    tags: ["scroll", "text", "reveal", "horizontal"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-horizontal-text-reveal.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-horizontal-text-reveal.json",
    complexity: "advanced",
    status: "stable",
    preview: TtpHorizontalTextRevealPreview,
    docsPath: "ttp-horizontal-text-reveal.mdx",
    registryType: "registry:block",
  },
  {
    id: ComponentId.PERSPECTIVE_CAROUSEL,
    title: "Perspective Carousel",
    description: "3D carousel with depth and perspective transforms",
    category: categories.MAGIC_SCROLLING.id,
    tags: ["carousel", "3d", "perspective", "scroll"],
    dependencies: ["embla-carousel-react"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-perspective-carousel.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-perspective-carousel.json",
    complexity: "advanced",
    status: "stable",
    preview: TtpPerspectiveCarousel,
    docsPath: "ttp-perspective-carousel.mdx",
    registryType: "registry:block",
  },
]

/**
 * Helper function to get component by ID
 */
export const getComponentById = (id: string): ComponentMetadata | undefined => {
  return components.find((component) => component.id === id)
}

/**
 * Helper function to get components by category
 */
export const getComponentsByCategory = (
  categoryId: string
): ComponentMetadata[] => {
  return components.filter((component) => component.category === categoryId)
}

/**
 * Helper function to get components by tag
 */
export const getComponentsByTag = (tag: string): ComponentMetadata[] => {
  return components.filter((component) => component.tags.includes(tag))
}
