import { ComponentInfoType, ComponentsStateType } from "./index"

export const getNextSelectedId = (
    fe_id: string,
    componentList: ComponentInfoType[]
) => {
    const visibleComponentList = componentList.filter((c) => !c.isHidden)
    const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id)
    if (index < 0) return ""
    let newSelectedId: string
    const length = visibleComponentList.length
    if (length <= 1) {
        newSelectedId = ""
    } else {
        if (index + 1 === length) {
            newSelectedId = visibleComponentList[index - 1].fe_id
        } else {
            newSelectedId = visibleComponentList[index + 1].fe_id
        }
    }
    return newSelectedId
}

export function insertNewComponent(
    state: ComponentsStateType,
    newComponent: ComponentInfoType
) {
    const { selectedId, componentList } = state
    const index = componentList.findIndex((c) => c.fe_id === selectedId)

    if (index < 0) {
        // 未选中任何组件
        state.componentList.push(newComponent)
    } else {
        // 选中了组件，插入到 index 后面
        state.componentList.splice(index + 1, 0, newComponent)
    }

    state.selectedId = newComponent.fe_id
}
