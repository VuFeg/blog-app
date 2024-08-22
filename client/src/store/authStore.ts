import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const API_URL = "http://localhost:3000/api/auth";

const getUser = async () => {
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }

  try {
    const response = await axios.post(`${API_URL}/check-auth`, {
      token,
    });

    return response.data.user;
  } catch (error) {
    console.log(error);
  }
};

export const useAuthStore = create((set) => ({
  user: getUser(),
  isAuthenticated: false,
  isCheckingAuth: true,
  error: null,
  token: Cookies.get("token") || null,

  signup: async (username: String, email: String, password: String) => {
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
      });

      throw error;
    }
  },

  login: async (username: String, password: String) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
      });

      const getToken = await axios.post(`${API_URL}/token`, {
        user: response.data.user,
      });

      Cookies.set("token", getToken.data.token.token, { expires: 7 });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error logging in",
      });

      throw error;
    }
  },

  logout: async (user: any) => {
    try {
      await axios.post(`${API_URL}/logout`, {
        userId: user._id,
      });

      set({ user: null, isAuthenticated: false });

      Cookies.remove("token");
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error logging out",
      });

      throw error;
    }
  },

  verifyEmail: async (code: String) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });

      set({ user: response.data.user, isAuthenticated: true });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error verifying email",
      });

      throw error;
    }
  },

  checkAuth: async (token: String) => {
    if (!token) {
      set({ isCheckingAuth: false });
      return;
    }
    set({ isCheckingAuth: true });

    try {
      const response = await axios.post(`${API_URL}/check-auth`, {
        token,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error checking auth",
        isCheckingAuth: false,
      });
    }
  },
}));
