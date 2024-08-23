import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { DangNhap } from "./components/DangNhap";
import { DangKy } from "./components/DangKy";
import XacThucEmail from "./components/XacThucEmail";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Post from "./components/Post";
import { Header } from "./components/Header";

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated, user }: any = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};

const RedireAuthenticatedUser = ({ children }: any) => {
  const { isAuthenticated, user }: any = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {

  const { checkAuth, token }: any = useAuthStore();

  

  useEffect(() => {
    checkAuth(token);
  }, [checkAuth]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <main>
              <Header/>
              <Post />
            </main>
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RedireAuthenticatedUser>
            <DangNhap />
          </RedireAuthenticatedUser>
        }
      />
      <Route
        path="/register"
        element={
          <RedireAuthenticatedUser>
            <DangKy />
          </RedireAuthenticatedUser>
        }
      />
      <Route
        path="/verify-email"
        element={
          <RedireAuthenticatedUser>
            <XacThucEmail />
          </RedireAuthenticatedUser>
        }
      />
    </Routes>
  );
};

export default App;
