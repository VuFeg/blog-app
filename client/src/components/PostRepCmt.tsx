import avatar from "../assets/images/avatar.png";
import { MdMoreHoriz } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import { MdOutlineGifBox } from "react-icons/md";
import { RxFrame } from "react-icons/rx";
import { RxFileText } from "react-icons/rx";

export const PostRepCmt = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <div className="text-2xl mb-4 font-bold ">
        <h3>Blog trả lời</h3>
      </div>
      <div className="flex justify-center  ">
        <div className="bg-white rounded-3xl border shadow-lg">
          <div className="flex flex-1 gap-5 p-4 border-b">
            <div>
              <img src={avatar} alt="" className="w-6" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-1 justify-between font-bold">
                <div>
                  wnhu293
                  <span className=" ml-3 opacity-15 font-normal">18 giờ</span>
                </div>
                <button className="hover:rounded-full p-2 hover:bg-gray-300 ...">
                  <MdMoreHoriz />
                </button>
              </div>
              <div>
                Bố mẹ cho anh ăn học. ra đường người ta hỏi ước mơ anh làm gì.
                Anh nói"Nhàm nhan nhồ"
              </div>
            </div>
          </div>
          <div className="flex flex-1 gap-5 p-4 border-b">
            <div>
              <img src={avatar} alt="" className="w-6" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-1 justify-between font-bold">
                zuduong
                <p>
                  {" "}
                  <button className="hover:rounded-full p-2  hover:bg-gray-300">
                    <MdMoreHoriz />
                  </button>
                </p>
              </div>
              <div className="flex">
                <input
                  className="flex-1 outline-none"
                  type="text"
                  placeholder="Trả lời wnhu..."
                />
              </div>
              <div className="flex gap-8 items-center opacity-30 ">
                <button className="hover:rounded-full p-2  hover:bg-gray-300">
                  <ImFilePicture />
                </button>
                <button className="hover:rounded-full p-2  hover:bg-gray-300">
                  <MdOutlineGifBox />
                </button>
                <button className="hover:rounded-full p-2  hover:bg-gray-300">
                  <RxFrame />
                </button>
                <button className="hover:rounded-full p-2  hover:bg-gray-300">
                  <RxFileText />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 p-4 mb-4 border-b cursor-pointer justify-between">
            <span className="opacity-60">
              Bất kỳ ai cũng có thể trả lời và trích dẫn
            </span>
            <button className=" border px-4 py-1 rounded-md">Đăng</button>
          </div>
        </div>
      </div>
    </div>
  );
};
