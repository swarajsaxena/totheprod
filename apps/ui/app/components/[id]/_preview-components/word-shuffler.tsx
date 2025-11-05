import PreviewHeading from '@/components/internal/PreviewHeading'
import { WordShuffler } from '@/components/ui/totheprod-ui/word-shuffler/word-shuffler'

export const WordShufflerPreview = () => {
  return (
    <div className="no-padding h-full w-full flex flex-col items-center justify-center">
      <PreviewHeading variant="light" title="Word Shuffler" />
      <span className="text-5xl font-semibold font-clash tracking-tight">Your Epic Shit</span>
      <WordShuffler textClassName="font-clash" />
    </div>
  )
}
