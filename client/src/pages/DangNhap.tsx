import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const DangNhap = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { login }: any = useAuthStore();

  const handleLogIn = async (e: any) => {
    e.preventDefault();

    try {
      await login({ username, password });
      if (remember) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    const storedPassword = localStorage.getItem("password") || "";

    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl ">
              Đăng nhập
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleLogIn}
            >
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  Tên tài khoản
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  "
                >
                  Mật khẩu
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      onChange={(e) => setRemember(e.target.checked)}
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Ghi nhớ mật khẩu
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  <Link
                    to={"/quen-mat-khau"}
                    className="text-sm font-medium text-primary-600 hover:underline "
                  >
                    Quên mật khẩu?
                  </Link>
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Đăng nhập
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Bạn chưa có tài khoản?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline "
                >
                  Đăng Ký
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
