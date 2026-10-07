import React, { useState, useEffect, useRef } from 'react';
import '../Style/Restaurant.css';
import Footer from '../component/Footer';

/* ---------- Data (yahan se menu / prices badal sakte ho) ---------- */
const menu = {
  Starters: [
    { name: 'Chicken Malai Tikka', desc: 'Creamy marinated chicken, charcoal grilled, mint chutney', price: 1450, tag: "Chef's pick" },
    { name: 'Crispy Calamari', desc: 'Lightly battered, lemon aioli, charred lime', price: 1650 },
    { name: 'Wild Mushroom Soup', desc: 'Slow-cooked cream of mushroom, truffle oil, garlic crostini', price: 1100, tag: 'Vegetarian' },
    { name: 'Dahi Bhallay Chaat', desc: 'Lentil dumplings, yogurt, tamarind, pomegranate', price: 850, tag: 'Vegetarian' },
    { name: 'Spicy Prawn Tempura', desc: 'Sweet chilli glaze, sesame, spring onion', price: 1950, tag: 'Spicy' },
  ],
  Mains: [
    { name: 'Regal Mutton Karahi', desc: 'Wok-cooked with tomato, ginger and green chilli. Served with naan', price: 3200, tag: "Chef's pick" },
    { name: 'Grilled Ribeye Steak', desc: '300g ribeye, peppercorn sauce, buttered greens, roast potatoes', price: 4800 },
    { name: 'Butter Chicken Biryani', desc: 'Long-grain basmati layered with butter chicken and saffron', price: 2100 },
    { name: 'Pan-Seared Salmon', desc: 'Lemon butter sauce, asparagus, creamy mash', price: 3600 },
    { name: 'Wild Mushroom Risotto', desc: 'Arborio rice, parmesan, thyme, truffle oil', price: 2400, tag: 'Vegetarian' },
    { name: 'Chapli Kebab Platter', desc: 'Peshawari-style beef patties, fresh naan, raita, salad', price: 1900, tag: 'Spicy' },
  ],
  Desserts: [
    { name: 'Gulab Jamun Cheesecake', desc: 'Baked cheesecake, rose syrup, pistachio crumble', price: 1250, tag: "Chef's pick" },
    { name: 'Molten Chocolate Fondant', desc: 'Warm dark chocolate centre, vanilla bean ice cream', price: 1350 },
    { name: 'Kheer Brûlée', desc: 'Cardamom rice pudding with a caramelised sugar crust', price: 950 },
    { name: 'Seasonal Fruit Platter', desc: 'Fresh cut fruit, mint, honey-lime drizzle', price: 800, tag: 'Vegetarian' },
  ],
  Drinks: [
    { name: 'Kashmiri Chai', desc: 'Pink tea with cardamom, almonds and pistachio', price: 450 },
    { name: 'Fresh Mint Margarita', desc: 'Mint, lime, soda, a touch of rock salt (non-alcoholic)', price: 650 },
    { name: 'Cold Brew Coffee', desc: '18-hour steeped, served over ice with milk on the side', price: 700 },
    { name: 'Mango Lassi', desc: 'Sindhri mango, thick yogurt, cardamom', price: 600 },
    { name: 'Sparkling Berry Cooler', desc: 'Mixed berries, lemon, sparkling water', price: 650 },
  ],
};

