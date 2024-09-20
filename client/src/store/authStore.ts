import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "../types/user.type";
import { API_ROOT } from "../utils/constant";

interface AuthStoreProps {
  user: User | null;
  isSigningUp: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  isAuthenticated: boolean;

  signup: (credentials: object) => Promise<void>;
  login: (credentials: object) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingOut: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isAuthenticated: false,

  signup: async (credentials: object) => {
    set({ isSigningUp: true });
    try {
      await axios.post(`/api/auth/register`, credentials);

      set({
        isSigningUp: false,
      });
      toast.success("Account created successfully");
    } catch (error: any) {
      set({ isSigningUp: false, isAuthenticated: false });
      toast.error(error.response.data.message || "Signup failed");
    }
  },

  login: async (credentials: object) => {
    set({ isLoggingIn: true });

    try {
      await axios.post(`/api/auth/login`, credentials);

      set({
        isLoggingIn: false,
        isAuthenticated: true,
      });
      toast.success("Logged in successfully");
    } catch (error: any) {
      set({
        isLoggingIn: false,
        isAuthenticated: false,
      });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.get(`/api/auth/logout`);

      set({
        user: null,
        isAuthenticated: false,
        isLoggingOut: false,
      });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error("Logout failed");
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`/api/auth/check-auth`);
      set({
        user: response.data,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
  },
}));
