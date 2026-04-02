import { Navigate, useLocation } from "react-router-dom";

export default function RequireGov({ children }) {
  const location = useLocation();
  const govToken = localStorage.getItem("gov_token");

  if (!govToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
