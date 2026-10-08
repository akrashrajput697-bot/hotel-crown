import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Style/Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);

  // Global Cart Context se data nikal liya hai
  const { cartItems, cartOpen, setCartOpen, updateQuantity, removeItem } = useCart();

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

  // Close mobile menu or cart when clicking outside
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

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal calculation (agar price string format mein ho jaise "PKR 45,000" ya number ho)
  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) 
      : item.price;
    const nights = item.nights || 2;
    return acc + (numericPrice * item.quantity * nights);
  }, 0);

  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  return (
    <>
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
            
            {/* Cart Icon triggers slide-over drawer */}
            <div className="regal-cart-icon" onClick={() => setCartOpen(true)} style={{ cursor: 'pointer', position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              🛒
              <span className="cart-badge">{totalItemsCount}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-over Cart Drawer */}
      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}></div>}
      
      <div className={`slide-cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="slide-cart-header">
          <h3>Your Cart</h3>
          <button className="slide-cart-close" onClick={() => setCartOpen(false)}>Close</button>
        </div>

        <div className="slide-cart-body">
          {cartItems.length === 0 ? (
            <div className="slide-cart-empty">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="slide-cart-item">
                <img src={item.images ? item.images[0] : item.image} alt={item.name} />
                <div className="slide-cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.price} / night</p>
                  <div className="slide-qty-box">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="slide-remove-btn" onClick={() => removeItem(item.id)}>×</button>
              </div>
            ))
          )}
        </div>

        <div className="slide-cart-footer">
          <div className="slide-summary-row">
            <span>Subtotal</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="slide-summary-row">
            <span>Tax</span>
            <span>PKR {tax.toLocaleString()}</span>
          </div>
          <div className="slide-summary-row total">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>
          <button className="slide-checkout-btn" onClick={() => alert('Proceeding to checkout...')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;