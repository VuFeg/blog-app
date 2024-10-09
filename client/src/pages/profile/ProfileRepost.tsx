import { useEffect, useState } from "react";
import { usePostStore } from "../../store/postStore";
import { PostType } from "../../types/post.type";
import { Posts } from "../../components/Posts";

export const ProfileRepost = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const { getBookmarks } = usePostStore();

  useEffect(() => {
    const fetchDatas = async () => {
      const result = await getBookmarks();
      setPosts(result.map((item) => item.post));
    };

    fetchDatas();
  }, []);

  return <Posts posts={posts} setPosts={setPosts} />;
};
