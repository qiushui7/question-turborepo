import {useUserStore} from "../store/userStore";

export const useGetUserInfo = () => {
  const { username, nickname } = useUserStore((state) => {
    return {
      username: state.username,
      nickname: state.nickname,
    };
  });
  return { username, nickname };
};
