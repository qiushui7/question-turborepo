import React, { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LOGIN_PATHNAME } from "../router"
import { UserOutlined } from "@ant-design/icons"
import { Button, message } from "antd"
import { removeToken } from "../utils/user-token"
import { useGetUserInfo } from "../hooks/useGetUserInfo"
import { useUserStore } from "../store/userStore"

const UserInfo: FC = (props: Props) => {
    const logoutAction = useUserStore((state) => state.logout)
    const nav = useNavigate()
    const { username, nickname } = useGetUserInfo()
    const logout = () => {
        logoutAction()
        removeToken()
        message.success("退出成功")
        nav(LOGIN_PATHNAME)
    }
    const UserInfo = (
        <>
            <span style={{ color: "#e8e8e8" }}>
                <UserOutlined />
                {nickname}
            </span>
            <Button type={"link"} onClick={logout}>
                退出
            </Button>
        </>
    )
    const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
    return <div>{username ? UserInfo : Login}</div>
}

type Props = {}

export default UserInfo
