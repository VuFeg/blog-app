import { useEffect, useState } from "react";
import { NewPost } from "../../components/post/NewPost";
import { Post } from "../../components/post/Post";
import { usePostStore } from "../../store/postStore";
import { PostType } from "../../types/post.type";

export const HomeScreen = () => {
  const { getNewFeeds } = usePostStore();
  const [listPosts, setListPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const handleGetNewFees = async () => {
      const posts = await getNewFeeds();
      setListPosts(posts);
    };

    handleGetNewFees();
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-4">
      <div className="h-full">
        <NewPost />
        <Post listPosts={listPosts} />
      </div>
    </div>
  );
};
