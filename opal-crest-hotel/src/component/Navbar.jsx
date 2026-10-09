import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Style/Navbar.css';

// Firebase Imports
import { auth, googleProvider } from '../firebase'; 
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navbarRef = useRef(null);

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

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Google Sign-In Function
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Successfully Logged In!");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileDropdownOpen(false);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) 
      : item.price;
    const nights = item.nights || 2;
    return acc + (numericPrice * item.quantity * nights);
  }, 0);

  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  // Get first letter of email
  const getInitial = () => {
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    if (user && user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    return 'A';
  };

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
          <div className="regal-auth-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {user ? (
              <div className="regal-profile-container" style={{ position: 'relative' }}>
                {/* Profile Icon / Avatar Button (Strictly Email Initial) */}
                <div 
                  className="regal-profile-icon-btn" 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#0084ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold', border: '2px solid #fff', fontSize: '18px', flexShrink: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
                >
                  <span>{getInitial()}</span>
                </div>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="regal-profile-dropdown" style={{ position: 'absolute', right: '0', top: '48px', width: '220px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: '8px 0', zIndex: 1000, color: '#333' }}>
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid #eee', fontSize: '13px', fontWeight: 'bold', color: '#111', wordBreak: 'break-all' }}>
                      {user.email || user.displayName || 'User'}
                    </div>
                    <Link to="/notifications" onClick={() => setProfileDropdownOpen(false)} style={{ display: 'block', padding: '10px 16px', color: '#333', textDecoration: 'none', fontSize: '14px' }}>Notifications</Link>
                    <Link to="/loyalty-points" onClick={() => setProfileDropdownOpen(false)} style={{ display: 'block', padding: '10px 16px', color: '#333', textDecoration: 'none', fontSize: '14px' }}>Loyalty Points</Link>
                    <Link to="/account" onClick={() => setProfileDropdownOpen(false)} style={{ display: 'block', padding: '10px 16px', color: '#333', textDecoration: 'none', fontSize: '14px' }}>Manage Your Account</Link>
                    <Link to="/activity" onClick={() => setProfileDropdownOpen(false)} style={{ display: 'block', padding: '10px 16px', color: '#333', textDecoration: 'none', fontSize: '14px' }}>Activity</Link>
                    <div style={{ borderTop: '1px solid #eee', marginTop: '4px', paddingTop: '4px' }}>
                      <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '10px 16px', color: '#d9534f', fontSize: '14px', cursor: 'pointer', fontWeight: '500' }}>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={handleGoogleLogin} 
                  style={{ background: 'transparent', border: '1px solid #c5a059', color: '#c5a059', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: '600' }}
                >
                  Login
                </button>
                <button 
                  onClick={handleGoogleLogin} 
                  style={{ background: '#c5a059', border: '1px solid #c5a059', color: '#fff', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', fontSize: '13px', fontWeight: '600' }}
                >
                  Sign Up
                </button>
              </div>
            )}
            
            {/* Cart Icon */}
            <div className="regal-cart-icon" onClick={() => setCartOpen(true)} style={{ cursor: 'pointer', position: 'relative', display: 'inline-flex', alignItems: 'center', color: '#fff', fontSize: '18px' }}>
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