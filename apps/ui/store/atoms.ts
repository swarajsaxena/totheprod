import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import type { ComponentMetadata } from "@/lib/component-metadata"

const detailsOpenAtom = atom<boolean>(false)

const currentComponentAtom = atom<ComponentMetadata | undefined>(undefined)

const sidebarStorageKey = "sidebar-open"
const sidebarOpenAtom = atomWithStorage<boolean>(sidebarStorageKey, false)

export { detailsOpenAtom, currentComponentAtom, sidebarOpenAtom }
