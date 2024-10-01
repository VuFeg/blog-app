import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useUsersStore } from "../store/usersStore";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && refreshToken) {
    useAuthStore.setState({ isAuthenticated: true });
  } else {
    useAuthStore.setState({ isAuthenticated: false });
  }

  const { getMe } = useUsersStore();

  useEffect(() => {
    const checkMe = async () => {
      await getMe();
    };

    checkMe();
  }, [getMe]);

  return children;
};
