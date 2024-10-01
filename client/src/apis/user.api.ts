import authorizedAxiosInstance from "../utils/authorizedAxios";
import { API_ROOT } from "../utils/constant";

export const getMeApi = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.get(`${API_ROOT}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data.result;
};

export const getUserSuggestsApi = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/api/users/suggests`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.result;
};

export const followUserApi = async (userId: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/api/users/follow`,
    { followed_user_id: userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.result;
};

export const searchUserApi = async (keyword: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/api/users/search/${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.result;
};

export const updateProfileApi = async (data: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.put(`${API_ROOT}/api/users`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data.result;
};
