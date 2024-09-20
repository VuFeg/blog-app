import { create } from "zustand";
import axios from "axios";
import { API_ROOT } from "../utils/constant";

interface PostStore {
  posts: any[];
  getPosting: boolean;
  createPosting: boolean;
  getPosts: () => Promise<void>;
  createPost: (text: string) => Promise<void>;
  getProfile: (username: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  getPosting: false,
  createPosting: false,

  getPosts: async () => {
    try {
      set({ getPosting: true });
      const response = await axios.get(`/api/posts/all`);

      set({ posts: response.data.posts, getPosting: false });
    } catch (error) {
      set({ getPosting: false, posts: [] });
    }
  },
  createPost: async (text: string) => {
    try {
      set({ createPosting: true });
      const response = await axios.post("/api/posts/create", { text });

      set((state) => ({ posts: [response.data.post, ...state.posts] }));
      set({ createPosting: false });
    } catch (error) {
      set({ createPosting: false });
    }
  },
  getProfile: async (username: string) => {
    try {
      const response = await axios.get(`/api/posts/user/${username}`);
      console.log(response.data);

      set({ posts: response.data.posts });
    } catch (error) {}
  },
}));
