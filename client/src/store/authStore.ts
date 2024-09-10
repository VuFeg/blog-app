import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingOut: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isVerifyingEmail: false,
  isVerified: false,

  signup: async (credentials: object) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(`/api/auth/register`, credentials);

      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error: any) {
      set({ user: null, isSigningUp: false });
      toast.error(error.response.data.message || "Signup failed");
    }
  },

  login: async (credentials: object) => {
    set({ isLoggingIn: true });

    try {
      const response = await axios.post(`/api/auth/login`, credentials);

      set({
        user: response.data.user,
        isLoggingIn: false,
        isVerified: response.data.user.isVerified,
      });
      toast.success("Logged in successfully");
    } catch (error: any) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post(`/api/auth/logout`);

      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error: any) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout error");
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await axios.get(`/api/auth/check-auth`);

      set({
        user: response.data.user,
        isCheckingAuth: false,
      });
    } catch (error: any) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
