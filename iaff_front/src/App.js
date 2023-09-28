import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Documents from './pages/Documents/Documents';

const App = () => {

  return (
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<Documents/>} path='/documents'/>
    </Routes>
  )
}

export default App