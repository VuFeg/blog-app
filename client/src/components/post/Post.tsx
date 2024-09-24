import avatar from "../../assets/images/avatar.png";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { PostType } from "../../types/post.type";

interface PostProps {
  listPosts: PostType[];
}

export const Post = ({ listPosts }: PostProps) => {
  return (
    <>
      {listPosts?.map((post) => (
        <div
          key={post._id}
          className="flex flex-col justify-center border-t py-6"
        >
          <div className="flex gap-4 px-4">
            <div className="min-w-[40px]">
              <div className="p-1 rounded-full border cursor-pointer mt-2">
                <Avatar
                  alt="Remy Sharp"
                  src={avatar}
                  sx={{ width: 32, height: 32 }}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex justify-between items-center font-bold">
                <div className="flex gap-2">
                  <Link
                    to={`/profile/${post.user?.username}`}
                    className="cursor-pointer text-md font-semibold"
                  >
                    {post.user?.username}
                  </Link>
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
              <div className="text-md font-normal mr-6">
                {post.captions
                  ?.split("\n")
                  .map((text: string, index: number) => (
                    <span key={index}>
                      {text}
                      <br />
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-4 mx-16">
            <img
              className="h-72 w-full rounded-lg object-cover object-center"
              src={post?.medias[0]?.url}
              alt="nature image"
            />
          </div>
          <div className="flex gap-4 ml-12 md:ml-16 items-center mt-2">
            <button className="rounded-full p-2 hover:bg-gray-300">
              <HeartIcon className="size-5" />
            </button>
            <button className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-300">
              <ChatBubbleLeftIcon className="size-5" />
              <span>{post?.comments?.length || ""}</span>
            </button>
            <button className="rounded-full p-2 hover:bg-gray-300">
              <ArrowPathRoundedSquareIcon className="size-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-300">
              <PaperAirplaneIcon className="size-5" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
