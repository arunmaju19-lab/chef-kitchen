import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home.jsx'
import Firstpage from './Components/Firstpage.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Firstpage />} />
      </Routes>
    </Router>
  );
}

export default App;