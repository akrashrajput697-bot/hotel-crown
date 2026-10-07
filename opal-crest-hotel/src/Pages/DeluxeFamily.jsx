import React, { useState, useEffect, useRef } from 'react';
import '../Style/DeluxeFamily.css';
import Footer from '../component/Footer';

const SLIDE_MS = 3000; // har 3 second baad image change

const rooms = [
  {
    id: 'grand-family-connection',
    name: 'Grand Family Connection',
    badge: 'Family Choice',
    badgeType: 'calm',
    desc: 'Connected rooms featuring a king bed and two single beds, seating lounge, and two separate bathrooms.',
    guests: 4,
    available: 5,
    oldPrice: 'PKR 20,000',
    price: 'PKR 16,000',
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    amenities: [
      '1 King & 2 Single Beds',
      '2 Bathrooms',
      'Kids Play Corner',
      'Seating lounge',
      'Dual Smart TVs',
      'Large family refrigerator',
      'Kids safe setup',
      'Espresso station',
    ],
  },
  {
    id: 'executive-family-haven',
    name: 'Executive Family Haven',
    badge: 'Spacious',
    badgeType: 'sale',
    desc: 'An expansive suite with a master bedroom, a cozy kids zone, and modern entertainment systems.',
    guests: 5,
    available: 3,
    oldPrice: 'PKR 24,000',
    price: 'PKR 19,200',
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    amenities: [
      'Extra large space',
      'Master bedroom',
      'Lounge area',
      'Cozy kids zone',
      'Complimentary breakfast',
      'Dual Smart TVs',
      'Entertainment system',
      'Espresso station',
    ],
  },
];

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

function RoomCard({ room, reversed }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, visible] = useReveal();
  const total = room.images.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % total);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, total]);

  const half = Math.ceil(room.amenities.length / 2);
  const cols = [room.amenities.slice(0, half), room.amenities.slice(half)];

  return (
    <article
      ref={ref}
      className={`rc-card ${reversed ? 'rc-reversed' : ''} ${visible ? 'rc-in' : ''}`}
    >
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
            <span className="rc-old">{room.oldPrice}</span>
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

        <div className="rc-actions">
          <a href="#book" className="rc-btn rc-btn-primary">Book this room</a>
        </div>
      </div>
    </article>
  );
}

function DeluxeFamily() {
  return (
    <div className="deluxe-family-page">
      {/* Hero Section (same as before) */}
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Experience</span>
          <h1 id="hero-title">Deluxe Family Suites</h1>
          <p>Spacious and warm environments designed specially for families and group stays.</p>
        </div>
      </section>

      <section className="pro-room-section">
        <div className="container">
          <div className="rc-intro">
            <h2>Explore Our Family Rooms</h2>
            <p>Extra room to unwind, relax, and make memorable moments together.</p>
          </div>
          <div className="rc-list">
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} reversed={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="rc-facilities">
        <div className="container">
          <h2>Room Amenities &amp; Facilities</h2>
          <div className="rc-facilities-grid">
            <div className="rc-facility"><span>📺</span> Dual Smart TVs</div>
            <div className="rc-facility"><span>🧊</span> Large Family Refrigerator</div>
            <div className="rc-facility"><span>🧸</span> Kids Safe Setup</div>
            <div className="rc-facility"><span>☕</span> Espresso Station</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DeluxeFamily;