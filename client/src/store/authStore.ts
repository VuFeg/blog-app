import { create } from "zustand";
import { LoginReqBody, RegisterReqBody } from "../types/auth.type";
import { loginApi, logoutApi, registerApi } from "../apis/auth.api";

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
    set({ isRegistering: true });
    await registerApi(body);
    set({ isRegistering: false, isAuthenticated: true });
  },

  login: async (body: LoginReqBody) => {
    set({ isLoggingIn: true });
    await loginApi(body);
    set({
      isLoggingIn: false,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    set({ isLoggingOut: true });
    await logoutApi();
    set({
      isAuthenticated: false,
      isLoggingOut: false,
    });
  },
}));
