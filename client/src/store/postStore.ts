import { create } from "zustand";
import { CreatePostBodyReq, PostType } from "../types/post.type";
import { createPostApi, getNewFeedsApi } from "../apis/post.api";

interface PostStore {
  posts: PostType[];
  isGettingNewFeeds: boolean;
  isCreatingPost: boolean;

  getNewFeeds: () => Promise<void>;
  createPost: (post: CreatePostBodyReq) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  isGettingNewFeeds: false,
  isCreatingPost: false,

  getNewFeeds: async () => {
    set({ isGettingNewFeeds: true });
    const data = await getNewFeedsApi();
    set({ posts: data, isGettingNewFeeds: false });
  },

  createPost: async (post: CreatePostBodyReq) => {
    set({ isCreatingPost: true });
    await createPostApi(post);
    set({ isCreatingPost: false });
  },
}));
