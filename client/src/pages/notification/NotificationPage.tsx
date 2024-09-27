import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import {
  NotificationsType,
  NotificationType,
} from "../../types/notification.type";
import { getNotificationsApi } from "../../apis/notification.api";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export const NotificationPage = () => {
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotificationsApi();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);
  return (
    <>
      <div className="max-w-2xl mx-auto bg-white border rounded-t-3xl shadow-lg min-h-screen">
        {notifications?.map((notification) => (
          <div
            key={notification._id}
            className="flex items-center gap-4 ml-4 mt-4"
          >
            <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
            <div className="flex flex-1 justify-between items-center pr-4 pb-2 border-b border-black/30">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-black">
                    {notification.from?.username}
                  </h4>
                  <p className="text-sm font-medium text-gray-400">
                    {formatDistanceToNow(
                      new Date(notification.created_at ?? ""),
                      {
                        addSuffix: true,
                        locale: vi,
                      }
                    )}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-400">
                  {notification.type === NotificationType.Follow
                    ? "Đã theo dõi bạn."
                    : "Đã thích bài viết của bạn."}
                </p>
              </div>
              <button className="text-black font-semibold border px-5 py-1 rounded-lg hover:opacity-60 transition-all ease-in-out">
                Theo dõi
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
