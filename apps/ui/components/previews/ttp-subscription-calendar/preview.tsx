import {
  type TSubscription,
  TtpSubscriptionCalendar,
} from "@/components/ui/totheprod-ui/ttp-subscription-calendar"

const subscriptions: TSubscription[] = [
  {
    id: "sub1",
    name: "Netflix Standard",
    price: 9.99,
    interval: "monthly",
    status: "active",
    date: new Date("2025-12-01"),
    imageUrl:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
  },
  {
    id: "sub2",
    name: "Spotify Premium",
    price: 11.99,
    interval: "yearly",
    status: "active",
    date: new Date("2025-12-01"),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDiicpDsawpNveT7Ota2-EC_vZbP8vneTbg&s",
  },
  {
    id: "sub3",
    name: "Amazon Prime Video",
    price: 14.99,
    interval: "monthly",
    status: "inactive",
    date: new Date("2025-12-01"),
    imageUrl:
      "https://i.pinimg.com/736x/5c/27/08/5c270885ac43345c20f747bfbd856348.jpg",
  },
  {
    id: "sub4",
    name: "YouTube Premium",
    price: 12.99,
    interval: "yearly",
    status: "active",
    date: new Date("2025-12-10"),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJgHrMrFe9X14QwBaKC5b38huF8k_obaJ_lw&s",
  },
  {
    id: "sub5",
    name: "Disney+",
    price: 7.99,
    interval: "monthly",
    status: "active",
    date: new Date("2025-11-20"),
    imageUrl:
      "https://cdn.dribbble.com/userupload/26649642/file/still-c7ab4c8c5f565631f3b349abab561838.png",
  },
  {
    id: "sub6",
    name: "Apple Music",
    price: 10.99,
    interval: "yearly",
    status: "inactive",
    date: new Date("2025-07-28"),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ77p-Z0Y-N378L7jv8ALOoVipWtF7DtrNeIg&s",
  },
  {
    id: "sub7",
    name: "Hulu",
    price: 7.99,
    interval: "monthly",
    status: "active",
    date: new Date("2025-11-05"),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfRFlN25iawys2wx7zchOF6p6B9gJSKpcgag&s",
  },
  {
    id: "sub8",
    name: "HBO Max",
    price: 14.99,
    interval: "yearly",
    status: "inactive",
    date: new Date("2025-06-30"),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdpHnejgWkM2HZ8U545Zzc89doOzPs_j8tvQ&s",
  },
  {
    id: "sub9",
    name: "Gaana Plus",
    price: 99,
    interval: "monthly",
    status: "active",
    date: new Date("2025-12-06"),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrXS_0NRmOh6spIR317jiMfJ5h4hyltmgakg&s",
  },
  {
    id: "sub10",
    name: "Sun NXT",
    price: 299,
    interval: "monthly",
    status: "active",
    date: new Date("2025-08-19"),
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzwDA_UXgCFs8gH6l46AMEatKv3a8PDL_usg&s",
  },
]

export const TtpSubscriptionCalendarPreview = () => {
  return (
    <div className="grid h-full w-full place-content-center">
      <TtpSubscriptionCalendar currency="$" subscriptions={subscriptions} />
    </div>
  )
}
