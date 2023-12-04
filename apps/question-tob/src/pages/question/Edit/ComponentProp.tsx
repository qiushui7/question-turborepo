import React, {FC} from "react"
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo"
import {ComponentPropsType, getComponentConfByType} from "../../../components/QuestionComponents"
import {useComponentStore} from "../../../store/componentStore"

const NoProp: FC = () => {
    return <div style={{ textAlign: "center" }}>未选中组件</div>
}

const ComponentProp: FC<Props> = () => {
    const { selectedComponent } = useGetComponentsInfo()
    const changeComponentProps = useComponentStore(
        (state) => state.changeComponentProps
    )
    if (selectedComponent == null) return <NoProp />

    const { type, props, isLocked, isHidden } = selectedComponent
    const componentConf = getComponentConfByType(type)

    if (componentConf == null) return <NoProp />

    const { PropComponent } = componentConf

    const changeProps = (newProps: ComponentPropsType) => {
        if (selectedComponent == null) return
        const { fe_id } = selectedComponent
        changeComponentProps({ fe_id, newProps })
    }
    return (
        <PropComponent
            {...props}
            onChange={changeProps}
            disabled={isLocked || isHidden}
        />
    )
}

type Props = {}

export default ComponentProp
