import avatar from "../../assets/images/avatar.png";
import { MdMoreHoriz } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuSendToBack } from "react-icons/lu";
import { RiSendPlaneFill } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { usePostStore } from "../../store/postStore";
import { Avatar } from "@mui/material";

export const Post = () => {
  const { posts } = usePostStore();

  return (
    <>
      {posts.map((post: any) => (
        <div className="flex flex-col justify-center border-t py-6">
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
                  <h1 className="cursor-pointer text-md font-semibold">
                    {post?.user?.username}
                  </h1>
                  <span className="opacity-15 font-normal">
                    {formatDistanceToNow(new Date(post?.createdAt), {
                      addSuffix: true,
                      locale: vi,
                    })}
                  </span>
                </div>
                <button className="rounded-full p-1 hover:bg-gray-300">
                  <MdMoreHoriz className="size-5" />
                </button>
              </div>
              <div className="text-md font-normal mr-6">{post?.text}</div>
            </div>
          </div>
          <div className="flex gap-4 ml-12 md:ml-16 items-center mt-2">
            <button className="rounded-full p-2 hover:bg-gray-300">
              <IoMdHeartEmpty className="size-5" />
            </button>
            <button className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-300">
              <BiMessageRounded className="size-5" />
              <span>{post?.comments?.lenght || ""}</span>
            </button>
            <button className="rounded-full p-2 hover:bg-gray-300">
              <LuSendToBack className="size-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-300">
              <RiSendPlaneFill className="size-5" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
