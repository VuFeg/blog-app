import { HeartIcon } from "lucide-react";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
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
              <img src={"/avatar.png"} alt="" className="w-6" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-1 justify-between font-bold">
                <div>
                  wnhu293
                  <span className=" ml-3 opacity-15 font-normal">18 giờ</span>
                </div>
                <button className="hover:rounded-full p-2 hover:bg-gray-300 ...">
                  <EllipsisHorizontalIcon className="size-5" />
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
              <img src={"/avatar.png"} alt="" className="w-6" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-1 justify-between font-bold">
                zuduong
                <p>
                  {" "}
                  <button className="hover:rounded-full p-2  hover:bg-gray-300">
                    <EllipsisHorizontalIcon className="size-5" />
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
              <div className="flex gap-4 mt-2">
                <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                  <HeartIcon className="size-5" />
                </button>
                <button className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-300 opacity-50">
                  <ChatBubbleLeftIcon className="size-5" />
                </button>
                <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                  <ArrowPathRoundedSquareIcon className="size-5" />
                </button>
                <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                  <PaperAirplaneIcon className="size-5" />
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
