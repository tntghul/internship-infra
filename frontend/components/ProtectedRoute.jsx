import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Agar token nahi hai → login pe redirect
    return <Navigate to="/" replace />;
  }

  return children; // Agar token hai → children render karo
};

export default ProtectedRoute;