import Post from "../components/Post";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { user }: any = useAuthStore();
  return <>{user ? <Post /> : <Navigate to={"/login"} />}</>;
};

export default HomePage;
