import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { atomWithLocation } from "jotai-location"
import type { ComponentMetadata } from "@/lib/component-metadata"

const locationAtom = atomWithLocation()

const currentComponentAtom = atom<ComponentMetadata | undefined>(undefined)

const sidebarStorageKey = "sidebar-open"
const sidebarOpenAtom = atomWithStorage<boolean>(sidebarStorageKey, false)

export { locationAtom, currentComponentAtom, sidebarOpenAtom }
