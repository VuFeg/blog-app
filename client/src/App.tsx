import { Route, Routes, useNavigate } from "react-router-dom";
import { DangNhap } from "./components/DangNhap";
import { DangKy } from "./components/DangKy";
import XacThucEmail from "./components/XacThucEmail";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

// const ProtectedRoute = ({ children }: any) => {
//   const navigate = useNavigate();
//   const { isAuthenticated, user }: any = useAuthStore();

//   if (!isAuthenticated) {
//     navigate("/login");
//   }

//   if (!user.isVerified) {
//     navigate("/verify-email");
//   }

//   return children;
// };

// const RedireAuthenticatedUser = ({ chilren }: any) => {
//   const navigate = useNavigate();
//   const { isAuthenticated, user }: any = useAuthStore();

//   if (isAuthenticated && user.isVerified) {
//     navigate("/");
//   }

//   return chilren;
// };

const App = () => {
  const navigate = useNavigate();

  const { logout, checkAuth }: any = useAuthStore();

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <main>
            <div>Home</div>
            <button onClick={handleLogOut}>Logout</button>
          </main>
          // </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          // <RedireAuthenticatedUser>
          <DangNhap />
          // </RedireAuthenticatedUser>
        }
      />
      <Route
        path="/register"
        element={
          // <RedireAuthenticatedUser>
          <DangKy />
          // </RedireAuthenticatedUser>
        }
      />
      <Route
        path="/verify-email"
        element={
          // <RedireAuthenticatedUser>
          <XacThucEmail />
          // </RedireAuthenticatedUser>
        }
      />
    </Routes>
  );
};

export default App;
