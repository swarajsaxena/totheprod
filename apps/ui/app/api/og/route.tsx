import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { getComponentById } from "@/lib/component-metadata"

export const runtime = "edge"

export const GET = (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const componentId = searchParams.get("id")

    if (!componentId) {
      return new ImageResponse(
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            background:
              "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <h1
              style={{
                fontSize: 80,
                fontWeight: "bold",
                background: "linear-gradient(90deg, #fff 0%, #888 100%)",
                backgroundClip: "text",
                color: "transparent",
                margin: 0,
              }}
            >
              ToTheProd UI
            </h1>
            <p
              style={{
                fontSize: 32,
                color: "#888",
                margin: 0,
              }}
            >
              Beautiful React Components
            </p>
          </div>
        </div>,
        {
          width: 1200,
          height: 630,
        }
      )
    }

    const component = getComponentById(componentId)

    if (!component) {
      return new Response("Component not found", { status: 404 })
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
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error("Error generating OG image:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
