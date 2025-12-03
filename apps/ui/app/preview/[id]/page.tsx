import { contentMap } from "@/app/components/[id]/constants"
import type { ComponentData } from "@/app/components/[id]/page"

const NotFoundComponent = () => <div>Component not found</div>

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const component: ComponentData = contentMap
    .find((item) => item.items.some((item) => item.id === id))
    ?.items.find((item) => item.id === id) ?? {
    preview: NotFoundComponent,
    title: "404 - Not Found",
    description: "The component you are looking for does not exist.",
    id,
  }
  const PreviewComponent = component.preview
  return (
    <div
      className="relative flex h-full min-h-screen flex-col items-center overflow-auto bg-secondary *:flex-1"
      id="preview-scroll-container"
    >
      {PreviewComponent ? <PreviewComponent /> : null}
    </div>
  )
}

export default page
