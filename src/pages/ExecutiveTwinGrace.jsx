import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWifi, FaCoffee, FaConciergeBell, FaShieldAlt, FaUserFriends, FaBed } from 'react-icons/fa';
import '../style/ExecutiveTwinGrace.css';

export default function ExecutiveTwinGrace() {
  const roomImages = [
    "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp",
    "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/2.webp",
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="twin-room-page">
      <Helmet>
        <title>Executive Twin Grace Room in Islamabad | Hotel Crown CP</title>
        <meta 
          name="description" 
          content="Experience luxury in the Executive Twin Grace room at Hotel Crown CP Islamabad. Enjoy spacious twin beds, premium amenities, and top-notch comfort." 
        />
        <link rel="canonical" href="https://hotelcrowncp.com/rooms/executive-twin-grace-room-in-islamabad" />
        <meta name="keywords" content="executive twin room Islamabad, executive grace suite, luxury business hotel room Islamabad, Crown Plaza executive suites" />
      </Helmet>

      {/* Hero Section */}
      <section 
        className="twin-hero" 
        style={{ 
          backgroundImage: `url(${roomImages[0]})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          height: '350px', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff'
        }}
      >
        <div 
          className="twin-hero-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="twin-hero-content" style={{ zIndex: 2, padding: '0 20px', marginLeft: '-550px' }}>
            <span className="twin-hero-subtitle" style={{ display: 'block', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '-25px', color: '#d4af37', fontWeight: 600 }}>
              HOTEL CROWN CP ISLAMABAD
            </span>
            <h1 style={{ fontSize: '45px', marginBottom: '5px', fontWeight: 700 }}>Executive Twin Grace</h1>
            <p style={{ fontSize: '15px', maxWidth: '600px', margin: '0 auto', color: '#e0e0e0' }}>
              Designed for luxury stays, the Executive Twin Grace room combines spacious twin beds with premium amenities and refined comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="twin-details-section">
        <div className="twin-container">
          
          {/* Left Column */}
          <div className="twin-left-col">
            <div className="main-active-img-box">
              <img src={roomImages[activeImageIndex]} alt="Executive Twin Grace Room Islamabad" />
            </div>

            <div className="thumbnails-row">
              {roomImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumb-box ${activeImageIndex === index ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img} alt={`Executive Twin Grace Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="twin-quick-tags">
              <span><FaBed /> Executive Twin Beds</span>
              <span><FaUserFriends /> Max 2 Guests</span>
              <span>Free Wi-Fi</span>
            </div>

            {/* Overview Section */}
            <div className="room-section-block">
              <h3>Overview</h3>
              <p>
                Designed for luxury stays, the Executive Twin Grace room combines spacious twin beds with an upscale interior, high-end furniture, and top-notch amenities to provide an exceptional experience in Islamabad.
              </p>
            </div>

            <hr className="section-divider" />

            {/* Detailed Description Section */}
            <div className="room-section-block">
              <h3>Luxurious Space & Unmatched Elegance</h3>
              <p>
                Experience superior hospitality in our Executive Twin Grace rooms. Featuring a sophisticated decor, plush bedding, and contemporary facilities, this room is tailored for corporate travelers and families looking for elite comfort in the heart of the city.
              </p>
            </div>

            <hr className="section-divider" />

            {/* Room Features Checkmarks */}
            <div className="room-section-block">
              <h3>Room Features</h3>
              <div className="features-grid">
                <div className="feature-item">✔ Premium Executive Twin Beds</div>
                <div className="feature-item">✔ High-Speed Wi-Fi Internet</div>
                <div className="feature-item">✔ LED Smart TV with Cable Channels</div>
                <div className="feature-item">✔ Mini Bar & Tea/Coffee Maker</div>
                <div className="feature-item">✔ Digital Safe & Work Desk</div>
                <div className="feature-item">✔ Executive Bathroom with Luxury Toiletries</div>
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

          {/* Right Column: Reserve Your Stay Card */}
          <div className="twin-right-col">
            <div className="reserve-card">
              <span className="reserve-badge">BEST DIRECT RATE</span>
              <h3>Reserve Your Stay</h3>
              <p className="reserve-sub">Select your dates to view live availability and the best available rate for this room.</p>
              
              <div className="reserve-info-rows">
                <div className="info-row">
                  <span>Check-in</span>
                  <strong>2:00 PM</strong>
                </div>
                <hr />
                <div className="info-row">
                  <span>Check-out</span>
                  <strong>12:00 PM</strong>
                </div>
                <hr />
                <div className="info-row">
                  <span>Wi-Fi</span>
                  <strong>Complimentary</strong>
                </div>
              </div>

              <Link to="/contact" className="book-this-room-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Book This Room
              </Link>

              <p className="reserve-note">
                Free cancellation on eligible rates. Airport pickup available on request.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Other Room Categories Section */}
      <section className="other-rooms-section">
        <div className="other-rooms-container">
          <div className="other-rooms-header">
            <span className="other-rooms-subtitle">EXPLORE MORE</span>
            <h2>Other Room Categories</h2>
          </div>

          <div className="rooms-cards-grid">
            {/* Card 1 */}
            <div className="other-room-card">
              <div className="other-room-img">
                <img src="https://hotelcrowncp.com/assets/images/rooms/standard%20twin/1.webp" alt="Twin Standard Room Islamabad" />
              </div>
              <div className="other-room-info">
                <h3>Twin Standard Room</h3>
                <p>Cozy Twin Standard rooms designed for comfort and convenience, perfect for solo travelers...</p>
                <Link to="/twin-standard-room" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="other-room-card">
              <div className="other-room-img">
                <img src="https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp" alt="Deluxe Twin Rooms Islamabad" />
              </div>
              <div className="other-room-info">
                <h3>Deluxe Twin Rooms</h3>
                <p>Our Deluxe Twin rooms feature spacious twin beds, and premium comforts, perfect for guests seeking...</p>
                <Link to="/deluxe-twin-room" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="other-room-card">
              <div className="other-room-img">
                <img src="https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp" alt="Deluxe Double Room Islamabad" />
              </div>
              <div className="other-room-info">
                <h3>Deluxe Double</h3>
                <p>Enjoy a deluxe double room with elegant interiors, a plush double bed, and modern conveniences...</p>
                <Link to="/deluxe-double-room" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="other-room-card">
              <div className="other-room-img">
                <img src="https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/1.webp" alt="Executive Grace Double Room Islamabad" />
              </div>
              <div className="other-room-info">
                <h3>Executive Grace Double</h3>
                <p>Our Executive Grace Double rooms provide a luxurious double bed, expansive space, and...</p>
                <Link to="/rooms/executive-double-room-in-islamabad" className="view-room-link">View Room →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}