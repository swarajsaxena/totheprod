'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { contentMap } from './components/[id]/constants'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon, Github01Icon, GithubIcon } from '@hugeicons/core-free-icons'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { cn } from '@/lib/utils'
import { DarkVeil } from '@/components/internal/dark-veil-bg'

export default function Home() {
  return (
    <LenisProvider wrapperId="overflow-container">
      <div
        id="overflow-container"
        className="bg-secondary flex max-h-[calc(100vh-1.5rem)] flex-col items-stretch overflow-scroll rounded-xl pb-40"
      >
        {/* navbar */}

        {/* landing */}
        <div className="relative z-10 flex min-h-[min(calc(80vh),800px)] flex-col items-center gap-1">
          <DarkVeil />
          <div className="relative z-10 mx-auto flex w-full max-w-4xl items-center gap-2 p-4">
            <div className="flex items-center gap-2">
              <motion.img src="/logo-light.svg" alt="Logo" className="h-6 w-6" layoutId="logo" />
              <span className="font-clash text-xl font-semibold tracking-wide">ToTheProd</span>
            </div>
            <div className="font-archivo text-muted-foreground *:hover:text-foreground ml-auto flex items-center gap-4 text-sm *:transition-all">
              <Link href={'/components/' + contentMap[0].items[0].id}>Components</Link>
              <Link href="https://github.com/ToTheProd/ui" target="_blank">
                <HugeiconsIcon icon={GithubIcon} className="size-4" />
              </Link>
            </div>
          </div>
          {/* <div className="font-light">Components Made For</div> */}
          <div className="relative z-10 flex flex-1 flex-col items-stretch justify-center gap-1 text-[1vw]">
            <div className="text-muted-foreground text-left text-3xl">Components that</div>
            <h1 className="font-clash text-foreground -my-[4%] text-[5vw] capitalize italic">
              <span className="">Ship ToTheProd</span>
            </h1>
            <div className="text-muted-foreground text-right text-3xl">and not just look good.</div>
          </div>
        </div>
        {/* components */}
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          {contentMap.map((item) => (
            <div key={item.section} className="flex flex-col gap-4">
              <Link
                href={`/components/?type=${item.section}`}
                className="font-clash hover:text-primary flex w-max items-center gap-0.5 italic transition-all hover:gap-1"
              >
                {item.section} <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </Link>
              <div className="grid grid-cols-3 gap-2">
                {item.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/components/${item.id}`}
                    className="group flex flex-col gap-2"
                  >
                    <div className="group-hover:border-primary/20 rounded-2xl border border-dashed p-1 transition-all">
                      <div className="relative aspect-[1.54/1] overflow-hidden rounded-xl">
                        <video
                          src={`/component-videos/${item.id}.mov`}
                          autoPlay
                          muted
                          loop
                          controls={false}
                          className="h-full w-full object-cover"
                        />
                        <div className="bg-muted/95 text-muted-foreground group-hover:text-primary absolute inset-0 flex items-center justify-center font-medium transition-all group-hover:opacity-0">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="text-muted-foreground grid w-full place-content-center rounded-2xl border border-dashed text-sm font-medium">
                  New Components Coming Soon...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LenisProvider>
  )
}
