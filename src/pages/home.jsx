import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../pages/Hero';
import '../style/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBriefcase, 
  faPlane, 
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet-async';

// Saare rooms ka data yahan hai
const roomsData = [
  {
    title: "Twin Standard Room",
    overview: "Ideal for solo travellers or friends, our Twin Standard rooms offer a comfortable twin-bed layout with modern amenities including free Wi-Fi, air conditioning, and...",
    tags: ["🛏️ 2 Single Beds", "🍳 Complimentary Breakfast", "📶 Free Wi-Fi"],
    amenities: [
      { icon: "🍳", name: "Complimentary Breakfast" },
      { icon: "📶", name: "Free Wi-Fi" },
      { icon: "🚿", name: "Attached Bathroom" },
      { icon: "🍹", name: "Welcome Drink on Arrival" }
    ],
    images: [
      "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/1.webp",
      "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/2.webp",
      "https://hotelcrowncp.com/assets/images/rooms/standard%20twin/3.webp"
    ]
  },
  {
    title: "Deluxe Twin Rooms",
    overview: "Designed for ultimate relaxation, our Deluxe Twin Rooms feature premium twin bedding, modern comforts, and stylish interiors tailored for a pleasant stay.",
    tags: ["🛏️ Twin Beds", "🍳 Complimentary Breakfast", "📶 Free Wi-Fi"],
    amenities: [
      { icon: "🍳", name: "Complimentary Breakfast" },
      { icon: "📶", name: "Free Wi-Fi" },
      { icon: "🚿", name: "Attached Bathroom" },
      { icon: "☕", name: "Coffee/Tea Maker" }
    ],
    images: [
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp",
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/2.webp",
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/3.webp"
    ]
  },
  {
    title: "Deluxe Double",
    overview: "Experience comfort in our Deluxe Double rooms, featuring a spacious double bed, elegant decor, and top-notch facilities for a luxurious experience.",
    tags: ["🛏️ Double Bed", "🍳 Complimentary Breakfast", "📶 High-Speed Wi-Fi"],
    amenities: [
      { icon: "🍳", name: "Complimentary Breakfast" },
      { icon: "📶", name: "Free Wi-Fi" },
      { icon: "🚿", name: "Luxury Bathroom" },
      { icon: "📺", name: "LED TV" }
    ],
    images: [
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp",
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/2.webp",
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/3.webp",
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/4.webp",
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/5.webp",
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/6.webp",
      "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/7.webp"
    ]
  },
  {
    title: "Executive Grace",
    overview: "Tailored for business executives and discerning travelers, the Executive Grace room provides an upscale atmosphere with exclusive amenities and elite comfort.",
    tags: ["🛏️ King Size Bed", "🍳 Breakfast Included", "💼 Work Desk"],
    amenities: [
      { icon: "🍳", name: "Complimentary Breakfast" },
      { icon: "📶", name: "High-Speed Wi-Fi" },
      { icon: "🚿", name: "Premium Bathroom" },
      { icon: "💼", name: "Executive Workspace" }
    ],
    images: [
      "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp",
      "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/2.webp"
    ]
  },
  {
    title: "Executive Grace Double",
    overview: "The pinnacle of luxury and space, our Executive Grace Double room combines elegant styling, wide double bedding, and supreme VIP hospitality.",
    tags: ["🛏️ Deluxe Double Bed", "🍳 Gourmet Breakfast", "🌟 VIP Service"],
    amenities: [
      { icon: "🍳", name: "Complimentary Breakfast" },
      { icon: "📶", name: "Free High-Speed Wi-Fi" },
      { icon: "🛁", name: "Bathtub & Shower" },
      { icon: "🍷", name: "Welcome Fruit Basket" }
    ],
    images: [
      "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/1.webp",
      "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/2.webp",
      "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/3.webp",
      "https://hotelcrowncp.com/assets/images/rooms/Executive%20grace%20double/4.webp"
    ]
  }
];

