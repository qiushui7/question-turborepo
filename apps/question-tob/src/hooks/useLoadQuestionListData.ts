import {useSearchParams} from "react-router-dom"
import {useRequest} from "ahooks"
import {getQuestionListService} from "../services/question"
import {LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY} from "../constant"

type OptionType = {
    isStar: boolean
    isDeleted: boolean
}

export const useLoadQuestionListData = (option: Partial<OptionType> = {}) => {
    const { isStar, isDeleted = false } = option
    const [searchParams] = useSearchParams()
    const {
        data = {},
        loading,
        error,
        refresh
    } = useRequest(
        async () => {
            const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
            const page =
                parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1
            const pageSize =
                parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
                LIST_PAGE_SIZE

            return await getQuestionListService({
                keyword,
                isStar,
                isDeleted,
                page,
                pageSize
            })
        },
        {
            refreshDeps: [searchParams]
        }
    )
    console.log(data)
    return { data, loading, error, refresh }
}
