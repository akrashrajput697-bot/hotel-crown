import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Style/Navbar.css';

// Firebase Imports
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const NAV_LINKS = [
  { to: '/', label: 'Home', match: ['/', '/home'] },
  { to: '/about', label: 'About', match: ['/about'] },
  { to: '/rooms', label: 'Rooms', match: ['/rooms'] },
  { to: '/restaurant', label: 'Restaurant', match: ['/restaurant'] },
];

const MORE_LINKS = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/gym', label: 'Gym & Fitness' },
  { to: '/activities', label: 'Activities' },
  { to: '/contact', label: 'Contact Us' },
];

const PROFILE_LINKS = [
  { to: '/notifications', label: 'Notifications' },
  { to: '/loyalty-points', label: 'Loyalty Points' },
  { to: '/account', label: 'Manage Your Account' },
  { to: '/activity', label: 'Activity' },
];

const formatPKR = (n) => `PKR ${Math.round(n).toLocaleString('en-PK')}`;

/* ---------- Small inline icons ---------- */
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.1a1.5 1.5 0 0 0 1.5-1.1L20 8H6.2" />
    <circle cx="9.5" cy="19.5" r="1.2" />
    <circle cx="17" cy="19.5" r="1.2" />
  </svg>
);

const Chevron = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navbarRef = useRef(null);

  const { cartItems, cartOpen, setCartOpen, updateQuantity, removeItem } = useCart();

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Click outside + Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
        setMoreOpen(false);
        setProfileDropdownOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setMoreOpen(false);
        setProfileDropdownOpen(false);
        setCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [setCartOpen]);

  // Lock page scroll while the cart drawer is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileDropdownOpen(false);
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice =
      typeof item.price === 'string'
        ? parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
        : item.price;
    const nights = item.nights || 2;
    return acc + numericPrice * item.quantity * nights;
  }, 0);

  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const getInitial = () => {
    if (user?.email) return user.email.charAt(0).toUpperCase();
    if (user?.displayName) return user.displayName.charAt(0).toUpperCase();
    return 'A';
  };

  const isActive = (match) => match.includes(location.pathname);
  const moreActive = MORE_LINKS.some((l) => l.to === location.pathname);

  return (
    <>
      <nav
        className={`regal-navbar-container ${isScrolled || menuOpen ? 'scrolled' : ''}`}
        ref={navbarRef}
      >
        <div className="regal-nav-content">
          {/* Mobile hamburger */}
          <button
            className={`regal-hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Brand */}
          <Link to="/" className="regal-brand-logo-link" aria-label="The Regal Hotel & Residences, home">
            <span className="regal-logo-box">
              <span className="regal-logo-monogram">TR</span>
            </span>
            <span className="regal-brand-text">
              <span className="brand-title">The Regal</span>
              <span className="brand-subtitle">Hotel &amp; Residences</span>
            </span>
          </Link>

          {/* Links */}
          <div className={`regal-menu-section ${menuOpen ? 'mobile-open' : ''}`}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`regal-link ${isActive(l.match) ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            ))}

            <div
              className={`regal-dropdown ${moreOpen ? 'open' : ''}`}
              onMouseEnter={() => window.innerWidth > 980 && setMoreOpen(true)}
              onMouseLeave={() => window.innerWidth > 980 && setMoreOpen(false)}
            >
              <button
                type="button"
                className={`regal-link dropdown-toggle ${moreActive ? 'active' : ''}`}
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More <Chevron />
              </button>
              <div className="regal-dropdown-menu">
                {MORE_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} className="dropdown-item">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Auth + Cart */}
          <div className="regal-auth-section">
            {user ? (
              <div className="regal-profile-container">
                <button
                  type="button"
                  className="regal-profile-icon-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-label="Account menu"
                  aria-expanded={profileDropdownOpen}
                >
                  {getInitial()}
                </button>

                {profileDropdownOpen && (
                  <div className="regal-profile-dropdown">
                    <div className="regal-profile-head">
                      <span className="regal-profile-label">Signed in as</span>
                      <span className="regal-profile-email">
                        {user.email || user.displayName || 'User'}
                      </span>
                    </div>
                    {PROFILE_LINKS.map((l) => (
                      <Link key={l.to} to={l.to} className="regal-profile-link">
                        {l.label}
                      </Link>
                    ))}
                    <button type="button" onClick={handleLogout} className="regal-logout-btn">
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="regal-auth-buttons">
                <button type="button" onClick={handleGoogleLogin} className="regal-btn-ghost">
                  Log in
                </button>
                <button type="button" onClick={handleGoogleLogin} className="regal-btn-solid">
                  Sign up
                </button>
              </div>
            )}

            <button
              type="button"
              className="regal-cart-icon"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${totalItemsCount} items`}
            >
              <CartIcon />
              {totalItemsCount > 0 && <span className="cart-badge">{totalItemsCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart drawer */}
      <div
        className={`cart-backdrop ${cartOpen ? 'show' : ''}`}
        onClick={() => setCartOpen(false)}
      />

      <aside
        className={`slide-cart-drawer ${cartOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Your cart"
        aria-hidden={!cartOpen}
      >
        <div className="slide-cart-header">
          <h3>Your cart</h3>
          <button className="slide-cart-close" onClick={() => setCartOpen(false)}>
            Close
          </button>
        </div>

        <div className="slide-cart-body">
          {cartItems.length === 0 ? (
            <div className="slide-cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/rooms" className="slide-empty-link" onClick={() => setCartOpen(false)}>
                Browse rooms
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="slide-cart-item">
                <img src={item.images ? item.images[0] : item.image} alt={item.name} />
                <div className="slide-cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.price} / night</p>
                  <div className="slide-qty-box">
                    <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="slide-remove-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="slide-cart-footer">
            <div className="slide-summary-row">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="slide-summary-row">
              <span>Tax (16%)</span>
              <span>{formatPKR(tax)}</span>
            </div>
            <div className="slide-summary-row total">
              <span>Total</span>
              <span>{formatPKR(total)}</span>
            </div>
            <Link
              to="/reservation"
              className="slide-checkout-btn"
              onClick={() => setCartOpen(false)}
            >
              Continue to reservation
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

export default Navbar;