// Attractions Data
const attractionsData = [
  {
    title: "Faisal Mosque",
    description: "One of the largest mosques in the world, known for its unique contemporary architecture inspired by a Bedouin tent.",
    image: "https://hotelcrowncp.com/assets/images/Home/fasial.webp"
  },
  {
    title: "Rawal Lake",
    description: "A serene freshwater lake surrounded by lush greenery, ideal for boating, picnics, and family outings.",
    image: "https://hotelcrowncp.com/assets/images/Home/rawal.webp"
  },
  { 
    title: "Pakistan Monument & Museum",
    description: "A national landmark celebrating Pakistan's heritage, featuring unique architecture, murals, and a museum showcasing the country's history.",
    image: "https://hotelcrowncp.com/assets/images/Home/pakistan.webp"
  },
  {
    title: "Lok Virsa Museum",
    description: "A cultural museum displaying Pakistan's rich history, traditional crafts, folk art, and heritage artifacts.",
    image: "https://hotelcrowncp.com/assets/images/Home/lok1.webp"
  },
  {
    title: "Margalla Hills National Park",
    description: "A popular hiking and trekking destination, offering trails, wildlife spotting, and stunning natural landscapes just minutes from the city.",
    image: "https://hotelcrowncp.com/assets/images/Home/margalla.webp"
  },
  { 
    title: "Daman-e-Koh",
    description: "A scenic viewpoint in the Margalla Hills, Daman-e-Koh provides panoramic views of Islamabad, perfect for photography and nature walks.",
    image: "https://hotelcrowncp.com/assets/images/Home/damana.webp"
  }
];

function ScrollReveal({ as = 'div', className = '', children, ...props }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Element = as;

  return (
    <Element ref={elementRef} className={`scroll-reveal ${className}`} {...props}>
      {children}
    </Element>
  );
}

