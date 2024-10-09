import { Avatar } from "@mui/material";
import { PostType } from "../types/post.type";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Ellipsis, Heart, MessageSquare, Repeat } from "lucide-react";
import { useUsersStore } from "../store/usersStore";
import { usePostStore } from "../store/postStore";
import { useState } from "react";
import { PostRepCmt } from "./PostRepCmt";

interface PostsProps {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}

export const Posts = ({ posts, setPosts }: PostsProps) => {
  const { user } = useUsersStore();

  const { likePost, getPostsByUserName } = usePostStore();

  const handleLike = async (post: PostType) => {
    await likePost(post._id);
    const data = await getPostsByUserName(user?.username || "", 1, 10);
    setPosts(data);
  };

  const [currentPost, setCurrentPost] = useState<PostType | null>(null);
  const [isOpenCmt, setIsOpenCmt] = useState(false);
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
                    <Ellipsis className="size-5" />
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
                  <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                    <Repeat className="size-5" />
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
    </>
  );
};
