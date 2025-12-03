import { ImageResponse } from "next/og"
import { getComponentById } from "@/lib/component-metadata"

export const runtime = "edge"

export const alt = "ToTheProd UI Component"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

const ComponentOpengraphImage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const component = getComponentById(id)

  if (!component) {
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
        }}
      >
        <p style={{ fontSize: 48, color: "#fff" }}>Component not found</p>
      </div>,
      {
        ...size,
      }
    )
  }

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#000",
        background:
          "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
        backgroundSize: "100px 100px",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "#888",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            ToTheProd UI
          </span>
          <span
            style={{
              fontSize: 24,
              color: "#444",
            }}
          >
            /
          </span>
          <span
            style={{
              fontSize: 24,
              color: "#666",
              textTransform: "capitalize",
            }}
          >
            {component.category}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 900,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#fff",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {component.title}
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "#888",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {component.description}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {component.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 20,
              color: "#666",
              backgroundColor: "#222",
              padding: "8px 16px",
              borderRadius: 999,
              textTransform: "lowercase",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>,
    {
      ...size,
    }
  )
}

export default ComponentOpengraphImage
