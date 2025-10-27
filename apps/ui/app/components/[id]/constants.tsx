import { HorizontalFadeInPreview } from './_preview-components/horizontal-fade-in'
import { RaunoSidebarPreview } from './_preview-components/rauno-sidebar'
import { WavyTextPreview } from './_preview-components/wavy-text'

export enum ComponentId {
  RAUNO_SIDEBAR = 'rauno-sidebar',
  WAVY_TEXT = 'wavy-text',
  HORIZONTAL_FADE_IN = 'horizontal-fade-in',
}

export const contentMap = [
  {
    section: 'Cool Sidebar',
    items: [
      {
        id: ComponentId.RAUNO_SIDEBAR,
        title: 'Rauno Sidebar',
        description: 'A sidebar component with sections.',
        preview: <RaunoSidebarPreview />,
      },
    ],
  },
  {
    section: 'Text Animations',
    items: [
      {
        id: ComponentId.WAVY_TEXT,
        title: 'Wavy Text',
        description: 'A wavy text component.',
        preview: <WavyTextPreview />,
      },
      {
        id: ComponentId.HORIZONTAL_FADE_IN,
        title: 'Horizontal Fade In',
        description: 'A horizontal fade text component.',
        preview: <HorizontalFadeInPreview />,
      },
    ],
  },
]
