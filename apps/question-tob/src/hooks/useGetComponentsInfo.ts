import {useComponentStore} from "../store/componentStore"

function useGetComponentsInfo() {
    const {
        componentList = [],
        selectedId,
        copiedComponent
    } = useComponentStore((state) => ({
        componentList: state.componentList,
        selectedId: state.selectedId,
        copiedComponent: state.copiedComponent
    }))

    const selectedComponent = componentList.find((c) => c.fe_id === selectedId)

    return {
        componentList,
        selectedId,
        selectedComponent,
        copiedComponent
    }
}

export default useGetComponentsInfo
