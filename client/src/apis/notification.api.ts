import authorizedAxiosInstance from "../utils/authorizedAxios";
import { API_ROOT } from "../utils/constant";

export const getNotificationsApi = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/api/notifications`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.result;
};
