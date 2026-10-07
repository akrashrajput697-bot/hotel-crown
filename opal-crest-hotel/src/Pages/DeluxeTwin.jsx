import React, { useState, useEffect, useRef } from 'react';
import '../Style/DeluxeTwin.css';
import Footer from '../component/Footer';

const SLIDE_MS = 3000; // har 3 second baad image change

const rooms = [
  {
    id: 'classic-twin-beds',
    name: 'Classic Twin Beds',
    badge: 'Best Value',
    badgeType: 'sale',
    desc: 'Two comfortable twin beds featuring premium mattresses, workstation setup, and elegant wooden paneling.',
    guests: 2,
    available: 8,
    oldPrice: 'PKR 11,000',
    price: 'PKR 8,800',
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    amenities: [
      '2 Twin Beds',
      'Premium mattresses',
      'Executive work desk',
      'High-speed Wi-Fi',
      '55" Smart TV',
      'Climate control',
      'Organic toiletries',
      'Tea/coffee maker',
    ],
  },
  {
    id: 'scenic-twin-suite',
    name: 'Scenic Twin Suite',
    badge: 'Balcony View',
    badgeType: 'calm',
    desc: 'Spacious twin room offering a private balcony with panoramic views of the city landmarks.',
    guests: 2,
    available: 5,
    oldPrice: 'PKR 13,000',
    price: 'PKR 10,400',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    amenities: [
      '2 Twin Beds',
      'Private balcony',
      'Panoramic city view',
      'Mini bar included',
      '55" Smart TV',
      'Climate control',
      'Organic toiletries',
      'Tea/coffee maker',
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

function DeluxeTwin() {
  return (
    <div className="deluxe-twin-page">
      {/* Hero Section (same as before) */}
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
            <h2>Explore Our Deluxe Twin Options</h2>
            <p>Thoughtfully laid out rooms equipped with high-end twin beds and modern styling.</p>
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