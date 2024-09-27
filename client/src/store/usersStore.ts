import { create } from "zustand";
import { User } from "../types/user.type";
import { getMeApi, getUserSuggestsApi } from "../apis/user.api";

interface UsersStoreProps {
  user: User;
  userSuggests: User[];
  gettingMe: boolean;
  gettingUserSuggests: boolean;
  getMe: () => Promise<void>;
  getUserSuggests: () => Promise<void>;
}

export const useUsersStore = create<UsersStoreProps>((set) => ({
  user: {} as User,
  userSuggests: [],
  gettingMe: false,
  gettingUserSuggests: false,
  getMe: async () => {
    set({ gettingMe: true });
    const data = await getMeApi();
    set({ user: data, gettingMe: false });
  },
  getUserSuggests: async () => {
    set({ gettingUserSuggests: true });
    const data = await getUserSuggestsApi();
    set({ userSuggests: data, gettingUserSuggests: false });
  },
}));
