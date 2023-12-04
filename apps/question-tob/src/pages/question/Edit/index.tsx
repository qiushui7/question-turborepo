import React, {FC} from "react"
import useLoadQuestionData from "../../../hooks/useLoadQuestionData"
import styles from "./index.module.scss"
import EditCanvas from "./EditCanvas"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import EditHeader from "./EditHeader"
import {useComponentStore} from "../../../store/componentStore"
import {useTitle} from "ahooks"
import useGetPageInfo from "../../../hooks/useGetPageInfo"

const Edit: FC = (props: Props) => {
    const { loading, error } = useLoadQuestionData()
    const { title } = useGetPageInfo()
    useTitle(`问卷编辑 - ${title}`)
    const changeSelectedId = useComponentStore(
        (state) => state.changeSelectedId
    )
    const clearSelectedId = () => {
        changeSelectedId("")
    }
    return (
        <div className={styles.container}>
            <div style={{ backgroundColor: "#fff", height: "40px" }}>
                <EditHeader />
            </div>
            <div className={styles["container-wrapper"]}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel />
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles["canvas-wrapper"]}>
                            <div style={{ height: "900px" }}>
                                <EditCanvas loading={loading} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </div>
    )
}

type Props = {}

export default Edit
