
import React from 'react'
import avatar from "../../assets/images/avatar.png";
import { HeartIcon } from 'lucide-react';
import { ArrowPathRoundedSquareIcon, ChatBubbleLeftIcon, EllipsisHorizontalIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ChevronRight } from 'lucide-react';

export const CommentPage = () => {
  return (
    <div className="mx-auto p-8 max-w-2xl h-67 ">
      <div className=" rounded-3xl border ">
        <div>
          <div className="flex gap-5 p-4 ">
            <div className="flex flex-1 gap-5 p-4 border-b">
              <div>
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex flex-1 justify-between items-center font-bold ">
                    <div className='flex gap-4 cursor-pointer'>
                      <div>
                        <img src={avatar} alt="" className="w-6" />
                      </div>
                      wnhu293
                      <span className=" ml-3 opacity-15 font-normal">18 giờ</span>
                    </div>
                    <button className="rounded-full p-1 hover:bg-gray-300">
                      <EllipsisHorizontalIcon className="size-5" />
                    </button>
                  </div>
                  <div>
                    Bố mẹ cho anh ăn học. ra đường người ta hỏi ước mơ anh làm gì.
                    Anh nói"Nhàm nhan nhồ"
                  </div>
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
          </div>
          <div className="flex justify-between ml-8 mr-8 mb-4">
            <div className="flex font-bold ">
              Blog trả lời
            </div>
            <div className="flex opacity-40 cursor-pointer">
              Xem hoạt động
              <ChevronRight />
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col justify-center gap-4 p-4">
          <div className="flex gap-4  ">
            <div className="ml-3 cursor-pointer">
              <img src={avatar} alt="" className="w-6" />
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <div className="flex flex-col ml-3  ">
                <div className="flex flex-1 justify-between">
                  <div className=" flex font-bold cursor-pointer"> 
                    wnhu293
                    <span className=" flex ml-3 opacity-15 font-normal">18 giờ</span>
                  </div>
                  <button className="rounded-full p-1 hover:bg-gray-300">
                    <EllipsisHorizontalIcon className="size-5" />
                  </button>
                </div>
                <div className="flex flex-1">viết bình luận nè</div>
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
          </div>
        </div>
        <hr />
        <div className="flex flex-col justify-center gap-4 p-4">
          <div className="flex gap-4  ">
            <div className="ml-3 cursor-pointer">
              <img src={avatar} alt="" className="w-6" />
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <div className="flex flex-col ml-3  ">
                <div className="flex flex-1 justify-between">
                  <div className=" flex font-bold cursor-pointer"> 
                    wnhu293
                    <span className=" flex ml-3 opacity-15 font-normal">18 giờ</span>
                  </div>
                  <button className="rounded-full p-1 hover:bg-gray-300">
                    <EllipsisHorizontalIcon className="size-5" />
                  </button>
                </div>
                <div className="flex flex-1">viết bình luận nè</div>
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
          </div>
        </div>
      </div>
    </div>
  )
}
