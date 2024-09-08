import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import { DangKy } from "./pages/DangKy";
import { useAuthStore } from "./store/authStore";
import { Header } from "./components/Header";
  import Profile from "./components/Profile";
import { DangNhap } from "./pages/DangNhap";
import XacThucEmail from "./pages/XacThucEmail";
import { useEffect } from "react";
import { PostRepCmt } from "./components/PostRepCmt";
import { TimKiem } from "./components/TimKiem";
import HoatDong from "./components/HoatDong";
import FixHome from "./components/FixHome";

const App = () => {
  const { user, checkAuth, isVerified }: any = useAuthStore();
  console.log(isVerified);

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post-rep-cmt" element={<PostRepCmt />} />
        <Route path="/tim-kiem" element={<TimKiem />} />
        <Route path="/hoat-dong" element={<HoatDong />} />
        <Route path="/profile/fix-home" element={<FixHome />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <DangNhap />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <DangKy />}
        />
        {/* <Route
          path="/verify-email"
          element={user ? <Navigate to={"/"} /> : <XacThucEmail />}
        /> */}
         <Route 
        path="/profile"
        element= {
          <Profile/>
        }
      />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
