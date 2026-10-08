import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import '../Style/Gym.css';
import Footer from '../component/Footer';

const px = (id, w = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/* ---------- Data (yahan se sab kuch badal sakte ho) ---------- */
const hours = [
  { label: 'Open daily', time: '5:00 AM - 11:00 PM' },
  { label: 'Quietest hours', time: '10:00 AM - 2:00 PM' },
  { label: 'Hotel guests', time: 'Free access' },
  { label: 'Towels and water', time: 'Provided' },
];

const zones = [
  {
    name: 'Cardio Floor',
    text: 'Treadmills, bikes, ellipticals and rowers, each with its own screen and charging port.',
    img: px(1954524),
  },
  {
    name: 'Free Weights',
    text: 'Dumbbells up to 50 kg, adjustable benches, squat racks and a full barbell area.',
    img: px(841130),
  },
  {
    name: 'Studio',
    text: 'A bright, mirrored room for yoga, stretching and small group classes.',
    img: px(1552242),
  },
];

const schedule = {
  Mon: [
    { time: '6:30 AM', name: 'Morning Yoga', coach: 'Ayesha', level: 'All levels' },
    { time: '5:30 PM', name: 'HIIT Circuit', coach: 'Bilal', level: 'Intermediate' },
    { time: '7:00 PM', name: 'Core and Stretch', coach: 'Sana', level: 'All levels' },
  ],
  Tue: [
    { time: '7:00 AM', name: 'Spin Ride', coach: 'Bilal', level: 'All levels' },
    { time: '6:00 PM', name: 'Strength Basics', coach: 'Hamza', level: 'Beginner' },
  ],
  Wed: [
    { time: '6:30 AM', name: 'Morning Yoga', coach: 'Ayesha', level: 'All levels' },
    { time: '5:30 PM', name: 'Boxing Fit', coach: 'Hamza', level: 'Intermediate' },
    { time: '7:00 PM', name: 'Pilates', coach: 'Sana', level: 'All levels' },
  ],
  Thu: [
    { time: '7:00 AM', name: 'Spin Ride', coach: 'Bilal', level: 'All levels' },
    { time: '6:00 PM', name: 'HIIT Circuit', coach: 'Bilal', level: 'Intermediate' },
  ],
  Fri: [
    { time: '6:30 AM', name: 'Morning Yoga', coach: 'Ayesha', level: 'All levels' },
    { time: '5:00 PM', name: 'Strength Basics', coach: 'Hamza', level: 'Beginner' },
  ],
  Sat: [
    { time: '9:00 AM', name: 'Weekend Flow Yoga', coach: 'Ayesha', level: 'All levels' },
    { time: '10:30 AM', name: 'Boxing Fit', coach: 'Hamza', level: 'Intermediate' },
    { time: '5:00 PM', name: 'Stretch and Relax', coach: 'Sana', level: 'All levels' },
  ],
  Sun: [{ time: '9:30 AM', name: 'Gentle Yoga', coach: 'Ayesha', level: 'All levels' }],
};

const plans = [
  {
    name: 'Day Pass',
    price: 'PKR 1,500',
    per: '/ visit',
    note: 'For visitors who are not staying with us.',
    perks: ['Full gym floor access', 'Towel and water', 'Locker for the day'],
  },
  {
    name: 'Monthly',
    price: 'PKR 15,000',
    per: '/ month',
    note: 'Our most chosen plan for local members.',
    perks: [
      'Unlimited gym access',
      'All group classes included',
      'Free fitness assessment',
      'Steam room access',
    ],
    featured: true,
  },
  {
    name: 'Personal Training',
    price: 'PKR 3,500',
    per: '/ session',
    note: 'One to one with a certified coach.',
    perks: ['Custom workout plan', 'Form and technique coaching', 'Progress tracking'],
  },
];

const coaches = [
  { name: 'Hamza Raza', role: 'Strength and boxing coach' },
  { name: 'Ayesha Khan', role: 'Yoga instructor' },
  { name: 'Bilal Ahmed', role: 'Cardio and HIIT coach' },
];

const faqs = [
  { q: 'Is the gym free for hotel guests?', a: 'Yes. Guests staying at The Regal can use the gym, studio and steam room at no extra charge during their stay.' },
  { q: 'Do I need to book a class?', a: 'Group classes are first come, first served. For personal training, please book at the front desk or call us a day ahead.' },
  { q: 'What should I bring?', a: 'Just your workout clothes and indoor sports shoes. We provide towels, water and lockers.' },
  { q: 'Is there an age limit?', a: 'The gym is open to guests aged 16 and above. Younger guests may use the studio with a parent present.' },
];

/* ---------- Helpers ---------- */
function Reveal({ children, className = '', delay = 0 }) {
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

  return (
    <div
      ref={ref}
      className={`gy-reveal ${visible ? 'gy-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('');

/* ---------- Page ---------- */
function Gym() {
  const days = Object.keys(schedule);
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon = 0
  const [day, setDay] = useState(days[todayIdx]);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="gym-page">
      <Helmet>
        <title>Fitness Centre & Gym | The Regal Hotel & Residences</title>
        <meta name="description" content="Train at The Regal Fitness Centre in Islamabad featuring modern cardio equipment, free weights, a yoga studio, daily group classes, and personal training options." />
        <meta name="keywords" content="hotel gym islamabad, fitness centre, gym membership, yoga classes, personal training, the regal residences" />
        <meta name="author" content="The Regal Hotel & Residences" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/gym" />

        <meta property="og:title" content="Fitness Centre & Gym | The Regal Hotel & Residences" />
        <meta property="og:description" content="Discover our modern fitness centre, gym equipment, class schedules, and membership passes in Islamabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/gym" />
        <meta property="og:image" content="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1000" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fitness Centre & Gym | The Regal Hotel & Residences" />
        <meta name="twitter:description" content="Train at The Regal Fitness Centre with modern equipment, yoga studios, and professional coaches." />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1000" />
      </Helmet>

      {/* Hero */}
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Wellness</span>
          <h1 id="hero-title">Fitness Centre</h1>
          <p>Modern equipment, calm studio space and friendly coaches, open from early morning to late night.</p>
          <div className="hero-badges">
            <a href="#classes" className="gy-hero-btn">See class schedule</a>
            <a href="#plans" className="gy-hero-btn gy-hero-btn-ghost">Membership</a>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="gy-info">
        <div className="container gy-info-grid">
          {hours.map((h, i) => (
            <Reveal key={h.label} delay={i * 90} className="gy-info-item">
              <span className="gy-info-label">{h.label}</span>
              <strong>{h.time}</strong>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Zones */}
      <section className="gy-section">
        <div className="container">
          <Reveal className="gy-heading">
            <h2>Train your way</h2>
            <p>Three spaces, one floor. Move between them as your workout needs.</p>
          </Reveal>

          <div className="gy-zone-grid">
            {zones.map((z, i) => (
              <Reveal key={z.name} delay={i * 120} className="gy-zone">
                <div className="gy-zone-img">
                  <img src={z.img} alt={z.name} loading="lazy" />
                </div>
                <div className="gy-zone-body">
                  <h3>{z.name}</h3>
                  <p>{z.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="gy-section gy-classes-section" id="classes">
        <div className="container">
          <Reveal className="gy-heading">
            <h2>Class schedule</h2>
            <p>Group classes are free for hotel guests and members.</p>
          </Reveal>

          <div className="gy-tabs" role="tablist" aria-label="Days of the week">
            {days.map((d) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={day === d}
                className={`gy-tab ${day === d ? 'is-active' : ''}`}
                onClick={() => setDay(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <ul className="gy-class-list" key={day}>
            {schedule[day].map((c, i) => (
              <li key={c.time + c.name} className="gy-class" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="gy-class-time">{c.time}</span>
                <div className="gy-class-main">
                  <h3>{c.name}</h3>
                  <p>with {c.coach}</p>
                </div>
                <span className="gy-level">{c.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plans */}
      <section className="gy-section" id="plans">
        <div className="container">
          <Reveal className="gy-heading">
            <h2>Membership and passes</h2>
            <p>Hotel guests train free. These options are for visitors and local members.</p>
          </Reveal>

          <div className="gy-plan-grid">
            {plans.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 120}
                className={`gy-plan ${p.featured ? 'is-featured' : ''}`}
              >
                {p.featured && <span className="gy-plan-flag">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="gy-plan-note">{p.note}</p>
                <div className="gy-plan-price">
                  <strong>{p.price}</strong>
                  <small>{p.per}</small>
                </div>
                <ul>
                  {p.perks.map((perk) => (
                    <li key={perk}>
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a href="#join" className="gy-plan-btn">Choose {p.name}</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="gy-section gy-coach-section">
        <div className="container">
          <Reveal className="gy-heading">
            <h2>Meet your coaches</h2>
            <p>Certified, patient and happy to help beginners.</p>
          </Reveal>

          <div className="gy-coach-grid">
            {coaches.map((c, i) => (
              <Reveal key={c.name} delay={i * 110} className="gy-coach">
                <span className="gy-avatar">{initials(c.name)}</span>
                <h3>{c.name}</h3>
                <p>{c.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gy-section" id="join">
        <div className="container gy-faq-wrap">
          <Reveal className="gy-heading">
            <h2>Good to know</h2>
            <p>Quick answers before your first visit.</p>
          </Reveal>

          <Reveal className="gy-faq">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className={`gy-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="gy-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    {f.q}
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5 8l5 5 5-5" />
                    </svg>
                  </button>
                  <div className="gy-faq-a">
                    <p>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal className="gy-cta">
            <h3>Ready for your first session?</h3>
            <p>Visit the front desk or call us on +92 300 0000000 and we will set you up.</p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Gym;