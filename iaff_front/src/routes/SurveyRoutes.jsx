import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isFilledSurvey } from "../utils/Survey/isFilledSurveyAPI";

const SurveyRoutes = () => {
  return isFilledSurvey() ? <Outlet /> : <Navigate to="/" />;
};

export default SurveyRoutes;
