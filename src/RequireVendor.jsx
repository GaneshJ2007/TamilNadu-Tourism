import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireVendor({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("vendor_token");

  if (!token) {
    return <Navigate to="/vendor-login" state={{ from: location }} replace />;
  }

  return children;
}
