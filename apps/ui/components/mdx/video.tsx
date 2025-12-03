"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const MP4_TO_WEBM_REGEX = /\.mp4$/

type VideoProps = {
  src: string
  caption?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
}

export const Video = ({
  src,
  caption,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
}: VideoProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <figure className={cn("my-6", className)}>
      <div className="relative overflow-hidden rounded-lg border bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}
        <video
          autoPlay={autoPlay}
          className="w-full"
          controls={controls}
          loop={loop}
          muted={muted}
          onLoadedData={() => setIsLoading(false)}
          playsInline
        >
          <source src={src} type="video/mp4" />
          <source
            src={src.replace(MP4_TO_WEBM_REGEX, ".webm")}
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-muted-foreground text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
