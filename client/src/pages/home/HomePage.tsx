import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { HomeScreen } from "./HomeScreen";

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return <HomeScreen />;
};

export default HomePage;
