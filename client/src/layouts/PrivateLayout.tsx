import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { checkAuth }: any = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  return <>{children}</>;
};
