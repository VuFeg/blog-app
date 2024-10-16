import { useEffect, useState } from "react";
import { usePostStore } from "../../store/postStore";
import { PostType } from "../../types/post.type";
import { Posts } from "../../components/Posts";
import { useNavigate, useParams } from "react-router-dom";
import { useUsersStore } from "../../store/usersStore";

export const ProfileUserRepost = () => {
  const navigate = useNavigate();

  const { username } = useParams<{ username: string }>();
  const [posts, setPosts] = useState<PostType[]>([]);

  const { getBookmarksByUserName, likePost, bookmarkPost } = usePostStore();
  const { user } = useUsersStore();

  useEffect(() => {
    const fetchDatas = async () => {
      if (username) {
        const result = await getBookmarksByUserName(username);
        setPosts(result.map((item) => item.post));
      }
    };

    window.scrollTo(0, 0);

    fetchDatas();
  }, []);

  useEffect(() => {
    if (user.username === username) navigate("/profile/reposts");
  }, []);

  const handleLike = async (post: PostType) => {
    await likePost(post._id);
    if (username) {
      const data = await getBookmarksByUserName(username);
      setPosts(data.map((item) => item.post));
    }
  };

  const handleBookmark = async (post: PostType) => {
    await bookmarkPost(post._id);
    if (username) {
      const data = await getBookmarksByUserName(username);
      setPosts(data.map((item) => item.post));
    }
  };

  return (
    <Posts
      posts={posts}
      handleLike={handleLike}
      handleBookmark={handleBookmark}
    />
  );
};
