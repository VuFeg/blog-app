import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import { DangKy } from "./pages/DangKy";
import { useAuthStore } from "./store/authStore";
import { Header } from "./components/Header";
import Profile from "./components/Profile";
import { DangNhap } from "./pages/DangNhap";
import { useEffect } from "react";
import { PostRepCmt } from "./components/PostRepCmt";
import { TimKiem } from "./components/TimKiem";
import HoatDong from "./components/HoatDong";
import FixHome from "./components/FixHome";
import { usePostStore } from "./store/postStore";
import { CircularProgress } from "@mui/material";

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
                <TimKiem />
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
                <HoatDong />
              </Header>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/profile/fix-home" element={<FixHome />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <DangNhap />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <DangKy />}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <Header>
                <Profile />
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
