import { useEffect } from "react";
import { usePostStore } from "../store/postStore";

const Post = () => {
  const { fetchPosts, posts }: any = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <div>
      {posts.map((post: any) => (
        <div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
