import avatar from "../assets/images/avatar.png";

function FixHome() {
  return (
    <div className="h-screen flex flex-col justify-center items-center  ">
      <div className="flex justify-center  ">
        <div className="bg-white w-[540px] pb-6 rounded-3xl border shadow-lg ">
          <div className="flex p-4">
            <div className="flex flex-1 flex-col border-b pb-2">
              <div className="font-medium">Tên</div>
              <div>
                <button className="hover:rounded-full p-2  hover:bg-gray-300">
                  icon
                </button>
                <span>tên tài khoản</span>
              </div>
            </div>
            <div>
              <img src={avatar} alt="" className="w-11" />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-1 flex-col ml-4 mr-4 border-b pb-2">
              <div className="font-medium">Tiểu sử</div>
              <div className="opacity-45">+ Viết tiểu sử</div>
            </div>
          </div>
          <div className="flex mt-3">
            <div className="flex flex-1 flex-col ml-4 mr-4 border-b pb-2">
              <div className="font-medium">Liên kết</div>
              <div className="opacity-45">+ Viết liên kết</div>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <div className="font-medium ml-4 ">Trang cá nhân riêng tư</div>
            <span className="relative p-4">
              <div className="pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5">
                <div className="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out" />
              </div>
              <div className="z-0">
                <div className="absolute -top-full bottom-2/3 left-0 w-px bg-slate-900/[0.2] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]" />
              </div>
            </span>
          </div>
          <div className="text-center ">
            <button className="bg-black text-white w-5/6 center border px-4 py-1 pb-3 rounded-md">
              Xong
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FixHome;
