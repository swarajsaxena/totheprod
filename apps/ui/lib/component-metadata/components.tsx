import { TtpBlurFocusNavigationPreview } from "@/components/previews/ttp-blur-focus-navigation/preview"
import { TtpCommandPalettePreview } from "@/components/previews/ttp-command-palette/preview"
import { TtpCursorCometPreview } from "@/components/previews/ttp-cursor-comet/preview"
import { TtpDocumentNavigatorPreview } from "@/components/previews/ttp-document-navigator/preview"
import { TtpHorizontalTextRevealPreview } from "@/components/previews/ttp-horizontal-text-reveal/preview"
import { TtpImagePeekTablePreview } from "@/components/previews/ttp-image-peek-table/preview"
import { TtpInlineDropdownPreview } from "@/components/previews/ttp-inline-dropdown/preview"
import { TtpLayeredNavPreview } from "@/components/previews/ttp-layered-nav/preview"
import { TtpPerspectiveCarousel } from "@/components/previews/ttp-perspective-carousel/preview"
import { TtpPixelLoaderPreview } from "@/components/previews/ttp-pixel-loader/preview"
import { TtpSubscriptionCalendarPreview } from "@/components/previews/ttp-subscription-calendar/preview"
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
  INLINE_DROPDOWN: "ttp-inline-dropdown",
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
      "A hierarchical table of contents with smooth scroll tracking, expandable/collapsible sections, and automatic active state detection",
    instructions:
      "Pass an array of sections with headings and subheadings. Click items to scroll to sections. Nested items auto-expand when their parent is active.",
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
      "A keyboard-first command menu with fuzzy search, grouped actions, keyboard shortcuts display, and smooth transitions between command lists",
    instructions:
      "Trigger with Cmd+K. Type to search commands. Use arrow keys to navigate. Press Enter to execute. Supports nested command groups and breadcrumb navigation.",
    category: categories.NAVIGATION_AND_MENUS.id,
    tags: ["command", "menu", "keyboard", "search", "palette"],
    dependencies: ["react-hotkeys-hook", "cmdk"],
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
      "A data table with smooth image preview popover that follows cursor on hover, featuring clickable rows and elegant transitions",
    instructions:
      "Pass data array with image URLs. Hover over rows to see image preview following your cursor. Click rows to trigger actions. Customize columns as needed.",
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
    registryType: "registry:block",
  },
  {
    id: "ttp-subscription-calendar",
    category: categories.DATA_DISPLAY.id,
    title: "Subscription Calendar",
    description:
      "A calendar component that displays subscription details and allows users to manage their subscriptions",
    instructions:
      "Pass an array of subscriptions with dates, prices, and intervals. Click on days with subscriptions to view details in a modal. Use arrow buttons to navigate months. Customize colors, currency, and rendering through props.",
    tags: ["calendar", "subscriptions", "management"],
    dependencies: ["motion", "date-fns"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-subscription-calendar.tsx",
        type: "registry:component",
      },
      {
        path: "hooks/totheprod-ui/use-click-outside.ts",
        type: "registry:hook",
      },
    ],
    complexity: "moderate",
    status: "stable",
    preview: TtpSubscriptionCalendarPreview,
    registryType: "registry:block",
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-subscription-calendar.json",
    inspirations: [
      {
        label: "Substack",
        href: "https://substack.com",
      },
    ],
  },

  // Navigation & Menus
  {
    id: ComponentId.TICKER_SIDEBAR,
    title: "Ticker Sidebar",
    description:
      "An expandable sidebar with animated section transitions, ticker-style content updates, and smooth width animations for collapsed/expanded states",
    instructions:
      "Hover to expand sidebar. Click sections to navigate. Content animates in ticker style when switching sections. Collapsed state shows icons only, expanded reveals full labels.",
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
    description:
      "A multi-level navigation system with stacked drawer layers that scale and transform to show depth, creating a card-stack effect when drilling down",
    instructions:
      "Click menu items to open nested layers. Each layer stacks with scale and position transforms. Use back button or swipe to return to previous layers.",
    category: categories.NAVIGATION_AND_MENUS.id,
    tags: ["navigation", "drawer", "layered", "multi-level"],
    dependencies: ["motion"],
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
    registryType: "registry:block",
  },
  {
    id: ComponentId.BLUR_FOCUS_NAVIGATION,
    title: "Blur Focus Navigation",
    description:
      "A navigation bar with animated blur spotlight that follows the active item, creating a glassmorphic focus effect with smooth transitions between sections",
    instructions:
      "Click navigation items to change active state. The blur spotlight smoothly animates to highlight the selected item. Customize blur intensity and colors via CSS variables.",
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
    registryType: "registry:block",
  },
  {
    id: ComponentId.INLINE_DROPDOWN,
    title: "Inline Dropdown",
    description:
      "A dropdown that expands inline within the text flow, pushing content down smoothly instead of overlaying, perfect for inline selections without breaking layout",
    instructions:
      "Click trigger to expand dropdown inline. Select an option to update value and collapse. Use keyboard navigation (arrow keys, Enter, Escape) for accessibility.",
    category: categories.NAVIGATION_AND_MENUS.id,
    tags: ["navigation", "dropdowns"],
    dependencies: ["motion"],
    files: [
      {
        path: "components/ui/totheprod-ui/ttp-inline-dropdown.tsx",
        type: "registry:component",
      },
    ],
    installCommand:
      "npx shadcn@latest add https://ui.totheprod.com/r/ttp-inline-dropdown.json",
    complexity: "moderate",
    status: "stable",
    preview: TtpInlineDropdownPreview,
    registryType: "registry:block",
  },

  // Page Transitions & Loaders
  {
    id: ComponentId.PIXEL_LOADER,
    title: "Pixel Loader",
    description:
      "A cinematic page transition that pixelates and dissolves in a grid pattern, revealing content with staggered timing for a retro-futuristic effect",
    instructions:
      "Wrap your page content with the loader. Trigger loading state to animate pixels out. Set pixelSize and animationDuration to customize the effect timing and appearance.",
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
    registryType: "registry:block",
  },
  {
    id: ComponentId.WORD_SHUFFLER,
    title: "Word Shuffler",
    description:
      "A text animation that randomly shuffles characters before settling into the final text, creating a decoding effect perfect for headlines and hero text",
    instructions:
      "Pass text prop to animate. Component auto-plays on mount. Adjust shuffleDuration and characterSet to customize the shuffle effect speed and character pool.",
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
    status: "disabled",
    preview: TtpWordShufflerPreview,
    registryType: "registry:block",
  },
  {
    id: ComponentId.TEXT_SCRAMBLE,
    title: "Text Scramble",
    description:
      "A text reveal effect that scrambles characters with random symbols before sequentially resolving to the target text from left to right",
    instructions:
      "Pass text to reveal. Scramble triggers on mount or prop change. Customize speed with revealSpeed prop. Perfect for creating glitch or hacker-style text reveals.",
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
    status: "disabled",
    preview: TtpTextScramblePreview,
    registryType: "registry:block",
  },

  // Text Animations
  {
    id: ComponentId.WAVY_TEXT,
    title: "Wavy Text",
    description:
      "A playful hover effect that animates each character in a wave pattern with staggered timing, creating a bouncing wave motion across the text",
    instructions:
      "Wrap text content inside component. Hover to trigger wave animation. Each character animates independently with staggered delay. Customize wave height and speed via props.",
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
    registryType: "registry:block",
  },
  // Cursor & Hover Effects
  {
    id: ComponentId.CURSOR_COMET,
    title: "Cursor Comet",
    description:
      "A smooth trailing comet effect with gradient tail that follows cursor movement, using spring physics for natural motion and fading particles",
    instructions:
      "Wrap interactive areas with component. Cursor automatically spawns trailing particles with gradient fade. Customize comet color, length, and spring physics through props.",
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
    registryType: "registry:block",
  },

  // Scroll Interactions
  {
    id: ComponentId.HORIZONTAL_TEXT_REVEAL,
    title: "Horizontal Text Reveal",
    description:
      "A scroll-triggered text reveal that gradually unveils content as users scroll horizontally, with character-by-character fade and blur transitions",
    instructions:
      "Place text inside component within horizontal scroll container. Text reveals progressively based on scroll position. Characters fade from blur to sharp as they enter viewport center.",
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
    registryType: "registry:block",
  },
  {
    id: ComponentId.PERSPECTIVE_CAROUSEL,
    title: "Perspective Carousel",
    description:
      "A 3D carousel with perspective transforms that scales and rotates slides based on their position, creating depth with center-focused layout",
    instructions:
      "Pass array of slides. Navigation arrows or drag to scroll. Center slide scales up and has full opacity, while side slides scale down with reduced opacity.",
    category: categories.SCROLL_INTERACTIONS.id,
    tags: ["carousel", "3d", "perspective", "scroll"],
    dependencies: ["motion"],
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
  return components.filter(
    (component) =>
      component.category === categoryId && component.status !== "disabled"
  )
}

/**
 * Helper function to get components by tag
 */
export const getComponentsByTag = (tag: string): ComponentMetadata[] => {
  return components.filter((component) => component.tags.includes(tag))
}
