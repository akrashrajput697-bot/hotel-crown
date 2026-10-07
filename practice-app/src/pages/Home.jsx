import React, { useState, useRef, useEffect } from 'react';
import '../style/Home.css';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Outside click handle karne ke liye taake baahar click karne se menu band ho jaye
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <p>Yahan niche dropdown menu hai:</p>

      {/* Dropdown Wrapper */}
      <div className="dropdown-wrapper" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="dropdown-btn"
        >
          Menu ▼
        </button>

        {isOpen && (
          <div className="dropdown-list">
            <div className="dropdown-item" onClick={() => setIsOpen(false)}>Profile</div>
            <div className="dropdown-item" onClick={() => setIsOpen(false)}>Settings</div>
            <div className="dropdown-item logout" onClick={() => setIsOpen(false)}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;