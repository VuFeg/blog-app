import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import { Profilepage } from "./pages/profile/ProfilePage";
import { usePostStore } from "./store/postStore";
import { CircularProgress } from "@mui/material";
import { SearchPage } from "./pages/search/SearchPage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { useAuthStore } from "./store/authStore";
import { CommentPage } from "./pages/comment/CommentPage";
import { NotificationPage } from "./pages/notification/NotificationPage";
import { AuthLayout } from "./layouts/AuthLayout";
import { UserProfilePage } from "./pages/profile/UserProfilePage";
import { ProfileLayout } from "./layouts/ProfileLayout";
import { ProfileRepost } from "./pages/profile/ProfileRepost";

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
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={"/"} />
            ) : (
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to={"/"} />
            ) : (
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateLayout>
              <ProfileLayout>
                <Profilepage />
              </ProfileLayout>
            </PrivateLayout>
          }
        />
        <Route
          path="/profile/reposts"
          element={
            <PrivateLayout>
              <ProfileLayout>
                <ProfileRepost />
              </ProfileLayout>
            </PrivateLayout>
          }
        />
        <Route
          path="/:username"
          element={
            <PrivateLayout>
              <UserProfilePage />
            </PrivateLayout>
          }
        />
        <Route
          path="/:username/post/:postId"
          element={
            <PrivateLayout>
              <CommentPage />
            </PrivateLayout>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
