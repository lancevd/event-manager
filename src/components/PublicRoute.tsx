import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Prevents logged in users from entering auth pages

interface PublicRouteProps {
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
