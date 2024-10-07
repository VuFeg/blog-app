import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchema } from "../../schema/auth.schema";
import { LoginRegisterSkeleton } from "../../components/skeleton/LoginRegisterSkeleton";
import { UserPlus } from "lucide-react";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const { register: registerUser, isRegistering } = useAuthStore();

  const handleRegister = async (data: RegisterSchema) => {
    await registerUser(data);
  };

  if (isRegistering) {
    return <LoginRegisterSkeleton />;
  }

  return (
    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-2xl xl:text-3xl font-extrabold text-[#6d68e8]">
          Tạo tài khoản
        </h1>
        <div className="w-full flex-1 mt-8">
          <form
            className="mx-auto max-w-xs"
            noValidate
            onSubmit={handleSubmit(handleRegister)}
          >
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              {...register("username")}
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              {...register("name")}
              type="text"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              {...register("email")}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
            <div className="flex items-start mt-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  Tôi đồng ý với các{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Điều khoản và Điều kiện
                  </a>
                </label>
              </div>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500">{errors.acceptTerms.message}</p>
            )}
            <button
              disabled={isRegistering}
              className={`${isRegistering ? "cursor-not-allowed" : ""
                } mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
            >
              <UserPlus className="w-6 h-6 -ml-2" />
              <span className="ml-3">Đăng ký</span>
            </button>
          </form>
          <div className="mx-auto max-w-xs">
            <p className="mt-6 text-sm text-gray-600 text-center">
              Bạn đã có tài khoản?{" "}
              <Link
                to="/login"
                className="hover:border-b hover:opacity-80 border-[#6d68e8]/80 text-[#6d68e8] font-bold"
              >
                Đăng nhập ở đây
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 