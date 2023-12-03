import React, { FC } from "react"
import { useTitle } from "ahooks"
import styles from "./common.module.scss"
import { Empty, Spin, Typography } from "antd"
import QuestionCard from "../../components/QuestionCard"
import ListSearch from "../../components/ListSearch"
import { useLoadQuestionListData } from "../../hooks/useLoadQuestionListData"
import ListPage from "../../components/ListPage"

const { Title } = Typography

type Props = {}

const Star: FC = (props: Props) => {
    useTitle("小涛问卷 - 我的问卷")
    const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
    const { list = [], total = 0 } = data
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                {loading && (
                    <div style={{ textAlign: "center" }}>
                        <Spin />
                    </div>
                )}
                {!loading && list.length === 0 && (
                    <Empty description={"暂无数据"} />
                )}
                {!loading &&
                    list.length > 0 &&
                    list.map((q: any) => {
                        const { _id } = q
                        return <QuestionCard key={_id} {...q} />
                    })}
            </div>
            <div className={styles.footer}>
                <ListPage total={total} />
            </div>
        </>
    )
}

export default Star
