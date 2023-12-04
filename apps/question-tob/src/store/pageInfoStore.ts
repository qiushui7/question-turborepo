import {create} from "zustand"

export type PageInfoStateType = {
    title: string
    desc?: string
    js?: string
    css?: string
    isPublished?: boolean
}

export type PageInfoStateAction = {
    resetPage: (payload: PageInfoStateType) => void
    changePageTitle: (title: string) => void
}

export const usePageInfoStore = create<PageInfoStateType & PageInfoStateAction>(
    (set) => ({
        title: "",
        desc: "",
        js: "",
        css: "",
        resetPage: (payload) => {
            set(() => payload)
        },
        changePageTitle: (title) => {
            set(() => ({
                title
            }))
        }
    })
)
