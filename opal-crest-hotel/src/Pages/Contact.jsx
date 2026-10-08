import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import '../Style/Contact.css';
import Footer from '../component/Footer';

/* ---------- Data (asal details yahan daal do) ---------- */
const CONTACT = {
  phone: '+92 300 0000000',
  whatsapp: '923000000000', // country code ke saath, bina + ke
  email: 'info@theregal.com',
  address: 'The Regal Hotel & Residences, Islamabad, Pakistan',
  mapQuery: 'Islamabad, Pakistan', // behtar hai hotel ka exact address / naam likho
};

const infoCards = [
  {
    title: 'Call us',
    value: CONTACT.phone,
    note: 'Front desk answers 24 hours',
    href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
    icon: 'M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z',
  },
  {
    title: 'Email us',
    value: CONTACT.email,
    note: 'We reply within one working day',
    href: `mailto:${CONTACT.email}`,
    icon: 'M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7.5L4.5 7v1.3l7.5 5.2 7.5-5.2V7z',
  },
  {
    title: 'Visit us',
    value: 'Islamabad, Pakistan',
    note: 'Valet parking available',
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`,
    icon: 'M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z',
  },
  {
    title: 'WhatsApp',
    value: 'Chat with us',
    note: 'Quick answers, any time',
    href: `https://wa.me/${CONTACT.whatsapp}`,
    icon: 'M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5 13.6c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3a1 1 0 01.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.4-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z',
  },
];

const departments = [
  { name: 'Room reservations', detail: 'Bookings, changes and group stays', contact: 'reservations@theregal.com' },
  { name: 'Restaurant', detail: 'Table bookings and private dining', contact: 'dining@theregal.com' },
  { name: 'Events and weddings', detail: 'Halls, catering and planning', contact: 'events@theregal.com' },
];

const hours = [
  { label: 'Front desk', time: 'Open 24 hours' },
  { label: 'Reservations office', time: '9:00 AM - 9:00 PM' },
  { label: 'Check-in / check-out', time: '2:00 PM / 12:00 PM' },
];

const subjects = ['Room booking', 'Restaurant', 'Events', 'Gym and wellness', 'Feedback', 'Something else'];

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
      className={`ct-reveal ${visible ? 'ct-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Page ---------- */
function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: subjects[0],
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = 'Enter a valid email address.';
    if (form.phone.trim() && !/^[0-9+\-\s]{10,15}$/.test(form.phone.trim()))
      er.phone = 'Enter a valid phone number.';
    if (form.message.trim().length < 10) er.message = 'Please write at least a short sentence.';
    setErrors(er);
    if (Object.keys(er).length === 0) {
      // TODO: yahan apni API / EmailJS / backend integration lagao
      setSent(true);
    }
  };

  const reset = () => {
    setSent(false);
    setForm({ name: '', email: '', phone: '', subject: subjects[0], message: '' });
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us & Reservations | The Regal Hotel & Residences</title>
        <meta name="description" content="Get in touch with The Regal Hotel & Residences in Islamabad. Reach out for room bookings, restaurant reservations, event planning, or general queries." />
        <meta name="keywords" content="contact the regal, hotel reservations islamabad, hotel phone number, email, address, location map" />
        <meta name="author" content="The Regal Hotel & Residences" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/contact" />

        <meta property="og:title" content="Contact Us & Reservations | The Regal Hotel & Residences" />
        <meta property="og:description" content="Connect with our front desk, reservations team, or send us a message for any queries regarding your stay in Islamabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/contact" />
        <meta property="og:image" content="https://images.pexels.com/photos/15473886/pexels-photo-15473886.jpeg?auto=compress&cs=tinysrgb&w=1000" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us & Reservations | The Regal Hotel & Residences" />
        <meta name="twitter:description" content="Reach out to The Regal Hotel & Residences in Islamabad through phone, email, WhatsApp, or our contact form." />
        <meta name="twitter:image" content="https://images.pexels.com/photos/15473886/pexels-photo-15473886.jpeg?auto=compress&cs=tinysrgb&w=1000" />
      </Helmet>

      {/* Hero */}
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Hospitality</span>
          <h1 id="hero-title">Contact Us</h1>
          <p>Questions, bookings or feedback. Write to us and a real person will get back to you.</p>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="ct-cards-section">
        <div className="container ct-cards">
          {infoCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <a
                className="ct-card"
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <span className="ct-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={c.icon} /></svg>
                </span>
                <h3>{c.title}</h3>
                <strong>{c.value}</strong>
                <span className="ct-card-note">{c.note}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + side info */}
      <section className="ct-section">
        <div className="container ct-main">
          <Reveal className="ct-form-wrap">
            {sent ? (
              <div className="ct-success" role="status">
                <svg viewBox="0 0 52 52" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27l8 8 14-16" />
                </svg>
                <h3>Message sent</h3>
                <p>
                  Thank you, {form.name.split(' ')[0]}. We have received your message about
                  &ldquo;{form.subject}&rdquo; and will reply to {form.email} within one working day.
                </p>
                <button type="button" className="ct-submit" onClick={reset}>Send another message</button>
              </div>
            ) : (
              <>
                <h2>Send us a message</h2>
                <p className="ct-form-intro">Fields marked with * are required.</p>

                <form className="ct-form" onSubmit={onSubmit} noValidate>
                  <div className="ct-row">
                    <div className={`ct-field ${errors.name ? 'has-error' : ''}`}>
                      <label htmlFor="ct-name">Full name *</label>
                      <input id="ct-name" name="name" value={form.name} onChange={onChange} placeholder="Your name" />
                      {errors.name && <span className="ct-error">{errors.name}</span>}
                    </div>
                    <div className={`ct-field ${errors.email ? 'has-error' : ''}`}>
                      <label htmlFor="ct-email">Email *</label>
                      <input id="ct-email" type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
                      {errors.email && <span className="ct-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="ct-row">
                    <div className={`ct-field ${errors.phone ? 'has-error' : ''}`}>
                      <label htmlFor="ct-phone">Phone (optional)</label>
                      <input id="ct-phone" name="phone" value={form.phone} onChange={onChange} placeholder="03XX XXXXXXX" inputMode="tel" />
                      {errors.phone && <span className="ct-error">{errors.phone}</span>}
                    </div>
                    <div className="ct-field">
                      <label htmlFor="ct-subject">Topic</label>
                      <select id="ct-subject" name="subject" value={form.subject} onChange={onChange}>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`ct-field ${errors.message ? 'has-error' : ''}`}>
                    <label htmlFor="ct-message">Message *</label>
                    <textarea id="ct-message" name="message" rows="5" value={form.message} onChange={onChange} placeholder="How can we help you?" />
                    {errors.message && <span className="ct-error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="ct-submit">Send message</button>
                </form>
              </>
            )}
          </Reveal>

          <Reveal className="ct-side" delay={120}>
            <div className="ct-panel">
              <h3>Opening hours</h3>
              <ul className="ct-hours">
                {hours.map((h) => (
                  <li key={h.label}>
                    <span>{h.label}</span>
                    <strong>{h.time}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ct-panel">
              <h3>Reach the right team</h3>
              <ul className="ct-depts">
                {departments.map((d) => (
                  <li key={d.name}>
                    <strong>{d.name}</strong>
                    <span>{d.detail}</span>
                    <a href={`mailto:${d.contact}`}>{d.contact}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="ct-map-section">
        <div className="container">
          <Reveal>
            <div className="ct-map">
              <iframe
                title="The Regal Hotel location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="ct-map-btn"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;