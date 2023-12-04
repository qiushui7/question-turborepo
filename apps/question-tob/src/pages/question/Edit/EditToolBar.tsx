import React, {FC} from "react"
import {Button, Space, Tooltip} from "antd"
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
import {ComponentInfoType, useComponentStore, useUndoComponent} from "../../../store/componentStore"
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo"

const EditToolBar: FC<Props> = (props) => {
    const { undo, redo, pastStates } = useUndoComponent((state) => state)
    const { selectedId, componentList, selectedComponent, copiedComponent } =
        useGetComponentsInfo()
    const { isLocked } = selectedComponent || ({} as ComponentInfoType)
    const length = componentList.length
    const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)
    const isFirst = selectedIndex <= 0 // 第一个
    const isLast = selectedIndex + 1 >= length // 最后一个
    const {
        pasteCopiedComponent,
        copySelectedComponent,
        removeSelectedComponent,
        changeComponentHidden,
        toggleComponentLocked,
        moveComponent
    } = useComponentStore((state) => ({
        pasteCopiedComponent: state.pasteCopiedComponent,
        copySelectedComponent: state.copySelectedComponent,
        removeSelectedComponent: state.removeSelectedComponent,
        changeComponentHidden: state.changeComponentHidden,
        toggleComponentLocked: state.toggleComponentLocked,
        moveComponent: state.moveComponent
    }))

    const handleDelete = () => {
        removeSelectedComponent()
    }
    const handleHidden = () => {
        changeComponentHidden({ fe_id: selectedId, isHidden: true })
    }
    const handleLock = () => {
        toggleComponentLocked({ fe_id: selectedId })
    }
    const copy = () => {
        copySelectedComponent()
    }
    const paste = () => {
        pasteCopiedComponent()
    }
    const moveUp = () => {
        if (isFirst) return

        moveComponent({
            oldIndex: selectedIndex,
            newIndex: selectedIndex - 1
        })
    }

    // 下移
    const moveDown = () => {
        if (isLast) return

        moveComponent({
            oldIndex: selectedIndex,
            newIndex: selectedIndex + 1
        })
    }

    const handleUndo = () => {
        if (pastStates[pastStates.length - 1].componentList?.length === 0)
            return
        undo()
    }

    // 重做
    const handleRedo = () => {
        redo()
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
                    onClick={handleUndo}
                ></Button>
            </Tooltip>
            <Tooltip title="重做">
                <Button
                    shape="circle"
                    icon={<RedoOutlined />}
                    onClick={handleRedo}
                ></Button>
            </Tooltip>
        </Space>
    )
}

type Props = {}

export default EditToolBar
