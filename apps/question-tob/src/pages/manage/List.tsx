import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import styles from "./common.module.scss"
import QuestionCard from "../../components/QuestionCard"
import { useSearchParams } from "react-router-dom"
import { useDebounceFn, useRequest, useTitle } from "ahooks"
import { Empty, Spin, Typography } from "antd"
import ListSearch from "../../components/ListSearch"
import { getQuestionListService } from "../../services/question"
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant"

const { Title } = Typography

type Props = {}

const List: FC = (props: Props) => {
    useTitle("小涛问卷 - 我的问卷")
    const [searchParams] = useSearchParams()
    const [started, setStarted] = useState(false)
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const containerRef = useRef<HTMLDivElement>(null)
    const haveMoreData = total > list.length
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
    useEffect(() => {
        setList([])
        setPage(1)
        setTotal(0)
        setStarted(false)
    }, [keyword])
    useEffect(() => {
        tryLoadMore()
    }, [searchParams])
    useEffect(() => {
        if (haveMoreData) {
            window.addEventListener("scroll", tryLoadMore)
        }
        return () => {
            window.removeEventListener("scroll", tryLoadMore)
        }
    }, [searchParams, haveMoreData])
    const { run: tryLoadMore } = useDebounceFn(
        () => {
            const elem = containerRef.current
            if (elem === null) return
            const domRect = elem.getBoundingClientRect()
            if (domRect === null) return
            const { bottom } = domRect
            if (bottom <= document.body.clientHeight) {
                load()
                setStarted(true)
            }
        },
        {
            wait: 1000
        }
    )
    const { run: load, loading } = useRequest(
        async () => {
            return await getQuestionListService({
                page,
                pageSize: LIST_PAGE_SIZE,
                keyword
            })
        },
        {
            manual: true,
            onSuccess(result) {
                const { list: L = [], total = 0 } = result
                console.log(L)
                setList(list.concat(L))
                setTotal(total)
                setPage(page + 1)
            }
        }
    )
    const LoadMoreContentElem = useMemo(() => {
        if (!started || loading) return <Spin />
        if (total === 0) return <Empty description={"暂无数据"} />
        if (!haveMoreData) return <span>没有更多了。。。</span>
        return <span>开始加载下一页</span>
    }, [started, loading, haveMoreData])
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>我的问卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                {list.length > 0 &&
                    list.map((q: any) => {
                        const { _id } = q
                        return <QuestionCard key={_id} {...q} />
                    })}
            </div>
            <div className={styles.footer}>
                <div ref={containerRef}>{LoadMoreContentElem}</div>
            </div>
        </>
    )
}

export default List
