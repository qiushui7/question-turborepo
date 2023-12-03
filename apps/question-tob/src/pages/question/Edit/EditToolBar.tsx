import React, { FC } from "react"
import { Button, Space, Tooltip } from "antd"
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined,
    DownOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    RedoOutlined,
    UndoOutlined,
    UpOutlined
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import {
    changeComponentHidden,
    ComponentInfoType,
    ComponentsStateType,
    copySelectedComponent,
    moveComponent,
    pasteCopiedComponent,
    removeSelectedComponent,
    toggleComponentLocked
} from "../../../store/componentReducer"
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo"
import { ActionCreators as UndoActionCreators, StateWithHistory } from "redux-undo"
import { StateType } from "../../../store"

const EditToolBar: FC<Props> = (props) => {
    const components = useSelector<StateType>(
        (state) => state.components
    ) as StateWithHistory<ComponentsStateType>
    const dispatch = useDispatch()
    const { selectedId, componentList, selectedComponent, copiedComponent } =
        useGetComponentsInfo()
    const { isLocked } = selectedComponent || ({} as ComponentInfoType)
    const length = componentList.length
    const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)
    const isFirst = selectedIndex <= 0 // 第一个
    const isLast = selectedIndex + 1 >= length // 最后一个

    const handleDelete = () => {
        dispatch(removeSelectedComponent())
    }
    const handleHidden = () => {
        dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
    }
    const handleLock = () => {
        dispatch(toggleComponentLocked({ fe_id: selectedId }))
    }
    const copy = () => {
        dispatch(copySelectedComponent())
    }
    const paste = () => {
        dispatch(pasteCopiedComponent())
    }
    function moveUp() {
        if (isFirst) return
        dispatch(
            moveComponent({
                oldIndex: selectedIndex,
                newIndex: selectedIndex - 1
            })
        )
    }

    // 下移
    function moveDown() {
        if (isLast) return
        dispatch(
            moveComponent({
                oldIndex: selectedIndex,
                newIndex: selectedIndex + 1
            })
        )
    }

    function undo() {
        if (
            components?.past[components.past.length - 1]?.componentList
                .length !== 0
        ) {
            dispatch(UndoActionCreators.undo())
        }
    }

    // 重做
    function redo() {
        dispatch(UndoActionCreators.redo())
    }

    return (
        <Space>
            <Tooltip title={"删除"}>
                <Button
                    shape={"circle"}
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                />
            </Tooltip>
            <Tooltip title={"隐藏"}>
                <Button
                    shape={"circle"}
                    icon={<EyeInvisibleOutlined />}
                    onClick={handleHidden}
                />
            </Tooltip>
            <Tooltip title={"锁定"}>
                <Button
                    shape={"circle"}
                    icon={<LockOutlined />}
                    onClick={handleLock}
                    type={isLocked ? "primary" : "default"}
                />
            </Tooltip>
            <Tooltip title={"复制"}>
                <Button
                    shape={"circle"}
                    icon={<CopyOutlined />}
                    onClick={copy}
                    disabled={selectedId === ""}
                />
            </Tooltip>
            <Tooltip title={"粘贴"}>
                <Button
                    shape={"circle"}
                    icon={<BlockOutlined />}
                    onClick={paste}
                    disabled={copiedComponent === null}
                />
            </Tooltip>
            <Tooltip title="上移">
                <Button
                    shape="circle"
                    icon={<UpOutlined />}
                    onClick={moveUp}
                    disabled={isFirst}
                ></Button>
            </Tooltip>
            <Tooltip title="下移">
                <Button
                    shape="circle"
                    icon={<DownOutlined />}
                    onClick={moveDown}
                    disabled={isLast}
                ></Button>
            </Tooltip>
            <Tooltip title="撤销">
                <Button
                    shape="circle"
                    icon={<UndoOutlined />}
                    onClick={undo}
                ></Button>
            </Tooltip>
            <Tooltip title="重做">
                <Button
                    shape="circle"
                    icon={<RedoOutlined />}
                    onClick={redo}
                ></Button>
            </Tooltip>
        </Space>
    )
}

type Props = {}

export default EditToolBar
