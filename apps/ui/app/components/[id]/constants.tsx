import {
  BlockGameIcon,
  CursorMagicSelection02Icon,
  File02Icon,
  Navigation04Icon,
  VerticalScrollPointIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CursorCometPreview,
  HorizontalTextRevealPreview,
  LayeredNavPreview,
  PerpectiveCarousel,
  PixelLoaderPreview,
  RaunoSidebarPreview,
  RaycastCommandMenuPreview,
  TextScramblePreview,
  WavyTextPreview,
  WordShufflerPreview,
} from "./_preview-components"

export enum ComponentId {
  RAUNO_SIDEBAR = "rauno-sidebar",
  LAYERED_NAV = "layered-nav",
  PIXEL_LOADER = "pixel-loader",
  WAVY_TEXT = "wavy-text",
  HORIZONTAL_TEXT_REVEAL = "horizontal-text-reveal",
  PERSPECTIVE_CAROUSEL = "perspective-carousel",
  CURSOR_COMET = "cursor-comet",
  WORD_SHUFFLER = "word-shuffler",
  RAYCAST_COMMAND_MENU = "raycast-command-menu",
  TEXT_SCRAMBLE = "text-scramble",
}

export const contentMap = [
  {
    section: "Base Components",
    icon: <HugeiconsIcon icon={BlockGameIcon} className="size-4" />,
    items: [
      {
        id: ComponentId.RAYCAST_COMMAND_MENU,
        title: "Raycast Command Menu",
        description: "Command palette with beautiful keyboard-first navigation",
        preview: RaycastCommandMenuPreview,
        docsPath: "raycast-command-menu.mdx",
        logo: "/logos/raycast.png",
      },
    ],
  },
  {
    section: "Seamless Navigations",
    icon: <HugeiconsIcon icon={Navigation04Icon} className="size-4" />,
    items: [
      {
        id: ComponentId.RAUNO_SIDEBAR,
        title: "Rauno Sidebar",
        description: "Smooth expandable sidebar with fluid section transitions",
        preview: RaunoSidebarPreview,
        docsPath: "rauno-sidebar.mdx",
      },
      {
        id: ComponentId.LAYERED_NAV,
        title: "Layered Nav",
        description: "Multi-depth navigation with stacked drawer animations",
        preview: LayeredNavPreview,
        docsPath: "layered-nav.mdx",
      },
    ],
  },
  {
    section: "Unreal Page Entrances",
    icon: <HugeiconsIcon icon={File02Icon} className="size-4" />,
    items: [
      {
        id: ComponentId.PIXEL_LOADER,
        title: "Pixel Loader",
        description: "Cinematic pixelated transition for page load effects",
        preview: PixelLoaderPreview,
        docsPath: "pixel-loader.mdx",
      },
      {
        id: ComponentId.WORD_SHUFFLER,
        title: "Word Shuffler",
        description: "Dynamic text shuffle animation on component mount",
        preview: WordShufflerPreview,
        docsPath: "word-shuffler.mdx",
      },
      {
        id: ComponentId.TEXT_SCRAMBLE,
        title: "Text Scramble",
        description:
          "Scrambled text effect that reveals characters sequentially",
        preview: TextScramblePreview,
        docsPath: "text-scramble.mdx",
      },
    ],
  },
  {
    section: "Hover Like A Pro",
    icon: (
      <HugeiconsIcon icon={CursorMagicSelection02Icon} className="size-4" />
    ),
    items: [
      {
        id: ComponentId.WAVY_TEXT,
        title: "Wavy Text",
        description: "Playful wave animation triggered on text hover",
        preview: WavyTextPreview,
        docsPath: "wavy-text.mdx",
      },
      {
        id: ComponentId.CURSOR_COMET,
        title: "Cursor Comet",
        description: "Trailing comet effect that follows cursor movement",
        preview: CursorCometPreview,
        docsPath: "cursor-comet.mdx",
      },
    ],
  },
  {
    section: "Magic Scrolling",
    icon: <HugeiconsIcon icon={VerticalScrollPointIcon} className="size-4" />,
    items: [
      {
        id: ComponentId.HORIZONTAL_TEXT_REVEAL,
        title: "Horizontal Text Reveal",
        description: "Text gradually reveals as you scroll horizontally",
        preview: HorizontalTextRevealPreview,
        docsPath: "horizontal-text-reveal.mdx",
      },
      {
        id: ComponentId.PERSPECTIVE_CAROUSEL,
        title: "Perspective Carousel",
        description: "3D carousel with depth and perspective transforms",
        preview: PerpectiveCarousel,
        docsPath: "perspective-carousel.mdx",
      },
    ],
  },
]
