import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "./toast";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

  useEffect(() => {
    if (!token) {
      toast.warning("Please login to continue");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;


