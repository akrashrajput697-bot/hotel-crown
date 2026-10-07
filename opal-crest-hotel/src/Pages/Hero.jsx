import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../Style/Hero.css';

const sliderImages = [
  'https://images.pexels.com/photos/18353061/pexels-photo-18353061.jpeg',
  'https://images.pexels.com/photos/19564704/pexels-photo-19564704.jpeg',
  'https://images.pexels.com/photos/32981891/pexels-photo-32981891.jpeg',
  'https://images.pexels.com/photos/17926435/pexels-photo-17926435.jpeg'
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);

  const navigate = useNavigate();
  
  // Counts states
  const [roomsCount, setRoomsCount] = useState(1);
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  // Toggle states for custom dropdown popups
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [showAdultsDropdown, setShowAdultsDropdown] = useState(false);
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  
  const calendarRef = useRef(null);
  const popupRef = useRef(null);
  const roomsRef = useRef(null);
  const adultsRef = useRef(null);
  const childrenRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (roomsRef.current && !roomsRef.current.contains(event.target)) {
        setShowRoomsDropdown(false);
      }
      if (adultsRef.current && !adultsRef.current.contains(event.target)) {
        setShowAdultsDropdown(false);
      }
      if (childrenRef.current && !childrenRef.current.contains(event.target)) {
        setShowChildrenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showCalendar && popupRef.current) {
      popupRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showCalendar]);

  const handleCheck = () => {
    navigate('/availability', {
      state: {
        startDate: state[0].startDate,
        endDate: state[0].endDate,
        rooms: `${roomsCount} ${roomsCount === 1 ? 'Room' : 'Rooms'}`,
        adults: `${adultsCount} ${adultsCount === 1 ? 'Adult' : 'Adults'}`,
        children: `${childrenCount} ${childrenCount === 1 ? 'Child' : 'Children'}`,
      },
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="regal-hero-section">
      {sliderImages.map((image, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      <div className="hero-overlay"></div>

      <div className="hero-content-wrapper">
        <span className="hero-subtitle">AN EXCEPTIONAL CITY RETREAT</span>
        <h1 className="hero-title">Experience Unmatched Luxury & Elegance</h1>
        <p className="hero-description">
          Immerse yourself in timeless sophistication. Discover serene rooms, world-class dining, and breathtaking views crafted for your ultimate comfort.
        </p>

        {/* Booking Bar */}
        <div className="hero-booking-bar">
          
          {/* Check-In & Check-Out */}
          <div className="booking-field date-picker-box" style={{ position: 'relative' }} ref={calendarRef}>
            <label>CHECK-IN & CHECK-OUT</label>
            <input
              type="text"
              readOnly
              value={`${formatDate(state[0].startDate)} - ${formatDate(state[0].endDate)}`}
              onClick={() => setShowCalendar(prev => !prev)}
              className="custom-date-input"
            />

            {showCalendar && (
              <div className="dark-calendar-popup" ref={popupRef}>
                <DateRange
                  onChange={item => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                  rangeColors={['#bf9c6f']} 
                  inputRanges={[]}
                />
              </div>
            )}
          </div>

          {/* Rooms Custom Dropdown with +/- */}
          <div className="booking-field custom-select-box" style={{ position: 'relative' }} ref={roomsRef}>
            <label>ROOMS</label>
            <div 
              className="select-display-box" 
              onClick={() => setShowRoomsDropdown(prev => !prev)}
            >
              {roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'} ▼
            </div>

            {showRoomsDropdown && (
              <div className="counter-popup-menu">
                <div className="counter-row">
                  
                  <div className="counter-btns">
                    <button type="button" onClick={() => setRoomsCount(prev => Math.max(1, prev - 1))}>-</button>
                    <span>{roomsCount}</span>
                    <button type="button" onClick={() => setRoomsCount(prev => prev + 1)}>+</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Adults Custom Dropdown with +/- */}
          <div className="booking-field custom-select-box" style={{ position: 'relative' }} ref={adultsRef}>
            <label>ADULTS</label>
            <div 
              className="select-display-box" 
              onClick={() => setShowAdultsDropdown(prev => !prev)}
            >
              {adultsCount} {adultsCount === 1 ? 'Adult' : 'Adults'} ▼
            </div>

            {showAdultsDropdown && (
              <div className="counter-popup-menu">
                <div className="counter-row">
                 
                  <div className="counter-btns">
                    <button type="button" onClick={() => setAdultsCount(prev => Math.max(1, prev - 1))}>-</button>
                    <span>{adultsCount}</span>
                    <button type="button" onClick={() => setAdultsCount(prev => prev + 1)}>+</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Children Custom Dropdown with +/- */}
          <div className="booking-field custom-select-box" style={{ position: 'relative' }} ref={childrenRef}>
            <label>CHILDREN</label>
            <div 
              className="select-display-box" 
              onClick={() => setShowChildrenDropdown(prev => !prev)}
            >
              {childrenCount} {childrenCount === 1 ? 'Child' : 'Children'} ▼
            </div>

            {showChildrenDropdown && (
              <div className="counter-popup-menu">
                <div className="counter-row">
               
                  <div className="counter-btns">
                    <button type="button" onClick={() => setChildrenCount(prev => Math.max(0, prev - 1))}>-</button>
                    <span>{childrenCount}</span>
                    <button type="button" onClick={() => setChildrenCount(prev => prev + 1)}>+</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="hero-check-btn" onClick={handleCheck}>CHECK AVAILABILITY</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;