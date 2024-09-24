import { Avatar } from "@mui/material";
import avatar from "../../assets/images/avatar.png";
import { useUsersStore } from "../../store/usersStore";
import { useEffect, useRef, useState } from "react";
import { usePostStore } from "../../store/postStore";
import { uploadMediaApi } from "../../apis/media.api";
import { Hash, Image, MenuIcon } from "lucide-react";

interface ShowCreatePostProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowCreatePost = ({ isOpen, setIsOpen }: ShowCreatePostProps) => {
  const { user } = useUsersStore();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const { createPost, getNewFeeds } = usePostStore();
  const handleCreatePost = async () => {
    const data = await uploadMediaApi(file as File);

    await createPost({
      captions: value,
      medias: data,
    });

    await getNewFeeds();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  const handleFileUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };
  return (
    <>
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
                      placeholder="Có gì mới."
                      onChange={(e) => setValue(e.target.value)}
                      ref={textAreaRef}
                    ></textarea>
                    {file && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-64 object-cover object-center rounded-lg"
                      />
                    )}
                    <div className="flex items-center gap-4">
                      <div onClick={handleFileUploadClick}>
                        <input
                          type="file"
                          id="fileInput"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Image className="size-6 cursor-pointer text-gray-800/50" />
                      </div>
                      <Hash className="size-6 cursor-pointer text-gray-800/50" />
                      <MenuIcon className="size-6 cursor-pointer text-gray-800/50" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <div className="flex-1 text-sm text-gray-500">
                    Bất kỳ ai cũng có thể trả lời và trích dẫn
                  </div>
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
