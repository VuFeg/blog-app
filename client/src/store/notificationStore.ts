import axios from "axios";
import { create } from "zustand";
import { API_ROOT } from "../utils/constant";
import { NotificationsType } from "../types/notification.type";

interface NotificationStoreProps {
  notifications: NotificationsType[];
  gettingNotifications: boolean;

  getNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStoreProps>((set) => ({
  notifications: [],
  gettingNotifications: false,

  getNotifications: async () => {
    try {
      set({ gettingNotifications: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_ROOT}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ notifications: res.data.result, gettingNotifications: false });
    } catch (error) {
      set({ gettingNotifications: false, notifications: [] });
    }
  },
}));
