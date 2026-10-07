import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Style/Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`regal-navbar-container ${isScrolled ? 'scrolled' : ''}`} ref={navbarRef}>
      <div className="regal-nav-content">
        
        {/* Left Mobile Hamburger Button */}
        <button className="regal-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Brand / Logo Section */}
        <div className="regal-brand-section">
          <Link to="/" className="regal-brand-logo-link" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '8px' }}>
            <div className="regal-logo-box">
              <span className="regal-logo-monogram">TR</span>
            </div>
            <div className="regal-brand-text">
              <span className="brand-title">THE REGAL</span>
              <span className="brand-subtitle">HOTEL &amp; RESIDENCES</span>
            </div>
          </Link>
        </div>

        {/* Center Links with Dropdown */}
        <div className={`regal-menu-section ${menuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={`regal-link ${location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className={`regal-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/rooms" className={`regal-link ${location.pathname === '/rooms' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Rooms</Link>
          <Link to="/restaurant" className={`regal-link ${location.pathname === '/restaurant' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Restaurant</Link>
          
          <div className="regal-dropdown">
            <span className="regal-link dropdown-toggle">More ▼</span>
            <div className="regal-dropdown-menu">
              <Link to="/gallery" className="dropdown-item" onClick={() => setMenuOpen(false)}>Gallery</Link>
              <Link to="/gym" className="dropdown-item" onClick={() => setMenuOpen(false)}>Gym & Fitness</Link>
              <Link to="/activities" className="dropdown-item" onClick={() => setMenuOpen(false)}>Activites</Link>
              <Link to="/contact" className="dropdown-item" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Right Auth & Cart Section */}
        <div className="regal-auth-section">
          <Link to="/login" className="regal-auth-link">Login</Link>
          <span className="auth-divider">/</span>
          <Link to="/signup" className="regal-auth-link">Sign Up</Link>
          <div className="regal-cart-icon">
            🛒
            <span className="cart-badge">0</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;