import { create } from "zustand";
import { UpdateUserReqBody, User } from "../types/user.type";
import axios from "axios";
import { API_ROOT } from "../utils/constant";
import toast from "react-hot-toast";

interface UsersStoreProps {
  user: User;
  userSuggests: User[];
  gettingMe: boolean;
  gettingUserSuggests: boolean;
  followingUser: boolean;
  searchingUser: boolean;
  updatingProfile: boolean;
  gettingUserProfile: boolean;
  getMe: () => Promise<User>;
  getUserSuggests: () => Promise<User[]>;
  followUser: (userId: string) => Promise<void>;
  searchUser: (keyword: string) => Promise<User[]>;
  updateProfile: (data: UpdateUserReqBody) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  getUserProfile: (userId: string) => Promise<User>;
}

export const useUsersStore = create<UsersStoreProps>((set) => ({
  user: {} as User,
  userSuggests: [],
  gettingMe: false,
  gettingUserSuggests: false,
  followingUser: false,
  searchingUser: false,
  updatingProfile: false,
  gettingUserProfile: false,
  getMe: async () => {
    try {
      set({ gettingMe: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_ROOT}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ user: res.data.result, gettingMe: false });
      return res.data.result;
    } catch (error) {
      set({ gettingMe: false, user: {} as User });
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    }
  },
  getUserSuggests: async () => {
    try {
      set({ gettingUserSuggests: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_ROOT}/api/users/suggests`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ userSuggests: res.data.result, gettingUserSuggests: false });
      return res.data.result;
    } catch (error) {
      set({ gettingUserSuggests: false, userSuggests: [] });
    }
  },
  followUser: async (userId: string) => {
    try {
      set({ followingUser: true });
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `${API_ROOT}/api/users/follow`,
        { followed_user_id: userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      set({ followingUser: false });
    } catch (error) {
      set({ followingUser: false });
    }
  },
  searchUser: async (keyword: string) => {
    try {
      set({ searchingUser: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_ROOT}/api/users/search/${keyword}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ searchingUser: false });
      return res.data.result;
    } catch (error) {
      set({ searchingUser: false });
      return [];
    }
  },
  updateProfile: async (data: UpdateUserReqBody) => {
    try {
      set({ updatingProfile: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.put(`${API_ROOT}/api/users`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success(res.data.message);
      set({ updatingProfile: false, user: res.data.result });
    } catch (error) {
      set({ updatingProfile: false });
    }
  },
  uploadAvatar: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${API_ROOT}/api/medias/upload-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      set({ user: res.data.result });
      return res.data.result;
    } catch (error) {}
  },
  getUserProfile: async (username: string) => {
    try {
      set({ gettingUserProfile: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_ROOT}/api/users/${username}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ gettingUserProfile: false });
      return res.data.result;
    } catch (error) {
      set({ gettingUserProfile: false });
      return {} as User;
    }
  },
}));
