import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Documents from "./pages/Documents/Documents";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Assistant from "./pages/Assistant/Assistant";
import Student from "./pages/Student/Student";
import Job from "./pages/Job/Job";
import Accomodation from "./pages/Accommodation/Accommodation";
import Map from "./pages/Map/Map";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Assistant />} path="/assistant" />
        <Route element={<Documents />} path="/documents" />
        <Route element={<Student />} path="/student" />
        <Route element={<Job />} path="/job" />
        <Route element={<Accomodation />} path="/accomodation" />
        <Route element={<Map />} path="/map" />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
