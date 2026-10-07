import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CartDrawer from './CartDrawer';
import Profile from '../pages/Profile'; 
import { auth, db } from '../pages/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import '../style/Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userLoyalty, setUserLoyalty] = useState({ points: 0, discount: 0, count: 0 });
  
  const navigate = useNavigate();

  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        
        unsubscribeSnapshot = onSnapshot(userDocRef, (userDocSnap) => {
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserLoyalty({
              points: data.loyaltyPoints || 0,
              discount: data.discountPercentage || 0,
              count: data.completedBookingsCount || 0
            });
          }
        }, (error) => {
          console.error("Error listening to user loyalty data:", error);
        });
      } else {
        setUserLoyalty({ points: 0, discount: 0, count: 0 });
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  // Click outside to close dropdown popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sign Out Handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Email se dynamic background color generate karne ka function
  const getColorFromEmail = (email) => {
    if (!email) return '#2563eb';
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  };

  const updateCartCount = () => {
    const savedCart = localStorage.getItem('hotel_cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartCount(parsedCart.length);
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Schema markup data for Hotel Organization & Sitelinks Search
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Hotel Crown CP Islamabad",
    "image": "https://www.hotelcrowncp.com/assets/images/logos/logo.png",
    "@id": "https://hotelcrowncp.com",
    "url": "https://hotelcrowncp.com",
    "telephone": "+923229151963",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "99-E, Jinnah Ave, Block I G 7/2 Blue Area",
      "addressLocality": "Islamabad",
      "postalCode": "44000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.68442,
      "longitude": 73.055137
    },
    "priceRange": "$$"
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`} ref={navRef}>
      <Helmet>
        {/* Organization / Local Business Structured Data for Google SEO */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="navbar-container">
        
        {/* 1. Left Side: Hamburger Menu Button */}
        <button
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* 2. Center: Logo Section with New URL */}
        <div className="logo">
          <Link to="/">
            <img 
              src="https://www.hotelcrowncp.com/assets/images/logos/logo.png" 
              alt="Hotel Crown CP Islamabad Logo" 
              className="logo-img" 
            />
          </Link>
        </div>

        {/* 3. Navigation Menu */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
          <Link to="/about-islamabad-hotel" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
          
          {/* Rooms Dropdown Menu Added */}
          <div className="nav-dropdown-wrapper">
            <Link to="/rooms-islamabad-hotel" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ROOMS</Link>
            <div className="dropdown-menu-content">
              <Link to="/rooms/twin-standard-room-in-islamabad" onClick={() => setMobileMenuOpen(false)}>Twin Standard Room</Link>
              <Link to="/rooms/deluxe-twin-rooms-in-islamabad" onClick={() => setMobileMenuOpen(false)}>Delux Twin Rooms</Link>
              <Link to="/rooms/deluxe-double-room-in-islamabad" onClick={() => setMobileMenuOpen(false)}>Deluxe Double Rooms</Link>
              <Link to="/rooms/executive-twin-grace-room-in-islamabad" onClick={() => setMobileMenuOpen(false)}>Executive Twin Grace</Link>
              <Link to="/rooms/executive-grace-double-rooms-in-islamabad" onClick={() => setMobileMenuOpen(false)}>Executive Grace Double</Link>
            </div>
          </div>

          <Link to="/gallery-islamabad-hote" className="nav-link" onClick={() => setMobileMenuOpen(false)}>GALLERY</Link>
          <Link to="/restaurant-islamabad-hotel" className="nav-link" onClick={() => setMobileMenuOpen(false)}>DINING</Link>
          <Link to="/places-islamabad-hotel" className="nav-link" onClick={() => setMobileMenuOpen(false)}>NEARBY ATTRACTIONS</Link>
          <Link to="/blogs-islamabad-hote" className="nav-link" onClick={() => setMobileMenuOpen(false)}>BLOG</Link>
          <Link to="/contact-islamabad-hotel" className="nav-link" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
        </nav>

        {/* 4. Right Side: Login, Sign Up / Profile Avatar & Cart Icon */}
        <div className="nav-right" ref={dropdownRef}>
          
          {user ? (
            <div className="profile-container-wrapper" style={{ position: 'relative' }}>
              <div 
                className="nav-profile-avatar" 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
                style={{ backgroundColor: getColorFromEmail(user.email) }}
                title={user.email}
              >
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>

              {/* Google Style Profile Popup Card */}
              {isProfileDropdownOpen && (
                <div className="profile-dropdown-card" style={{ width: '320px' }}>
                  <div className="profile-dropdown-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '12px' }}>
                      <div 
                        className="dropdown-big-avatar"
                        style={{ backgroundColor: getColorFromEmail(user.email) }}
                      >
                        {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="dropdown-user-info" style={{ overflow: 'hidden' }}>
                        <span className="dropdown-user-title">Signed in as</span>
                        <span className="dropdown-user-email" title={user.email} style={{ display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.email}</span>
                      </div>
                    </div>

                    {/* Loyalty Points & VIP Discount Badge */}
                    <div style={{ 
                      width: '100%', 
                      background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
                      padding: '8px 12px', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      color: '#92400e',
                      fontSize: '13px',
                      fontWeight: '600',
                      marginTop: '4px',
                      border: '1px solid #fcd34d'
                    }}>
                      <span>⭐ Points: {userLoyalty.points}</span>
                      <span>🎁 VIP: {userLoyalty.discount}% OFF</span>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="profile-dropdown-body">
                    <button className="dropdown-action-btn" onClick={() => { setIsProfileDropdownOpen(false); navigate('/wallet'); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><circle cx="18" cy="15" r="1"></circle></svg>
                      My Crown Wallet
                    </button>

                    <button className="dropdown-action-btn" onClick={() => { setIsProfileDropdownOpen(false); navigate('/booking-history'); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      Activity & Bookings
                    </button>

                    {/* Notifications Button Added */}
                    <button className="dropdown-action-btn" onClick={() => { setIsProfileDropdownOpen(false); navigate('/notifications'); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                      Notifications
                    </button>

                    <button className="dropdown-action-btn" onClick={() => { setIsProfileDropdownOpen(false); navigate('/profile'); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      My Profile
                    </button>

                    <button className="dropdown-action-btn" onClick={() => { setIsProfileDropdownOpen(false); navigate('/manage-account'); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                      Manage Account & Password
                    </button>

                    <div className="dropdown-divider"></div>

                    <button className="dropdown-signout-btn" onClick={handleSignOut}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons-group">
              <button 
                className="nav-login-btn" 
                onClick={() => setIsLoginModalOpen(true)}
              >
                Login
              </button>
              
              <button 
                className="nav-signin-btn" 
                onClick={() => setIsLoginModalOpen(true)}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Cart Icon */}
          <div className="nav-cart-icon" onClick={() => setIsCartOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            
            {cartCount > 0 && (
              <span className="cart-badge-circle">
                {cartCount}
              </span>
            )}
          </div>

        </div>

      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Profile isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
}

export default Navbar;