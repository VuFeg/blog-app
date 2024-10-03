import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { PostType } from "../../types/post.type";
import { useUsersStore } from "../../store/usersStore";
import { usePostStore } from "../../store/postStore";
import { useEffect, useState } from "react";
import { PostSkeleton } from "../skeleton/PostSkeleton";
import { CreatePostSkeleton } from "../skeleton/CreatePostSkeleton";

export const Post = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getNewFeeds();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const [currentPost, setCurrentPost] = useState<PostType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);

  const { user } = useUsersStore();
  const {
    getNewFeeds,
    isGettingNewFeeds,
    deletePost,
    deletingPost,
    likePost,
    isCreatingPost,
  } = usePostStore();

  const handleLike = async (post: PostType) => {
    await likePost(post._id);
    const data = await getNewFeeds();
    setPosts(data);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    post: PostType
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentPost(post);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async (post: PostType) => {
    setAnchorEl(null);
    await deletePost(post._id);
    const data = await getNewFeeds();
    setPosts(data);
    setCurrentPost(null);
  };

  return (
    <>
      {isGettingNewFeeds && <PostSkeleton />}
      {isCreatingPost && <CreatePostSkeleton />}
      {posts?.map((post) => (
        <div
          key={post._id}
          className="flex flex-col justify-center border bg-white rounded-xl shadow-lg mt-8 py-6"
        >
          <div className="flex gap-4 px-4">
            <div className="min-w-[40px]">
              <div className="p-1 rounded-full border cursor-pointer mt-2">
                <Avatar
                  alt={post.user?.username}
                  src={post.user?.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex justify-between items-center font-bold">
                <div className="flex gap-2">
                  {post.user?.username === user?.username ? (
                    <Link
                      to={`/profile`}
                      className="cursor-pointer text-md font-semibold"
                    >
                      {post.user?.username}
                    </Link>
                  ) : (
                    <Link
                      to={`/${post.user?.username}`}
                      className="cursor-pointer text-md font-semibold"
                    >
                      {post.user?.username}
                    </Link>
                  )}

                  <span className="opacity-15 font-normal">
                    {formatDistanceToNow(new Date(post.created_at ?? ""), {
                      addSuffix: true,
                      locale: vi,
                    })}
                  </span>
                </div>
                <button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  className="rounded-full p-1 hover:bg-gray-300/40"
                  onClick={(e) => handleClick(e, post)}
                >
                  <EllipsisHorizontalIcon className="size-5" />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    sx={{ marginRight: 1, marginLeft: 1 }}
                    disabled={
                      currentPost?.user._id !== user._id || deletingPost
                    }
                  >
                    <button
                      onClick={() => currentPost && handleDelete(currentPost)}
                    >
                      Xóa bài
                    </button>
                  </MenuItem>
                </Menu>
              </div>
              <Link
                to={`/${post.user.username}/post/${post._id}`}
                className="text-md font-normal mr-6"
              >
                {post.captions
                  ?.split("\n")
                  .map((text: string, index: number) => (
                    <span key={index}>
                      {text}
                      <br />
                    </span>
                  ))}
                <div className="mt-4">
                  <img
                    className="h-72 w-full rounded-lg object-cover object-center"
                    src={post?.medias[0]?.url}
                    alt="nature image"
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className="flex gap-4 ml-12 md:ml-16 items-center mt-4">
            <button
              className="rounded-full p-1 hover:scale-125 flex items-center gap-1"
              onClick={() => handleLike(post)}
            >
              {post.like?.some((item) => item.user_id === user?._id) ? (
                <HeartIcon fill="red" className="size-5 text-red-500" />
              ) : (
                <HeartIcon className="size-5" />
              )}
              <span className="text-sm">{post.like?.length || ""}</span>
            </button>
            <button className="flex items-center gap-1 rounded-full p-1 hover:scale-125">
              <ChatBubbleLeftIcon className="size-5" />
            </button>
            <button className="rounded-full p-1 hover:scale-125">
              <ArrowPathRoundedSquareIcon className="size-5" />
            </button>
            <button className="rounded-full p-1 hover:scale-125">
              <PaperAirplaneIcon className="size-5" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
