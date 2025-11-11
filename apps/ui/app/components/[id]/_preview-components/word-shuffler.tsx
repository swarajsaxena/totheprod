import PreviewHeading from "@/components/internal/PreviewHeading"
import { WordShuffler } from "@/components/ui/totheprod-ui/word-shuffler/word-shuffler"

export const WordShufflerPreview = () => {
  return (
    <div className="no-padding flex h-full w-full flex-col items-center justify-center">
      <PreviewHeading title="Word Shuffler" />
      <span className="font-heading font-semibold text-5xl tracking-tight">
        Your Epic Shit
      </span>
      <WordShuffler textClassName="font-heading" />
    </div>
  )
}
