import { Avatar, Modal } from "@mui/material";
import { Hash, Image, MenuIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CommentType, PostType } from "../types/post.type";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useUsersStore } from "../store/usersStore";
import { usePostStore } from "../store/postStore";

interface PostRepCmtProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  post: PostType;
  setComments?: (comments: CommentType[]) => void;
}

export const PostRepCmt = ({
  open,
  setOpen,
  post,
  setComments,
}: PostRepCmtProps) => {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useUsersStore();
  const { commentPost, getComments } = usePostStore();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleComment = async () => {
    await commentPost(post._id, value);
    setOpen(false);
    const data = await getComments(post._id);
    if (setComments) {
      setComments(data);
    }
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="absolute top-0 left-0 right-0 bottom-0 md:right-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full">
        <div className="md:max-w-xl flex flex-col h-full mx-auto bg-white md:border md:rounded-xl py-4">
          <div className="flex justify-between items-center px-6 border-b pb-4 border-black/50">
            <div
              className="text-md cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Hủy
            </div>
            <h3 className="text-black font-bold">Blog trả lời</h3>
            <div className="w-7"></div>
          </div>
          <div className="flex gap-3 mx-6 mt-4">
            <div className="flex items-center flex-col mt-3">
              <Avatar sx={{ width: 36, height: 36 }} src={post?.user?.avatar} />
              <div className="w-[2px] h-full bg-black/30 mt-2 rounded-lg"></div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">
                  {post?.user?.username}
                </h3>
                <p className="text-sm font-medium text-gray-400">
                  {formatDistanceToNow(new Date(post?.created_at ?? ""), {
                    addSuffix: true,
                    locale: vi,
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {post?.captions
                  ?.split("\n")
                  .map((text: string, index: number) => (
                    <span key={index}>
                      {text}
                      <br />
                    </span>
                  ))}
              </div>
              <img
                src={post?.medias[0]?.url}
                alt=""
                className="h-72 max-w-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-3 mx-6 mt-4">
            <Avatar sx={{ width: 36, height: 36 }} src={user?.avatar} />
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="text-base font-semibold">{user?.username}</h3>
              <textarea
                rows={1}
                className="w-full focus:outline-none resize-none"
                placeholder={`Trả lời ${post?.user?.username}...`}
                onChange={(e) => setValue(e.target.value)}
                ref={textAreaRef}
              ></textarea>
              <div className="flex items-center gap-4 mt-2">
                <Image className="size-5 cursor-pointer text-gray-800/50" />
                <Hash className="size-5 cursor-pointer text-gray-800/50" />
                <MenuIcon className="size-5 cursor-pointer text-gray-800/50" />
              </div>
            </div>
          </div>

          <div className="flex flex-1 justify-between md:items-center items-end mx-8 my-4">
            <div className="flex-1 text-sm text-gray-500 mt-4">
              Bất kỳ ai cũng có thể trả lời và trích dẫn
            </div>
            <button
              className="bg-[#4b4b4b] text-white px-4 py-2 rounded-md"
              onClick={handleComment}
            >
              Đăng
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
