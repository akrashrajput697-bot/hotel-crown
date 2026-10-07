import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './ScrollToTop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import Home from './pages/home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Gallery from './pages/Gallery';
import Dining from './pages/Dining';
import NearbyAttraction from './pages/NEARBY-attraction';
import Blog from './pages/Blog';
import BlogislamabadDetail from './pages/BlogislamabadDetail';
import BlogPostPims from './pages/BlogPimsDetail';
import StayingInBlueAreaIslamabad from './pages/StayingInBlueAreaIslamabad';
import Contact from './pages/contact';
import AvailableRooms from './pages/AvailableRooms';
import TwinStandardRoom from './pages/TwinStandardRoom';
import DeluxeTwinRoom from './pages/DeluxeTwinRoom';
import DeluxeDoubleRoom from './pages/DeluxeDoubleRoom';
import ExecutiveTwinGrace from './pages/ExecutiveTwinGrace';
import ExecutiveGraceDouble from './pages/ExecutiveGraceDouble';
import Reservation from './pages/Reservation';
import ProfilePage from './pages/ProfilePage';
import BookingHistory from './pages/BookingHistory';
import ManageAccount from './pages/ManageAccount';
import Wallet from './pages/Wallet';
import Notifications from './pages/Notification'; // <-- Yahan 'Notifications' ki jagah 'Notification' kar diya hai taake aapki file match ho jaye

function FloatingActionWidget() {
  return (
    <div className="floating-widget-container">
      <a
        href="https://wa.me/923241118206?text=Hi,%20I%20would%20like%20to%20inquire%20about%20room%20booking%20at%20Hotel%20Crown%20CP%20Islamabad."
        className="floating-btn whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
      <a
        href="tel:+923241118206"
        className="floating-btn call-float"
        title="Call Us Now"
      >
        <FontAwesomeIcon icon={faPhone} />
      </a>
    </div>
  );
}

function MainLayout() {
  const location = useLocation();
  
  const isBookingHistoryPage = location.pathname === '/booking-history';
  const isProfilePage = location.pathname === '/profile';
  const isManageAccountPage = location.pathname === '/manage-account';
  const isWalletPage = location.pathname === '/wallet';
  const isNotificationsPage = location.pathname === '/notifications';

  // --- DARK MODE LOGIC ---
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      setDarkMode(false);
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  };
  // -----------------------

  return (
    <>
      <ScrollToTop />
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-islamabad-hotel" element={<About />} />
        <Route path="/rooms-islamabad-hotel" element={<Rooms />} />
        <Route path="/gallery-islamabad-hote" element={<Gallery />} />
        <Route path="/restaurant-islamabad-hotel" element={<Dining />} />
        <Route path="/places-islamabad-hotel" element={<NearbyAttraction />} />

        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs-islamabad-hote" element={<Blog />} />
        <Route path="/blog/islamabad-weekend-trip-from-lahore" element={<BlogislamabadDetail />} />
        <Route path="/blog/hotel-near-pims-islamabad" element={<BlogPostPims />} />
        <Route path="/blog/staying-in-blue-area-islamabad" element={<StayingInBlueAreaIslamabad />} />

        <Route path="/contact-islamabad-hotel" element={<Contact />} />
        <Route path="/available-rooms" element={<AvailableRooms />} />

        {/* Twin Standard Room Routes */}
        <Route path="/twin-standard-room" element={<TwinStandardRoom />} />
        <Route path="/twin-standard" element={<TwinStandardRoom />} />
        <Route path="/rooms/twin-standard-room-in-islamabad" element={<TwinStandardRoom />} />

        {/* Deluxe Twin Rooms Routes */}
        <Route path="/deluxe-twin-room" element={<DeluxeTwinRoom />} />
        <Route path="/deluxe-twin-rooms" element={<DeluxeTwinRoom />} />
        <Route path="/rooms/deluxe-twin-rooms-in-islamabad" element={<DeluxeTwinRoom />} />

        <Route path="/deluxe-double" element={<DeluxeDoubleRoom />} />
        <Route path="/deluxe-double-room" element={<DeluxeDoubleRoom />} />
        <Route path="/deluxe-double-rooms" element={<DeluxeDoubleRoom />} />
        <Route path="/rooms/deluxe-double-room-in-islamabad" element={<DeluxeDoubleRoom />} />

        <Route path="/executive-twin-grace" element={<ExecutiveTwinGrace />} />
        <Route path="/executive-twin-grace-room" element={<ExecutiveTwinGrace />} />
        <Route path="/rooms/executive-twin-grace-room-in-islamabad" element={<ExecutiveTwinGrace />} />

        <Route path="/executive-grace-double" element={<ExecutiveGraceDouble />} />
        <Route path="/executive-double-room" element={<ExecutiveGraceDouble />} />
        <Route path="/rooms/executive-double-room-in-islamabad" element={<ExecutiveGraceDouble />} />
        <Route path="/rooms/executive-grace-double-rooms-in-islamabad" element={<ExecutiveGraceDouble />} />

        <Route path="/reservation" element={<Reservation />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/manage-account" element={<ManageAccount />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>

      {/* Footer ab Booking History, Profile, Manage Account, Wallet, aur Notifications pages par show nahi hoga */}
      {!isBookingHistoryPage && !isProfilePage && !isManageAccountPage && !isWalletPage && !isNotificationsPage && <Footer />}
      <FloatingActionWidget />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <MainLayout />
      </Router>
    </HelmetProvider>
  );
}

export default App;