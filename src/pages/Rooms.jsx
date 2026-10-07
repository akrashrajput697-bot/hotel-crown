import React, { useState } from 'react';
import '../style/Rooms.css';
import { Helmet } from 'react-helmet-async';

export default function Rooms() {
  const roomsData = [
    {
      title: "Twin Standard Room",
      slug: "twin-standard-room-in-islamabad",
      overview: "Ideal for solo travellers or friends, our Twin Standard rooms offer a comfortable twin-bed layout with modern amenities including free Wi-Fi, air conditioning, and a cozy workspace.",
      images: [
        "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/1.webp",
        "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/2.webp",
        "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/3.webp"
      ],
      tags: ["2 Single Beds", "Complimentary Breakfast", "Free Wi-Fi"],
      amenities: [
        { name: "Complimentary Breakfast", icon: "🍳" },
        { name: "Free Wi-Fi", icon: "📶" },
        { name: "Attached Bathroom", icon: "🚿" },
        { name: "Welcome Drink", icon: "🍹" }
      ]
    },
    {
      title: "Delux Twin Double",
      slug: "deluxe-twin-rooms-in-islamabad",
      overview: "Designed for couples or single guests looking for extra comfort, featuring a plush queen-size bed, air conditioning, high-speed Wi-Fi, and flat-screen TV.",
      images: [
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp",
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/2.webp",
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/3.webp"
      ],
      tags: ["1 Queen Bed", "Complimentary Breakfast", "Free Wi-Fi"],
      amenities: [
        { name: "Complimentary Breakfast", icon: "🍳" },
        { name: "Free Wi-Fi", icon: "📶" },
        { name: "Attached Bathroom", icon: "🚿" },
        { name: "Air Conditioning", icon: "❄️" }
      ]
    },
    {
      title: "Deluxe Double",
      slug: "deluxe-double-room-in-islamabad",
      overview: "Our premium executive suites offer spacious living areas, luxury bedding, top-tier amenities, and a dedicated workspace for business professionals and families.",
      images: [
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp",
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/2.webp",
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/3.webp",
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/4.webp",
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/5.webp",
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/6.webp",
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/7.webp"
      ],
      tags: ["1 King Bed", "Living Area", "Complimentary Breakfast"],
      amenities: [
        { name: "Complimentary Breakfast", icon: "🍳" },
        { name: "Free Wi-Fi", icon: "📶" },
        { name: "Mini Bar", icon: "🧊" },
        { name: "Room Service", icon: "🛎️" }
      ]
    },
    {
      title: "Executive Twin Double",
      slug: "executive-twin-grace-room-in-islamabad",
      overview: "Spacious and fully furnished family apartments featuring multiple beds, a cozy seating area, kitchen amenities, and panoramic views of Islamabad.",
      images: [
        "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp",
        "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/2.webp"
      ],
      tags: ["2 Queen Beds", "Family Lounge", "Kitchenette"],
      amenities: [
        { name: "Complimentary Breakfast", icon: "🍳" },
        { name: "Free Wi-Fi", icon: "📶" },
        { name: "Kitchen Facilities", icon: "🍳" },
        { name: "LED TV", icon: "📺" }
      ]
    },
    {
      title: "Executive Grace Double",
      slug: "executive-grace-double-rooms-in-islamabad",
      overview: "Experience unmatched luxury in our Royal Penthouse featuring premium king-size bedding, ultra-spacious living rooms, private balcony, and VIP guest services.",
      images: [
        "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/1.webp",
        "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/2.webp",
        "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/3.webp",
        "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/4.webp",
      ],
      tags: ["1 Master King Bed", "Private Balcony", "VIP Butler Service"],
      amenities: [
        { name: "Complimentary Breakfast", icon: "🍳" },
        { name: "Free Wi-Fi", icon: "📶" },
        { name: "Private Balcony", icon: "🌇" },
        { name: "VIP Service", icon: "⭐" }
      ]
    }
  ];

  const [currentIndices, setCurrentIndices] = useState(
    new Array(roomsData.length).fill(0)
  );

  const handlePrev = (roomIndex, length) => {
    setCurrentIndices(prev => {
      const updated = [...prev];
      updated[roomIndex] = updated[roomIndex] === 0 ? length - 1 : updated[roomIndex] - 1;
      return updated;
    });
  };

  const handleNext = (roomIndex, length) => {
    setCurrentIndices(prev => {
      const updated = [...prev];
      updated[roomIndex] = (updated[roomIndex] + 1) % length;
      return updated;
    });
  };

  // Book Now button click handler to save data and go to reservation page
  const handleBookNow = (room) => {
    const roomDataToSave = {
      roomName: room.title,
      roomSlug: room.slug,
      roomImage: room.images[0],
      totalNights: 1
    };
    localStorage.setItem('selected_room', JSON.stringify(roomDataToSave));
    window.location.href = '/reservation';
  };

  return (
    <div className="rooms-page">
      
      {/* SEO & Social Media Link Preview Tags for Rooms Page */}
      <Helmet>
        <title>Rooms & Suites | Crown Plaza Islamabad | Luxury Hotel</title>
        <meta name="description" content="Explore our signature rooms and luxury suites at Hotel Crown CP Islamabad. Book twin, deluxe, and executive rooms with premium amenities." />
        <link rel="canonical" href="https://crownplazaislamabad.com/rooms" />

        {/* WhatsApp & Facebook Link Preview (Open Graph) */}
        <meta property="og:title" content="Rooms & Suites | Crown Plaza Islamabad" />
        <meta property="og:description" content="Explore our signature rooms and luxury suites with premium amenities in the heart of Blue Area." />
        <meta property="og:url" content="https://crownplazaislamabad.com/rooms" />
        <meta property="og:image" content="https://hotelcrowncp.com/assets/images/rooms/standard%20twin/1.webp" />
        <meta name="keywords" content="luxury hotel rooms Islamabad, suites booking, family rooms in Islamabad, hotel room rates, book room online, deluxe rooms Islamabad" />
      </Helmet>

      <section className="rooms-hero">
        <div className="rooms-hero-overlay">
          <div className="rooms-hero-content">
            <span className="rooms-hero-subtitle">HOTEL CROWN CP ISLAMABAD</span>
            <h1>Rooms & Suites</h1>
            <p>Premium hotel apartments with space to work, rest, and feel at home — just minutes from Islamabad International Airport.</p>
          </div>
        </div>
      </section>

      <section className="signature-rooms-section">
        <div className="signature-container">
          <div className="signature-header">
            <h2>Explore Our Signature Rooms in Islamabad</h2>
            <p>
              Discover elegantly designed rooms in Islamabad at Hotel Crown CP. From cozy standard rooms to spacious executive suites, each accommodation offers premium amenities, comfort, and privacy for families, couples, and business travellers.
            </p>
          </div>

          <div className="rooms-list">
            {roomsData.map((room, index) => {
              const activeIndex = currentIndices[index];
              return (
                <div className="room-card-horizontal" key={index}>
                  
                  <div className="room-img-box">
                    <a href={`/rooms/${room.slug}`}>
                      <img src={room.images[activeIndex]} alt={room.title} style={{ cursor: 'pointer' }} />
                    </a>
                    
                    <button 
                      className="slider-arrow prev-arrow" 
                      onClick={(e) => { e.stopPropagation(); handlePrev(index, room.images.length); }}
                    >
                      &#10094;
                    </button>
                    <button 
                      className="slider-arrow next-arrow" 
                      onClick={(e) => { e.stopPropagation(); handleNext(index, room.images.length); }}
                    >
                      &#10095;
                    </button>

                    <div className="slider-dots">
                      {room.images.map((_, dotIdx) => (
                        <span 
                          key={dotIdx} 
                          className={`dot ${dotIdx === activeIndex ? 'active-dot' : ''}`}
                        ></span>
                      ))}
                    </div>
                  </div>

                  <div className="room-info-box">
                    <h3>
                      <a href={`/rooms/${room.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {room.title}
                      </a>
                    </h3>
                    
                    <span className="overview-label">Overview</span>
                    <p>{room.overview}</p>

                    <div className="room-tags">
                      {room.tags.map((tag, i) => (
                        <span key={i} className="room-tag-item">✓ {tag}</span>
                      ))}
                    </div>

                    <h4 className="amenities-title">Amenities</h4>
                    <div className="room-amenities-grid">
                      {room.amenities.map((am, i) => (
                        <div className="amenity-item" key={i}>
                          <span className="amenity-icon">{am.icon}</span>
                          <span className="amenity-name">{am.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="room-bottom-rate-box">
                      <div className="rate-text-info">
                        <span className="best-rate-badge">BEST DIRECT RATE</span>
                        <h5>Reserve Your Stay</h5>
                        <p>Check live availability & exclusive offers</p>
                      </div>
                      
                      <button 
                        className="room-book-now-btn" 
                        onClick={() => handleBookNow(room)}
                        style={{ cursor: 'pointer', border: 'none' }}
                      >
                        Book Now
                      </button>
                    </div>

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