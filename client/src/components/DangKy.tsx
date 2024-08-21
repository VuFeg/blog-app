import React from 'react'

export const DangKy = () => {
    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 sm:p-8">
                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl ">
                            Đăng ký
                        </h1>
                        <form className="space-y-4" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium ">Tên tài khoản</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="ntqn293" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium ">Email</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="ntqn293@gmail.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium ">Mật khẩu</label>
                                <input type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium ">Nhập lại mật khẩu</label>
                                <input type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">Tôi đồng ý với <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Điều Khoản và Điều Khiện</a></label>
                                </div>
                            </div>

                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng Ký</button>
                            <p className="text-sm font-light text-gray-500 ">
                                Bạn đã có tài khoản? <a href="#" className="font-medium text-primary-600 hover:underline ">Đăng Nhập</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
