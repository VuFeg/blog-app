import { useEffect, useRef, useState } from "react";
import avatar from "../../assets/images/avatar.png";
import { PiImagesSquareLight } from "react-icons/pi";
import { BsFiletypeGif } from "react-icons/bs";
import { GoHash } from "react-icons/go";
import { CgMenuLeft } from "react-icons/cg";
import Avatar from "@mui/material/Avatar";
import { useAuthStore } from "../../store/authStore";
import { usePostStore } from "../../store/postStore";

export const NewPost = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const { user }: any = useAuthStore();
  const { createPost } = usePostStore();

  const handleCreatePost = async () => {
    await createPost(value);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <>
      <div className="flex items-center gap-5 p-4">
        <div className="p-1 rounded-full border cursor-pointer">
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            sx={{ width: 32, height: 32 }}
          />
        </div>
        <p onClick={() => setIsOpen(!isOpen)} className="flex-1 cursor-text">
          Bắt đầu chat...
        </p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="border border-gray-400 px-4 py-1 text-md font-semibold rounded-md shadow-sm transition-all hover:opacity-70"
        >
          Đăng
        </button>
      </div>
      {isOpen && (
        <>
          <div
            className="bg-[#4b4b4b] fixed top-0 left-0 right-0 bottom-0 z-20 opacity-40"
            onClick={() => setIsOpen(!isOpen)}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 max-w-xl w-full ">
            <div className="max-w-xl">
              <h1 className="text-lg text-white font-bold text-center">
                New Post
              </h1>
              <div className="bg-white rounded-lg p-6 z-30 mt-4">
                <div className="flex gap-4">
                  <div>
                    <div className="p-1 rounded-full border cursor-pointer mt-2">
                      <Avatar
                        alt="Remy Sharp"
                        src={avatar}
                        sx={{ width: 32, height: 32 }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <h3 className="text-base font-semibold">
                      {user?.username}
                    </h3>
                    <textarea
                      rows={1}
                      className="w-full focus:outline-none resize-none"
                      placeholder="Bắt đầu nào..."
                      onChange={(e) => setValue(e.target.value)}
                      ref={textAreaRef}
                    ></textarea>
                    <div className="flex items-center gap-4">
                      <PiImagesSquareLight className="size-6 cursor-pointer" />
                      <BsFiletypeGif className="size-6 cursor-pointer" />
                      <GoHash className="size-6 cursor-pointer" />
                      <CgMenuLeft className="size-6 cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <form className="flex-1">
                    <select className="block text-sm text-gray-500 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0 cursor-pointer">
                      <option
                        selected
                        value="Bất kỳ ai cũng có thể trả lời và trích dẫn"
                      >
                        Bất kỳ ai cũng có thể trả lời và trích dẫn
                      </option>
                      <option value="Trang cá nhân mà bạn theo dõi có thể trả lời và trích dẫn">
                        Trang cá nhân mà bạn theo dõi có thể trả lời và trích
                        dẫn
                      </option>
                      <option value="Trang cá nhân mà bạn nhắc đến có thể trả lời và trích dẫn">
                        Trang cá nhân mà bạn nhắc đến có thể trả lời và trích
                        dẫn
                      </option>
                    </select>
                  </form>
                  <button
                    className="bg-[#4b4b4b] text-white px-4 py-2 rounded-md"
                    onClick={handleCreatePost}
                  >
                    Đăng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
