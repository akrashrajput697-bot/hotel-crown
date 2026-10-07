import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Style/Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <nav className={`regal-navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="regal-nav-content">
        {/* Brand / Logo Section */}
        <div className="regal-brand-section">
          <Link to="/" className="regal-brand-logo-link" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '12px' }}>
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
        <div className="regal-menu-section">
          <Link to="/" className={`regal-link ${location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`regal-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link to="/rooms" className={`regal-link ${location.pathname === '/rooms' ? 'active' : ''}`}>Rooms</Link>
          <Link to="/restaurant" className={`regal-link ${location.pathname === '/restaurant' ? 'active' : ''}`}>Restaurant</Link>
          
          <div className="regal-dropdown">
            <span className="regal-link dropdown-toggle">More ▼</span>
            <div className="regal-dropdown-menu">
              <Link to="/gallery" className="dropdown-item">Gallery</Link>
              <Link to="/gym" className="dropdown-item">Gym & Fitness</Link>
              <Link to="/activities" className="dropdown-item">Activites</Link>
              <Link to="/contact" className="dropdown-item">Contact Us</Link>
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