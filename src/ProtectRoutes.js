import { Navigate } from "react-router-dom";

export const UserProtectRoute = ({ children }) => {
  if (sessionStorage.getItem("token")) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export const AdminProtectRoute = ({ children }) => {
  if (sessionStorage.getItem("adminToken")) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export const PublicRoute = ({ children }) => {
  if (sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  } else if (sessionStorage.getItem("adminToken")) {
    return <Navigate to={"/admin"} />;
  }
  return children;
};
