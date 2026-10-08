import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Style/DeluxeTwin.css';
import Footer from '../component/Footer';

const SLIDE_MS = 3000; // har 3 second baad image change

// Sirf yehi ek room is page par dikhta hai (data Rooms page ke mutabiq)
const room = {
  "id": "deluxe-twin",
  "name": "Deluxe Twin Room",
  "badge": "Best Value",
  "badgeType": "calm",
  "desc": "Room to settle in, with a separate sitting corner for slow mornings and late evenings.",
  "guests": 2,
  "available": 8,
  "price": "PKR 55,000",
  "images": [
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp",
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20twin/2.webp",
    "https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20twin/3.webp"
  ],
  "amenities": [
    "2 Twin Beds",
    "Premium mattresses",
    "Executive work desk",
    "High-speed Wi-Fi",
    "55\" Smart TV",
    "Climate control",
    "Organic toiletries",
    "Tea/coffee maker",
    "Private balcony",
    "Panoramic city view",
    "Mini bar included"
  ]
};

/* Scroll par card smoothly andar aata hai */
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

  // Auto slider: har 3 second. Hover par ruk jata hai.
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
      {/* Gallery */}
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
          <span className="rc-counter">
            {active + 1} / {total}
          </span>

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

      {/* Details */}
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
          {/* Add to Cart Button */}
          <button 
            type="button" 
            className="rc-btn rc-btn-secondary" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Reservation page par isi room ke saath le jata hai */}
          <Link to={`/reservation?room=${room.id}`} className="rc-btn rc-btn-primary">
            Book now
          </Link>
        </div>
      </div>
    </article>
  );
}

function DeluxeTwin() {
  return (
    <div className="deluxe-twin-page">
      {/* Hero Section (unchanged) */}
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Experience</span>
          <h1 id="hero-title">Deluxe Twin Rooms</h1>
          <p>Perfect for friends or colleagues seeking comfort with separate sleeping spaces.</p>
        </div>
      </section>

      <section className="pro-room-section">
        <div className="container">
          <div className="rc-intro">
            <h2>Explore Our Deluxe Twin Room</h2>
            <p>Thoughtfully laid out room equipped with high-end twin beds and modern styling.</p>
          </div>
          <div className="rc-list">
            <RoomCard room={room} />
          </div>
        </div>
      </section>

      <section className="rc-facilities">
        <div className="container">
          <h2>Room Amenities &amp; Facilities</h2>
          <div className="rc-facilities-grid">
            <div className="rc-facility"><span>📺</span> 55&quot; Smart TV</div>
            <div className="rc-facility"><span>❄️</span> Climate Control</div>
            <div className="rc-facility"><span>🧴</span> Organic Toiletries</div>
            <div className="rc-facility"><span>☕</span> Tea/Coffee Maker</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DeluxeTwin;