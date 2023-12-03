import {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {useGetUserInfo} from "./useGetUserInfo";
import {getUserInfoService} from "../services/user";
import {useUserStore} from "../store/userStore";
import {useLocation} from "react-router-dom";

function useLoadUserData() {
  const login = useUserStore((state) => state.login);
  const [waitingUserData, setWaitingUserData] = useState(true);
  const { pathname } = useLocation();
  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      login({ username, nickname }); // 存储到 store
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // 判断当前store 是否已经存在用户信息
  const { username } = useGetUserInfo(); // store
  useEffect(() => {
    if (username) {
      setWaitingUserData(false); // 如果 store 已经存在用户信息，就不用重新加载了
      return;
    }
    run(); // 如果 store 中没有用户信息，则进行加载
  }, [pathname]);

  return { waitingUserData };
}

export default useLoadUserData;
