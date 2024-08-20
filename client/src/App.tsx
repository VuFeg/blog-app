import { Route, Routes } from "react-router-dom";

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
          <main>
            <div>Login</div>
          </main>
        }
      />
      <Route
        path="/register"
        element={
          <main>
            <div>Register</div>
          </main>
        }
      />
    </Routes>
  );
};

export default App;
