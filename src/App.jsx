import { Login } from "./pages/Login/Login";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useStateValue } from "./StateProvider";
import { ProtectRoute, PublicRoute } from "./ProtectRoutes";

function App() {
  const [{ isLoading }] = useStateValue();
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <LoadingSpinner />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
