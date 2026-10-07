import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Hero from './Pages/Hero';
import Home from './Pages/Home';
import About from './Pages/About';
import Rooms from './Pages/Rooms';
import Restaurant from './Pages/Restaurant';
import Gallery from './Pages/Gallery';
import Gym from './Pages/Gym';
import Contact from './Pages/Contact';
import Activities from './Pages/Activities';
import Availability from './Pages/Availability'; // NEW: Availability page

import DeluxeDouble from './Pages/DeluxeDouble';
import DeluxeTwin from './Pages/DeluxeTwin';
import DeluxeFamily from './Pages/DeluxeFamily';
import ExecutiveKing from './Pages/ExecutiveKing';
import ExecutiveTwin from './Pages/ExecutiveTwin';
import PremierSuite from './Pages/PremierSuite';

import Footer from './component/Footer';
import FloatingActions from './component/FloatingActions';

// ScrollToTop helper component
// Agar link mein #section ho (jaise /activities#spa) to us section tak scroll karta hai,
// warna page ke top par le jata hai.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // thora ruk kar, taake naya page render ho jaye
      const timer = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(timer);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Home Route */}
        <Route path="/" element={
          <div>
            <Hero />
            <Home />
          </div>
        } />
        
        {/* /home Route */}
        <Route path="/home" element={
          <div>
            <Hero />
            <Home />
          </div>
        } />
        
        {/* About Page Route */}
        <Route path="/about" element={<About />} />

        {/* Main Rooms Page */}
        <Route path="/rooms" element={<Rooms />} />

        {/* Availability Page (Hero ke Check Availability button se) */}
        <Route path="/availability" element={<Availability />} />

        {/* Restaurant Page Route */}
        <Route path="/restaurant" element={<Restaurant />} />

        {/* Gallery Page Route */}
        <Route path="/gallery" element={<Gallery />} />

        {/* Gym Page Route */}
        <Route path="/gym" element={<Gym />} />

        {/* Activities Page Route */}
        <Route path="/activities" element={<Activities />} />

        {/* Contact Page Route */}
        <Route path="/contact" element={<Contact />} />

        {/* Dedicated Individual Room Routes (Direct Paths) */}
        <Route path="/deluxe-double" element={<DeluxeDouble />} />
        <Route path="/deluxe-twin" element={<DeluxeTwin />} />
        <Route path="/deluxe-family" element={<DeluxeFamily />} />
        <Route path="/executive-king" element={<ExecutiveKing />} />
        <Route path="/executive-twin" element={<ExecutiveTwin />} />
        <Route path="/premier-suite" element={<PremierSuite />} />
      </Routes>

      <Footer />
      <FloatingActions />
    </Router>
  );
}

export default App;