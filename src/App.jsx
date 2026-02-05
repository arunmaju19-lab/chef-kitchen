import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Firstpage from "./Components/Firstpage.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> {/* ✅ ADD THIS */}
      <Route path="/menu" element={<Firstpage />} />
      <Route path="/admin/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
