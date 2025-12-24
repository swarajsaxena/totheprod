import { WordShuffler } from "@/components/ui/totheprod-ui/ttp-word-shuffler"

export const TtpWordShufflerPreview = () => {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center"
      data-preview-padding="false"
    >
      <span className="font-heading font-semibold text-5xl tracking-tight">
        Your Epic Shit
      </span>
      <WordShuffler textClassName="font-heading" />
    </div>
  )
}
