import React, { useState, useEffect, useRef } from 'react';
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

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  // 1. Automatically change image every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 2. Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 3. Toggle calendar and smooth scroll into view
  const handleToggleCalendar = () => {
    const willOpen = !showCalendar;
    setShowCalendar(willOpen);
    if (willOpen && calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
          
          {/* Check-In & Check-Out Field with Ref for Outside Click & Scroll */}
          <div className="booking-field date-picker-box" style={{ position: 'relative' }} ref={calendarRef}>
            <label>CHECK-IN & CHECK-OUT</label>
            <input
              type="text"
              readOnly
              value={`${formatDate(state[0].startDate)} - ${formatDate(state[0].endDate)}`}
              onClick={handleToggleCalendar}
              className="custom-date-input"
            />

            {showCalendar && (
              <div className="dark-calendar-popup">
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

          <div className="booking-field">
            <label>ROOMS</label>
            <select defaultValue="1 Room">
              <option value="1 Room">1 Room</option>
              <option value="2 Rooms">2 Rooms</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="booking-field">
            <label>ADULTS</label>
            <select defaultValue="1 Adult">
              <option value="1 Adult">1 Adult</option>
              <option value="2 Adults">2 Adults</option>
              <option value="3 Adults">3 Adults</option>
            </select>
          </div>

          <div className="booking-field">
            <label>CHILDREN</label>
            <select defaultValue="0 Children">
              <option value="0 Children">0 Children</option>
              <option value="1 Child">1 Child</option>
              <option value="2 Children">2 Children</option>
            </select>
          </div>

          <button className="hero-check-btn">CHECK AVAILABILITY</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;