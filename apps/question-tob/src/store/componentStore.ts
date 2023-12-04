import {create, useStore} from "zustand"
import {ComponentPropsType} from "../components/QuestionComponents"
import {produce} from "immer"
import cloneDeep from "lodash.clonedeep"
import {nanoid} from "nanoid"
import {arrayMove} from "@dnd-kit/sortable"
import {temporal, TemporalState} from "zundo"
import {devtools} from "zustand/middleware"

export type ComponentInfoType = {
    fe_id: string
    type: string
    title: string
    isHidden?: boolean
    isLocked?: boolean
    props: ComponentPropsType
}

export type ComponentStateType = {
    selectedId: string
    componentList: Array<ComponentInfoType>
    copiedComponent: ComponentInfoType | null
}

export type ComponentActionType = {
    resetComponents: (payload: ComponentStateType) => void
    changeSelectedId: (id: string) => void
    addComponent: (payload: ComponentInfoType) => void
    changeComponentProps: (payload: {
        fe_id: string
        newProps: ComponentPropsType
    }) => void
    removeSelectedComponent: () => void
    changeComponentHidden: (payload: {
        fe_id: string
        isHidden: boolean
    }) => void
    toggleComponentLocked: (payload: { fe_id: string }) => void
    copySelectedComponent: () => void
    pasteCopiedComponent: () => void
    selectPrevComponent: () => void
    selectNextComponent: () => void
    changeComponentTitle: (payload: { fe_id: string; title: string }) => void
    moveComponent: (payload: { oldIndex: number; newIndex: number }) => void
}

export const useComponentStore = create<
    ComponentStateType & ComponentActionType
>()(
    devtools(
        temporal(
            (set, get, state) => ({
                selectedId: "",
                componentList: [],
                copiedComponent: null,
                resetComponents: (payload) => {
                    set(() => payload)
                },
                changeSelectedId: (id) => {
                    set(
                        produce((state: ComponentStateType) => {
                            state.selectedId = id
                        })
                    )
                },
                addComponent: (payload) => {
                    insertNewComponent(set, payload)
                },
                changeComponentProps: (payload) => {
                    set(
                        produce((state: ComponentStateType) => {
                            const { newProps } = payload
                            console.log(state.componentList)
                            const curComp = state.componentList.find(
                                (c) => c.fe_id === state.selectedId
                            )
                            console.log(state.componentList)
                            if (curComp) {
                                curComp.props = {
                                    ...curComp.props,
                                    ...newProps
                                }
                            }
                        })
                    )
                },
                removeSelectedComponent: () => {
                    set(
                        produce((state: ComponentStateType) => {
                            const { componentList, selectedId: removeId } =
                                state
                            state.selectedId = getNextSelectedId(
                                removeId,
                                componentList
                            )
                            const index = componentList.findIndex(
                                (c) => c.fe_id === removeId
                            )
                            componentList.splice(index, 1)
                        })
                    )
                },
                changeComponentHidden: (payload) => {
                    set(
                        produce((state: ComponentStateType) => {
                            const { componentList } = state
                            const { fe_id, isHidden } = payload
                            let newSelectedId = ""
                            if (isHidden) {
                                newSelectedId = getNextSelectedId(
                                    fe_id,
                                    componentList
                                )
                            } else {
                                newSelectedId = fe_id
                            }
                            state.selectedId = newSelectedId
                            const curComp = componentList.find(
                                (c) => c.fe_id === fe_id
                            )
                            if (curComp) {
                                curComp.isHidden = isHidden
                            }
                        })
                    )
                },
                toggleComponentLocked: (payload) => {
                    set(
                        produce((state: ComponentStateType) => {
                            const { fe_id } = payload
                            const curComp = state.componentList.find(
                                (c) => c.fe_id === fe_id
                            )
                            if (curComp) {
                                curComp.isLocked = !curComp.isLocked
                            }
                        })
                    )
                },
                copySelectedComponent: () => {
                    console.log("copy")
                    set(
                        produce((state: ComponentStateType) => {
                            const { selectedId, componentList = [] } = state
                            console.log(selectedId, componentList)
                            const selectedComponent = componentList.find(
                                (c) => c.fe_id === selectedId
                            )
                            if (!selectedComponent) return
                            state.copiedComponent = cloneDeep(
                                selectedComponent
                            ) as ComponentInfoType
                            console.log(state.copiedComponent)
                        })
                    )
                },
                pasteCopiedComponent: () => {
                    const id = nanoid()
                    set(
                        produce((state: ComponentStateType) => {
                            const {
                                copiedComponent,
                                selectedId,
                                componentList
                            } = state
                            if (!copiedComponent) return
                            copiedComponent.fe_id = id
                            const index = componentList.findIndex(
                                (c) => c.fe_id === selectedId
                            )

                            if (index < 0) {
                                // 未选中任何组件
                                state.componentList.push(copiedComponent)
                            } else {
                                // 选中了组件，插入到 index 后面
                                state.componentList.splice(
                                    index + 1,
                                    0,
                                    copiedComponent
                                )
                            }
                            state.selectedId = copiedComponent.fe_id
                        })
                    )
                },
                selectPrevComponent: () => {
                    set(
                        produce((state: ComponentStateType) => {
                            const { selectedId, componentList } = state
                            const selectedIndex = componentList.findIndex(
                                (c) => c.fe_id === selectedId
                            )
                            if (selectedIndex < 0) return
                            if (selectedIndex <= 0) return
                            state.selectedId =
                                componentList[selectedIndex - 1].fe_id
                        })
                    )
                },
                selectNextComponent: () => {
                    set(
                        produce((state: ComponentStateType) => {
                            const { selectedId, componentList } = state
                            const selectedIndex = componentList.findIndex(
                                (c) => c.fe_id === selectedId
                            )
                            if (selectedIndex < 0) return
                            if (selectedIndex <= 0) return
                            state.selectedId =
                                componentList[selectedIndex + 1].fe_id
                        })
                    )
                },
                changeComponentTitle: (payload) => {
                    set(
                        produce((state: ComponentStateType) => {
                            const { title, fe_id } = payload
                            const curComp = state.componentList.find(
                                (c) => c.fe_id === fe_id
                            )
                            if (curComp) curComp.title = title
                        })
                    )
                },
                moveComponent: (payload) => {
                    set(
                        produce((state: ComponentStateType) => {
                            const { componentList: curComponentList } = state
                            const { oldIndex, newIndex } = payload

                            state.componentList = arrayMove(
                                curComponentList,
                                oldIndex,
                                newIndex
                            )
                        })
                    )
                }
            }),
            {
                limit: 20,
                partialize: (state) => {
                    const {
                        resetComponents,
                        changeSelectedId,
                        selectNextComponent,
                        selectPrevComponent,
                        ...rest
                    } = state
                    return rest
                }
            }
        )
    )
)

export const useUndoComponent = <T extends unknown>(
    selector: (state: TemporalState<any>) => T,
    equality?: (a: T, b: T) => boolean
) => useStore(useComponentStore.temporal, selector, equality)

export const insertNewComponent = (
    set: any,
    newComponent: ComponentInfoType
) => {
    set(
        produce((state: ComponentStateType) => {
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
        })
    )
}

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
