import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { Layout, Spin } from "antd"
import styles from "./MainLayout.module.scss"
import Logo from "../components/Logo"
import UserInfo from "../components/UserInfo"
import useLoadUserData from "../hooks/useLoadUserData"
import useNavPage from "../hooks/useNavPage"

const { Header, Content, Footer } = Layout

type Props = {}

const MainLayout: FC = (props: Props) => {
    const { waitingUserData } = useLoadUserData()
    useNavPage(waitingUserData)

    return (
        <>
            <Layout>
                <Header className={styles.header}>
                    <div className={styles.left}>
                        <Logo />
                    </div>
                    <div className={styles.right}>
                        <UserInfo />
                    </div>
                </Header>
                <Content className={styles.main}>
                    {waitingUserData ? (
                        <div style={{ textAlign: "center", marginTop: "60px" }}>
                            <Spin />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </Content>
                <Footer className={styles.footer}>
                    小涛问卷 &copy; 2023 - present
                </Footer>
            </Layout>
        </>
    )
}

export default MainLayout
