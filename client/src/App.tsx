import { Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
import { DangKy } from "./components/DangKy";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <div>Home</div>
          </main>
        }
      />
      <Route
        path="/login"
        element={
          <LogIn/>
        }
      />
      <Route
        path="/register"
        element={
          <DangKy/>
        }
      />
    </Routes>
  );
};

export default App;
