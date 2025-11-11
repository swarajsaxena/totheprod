import React, { useState } from "react"
import { WavyButton } from "../ui/totheprod-ui/wavy-button/wavy-button"
import { Copy01Icon, Tick01Icon } from "@hugeicons/core-free-icons"

const CtaCopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)
  return (
    <WavyButton
      className="flex-1"
      textClassName="text-xs"
      text={text}
      icon={copied ? Tick01Icon : Copy01Icon}
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
    />
  )
}

export default CtaCopyButton
