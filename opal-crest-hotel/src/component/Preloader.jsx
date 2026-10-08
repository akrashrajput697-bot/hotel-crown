import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Style/Preloader.css';

function Preloader() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  // Function jo URL path ke hisab se text return karegi
  const getPageTitle = (path) => {
    switch (path) {
      case '/about':
        return { title: 'ABOUT US', sub: 'OUR HERITAGE' };
      case '/rooms':
        return { title: 'LUXURY ROOMS', sub: 'ACCOMMODATION' };
      case '/restaurant':
        return { title: 'FINE DINING', sub: 'CULINARY EXPERIENCE' };
      case '/gallery':
        return { title: 'PHOTO GALLERY', sub: 'VISUAL TOUR' };
      case '/gym':
        return { title: 'FITNESS CENTER', sub: 'HEALTH & WELLNESS' };
      case '/activities':
        return { title: 'ACTIVITIES', sub: 'EXPERIENCES & SPA' };
      case '/contact':
        return { title: 'CONTACT US', sub: 'GET IN TOUCH' };
      case '/availability':
      case '/reservation':
        return { title: 'RESERVATIONS', sub: 'BOOK YOUR STAY' };
      case '/deluxe-double':
      case '/deluxe-twin':
      case '/deluxe-family':
      case '/executive-king':
      case '/executive-twin':
      case '/premier-suite':
        return { title: 'SUITES & ROOMS', sub: 'THE REGAL COLLECTION' };
      default:
        return { title: 'THE REGAL', sub: 'HOTEL & RESIDENCES' }; // Home ya default page ke liye
    }
  };

  const currentText = getPageTitle(location.pathname);

  return (
    <div className="preloader-shutter">
      <div className="shutter-logo-box">
        <div className="preloader-logo-circle">TR</div>
        <h2 className="preloader-title">{currentText.title}</h2>
        <span className="preloader-sub">{currentText.sub}</span>
      </div>
    </div>
  );
}

export default Preloader;