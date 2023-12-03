import React, { FC } from "react"
import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import { HOME_PATHNAME } from "../router"

const NotFound: FC = (props: Props) => {
    const nav = useNavigate()
    return (
        <Result
            title={"404"}
            status={"404"}
            subTitle={"抱歉，您访问的页面不存在"}
            extra={
                <Button type={"primary"} onClick={() => nav(HOME_PATHNAME)}>
                    返回首页
                </Button>
            }
        ></Result>
    )
}

type Props = {}

export default NotFound
