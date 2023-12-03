import { create } from "zustand"

export type PageInfoType = {
    title: string
    desc?: string
    js?: string
    css?: string
    isPublished?: boolean
}

export type PageInfoAction = {
    resetPage: (payload: PageInfoType) => void
    changePageTitle: (title: string) => void
}

export const usePageInfoStore = create<PageInfoType & PageInfoAction>(
    (set) => ({
        title: "",
        desc: "",
        js: "",
        css: "",
        resetPage: (payload) => {
            set(() => payload)
        },
        changePageTitle: (title) => {
            return set(() => ({
                title
            }))
        }
    })
)
