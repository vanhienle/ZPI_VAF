import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isFilledSurvey } from "../utils/User/isFilledSurveyAPI";

const GuestRoutes = () => {
  return isFilledSurvey() ? <Outlet /> : <Navigate to="/" />;
};

export default GuestRoutes;
