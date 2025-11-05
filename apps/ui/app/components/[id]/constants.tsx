import {
  HorizontalTextRevealPreview,
  RaunoSidebarPreview,
  WavyTextPreview,
  PixelLoaderPreview,
  PerpectiveCarousel,
  LayeredNavPreview,
  CursorCometPreview,
  WordShufflerPreview,
  RaycastCommandMenuPreview,
} from './_preview-components'

export enum ComponentId {
  RAUNO_SIDEBAR = 'rauno-sidebar',
  LAYERED_NAV = 'layered-nav',
  PIXEL_LOADER = 'pixel-loader',
  WAVY_TEXT = 'wavy-text',
  HORIZONTAL_TEXT_REVEAL = 'horizontal-text-reveal',
  PERSPECTIVE_CAROUSEL = 'perspective-carousel',
  CURSOR_COMET = 'cursor-comet',
  WORD_SHUFFLER = 'word-shuffler',
  RAYCAST_COMMAND_MENU = 'raycast-command-menu',
}

export const contentMap = [
  {
    section: 'Base Components',
    items: [
      {
        id: ComponentId.RAYCAST_COMMAND_MENU,
        title: 'Raycast Command Menu',
        description: 'A raycast command menu component.',
        preview: RaycastCommandMenuPreview,
        docsPath: 'raycast-command-menu.mdx',
      },
    ],
  },
  {
    section: 'Seamless Navigations',
    items: [
      {
        id: ComponentId.RAUNO_SIDEBAR,
        title: 'Rauno Sidebar',
        description: 'A sidebar component with sections.',
        preview: RaunoSidebarPreview,
        docsPath: 'rauno-sidebar.mdx',
      },
      {
        id: ComponentId.LAYERED_NAV,
        title: 'Layered Nav',
        description: 'A layered nav component.',
        preview: LayeredNavPreview,
        docsPath: 'layered-nav.mdx',
      },
    ],
  },
  {
    section: 'Unreal Page Entrances',
    items: [
      {
        id: ComponentId.PIXEL_LOADER,
        title: 'Pixel Loader',
        description: 'A pixel loader component.',
        preview: PixelLoaderPreview,
        docsPath: 'pixel-loader.mdx',
      },
      {
        id: ComponentId.WORD_SHUFFLER,
        title: 'Word Shuffler',
        description: 'A word shuffler component.',
        preview: WordShufflerPreview,
        docsPath: 'word-shuffler.mdx',
      },
    ],
  },
  {
    section: 'Hover Like A Pro',
    items: [
      {
        id: ComponentId.WAVY_TEXT,
        title: 'Wavy Text',
        description: 'A wavy text component.',
        preview: WavyTextPreview,
        docsPath: 'wavy-text.mdx',
      },
      {
        id: ComponentId.CURSOR_COMET,
        title: 'Cursor Comet',
        description: 'A cursor comet component.',
        preview: CursorCometPreview,
        docsPath: 'cursor-comet.mdx',
      },
    ],
  },
  {
    section: 'Magic Scrolling',
    items: [
      {
        id: ComponentId.HORIZONTAL_TEXT_REVEAL,
        title: 'Horizontal Text Reveal',
        description: 'A horizontal fade text component.',
        preview: HorizontalTextRevealPreview,
        docsPath: 'horizontal-text-reveal.mdx',
      },
      {
        id: ComponentId.PERSPECTIVE_CAROUSEL,
        title: 'Perspective Carousel',
        description: 'A carousel component with a perspective effect.',
        preview: PerpectiveCarousel,
        docsPath: 'perspective-carousel.mdx',
      },
    ],
  },
]
