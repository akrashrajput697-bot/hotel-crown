import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/AvailableRooms.css';

function AvailableRooms() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchData = location.state || {
    startDate: 'Sep 16, 2026',
    endDate: 'Sep 17, 2026',
    rooms: 1,
    guests: 1
  };

  const calculateNights = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const totalNights = calculateNights(searchData.startDate, searchData.endDate);

  const [roomsData, setRoomsData] = useState([
    {
      id: 1,
      name: 'Standard Double',
      badge: 'Hurry! 26 Rooms Left',
      images: [
        "https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp",
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_1a52afb3-6dcf-479b-877f-2f9ff6fd335e.jpg",
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_eaaf2df7-a126-4db3-beeb-465368a5c167.jpg"
      ],
      amenities: ['🅿️ Free Parking', '📶 Free Wifi', '🛎️ Room Service', '👨‍👩‍👧 Family rooms', '🍽️ Restaurant', '🍳 Breakfast'],
      basePricePerNight: 105000,
      count: 1,
      selectedPlan: {
        name: 'Room Only',
        meal: 'Room Only',
        policy: 'Standard cancellation policy',
        price: 105000
      }
    },
    {
      id: 2,
      name: 'Standard Twin',
      badge: 'Hurry! 5 Rooms Left',
      images: [
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_b8e291a0-5ffa-435f-8eb9-2ba4c2062627.jpg",
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_b1457afe-3e78-4357-b64b-ca3e0a3a6d64.jpg",
      ],
      amenities: ['🅿️ Free Parking', '📶 Free Wifi', '🛎️ Room Service', '🛋️ Living Area', '🍽️ Restaurant', '🍳 Breakfast'],
      basePricePerNight: 105000,
      count: 1,
      selectedPlan: {
        name: 'Room Only',
        meal: 'Room Only',
        policy: 'Standard cancellation policy',
        price: 105000
      }
    },
    {
      id: 3,
      name: 'Deluxe Double',
      badge: 'Hurry! 12 Rooms Left',
      images: [
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_26642b4e-a604-4dc5-a999-9de1586aba6e.jpg",
      ],
      amenities: ['🅿️ Free Parking', '📶 Free Wifi', '🛎️ Room Service', '🛏️ Twin Beds', '🍽️ Restaurant', '🍳 Breakfast'],
      basePricePerNight: 125000,
      count: 1,
      selectedPlan: {
        name: 'Room Only',
        meal: 'Room Only',
        policy: 'Standard cancellation policy',
        price: 125000
      }
    },
    {
      id: 4,
      name: 'Deluxe Twin',
      badge: 'Hurry! 4 Rooms Left',
      images: [
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_e2491161-68ea-4507-9c6f-774c5502e1e1.jpg",
      ],
      amenities: ['🅿️ Free Parking', '📶 Free Wifi', '🛎️ Room Service', '👨‍👩‍👧‍👦 Extra Space', '🍽️ Restaurant', '🍳 Breakfast'],
      basePricePerNight: 125000,
      count: 1,
      selectedPlan: {
        name: 'Room Only',
        meal: 'Room Only',
        policy: 'Standard cancellation policy',
        price: 125000
      }
    },
    {
      id: 5,
      name: 'Execuitive Double',
      badge: 'Hurry! 8 Rooms Left',
      images: [
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_02f5436a-c62e-4302-a1a2-9c952889b172.jpg",
      ],
      amenities: ['🅿️ Free Parking', '📶 Free Wifi', '🛎️ Room Service', '👤 Single Bed', '🍽️ Restaurant', '🍳 Breakfast'],
      basePricePerNight: 145000,
      count: 1,
      selectedPlan: {
        name: 'Room Only',
        meal: 'Room Only',
        policy: 'Standard cancellation policy',
        price: 145000
      }
    },
    {
      id: 6,
      name: 'Execuitive Twin',
      badge: 'Hurry! 2 Rooms Left',
      images: [
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_d1974805-61c1-48ab-9dd4-d758156e9eab.jpg",
      ],
      amenities: ['🅿️ Free Parking', '📶 Free Wifi', '🛎️ Butler Service', '🏊 Luxury Lounge', '🍽️ Restaurant', '🍳 Breakfast'],
      basePricePerNight: 145000,
      count: 1,
      selectedPlan: {
        name: 'Room Only',
        meal: 'Room Only',
        policy: 'Standard cancellation policy',
        price: 145000
      }
    },
    {
      id: 7,
      name: 'Family Suite',
      badge: 'Hurry! 10 Rooms Left',
      images: [
        "https://api.hotelcrowncp.com/uploads/roomtypes/compressed_3bf3775c-6df0-43fa-81b7-086ee72a47fe.jpg",
      ],
      amenities: ['🅿️ Free Parking', '📶 Free Wifi', '🛎️ Room Service', '🛏️ Triple Beds', '🍽️ Restaurant', '🍳 Breakfast'],
      basePricePerNight: 225000,
      count: 1,
      selectedPlan: {
        name: 'Room Only',
        meal: 'Room Only',
        policy: 'Standard cancellation policy',
        price: 225000
      }
    }
  ]);

  // --- Cart State Management ---
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('hotel_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('hotel_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (room, totalWithTax) => {
    const newItem = {
      cartId: `${room.id}-${room.selectedPlan.name}`,
      id: room.id,
      name: room.name,
      image: room.images[0],
      planName: room.selectedPlan.name,
      startDate: searchData.startDate,
      endDate: searchData.endDate,
      nights: totalNights,
      count: room.count,
      pricePerNight: room.selectedPlan.price,
      totalPrice: totalWithTax
    };

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.cartId === newItem.cartId);
      let updated;
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex] = newItem;
      } else {
        updated = [...prev, newItem];
      }

      localStorage.setItem('hotel_cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cartUpdated'));

      return updated;
    });
  };

  const handleIncrement = (id) => {
    setRoomsData(prev => prev.map(room => 
      room.id === id ? { ...room, count: room.count + 1 } : room
    ));
  };

  const handleDecrement = (id) => {
    setRoomsData(prev => prev.map(room => 
      room.id === id ? { ...room, count: room.count > 1 ? room.count - 1 : 1 } : room
    ));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImages, setActiveImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [activeRatesRoomId, setActiveRatesRoomId] = useState(null);

  const openRatesModal = (id) => {
    setActiveRatesRoomId(id);
  };

  const closeRatesModal = () => {
    setActiveRatesRoomId(null);
  };

  const handleSelectPlan = (roomId, plan) => {
    setRoomsData(prev => prev.map(room => 
      room.id === roomId ? { ...room, selectedPlan: plan } : room
    ));
    closeRatesModal();
  };

  const openModal = (images, index) => {
    setActiveImages(images);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
  };

  const formatPKR = (amount) => {
    return 'PKR ' + amount.toLocaleString();
  };

  // Naya Handler for Direct Navigation to Reservation Page
  const handleBookNow = (room, totalWithTax) => {
    const bookingDetails = {
      room,
      totalWithTax,
      searchData,
      totalNights
    };
    
    // Save to LocalStorage
    localStorage.setItem('selected_room', JSON.stringify(bookingDetails));
    
    // Direct Navigate to Reservation Page
    navigate('/reservation', { state: bookingDetails });
  };

  return (
    <div className="available-rooms-page">
      
      <div className="search-hero-section">
        <h1>Search Results</h1>
        <p>Showing available rooms for {searchData.startDate} to {searchData.endDate}.</p>
      </div>

      <div className="search-main-container">

        <div className="search-summary-card">
          <div className="search-summary-left">
            <span>YOUR SEARCH</span>
            <h3>{roomsData.length} rooms available</h3>
          </div>
          <div className="search-summary-center">
            <span>📅 {searchData.startDate} - {searchData.endDate}</span>
            <span>👤 {searchData.rooms} Room(s) - {searchData.guests} Guest(s)</span>
            <span>🌙 {totalNights} night{totalNights > 1 ? 's' : ''}</span>
          </div>
          <div>
            <button className="modify-search-btn">Modify search</button>
          </div>
        </div>

        {roomsData.map((room) => {
          const baseRate = room.selectedPlan.price;
          const roomPrice = baseRate * totalNights * room.count;
          const gst = roomPrice * 0.15;
          const bedTax = roomPrice * 0.05;
          const totalWithTax = roomPrice + gst + bedTax;

          const availablePlans = [
            {
              name: 'Room Only',
              meal: 'Room Only',
              policy: 'Standard cancellation policy',
              price: room.basePricePerNight
            },
            {
              name: 'Bed & Breakfast',
              meal: 'Breakfast Included',
              policy: 'Free cancellation up to 24 hours',
              price: room.basePricePerNight + 15000
            },
            {
              name: 'Non-Refundable Special',
              meal: 'Room Only',
              policy: 'Non-refundable rate (Best Price)',
              price: room.basePricePerNight - 10000
            }
          ];

          return (
            <div className="room-result-card" key={room.id}>
              
              <div className="room-result-img-box">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  onClick={() => openModal(room.images, 0)}
                  style={{ cursor: 'pointer' }}
                />
                <span className="room-badge">{room.badge}</span>
                <button 
                  type="button" 
                  className="room-photos-count" 
                  onClick={() => openModal(room.images, 0)}
                >
                  {room.images.length} Photos
                </button>
              </div>

              <div className="room-result-content">
                <div className="room-header-row">
                  <h2>{room.name}</h2>
                  
                  <div className="room-policy">
                    Policy: <strong>{room.selectedPlan.name}</strong>
                    
                    <div className="info-icon-container">
                      <span className="info-icon-badge">ⓘ</span>
                      
                      <div className="policy-popup-box">
                        <p>Policy: {room.selectedPlan.name}</p>
                        <p>Meal Plan: {room.selectedPlan.meal}</p>
                        <p className="last-policy-item">{room.selectedPlan.policy}</p>
                        <span className="more-rates-link" onClick={() => openRatesModal(room.id)}>More rates</span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="room-amenities-grid">
                  {room.amenities.map((amenity, index) => (
                    <span key={index}>{amenity}</span>
                  ))}
                </div>

                <hr className="room-divider" />

                <div className="room-config-row">
                  <div className="counter-wrapper">
                    <span className="counter-label">Add Rooms:</span>
                    <div className="counter-box">
                      <button type="button" className="counter-btn" onClick={() => handleDecrement(room.id)}>-</button>
                      <span className="counter-value">{room.count}</span>
                      <button type="button" className="counter-btn" onClick={() => handleIncrement(room.id)}>+</button>
                    </div>
                  </div>
                  <button type="button" className="more-rates-btn" onClick={() => openRatesModal(room.id)}>More rates</button>
                </div>

                <hr className="room-divider" />

                <div className="room-price-breakdown">
                  <div className="price-row">
                    <span>Room Price ({room.selectedPlan.name})</span>
                    <span>{formatPKR(roomPrice)}</span>
                  </div>
                  <div className="price-row">
                    <span>GST (15%)</span>
                    <span>{formatPKR(gst)}</span>
                  </div>
                  <div className="price-row">
                    <span>Bed Tax (5%)</span>
                    <span>{formatPKR(bedTax)}</span>
                  </div>
                  <div className="price-row total-row">
                    <span>Total with Tax</span>
                    <span className="total-price-highlight">{formatPKR(totalWithTax)}</span>
                  </div>
                </div>

                <hr className="room-divider" />

                <div className="room-footer-actions">
                  <div className="room-guest-info">
                    <span>👤 {searchData.guests} Adult{searchData.guests > 1 ? 's' : ''}</span>
                  </div>
                  <div className="room-action-buttons">
                    <button 
                      type="button" 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(room, totalWithTax)}
                    >
                      Add To Cart
                    </button>
                    <button 
                      type="button" 
                      className="room-book-now-btn"
                      onClick={() => handleBookNow(room, totalWithTax)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>

              </div>

              {activeRatesRoomId === room.id && (
                <div className="image-modal-overlay" onClick={closeRatesModal}>
                  <div className="rate-modal-modal-box" onClick={(e) => e.stopPropagation()}>
                    <div className="rate-modal-header">
                      <h3>Select Rate Plan - {room.name}</h3>
                      <button className="rate-modal-close" onClick={closeRatesModal}>×</button>
                    </div>
                    
                    <div className="rate-modal-body">
                      {availablePlans.map((plan, idx) => {
                        const isSelected = room.selectedPlan.name === plan.name;
                        return (
                          <div 
                            key={idx} 
                            className={`rate-plan-option-card ${isSelected ? 'selected-plan-card' : ''}`}
                            style={{ marginBottom: idx < availablePlans.length - 1 ? '12px' : '0' }}
                          >
                            <div className="rate-plan-info">
                              <span className="plan-name">{plan.name}</span>
                              <span className="plan-meal">🍽️ {plan.meal}</span>
                              <span className="plan-cancel">ℹ️ {plan.policy}</span>
                            </div>
                            <div className="rate-plan-price-action">
                              <span className="plan-price">{formatPKR(plan.price)} <small>/ night</small></span>
                              <button 
                                type="button" 
                                className={`select-plan-btn ${isSelected ? 'btn-selected' : ''}`}
                                onClick={() => handleSelectPlan(room.id, plan)}
                              >
                                {isSelected ? 'Selected ✓' : 'Select Plan'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {isModalOpen && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <button className="modal-arrow modal-prev" onClick={prevImage}>❮</button>
            <div className="modal-img-container">
              <img src={activeImages[currentImageIndex]} alt="Room view" />
              <div className="modal-image-counter">
                {currentImageIndex + 1} of {activeImages.length}
              </div>
            </div>
            <button className="modal-arrow modal-next" onClick={nextImage}>❯</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default AvailableRooms;