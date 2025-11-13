import { Copy01Icon, Tick01Icon } from "@hugeicons/core-free-icons"
import { useState } from "react"
import { WavyButton } from "../ui/totheprod-ui/wavy-button/wavy-button"

const CtaCopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)
  return (
    <WavyButton
      className="flex-1"
      icon={copied ? Tick01Icon : Copy01Icon}
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      text={text}
      textClassName="text-xs"
    />
  )
}

export default CtaCopyButton
