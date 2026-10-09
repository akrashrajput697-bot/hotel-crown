import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import '../Style/Rooms.css';
import { Crown, Star, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

function Rooms() {
  const [activeTab, setActiveTab] = useState('All');

  // Har room ke liye multiple images ka array bana diya hai taake arrows se change ho sakein
  const roomsData = [
    {
      id: 1,
      category: 'Deluxe Double',
      title: 'Deluxe Double Room',
      description: 'A quiet city sanctuary, dressed in rich neutral textures and thoughtful details.',
      price: '45000 PKR',
      per: 'PER NIGHT',
      specs: 'Up to 2 guests • One king bed',
      images: [
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/2.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/3.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/4.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/5.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/6.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/7.webp'
      ],
      path: '/deluxe-double'
    },
    {
      id: 2,
      category: 'Deluxe Twin',
      title: 'Deluxe Twin Room',
      description: 'Room to settle in, with a separate sitting corner for slow mornings and late evenings.',
      price: '55000 PKR',
      per: 'PER NIGHT',
      specs: 'Up to 2 guests • One king bed',
      images: [
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20twin/2.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20twin/3.webp'
      ],
      path: '/deluxe-twin'
    },
    {
      id: 3,
      category: 'Executive Twin',
      title: 'Executive Twin Room',
      description: 'Spacious and luxurious suite designed for families or extended comfortable stays.',
      price: '85000 PKR',
      per: 'PER NIGHT',
      specs: 'Up to 4 guests • Two king beds',
      images: [
        'https://www.hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp',
        'https://www.hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/2.webp'
      ],
      path: '/executive-twin'
    },
    {
      id: 4,
      category: 'Premier Suite',
      title: 'Premier Suite Room',
      description: 'The ultimate luxury experience with panoramic views and top-tier amenities.',
      price: '95000 PKR',
      per: 'PER NIGHT',
      specs: 'Up to 5 guests • Multi-room suite',
      images: [
        'https://api.envoyhotel.com/uploads/1779192683149-Premier_Suite_Room_(2).jpg',
        'https://api.envoyhotel.com/uploads/1779192711035-Premier_Suite_Room_(3).jpg',
        'https://api.envoyhotel.com/uploads/1779192711041-Premier_Suite_Room_(4).jpg',
        'https://api.envoyhotel.com/uploads/1779192711048-Premier_Suite_Room_(5).jpg'
      ],
      path: '/premier-suite'
    },
    {
      id: 5,
      category: 'Executive King',
      title: 'Executive King Room',
      description: 'Modern king room equipped with plush bedding and contemporary working space.',
      price: '75000 PKR',
      per: 'PER NIGHT',
      specs: 'Up to 2 guests • One king bed',
      images: [
        'https://api.envoyhotel.com/uploads/1779192349166-Executive_King_Room_(3).jpg',
        'https://api.envoyhotel.com/uploads/1779192427027-Executive_King_Room_(2).jpg',
        'https://api.envoyhotel.com/uploads/1779192427032-Executive_King_Room_(4).jpg',
        'https://api.envoyhotel.com/uploads/1779192427037-Executive_King_Room_(5).jpg',
        'https://api.envoyhotel.com/uploads/1779192427047-Executive_King_Room.jpg'
      ],
      path: '/executive-king'
    },
    {
      id: 6,
      category: 'Deluxe Family',
      title: 'Deluxe Family Room',
      description: 'An expansive luxury hotel suite offering supreme comfort, style, and city vistas.',
      price: '65000 PKR',
      per: 'PER NIGHT',
      specs: 'Up to 3 guests • One king bed',
      images: [
        'https://api.envoyhotel.com/uploads/1779192228389-Deluxe_Family_Room_(5).jpg',
        'https://api.envoyhotel.com/uploads/1779192293751-Deluxe_Family_Room_(2).jpg',
        'https://api.envoyhotel.com/uploads/1779192293757-Deluxe_Family_Room_(3).jpg',
        'https://api.envoyhotel.com/uploads/1779192293761-Deluxe_Family_Room_(5).jpg',
        'https://api.envoyhotel.com/uploads/1779192293772-Deluxe_Family_Room.jpg'
      ],
      path: '/deluxe-family'
    }
  ];

  // Har room ke liye alag image index track karne ke liye state
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  const handleNextImage = (id, maxLen, e) => {
    e.preventDefault();
    setCurrentImageIndices(prev => ({
      ...prev,
      [id]: prev[id] === undefined ? 1 : (prev[id] + 1) % maxLen
    }));
  };

  const handlePrevImage = (id, maxLen, e) => {
    e.preventDefault();
    setCurrentImageIndices(prev => ({
      ...prev,
      [id]: prev[id] === undefined || prev[id] === 0 ? maxLen - 1 : prev[id] - 1
    }));
  };

  const filteredRooms = activeTab === 'All'
    ? roomsData
    : roomsData.filter(room => room.category === activeTab);

  return (
    <div className="rooms-page">
      <Helmet>
        <title>Luxury Rooms & Suites | The Regal Hotel & Residences</title>
        <meta name="description" content="Explore exquisite 5-star rooms and luxury suites at The Regal. From Deluxe Double to Premier Suites, enjoy top-tier amenities, best price guarantee, and secure booking." />
        <meta name="keywords" content="luxury rooms, hotel suites, deluxe double room, executive king room, premier suite, hotel booking, 5-star accommodation" />
        <meta name="author" content="The Regal Hotel & Residences" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/rooms" />

        <meta property="og:title" content="Luxury Rooms & Suites | The Regal Hotel & Residences" />
        <meta property="og:description" content="Explore exquisite 5-star rooms and luxury suites at The Regal. Book your stay for ultimate comfort and elegance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/rooms" />
        <meta property="og:image" content="https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Rooms & Suites | The Regal Hotel & Residences" />
        <meta name="twitter:description" content="Explore exquisite 5-star rooms and luxury suites at The Regal." />
        <meta name="twitter:image" content="https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp" />
      </Helmet>

      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-kicker">Accommodations</span>
          <h1>Exquisite Rooms & Suites</h1>
          <p>Discover private sanctuaries designed for ultimate comfort, elegance, and serenity.</p>
          <div className="hero-trust-bar">
            <div className="hero-trust-item"><Crown size={16} /> Best Price Guarantee</div>
            <div className="hero-trust-item"><ShieldCheck size={16} /> Secure Booking</div>
            <div className="hero-trust-item"><Star size={16} /> 24/7 Room Service</div>
          </div>
        </div>
      </section>

      <section className="regal-rooms-section">
        <div className="rooms-container">
          <div className="rooms-header">
            <span className="rooms-subtitle">Chose your stay</span>
            <h2>Find the right kind of room</h2>

            <div className="rooms-tabs">
              {['All', 'Deluxe Double', 'Deluxe Twin', 'Executive Twin', 'Premier Suite', 'Executive King', 'Deluxe Family'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'All' ? 'All rooms' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="rooms-grid">
            {filteredRooms.map((room) => {
              const activeImgIndex = currentImageIndices[room.id] || 0;
              return (
                <div className="room-card" key={room.id}>
                  <div className="room-image-wrapper" style={{ position: 'relative' }}>
                    <img src={room.images[activeImgIndex]} alt={room.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                    <span className="room-badge">{room.category.toUpperCase()}</span>

                    {/* Left Arrow */}
                    <button
                      onClick={(e) => handlePrevImage(room.id, room.images.length, e)}
                      className="slider-arrow left-arrow"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={(e) => handleNextImage(room.id, room.images.length, e)}
                      className="slider-arrow right-arrow"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="room-content">
                    <div className="room-title-price">
                      <h3>{room.title}</h3>
                      <div className="room-price-box">
                        <span className="price">{room.price}</span>
                        <span className="per">{room.per}</span>
                      </div>
                    </div>
                    <p className="room-desc">{room.description}</p>
                    <div className="room-meta">
                      <span>{room.specs}</span>
                    </div>
                    <Link to={room.path} className="book-now-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Rooms;