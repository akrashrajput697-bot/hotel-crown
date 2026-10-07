import React, { useState, useEffect, useRef } from 'react';
import '../Style/ExecutiveTwin.css';
import Footer from '../component/Footer';

const SLIDE_MS = 3000; // har 3 second baad image change

const rooms = [
  {
    id: 'corporate-twin-room',
    name: 'Corporate Twin Room',
    badge: 'Professional',
    badgeType: 'calm',
    desc: 'Two premium twin beds, dual work areas, high-speed connectivity, and soundproof study environment.',
    guests: 2,
    available: 6,
    oldPrice: 'PKR 13,500',
    price: 'PKR 10,800',
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    amenities: [
      '2 Executive Twin Beds',
      'Dual work desks',
      'Free fast Wi-Fi',
      'Soundproof study environment',
      'Smart LED TV',
      'Coffee station',
      'Luxury toiletries',
      'Daily housekeeping',
    ],
  },
  {
    id: 'executive-lounge-twin',
    name: 'Executive Lounge Twin',
    badge: 'Deluxe Lounge',
    badgeType: 'sale',
    desc: 'Includes exclusive lounge access, complimentary afternoon tea, and high floor views with twin configuration.',
    guests: 2,
    available: 4,
    oldPrice: 'PKR 15,500',
    price: 'PKR 12,400',
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1000',
    ],
    amenities: [
      'Lounge access included',
      'Premium bedding',
      'Express check-in',
      'Complimentary afternoon tea',
      'High floor views',
      'Smart LED TV',
      'Coffee station',
      'Luxury toiletries',
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

function ExecutiveTwin() {
  return (
    <div className="executive-twin-page">
      {/* Hero Section (same as before) */}
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Experience</span>
          <h1 id="hero-title">Executive Twin Rooms</h1>
          <p>Designed for professional colleagues traveling together without compromising on personal luxury.</p>
        </div>
      </section>

      <section className="pro-room-section">
        <div className="container">
          <div className="rc-intro">
            <h2>Explore Our Executive Twin Options</h2>
            <p>Modern productivity meets comfortable separate bedding arrangements.</p>
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
            <div className="rc-facility"><span>🌐</span> High Speed Internet</div>
            <div className="rc-facility"><span>☕</span> Coffee Station</div>
            <div className="rc-facility"><span>🧴</span> Luxury Toiletries</div>
            <div className="rc-facility"><span>📺</span> Smart LED TV</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ExecutiveTwin;