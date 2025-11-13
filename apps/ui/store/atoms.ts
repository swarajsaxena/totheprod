import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const detailsOpenAtom = atom<boolean>(false)

const currentComponentMdxAtom = atom<string | undefined>(undefined)

const sidebarStorageKey = "sidebar-open"
const sidebarOpenAtom = atomWithStorage<boolean>(sidebarStorageKey, false)

export { detailsOpenAtom, currentComponentMdxAtom, sidebarOpenAtom }