function RoomCard({ room, index }) {
  const [currentImg, setCurrentImg] = useState(0);

  const prevImage = () => {
    setCurrentImg((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImg((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <ScrollReveal
      className="room-card"
      style={{ marginBottom: '40px', '--reveal-delay': `${Math.min(index, 4) * 90}ms` }}
    >
      <div className="room-slider">
        <img src={room.images[currentImg]} alt={room.title} className="room-img" />
        <button className="slider-btn prev-btn" onClick={prevImage}>❮</button>
        <button className="slider-btn next-btn" onClick={nextImage}>❯</button>
      </div>

      <div className="room-details">
        <h3>{room.title}</h3>
        
        <div className="room-overview">
          <h4>Overview</h4>
          <p>{room.overview}</p>
          <div className="quick-tags">
            {room.tags.map((tag, idx) => (
              <span key={idx}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="room-amenities">
          <h4>Amenities</h4>
          <div className="amenities-grid">
            {room.amenities.map((amenity, idx) => (
              <div className="amenity-item" key={idx}>
                <span>{amenity.icon}</span>
                <small>{amenity.name}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="room-booking-box">
          <div className="rate-info">
            <span className="best-rate">BEST DIRECT RATE</span>
            <strong>Reserve Your Stay</strong>
            <small>Check live availability & exclusive offers</small>
          </div>
          <a href="https://wa.me/923241118206?text=Hi,%20I%20want%20to%20book%20a%20room." target="_blank" rel="noopener noreferrer" className="book-now-btn" style={{ textDecoration: 'none', textAlign: 'center', display: 'inline-block', lineHeight: 'normal' }}>Book Now</a>
        </div>
      </div>
    </ScrollReveal>
  );
}

function AttractionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCardsCount = 3;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? attractionsData.length - visibleCardsCount : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= attractionsData.length - visibleCardsCount ? 0 : prev + 1));
  };

  const currentBgImage = attractionsData[currentIndex]?.image || attractionsData[0].image;

  return (
    <section 
      className="attractions-section" 
      style={{ backgroundImage: `url(${currentBgImage})` }}
    >
      <div className="attractions-overlay"></div>
      <div className="attractions-container">
        <div className="attractions-header">
          <h2>Explore Popular Attractions in Islamabad During Your Stay</h2>
          <p>
            Hotel Crown CP Islamabad places you in the heart of the capital, just minutes from the city's most popular attractions in Islamabad. Whether you're exploring with family, friends, or on business, our hotel offers easy access to Islamabad's top destinations, making your trip unforgettable.
          </p>
        </div>

        <div className="attractions-slider-wrapper">
          <button className="attraction-nav-btn prev" onClick={prevSlide}>❮</button>
          
          <div className="attractions-cards-track">
            {attractionsData.slice(currentIndex, currentIndex + visibleCardsCount).map((item, idx) => (
              <ScrollReveal
                as="article"
                className="attraction-item-card"
                key={item.title}
                style={{ '--reveal-delay': `${idx * 90}ms` }}
              >
                <div className="attraction-card-img-box">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="attraction-item-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button className="discover-more-btn">Discover More</button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <button className="attraction-nav-btn next" onClick={nextSlide}>❯</button>
        </div>
      </div>
    </section>
  );
}

function BottomVideoBanner() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bottom-video-section">
      <div className="bottom-video-container">
        {!isPlaying ? (
          <div className="bottom-video-banner" onClick={() => setIsPlaying(true)}>
            <img 
              src="https://hotelcrowncp.com/assets/images/banner/banner7.webp" 
              alt="Hotel Tour Video" 
              className="bottom-video-bg-img"
            />
            <div className="bottom-video-overlay"></div>
            <div className="bottom-video-content">
              <h2>Your Luxury Escape in the Heart of Blue Area</h2>
              <p>Experience unmatched comfort, modern amenities, and elegant rooms at Hotel Crown CP; the perfect choice for families, business travelers, and leisure stays in Blue Area.</p>
            </div>
            <div className="bottom-video-play-btn">
              <span>▶</span>
            </div>
          </div>
        ) : (
          <div className="bottom-video-wrapper" style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsPlaying(false)} 
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              &times;
            </button>

            <iframe
              className="bottom-youtube-video"
              src="https://www.youtube.com/embed/bEVP-Kn_dkM?autoplay=1"
              title="Crown CP Hotel Islamabad - Luxury Stay in Blue Area"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
}

function Home() {
  return (
    <div style={{ position: 'relative' }}>
      
      {/* SEO & Social Media Link Preview Tags */}
      <Helmet>
        <title>Crown Plaza Islamabad | Luxury Hotel, Suites & Fine Dining</title>
        <meta name="description" content="Experience 5-star luxury at Crown Plaza Islamabad. Book exclusive rooms, suites, and premium hotel services in the heart of Blue Area." />
        <link rel="canonical" href="https://crownplazaislamabad.com/" />

        {/* WhatsApp & Facebook Link Preview (Open Graph) */}
        <meta property="og:title" content="Crown Plaza Islamabad | Luxury Hotel & Suites" />
        <meta property="og:description" content="Book your luxury stay and experience world-class hospitality at Crown Plaza Islamabad." />
        <meta property="og:url" content="https://crownplazaislamabad.com/" />
        <meta property="og:image" content="https://hotelcrowncp.com/assets/images/banner/banner7.webp" />
        <meta name="keywords" content="Hotel in Islamabad, luxury hotel Islamabad, best hotel rooms, Crown Plaza Islamabad, hotel booking online, luxury accommodation Islamabad" />
      </Helmet>

      <Navbar />
      <Hero />
      
      <section className="rooms-section">
        <div className="rooms-header">
          <h2>Explore Our Signature Rooms in Islamabad</h2>
          <p>
            Discover elegantly designed rooms in Islamabad at Hotel Crown CP. From cozy standard rooms to spacious executive suites, each accommodation offers premium amenities, comfort, and privacy for families, couples, and business travellers. Perfect for both short stays and extended visits.
          </p>
        </div>

        <div className="rooms-container">
          {roomsData.map((room, index) => (
            <RoomCard key={room.title} room={room} index={index} />
          ))}
        </div>
      </section>

      {/* Online Booking Banner Section */}
      <section className="online-booking-section">
        <ScrollReveal className="booking-banner-card">
          <div className="booking-banner-content">
            <span className="online-booking-tag">ONLINE BOOKING</span>
            <h2>Book Your Stay Online at the Best Hotel in Islamabad</h2>
            <p>
              Secure your luxury stay in Islamabad with our easy online hotel booking. Choose from modern, fully-furnished rooms designed for families, business travellers, and leisure guests. Enjoy instant confirmation, flexible dates, and a seamless booking experience at one of the best hotels in Islamabad, minutes from the airport and city's prime attractions.
            </p>
            
            <div className="booking-features-grid">
              <div className="feature-item">
                <span>✔️</span>
                <small>Instant Confirmation</small>
              </div>
              <div className="feature-item">
                <span>📅</span>
                <small>Flexible Dates</small>
              </div>
              <div className="feature-item">
                <span>📍</span>
                <small>Minutes From Airport</small>
              </div>
            </div>

            <a href="https://wa.me/923241118206?text=Hi,%20I%20want%20to%20book%20a%20room." target="_blank" rel="noopener noreferrer" className="learn-more-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Book Now via WhatsApp
              <img 
                src="https://cdn-icons-png.flaticon.com/512/271/271228.png" 
                alt="arrow" 
                style={{ width: '14px', height: '14px', filter: 'invert(1)', marginLeft: '8px' }} 
              />
            </a>
          </div>

          <div className="booking-banner-image">
            <img 
              src="https://hotelcrowncp.com/assets/images/banner/banner7.webp" 
              alt="Hotel Crown CP Islamabad" 
            />
          </div>
        </ScrollReveal>
      </section>

      {/* 3 Featured Tailored Needs Section */}
      <section className="tailored-needs-section">
        <div className="tailored-header">
          <h2>A Stay in Islamabad, Perfectly Tailored to Your Needs</h2>
          <p>Every traveller is unique, that's why Hotel Crown CP Islamabad offers hotel apartments designed for families, business travellers, and transit guests, combining comfort, convenience, and premium amenities.</p>
        </div>

        <div className="tailored-cards-container">
          <ScrollReveal as="article" className="tailored-card" style={{ '--reveal-delay': '0ms' }}>
            <div className="card-icon">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <h3>Business Travellers</h3>
            <p>Maximize productivity during your stay at our business hotel in Islamabad. Enjoy dedicated workspaces, high-speed fiber Wi-Fi, 24/7 check-in, and premium amenities to keep your work uninterrupted and your stay seamless.</p>
          </ScrollReveal>

          <ScrollReveal as="article" className="tailored-card" style={{ '--reveal-delay': '90ms' }}>
            <div className="card-icon">
              <FontAwesomeIcon icon={faPlane} />
            </div>
            <h3>Transit & Layovers</h3>
            <p>Make the most of your short visit near Islamabad International Airport. Our rooms are perfect for a quick reset, shower, rest, and refresh before your next flight, with 24/7 express check-in for ultimate convenience.</p>
          </ScrollReveal>

          <ScrollReveal as="article" className="tailored-card" style={{ '--reveal-delay': '180ms' }}>
            <div className="card-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3>Families & Groups</h3>
            <p>Relax and stretch out in our family-friendly hotel in Islamabad. Spacious living areas, kitchenettes, and suites from standard doubles to 2-bedroom layouts give the whole family room to breathe while enjoying premium comfort and style.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Banner Section */}
      <BottomVideoBanner />

      {/* Restaurant / Dining Section */}
      <section className="restaurant-section">
        <ScrollReveal className="restaurant-card">
          <div className="restaurant-image">
            <img 
              src="https://hotelcrowncp.com/assets/images/banner/banner3.webp" 
              alt="In-House Restaurant in Islamabad" 
            />
          </div>
          <div className="restaurant-content">
            <h2>Savour an Exceptional Dining Experience at Our In-House Restaurant in Islamabad</h2>
            <p>
              Start your day with elegance at Hotel Crown CP's restaurant in Islamabad. Our breakfast offerings combine fresh, flavourful dishes with an atmosphere of sophistication, creating the perfect environment to relax, reflect, and prepare for your schedule. From artisanal to classic favourites, every meal is crafted to delight families, business travellers, and discerning guests seeking a premium dining experience in Islamabad.
            </p>
            <a href="https://wa.me/923241118206?text=Hi,%20I%20want%20to%20know%20about%20dining." target="_blank" rel="noopener noreferrer" className="learn-more-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Learn More
              <img 
                src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
                alt="arrow" 
                style={{ width: '14px', height: '14px', filter: 'invert(1)', marginLeft: '8px' }} 
              />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Popular Attractions Section */}
      <AttractionsSection />
    </div>
  );
}

export default Home;