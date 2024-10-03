import { create } from "zustand";
import {
  CommentType,
  CreatePostBodyReq,
  MediaType,
  PostType,
} from "../types/post.type";
import axios from "axios";
import { API_ROOT } from "../utils/constant";

interface PostStore {
  posts: PostType[];
  isGettingNewFeeds: boolean;
  isCreatingPost: boolean;
  likingPost: boolean;
  deletingPost: boolean;
  gettingPostsByUserName: boolean;
  gettingPost: boolean;
  gettingComments: boolean;
  commentingPost: boolean;

  getNewFeeds: () => Promise<PostType[]>;
  createPost: (post: CreatePostBodyReq) => Promise<void>;
  likePost: (post_id: string) => Promise<void>;
  deletePost: (post_id: string) => Promise<void>;
  uploadMedia: (file: File) => Promise<MediaType[]>;
  getPostsByUserName: (
    username: string,
    page: Number,
    limit: Number
  ) => Promise<PostType[]>;
  getPost: (postId: string) => Promise<PostType>;
  getComments: (postId: string) => Promise<CommentType[]>;
  commentPost: (postId: string, comment: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  isGettingNewFeeds: false,
  isCreatingPost: false,
  likingPost: false,
  deletingPost: false,
  gettingPostsByUserName: false,
  gettingPost: false,
  gettingComments: false,
  commentingPost: false,

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

  getPostsByUserName: async (username: string, page: Number, limit: Number) => {
    try {
      set({ gettingPostsByUserName: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${API_ROOT}/api/posts/new-feeds/${username}`,
        {
          params: {
            page,
            limit,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      set({ gettingPostsByUserName: false });
      return res.data.result;
    } catch (error) {
      set({ gettingPostsByUserName: false });
    }
  },

  getPost: async (post_id: string) => {
    try {
      set({ gettingPost: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_ROOT}/api/posts/${post_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ gettingPost: false });
      return res.data.result;
    } catch (error) {
      set({ gettingPost: false });
    }
  },

  getComments: async (post_id: string) => {
    try {
      set({ gettingComments: true });
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_ROOT}/api/posts/comments/${post_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ gettingComments: false });
      return res.data.result;
    } catch (error) {
      set({ gettingComments: false });
    }
  },

  commentPost: async (post_id: string, content: string) => {
    try {
      set({ commentingPost: true });
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `${API_ROOT}/api/posts/comment/${post_id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      set({ commentingPost: false });
    } catch (error) {
      set({ commentingPost: false });
    }
  },
}));
