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
        className="flex flex-col items-stretch bg-secondary rounded-xl max-h-[calc(100vh-1.5rem)] overflow-scroll pb-40"
      >
        {/* navbar */}

        {/* landing */}
        <div className="flex items-center flex-col gap-1 relative min-h-[min(calc(80vh),800px)] z-10">
          <DarkVeil />
          <div className="p-4 w-full max-w-4xl mx-auto relative z-10 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.img src="/logo-light.svg" alt="Logo" className="w-6 h-6" layoutId="logo" />
              <span className="font-semibold text-xl font-clash tracking-wide">ToTheProd</span>
            </div>
            <div className="ml-auto flex items-center gap-4 font-archivo text-sm text-muted-foreground *:hover:text-foreground *:transition-all">
              <Link href={'/components/' + contentMap[0].items[0].id}>Components</Link>
              <Link href="https://github.com/ToTheProd/ui" target="_blank">
                <HugeiconsIcon icon={GithubIcon} className="size-4" />
              </Link>
            </div>
          </div>
          {/* <div className="font-light">Components Made For</div> */}
          <div className="flex flex-col text-[1vw] items-stretch justify-center gap-1 relative z-10 flex-1">
            <div className="text-left text-muted-foreground text-3xl">Components that</div>
            <h1 className="text-[5vw] italic capitalize font-clash -my-[4%] text-foreground">
              <span className="">Ship ToTheProd</span>
            </h1>
            <div className="text-right text-muted-foreground text-3xl">and not just look good.</div>
          </div>
        </div>
        {/* components */}
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          {contentMap.map((item) => (
            <div key={item.section} className="flex flex-col gap-4">
              <Link
                href={`/components/?type=${item.section}`}
                className="font-clash flex items-center gap-0.5 hover:text-primary transition-all hover:gap-1 italic w-max"
              >
                {item.section} <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </Link>
              <div className="grid grid-cols-3 gap-2">
                {item.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/components/${item.id}`}
                    className="flex flex-col gap-2 group"
                  >
                    <div className="border border-dashed rounded-2xl p-1 group-hover:border-primary/20 transition-all">
                      <div className="aspect-[1.54/1] rounded-xl overflow-hidden relative">
                        <video
                          src={`/component-videos/${item.id}.mov`}
                          autoPlay
                          muted
                          loop
                          controls={false}
                          className="w-full h-full object-cover"
                        />
                        <div className="font-medium bg-muted/95 text-muted-foreground group-hover:text-primary transition-all absolute inset-0 flex items-center justify-center group-hover:opacity-0 ">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="w-full border border-dashed rounded-2xl grid place-content-center text-muted-foreground text-sm font-medium">
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
