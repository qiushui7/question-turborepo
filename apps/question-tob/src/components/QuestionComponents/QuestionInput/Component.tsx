import React, { FC } from "react"
import { QuestionInputDefaultProps, QuestionInputPropsType } from "./interface"
import { Input, Typography } from "antd"

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props) => {
    const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <div>
                <Input placeholder={placeholder}></Input>
            </div>
        </div>
    )
}

type Props = {}

export default QuestionInput
