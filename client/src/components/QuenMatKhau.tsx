import { Link } from "react-router-dom";

export const QuenMatKhau = () => {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl ">
              Quên mật khẩu
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="border-solid bg-stone-100 border-l-4 border-indigo-500">
                <h3 className="mr-2 ml-2">
                  Vui lòng điền username hoặc địa chỉ email của bạn. Bạn sẽ nhận
                  được một email và hướng dẫn khôi phục mật khẩu.
                </h3>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  Tên tài khoản hoặc Email
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Lấy lại mật khẩu
                </button>
              </div>
              <div className="flex items-center gap-2">
                {/* <FaArrowRight className="w-3" /> */}
                <p className=" font-light ">
                  Quay lại{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
