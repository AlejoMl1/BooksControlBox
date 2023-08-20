import React ,{ useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
