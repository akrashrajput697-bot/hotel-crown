import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaWifi, FaCoffee, FaConciergeBell, FaShieldAlt, FaUserFriends, FaBed } from 'react-icons/fa';
import '../style/ExecutiveGraceDouble.css';

export default function ExecutiveGraceDouble() {
  const roomImages = [
    "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/1.webp",
    "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/2.webp",
    "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/3.webp",
    "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/4.webp",
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="executive-double-page" style={{ display: 'block', width: '100%', minHeight: '100vh', background: '#fff' }}>
      {/* SEO & Meta Tags Optimization */}
      <Helmet>
        <title>Executive Grace Double Room in Islamabad | Hotel Crown CP</title>
        <meta name="description" content="Indulge in absolute luxury with the Executive Grace Double room at Hotel Crown CP Islamabad. Enjoy an elite king bed, premium amenities, and top-tier hospitality." />
        <meta name="keywords" content="Executive Grace Double Islamabad, Hotel Crown CP luxury room, VIP hotel accommodation Blue Area, Islamabad hotel suites" />
        <link rel="canonical" href="https://hotelcrowncp.com/rooms/executive-grace-double-rooms-in-islamabad" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Executive Grace Double Room in Islamabad | Hotel Crown CP" />
        <meta property="og:description" content="Our Executive Grace Double rooms provide a luxurious double bed, expansive space, and elite comfort for a memorable stay." />
        <meta property="og:image" content={roomImages[0]} />
        <meta property="og:url" content="https://hotelcrowncp.com/rooms/executive-grace-double-rooms-in-islamabad" />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="executive double room Islamabad, luxury executive suite, business hotel Islamabad, Crown Plaza executive double" />
      </Helmet>

      {/* Hero Section */}
      <section 
        className="executive-double-hero" 
        style={{ 
          backgroundImage: `url(${roomImages[0]})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '350px', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff'
        }}
      >
        <div 
          className="executive-double-hero-overlay"
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
          <div className="executive-double-hero-content" style={{ zIndex: 2, padding: '40px 20px' }}>
            <span style={{ display: 'block', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', color: '#d4af37', fontWeight: 600 }}>
              HOTEL CROWN CP ISLAMABAD
            </span>
            <h1 style={{ fontSize: '42px', marginBottom: '10px', fontWeight: 700 }}>Executive Grace Double</h1>
            <p style={{ fontSize: '15px', maxWidth: '600px', margin: '0 auto', color: '#e0e0e0' }}>
              Our Executive Grace Double rooms provide a luxurious double bed, expansive space, and elite comfort for a memorable stay.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="executive-double-details-section" style={{ padding: '60px 0', display: 'block' }}>
        <div className="executive-double-container" style={{ width: '90%', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          
          {/* Left Column */}
          <div className="executive-double-left-col" style={{ flex: '2', minWidth: '300px' }}>
            <div className="main-active-img-box" style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', height: '400px' }}>
              <img src={roomImages[activeImageIndex]} alt="Executive Grace Double" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="thumbnails-row" style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
              {roomImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumb-box ${activeImageIndex === index ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                  style={{ width: '90px', height: '70px', cursor: 'pointer', borderRadius: '6px', overflow: 'hidden', border: activeImageIndex === index ? '2px solid #d4af37' : '2px solid transparent' }}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            <div className="executive-double-quick-tags" style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <span style={{ background: '#f5f5f5', padding: '8px 15px', borderRadius: '4px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaBed /> Executive Double Bed</span>
              <span style={{ background: '#f5f5f5', padding: '8px 15px', borderRadius: '4px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaUserFriends /> Max 2 Guests</span>
              <span style={{ background: '#f5f5f5', padding: '8px 15px', borderRadius: '4px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><FaWifi /> Free Wi-Fi</span>
            </div>

            {/* Overview Section */}
            <div className="room-section-block" style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#222' }}>Overview</h3>
              <p style={{ color: '#666', lineHeight: '1.7' }}>
                Indulge in absolute luxury with our Executive Grace Double room, featuring a lavish double bed, elegant interior styling, and premium amenities tailored for VIP guests and couples looking for a sophisticated stay.
              </p>
            </div>

            <hr className="section-divider" style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

            {/* Detailed Description Section */}
            <div className="room-section-block" style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#222' }}>Sophistication & Ultimate Comfort</h3>
              <p style={{ color: '#666', lineHeight: '1.7' }}>
                Designed with meticulous attention to detail, the Executive Grace Double room offers supreme comfort, high-end furniture, a spacious work station, and premium bathroom fittings. It provides an exclusive retreat right in retail and commercial hubs of Islamabad.
              </p>
            </div>

            <hr className="section-divider" style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

            {/* Room Features Checkmarks */}
            <div className="room-section-block" style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#222' }}>Room Features</h3>
              <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div className="feature-item" style={{ color: '#555' }}>✔ Plush Executive Double Bed</div>
                <div className="feature-item" style={{ color: '#555' }}>✔ Complimentary Breakfast & Welcome Drink</div>
                <div className="feature-item" style={{ color: '#555' }}>✔ High-Speed Wi-Fi Internet</div>
                <div className="feature-item" style={{ color: '#555' }}>✔ Smart LED TV with Entertainment Channels</div>
                <div className="feature-item" style={{ color: '#555' }}>✔ Electronic Safe & Mini Bar</div>
                <div className="feature-item" style={{ color: '#555' }}>✔ Premium Toiletries & Bathrobe</div>
              </div>
            </div>

            <hr className="section-divider" style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />

            {/* Amenities Boxes */}
            <div className="room-section-block">
              <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#222' }}>Complimentary Amenities</h3>
              <div className="amenities-grid-boxes" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                <div className="amenity-box" style={{ background: '#fafafa', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee' }}>
                  <div className="amenity-icon-wrapper" style={{ fontSize: '24px', color: '#d4af37', marginBottom: '10px' }}><FaCoffee /></div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>Complimentary Breakfast</span>
                </div>
                <div className="amenity-box" style={{ background: '#fafafa', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee' }}>
                  <div className="amenity-icon-wrapper" style={{ fontSize: '24px', color: '#d4af37', marginBottom: '10px' }}><FaWifi /></div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>Free High-Speed Wi-Fi</span>
                </div>
                <div className="amenity-box" style={{ background: '#fafafa', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee' }}>
                  <div className="amenity-icon-wrapper" style={{ fontSize: '24px', color: '#d4af37', marginBottom: '10px' }}><FaConciergeBell /></div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>24/7 Room Service</span>
                </div>
                <div className="amenity-box" style={{ background: '#fafafa', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee' }}>
                  <div className="amenity-icon-wrapper" style={{ fontSize: '24px', color: '#d4af37', marginBottom: '10px' }}><FaShieldAlt /></div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>Secure Parking & Security</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Reserve Your Stay Card */}
          <div className="executive-double-right-col" style={{ flex: '1', minWidth: '280px' }}>
            <div className="reserve-card" style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
              <span className="reserve-badge" style={{ background: '#d4af37', color: '#fff', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', borderRadius: '4px', letterSpacing: '1px' }}>BEST DIRECT RATE</span>
              <h3 style={{ fontSize: '22px', margin: '15px 0 5px', color: '#222' }}>Reserve Your Stay</h3>
              <p className="reserve-sub" style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>Select your dates to view live availability and the best available rate for this room.</p>
              
              <div className="reserve-info-rows" style={{ marginBottom: '20px' }}>
                <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', color: '#444' }}>
                  <span>Check-in</span>
                  <strong>2:00 PM</strong>
                </div>
                <hr style={{ border: '0', borderTop: '1px solid #f1f1f1' }} />
                <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', color: '#444' }}>
                  <span>Check-out</span>
                  <strong>12:00 PM</strong>
                </div>
                <hr style={{ border: '0', borderTop: '1px solid #f1f1f1' }} />
                <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', color: '#444' }}>
                  <span>Wi-Fi</span>
                  <strong>Complimentary</strong>
                </div>
              </div>

              <Link to="/contact" className="book-this-room-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#222', color: '#fff', padding: '12px', borderRadius: '4px', fontWeight: 'bold', transition: 'background 0.3s' }}>
                Book This Room
              </Link>

              <p className="reserve-note" style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '15px' }}>
                Free cancellation on eligible rates. Airport pickup available on request.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Other Room Categories Section */}
      <section className="other-rooms-section" style={{ padding: '60px 0', background: '#f9f9f9', display: 'block' }}>
        <div className="other-rooms-container" style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="other-rooms-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="other-rooms-subtitle" style={{ color: '#d4af37', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>EXPLORE MORE</span>
            <h2 style={{ fontSize: '32px', color: '#222', marginTop: '5px' }}>Other Room Categories</h2>
          </div>

          <div className="rooms-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
            {/* Card 1 */}
            <div className="other-room-card" style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
              <div className="other-room-img" style={{ height: '180px' }}>
                <img src="https://hotelcrowncp.com/assets/images/rooms/standard%20twin/1.webp" alt="Twin Standard Room" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="other-room-info" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#222' }}>Twin Standard Room</h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>Cozy Twin Standard rooms designed for comfort and convenience, perfect for solo travelers...</p>
                <Link to="/rooms/twin-standard-room-in-islamabad" className="view-room-link" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>View Room →</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="other-room-card" style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
              <div className="other-room-img" style={{ height: '180px' }}>
                <img src="https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp" alt="Deluxe Twin Rooms" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="other-room-info" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#222' }}>Deluxe Twin Rooms</h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>Our Deluxe Twin rooms feature spacious twin beds, and premium comforts, perfect for guests seeking...</p>
                <Link to="/rooms/deluxe-twin-rooms-in-islamabad" className="view-room-link" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>View Room →</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="other-room-card" style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
              <div className="other-room-img" style={{ height: '180px' }}>
                <img src="https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp" alt="Deluxe Double" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="other-room-info" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#222' }}>Deluxe Double</h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>Enjoy a deluxe double room with elegant interiors, a plush double bed, and modern conveniences...</p>
                <Link to="/rooms/deluxe-double-room-in-islamabad" className="view-room-link" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>View Room →</Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="other-room-card" style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 3px 10px rgba(0,0,0,0.05)' }}>
              <div className="other-room-img" style={{ height: '180px' }}>
                <img src="https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp" alt="Executive Twin Grace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="other-room-info" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#222' }}>Executive Twin Grace</h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>Designed for luxury stays, the Executive Twin Grace room combines spacious twin beds with a...</p>
                <Link to="/rooms/executive-twin-grace-room-in-islamabad" className="view-room-link" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>View Room →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}