import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "ToTheProd UI - Beautiful React Components"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

const OpengraphImage = () => {
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
            fontSize: 96,
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
            fontSize: 40,
            color: "#888",
            margin: 0,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Premium React components with beautiful animations
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
          }}
        >
          {["React", "Next.js", "Tailwind", "Framer Motion"].map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: 24,
                color: "#666",
                backgroundColor: "#222",
                padding: "12px 24px",
                borderRadius: 999,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  )
}

export default OpengraphImage
