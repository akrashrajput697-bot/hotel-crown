import React, { useState, useEffect, useRef } from 'react';
import '../Style/Activities.css';
import Footer from '../component/Footer';

const SLIDE_MS = 3000; // har 3 second baad image change
const WHATSAPP = '923000000000'; // country code ke saath, bina + ke

/* ---------- Data (Direct Image Links) ---------- */
const activities = [
  {
    id: 'snooker',
    name: 'Snooker Lounge',
    short: 'Full-size tables and a quiet lounge.',
    tagline: 'Chalk up and take your shot',
    desc: 'A calm, well-lit room with full-size tournament tables, a small bar counter and comfortable seating for spectators. Come for a casual frame with friends or practise with one of our markers.',
    images: [
      'https://images.pexels.com/photos/15473886/pexels-photo-15473886.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/5055424/pexels-photo-5055424.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/13291440/pexels-photo-13291440.jpeg?auto=compress&cs=tinysrgb&w=1000'
    ],
    facts: [
      { label: 'Timings', value: '2:00 PM - 1:00 AM' },
      { label: 'Tables', value: '3 full-size tables' },
      { label: 'Rate', value: 'PKR 1,200 / hour' },
    ],
    highlights: [
      'Tournament-grade tables and cues',
      'Coaching with a pro marker',
      'Private booking for groups',
      'Snacks and drinks at your table',
    ],
    rules: ['Please book a table a few hours ahead on weekends.', 'Smart casual dress, no outdoor shoes on the tables area.'],
  },
  {
    id: 'pool',
    name: 'Swimming Pool',
    short: 'Heated rooftop pool, kids section and sun deck.',
    tagline: 'Slow mornings, cool evenings',
    desc: 'A magnificent rooftop pool surrounded by a sun deck and loungers, offering a panoramic view. Lifeguards are on duty during every opening hour, and towels are provided poolside.',
    images: [
      'https://images.unsplash.com/photo-1774284498049-eee34f796ce7?q=80&w=871&auto=format&fit=crop',
      'https://images.pexels.com/photos/2064706/pexels-photo-2064706.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/24805046/pexels-photo-24805046.jpeg?auto=compress&cs=tinysrgb&w=1000'
    ],
    facts: [
      { label: 'Timings', value: '6:00 AM - 9:00 PM' },
      { label: 'Depth', value: '0.9 m to 1.8 m' },
      { label: 'Hotel guests', value: 'Free access' },
    ],
    highlights: [
      'Rooftop views with heated water',
      'Separate kids pool',
      'Poolside towels and loungers',
      'Lifeguard on duty',
    ],
    rules: ['Shower before entering the pool.', 'Proper swimwear is required.', 'Children under 12 must be with an adult.'],
  },
  {
    id: 'spa',
    name: 'Spa Centre',
    short: 'Massage, facials and steam room.',
    tagline: 'Slow down and let go',
    desc: 'Quiet treatment rooms, soft lighting and trained therapists. Start with a steam session, then choose a massage or facial that suits how you feel today. Couples rooms are available on request.',
    images: [
      'https://plus.unsplash.com/premium_photo-1723489360240-e1896c1af32a?q=80&w=870&auto=format&fit=crop',
      'https://images.pexels.com/photos/35495081/pexels-photo-35495081.jpeg?auto=compress&cs=tinysrgb&w=1000',
      'https://images.pexels.com/photos/7789646/pexels-photo-7789646.jpeg?auto=compress&cs=tinysrgb&w=1000'
    ],
    facts: [
      { label: 'Timings', value: '10:00 AM - 9:00 PM' },
      { label: 'Treatment rooms', value: '4 rooms, 1 couples room' },
      { label: 'Steam room', value: 'Free with any treatment' },
    ],
    highlights: [
      'Certified therapists',
      'Natural oils and products',
      'Couples treatment room',
      'Complimentary herbal tea after your session',
    ],
    rules: ['Please arrive 10 minutes before your appointment.', 'Let us know about allergies or injuries when you book.'],
    menu: [
      { name: 'Signature Relaxing Massage', time: '60 min', price: 'PKR 7,500' },
      { name: 'Deep Tissue Massage', time: '60 min', price: 'PKR 8,500' },
      { name: 'Hydrating Facial', time: '45 min', price: 'PKR 6,000' },
      { name: 'Hot Stone Therapy', time: '75 min', price: 'PKR 9,500' },
      { name: 'Couples Spa Ritual', time: '90 min', price: 'PKR 18,000' },
    ],
  },
];

