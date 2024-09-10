import { create } from "zustand";
import axios from "axios";

interface PostStore {
  posts: any[];
  getPosting: boolean;
  createPosting: boolean;
  getPosts: () => Promise<void>;
  createPost: (text: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  getPosting: false,
  createPosting: false,

  getPosts: async () => {
    try {
      set({ getPosting: true });
      const response = await axios.get("/api/posts/all");

      console.log(response.data.posts);

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
}));
