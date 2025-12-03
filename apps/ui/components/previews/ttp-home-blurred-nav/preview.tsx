"use client"

import CornerPlusContainer from "@/components/internal/corner-plus-container"
import PreviewHeading from "@/components/internal/preview-heading"
import {
  TtpHomeBlurredNav,
  TtpHomeBlurredNavItem,
} from "@/components/ui/totheprod-ui/ttp-home-blurred-nav"

export const TtpHomeBlurredNavPreview = () => {
  return (
    <div
      className="flex h-full min-h-max w-full flex-col items-center"
      data-preview-padding="false"
    >
      <CornerPlusContainer className="mt-4">
        <PreviewHeading
          className="m-0 p-4"
          description="A beautiful navigation bar with blurred background effect, perfect for home pages."
          title="Home Blurred Nav"
        />
      </CornerPlusContainer>
      <TtpHomeBlurredNav>
        {[
          {
            href: "#home",
            id: "home",
            label: "Sanctuary",
            image: "/components/ttp-home-blurred-nav/01.jpeg",
          },
          {
            href: "#components",
            id: "components",
            label: "Toolkit",
            image: "/components/ttp-home-blurred-nav/02.jpeg",
          },
          {
            href: "#docs",
            id: "docs",
            label: "Codex",
            image: "/components/ttp-home-blurred-nav/03.jpeg",
          },
          {
            href: "#about",
            id: "about",
            label: "Odyssey",
            image: "/components/ttp-home-blurred-nav/04.jpeg",
          },
          {
            href: "#services",
            id: "services",
            label: "Alchemy",
            image: "/components/ttp-home-blurred-nav/05.jpeg",
          },
          {
            href: "#contact",
            id: "contact",
            label: "Messenger",
            image: "/components/ttp-home-blurred-nav/06.jpeg",
          },
          {
            href: "#team",
            id: "team",
            label: "Visionaries",
            image: "/components/ttp-home-blurred-nav/07.jpeg",
          },
          {
            href: "#careers",
            id: "careers",
            label: "Journeys",
            image: "/components/ttp-home-blurred-nav/08.jpeg",
          },
          {
            href: "#blog",
            id: "blog",
            label: "Chronicles",
            image: "/components/ttp-home-blurred-nav/09.jpeg",
          },
          {
            href: "#portfolio",
            id: "portfolio",
            label: "Gallery",
            image: "/components/ttp-home-blurred-nav/10.jpeg",
          },
          {
            href: "#testimonials",
            id: "testimonials",
            label: "Legends",
            image: "/components/ttp-home-blurred-nav/11.jpeg",
          },
          {
            href: "#press",
            id: "press",
            label: "Spotlight",
            image: "/components/ttp-home-blurred-nav/12.jpeg",
          },
          {
            href: "#faqs",
            id: "faqs",
            label: "Oracle",
            image: "/components/ttp-home-blurred-nav/13.jpeg",
          },
          {
            href: "#pricing",
            id: "pricing",
            label: "Treasury",
            image: "/components/ttp-home-blurred-nav/14.jpeg",
          },
          {
            href: "#features",
            id: "features",
            label: "Innovations",
            image: "/components/ttp-home-blurred-nav/15.jpeg",
          },
          {
            href: "#privacy",
            id: "privacy",
            label: "Sanctum",
            image: "/components/ttp-home-blurred-nav/16.jpeg",
          },
          {
            href: "#terms",
            id: "terms",
            label: "Pact",
            image: "/components/ttp-home-blurred-nav/17.jpeg",
          },
          {
            href: "#events",
            id: "events",
            label: "Symposiums",
            image: "/components/ttp-home-blurred-nav/18.jpeg",
          },
          {
            href: "#media",
            id: "media",
            label: "Broadcasts",
            image: "/components/ttp-home-blurred-nav/19.jpeg",
          },
          {
            href: "#subscribe",
            id: "subscribe",
            label: "Enlist",
            image: "/components/ttp-home-blurred-nav/20.jpeg",
          },
        ].map((item) => (
          <TtpHomeBlurredNavItem
            className="font-heading"
            href={item.href}
            id={item.id}
            image={item.image}
            key={item.id}
            label={item.label}
          />
        ))}
      </TtpHomeBlurredNav>
    </div>
  )
}
