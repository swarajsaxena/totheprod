"use client"

import {
  TtpBlurFocusNavigation,
  TtpBlurFocusNavigationItem,
} from "@/components/ui/totheprod-ui/ttp-blur-focus-navigation"

export const TtpBlurFocusNavigationPreview = () => {
  return (
    <div
      className="flex h-full min-h-max w-full flex-col items-center"
      data-preview-padding="false"
    >
      <TtpBlurFocusNavigation>
        {[
          {
            href: "#home",
            id: "home",
            label: "Sanctuary",
            image: "/components/ttp-blur-focus-navigation/01.jpeg",
          },
          {
            href: "#components",
            id: "components",
            label: "Toolkit",
            image: "/components/ttp-blur-focus-navigation/02.jpeg",
          },
          {
            href: "#docs",
            id: "docs",
            label: "Codex",
            image: "/components/ttp-blur-focus-navigation/03.jpeg",
          },
          {
            href: "#about",
            id: "about",
            label: "Odyssey",
            image: "/components/ttp-blur-focus-navigation/04.jpeg",
          },
          {
            href: "#services",
            id: "services",
            label: "Alchemy",
            image: "/components/ttp-blur-focus-navigation/05.jpeg",
          },
          {
            href: "#contact",
            id: "contact",
            label: "Messenger",
            image: "/components/ttp-blur-focus-navigation/06.jpeg",
          },
          {
            href: "#team",
            id: "team",
            label: "Visionaries",
            image: "/components/ttp-blur-focus-navigation/07.jpeg",
          },
          {
            href: "#careers",
            id: "careers",
            label: "Journeys",
            image: "/components/ttp-blur-focus-navigation/08.jpeg",
          },
          {
            href: "#blog",
            id: "blog",
            label: "Chronicles",
            image: "/components/ttp-blur-focus-navigation/09.jpeg",
          },
          {
            href: "#portfolio",
            id: "portfolio",
            label: "Gallery",
            image: "/components/ttp-blur-focus-navigation/10.jpeg",
          },
          {
            href: "#testimonials",
            id: "testimonials",
            label: "Legends",
            image: "/components/ttp-blur-focus-navigation/11.jpeg",
          },
          {
            href: "#press",
            id: "press",
            label: "Spotlight",
            image: "/components/ttp-blur-focus-navigation/12.jpeg",
          },
          {
            href: "#faqs",
            id: "faqs",
            label: "Oracle",
            image: "/components/ttp-blur-focus-navigation/13.jpeg",
          },
          {
            href: "#pricing",
            id: "pricing",
            label: "Treasury",
            image: "/components/ttp-blur-focus-navigation/14.jpeg",
          },
          {
            href: "#features",
            id: "features",
            label: "Innovations",
            image: "/components/ttp-blur-focus-navigation/15.jpeg",
          },
          {
            href: "#privacy",
            id: "privacy",
            label: "Sanctum",
            image: "/components/ttp-blur-focus-navigation/16.jpeg",
          },
          {
            href: "#terms",
            id: "terms",
            label: "Pact",
            image: "/components/ttp-blur-focus-navigation/17.jpeg",
          },
          {
            href: "#events",
            id: "events",
            label: "Symposiums",
            image: "/components/ttp-blur-focus-navigation/18.jpeg",
          },
          {
            href: "#media",
            id: "media",
            label: "Broadcasts",
            image: "/components/ttp-blur-focus-navigation/19.jpeg",
          },
          {
            href: "#subscribe",
            id: "subscribe",
            label: "Enlist",
            image: "/components/ttp-blur-focus-navigation/20.jpeg",
          },
        ].map((item) => (
          <TtpBlurFocusNavigationItem
            className="font-heading"
            href={item.href}
            id={item.id}
            image={item.image}
            key={item.id}
            label={item.label}
          />
        ))}
      </TtpBlurFocusNavigation>
    </div>
  )
}
