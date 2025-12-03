import {
  BlockGameIcon,
  CursorMagicSelection02Icon,
  File02Icon,
  Navigation04Icon,
  VerticalScrollPointIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
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
} from "./_preview-components"

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

export const contentMap = [
  {
    section: "Base Components",
    icon: <HugeiconsIcon className="size-4" icon={BlockGameIcon} />,
    items: [
      {
        id: ComponentId.NOTION_NAVIGATOR,
        title: "Notion Navigator",
        description:
          "Hierarchical navigation sidebar with collapsible sections",
        preview: TtpNotionNavigatorPreview,
        docsPath: "ttp-notion-navigator.mdx",
      },
      {
        id: ComponentId.RAYCAST_COMMAND_MENU,
        title: "Raycast Command Menu",
        description: "Command palette with beautiful keyboard-first navigation",
        preview: TtpRaycastCommandMenuPreview,
        docsPath: "ttp-raycast-command-menu.mdx",
        logo: "/logos/raycast.png",
      },
      {
        id: ComponentId.LANDO_NORRIS_TABLE,
        title: "Lando Norris Table",
        description:
          "Beautiful table component with hover effects and clickable rows",
        preview: TtpLandoNorrisTablePreview,
        docsPath: "ttp-lando-norris-table.mdx",
      },
    ],
  },
  {
    section: "Seamless Navigations",
    icon: <HugeiconsIcon className="size-4" icon={Navigation04Icon} />,
    items: [
      {
        id: ComponentId.RAUNO_SIDEBAR,
        title: "Rauno Sidebar",
        description: "Smooth expandable sidebar with fluid section transitions",
        preview: TtpRaunoSidebarPreview,
        docsPath: "ttp-rauno-sidebar.mdx",
      },
      {
        id: ComponentId.LAYERED_NAV,
        title: "Layered Nav",
        description: "Multi-depth navigation with stacked drawer animations",
        preview: TtpLayeredNavPreview,
        docsPath: "ttp-layered-nav.mdx",
      },
      {
        id: ComponentId.HOME_BLURRED_NAV,
        title: "Home Blurred Nav",
        description: "Beautiful navigation bar with blurred background effect",
        preview: TtpHomeBlurredNavPreview,
        docsPath: "ttp-home-blurred-nav.mdx",
      },
    ],
  },
  {
    section: "Unreal Page Entrances",
    icon: <HugeiconsIcon className="size-4" icon={File02Icon} />,
    items: [
      {
        id: ComponentId.PIXEL_LOADER,
        title: "Pixel Loader",
        description: "Cinematic pixelated transition for page load effects",
        preview: TtpPixelLoaderPreview,
        docsPath: "ttp-pixel-loader.mdx",
      },
      {
        id: ComponentId.WORD_SHUFFLER,
        title: "Word Shuffler",
        description: "Dynamic text shuffle animation on component mount",
        preview: TtpWordShufflerPreview,
        docsPath: "ttp-word-shuffler.mdx",
      },
      {
        id: ComponentId.TEXT_SCRAMBLE,
        title: "Text Scramble",
        description:
          "Scrambled text effect that reveals characters sequentially",
        preview: TtpTextScramblePreview,
        docsPath: "ttp-text-scramble.mdx",
      },
    ],
  },
  {
    section: "Hover Like A Pro",
    icon: (
      <HugeiconsIcon className="size-4" icon={CursorMagicSelection02Icon} />
    ),
    items: [
      {
        id: ComponentId.WAVY_TEXT,
        title: "Wavy Text",
        description: "Playful wave animation triggered on text hover",
        preview: TtpWavyTextPreview,
        docsPath: "ttp-wavy-text.mdx",
      },
      {
        id: ComponentId.CURSOR_COMET,
        title: "Cursor Comet",
        description: "Trailing comet effect that follows cursor movement",
        preview: TtpCursorCometPreview,
        docsPath: "ttp-cursor-comet.mdx",
      },
    ],
  },
  {
    section: "Magic Scrolling",
    icon: <HugeiconsIcon className="size-4" icon={VerticalScrollPointIcon} />,
    items: [
      {
        id: ComponentId.HORIZONTAL_TEXT_REVEAL,
        title: "Horizontal Text Reveal",
        description: "Text gradually reveals as you scroll horizontally",
        preview: TtpHorizontalTextRevealPreview,
        docsPath: "ttp-horizontal-text-reveal.mdx",
      },
      {
        id: ComponentId.PERSPECTIVE_CAROUSEL,
        title: "Perspective Carousel",
        description: "3D carousel with depth and perspective transforms",
        preview: TtpPerspectiveCarousel,
        docsPath: "ttp-perspective-carousel.mdx",
      },
    ],
  },
]
