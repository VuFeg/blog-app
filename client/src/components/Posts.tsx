import { Avatar, Menu, MenuItem } from "@mui/material";
import { PostType } from "../types/post.type";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Ellipsis, Heart, MessageSquare, Repeat, Repeat1 } from "lucide-react";
import { useUsersStore } from "../store/usersStore";
import { usePostStore } from "../store/postStore";
import { useState } from "react";
import { PostRepCmt } from "./PostRepCmt";
import { Link } from "react-router-dom";

interface PostsProps {
  posts: PostType[];
  handleLike: (post: PostType) => void;
  handleBookmark: (post: PostType) => void;
}

export const Posts = ({ posts, handleLike, handleBookmark }: PostsProps) => {
  const { user } = useUsersStore();

  const { deletePost, isBookmarked } = usePostStore();

  const [currentPost, setCurrentPost] = useState<PostType | null>(null);
  const [isOpenCmt, setIsOpenCmt] = useState(false);
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
    window.location.reload();
    setCurrentPost(null);
  };

  return (
    <>
      {posts?.map((post) => (
        <div
          key={post._id}
          className="flex flex-col justify-center gap-4 p-4 border-b shadow-sm"
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
                  <Link
                    to={`/${post.user?.username}`}
                    className="flex-1 flex justify-between items-center"
                  >
                    <div className="flex gap-2 font-bold cursor-pointer">
                      {post.user.name}
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
                      <Ellipsis className="size-5" />
                    </button>
                  </Link>
                </div>
                <Link
                  to={`/${post.user?.username}/post/${post._id}`}
                  className="flex flex-col gap-2"
                >
                  <p className="text-sm font-normal">{post.captions}</p>
                  <div className="flex gap-2">
                    <img
                      className="h-72 w-full rounded-lg object-cover object-center"
                      src={post?.medias[0]?.url}
                      alt="nature image"
                    />
                  </div>
                </Link>
                <div className="flex gap-4">
                  <button
                    className="rounded-full p-1 hover:scale-125 flex items-center gap-1"
                    onClick={() => handleLike(post)}
                  >
                    {post.like?.some((item) => item.user_id === user?._id) ? (
                      <Heart fill="red" className="size-5 text-red-500" />
                    ) : (
                      <Heart className="size-5" />
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
                    <MessageSquare className="size-5" />
                    <span className="text-sm">
                      {post.comments?.length || ""}
                    </span>
                  </button>
                  <button
                    className={`${
                      isBookmarked && "cursor-wait"
                    } rounded-full p-1 hover:scale-125`}
                    onClick={() => handleBookmark(post)}
                    disabled={isBookmarked}
                  >
                    {post.bookmark?.some(
                      (item) => item.user_id === user?._id
                    ) ? (
                      <Repeat1 className="size-5" />
                    ) : (
                      <Repeat className="size-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
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
          disabled={currentPost?.user._id !== user._id}
        >
          <button onClick={() => currentPost && handleDelete(currentPost)}>
            Xóa bài
          </button>
        </MenuItem>
      </Menu>
      {currentPost && (
        <PostRepCmt
          open={isOpenCmt}
          setOpen={setIsOpenCmt}
          post={currentPost}
        />
      )}
    </>
  );
};
