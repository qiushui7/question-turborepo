import {create} from "zustand";

export type UserStateType = {
  username: string;
  nickname: string;
};

export type UserActionType = {
  login: (payload: UserStateType) => void;
  logout: () => void;
};

export const useUserStore = create<UserStateType & UserActionType>((set) => ({
  username: "",
  nickname: "",
  login: (payload) => {
    set(() => payload);
  },
  logout: () => {
    set(() => ({
      username: "",
      nickname: "",
    }));
  },
}));
