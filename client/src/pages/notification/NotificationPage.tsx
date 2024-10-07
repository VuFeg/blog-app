import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { NotificationType } from "../../types/notification.type";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useNotificationStore } from "../../store/notificationStore";
import { NotificationSkeleton } from "../../components/skeleton/NotificationSkeleton";
import { useUsersStore } from "../../store/usersStore";

export const NotificationPage = () => {
  const { getNotifications, gettingNotifications, notifications } =
    useNotificationStore();

  const { user, getMe, followUser } = useUsersStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      await getNotifications();
    };

    fetchNotifications();
  }, []);

  const handleFollowUser = async (userId: string) => {
    await followUser(userId);
    await getMe();
  };

  return (
    <>
      <div className="w-full md:max-w-2xl mx-auto bg-white md:border md:rounded-t-3xl md:shadow-lg min-h-screen pt-20 md:pt-0 md:mt-8">
        {gettingNotifications ? <NotificationSkeleton /> : null}
        {notifications?.map((notification) => (
          <div
            key={notification._id}
            className="flex items-center gap-4 ml-4 mt-4"
          >
            <Avatar src={notification.from.avatar || "/avatar.png"} />
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
                    : notification.type === NotificationType.Like
                    ? "Đã thích bài viết của bạn."
                    : "Đã bình luận bài viết của bạn."}
                </p>
              </div>
              <button
                className={`${
                  user?.followings?.some(
                    (following) => following._id === notification.from._id
                  )
                    ? "text-gray-500"
                    : ""
                } text-black font-semibold border px-5 py-1 rounded-lg hover:opacity-60 transition-all ease-in-out`}
                onClick={() => handleFollowUser(notification.from._id)}
              >
                {user?.followings?.some(
                  (following) => following._id === notification.from._id
                )
                  ? "Đã theo dõi"
                  : "Theo dõi"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
