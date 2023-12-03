import { useKeyPress } from "ahooks"
import { useDispatch, useSelector } from "react-redux"
// import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {
    ComponentsStateType,
    copySelectedComponent,
    pasteCopiedComponent,
    removeSelectedComponent,
    selectNextComponent,
    selectPrevComponent
} from "../store/componentReducer"
import { ActionCreators as UndoActionCreators, StateWithHistory } from "redux-undo"
import { StateType } from "../store"

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
    const dispatch = useDispatch()
    const components = useSelector<StateType>(
        (state) => state.components
    ) as StateWithHistory<ComponentsStateType>
    // 删除组件
    useKeyPress(["backspace", "delete"], () => {
        if (!isActiveElementValid()) return
        dispatch(removeSelectedComponent())
    })
    // 复制
    useKeyPress(["ctrl.c", "meta.c"], () => {
        if (!isActiveElementValid()) return
        dispatch(copySelectedComponent())
    })

    // 粘贴
    useKeyPress(["ctrl.v", "meta.v"], () => {
        if (!isActiveElementValid()) return
        dispatch(pasteCopiedComponent())
    })

    useKeyPress(["uparrow"], () => {
        if (!isActiveElementValid()) return
        dispatch(selectPrevComponent())
    })

    useKeyPress(["downarrow"], () => {
        if (!isActiveElementValid()) return
        dispatch(selectNextComponent())
    })
    // 撤销
    useKeyPress(
        ["ctrl.z", "meta.z"],
        () => {
            if (!isActiveElementValid()) return
            if (
                components?.past[components.past.length - 1]?.componentList
                    .length !== 0
            ) {
                dispatch(UndoActionCreators.undo())
            }
        },
        {
            exactMatch: true // 严格匹配
        }
    )

    // 重做
    useKeyPress(["ctrl.y", "meta.shift.z"], () => {
        if (!isActiveElementValid()) return
        dispatch(UndoActionCreators.redo())
    })
}

export default useBindCanvasKeyPress
