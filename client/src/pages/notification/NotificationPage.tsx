import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { NotificationType } from "../../types/notification.type";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useNotificationStore } from "../../store/notificationStore";
import { NotificationSkeleton } from "../../components/skeleton/NotificationSkeleton";

export const NotificationPage = () => {
  const { getNotifications, gettingNotifications, notifications } =
    useNotificationStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      await getNotifications();
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white border rounded-t-3xl shadow-lg min-h-screen">
        {gettingNotifications ? <NotificationSkeleton /> : null}
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
