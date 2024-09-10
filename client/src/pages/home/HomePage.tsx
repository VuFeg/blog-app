import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { HomeScreen } from "./HomeScreen";
import { usePostStore } from "../../store/postStore";
import { useEffect } from "react";

const HomePage = () => {
  const { user }: any = useAuthStore();
  const { getPosts } = usePostStore();
  useEffect(() => {
    getPosts();
  }, []);
  return <>{user ? <HomeScreen /> : <Navigate to={"/login"} />}</>;
};

export default HomePage;
