import { useEffect, useState } from "react";
import { NewPost } from "../../components/post/NewPost";
import { Posts } from "../../components/Posts";
import { usePostStore } from "../../store/postStore";
import { PostType } from "../../types/post.type";

export const HomeScreen = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);

  const { getNewFeeds, likePost, bookmarkPost, getBookmarks } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getNewFeeds(page);
      setPosts(data);
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        document.documentElement.scrollTop + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (currentScroll >= documentHeight - 10) {
        setPage(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = async (post: PostType) => {
    await likePost(post._id);
    const data = await getNewFeeds(page);
    setPosts(data);
  };

  const handleBookmark = async (post: PostType) => {
    await bookmarkPost(post._id);
    await getBookmarks();
    const data = await getNewFeeds(page);
    setPosts(data);
  };

  return (
    <div className="max-w-2xl mx-auto my-4 mt-24 md:mt-4">
      <div className="h-full">
        <NewPost page={page} />
        <div className="bg-white border rounded-t-lg shadow-md">
          <Posts
            posts={posts}
            handleLike={handleLike}
            handleBookmark={handleBookmark}
          />
        </div>
      </div>
    </div>
  );
};
