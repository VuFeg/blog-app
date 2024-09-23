import toast from "react-hot-toast";
import { LoginReqBody, RegisterReqBody } from "../types/auth.type";
import authorizedAxiosInstance from "../utils/authorizedAxios";
import { API_ROOT } from "../utils/constant";

export const loginApi = async (body: LoginReqBody) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/api/auth/login`,
    body
  );

  localStorage.setItem("accessToken", res.data.result.accessToken);
  localStorage.setItem("refreshToken", res.data.result.refreshToken);

  toast.success(res.data.message);
};

export const registerApi = async (body: RegisterReqBody) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/api/auth/register`,
    body
  );

  localStorage.setItem("accessToken", res.data.result.accessToken);
  localStorage.setItem("refreshToken", res.data.result.refreshToken);

  toast.success(res.data.message);
};

export const logoutApi = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/api/auth/logout`,
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  toast.success(res.data.message);
};
