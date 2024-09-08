import React from 'react'
import avatar from "../assets/images/avatar.png"
import { FaInstagram } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';

const Profile = () => {

    return (
        <div className="flex justify-center h-screen ">
            <div className="bg-white w-[770px] rounded-t-3xl border shadow-lg">
                <div className="p-4 mb-4 ">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-3xl font-bold ml-4">Ten</h3>
                            <p className="text-base ml-4">Biet danh</p>
                        </div>
                        <img src={avatar} alt="" className="w-16 h-16 object-cover rounded-full mt-7 mr-4" />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="ml-4 opacity-45">theo doi</span>
                        <FaInstagram className="text-2xl mr-4" />
                    </div>
                </div>
                <div className="p-4 mb-4"> 
                    <button className=" border px-4 py-1 rounded-md w-full font-medium">Chỉnh sửa trang cá nhân</button> 
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