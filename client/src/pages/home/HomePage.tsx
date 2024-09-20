import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { HomeScreen } from "./HomeScreen";
import { usePostStore } from "../../store/postStore";
import { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();
  const { getPosts } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts();
    };

    fetchPosts();
  }, []);

  return <>{isAuthenticated ? <HomeScreen /> : <Navigate to={"/login"} />}</>;
};

export default HomePage;
