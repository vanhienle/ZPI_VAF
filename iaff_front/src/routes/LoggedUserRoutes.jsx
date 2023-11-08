import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogged } from "../utils/User/isLoggedApi";
const LoggedUserRoutes = () => {
  return isLogged() ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedUserRoutes;
