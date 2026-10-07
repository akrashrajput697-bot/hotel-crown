import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/Hero.css';

const heroImages = [
  "https://hotelcrowncp.com/assets/images/banner/banner7.webp",
  "https://hotelcrowncp.com/assets/images/banner/banner2.webp",
  "https://hotelcrowncp.com/assets/images/banner/banner3.webp",
  "https://hotelcrowncp.com/assets/images/banner/banner4.webp"
];

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Har dropdown ke liye alag state taake wo alag-alag khul sakein
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);
  const [isAdultDropdownOpen, setIsAdultDropdownOpen] = useState(false);
  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const roomRef = useRef(null);
  const adultRef = useRef(null);
  const childRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (roomRef.current && !roomRef.current.contains(event.target)) setIsRoomDropdownOpen(false);
      if (adultRef.current && !adultRef.current.contains(event.target)) setIsAdultDropdownOpen(false);
      if (childRef.current && !childRef.current.contains(event.target)) setIsChildDropdownOpen(false);
      if (calendarRef.current && !calendarRef.current.contains(event.target)) setIsCalendarOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setTimeout(() => setIsCalendarOpen(false), 250);
    }
  };

  const getEffectiveEndDate = () => {
    if (endDate) return endDate;
    if (startDate) {
      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return tomorrow;
  };

  const formatDateString = (dateObj) => {
    if (!dateObj) return '';
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCheckAvailability = () => {
    const finalEndDate = getEffectiveEndDate();
    navigate('/available-rooms', {
      state: {
        startDate: formatDateString(startDate),
        endDate: formatDateString(finalEndDate),
        rooms: rooms,
        guests: adults + children
      }
    });
  };

  return (
    <section 
      className="hero-section"
      style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
    >
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1>Hotel Crown CP Islamabad</h1>
        <h1>Luxury Rooms & Premium</h1>
        <h1>Comfort in Blue Area</h1>
        <p>
          Experience unparalleled comfort at Hotel Crown CP Islamabad, featuring spacious rooms,
          modern amenities, and exceptional hospitality in Blue Area; ideal for families, leisure,
          and business travelers.
        </p>
      </div>

      <div className="slider-dots">
        {heroImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          ></span>
        ))}
      </div>

      {/* Booking Search Widget */}
      <div className="booking-widget">
        <div className="widget-header">
          <h3>Plan Your Perfect Stay</h3>
          <p>Select your dates and guests to explore available rooms.</p>
        </div>
        
        <div className="widget-inputs">
          
          {/* Check-in & Check-out Range Calendar Input */}
          <div className="input-group calendar-group" ref={calendarRef}>
            <label>Check-in & Check-out</label>
            <input 
              type="text"
              readOnly
              value={`${formatDateString(startDate)} - ${formatDateString(getEffectiveEndDate())}`}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="custom-date-range-input"
            />

            {isCalendarOpen && (
              <div className="trip-calendar-popup">
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange={true}
                  minDate={today}
                  monthsShown={2}
                  inline
                />
              </div>
            )}
          </div>
          
          {/* 1. Rooms Separate Dropdown */}
          <div className="input-group" ref={roomRef}>
            <label>Rooms</label>
            <input 
              type="text" 
              value={`${rooms} Room${rooms > 1 ? 's' : ''}`} 
              onClick={() => setIsRoomDropdownOpen(!isRoomDropdownOpen)}
              readOnly 
            />

            {isRoomDropdownOpen && (
              <div className="single-dropdown-menu">
                <div className="dropdown-row">
                  <span>Rooms</span>
                  <div className="counter-controls">
                    <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
                    <span>{rooms}</span>
                    <button type="button" onClick={() => setRooms(rooms + 1)}>+</button>
                  </div>
                </div>
                <button type="button" className="done-btn" onClick={() => setIsRoomDropdownOpen(false)}>Done</button>
              </div>
            )}
          </div>

          {/* 2. Adults Separate Dropdown */}
          <div className="input-group" ref={adultRef}>
            <label>Adults</label>
            <input 
              type="text" 
              value={`${adults} Adult${adults > 1 ? 's' : ''}`} 
              onClick={() => setIsAdultDropdownOpen(!isAdultDropdownOpen)}
              readOnly 
            />

            {isAdultDropdownOpen && (
              <div className="single-dropdown-menu">
                <div className="dropdown-row">
                  <span>Adults</span>
                  <div className="counter-controls">
                    <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                    <span>{adults}</span>
                    <button type="button" onClick={() => setAdults(adults + 1)}>+</button>
                  </div>
                </div>
                <button type="button" className="done-btn" onClick={() => setIsAdultDropdownOpen(false)}>Done</button>
              </div>
            )}
          </div>

          {/* 3. Children Separate Dropdown */}
          <div className="input-group" ref={childRef}>
            <label>Children</label>
            <input 
              type="text" 
              value={`${children} Child${children !== 1 ? 'ren' : ''}`} 
              onClick={() => setIsChildDropdownOpen(!isChildDropdownOpen)}
              readOnly 
            />

            {isChildDropdownOpen && (
              <div className="single-dropdown-menu">
                <div className="dropdown-row">
                  <span>Children</span>
                  <div className="counter-controls">
                    <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                    <span>{children}</span>
                    <button type="button" onClick={() => setChildren(children + 1)}>+</button>
                  </div>
                </div>
                <button type="button" className="done-btn" onClick={() => setIsChildDropdownOpen(false)}>Done</button>
              </div>
            )}
          </div>
          
          {/* Check Availability Button */}
          <button 
            type="button"
            onClick={handleCheckAvailability}
            className="check-availability-btn"
          >
            Check Availability
            <span className="arrow-icon">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;