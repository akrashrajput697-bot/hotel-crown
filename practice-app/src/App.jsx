import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar'; // Navbar import kiya
import Home from './pages/Home';         // Home page import kiya
import About from './pages/About';       // About page import kiya
import Contact from './pages/Contact';   // Contact page import kiya

function App() {
  return (
    <Router>
      <div>
        {/* Navbar ko Router ke andar rakha hai taake links theek se kaam karein */}
        <Navbar />

        {/* Yahan alag alag routes define kiye hain */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;