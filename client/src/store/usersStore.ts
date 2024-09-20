import { create } from "zustand";
import axios from "axios";
import { User } from "../types/user.type";

interface UsersStoreProps {
  userProfile: User | null;
  gettingUserProfile: boolean;
  getUserProfile: (username: string) => Promise<void>;
}

export const useUsersStore = create<UsersStoreProps>((set) => ({
  userProfile: null,
  gettingUserProfile: false,
  getUserProfile: async (username: string) => {
    set({ gettingUserProfile: true });
    try {
      const response = await axios.get(`/api/users/profile/${username}`);
      set({
        userProfile: response.data.userProfile,
        gettingUserProfile: false,
      });
    } catch (error: any) {
      set({ userProfile: null, gettingUserProfile: false });
    }
  },
}));
