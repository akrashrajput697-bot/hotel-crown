import React from 'react';
import '../style/reacticon.css';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

const FloatingButtons = () => {
  const whatsappNumber = "923241118206"; 
  const phoneNumber = "+92512347080";

  return (
    <div className="floating-buttons-container">
      {/* Call Button */}
      <a 
        href={`tel:${phoneNumber}`} 
        className="float-btn call-btn" 
        title="Call Us"
      >
        <FaPhoneAlt />
      </a>

      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="float-btn whatsapp-btn" 
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default FloatingButtons;