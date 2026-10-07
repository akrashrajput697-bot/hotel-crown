import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../style/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- WHATSAPP REDIRECT CONFIGURATION ---
    const whatsappNumber = '923229151963'; // Aapka number (+ ke baghair)
    const whatsappMessage = `*New Contact Inquiry - Hotel Crown CP*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;
    
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // WhatsApp chat kholna
    window.open(whatsappURL, '_blank');

    // Thank you page show karna
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="thankyou-page-wrapper">
        <Helmet>
          <title>Thank You | Hotel Crown CP Islamabad</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="thankyou-icon">✨</div>
        <h1 className="thankyou-title">Thank You, {formData.name}!</h1>
        <p className="thankyou-desc">
          Your message has been prepared for WhatsApp and sent to <strong>Hotel Crown CP</strong> management. We will get back to you shortly.
        </p>
        <button 
          onClick={() => { setIsSubmitted(false); setFormData({ name: '', phone: '', email: '', message: '' }); }}
          className="thankyou-btn"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us & Bookings | Hotel Crown CP Islamabad</title>
        <meta 
          name="description" 
          content="Get in touch with Hotel Crown CP located in Blue Area, Islamabad. Contact us for luxury bookings, inquiries, and 24/7 front desk support." 
        />
        <link rel="canonical" href="https://hotelcrowncp.com/contact" />
        <meta name="keywords" content="Crown Plaza Islamabad contact, hotel location Islamabad, bookings helpline, hotel phone number, customer support address" />
      </Helmet>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-overlay">
          <div className="contact-hero-content">
            <span className="hero-subtitle">HOTEL CROWN CP</span>
            <h1 className="hero-title">Get In Touch With Us</h1>
            <p className="hero-text">
              We are here to assist you 24/7 with luxury bookings, custom inquiries, and seamless airport transfers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="contact-body-section">
        <div className="contact-container">
          
          <div className="contact-card-wrapper">
            
            {/* Left Side: Modern Dark Info Box */}
            <div className="contact-info-box">
              <div className="info-header">
                <span className="section-tag">CONTACT INFORMATION</span>
                <h2>Let's Start Your Stay</h2>
                <p className="info-desc">
                  Experience world-class hospitality. Reach out to our team through any of the channels below.
                </p>
              </div>

              <div className="info-details">
                <div className="info-item">
                  <div className="icon-circle"><span className="info-icon">📍</span></div>
                  <div>
                    <span className="item-label">VISIT US</span>
                    <p className="item-text">99-E, Jinnah Ave, Block I G 7/2 Blue Area, Islamabad, 44000, Pakistan</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-circle"><span className="info-icon">📞</span></div>
                  <div>
                    <span className="item-label">CALL & WHATSAPP</span>
                    <p className="item-text">+923229151963</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-circle"><span className="info-icon">☎️</span></div>
                  <div>
                    <span className="item-label">RECEPTION DESK</span>
                    <p className="item-text">+(051) 2347080</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-circle"><span className="info-icon">✉️</span></div>
                  <div>
                    <span className="item-label">EMAIL ADDRESS</span>
                    <p className="item-text">info@hotelcrowncp.com</p>
                  </div>
                </div>
              </div>

              <div className="hours-box">
                <span className="hours-title">FRONT DESK HOURS</span>
                <span className="hours-sub">Open 24 / 7</span>
                <p className="hours-text">Express check-in & concierge available</p>
              </div>
            </div>

            {/* Right Side: Simplified Form Box */}
            <div className="contact-form-box">
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p className="form-subtitle">Fill out the form below to connect instantly via WhatsApp.</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="John Doe" 
                    required 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="03229151963" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea 
                    rows="4" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Tell us about your stay requirements..." 
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-dir submit-btn">
                  <span>Send to WhatsApp</span>
                  <div className="btn-icon-wrapper">➔</div>
                </button>
              </form>
            </div>

          </div>

          {/* Map Section */}
          <div className="map-section-wrapper">
            <div className="map-header-content">
              <h3>Hotel Crown CP, Islamabad</h3>
              <p className="map-address">99-E, Jinnah Ave, Block I G 7/2 Blue Area, Islamabad, 44000, Pakistan</p>
            </div>
            <div className="map-container">
              <iframe 
                title="Hotel Crown CP Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.2312277189197!2d73.055137!3d33.68442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd1c140cb97%3A0x5241b714bc5c65f0!2sHotel%20Crown%20CP%20Islamabad!5e0!3m2!1sen!2spk!4v1650000000000!5m2!1sen!2spk" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}