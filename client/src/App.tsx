import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import { DangKy } from "./pages/DangKy";
import { useAuthStore } from "./store/authStore";
import { Header } from "./components/Header";
import { DangNhap } from "./pages/DangNhap";
import XacThucEmail from "./pages/XacThucEmail";
import { useEffect } from "react";

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
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <DangNhap />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <DangKy />}
        />
        <Route
          path="/verify-email"
          element={user ? <Navigate to={"/"} /> : <XacThucEmail />}
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
