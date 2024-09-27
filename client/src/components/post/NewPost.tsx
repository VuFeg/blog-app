import { useState } from "react";
import avatar from "../../assets/images/avatar.png";
import Avatar from "@mui/material/Avatar";
import { ShowCreatePost } from "./ShowCreatePost";

export const NewPost = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-5 p-4 border rounded-xl my-4 bg-white shadow-lg">
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
      <ShowCreatePost isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
