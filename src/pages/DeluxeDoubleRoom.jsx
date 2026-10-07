import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWifi, FaCoffee, FaConciergeBell, FaShieldAlt, FaUserFriends, FaBed } from 'react-icons/fa';
import '../style/DeluxeDoubleRoom.css';

// Gallery & Hero Images for Deluxe Double Room
const roomImg1 = "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp";
const roomImg2 = "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/2.webp";
const roomImg3 = "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/3.webp";

// Separate Unique Images for the 4 Other Room Cards
const cardImg1 = "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/1.webp"; // Twin Standard
const cardImg2 = "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp";    // Deluxe Twin
const cardImg3 = "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp"; // Executive Suite
const cardImg4 = "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/1.webp"; // Standard Single

const DeluxeDoubleRoom = () => {
  const [activeImg, setActiveImg] = useState(roomImg1);
  const thumbnails = [roomImg1, roomImg2, roomImg3];

  return (
    <div className="double-room-page">
      {/* SEO & Meta Tags Optimization */}
      <Helmet>
        <title>Deluxe Double Room in Islamabad | Hotel Crown CP</title>
        <meta name="description" content="Experience unmatched luxury and spacious comfort in the Deluxe Double Room at Hotel Crown CP Islamabad. Enjoy a plush king-size bed, complimentary breakfast, and modern amenities." />
        <meta name="keywords" content="Deluxe Double Room Islamabad, Hotel Crown CP king bed, luxury hotel room Blue Area, couples accommodation Islamabad" />
        <link rel="canonical" href="https://hotelcrowncp.com/rooms/deluxe-double-room-in-islamabad" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Deluxe Double Room in Islamabad | Hotel Crown CP" />
        <meta property="og:description" content="Experience unmatched luxury and spacious comfort tailored for couples and solo travelers." />
        <meta property="og:image" content={roomImg1} />
        <meta property="og:url" content="https://hotelcrowncp.com/rooms/deluxe-double-room-in-islamabad" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="deluxe double room Islamabad, double bed hotel suite, luxury double room booking, Crown Plaza Islamabad rooms" />
      </Helmet>

      {/* Hero Section */}
      <section className="double-hero" style={{ backgroundImage: `url(${roomImg1})` }}>
        <div className="double-hero-overlay">
          <div className="double-hero-content">
            <span className="double-hero-subtitle">Hotel Crown CP Islamabad</span>
            <h1>Deluxe Double Room</h1>
            <p>Experience unmatched luxury and spacious comfort tailored for couples and solo travelers.</p>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="double-details-section">
        <div className="double-container">
          
          {/* Left Column: Gallery & Description */}
          <div className="double-left-col">
            <div className="main-active-img-box">
              <img src={activeImg} alt="Deluxe Double Room" />
            </div>

            <div className="thumbnails-row">
              {thumbnails.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumb-box ${activeImg === img ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImg(img)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* Quick Highlights */}
            <div className="double-quick-tags">
              <span><FaBed /> 1 King Size Bed</span>
              <span><FaUserFriends /> Max 2 Guests</span>
              <span>32 sqm / 344 sqft</span>
            </div>

            <div className="room-section-block">
              <h3>Overview</h3>
              <p>
                Our Deluxe Double rooms feature a plush king-size bed and premium comforts, perfect for guests seeking a refined stay with modern amenities including high-speed Wi-Fi, air conditioning, and a flat-screen TV in Islamabad.
              </p>
            </div>

            <hr className="section-divider" />

            {/* Features & Facilities */}
            <div className="room-section-block">
              <h3>Room Features</h3>
              <div className="features-grid">
                <div className="feature-item">✔ Air Conditioning & Climate Control</div>
                <div className="feature-item">✔ High-Speed Wi-Fi Internet</div>
                <div className="feature-item">✔ Flat Screen LED TV (Cable Channels)</div>
                <div className="feature-item">✔ Mini Bar & Tea/Coffee Maker</div>
                <div className="feature-item">✔ Electronic Safe Box</div>
                <div className="feature-item">✔ Attached Modern Bathroom with Hot Water</div>
              </div>
            </div>

            <hr className="section-divider" />

            {/* Amenities Boxes */}
            <div className="room-section-block">
              <h3>Complimentary Amenities</h3>
              <div className="amenities-grid-boxes">
                <div className="amenity-box">
                  <div className="amenity-icon-wrapper"><FaCoffee /></div>
                  <span>Daily Breakfast Included</span>
                </div>
                <div className="amenity-box">
                  <div className="amenity-icon-wrapper"><FaWifi /></div>
                  <span>Free High-Speed Wi-Fi</span>
                </div>
                <div className="amenity-box">
                  <div className="amenity-icon-wrapper"><FaConciergeBell /></div>
                  <span>24/7 Room Service</span>
                </div>
                <div className="amenity-box">
                  <div className="amenity-icon-wrapper"><FaShieldAlt /></div>
                  <span>Secure Parking & Security</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="double-right-col">
            <div className="reserve-card">
              <span className="reserve-badge">Best Rate Guaranteed</span>
              <h3>Deluxe Double</h3>
              <p className="reserve-sub">Luxurious stay with premium facilities</p>

              <div className="reserve-info-rows">
                <div className="info-row">
                  <span>Price per night</span>
                  <strong>Rs. 15,000</strong>
                </div>
                <hr />
                <div className="info-row">
                  <span>Capacity</span>
                  <strong>2 Adults</strong>
                </div>
                <hr />
                <div className="info-row">
                  <span>Bed Type</span>
                  <strong>1 King Bed</strong>
                </div>
                <hr />
                <div className="info-row">
                  <span>Status</span>
                  <strong style={{ color: '#27ae60' }}>Available</strong>
                </div>
              </div>

              <Link to="/contact" className="book-this-room-btn">
                Book This Room Now
              </Link>
              
              <p className="reserve-note">
                * Taxes and service charges may apply. Free cancellation up to 24 hours before check-in.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Other Rooms Section (4 Cards with Unique Images & Text) */}
      <section className="other-rooms-section">
        <div className="other-rooms-container">
          <div className="other-rooms-header">
            <span className="other-rooms-subtitle">Explore More</span>
            <h2>Other Room Categories</h2>
          </div>

          <div className="rooms-cards-grid">
            {/* Card 1 */}
            <div className="other-room-card">
              <div className="other-room-img"><img src={cardImg1} alt="Twin Standard Room" /></div>
              <div className="other-room-info">
                <h3>Twin Standard Room</h3>
                <p>Ideal for solo travelers or friends, our Twin Standard rooms offer a comfortable twin-bed...</p>
                <Link to="/rooms/twin-standard-room-in-islamabad" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="other-room-card">
              <div className="other-room-img"><img src={cardImg2} alt="Deluxe Twin Rooms" /></div>
              <div className="other-room-info">
                <h3>Deluxe Twin Rooms</h3>
                <p>Our Deluxe Twin rooms feature spacious twin beds, and premium comforts, perfect for guests seeking...</p>
                <Link to="/rooms/deluxe-twin-rooms-in-islamabad" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="other-room-card">
              <div className="other-room-img"><img src={cardImg3} alt="Executive Twin Grace" /></div>
              <div className="other-room-info">
                <h3>Executive Twin Grace</h3>
                <p>Designed for luxury stays, the Executive Twin Grace room combines spacious twin beds with a...</p>
                <Link to="/rooms/executive-twin-grace-room-in-islamabad" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="other-room-card">
              <div className="other-room-img"><img src={cardImg4} alt="Executive Grace Double" /></div>
              <div className="other-room-info">
                <h3>Executive Grace Double</h3>
                <p>Our Executive Grace Double rooms provide a luxurious double bed, expansive space, and...</p>
                <Link to="/rooms/executive-grace-double-rooms-in-islamabad" className="view-room-link">View Room →</Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DeluxeDoubleRoom;