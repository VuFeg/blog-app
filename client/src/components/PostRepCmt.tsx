import React from 'react'
import { usePostStore } from "../store/postStore";
import avatar from "../assets/images/avatar.png"
import { MdMoreHoriz } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuSendToBack } from "react-icons/lu";
import { RiSendPlaneFill } from "react-icons/ri";
import { ImFilePicture } from "react-icons/im";
import { MdOutlineGifBox } from "react-icons/md";
import { RxFrame } from "react-icons/rx";
import { RxFileText } from "react-icons/rx";



export const PostRepCmt = () => {
    return (
        <div className="flex justify-center  ">
            <div className= " flex justify-center mt-24 ">Blog trả lời</div>
            <div className="bg-white rounded-3xl border shadow-lg mt-32">
                <div className="flex flex-1 gap-5 p-4 border-b">
                    <div>
                        <img src={avatar} alt="" className="w-6" />
                    </div>
                    <div className="flex flex-1 flex-col gap-3">
                        <div className="flex flex-1 justify-between">
                            <b><h3>wnhu293</h3></b>
                            <p><MdMoreHoriz /></p>
                        </div>
                        <div>Bố mẹ cho anh ăn học. ra đường người ta hỏi ước mơ anh làm gì. Anh nói"Nhàm nhan nhồ"</div>

                    </div>
                </div>
                <div className="flex flex-1 gap-5 p-4 border-b">
                    <div>
                        <img src={avatar} alt="" className="w-6" />
                    </div>
                    <div className="flex flex-1 flex-col gap-3">
                        <div className="flex flex-1 justify-between">
                            <b><h3>zuduong</h3></b>
                            <p><MdMoreHoriz /></p>
                        </div>
                        <div>
                            <input className="flex-1 " type="text" placeholder="Trả lời wnhu..." />
                        </div>
                        <div className="flex gap-8 items-center">
                            <ImFilePicture />
                            <p className="flex items-center gap-1 "><MdOutlineGifBox />
                            </p>
                            <RxFrame />
                            <RxFileText />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-4 mb-4 border-b">
                    <input className="flex-1 " type="text" placeholder="Bất kỳ ai cũng có thể trả lời và trích dẫn" />
                    <button className=" border px-4 py-1 rounded-md">Đăng</button>
                </div>
            </div>
        </div>

    )
}
