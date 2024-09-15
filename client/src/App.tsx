import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import { useAuthStore } from "./store/authStore";
import { Header } from "./components/Header";
import { Profilepage } from "./pages/profile/ProfilePage";
import { useEffect } from "react";
import { PostRepCmt } from "./components/PostRepCmt";
import FixHome from "./components/FixHome";
import { usePostStore } from "./store/postStore";
import { CircularProgress } from "@mui/material";
import { SearchPage } from "./pages/search/SearchPage";
import { SuggestPage } from "./pages/suggest/SuggestPage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";

const App = () => {
  const { user, checkAuth }: any = useAuthStore();
  const { createPosting } = usePostStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (createPosting)
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
            <Header>
              <HomePage />
            </Header>
          }
        />
        <Route path="/post-rep-cmt" element={<PostRepCmt />} />
        <Route
          path="/tim-kiem"
          element={
            user ? (
              <Header>
                <SearchPage />
              </Header>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/hoat-dong"
          element={
            user ? (
              <Header>
                <SuggestPage />
              </Header>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/profile/fix-home" element={<FixHome />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <RegisterPage />}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <Header>
                <Profilepage />
              </Header>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
