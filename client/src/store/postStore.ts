import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000/api/post";

export const usePostStore = create((set) => ({
  posts: [],
  error: null,
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  fetchPosts: async () => {
    try {
      set({ isFetching: true });
      const response = await axios.get(`${API_URL}/get-posts`);

      set({ posts: response.data.posts, isFetching: false });
    } catch (error) {
      set({ error: "Error fetching posts", isFetching: false });
    }
  },
}));
