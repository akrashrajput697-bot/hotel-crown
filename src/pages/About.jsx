import React from 'react';
import '../style/About.css';
import { 
  FaWifi, FaCar, FaClock, FaCoffee, FaSnowflake, FaConciergeBell, FaShieldAlt, 
  FaMapMarkerAlt, FaUsers, FaHandshake, FaHeart 
} from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

function About() {
  return (
    <div className="about-page">
      
      {/* SEO & Social Media Link Preview Tags for About Page */}
      <Helmet>
        <title>About Us | Crown Plaza Islamabad | Luxury Hotel & Suites</title>
        <meta name="description" content="Learn more about Hotel Crown CP Islamabad, located in the heart of Blue Area. Discover our luxury rooms, world-class amenities, and exceptional hospitality." />
        <link rel="canonical" href="https://crownplazaislamabad.com/about" />

        {/* WhatsApp & Facebook Link Preview (Open Graph) */}
        <meta property="og:title" content="About Us | Crown Plaza Islamabad" />
        <meta property="og:description" content="Discover our luxury rooms, world-class amenities, and exceptional hospitality in the heart of Blue Area." />
        <meta property="og:url" content="https://crownplazaislamabad.com/about" />
        <meta property="og:image" content="https://hotelcrowncp.com/assets/images/Home/1.webp" />
        <meta name="keywords" content="About Crown Plaza Islamabad, luxury hotel history, Islamabad hotel amenities, best hospitality services Pakistan, hotel story" />
      </Helmet>

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <p className="about-top-subtitle">WHERE LUXURY MEETS COMFORT</p>
          <h1>About Hotel Crown CP Islamabad</h1>
          <p className="about-hero-desc">
            Experience unparalleled hospitality at Hotel Crown CP Islamabad, located in the heart of Blue Area.
          </p>
        </div>
      </section>

      {/* Detailed Content Section with Images */}
      <section className="about-details-section">
        <div className="about-details-container">
          <div className="about-images-grid">
            <img src="https://hotelcrowncp.com/assets/images/Home/1.webp" alt="Hotel Interior" className="about-img-main" />
            <img src="https://hotelcrowncp.com/assets/images/Home/2.webp" alt="Hotel Room" className="about-img-sub" />
          </div>
          <div className="about-text-content">
            <span className="section-tag">ABOUT US</span>
            <h2>Experience a Luxury Stay in Islamabad at Hotel Crown CP</h2>
            <p className="section-desc-text">
              Discover the perfect blend of comfort, elegance, and convenience at Hotel Crown CP Islamabad. Strategically located approximately 50 minutes from Islamabad International Airport and the Blue Area business district, our spacious and elegantly furnished hotel rooms and suites are designed for families, couples, and business travellers seeking a premium luxury stay in Islamabad.
            </p>
            <p className="section-desc-text">
              Enjoy refined hospitality, modern amenities including free Wi-Fi, air-conditioning, 24/7 security, and complimentary breakfast. Each stay promises privacy, comfort, and memorable experiences in the heart of the capital.
            </p>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="amenities-container">
          <div className="amenities-left">
            <span className="section-tag">AMENITIES</span>
            <h2>Everything You Need for a Seamless Stay in Islamabad</h2>
            <div className="amenities-small-images">
              <img src="https://hotelcrowncp.com/assets/images/banner/banner-img.webp" alt="Amenity 1" />
              <img src="https://hotelcrowncp.com/assets/images/banner/banner-img.webp" alt="Amenity 2" />
            </div>
            <p className="amenities-info-text">
              From tailored comforts to premium in-room amenities, Hotel Crown CP Islamabad ensures a luxurious experience for families, business travelers, and leisure guests. Enjoy convenience, elegance, and unmatched hospitality in every stay.
            </p>
            <p className="amenities-highlight">7 Amenities Highlights</p>
          </div>
          <div className="amenities-grid">
            <div className="amenity-card"><div className="amenity-icon"><FaWifi /></div><h3>Free High-Speed Wi-Fi</h3><p>Stay connected for work or leisure.</p></div>
            <div className="amenity-card"><div className="amenity-icon"><FaCar /></div><h3>Airport Pickup & Drop-off</h3><p>Convenient transfers for a stress-free arrival.</p></div>
            <div className="amenity-card"><div className="amenity-icon"><FaClock /></div><h3>24/7 Express Check-in</h3><p>Seamless support for early arrivals or late-night stays.</p></div>
            <div className="amenity-card"><div className="amenity-icon"><FaCoffee /></div><h3>Complimentary Breakfast</h3><p>Start your day with refined hot and continental selections.</p></div>
            <div className="amenity-card"><div className="amenity-icon"><FaSnowflake /></div><h3>Air Conditioning</h3><p>Climate-controlled comfort in every room.</p></div>
            <div className="amenity-card"><div className="amenity-icon"><FaConciergeBell /></div><h3>Concierge Service</h3><p>Personalized assistance for bookings, transfers, and local recommendations.</p><span className="included-tag">Included →</span></div>
            <div className="amenity-card"><div className="amenity-icon"><FaShieldAlt /></div><h3>Secure Parking</h3><p>Safe on-site parking with direct access to the hotel.</p></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section (Dark Background) */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-header">
            <div className="why-choose-header-left">
              <span className="section-tag-gold">WHY CHOOSE US</span>
              <h2>Why Hotel Crown CP is the Top Choice in Blue Area Islamabad?</h2>
            </div>
            <div className="why-choose-header-right">
              <p>Discover why travelers choose Hotel Crown CP Islamabad, a perfect blend of prime location, modern amenities, and world-class hospitality designed for families, business guests, and visitors exploring Islamabad.</p>
            </div>
          </div>
          
          <div className="why-choose-grid">
            <div className="why-card">
              <div className="why-icon"><FaMapMarkerAlt /></div>
              <h3>Prime Blue Area Location</h3>
              <p>Centrally situated with easy access to Islamabad's key destinations, shopping, and business hubs.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><FaUsers /></div>
              <h3>Conference & Meeting Rooms</h3>
              <p>Fully equipped spaces for corporate meetings, business events, and professional gatherings.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><FaHandshake /></div>
              <h3>Trusted Hospitality</h3>
              <p>Professional staff delivering the excellence and reliability for a comfortable stay in Islamabad.</p>
            </div>
            <div className="why-card">
              <div className="why-icon"><FaHeart /></div>
              <h3>Ideal for Every Traveler</h3>
              <p>Perfect accommodations for families, business guests, and transit visitors seeking convenience and comfort.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;