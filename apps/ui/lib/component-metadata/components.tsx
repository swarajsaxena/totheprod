import { TtpBlurFocusNavigationPreview } from "@/components/previews/ttp-blur-focus-navigation/preview"
import { TtpCommandPalettePreview } from "@/components/previews/ttp-command-palette/preview"
import { TtpCursorCometPreview } from "@/components/previews/ttp-cursor-comet/preview"
import { TtpDocumentNavigatorPreview } from "@/components/previews/ttp-document-navigator/preview"
import { TtpHorizontalTextRevealPreview } from "@/components/previews/ttp-horizontal-text-reveal/preview"
import { TtpImagePeekTablePreview } from "@/components/previews/ttp-image-peek-table/preview"
import { TtpLayeredNavPreview } from "@/components/previews/ttp-layered-nav/preview"
import { TtpPerspectiveCarousel } from "@/components/previews/ttp-perspective-carousel/preview"
import { TtpPixelLoaderPreview } from "@/components/previews/ttp-pixel-loader/preview"
import { TtpTextScramblePreview } from "@/components/previews/ttp-text-scramble/preview"
import { TtpTickerSidebarPreview } from "@/components/previews/ttp-ticker-sidebar/preview"
import { TtpWavyTextPreview } from "@/components/previews/ttp-wavy-text/preview"
import { TtpWordShufflerPreview } from "@/components/previews/ttp-word-shuffler/preview"
import { categories } from "./categories"
import type { ComponentMetadata } from "./types"

/**
 * Component IDs - centralized constants
 */
export const ComponentId = {
  TICKER_SIDEBAR: "ttp-ticker-sidebar",
  LAYERED_NAV: "ttp-layered-nav",
  DOCUMENT_NAVIGATOR: "ttp-document-navigator",
  PIXEL_LOADER: "ttp-pixel-loader",
  WAVY_TEXT: "ttp-wavy-text",
  HORIZONTAL_TEXT_REVEAL: "ttp-horizontal-text-reveal",
  PERSPECTIVE_CAROUSEL: "ttp-perspective-carousel",
  CURSOR_COMET: "ttp-cursor-comet",
  WORD_SHUFFLER: "ttp-word-shuffler",
  COMMAND_PALETTE: "ttp-command-palette",
  TEXT_SCRAMBLE: "ttp-text-scramble",
  IMAGE_PEEK_TABLE: "ttp-image-peek-table",
  BLUR_FOCUS_NAVIGATION: "ttp-blur-focus-navigation",
} as const

export type ComponentIdType = (typeof ComponentId)[keyof typeof ComponentId]

/**
 * All component metadata definitions
 */
export const components: ComponentMetadata[] = [
  // Base Components
  {
    id: ComponentId.DOCUMENT_NAVIGATOR,
    title: "Document Navigator",
    description:
      "Notion-style table of contents with collapsible sections and scroll tracking",
    category: categories.NAVIGATION_AND_MENUS.id,
    tags: [
      "navigation",
      "toc",
      "table-of-contents",
      "hierarchy",
      "collapsible",
    ],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-document-navigator.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-document-navigator.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpDocumentNavigatorPreview,
    docsPath: "ttp-document-navigator.mdx",
    registryType: "registry:block",
    inspirations: [
      {
        label: "Notion",
        href: "https://notion.so",
      },
    ],
  },
  {
    id: ComponentId.COMMAND_PALETTE,
    title: "Command Palette",
    description:
      "Command palette with beautiful keyboard-first navigation inspired by Raycast",
    category: categories.NAVIGATION_AND_MENUS.id,
    tags: ["command", "menu", "keyboard", "search", "palette"],
    dependencies: ["motion", "cmdk"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-command-palette.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-command-palette.json",
    complexity: "advanced",
    status: "stable",
    preview: TtpCommandPalettePreview,
    docsPath: "ttp-command-palette.mdx",
    logo: "/logos/raycast.png",
    registryType: "registry:block",
    inspirations: [
      {
        label: "Raycast",
        href: "https://raycast.com",
      },
    ],
  },
  {
    id: ComponentId.IMAGE_PEEK_TABLE,
    title: "Image Peek Table",
    description:
      "Interactive table with image preview on hover and clickable rows",
    category: categories.DATA_DISPLAY.id,
    tags: ["table", "data", "hover", "interactive", "image-preview"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-image-peek-table.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-image-peek-table.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpImagePeekTablePreview,
    docsPath: "ttp-image-peek-table.mdx",
    registryType: "registry:block",
  },

  // Navigation & Menus
  {
    id: ComponentId.TICKER_SIDEBAR,
    title: "Ticker Sidebar",
    description:
      "Smooth expandable sidebar with fluid section transitions inspired by Rauno Freiberg",
    category: categories.NAVIGATION_AND_MENUS.id,
    tags: ["sidebar", "navigation", "expandable", "smooth"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-ticker-sidebar.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-ticker-sidebar.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpTickerSidebarPreview,
    docsPath: "ttp-ticker-sidebar.mdx",
    registryType: "registry:block",
    inspirations: [
      {
        label: "Rauno Freiberg",
        href: "https://rauno.me",
      },
      {
        label: "@raunofreiberg",
        href: "https://twitter.com/raunofreiberg",
      },
    ],
  },
  {
    id: ComponentId.LAYERED_NAV,
    title: "Layered Nav",
    description: "Multi-depth navigation with stacked drawer animations",
    category: categories.NAVIGATION_AND_MENUS.id,
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
    id: ComponentId.BLUR_FOCUS_NAVIGATION,
    title: "Blur Focus Navigation",
    description:
      "Navigation bar with dynamic blur effect that highlights active sections",
    category: categories.NAVIGATION_AND_MENUS.id,
    tags: ["navigation", "navbar", "blur", "glassmorphism", "focus"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-blur-focus-navigation.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-blur-focus-navigation.json",
    complexity: "simple",
    status: "stable",
    preview: TtpBlurFocusNavigationPreview,
    docsPath: "ttp-blur-focus-navigation.mdx",
    registryType: "registry:block",
  },

  // Page Transitions & Loaders
  {
    id: ComponentId.PIXEL_LOADER,
    title: "Pixel Loader",
    description: "Cinematic pixelated transition for page load effects",
    category: categories.PAGE_TRANSITIONS_AND_LOADERS.id,
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
    category: categories.TEXT_ANIMATIONS.id,
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
    category: categories.TEXT_ANIMATIONS.id,
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

  // Text Animations
  {
    id: ComponentId.WAVY_TEXT,
    title: "Wavy Text",
    description: "Playful wave animation triggered on text hover",
    category: categories.TEXT_ANIMATIONS.id,
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
  // Cursor & Hover Effects
  {
    id: ComponentId.CURSOR_COMET,
    title: "Cursor Comet",
    description: "Trailing comet effect that follows cursor movement",
    category: categories.CURSOR_AND_HOVER_EFFECTS.id,
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

  // Scroll Interactions
  {
    id: ComponentId.HORIZONTAL_TEXT_REVEAL,
    title: "Horizontal Text Reveal",
    description: "Text gradually reveals as you scroll horizontally",
    category: categories.TEXT_ANIMATIONS.id,
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
    category: categories.SCROLL_INTERACTIONS.id,
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
