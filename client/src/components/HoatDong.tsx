import avatar from "../assets/images/avatar.png"
const HoatDong = () => {
    return (
        <div className="flex justify-center h-screen ">
            <div className="bg-white w-[570px] rounded-t-3xl border shadow-lg">
                <div className="flex gap-5 p-5  ">
                    <img src={avatar} alt="" className="w-12 h-12 p-object-cover rounded-full" />
                    <div className=" flex flex-1 border-b pb-3">
                        <div className="flex flex-1 flex-col ">
                            <div className="ml-3 font-bold">
                                wnhu293
                                <span className=' ml-3 opacity-15 font-normal'>18 giờ</span>
                            </div>
                            <div className=' ml-3 opacity-50 font-normal'>Gợi ý theo dõi</div>
                        </div>
                        <button className="border px-4 py-1 rounded-lg font-medium">Theo dõi</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoatDong;
