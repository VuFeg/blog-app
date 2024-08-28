import avatar from "../assets/images/avatar.png";
import { MdMoreHoriz } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuSendToBack } from "react-icons/lu";
import { RiSendPlaneFill } from "react-icons/ri";

const Post = () => {
  return (
    <div className="flex justify-center h-screen ">
      <div className="bg-white w-[570px] rounded-t-3xl border shadow-lg">
        <div className="flex items-center gap-5 p-4 mb-4 border-b">
          <img
            src={avatar}
            alt=""
            className="w-6 h-6 object-cover rounded-full"
          />
          <input
            className="flex-1 "
            type="text"
            placeholder="Bắt đầu chat ..."
          />
          <button className=" border px-4 py-1 rounded-md">Đăng</button>
        </div>
        <div className="flex flex-1 gap-5 p-4 border-b">
          <div>
            <img src={avatar} alt="" className="w-6" />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex flex-1 justify-between">
              <b>
                <h3>wnhu293</h3>
              </b>
              <p>
                <MdMoreHoriz />
              </p>
            </div>
            <div>
              Bố mẹ cho anh ăn học. ra đường người ta hỏi ước mơ anh làm gì. Anh
              nói"Nhàm nhan nhồ"
            </div>
            <div className="flex gap-8 items-center">
              <IoMdHeartEmpty />
              <p className="flex items-center gap-1 ">
                <BiMessageRounded />
                317
              </p>
              <LuSendToBack />
              <RiSendPlaneFill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
