import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

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
import Availability from './Pages/Availability';

import DeluxeDouble from './Pages/DeluxeDouble';
import DeluxeTwin from './Pages/DeluxeTwin';
import DeluxeFamily from './Pages/DeluxeFamily';
import ExecutiveKing from './Pages/ExecutiveKing';
import ExecutiveTwin from './Pages/ExecutiveTwin';
import PremierSuite from './Pages/PremierSuite';

import Footer from './component/Footer';
import FloatingActions from './component/FloatingActions';

// ScrollToTop helper component
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
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        
        {/* Global Default SEO Tags */}
        <Helmet>
          <title>Opal Crest Hotel | Luxury Rooms & Suites</title>
          <meta name="description" content="Experience ultimate luxury and comfort at Opal Crest Hotel. Book Deluxe Rooms, Executive Suites, and enjoy world-class amenities." />
          <meta property="og:title" content="Opal Crest Hotel | Luxury Rooms & Suites" />
          <meta property="og:description" content="Experience ultimate luxury and comfort at Opal Crest Hotel." />
          <meta property="og:type" content="website" />
        </Helmet>

        <Navbar />

        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <div>
              <Helmet>
                <title>Opal Crest Hotel | Home - Luxury Stay</title>
              </Helmet>
              <Hero />
              <Home />
            </div>
          } />
          
          {/* /home Route */}
          <Route path="/home" element={
            <div>
              <Helmet>
                <title>Opal Crest Hotel | Home - Luxury Stay</title>
              </Helmet>
              <Hero />
              <Home />
            </div>
          } />
          
          {/* About Page Route */}
          <Route path="/about" element={
            <>
              <Helmet>
                <title>About Us | Opal Crest Hotel</title>
                <meta name="description" content="Learn more about Opal Crest Hotel's heritage, hospitality, and dedication to providing luxurious stays." />
              </Helmet>
              <About />
            </>
          } />

          {/* Main Rooms Page */}
          <Route path="/rooms" element={
            <>
              <Helmet>
                <title>Luxury Rooms & Suites | Opal Crest Hotel</title>
                <meta name="description" content="Explore our luxurious collection of rooms including Deluxe Double, Executive King, and Premier Suites." />
              </Helmet>
              <Rooms />
            </>
          } />

          {/* Availability Page */}
          <Route path="/availability" element={
            <>
              <Helmet>
                <title>Check Room Availability | Opal Crest Hotel</title>
                <meta name="description" content="Check live room availability and book your stay at Opal Crest Hotel." />
              </Helmet>
              <Availability />
            </>
          } />

          {/* Restaurant Page Route */}
          <Route path="/restaurant" element={
            <>
              <Helmet>
                <title>Fine Dining & Restaurant | Opal Crest Hotel</title>
                <meta name="description" content="Enjoy exquisite culinary experiences and fine dining at Opal Crest Hotel's restaurant." />
              </Helmet>
              <Restaurant />
            </>
          } />

          {/* Gallery Page Route */}
          <Route path="/gallery" element={
            <>
              <Helmet>
                <title>Photo Gallery | Opal Crest Hotel</title>
                <meta name="description" content="Take a visual tour of Opal Crest Hotel's luxurious rooms, amenities, and surroundings." />
              </Helmet>
              <Gallery />
            </>
          } />

          {/* Gym Page Route */}
          <Route path="/gym" element={
            <>
              <Helmet>
                <title>Fitness Center & Gym | Opal Crest Hotel</title>
                <meta name="description" content="Maintain your fitness routine at our fully equipped modern gym and health club." />
              </Helmet>
              <Gym />
            </>
          } />

          {/* Activities Page Route */}
          <Route path="/activities" element={
            <>
              <Helmet>
                <title>Activities & Spa | Opal Crest Hotel</title>
                <meta name="description" content="Discover exciting activities, spa treatments, and recreational experiences during your stay." />
              </Helmet>
              <Activities />
            </>
          } />

          {/* Contact Page Route */}
          <Route path="/contact" element={
            <>
              <Helmet>
                <title>Contact Us | Opal Crest Hotel</title>
                <meta name="description" content="Get in touch with Opal Crest Hotel for bookings, inquiries, and customer support." />
              </Helmet>
              <Contact />
            </>
          } />

          {/* Dedicated Individual Room Routes */}
          <Route path="/deluxe-double" element={
            <>
              <Helmet><title>Deluxe Double Room | Opal Crest Hotel</title></Helmet>
              <DeluxeDouble />
            </>
          } />
          <Route path="/deluxe-twin" element={
            <>
              <Helmet><title>Deluxe Twin Room | Opal Crest Hotel</title></Helmet>
              <DeluxeTwin />
            </>
          } />
          <Route path="/deluxe-family" element={
            <>
              <Helmet><title>Deluxe Family Room | Opal Crest Hotel</title></Helmet>
              <DeluxeFamily />
            </>
          } />
          <Route path="/executive-king" element={
            <>
              <Helmet><title>Executive King Room | Opal Crest Hotel</title></Helmet>
              <ExecutiveKing />
            </>
          } />
          <Route path="/executive-twin" element={
            <>
              <Helmet><title>Executive Twin Room | Opal Crest Hotel</title></Helmet>
              <ExecutiveTwin />
            </>
          } />
          <Route path="/premier-suite" element={
            <>
              <Helmet><title>Premier Suite | Opal Crest Hotel</title></Helmet>
              <PremierSuite />
            </>
          } />
        </Routes>

        <Footer />
        <FloatingActions />
      </Router>
    </HelmetProvider>
  );
}

export default App;