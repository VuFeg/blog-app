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
