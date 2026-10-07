import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
    return(
    <nav className="navbar">
        <div className="nav-brand">PracticeApp</div>
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
      </div>
    </nav>
    );
}

export default Navbar; // <--- Yeh line add karni thi!