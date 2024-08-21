import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const XacThucEmail = () => {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const { verifyEmail }: any = useAuthStore();
  console.log(code.join(""));
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

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-5">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
              className="w-10 h-10 text-center text-2xl border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
          <button>Đăng ký</button>
        </div>
      </form>
    </div>
  );
};

export default XacThucEmail;
