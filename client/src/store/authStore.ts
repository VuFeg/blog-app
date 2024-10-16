import { create } from "zustand";
import { LoginReqBody, RegisterReqBody } from "../types/auth.type";
import axios from "axios";
import { API_ROOT } from "../utils/constant";
import toast from "react-hot-toast";

interface AuthStoreProps {
  isRegistering: boolean;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  isAuthenticated: boolean;

  register: (body: RegisterReqBody) => Promise<void>;
  login: (body: LoginReqBody) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  isRegistering: false,
  isLoggingOut: false,
  isLoggingIn: false,
  isAuthenticated: false,

  register: async (body: RegisterReqBody) => {
    try {
      set({ isRegistering: true, isAuthenticated: false });
      const res = await axios.post(`${API_ROOT}/api/auth/register`, body);
      localStorage.setItem("accessToken", res.data.result.accessToken);
      localStorage.setItem("refreshToken", res.data.result.refreshToken);
      set({ isRegistering: false, isAuthenticated: true });
      toast.success(res.data.message);
    } catch (error) {
      set({ isRegistering: false, isAuthenticated: false });
    }
  },

  login: async (body: LoginReqBody) => {
    try {
      set({ isLoggingIn: true, isAuthenticated: false });
      const res = await axios.post(`${API_ROOT}/api/auth/login`, body);
      localStorage.setItem("accessToken", res.data.result.accessToken);
      localStorage.setItem("refreshToken", res.data.result.refreshToken);
      set({ isLoggingIn: false, isAuthenticated: true });
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      toast.error("Email hoặc mật khẩu không đúng, vui lòng nhập lại!");
      set({ isLoggingIn: false, isAuthenticated: false });
    }
  },

  logout: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      set({ isLoggingOut: true, isAuthenticated: false });
      const res = await axios.post(
        `${API_ROOT}/api/auth/logout`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success(res.data.message);
      set({ isLoggingOut: false, isAuthenticated: false });
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.reload();
      set({ isLoggingOut: false, isAuthenticated: false });
    }
  },
}));
