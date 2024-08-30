import React from 'react'
import avatar from "../assets/images/avatar.png"
import { FaInstagram } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';

const Profile = () => {

  return (
    <div className="flex justify-center h-screen ">
        <div className="bg-white w-[570px] rounded-t-3xl border shadow-lg">
            <div className="p-4 mb-4 ">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-3xl font-bold">Ten</h3> 
                        <p className="text-base">Biet danh</p>
                    </div>
                    <img src={avatar} alt="" className="w-12 h-12 object-cover rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="">theo doi</span>
                    <FaInstagram className="text-2xl" /> 
                </div>
            </div>

            <div className="flex justify-between items-center border-b p-4">
                <div className="relative flex-1 text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
                    <span className="hover:underline focus:underline">Thread</span>
                    <div className="absolute right-0 top-0 h-full border-r"></div>
                </div>
                <div className="relative flex-1 text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
                    <span className="hover:underline focus:underline">Thread trả lời</span>
                    <div className="absolute right-0 top-0 h-full border-r"></div>
                </div>
                <div className="flex-1 text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
                    <span className="hover:underline focus:underline">Bài đăng lại</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile