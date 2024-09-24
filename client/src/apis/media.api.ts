import authorizedAxiosInstance from "../utils/authorizedAxios";
import { API_ROOT } from "../utils/constant";

export const uploadMediaApi = async (file: File) => {
  const accessToken = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("image", file as Blob);
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/api/medias/upload-image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.result;
};
