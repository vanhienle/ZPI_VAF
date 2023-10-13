import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Documents from "./pages/Documents/Documents";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Assistant from "./pages/Assistant/Assistant";
import Accommodation from "./pages/Accommodation/Accommodation";
import Map from "./pages/Map/Map";
import Registration from "./pages/Registration/Registration";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Documents />} path="/documents" />
        <Route element={<Assistant />} path="/assistant" />
        <Route element={<Accommodation />} path="/accommodation" />
        <Route element={<Map />} path="/map" />
        <Route element={<Registration />} path="/signup" />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
