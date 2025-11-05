import { atom } from 'jotai'

const detailsOpenAtom = atom<boolean>(false)

const currentComponentMdxAtom = atom<string | undefined>(undefined)

export { detailsOpenAtom, currentComponentMdxAtom }
