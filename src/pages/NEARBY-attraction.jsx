import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import '../style/NearbyAttractions.css';

export default function NearbyAttractions() {
  const [activeTab, setActiveTab] = useState('Faisal Mosque');
  const [mainImage, setMainImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const attractionsData = [
    {
      name: "Faisal Mosque",
      tagline: "FAISAL MOSQUE",
      title: "Faisal Mosque",
      description: "The iconic Faisal Mosque is Islamabad's largest mosque, blending modern architecture with serene spiritual ambiance. Nestled against the Margalla Hills, it's a must-visit for cultural and photography enthusiasts.",
      distance: "28.5 KM",
      time: "22 MINUTES",
      category: "RELIGIOUS SITE",
      highlights: [
        "Largest mosque in Pakistan",
        "Unique modern architecture",
        "Scenic mountain backdrop",
        "Peaceful prayer environment",
        "Photography opportunities",
        "Cultural significance"
      ],
      thumbnails: [
        "https://hotelcrowncp.com/assets/images/places/fasial/1.webp",
        "https://hotelcrowncp.com/assets/images/places/fasial/2.webp",
        "https://hotelcrowncp.com/assets/images/places/fasial/3.webp",
        "https://hotelcrowncp.com/assets/images/places/fasial/4.webp"
      ]
    },
    {
      name: "Daman-e-Koh",
      tagline: "DAMAN-E-KOH",
      title: "Daman-e-Koh",
      description: "Daman-e-Koh is a viewing point and garden located in the middle of the Margalla Hills north of Islamabad, offering panoramic bird's-eye views of the entire city.",
      distance: "18.2 KM",
      time: "25 MINUTES",
      category: "NATURE PARK",
      highlights: [
        "Panoramic city views",
        "Margalla Hills location",
        "Lush green gardens",
        "Family picnic spots",
        "Wildlife watching",
        "Cafes and rest areas"
      ],
      thumbnails: [
        "https://hotelcrowncp.com/assets/images/places/damana/1.webp",
        "https://hotelcrowncp.com/assets/images/places/damana/2.webp",
        "https://hotelcrowncp.com/assets/images/places/damana/3.webp",
        "https://hotelcrowncp.com/assets/images/places/damana/4.webp"
      ]
    },
    {
      name: "Pakistan Monument & Museum",
      tagline: "PAKISTAN MONUMENT & MUSEUM",
      title: "Pakistan Monument & Museum",
      description: "Designed to symbolize the culture and history of Pakistan's provinces, shaped like a blooming flower petal structure carved from granite.",
      distance: "22.8 KM",
      time: "30 MINUTES",
      category: "HERITAGE SITE",
      highlights: [
        "Symbol of national unity",
        "Flower petal architecture",
        "Historical museum inside",
        "Panoramic views from Shakarparian",
        "Beautiful night lighting",
        "Cultural exhibits"
      ],
      thumbnails: [
        "https://hotelcrowncp.com/assets/images/places/monument/1.webp",
        "https://hotelcrowncp.com/assets/images/places/monument/2.webp",
        "https://hotelcrowncp.com/assets/images/places/monument/3.webp",
        "https://hotelcrowncp.com/assets/images/places/monument/4.webp"
      ]
    },
    {
      name: "Rawal Lake",
      tagline: "RAWAL LAKE",
      title: "Rawal Lake",
      description: "An artificial reservoir that provides water to the cities, set within an immaculately maintained wildlife park offering boating and walking tracks.",
      distance: "16.5 KM",
      time: "22 MINUTES",
      category: "VIEW POINT",
      highlights: [
        "Boating facilities",
        "Lake View Park attractions",
        "Walking and jogging tracks",
        "Bird aviary",
        "Family picnic areas",
        "Scenic waterfront views"
      ],
      thumbnails: [
        "https://hotelcrowncp.com/assets/images/places/rawal/1.webp",
        "https://hotelcrowncp.com/assets/images/places/rawal/2.webp",
        "https://hotelcrowncp.com/assets/images/places/rawal/3.webp",
        "https://hotelcrowncp.com/assets/images/places/rawal/4.webp"
      ]
    },
    {
      name: "Lok Virsa Museum",
      tagline: "LOK VIRSA MUSEUM",
      title: "Lok Virsa Museum",
      description: "A federally funded museum showcasing the rich cultural heritage and living traditions of Pakistan with extensive displays of traditional crafts.",
      distance: "24.0 KM",
      time: "25 MINUTES",
      category: "CULTURAL VILLAGE",
      highlights: [
        "Traditional crafts display",
        "Folk art and costumes",
        "Musical instruments gallery",
        "Regional cultural artifacts",
        "Reference library",
        "Artisan workshops"
      ],
      thumbnails: [
        "https://hotelcrowncp.com/assets/images/places/lok/1.webp",
        "https://hotelcrowncp.com/assets/images/places/lok/2.webp",
        "https://hotelcrowncp.com/assets/images/places/lok/3.webp",
        "https://hotelcrowncp.com/assets/images/places/lok/4.webp"
      ]
    }
  ];

  // Neeche 8 Cards ka data jo aapke screenshot se match karta hai
  const activitiesCardsData = [
    {
      badge: "NATURE TRAIL",
      title: "Hiking and Nature Trails in Margalla Hills",
      description: "Experience the thrill of hiking in Margalla Hills, with scenic trails, fresh mountain air, and wildlife spotting opportunities. Ideal for adventure seekers and nature enthusiasts exploring.",
      image: "https://hotelcrowncp.com/assets/images/places/attraction/hiking.webp"
    },
    {
      badge: "OUTDOOR ACTIVITY",
      title: "Cycling & Outdoor Adventures",
      description: "Explore Islamabad on two wheels with cycling tours and outdoor adventure activities, discovering hidden trails, parks, and natural beauty spots throughout the city.",
      image: "https://hotelcrowncp.com/assets/images/places/attraction/cycling.webp"
    },
    {
      badge: "GOLF",
      title: "Golfing at Islamabad Golf Club",
      description: "Perfect your swing at the Islamabad Golf Club, offering lush fairways, well-maintained greens, and an ideal setting for golf enthusiasts and corporate events.",
      image: "https://hotelcrowncp.com/assets/images/places/attraction/golf.webp"
    },
    {
      badge: "RECREATION",
      title: "Title: Boating and Leisure at Rawal Lake",
      description: "Description: Enjoy a peaceful boating or picnic experience at Rawal Lake, a scenic spot for families and couples to relax, take in panoramic views, and unwind amidst nature.",
      image: "https://hotelcrowncp.com/assets/images/places/attraction/boating.webp"
    },
    {
      badge: "ADVENTURE SPORTS",
      title: "Rock Climbing & Adventure Sports",
      description: "Push your limits with rock climbing and adventure sports in the Margalla Hills, including rappelling, trekking, and group challenges for adrenaline lovers.",
      image: "https://hotelcrowncp.com/assets/images/places/attraction/sliding.webp"
    },
    {
      badge: "WELLNESS",
      title: "Yoga and Wellness Retreats",
      description: "Rejuvenate your body and mind at wellness retreats and yoga sessions in Islamabad's serene parks and gardens, perfect for relaxation and mindfulness.",
      image: "https://hotelcrowncp.com/assets/images/places/attraction/yoga.webp"
    },
    {
      badge: "EQUESTRIAN",
      title: "Horse Riding & Equestrian Activities",
      description: "Discover the thrill of horse riding in Islamabad, with lessons and guided rides through beautiful trails, suitable for beginners and experienced riders.",
      image: "https://hotelcrowncp.com/assets/images/places/attraction/horse.webp"
    },
    {
      badge: "CULTURAL WORKSHOP",
      title: "Art & Cultural Workshops",
      description: "Participate in cultural and creative workshops, including pottery, painting, and handicrafts, for a deeper immersion into Islamabad's vibrant art scene.",
      image: "https://hotelcrowncp.com/assets/images/places/attraction/art.webp"
    }
  ];

  const currentAttraction = attractionsData.find(item => item.name === activeTab) || attractionsData[0];

  useEffect(() => {
    setCurrentIndex(0);
    setMainImage(currentAttraction.thumbnails[0]);
  }, [activeTab]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % currentAttraction.thumbnails.length;
    setCurrentIndex(nextIndex);
    setMainImage(currentAttraction.thumbnails[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + currentAttraction.thumbnails.length) % currentAttraction.thumbnails.length;
    setCurrentIndex(prevIndex);
    setMainImage(currentAttraction.thumbnails[prevIndex]);
  };

  return (
    <div className="attractions-page">
      <Helmet>
        <title>Nearby Attractions & Activities in Islamabad | Hotel Crown CP</title>
        <meta 
          name="description" 
          content="Explore popular places, iconic landmarks like Faisal Mosque, Daman-e-Koh, and exciting activities near Hotel Crown CP in Blue Area, Islamabad." 
        />
        <link rel="canonical" href="https://hotelcrowncp.com/nearby-attractions" />
        <meta name="keywords" content="attractions near Crown Plaza Islamabad, places to visit in Islamabad, hotel near Centaurus Mall Islamabad, Islamabad tourism" />
      </Helmet>

      {/* Hero Section */}
      <section className="attractions-hero">
        <div className="attractions-hero-overlay">
          <div className="attractions-hero-content">
            <span className="attractions-hero-subtitle">POPULAR PLACES & ACTIVITIES</span>
            <h1>Explore Popular Places & Activities in Islamabad</h1>
            <p>
              Discover iconic landmarks, cultural gems, and exciting activities just minutes from Hotel Crown CP in Blue Area, Islamabad; perfect for leisure, adventure, and unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="attractions-content-section">
        <div className="attractions-container">
          
          <div className="attractions-header-center">
            <span className="attractions-small-tag">POPULAR PLACES & ACTIVITIES</span>
            <h2>Explore Top Destinations & Iconic Landmarks Around Islamabad</h2>
            <p>Discover must-visit attractions, cultural gems, and scenic viewpoints near Hotel Crown CP in Blue Area, Islamabad curated with distances and travel highlights to plan your perfect itinerary. Ideal for leisure explorers, families, and business travelers looking to experience the best of the city.</p>
          </div>

          {/* Navigation Tabs */}
          <div className="attractions-tabs-grid">
            {attractionsData.map((tab, index) => (
              <button
                key={index}
                className={`attraction-tab-btn ${activeTab === tab.name ? 'active-attraction-tab' : ''}`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Active Attraction Detailed Layout Box */}
          <div className="attraction-main-card">
            <div className="attraction-grid-layout">
              
              {/* Left Side: Main Preview Image with Arrows & Thumbnails */}
              <div className="attraction-media-side">
                <div className="attraction-main-img-box">
                  <img src={mainImage || currentAttraction.thumbnails[0]} alt={currentAttraction.title} />
                  <div className="img-nav-arrow left-arrow" onClick={handlePrev} style={{ cursor: 'pointer' }}>❮</div>
                  <div className="img-nav-arrow right-arrow" onClick={handleNext} style={{ cursor: 'pointer' }}>❯</div>
                </div>
                
                {/* Thumbnails Row */}
                <div className="attraction-thumbnails-row">
                  {currentAttraction.thumbnails.map((thumb, idx) => (
                    <div 
                      className={`thumb-box ${currentIndex === idx ? 'active-thumb' : ''}`} 
                      key={idx} 
                      onClick={() => {
                        setCurrentIndex(idx);
                        setMainImage(thumb);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={thumb} alt={`Thumb ${idx}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Details & Highlights */}
              <div className="attraction-info-side">
                <h3>{currentAttraction.title}</h3>
                <p className="attraction-main-desc">{currentAttraction.description}</p>
                
                {/* Info Badges Row */}
                <div className="attraction-badges-row">
                  <div className="att-badge">
                    <span className="badge-icon">📍</span> <span>{currentAttraction.distance}</span>
                  </div>
                  <div className="att-badge">
                    <span className="badge-icon">⏰</span> <span>{currentAttraction.time}</span>
                  </div>
                  <div className="att-badge">
                    <span className="badge-icon">🏛️</span> <span>{currentAttraction.category}</span>
                  </div>
                </div>

                {/* Highlights Section */}
                <div className="attraction-highlights-section">
                  <h4>Highlights</h4>
                  <div className="highlights-grid">
                    {currentAttraction.highlights.map((highlight, hIndex) => (
                      <div className="highlight-item" key={hIndex}>
                        <span className="green-check">✔</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8 Cards Section Below */}
      <section className="activities-grid-section">
        <div className="attractions-container">
          
          <div className="attractions-header-center">
            <span className="attractions-small-tag">NEARBY ATTRACTIONS</span>
            <h2>Discover Exciting Activities Near Hotel Crown CP Islamabad</h2>
            <p>
              Experience the best of Islamabad with curated activities near Hotel Crown CP; from scenic viewpoints and lakeside retreats to cultural experiences and vibrant local adventures. Perfect for families, business travellers, and explorers seeking memorable moments.
            </p>
          </div>

          <div className="activities-cards-grid">
            {activitiesCardsData.map((card, idx) => (
              <div key={idx} className="activity-card-item">
                <div className="activity-card-img-container">
                  <img src={card.image} alt={card.title} />
                  <span className="activity-card-badge">{card.badge}</span>
                </div>
                <div className="activity-card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}