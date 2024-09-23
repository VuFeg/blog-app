import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import { Header } from "./components/Header";
import { Profilepage } from "./pages/profile/ProfilePage";
import { PostRepCmt } from "./components/PostRepCmt";
import FixHome from "./components/FixHome";
import { usePostStore } from "./store/postStore";
import { CircularProgress } from "@mui/material";
import { SearchPage } from "./pages/search/SearchPage";
import { SuggestPage } from "./pages/suggest/SuggestPage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { useAuthStore } from "./store/authStore";
import { CommentPage } from "./pages/comment/CommentPage";

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
              <Header>
                <HomePage />
              </Header>
            </PrivateLayout>
          }
        />
        <Route path="/post-rep-cmt" element={<PostRepCmt />} />
        <Route path="/post-cmt" element={<CommentPage />} />
        <Route
          path="/tim-kiem"
          element={
            <PrivateLayout>
              <Header>
                <SearchPage />
              </Header>
            </PrivateLayout>
          }
        />
        <Route
          path="/hoat-dong"
          element={
            <PrivateLayout>
              <Header>
                <SuggestPage />
              </Header>
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
          path="/profile/"
          element={
            <PrivateLayout>
              <Header>
                <Profilepage />
              </Header>
            </PrivateLayout>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
