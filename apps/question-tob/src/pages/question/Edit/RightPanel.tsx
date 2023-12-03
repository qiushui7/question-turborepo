import React, { FC, useEffect, useState } from "react"
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons"
import { Tabs } from "antd"
import ComponentProp from "./ComponentProp"
import PageSetting from "./PageSetting"
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo"

enum TAB_KEYS {
    PROP_KEY = "prop",
    SETTING_KEY = "setting"
}

const RightPanel: FC<Props> = (props) => {
    const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
    const { selectedId } = useGetComponentsInfo()

    useEffect(() => {
        if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
        else setActiveKey(TAB_KEYS.SETTING_KEY)
    }, [selectedId])

    const tabsItems = [
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <ComponentProp />
        },
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined />
                    页面设置
                </span>
            ),
            children: <PageSetting />
        }
    ]
    return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>
}

type Props = {}

export default RightPanel
