import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Prevents non logged in users from entering the dashboard

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
