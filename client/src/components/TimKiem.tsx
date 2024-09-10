import React from "react";
import avatar from "../assets/images/avatar.png";

export const TimKiem = () => {
  return (
    <div className="flex justify-center h-screen ">
      <div className="bg-white w-[770px] rounded-t-3xl border shadow-lg">
        <div className="w-full p-6 rounded-lg">
          <div className="relative">
            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 12A6.65 6.65 0 1 1 12 5.35a6.65 6.65 0 0 1 4.65 6.65z"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="bg-gray-100 w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none  "
            />
          </div>
        </div>
        <div className="ml-6 opacity-30">
          <b>Gợi ý theo dõi</b>
        </div>
        <div className="flex gap-5 p-5  ">
          <img
            src={avatar}
            alt=""
            className="w-12 h-12 p-object-cover rounded-full"
          />
          <div className=" flex flex-1 border-b pb-3">
            <div className="flex flex-1 flex-col ">
              <div className="ml-3 font-bold">wnhu293</div>
              <div className=" ml-3 opacity-50 font-normal">Quỳnh Như</div>
              <div className="ml-3 mt-2">41 người theo dõi</div>
            </div>
            <button className="border px-4 py-1 w-28 h-9 flex justify-center rounded-lg font-medium">
              Theo dõi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
