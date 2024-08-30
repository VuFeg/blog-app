import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const XacThucEmail = () => {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const { verifyEmail }: any = useAuthStore();

  const handleChange = (e: any, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      return;
    }
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-red-200 rounded-lg">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl ">
              Xác minh tài khoản của bạn
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <p>Nhập mã gồm 6 chữ số được gửi đến địa chỉ email của bạn.</p>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-7">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) =>
                          (inputRefs.current[index] = el as HTMLInputElement)
                        }
                        className="w-10 h-10 text-center text-2xl border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    ))}
                  </div>
                </form>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XacThucEmail;
