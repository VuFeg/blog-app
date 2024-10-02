import { NewPost } from "../../components/post/NewPost";
import { Post } from "../../components/post/Post";

export const HomeScreen = () => {
  return (
    <div className="max-w-2xl mx-auto my-4 mt-24 md:mt-4">
      <div className="h-full">
        <NewPost />
        <Post />
      </div>
    </div>
  );
};
