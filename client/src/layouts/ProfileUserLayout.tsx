import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Clipboard, Ellipsis, MoveLeft } from "lucide-react";
import { Avatar } from "@mui/material";
import { User } from "../types/user.type";
import { useUsersStore } from "../store/usersStore";

interface ProfileUserLayoutProps {
  children: React.ReactNode;
}

export const ProfileUserLayout = ({ children }: ProfileUserLayoutProps) => {
  const navigate = useNavigate();

  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const { user: me, getUserProfile, followUser, getMe } = useUsersStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        const data = await getUserProfile(username);
        setUser(data);
      }
    };

    fetchUser();
    window.scrollTo(0, 0);
  }, [username]);

  useEffect(() => {
    if (me.username === username) navigate("/profile");
  }, []);

  const handleClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleFollow = async (userId: string) => {
    await followUser(userId);
    await getMe();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="w-full md:max-w-2xl mx-auto">
      <div className="md:flex justify-between items-center h-16 mx-4 hidden">
        <div
          className="p-1 bg-white border rounded-full cursor-pointer"
          onClick={handleBack}
        >
          <MoveLeft className="size-4" />
        </div>
        <h3 className="text-base font-semibold ml-4 cursor-pointer">
          {user?.username}
        </h3>
        <div className="p-1 bg-white border rounded-full cursor-pointer">
          <Ellipsis className="size-4" />
        </div>
      </div>
      <div className="bg-white md:rounded-t-3xl md:border md:shadow-lg pt-12 mt-4 md:pt-0 min-h-screen">
        <div className="flex flex-col">
          <div className="p-4 mb-4 ">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-3xl font-bold ml-4">{user?.name}</h3>
                <p className="text-base ml-4">{user?.username}</p>
              </div>
              <Avatar
                src={user?.avatar || "/avatar.png"}
                alt={user?.username}
                sx={{ width: 84, height: 84 }}
              />
            </div>
            <div className="ml-4 mb-4">{user?.bio}</div>
            <div className="flex justify-between items-center mx-4">
              <span className="opacity-45">
                {user?.followers?.length} người theo dõi
              </span>
              <Clipboard className="cursor-pointer" onClick={handleClipboard} />
            </div>
          </div>
          <div className="p-4 mb-4">
            {me?.followings?.some((u) => u._id === user?._id) ? (
              <button
                onClick={() => user?._id && handleFollow(user._id)}
                className="border-black border px-4 py-1 rounded-md w-full font-semibold hover:opacity-70"
              >
                Đang theo dõi
              </button>
            ) : (
              <button
                onClick={() => user?._id && handleFollow(user._id)}
                className="border px-4 py-1 rounded-md w-full font-semibold bg-black text-white hover:opacity-70"
              >
                Theo dõi
              </button>
            )}
          </div>
          <div className="flex justify-between items-center py-4">
            <NavLink to={`/${username}`} className="flex-1">
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <div className="flex-1 text-center hover:text-black focus:text-black cursor-pointer pb-4 border-b border-black text-black font-semibold">
                      Blog
                    </div>
                  ) : (
                    <div className="flex-1 text-center hover:text-black focus:text-black cursor-pointer pb-4 border-b text-gray-500 font-semibold">
                      Blog
                    </div>
                  )}
                </>
              )}
            </NavLink>
            <NavLink to={`/${username}/reposts`} className="flex-1">
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <div className="flex-1 text-center hover:text-black focus:text-black cursor-pointer pb-4 border-b border-black text-black font-semibold">
                      Blog đăng lại
                    </div>
                  ) : (
                    <div className="flex-1 text-center hover:text-black focus:text-black cursor-pointer pb-4 border-b text-gray-500 font-semibold">
                      Blog đăng lại
                    </div>
                  )}
                </>
              )}
            </NavLink>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
