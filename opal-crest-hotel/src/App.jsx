import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { CartProvider } from './context/CartContext'; // Sahi import

import Navbar from './component/Navbar';
import Preloader from './component/Preloader';
import Hero from './Pages/Hero';
import Home from './Pages/Home';
import About from './Pages/About';
import Rooms from './Pages/Rooms';
import Restaurant from './Pages/Restaurant';
import Gallery from './Pages/Gallery';
import Gym from './Pages/Gym';
import Contact from './Pages/Contact';
import Activities from './Pages/Activities';
import Availability from './Pages/Availability';
import Reservation from './Pages/Reservation';

import DeluxeDouble from './Pages/DeluxeDouble';
import DeluxeTwin from './Pages/DeluxeTwin';
import DeluxeFamily from './Pages/DeluxeFamily';
import ExecutiveKing from './Pages/ExecutiveKing';
import ExecutiveTwin from './Pages/ExecutiveTwin';
import PremierSuite from './Pages/PremierSuite';

import Footer from './component/Footer';
import FloatingActions from './component/FloatingActions';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, hash]);
  return null;
}

function LayoutWrapper() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<><Hero /><Home /></>} />
        <Route path="/home" element={<><Hero /><Home /></>} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/deluxe-double" element={<DeluxeDouble />} />
        <Route path="/deluxe-twin" element={<DeluxeTwin />} />
        <Route path="/deluxe-family" element={<DeluxeFamily />} />
        <Route path="/executive-king" element={<ExecutiveKing />} />
        <Route path="/executive-twin" element={<ExecutiveTwin />} />
        <Route path="/premier-suite" element={<PremierSuite />} />
      </Routes>
      <Footer />
      <FloatingActions />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Preloader />
          <Helmet>
            <title>Opal Crest Hotel | Luxury Rooms & Suites</title>
            <meta name="description" content="Experience ultimate luxury and comfort at Opal Crest Hotel." />
          </Helmet>
          <LayoutWrapper />
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;