import React, { useState, useEffect, useRef } from 'react';
import '../Style/DeluxeDouble.css';
import Footer from '../component/Footer';

const SLIDE_MS = 3000; // har 3 second baad image change

const rooms = [
  {
    id: 'deluxe-king',
    name: 'Deluxe King',
    badge: '20% OFF',
    badgeType: 'sale',
    desc: 'Spacious rooms with king-size beds, modern amenities, and elegant decor perfect for couples and leisure travelers.',
    guests: 2,
    available: 10,
    oldPrice: 'PKR 12,000',
    price: 'PKR 9,600',
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    amenities: [
      'Complimentary breakfast',
      'King-size bed',
      'Small work station',
      'LED TV with internet access',
      'Modern ensuite bathroom',
      'Complimentary high-speed Wi-Fi',
      '24/7 room service',
      'Climate control system',
      'Mini-refrigerator',
      'Coffee and tea making facilities',
      'In-room safe',
      'Daily housekeeping',
      'Laundry service',
      'Two Sofas with Table',
      'Extra mattress available with extra charges',
    ],
  },
  {
    id: 'garden-courtyard',
    name: 'Garden Courtyard Double',
    badge: 'Quiet & Peaceful',
    badgeType: 'calm',
    desc: 'A tranquil retreat facing our lush interior courtyard, equipped with premium bedding and peaceful seating area.',
    guests: 2,
    available: 6,
    oldPrice: 'PKR 14,000',
    price: 'PKR 11,200',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    amenities: [
      'Courtyard View',
      '2 Double Beds',
      'Soundproof windows',
      'High-speed Wi-Fi',
      'Modern ensuite bathroom',
      'Artisan tea station',
      '24/7 room service',
      'Daily housekeeping',
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

  // Auto slider: har 3 second. Hover par ruk jata hai.
  // `active` dependency hai taake thumbnail click par timer dobara 3s se shuru ho.
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
          <a href="#book" className="rc-btn rc-btn-primary">Book now</a>
         
        </div>
      </div>
    </article>
  );
}

function DeluxeDouble() {
  return (
    <div className="deluxe-double-page">
      {/* Hero Section (unchanged) */}
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

      {/* Rooms */}
      <section className="pro-room-section">
        <div className="container rc-list">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} reversed={i % 2 === 1} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DeluxeDouble;