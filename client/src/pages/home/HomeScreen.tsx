import { useEffect, useState } from "react";
import { NewPost } from "../../components/post/NewPost";
import { Post } from "../../components/post/Post";
import { usePostStore } from "../../store/postStore";
import { PostType } from "../../types/post.type";

export const HomeScreen = () => {
  const { getNewFeeds, posts } = usePostStore();
  const [listPosts, setListPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const handleGetNewFees = async () => {
      await getNewFeeds();
    };

    handleGetNewFees();
  }, []);

  useEffect(() => {
    setListPosts(posts);
  }, [posts]);

  return (
    <div className="max-w-2xl mx-auto my-4">
      <div className="h-full">
        <NewPost />
        <Post listPosts={listPosts} />
      </div>
    </div>
  );
};
