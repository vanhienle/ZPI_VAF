import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { isLogged } from "../utils/User/isLoggedAPI";

const LoggedUserRoutes = () => {
  return isLogged() ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedUserRoutes;
