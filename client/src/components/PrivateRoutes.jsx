import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div class="flex space-x-2">
        <div class="w-3 h-3 bg-white rounded-full animate-bounce"></div>
        <div class="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
