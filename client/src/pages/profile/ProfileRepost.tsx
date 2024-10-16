import { useEffect, useState } from "react";
import { usePostStore } from "../../store/postStore";
import { PostType } from "../../types/post.type";
import { Posts } from "../../components/Posts";

export const ProfileRepost = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const { getBookmarks, likePost, bookmarkPost } = usePostStore();

  useEffect(() => {
    const fetchDatas = async () => {
      const result = await getBookmarks();
      setPosts(result.map((item) => item.post));
    };

    fetchDatas();
  }, []);

  const handleLike = async (post: PostType) => {
    await likePost(post._id);
    const data = await getBookmarks();
    setPosts(data.map((item) => item.post));
  };

  const handleBookmark = async (post: PostType) => {
    await bookmarkPost(post._id);
    const data = await getBookmarks();
    setPosts(data.map((item) => item.post));
  };

  return (
    <Posts
      posts={posts}
      handleLike={handleLike}
      handleBookmark={handleBookmark}
    />
  );
};
