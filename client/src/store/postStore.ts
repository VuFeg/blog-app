import { create } from "zustand";
import { CreatePostBodyReq, MediaType, PostType } from "../types/post.type";
import axios from "axios";
import { API_ROOT } from "../utils/constant";

interface PostStore {
  posts: PostType[];
  isGettingNewFeeds: boolean;
  isCreatingPost: boolean;
  likingPost: boolean;
  deletingPost: boolean;

  getNewFeeds: () => Promise<PostType[]>;
  createPost: (post: CreatePostBodyReq) => Promise<void>;
  likePost: (post_id: string) => Promise<void>;
  deletePost: (post_id: string) => Promise<void>;
  uploadMedia: (file: File) => Promise<MediaType[]>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  isGettingNewFeeds: false,
  isCreatingPost: false,
  likingPost: false,
  deletingPost: false,

  getNewFeeds: async () => {
    try {
      set({ isGettingNewFeeds: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_ROOT}/api/posts/new-feeds`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: 1,
          limit: 10,
        },
      });
      set({ posts: res.data.result, isGettingNewFeeds: false });
      return res.data.result;
    } catch (error) {
      set({ isGettingNewFeeds: false, posts: [] });
    }
  },

  createPost: async (post: CreatePostBodyReq) => {
    try {
      set({ isCreatingPost: true });
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`${API_ROOT}/api/posts`, post, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ isCreatingPost: false });
    } catch (error) {
      set({ isCreatingPost: false });
    }
  },

  likePost: async (post_id: string) => {
    try {
      set({ likingPost: true });
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `${API_ROOT}/api/posts/like/${post_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      set({ likingPost: false });
    } catch (error) {
      set({ likingPost: false });
    }
  },

  deletePost: async (post_id: string) => {
    try {
      set({ deletingPost: true });
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`${API_ROOT}/api/posts/${post_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ deletingPost: false });
    } catch (error) {
      set({ deletingPost: false });
    }
  },

  uploadMedia: async (file: File) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("image", file as Blob);
      const res = await axios.post(
        `${API_ROOT}/api/medias/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return res.data.result;
    } catch (error) {}
  },
}));
