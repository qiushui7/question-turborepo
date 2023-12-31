import React, { FC, useEffect } from "react"
import useGetPageInfo from "../../../hooks/useGetPageInfo"
import { Form, Input } from "antd"
import { usePageInfoStore } from "../../../store/pageInfoStore"

const { TextArea } = Input

const PageSetting: FC<Props> = (props) => {
    const pageInfo = useGetPageInfo()
    const [form] = Form.useForm()
    const resetPageInfo = usePageInfoStore((state) => state.resetPage)

    useEffect(() => {
        form.setFieldsValue(pageInfo)
    }, [pageInfo])

    const handleValuesChange = () => {
        resetPageInfo(form.getFieldsValue())
    }

    return (
        <Form
            layout={"vertical"}
            initialValues={pageInfo}
            onValuesChange={handleValuesChange}
            form={form}
        >
            <Form.Item
                label={"问卷标题"}
                name={"title"}
                rules={[{ required: true, message: "请输入标题" }]}
            >
                <Input placeholder={"请输入标题"} />
            </Form.Item>
            <Form.Item label={"问卷描述"} name={"desc"}>
                <TextArea placeholder={"问卷描述..."} />
            </Form.Item>
            <Form.Item label={"样式代码"} name={"css"}>
                <TextArea placeholder={"输入CSS样式代码... "} />
            </Form.Item>
            <Form.Item label={"脚本代码"} name={"js"}>
                <TextArea placeholder={"输入JS脚本代码... "} />
            </Form.Item>
        </Form>
    )
}

type Props = {}

export default PageSetting
