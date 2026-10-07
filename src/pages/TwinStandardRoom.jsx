import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWifi, FaCoffee, FaConciergeBell, FaShieldAlt, FaUserFriends, FaBed } from 'react-icons/fa';
import '../style/TwinStandardRoom.css';

export default function TwinStandardRoom() {
  const roomImages = [
    "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/1.webp",
    "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/2.webp",
    "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/3.webp",
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="twin-room-page">
      {/* SEO & Meta Tags Optimization */}
      <Helmet>
        <title>Twin Standard Room in Islamabad | Hotel Crown CP</title>
        <meta name="description" content="Book cozy Twin Standard rooms at Hotel Crown CP Islamabad. Enjoy comfortable twin beds, complimentary breakfast, free Wi-Fi, and modern amenities in the Blue Area." />
        <meta name="keywords" content="Twin Standard Room Islamabad, Hotel Crown CP rooms, budget hotel Islamabad, twin beds hotel Blue Area" />
        <link rel="canonical" href="https://hotelcrowncp.com/rooms/twin-standard-room-in-islamabad" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Twin Standard Room in Islamabad | Hotel Crown CP" />
        <meta property="og:description" content="Cozy Twin Standard rooms designed for comfort and convenience, perfect for solo travelers or friends visiting Islamabad." />
        <meta property="og:image" content="https://hotelcrowncp.com/assets/images/rooms/standard%20twin/1.webp" />
        <meta property="og:url" content="https://hotelcrowncp.com/rooms/twin-standard-room-in-islamabad" />
        <meta name="keywords" content="standard twin room Islamabad, twin bed hotel room, Crown Plaza rooms, affordable luxury hotel Islamabad, twin room booking" />

        <meta property="og:type" content="website" />
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
          <div className="twin-hero-content" style={{ zIndex: 2, padding: '0 20px', marginLeft: '-520px' }}>
            <span className="twin-hero-subtitle" style={{ display: 'block', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '-19px', color: '#d4af37', fontWeight: 600 }}>
              HOTEL CROWN CP ISLAMABAD
            </span>
            <h1 style={{ fontSize: '45px', marginBottom: '10px', fontWeight: 700 }}>Twin Standard Room</h1>
            <p style={{ fontSize: '15px', maxWidth: '600px', margin: '0 auto', color: '#e0e0e0' }}>
              Cozy Twin Standard rooms designed for comfort and convenience, perfect for solo travelers or friends visiting Islamabad.
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
              <img src={roomImages[activeImageIndex]} alt="Twin Standard Room" />
            </div>

            <div className="thumbnails-row">
              {roomImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumb-box ${activeImageIndex === index ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="twin-quick-tags">
              <span><FaBed /> 2 Single Beds</span>
              <span><FaUserFriends /> Max 2 Guests</span>
              <span>Free Wi-Fi</span>
            </div>

            {/* Overview Section */}
            <div className="room-section-block">
              <h3>Overview</h3>
              <p>
                Ideal for solo travellers or friends, our Twin Standard rooms offer a comfortable twin-bed layout with modern amenities including free Wi-Fi, air conditioning, and flat-screen TV, ensuring a relaxing stay in Islamabad.
              </p>
            </div>

            <hr className="section-divider" />

            {/* Detailed Description Section */}
            <div className="room-section-block">
              <h3>Comfortable Twin Room for Relaxed Stays in Islamabad</h3>
              <p>
                Enjoy a cozy twin room featuring modern interiors, two comfortable twin beds, and a thoughtfully designed layout. Perfect for friends, colleagues, or solo travelers seeking comfort, convenience, and a relaxing stay in the vibrant Blue Area of Islamabad. Equipped with all essential amenities for a seamless experience.
              </p>
            </div>

            <hr className="section-divider" />

            {/* Room Features Checkmarks */}
            <div className="room-section-block">
              <h3>Room Features</h3>
              <div className="features-grid">
                <div className="feature-item">✔ 2 Single Beds</div>
                <div className="feature-item">✔ Complimentary Breakfast (7am-10am)</div>
                <div className="feature-item">✔ Welcome Drink on Arrival</div>
                <div className="feature-item">✔ Free Wi-Fi Internet</div>
                <div className="feature-item">✔ Daily Newspaper & Mineral Water</div>
                <div className="feature-item">✔ Air Conditioning & 42" LED TV</div>
              </div>
            </div>

            <hr className="section-divider" />

            {/* Amenities Boxes */}
            <div className="room-section-block">
              <h3>Complimentary Amenities</h3>
              <div className="amenities-grid-boxes">
                <div className="amenity-box">
                  <div className="amenity-icon-wrapper"><FaCoffee /></div>
                  <span>Complimentary Breakfast</span>
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
                <img src="https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp" alt="Deluxe Twin Rooms" />
              </div>
              <div className="other-room-info">
                <h3>Deluxe Twin Rooms</h3>
                <p>Our Deluxe Twin rooms feature spacious twin beds, and premium comforts, perfect for guests seeking...</p>
                <Link to="/rooms/deluxe-twin-rooms-in-islamabad" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="other-room-card">
              <div className="other-room-img">
                <img src="https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp" alt="Deluxe Double" />
              </div>
              <div className="other-room-info">
                <h3>Deluxe Double</h3>
                <p>Enjoy a deluxe double room with elegant interiors, a plush double bed, and modern conveniences...</p>
                <Link to="/rooms/deluxe-double-room-in-islamabad" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="other-room-card">
              <div className="other-room-img">
                <img src="https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp" alt="Executive Twin Grace" />
              </div>
              <div className="other-room-info">
                <h3>Executive Twin Grace</h3>
                <p>Designed for luxury stays, the Executive Twin Grace room combines spacious twin beds with a...</p>
                <Link to="/rooms/executive-twin-grace-room-in-islamabad" className="view-room-link">View Room →</Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="other-room-card">
              <div className="other-room-img">
                <img src="https://hotelcrowncp.com/assets/images/rooms/executive%20grace%20double/1.webp" alt="Executive Grace Double" />
              </div>
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
}