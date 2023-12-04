import {useKeyPress} from "ahooks"
import {useComponentStore, useUndoComponent} from "../store/componentStore"

/**
 * 判断 activeElem 是否合法
 */
function isActiveElementValid() {
    const activeElem = document.activeElement

    // // 没有增加 dnd-kit 之前
    // if (activeElem === document.body) return true // 光标没有 focus 到 input

    // 增加了 dnd-kit 以后
    if (activeElem === document.body) return true
    return !!activeElem?.matches('div[role="button"]')
}

function useBindCanvasKeyPress() {
    const {
        selectNextComponent,
        selectPrevComponent,
        pasteCopiedComponent,
        copySelectedComponent,
        removeSelectedComponent
    } = useComponentStore((state) => ({
        selectNextComponent: state.selectNextComponent,
        selectPrevComponent: state.selectPrevComponent,
        pasteCopiedComponent: state.pasteCopiedComponent,
        copySelectedComponent: state.copySelectedComponent,
        removeSelectedComponent: state.removeSelectedComponent
    }))
    const { undo, redo, pastStates } = useUndoComponent((state) => state)
    // 删除组件
    useKeyPress(["backspace", "delete"], () => {
        if (!isActiveElementValid()) return
        removeSelectedComponent()
    })
    // 复制
    useKeyPress(["ctrl.c", "meta.c"], () => {
        if (!isActiveElementValid()) return
        copySelectedComponent()
    })

    // 粘贴
    useKeyPress(["ctrl.v", "meta.v"], () => {
        if (!isActiveElementValid()) return
        pasteCopiedComponent()
    })

    useKeyPress(["uparrow"], () => {
        if (!isActiveElementValid()) return
        selectPrevComponent()
    })

    useKeyPress(["downarrow"], () => {
        if (!isActiveElementValid()) return
        selectNextComponent()
    })
    // 撤销
    useKeyPress(
        ["ctrl.z", "meta.z"],
        () => {
            if (!isActiveElementValid()) return
            if (pastStates[pastStates.length - 1].componentList?.length === 0)
                return
            undo()
        },
        {
            exactMatch: true // 严格匹配
        }
    )

    // 重做
    useKeyPress(["ctrl.y", "meta.shift.z"], () => {
        if (!isActiveElementValid()) return
        redo()
    })
}

export default useBindCanvasKeyPress