const signatures = [
  {
    name: 'Regal Mutton Karahi',
    note: 'Our most ordered dish, finished tableside.',
    price: 'PKR 3,200',
    img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    name: 'Grilled Ribeye Steak',
    note: 'Aged, charred over open flame, rested before serving.',
    price: 'PKR 4,800',
    img: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    name: 'Gulab Jamun Cheesecake',
    note: 'A familiar mithai turned into our signature dessert.',
    price: 'PKR 1,250',
    img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
];

const spaces = [
  {
    name: 'Main Dining Hall',
    seats: 'Up to 80 guests',
    text: 'Warm lighting, high ceilings and an open kitchen. Good for family dinners and celebrations.',
    img: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    name: 'Garden Terrace',
    seats: 'Up to 40 guests',
    text: 'Open-air seating with lanterns and a cool evening breeze. Best from sunset onwards.',
    img: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    name: 'Private Dining Room',
    seats: 'Up to 14 guests',
    text: 'A closed room with its own server. Made for business dinners and small gatherings.',
    img: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
];

const hours = [
  { meal: 'Breakfast', time: '7:00 AM - 10:30 AM' },
  { meal: 'Lunch', time: '12:30 PM - 3:30 PM' },
  { meal: 'High tea', time: '4:30 PM - 6:30 PM' },
  { meal: 'Dinner', time: '7:30 PM - 11:30 PM' },
];

/* ---------- Helpers ---------- */
function useReveal(threshold = 0.15) {
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
      className={`rs-reveal ${visible ? 'rs-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const formatPKR = (n) => `PKR ${n.toLocaleString('en-US')}`;

/* ---------- Page ---------- */
function Restaurant() {
  const categories = Object.keys(menu);
  const [category, setCategory] = useState(categories[0]);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: '2',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Please enter your name.';
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim()))
      er.phone = 'Enter a valid phone number.';
    if (!form.date) er.date = 'Choose a date.';
    setErrors(er);
    if (Object.keys(er).length === 0) {
      // TODO: yahan apni API / WhatsApp / email integration lagao
      setSent(true);
    }
  };

  const resetForm = () => {
    setSent(false);
    setForm({ name: '', phone: '', date: '', time: '19:30', guests: '2', notes: '' });
  };

  return (
    <div className="restaurant-page">
      {/* Hero */}
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Dining</span>
          <h1 id="hero-title">Our Restaurant</h1>
          <p>Where Pakistani classics and international favourites meet, cooked fresh and served with care.</p>
          <div className="hero-badges">
            <a href="#reserve" className="rs-hero-btn">Reserve a table</a>
            <a href="#menu" className="rs-hero-btn rs-hero-btn-ghost">View menu</a>
          </div>
        </div>
      </section>

      {/* Opening hours strip */}
      <section className="rs-hours">
        <div className="container rs-hours-grid">
          {hours.map((h, i) => (
            <Reveal key={h.meal} delay={i * 90} className="rs-hour">
              <span className="rs-hour-meal">{h.meal}</span>
              <strong>{h.time}</strong>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Signature dishes */}
      <section className="rs-section">
        <div className="container">
          <Reveal className="rs-heading">
            <h2>Signature dishes</h2>
            <p>Three plates our guests come back for.</p>
          </Reveal>

          <div className="rs-sig-grid">
            {signatures.map((d, i) => (
              <Reveal key={d.name} delay={i * 120} className="rs-sig-card">
                <div className="rs-sig-img">
                  <img src={d.img} alt={d.name} loading="lazy" />
                  <span className="rs-sig-price">{d.price}</span>
                </div>
                <div className="rs-sig-body">
                  <h3>{d.name}</h3>
                  <p>{d.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="rs-section rs-menu-section" id="menu">
        <div className="container">
          <Reveal className="rs-heading">
            <h2>The menu</h2>
            <p>All prices are in PKR and include service charges and taxes.</p>
          </Reveal>

          <div className="rs-tabs" role="tablist" aria-label="Menu categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                className={`rs-tab ${category === c ? 'is-active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* key = category => list dobara animate hoti hai */}
          <ul className="rs-menu-list" key={category}>
            {menu[category].map((item, i) => (
              <li
                key={item.name}
                className="rs-menu-item"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="rs-menu-top">
                  <h3>{item.name}</h3>
                  <span className="rs-leader" aria-hidden="true" />
                  <span className="rs-menu-price">{formatPKR(item.price)}</span>
                </div>
                <p>{item.desc}</p>
                {item.tag && <span className="rs-tag">{item.tag}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dining spaces */}
      <section className="rs-section">
        <div className="container">
          <Reveal className="rs-heading">
            <h2>Where you will sit</h2>
            <p>Pick the setting that suits your evening.</p>
          </Reveal>

          <div className="rs-space-list">
            {spaces.map((s, i) => (
              <Reveal
                key={s.name}
                className={`rs-space ${i % 2 === 1 ? 'rs-space-rev' : ''}`}
              >
                <div className="rs-space-img">
                  <img src={s.img} alt={s.name} loading="lazy" />
                </div>
                <div className="rs-space-text">
                  <h3>{s.name}</h3>
                  <span className="rs-space-seats">{s.seats}</span>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section className="rs-section rs-reserve-section" id="reserve">
        <div className="container rs-reserve">
          <Reveal className="rs-reserve-info">
            <h2>Reserve a table</h2>
            <p>
              Tell us when you are coming and how many of you there will be.
              We will call to confirm your booking.
            </p>
            <ul className="rs-contact">
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" /></svg>
                +92 300 0000000
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" /></svg>
                The Regal Hotel &amp; Residences, Islamabad
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v5.4l4 2.4-.8 1.3L11 13V7z" /></svg>
                Parties of 8 or more: please book 24 hours ahead
              </li>
            </ul>
          </Reveal>

          <Reveal className="rs-form-wrap" delay={120}>
            {sent ? (
              <div className="rs-success" role="status">
                <svg viewBox="0 0 52 52" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27l8 8 14-16" />
                </svg>
                <h3>Request received</h3>
                <p>
                  Thank you, {form.name.split(' ')[0]}. We have noted a table for{' '}
                  {form.guests} on {form.date} at {form.time}. Our team will call{' '}
                  {form.phone} to confirm.
                </p>
                <button type="button" className="rs-submit" onClick={resetForm}>
                  Make another booking
                </button>
              </div>
            ) : (
              <form className="rs-form" onSubmit={onSubmit} noValidate>
                <div className={`rs-field ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="rs-name">Full name</label>
                  <input id="rs-name" name="name" value={form.name} onChange={onChange} placeholder="Your name" />
                  {errors.name && <span className="rs-error">{errors.name}</span>}
                </div>

                <div className={`rs-field ${errors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="rs-phone">Phone number</label>
                  <input id="rs-phone" name="phone" value={form.phone} onChange={onChange} placeholder="03XX XXXXXXX" inputMode="tel" />
                  {errors.phone && <span className="rs-error">{errors.phone}</span>}
                </div>

                <div className="rs-row">
                  <div className={`rs-field ${errors.date ? 'has-error' : ''}`}>
                    <label htmlFor="rs-date">Date</label>
                    <input id="rs-date" type="date" name="date" min={today} value={form.date} onChange={onChange} />
                    {errors.date && <span className="rs-error">{errors.date}</span>}
                  </div>
                  <div className="rs-field">
                    <label htmlFor="rs-time">Time</label>
                    <input id="rs-time" type="time" name="time" value={form.time} onChange={onChange} />
                  </div>
                </div>

                <div className="rs-field">
                  <label htmlFor="rs-guests">Guests</label>
                  <select id="rs-guests" name="guests" value={form.guests} onChange={onChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </div>

                <div className="rs-field">
                  <label htmlFor="rs-notes">Special requests (optional)</label>
                  <textarea id="rs-notes" name="notes" rows="3" value={form.notes} onChange={onChange} placeholder="Birthday, allergies, window seat..." />
                </div>

                <button type="submit" className="rs-submit">Request booking</button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Restaurant;