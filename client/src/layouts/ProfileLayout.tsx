import { useEffect, useState } from "react";
import { Clipboard } from "lucide-react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { User } from "../types/user.type";
import { useUsersStore } from "../store/usersStore";
import { UpdateProfile } from "../components/UpdateProfile";

interface ProfilepageProps {
  children?: React.ReactNode;
}

export const ProfileLayout = ({ children }: ProfilepageProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { getMe } = useUsersStore();

  useEffect(() => {
    const fetchDatas = async () => {
      const data = await getMe();
      setUser(data);
    };

    fetchDatas();
  }, []);

  const handleClipboard = () => {
    navigator.clipboard.writeText(`${window.location.href}/${user?.username}`);
    toast.success("Copy thành công.");
  };

  return (
    <div className="bg-white w-full md:max-w-2xl md:rounded-t-3xl md:border md:shadow-lg min-h-screen mx-auto pt-12 md:pt-0 md:mt-8">
      <div className="flex flex-col">
        <div className="p-4 mb-4 ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-3xl font-bold ml-4">{user?.name}</h3>
              <p className="text-base ml-4">{user?.username}</p>
            </div>
            <img
              src={user?.avatar || "/avatar.png"}
              alt={user?.username}
              className="w-16 h-16 object-cover rounded-full mt-7 mr-4"
            />
          </div>
          <div className="flex justify-between items-center mx-4">
            <span className="opacity-45">
              {user?.followers?.length} người theo dõi
            </span>
            <Clipboard className="cursor-pointer" onClick={handleClipboard} />
          </div>
          <div className="ml-4">{user?.bio}</div>
        </div>
        <div className="p-4 mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" border px-4 py-1 rounded-md w-full font-medium"
          >
            Chỉnh sửa trang cá nhân
          </button>
        </div>
        <div className="flex justify-between items-center py-4">
          <NavLink to={`/profile`} className="flex-1">
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
          <NavLink to={`/profile/reposts`} className="flex-1">
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
        {children}
      </div>
      {isOpen && user && (
        <UpdateProfile user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};
