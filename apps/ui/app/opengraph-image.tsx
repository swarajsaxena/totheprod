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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <svg
            aria-label="ToTheProd UI"
            fill="none"
            height="120"
            role="img"
            viewBox="0 0 217 217"
            width="120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M29 111.987V42.2122C29 33.5745 33.2764 25.4933 40.4283 20.6158L63.9541 4.57143C71.0457 -0.264963 80.0629 -1.33608 88.0961 1.70369L171.065 33.0989C181.259 36.9565 188 46.6939 188 57.563V88.8995C188 97.6299 183.632 105.785 176.354 110.643L109.022 155.582V174.276C109.022 182.834 104.824 190.851 97.7802 195.744L73.9488 212.3C67.1226 217.042 58.4452 218.278 50.5596 215.632L46.8749 214.395C36.1937 210.81 29 200.829 29 189.595V111.987ZM53.0071 34.1298L139.792 66.2506C143.066 67.4622 145.238 70.5754 145.238 74.056V111.572C145.238 114.369 143.829 116.979 141.487 118.52L69.4671 165.92C67.1255 167.461 65.7166 170.071 65.7166 172.868V194.789C65.7166 200.571 59.9483 204.593 54.4988 202.61L47.2348 199.967C43.9389 198.767 41.7462 195.643 41.7462 192.145V41.9351C41.7462 36.1332 47.5504 32.1101 53.0071 34.1298Z"
              fill="#00DF81"
              fillRule="evenodd"
            />
          </svg>
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
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
          }}
        >
          {["ShadCN", "Framer Motion"].map((tech) => (
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
