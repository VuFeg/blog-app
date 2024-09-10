import { NewPost } from "../../components/post/NewPost";
import { Post } from "../../components/post/Post";

export const HomeScreen = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-t-3xl border shadow-lg mx-4 md:mx-0 h-full">
        <NewPost />
        <Post />
      </div>
    </div>
  );
};
