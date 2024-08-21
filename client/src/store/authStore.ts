import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (username: String, email: String, password: String) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });

      set({ user: response.data.user, isAuthenticated: true });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });

      throw error;
    }
  },

  login: async (username: String, password: String) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      set({ user: response.data.user, isAuthenticated: true });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });

      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await axios.post(`${API_URL}/logout`);

      set({ user: null, isAuthenticated: false });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error logging out",
        isLoading: false,
      });

      throw error;
    }
  },

  verifyEmail: async (code: String) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });

      set({ user: response.data.user, isAuthenticated: true });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });

      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true,
      });

      set({ user: response.data.user, isAuthenticated: true });
    } catch (error: any) {
      set({ isCheckingAuth: false });

      throw error;
    }
  },
}));
