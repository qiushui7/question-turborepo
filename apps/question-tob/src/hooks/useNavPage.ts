import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { isLoginOrRegister, isNoNeedUserInfo, LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router/index"
import { getToken } from "../utils/user-token"

function useNavPage(waitingUserData: boolean) {
    const token = getToken()
    const { pathname } = useLocation()
    const nav = useNavigate()

    useEffect(() => {
        if (waitingUserData) return

        // 已经登录了
        if (token) {
            if (isLoginOrRegister(pathname)) {
                nav(MANAGE_INDEX_PATHNAME)
            }
            return
        }

        // 未登录
        if (isNoNeedUserInfo(pathname)) {
            return
        } else {
            nav(LOGIN_PATHNAME)
        }
    }, [waitingUserData, pathname])
}

export default useNavPage
