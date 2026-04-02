import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
