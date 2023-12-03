import { usePageInfoStore } from "../store/pageInfoStore"

function useGetPageInfo() {
    return usePageInfoStore()
}

export default useGetPageInfo
