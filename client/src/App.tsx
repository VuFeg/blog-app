import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { DangNhap } from "./components/DangNhap";
import { DangKy } from "./components/DangKy";
import XacThucEmail from "./components/XacThucEmail";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

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
  const navigate = useNavigate();

  const { logout, user, checkAuth, token }: any = useAuthStore();

  // checkAuth();

  const handleLogOut = async () => {
    try {
      await logout(user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
              <div>Home</div>
              <button onClick={handleLogOut}>Logout</button>
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
