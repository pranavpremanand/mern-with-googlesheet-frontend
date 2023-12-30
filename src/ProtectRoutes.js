import { Navigate } from "react-router-dom";

export const ProtectRoute = ({ children }) => {
  if (sessionStorage.getItem("token")) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export const PublicRoute = ({ children }) => {
  if (sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  return children;
};
