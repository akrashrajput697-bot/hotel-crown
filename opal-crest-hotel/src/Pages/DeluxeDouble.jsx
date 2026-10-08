import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Style/DeluxeDouble.css';
import Footer from '../component/Footer';

const SLIDE_MS = 3000;

const room = {
  "id": "deluxe-double",
  "name": "Deluxe Double Room",
  "badge": "Quiet & Peaceful",
  "badgeType": "calm",
  "desc": "A quiet city sanctuary, dressed in rich neutral textures and thoughtful details.",
  "guests": 2,
  "available": 10,
  "price": "PKR 45,000",
  "images": [
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp",
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/2.webp",
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/3.webp",
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/4.webp",
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/5.webp",
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/6.webp",
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/7.webp"
  ],
  "amenities": [
    "Complimentary breakfast",
    "King-size bed",
    "Small work station",
    "LED TV with internet access",
    "Modern ensuite bathroom",
    "Complimentary high-speed Wi-Fi",
    "24/7 room service",
    "Climate control system",
    "Mini-refrigerator",
    "Coffee and tea making facilities",
    "In-room safe",
    "Daily housekeeping",
    "Laundry service",
    "Two Sofas with Table",
    "Extra mattress available with extra charges",
    "Courtyard View",
    "Soundproof windows",
    "Artisan tea station"
  ]
};

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

function RoomCard({ room }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, visible] = useReveal();
  const total = room.images.length;

  const { addToCart } = useCart();

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % total);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, total]);

  const half = Math.ceil(room.amenities.length / 2);
  const cols = [room.amenities.slice(0, half), room.amenities.slice(half)];

  const handleAddToCart = () => {
    addToCart(room);
  };

  return (
    <article ref={ref} className={`rc-card ${visible ? 'rc-in' : ''}`}>
      <div
        className="rc-gallery"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="rc-stage">
          {room.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${room.name} - view ${i + 1}`}
              className={`rc-slide ${i === active ? 'is-active' : ''}`}
              loading="lazy"
            />
          ))}

          <span className={`rc-badge rc-badge-${room.badgeType}`}>{room.badge}</span>
          <span className="rc-counter">{active + 1} / {total}</span>

          {total > 1 && (
            <div className="rc-progress" aria-hidden="true">
              <span
                key={`${active}-${paused}`}
                className={`rc-progress-bar ${paused ? 'is-paused' : ''}`}
                style={{ animationDuration: `${SLIDE_MS}ms` }}
              />
            </div>
          )}
        </div>

        <div className="rc-thumbs">
          {room.images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`rc-thumb ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="rc-details">
        <h2 className="rc-title">{room.name}</h2>
        <p className="rc-desc">{room.desc}</p>

        <div className="rc-facts">
          <div className="rc-fact">
            <span className="rc-fact-label">Occupancy</span>
            <strong>{room.guests} Guests</strong>
          </div>
          <div className="rc-fact">
            <span className="rc-fact-label">Availability</span>
            <strong className="rc-avail">
              <i className="rc-dot" />
              {room.available} rooms left
            </strong>
          </div>
          <div className="rc-price">
            <span className="rc-now">
              {room.price}
              <small> / night</small>
            </span>
          </div>
        </div>

        <h3 className="rc-sub">Room amenities</h3>
        <div className="rc-amenities">
          {cols.map((col, c) => (
            <ul key={c}>
              {col.map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="rc-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            type="button" 
            className="rc-btn rc-btn-secondary" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <Link to={`/reservation?room=${room.id}`} className="rc-btn rc-btn-primary">
            Book now
          </Link>
        </div>
      </div>
    </article>
  );
}

function DeluxeDouble() {
  return (
    <div className="deluxe-double-page">
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Experience</span>
          <h1 id="hero-title">Deluxe Double Rooms</h1>
          <p>Discover private sanctuaries designed for ultimate comfort, elegance, and serenity.</p>
          <div className="hero-badges">
            <span>✨ BEST PRICE GUARANTEE</span>
            <span>🔒 SECURE BOOKING</span>
            <span>🛎️ 24/7 ROOM SERVICE</span>
          </div>
        </div>
      </section>

      <section className="pro-room-section">
        <div className="container rc-list">
          <RoomCard room={room} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DeluxeDouble;