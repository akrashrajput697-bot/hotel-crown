import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../style/Gallery.css';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Categories list
  const categories = [
    "All", "Exterior", "Reception", "Lobby", "Standard Double", 
    "Standard Twin", "Deluxe Double", "Deluxe Twin", "Executive Double", 
    "Executive Twin", "Family Suite", "Meeting Hall", "Corridor", 
    "Restaurant", "Food", "Amenities"
  ];

  // Gallery items
  const galleryItems = [
    // Exterior (3 items)
    { id: 1, title: "Hotel Exterior View", category: "Exterior", img: "https://api.hotelcrowncp.com/uploads/gallery/35d5fe50-dc0b-4536-aaf8-abdbfa1004d1.webp" },
    { id: 2, title: "Building Front", category: "Exterior", img: "https://api.hotelcrowncp.com/uploads/gallery/10fcc444-d89e-49e7-8f53-580b98182846.webp" },
    { id: 3, title: "Night View", category: "Exterior", img: "https://api.hotelcrowncp.com/uploads/gallery/972917b5-26c8-4b6e-bdcc-f02ff280300a.webp" },

    // Reception (4 items)
    { id: 6,  title: "Reception Desk", category: "Reception", img: "https://api.hotelcrowncp.com/uploads/gallery/80d7f358-de5a-4b81-acb2-affafb4d178d.webp" },
    { id: 7,  title: "Reception Area", category: "Reception", img: "https://api.hotelcrowncp.com/uploads/gallery/f6c1c4fc-a716-4e6e-baa3-3dc2a4e1a02d.webp" },
    { id: 8,  title: "Front Desk", category: "Reception", img: "https://api.hotelcrowncp.com/uploads/gallery/3a8101df-0bee-4444-a109-c0b41b10ef8a.webp" },
    { id: 9,  title: "Lobby Reception", category: "Reception", img: "https://api.hotelcrowncp.com/uploads/gallery/1efc73b2-838c-4af6-98ee-ebffd37897e4.webp" },

    // Lobby (5 items)
    { id: 12, title: "Lobby Decor", category: "Lobby", img: "https://api.hotelcrowncp.com/uploads/gallery/517bdd8c-cf7d-4be5-be6d-e3df3e49a3dd.webp" },
    { id: 13, title: "Waiting Area", category: "Lobby", img: "https://api.hotelcrowncp.com/uploads/gallery/2824d84b-df75-4b06-a66d-36395c909ff1.webp" },
    { id: 14, title: "Lobby Interior", category: "Lobby", img: "https://api.hotelcrowncp.com/uploads/gallery/1e8ec0c4-ac18-439d-8cfe-8de4b0f122a4.webp" },
    { id: 15, title: "Lobby Interior", category: "Lobby", img: "https://api.hotelcrowncp.com/uploads/gallery/4d6ff1fc-fc72-4940-a5d7-5e6a2698f48c.webp" },
    { id: 16, title: "Lobby Interior", category: "Lobby", img: "https://api.hotelcrowncp.com/uploads/gallery/be1133a0-1650-43ee-8362-c72490f27c28.webp" },

    // Standard Double (5 items)
    { id: 17, title: "Standard Double Room", category: "Standard Double", img: "https://hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp" },
    { id: 18, title: "Double Bed View", category: "Standard Double", img: "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/4.webp" },
    { id: 19, title: "Standard Double Interior", category: "Standard Double", img: "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/5.webp" },
    { id: 20, title: "Room Workspace", category: "Standard Double", img: "https://hotelcrowncp.com/Uploads/Rooms/twin-standard-1.jpg" },
    { id: 21, title: "Double Room Bathroom", category: "Standard Double", img: "https://hotelcrowncp.com/assets/images/Home/reviews.webp" },

    // Standard Twin (4 items)
    { id: 22, title: "Twin Standard Room", category: "Standard Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/f4d6d4ae-962a-46bf-97fd-6b6f551dcc74.webp" },
    { id: 23, title: "Twin Beds Setup", category: "Standard Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/617bed77-0765-414f-aa3b-06a47dc0c91c.webp" },
    { id: 24, title: "Standard Twin Corner", category: "Standard Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/6f488503-aba8-483c-81d5-35c9bafcae03.webp" },
    { id: 25, title: "Standard Twin Corner", category: "Standard Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/2e865ae7-3d1f-447f-be25-ce4c4d0b3f1c.webp" },
    
    // Deluxe Double (5 items)
    { id: 26, title: "Deluxe Double Bed", category: "Deluxe Double", img: "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp" },
    { id: 27, title: "Deluxe Double Angle 2", category: "Deluxe Double", img: "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/2.webp" },
    { id: 28, title: "Deluxe Double Angle 3", category: "Deluxe Double", img: "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/3.webp" },
    { id: 29, title: "Deluxe Double Angle 4", category: "Deluxe Double", img: "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/4.webp" },
    { id: 30, title: "Deluxe Double Interior", category: "Deluxe Double", img: "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/5.webp" },

    // Deluxe Twin (4 items)
    { id: 31, title: "Deluxe Twin Room", category: "Deluxe Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/f4d6d4ae-962a-46bf-97fd-6b6f551dcc74.webp" },
    { id: 32, title: "Deluxe Twin Beds", category: "Deluxe Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/617bed77-0765-414f-aa3b-06a47dc0c91c.webp" },
    { id: 33, title: "Deluxe Twin View", category: "Deluxe Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/6f488503-aba8-483c-81d5-35c9bafcae03.webp" },
    { id: 34, title: "Deluxe Twin Amenities", category: "Deluxe Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/2e865ae7-3d1f-447f-be25-ce4c4d0b3f1c.webp" },

    // Executive Double (13 items)
    { id: 101, title: "Executive Double Suite", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/66e66a1a-6511-45a6-aa45-06ed6517a3e4.webp" },
    { id: 102, title: "Executive Double Bedroom", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/257d5f6d-6306-4d9a-91f0-a520e2a13345.webp" },
    { id: 103, title: "Executive Double Living Space", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/159a8a75-cf72-4dba-927f-86985a225c4a.webp" },
    { id: 104, title: "Executive Double Desk", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/eb5f3251-562d-471a-b656-8cc79f7d6fe7.webp" },
    { id: 105, title: "Executive Double Bath", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/50c5d65f-21d4-4be3-ad8b-95d910456d5e.webp" },
    { id: 106, title: "Executive Double Bath", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/4a4fb1b5-d6ca-497b-8c93-033b5afdc237.webp" },
    { id: 107, title: "Executive Double Bath", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/8fa86674-7483-4fdb-9081-84b3c72229f7.webp" },
    { id: 108, title: "Executive Double Bath", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/8d4e20b6-128c-45c5-bd06-77dc99dc755c.webp" },
    { id: 109, title: "Executive Double Bath", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/1eeda1c6-6379-45e2-8c44-48a31ee98675.webp" },
    { id: 110, title: "Executive Double Bath", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/f862b3f0-3a10-405e-bbc4-809e7267aa36.webp" },
    { id: 111, title: "Executive Double Bath", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/d8ae3742-f81f-4401-8fbd-8ba4f878c6a0.webp" },
    { id: 112, title: "Executive Double Bath", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/2cbafafc-37ac-4eeb-8fc2-666d2deebd67.webp" },
    { id: 113, title: "Executive Double Interior", category: "Executive Double", img: "https://api.hotelcrowncp.com/uploads/gallery/66e66a1a-6511-45a6-aa45-06ed6517a3e4.webp" },

    // Executive Twin (4 items)
    { id: 45, title: "Executive Twin Room", category: "Executive Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/b5331b39-a9e0-4875-8eef-9b9ebb680278.webp" },
    { id: 46, title: "Executive Twin Setup", category: "Executive Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/c07d1eef-bdc6-44b7-b4d1-2cebf49e9b60.webp" },
    { id: 47, title: "Executive Twin Luxury", category: "Executive Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/620d4b21-581a-4865-82c6-d3976a6b7967.webp" },
    { id: 48, title: "Executive Twin Balcony View", category: "Executive Twin", img: "https://api.hotelcrowncp.com/uploads/gallery/7b0019db-d979-4f7c-bb2b-44d0b515b1e2.webp" },

    // Meeting Hall (4 items)
    { id: 53, title: "Conference Meeting Hall", category: "Meeting Hall", img: "https://api.hotelcrowncp.com/uploads/gallery/5fe19b4d-1a12-4f8e-a392-bc1e01781a82.webp" },
    { id: 54, title: "Business Event Setup", category: "Meeting Hall", img: "https://api.hotelcrowncp.com/uploads/gallery/69128312-e6e9-482d-a83e-3f81641a07af.webp" },
    { id: 55, title: "Meeting Table View", category: "Meeting Hall", img: "https://api.hotelcrowncp.com/uploads/gallery/15f1eb03-7659-481e-9704-bca4a6c4687f.webp" },
    { id: 56, title: "Corporate Event Hall", category: "Meeting Hall", img: "https://api.hotelcrowncp.com/uploads/gallery/9aab835c-c464-48ad-9ebb-a6d27d4cf90c.webp" },

    // Corridor (4 items)
    { id: 57, title: "Hotel Corridor", category: "Corridor", img: "https://api.hotelcrowncp.com/uploads/gallery/888b9997-f56f-4374-977e-9c98fc2cdbcc.webp" },
    { id: 58, title: "Hallway Passage", category: "Corridor", img: "https://api.hotelcrowncp.com/uploads/gallery/55bbb5e3-069e-4e12-adf7-94ee8b4d4150.webp" },
    { id: 59, title: "Floor Walkway", category: "Corridor", img: "https://api.hotelcrowncp.com/uploads/gallery/9edc52eb-6211-4e6b-bc34-e87c68df7dfd.webp" },
    { id: 60, title: "Elevator Lobby Hall", category: "Corridor", img: "https://api.hotelcrowncp.com/uploads/gallery/e6d1c396-a611-4474-b839-cc758d3327cb.webp" },

    // Restaurant (4 items)
    { id: 61, title: "Main Dining Restaurant", category: "Restaurant", img: "https://api.hotelcrowncp.com/uploads/gallery/3d9b2606-50f9-40cc-abde-d73edbf40d23.webp" },
    { id: 62, title: "Restaurant Seating", category: "Restaurant", img: "https://api.hotelcrowncp.com/uploads/gallery/15f378c7-eb32-4a54-bb65-8c6d22912688.webp" },
    { id: 63, title: "Dining Ambience", category: "Restaurant", img: "https://api.hotelcrowncp.com/uploads/gallery/62a62f0e-8a66-454a-a1a8-81d0291e7182.webp" },
    { id: 64, title: "Breakfast Buffet Area", category: "Restaurant", img: "https://api.hotelcrowncp.com/uploads/gallery/c68d667e-6368-45d2-9a18-31f8fb48eee4.webp" },

    // Food (4 items)
    { id: 65, title: "Delicious Food Items", category: "Food", img: "https://api.hotelcrowncp.com/uploads/gallery/64f01d24-fbf2-4d7d-aab8-e8fa18b4f538.webp" },
    { id: 66, title: "Breakfast Spread", category: "Food", img: "https://api.hotelcrowncp.com/uploads/gallery/f72d7726-6d74-4911-977d-4d23bab7f15f.webp" },
    { id: 67, title: "Chef Special Dish", category: "Food", img: "https://api.hotelcrowncp.com/uploads/gallery/666eb0b7-63df-4fb5-9ac4-260cb6d0a258.webp" },
    { id: 68, title: "Welcome Drinks", category: "Food", img: "https://api.hotelcrowncp.com/uploads/gallery/014951c0-3100-4d74-b0b9-d7a75a97acb7.webp" },

    // Amenities (4 items)
    { id: 69, title: "Room Amenities", category: "Amenities", img: "https://api.hotelcrowncp.com/uploads/gallery/c1066f22-3865-4b9f-a9ee-9232732900a0.webp" },
    { id: 70, title: "Bathroom Essentials", category: "Amenities", img: "https://api.hotelcrowncp.com/uploads/gallery/2865dc15-d941-44f2-bcb5-0d6919b6bdfe.webp" },
    { id: 71, title: "Luxury Toiletries", category: "Amenities", img: "https://api.hotelcrowncp.com/uploads/gallery/2f6dd4a2-ef01-41ef-bc3f-3364acbee749.webp" },
    { id: 72, title: "In-Room Facilities", category: "Amenities", img: "https://api.hotelcrowncp.com/uploads/gallery/40bc5668-9921-45bd-b8c6-150dd6684b49.webp" }
  ];

  // Filter logic
  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const currentImage = filteredItems[currentIndex] || filteredItems[0];

  return (
    <div className="gallery-page">
      <Helmet>
        <title>Photo Gallery | Explore Rooms & Dining at Hotel Crown CP Islamabad</title>
        <meta 
          name="description" 
          content="Take a visual tour of Hotel Crown CP Islamabad. Explore photos of our luxury rooms, suites, dining areas, meeting halls, and modern hotel amenities." 
        />
        <link rel="canonical" href="https://hotelcrowncp.com/gallery" />
        <meta name="keywords" content="Crown Plaza gallery, hotel photos Islamabad, luxury rooms pictures, hotel interior views, dining photo gallery" />
      </Helmet>

      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay">
          <div className="gallery-hero-content">
            <span className="gallery-hero-subtitle">A VISUAL JOURNEY OF COMFORT & LUXURY</span>
            <h1>Explore Hotel Crown CP Gallery</h1>
            <p>Explore the elegance of Hotel Crown CP Islamabad through our gallery; showcasing premium rooms, sophisticated dining spaces, welcoming lobby, and all the luxurious details that make every stay unforgettable.</p>
          </div>
        </div>
      </section>

      {/* Visual Tour Section */}
      <section className="visual-tour-section">
        <div className="visual-container">
          <div className="visual-header">
            <span className="visual-small-title">VISUAL TOUR OF OUR HOTEL</span>
            <h2>Explore Our Hotel Rooms, Dining & More</h2>
            <p>
              Discover the elegance of Hotel Crown CP Islamabad through our curated gallery. Explore luxurious rooms, refined dining areas, and stylish lounges that showcase the comfort, sophistication, and premium amenities that define every stay in the Blue Area. Perfect for business travelers, families, and guests seeking a luxury stay in Islamabad.
            </p>
          </div>

          {/* Filter Category Buttons */}
          <div className="filter-buttons-grid">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`filter-btn ${activeCategory === cat ? 'active-filter' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Image Grid */}
          <div className="gallery-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div className="gallery-card" key={item.id} onClick={() => handleImageClick(index)}>
                  <img src={item.img} alt={item.title} />
                  <div className="gallery-card-overlay">
                    <h4>{item.title}</h4>
                    <span>{item.category}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-images-text">No images found for this category yet.</p>
            )}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="lightbox-overlay">
          <button className="lightbox-close" onClick={handleClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="lightbox-content">
            <div className="lightbox-header-info">
              {currentImage.category} ({filteredItems.length})
            </div>

            <button className="lightbox-prev" onClick={handlePrev}>&#10094;</button>
            
            <div className="lightbox-img-container">
              <img src={currentImage.img} alt={currentImage.title} />
            </div>

            <button className="lightbox-next" onClick={handleNext}>&#10095;</button>

            <div className="lightbox-counter">
              {currentIndex + 1} / {filteredItems.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}