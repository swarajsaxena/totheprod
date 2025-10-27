import { contentMap } from './constants'

const ComponentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const component = contentMap
    .find((item) => item.items.some((item) => item.id === id))
    ?.items.find((item) => item.id === id) ?? {
    preview: <div>Component not found</div>,
    title: '404 - Not Found',
    description: 'The component you are looking for does not exist.',
  }

  return (
    <div className="flex flex-col gap-4">
      {/* <h1 className="">{component.title}</h1> */}
      {component.preview}
    </div>
  )
}

export default ComponentPage
