import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { HomeScreen } from "./HomeScreen";
import { usePostStore } from "../../store/postStore";
import { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();
  const { getNewFeeds } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      await getNewFeeds();
    };

    fetchPosts();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return <HomeScreen />;
};

export default HomePage;
