"use client"

import CornerPlusContainer from "@/components/internal/corner-plus-container"
import PreviewHeading from "@/components/internal/preview-heading"
import {
  LandoNorrisTable,
  LandoNorrisTableBody,
  LandoNorrisTableCell,
  LandoNorrisTableHead,
  LandoNorrisTableHeader,
  LandoNorrisTableRow,
} from "@/components/ui/totheprod-ui/ttp-lando-norris-table"
import { cn } from "@/lib/utils"

type RaceEvent = {
  eventNumber: string
  location: string
  flag: string
  date: string
  result: string
  time: string
  isFirst: boolean
  image: string
}

const raceEvents: RaceEvent[] = [
  {
    eventNumber: "04",
    location: "BAHRAIN",
    flag: "🇧🇭",
    date: "13 APR 25",
    result: "3RD",
    time: "1:35.728 s",
    isFirst: false,
    image: "/components/ttp-lando-norris-table/1.jpeg",
  },
  {
    eventNumber: "05",
    location: "SAUDI ARABIA",
    flag: "🇸🇦",
    date: "20 APR 25",
    result: "4TH",
    time: "1:31.778 s",
    isFirst: false,
    image: "/components/ttp-lando-norris-table/2.jpeg",
  },
  {
    eventNumber: "06",
    location: "MIAMI",
    flag: "🇺🇸",
    date: "4 MAY 25",
    result: "2ND",
    time: "1:29.746 s",
    isFirst: false,
    image: "/components/ttp-lando-norris-table/3.jpeg",
  },
  {
    eventNumber: "07",
    location: "EMILIA ROMAGNA",
    flag: "🇮🇹",
    date: "18 MAY 25",
    result: "2ND",
    time: "1:18.311 s",
    isFirst: false,
    image: "/components/ttp-lando-norris-table/4.jpeg",
  },
  {
    eventNumber: "08",
    location: "MONACO",
    flag: "🇲🇨",
    date: "25 MAY 25",
    result: "1ST",
    time: "1:13.221 s",
    isFirst: true,
    image: "/components/ttp-lando-norris-table/5.jpeg",
  },
  {
    eventNumber: "09",
    location: "SPAIN",
    flag: "🇪🇸",
    date: "1 JUN 25",
    result: "2ND",
    time: "1:16.187 s",
    isFirst: false,
    image: "/components/ttp-lando-norris-table/6.jpeg",
  },
  {
    eventNumber: "10",
    location: "CANADA",
    flag: "🇨🇦",
    date: "15 JUN 25",
    result: "DNF",
    time: "1:14.229 s",
    isFirst: false,
    image: "/components/ttp-lando-norris-table/7.jpeg",
  },
  {
    eventNumber: "11",
    location: "AUSTRIA",
    flag: "🇦🇹",
    date: "29 JUN 25",
    result: "1ST",
    time: "1:08.272 s",
    isFirst: true,
    image: "/components/ttp-lando-norris-table/8.jpeg",
  },
  {
    eventNumber: "12",
    location: "UNITED KINGDOM",
    flag: "🇬🇧",
    date: "6 JUL 25",
    result: "1ST",
    time: "1:29.734 s",
    isFirst: true,
    image: "/components/ttp-lando-norris-table/10.jpeg",
  },
  {
    eventNumber: "13",
    location: "BELGIUM",
    flag: "🇧🇪",
    date: "27 JUL 25",
    result: "2ND",
    time: "1:45.257 s",
    isFirst: false,
    image: "/components/ttp-lando-norris-table/9.jpeg",
  },
]

export const TtpLandoNorrisTablePreview = () => {
  const handleRowClick = (event: RaceEvent) => {
    // eslint-disable-next-line no-console
    console.log(`Clicked on ${event.location}`)
  }

  return (
    <div
      className="flex h-full min-h-max w-full flex-col items-center"
      data-preview-padding="false"
    >
      <CornerPlusContainer className="mt-4">
        <PreviewHeading
          className="m-0 p-4"
          description="A beautiful table component with hover effects and clickable rows."
          title="Lando Norris Table"
        />
      </CornerPlusContainer>
      <div className="flex w-full flex-1 items-center justify-center py-4">
        <LandoNorrisTable>
          <LandoNorrisTableHeader>
            <LandoNorrisTableRow>
              <LandoNorrisTableHead className="pl-8">
                Event
              </LandoNorrisTableHead>
              <LandoNorrisTableHead>Location</LandoNorrisTableHead>
              <LandoNorrisTableHead>Date</LandoNorrisTableHead>
              <LandoNorrisTableHead>Result</LandoNorrisTableHead>
              <LandoNorrisTableHead className="pr-8">Time</LandoNorrisTableHead>
            </LandoNorrisTableRow>
          </LandoNorrisTableHeader>
          <LandoNorrisTableBody>
            {raceEvents.map((event) => (
              <LandoNorrisTableRow
                imageUrl={event.image}
                key={event.eventNumber}
                onClick={() => handleRowClick(event)}
              >
                <LandoNorrisTableCell className="pl-8">
                  <span className="line-through decoration-yellow-500">
                    {event.eventNumber}
                  </span>
                </LandoNorrisTableCell>
                <LandoNorrisTableCell className="-tracking-widest font-black font-heading">
                  <div className="flex items-center gap-2">
                    <span>{event.location}</span>
                    <span className="mb-auto text-lg">{event.flag}</span>
                  </div>
                </LandoNorrisTableCell>
                <LandoNorrisTableCell>{event.date}</LandoNorrisTableCell>
                <LandoNorrisTableCell>
                  <span
                    className={cn(
                      event.isFirst && "font-medium text-yellow-500",
                      event.result === "DNF" && "text-muted-foreground"
                    )}
                  >
                    {event.result}
                  </span>
                </LandoNorrisTableCell>
                <LandoNorrisTableCell className="pr-8">
                  {event.time}
                </LandoNorrisTableCell>
              </LandoNorrisTableRow>
            ))}
          </LandoNorrisTableBody>
        </LandoNorrisTable>
      </div>
    </div>
  )
}
