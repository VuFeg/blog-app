import { CreatePostBodyReq } from "../types/post.type";
import authorizedAxiosInstance from "../utils/authorizedAxios";
import { API_ROOT } from "../utils/constant";

export const createPostApi = async (post: CreatePostBodyReq) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/api/posts`,
    post,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.result;
};

export const getNewFeedsApi = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/api/posts/new-feeds`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: 1,
        limit: 10,
      },
    }
  );

  return res.data.result;
};

export const unLikeAndLikePostApi = async (post_id: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/api/posts/like/${post_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.result;
};

export const deletePostApi = async (post_id: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await authorizedAxiosInstance.delete(
    `${API_ROOT}/api/posts/${post_id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.result;
};
