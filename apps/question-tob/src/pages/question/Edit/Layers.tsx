import React, {ChangeEvent, FC, useState} from "react"
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo"
import {Button, Input, message, Space} from "antd"
import styles from "./Layers.module.scss"
import classNames from "classnames"
import {EyeInvisibleOutlined, LockOutlined} from "@ant-design/icons"
import SortableContainer from "../../../components/DragSortable/SortableContainer"
import SortableItem from "../../../components/DragSortable/SortableItem"
import {useComponentStore} from "../../../store/componentStore"

const Layers: FC<Props> = (props) => {
    const { componentList, selectedId } = useGetComponentsInfo()
    const {
        changeSelectedId,
        changeComponentTitle,
        changeComponentHidden,
        toggleComponentLocked,
        moveComponent
    } = useComponentStore((state) => ({
        changeSelectedId: state.changeSelectedId,
        changeComponentTitle: state.changeComponentTitle,
        changeComponentHidden: state.changeComponentHidden,
        toggleComponentLocked: state.toggleComponentLocked,
        moveComponent: state.moveComponent
    }))

    const [changingTitleId, setChangingTitleId] = useState("")

    function handleTitleClick(fe_id: string) {
        const curComp = componentList.find((c) => c.fe_id === fe_id)
        if (curComp && curComp.isHidden) {
            message.info("不能选中隐藏的组件")
            return
        }
        if (fe_id !== selectedId) {
            // 当前组件未被选中，执行选中
            changeSelectedId(fe_id)
            setChangingTitleId("")
            return
        }

        // 点击修改标题
        setChangingTitleId(fe_id)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value.trim()
        if (!newTitle) return
        if (!selectedId) return
        changeComponentTitle({ fe_id: selectedId, title: newTitle })
    }

    const changeHidden = (fe_id: string, isHidden: boolean) => {
        changeComponentHidden({ fe_id, isHidden })
    }

    const changeLocked = (fe_id: string) => {
        toggleComponentLocked({ fe_id })
    }

    const handleDragEnd = (oldIndex: number, newIndex: number) => {
        moveComponent({ newIndex, oldIndex })
    }

    const componentListWithId = componentList.map((c) => {
        return {
            ...c,
            id: c.fe_id
        }
    })

    return (
        <SortableContainer
            items={componentListWithId}
            onDragEnd={handleDragEnd}
        >
            {componentList.map((c) => {
                const { fe_id, title, isHidden, isLocked } = c
                const titleDefaultClassName = styles.title
                const selectedClassName = styles.selected
                const titleClassName = classNames({
                    [titleDefaultClassName]: true,
                    [selectedClassName]: fe_id === selectedId
                })

                return (
                    <SortableItem key={fe_id} id={fe_id}>
                        <div className={styles.wrapper}>
                            <div
                                className={titleClassName}
                                onClick={() => handleTitleClick(fe_id)}
                            >
                                {fe_id === changingTitleId && (
                                    <Input
                                        value={title}
                                        onChange={changeTitle}
                                        onPressEnter={() =>
                                            setChangingTitleId("")
                                        }
                                        onBlur={() => setChangingTitleId("")}
                                    />
                                )}
                                {fe_id !== changingTitleId && title}
                            </div>
                            <div className={styles.handler}>
                                <Space>
                                    <Button
                                        size={"small"}
                                        shape={"circle"}
                                        className={!isHidden ? styles.btn : ""}
                                        type={isHidden ? "primary" : "text"}
                                        icon={<EyeInvisibleOutlined />}
                                        onClick={() =>
                                            changeHidden(fe_id, !isHidden)
                                        }
                                    />
                                    <Button
                                        size={"small"}
                                        shape={"circle"}
                                        className={!isLocked ? styles.btn : ""}
                                        type={isLocked ? "primary" : "text"}
                                        icon={<LockOutlined />}
                                        onClick={() => changeLocked(fe_id)}
                                    />
                                </Space>
                            </div>
                        </div>
                    </SortableItem>
                )
            })}
        </SortableContainer>
    )
}

type Props = {}

export default Layers