/* ---------- Helpers ---------- */
function useReveal(threshold = 0.12) {
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
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`ac-reveal ${visible ? 'ac-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* Auto-sliding gallery: har 3 second, hover par ruk jata hai */
function Slider({ images, alt }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % total), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, paused, total]);

  return (
    <div
      className="ac-gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ac-stage">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} - view ${i + 1}`}
            className={`ac-slide ${i === active ? 'is-active' : ''}`}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
          />
        ))}
        <span className="ac-counter">{active + 1} / {total}</span>
        {total > 1 && (
          <div className="ac-progress" aria-hidden="true">
            <span
              key={`${active}-${paused}`}
              className={`ac-progress-bar ${paused ? 'is-paused' : ''}`}
              style={{ animationDuration: `${SLIDE_MS}ms` }}
            />
          </div>
        )}
      </div>
      <div className="ac-thumbs">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`ac-thumb ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
          >
            <img src={src} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ActivityBlock({ a, reversed }) {
  const waText = encodeURIComponent(`Hello, I would like to book: ${a.name}`);
  return (
    <section className="ac-block" id={a.id}>
      <Reveal className={`ac-card ${reversed ? 'ac-reversed' : ''}`}>
        <Slider images={a.images} alt={a.name} />

        <div className="ac-info">
          <span className="ac-kicker">{a.tagline}</span>
          <h2>{a.name}</h2>
          <p className="ac-desc">{a.desc}</p>

          <div className="ac-facts">
            {a.facts.map((f) => (
              <div key={f.label} className="ac-fact">
                <span>{f.label}</span>
                <strong>{f.value}</strong>
              </div>
            ))}
          </div>

          <ul className="ac-list">
            {a.highlights.map((h) => (
              <li key={h}>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                {h}
              </li>
            ))}
          </ul>

          {a.menu && (
            <div className="ac-menu">
              <h3>Treatments</h3>
              <ul>
                {a.menu.map((m) => (
                  <li key={m.name}>
                    <div className="ac-menu-name">
                      <strong>{m.name}</strong>
                      <span>{m.time}</span>
                    </div>
                    <span className="ac-menu-dots" aria-hidden="true" />
                    <span className="ac-menu-price">{m.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="ac-rules">
            <strong>Good to know</strong>
            <ul>
              {a.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="ac-actions">
            <a
              className="ac-btn ac-btn-primary"
              href={`https://wa.me/${WHATSAPP}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
            >
              Book on WhatsApp
            </a>
            <a className="ac-btn ac-btn-ghost" href="#contact-us">Ask a question</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Page ---------- */
function Activities() {
  return (
    <div className="activities-page">
      {/* Hero */}
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Leisure</span>
          <h1 id="hero-title">Activities</h1>
          <p>Play a frame of snooker, swim a few laps or unwind at the spa. Everything is under one roof.</p>
        </div>
      </section>

      {/* Quick nav cards */}
      <section className="ac-nav-section">
        <div className="container ac-nav">
          {activities.map((a, i) => (
            <Reveal key={a.id} delay={i * 100}>
              <a className="ac-nav-card" href={`#${a.id}`}>
                <span className="ac-nav-num">0{i + 1}</span>
                <h3>{a.name}</h3>
                <p>{a.short}</p>
                <span className="ac-nav-more">
                  Explore
                  <svg viewBox="0 0 20 20" aria-hidden="http://www.w3.org/2000/svg"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Activity sections */}
      <div className="container ac-list-wrap">
        {activities.map((a, i) => (
          <ActivityBlock key={a.id} a={a} reversed={i % 2 === 1} />
        ))}
      </div>

      {/* CTA */}
      <section className="ac-cta-section" id="contact-us">
        <div className="container">
          <Reveal className="ac-cta">
            <h2>Planning a day with us?</h2>
            <p>Tell us what you would like to do and we will arrange the timings, tables and treatments before you arrive.</p>
            <a
              className="ac-btn ac-btn-light"
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello, I would like to know more about your activities.')}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat with our team
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Activities;