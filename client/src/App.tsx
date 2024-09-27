import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import { Profilepage } from "./pages/profile/ProfilePage";
import { PostRepCmt } from "./components/PostRepCmt";
import FixHome from "./components/FixHome";
import { usePostStore } from "./store/postStore";
import { CircularProgress } from "@mui/material";
import { SearchPage } from "./pages/search/SearchPage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { useAuthStore } from "./store/authStore";
import { CommentPage } from "./pages/comment/CommentPage";
import { NotificationPage } from "./pages/notification/NotificationPage";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const { isCreatingPost } = usePostStore();

  if (isCreatingPost)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateLayout>
              <HomePage />
            </PrivateLayout>
          }
        />
        <Route path="/post-rep-cmt" element={<PostRepCmt />} />
        <Route path="/post-cmt" element={<CommentPage />} />
        <Route
          path="/searchs"
          element={
            <PrivateLayout>
              <SearchPage />
            </PrivateLayout>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateLayout>
              <NotificationPage />
            </PrivateLayout>
          }
        />
        <Route path="/profile/fix-home" element={<FixHome />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to={"/"} /> : <RegisterPage />}
        />
        <Route
          path="/profile"
          element={
            <PrivateLayout>
              <Profilepage />
            </PrivateLayout>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
