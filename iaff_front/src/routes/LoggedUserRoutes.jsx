import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoggedUserRoutes = ({ isLogin }) => {
  return isLogin === null ? (
    <Outlet />
  ) : isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default LoggedUserRoutes;
