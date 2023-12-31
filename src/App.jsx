import { Login } from "./pages/Login/Login";
import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Signup } from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useStateValue } from "./StateProvider";
import {
  AdminProtectRoute,
  PublicRoute,
  UserProtectRoute,
} from "./ProtectRoutes";
import AdminHome from "./pages/AdminHome/AdminHome";
import { useEffect } from "react";
import { getUserData } from "./utils/apiCalls";

function App() {
  const [{ isLoading }, dispatch] = useStateValue();
  const { pathname } = useLocation();

  // check user blocked status
  const checkUserStatus = async () => {
    try {
      const response = await getUserData();
      if (response.data.data.isBlocked) {
        dispatch({ type: "SET_BLOCKED_TEXT_SHOW" });
      }
    } catch (err) {
      // handle error
      console.log(err);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, [pathname]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <LoadingSpinner />}
      <Routes>
        <Route
          path="/"
          element={
            <UserProtectRoute>
              <Home />
            </UserProtectRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtectRoute>
              <AdminHome />
            </AdminProtectRoute>
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
    </>
  );
}

export default App;
