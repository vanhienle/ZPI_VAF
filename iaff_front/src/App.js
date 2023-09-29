import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Documents from "./pages/Documents/Documents";
import Navbar from "./components/Navbar/Navbar";
import Accommodation from "./pages/Accommodation/Accommodation";
import Assistant from "./pages/Assistant/Assistant";
import Job from "./pages/Job/Job";
import Map from "./pages/Map/Map";
import Student from "./pages/Student/Student";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Documents />} path="/documents" />
        <Route element={<Accommodation />} path="/accommodation" />
        <Route element={<Assistant />} path="/assistant" />
        <Route element={<Map />} path="/map" />
        <Route element={<Student />} path="/student" />
        <Route element={<Job />} path="/job" />
      </Routes>
    </>
  );
};

export default App;
