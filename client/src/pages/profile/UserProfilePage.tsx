import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/user.type";
import { useUsersStore } from "../../store/usersStore";
import { Clipboard, Ellipsis, HeartIcon, MoveLeft } from "lucide-react";
import { Avatar } from "@mui/material";
import { usePostStore } from "../../store/postStore";
import { PostType } from "../../types/post.type";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { PostRepCmt } from "../../components/PostRepCmt";
export const UserProfilePage = () => {
  const navigate = useNavigate();

  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPost, setCurrentPost] = useState<PostType | null>(null);

  const [isOpenCmt, setIsOpenCmt] = useState(false);

  const { user: me, getUserProfile, followUser, getMe } = useUsersStore();
  const { getPostsByUserName, likePost } = usePostStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        const data = await getUserProfile(username);
        setUser(data);
      }
    };

    const fetchPosts = async () => {
      if (username) {
        const data = await getPostsByUserName(username, 1, 10);
        setPosts(data);
      }
    };

    fetchUser();
    fetchPosts();
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

  const handleLike = async (post: PostType) => {
    await likePost(post._id);
    const data = await getPostsByUserName(user?.username || "", 1, 10);
    setPosts(data);
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
        {posts?.map((post) => (
          <div
            key={post._id}
            className="flex flex-col justify-center gap-4 p-4 border-b"
          >
            <div className="flex gap-4 mx-2">
              <div className="cursor-pointer mt-2">
                <Avatar
                  src={post.user.avatar || "/avatar.png"}
                  alt={post.user.username}
                  className="w-6"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-1 justify-between">
                    <div className="flex gap-2 font-bold cursor-pointer">
                      {post.user.name}
                      <span className="opacity-15 font-normal">
                        {formatDistanceToNow(new Date(post.created_at ?? ""), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </span>
                    </div>
                    <button className="rounded-full p-1 hover:bg-gray-300">
                      <EllipsisHorizontalIcon className="size-5" />
                    </button>
                  </div>
                  <p className="text-sm font-normal">{post.captions}</p>
                  <div className="flex gap-2">
                    <img
                      className="h-72 w-full rounded-lg object-cover object-center"
                      src={post?.medias[0]?.url}
                      alt="nature image"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="rounded-full p-1 hover:scale-125 flex items-center gap-1"
                      onClick={() => handleLike(post)}
                    >
                      {post.like?.some((item) => item.user_id === me?._id) ? (
                        <HeartIcon fill="red" className="size-5 text-red-500" />
                      ) : (
                        <HeartIcon className="size-5" />
                      )}
                      <span className="text-sm">{post.like?.length || ""}</span>
                    </button>
                    <button
                      className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-300 opacity-50"
                      onClick={() => {
                        setIsOpenCmt(!isOpenCmt);
                        setCurrentPost(post);
                      }}
                    >
                      <ChatBubbleLeftIcon className="size-5" />
                      <span className="text-sm">
                        {post.comments?.length || ""}
                      </span>
                    </button>
                    <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                      <ArrowPathRoundedSquareIcon className="size-5" />
                    </button>
                    <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                      <PaperAirplaneIcon className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {currentPost && (
          <PostRepCmt
            open={isOpenCmt}
            setOpen={setIsOpenCmt}
            post={currentPost}
          />
        )}
      </div>
    </div>
  );
};
