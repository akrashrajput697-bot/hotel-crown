import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import '../Style/Reservation.css';
import {
  CalendarDays,
  BedDouble,
  Users,
  User,
  Mail,
  Phone,
  Check,
  Minus,
  Plus,
  Coffee,
  Car,
  Clock,
  Bed,
  Printer,
  ArrowRight,
  ShieldCheck,
  Crown,
  Star,
  Info,
  Loader2,
  Wallet,
  Building2,
  Moon,
  Sparkles,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  DATA (prices in PKR - same as the Rooms page)                      */
/* ------------------------------------------------------------------ */
const ROOMS = [
  {
    id: 'deluxe-double',
    name: 'Deluxe Double Room',
    price: 45000,
    maxGuests: 2,
    beds: 'One king bed',
    image: 'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp',
    path: '/deluxe-double',
  },
  {
    id: 'deluxe-twin',
    name: 'Deluxe Twin Room',
    price: 55000,
    maxGuests: 2,
    beds: 'One king bed',
    image: 'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp',
    path: '/deluxe-twin',
  },
  {
    id: 'executive-twin',
    name: 'Executive Twin Room',
    price: 85000,
    maxGuests: 4,
    beds: 'Two king beds',
    image: 'https://www.hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp',
    path: '/executive-twin',
  },
  {
    id: 'premier-suite',
    name: 'Premier Suite Room',
    price: 95000,
    maxGuests: 5,
    beds: 'Multi-room suite',
    image: 'https://api.envoyhotel.com/uploads/1779192683149-Premier_Suite_Room_(2).jpg',
    path: '/premier-suite',
  },
  {
    id: 'executive-king',
    name: 'Executive King Room',
    price: 75000,
    maxGuests: 2,
    beds: 'One king bed',
    image: 'https://api.envoyhotel.com/uploads/1779192349166-Executive_King_Room_(3).jpg',
    path: '/executive-king',
  },
  {
    id: 'deluxe-family',
    name: 'Deluxe Family Room',
    price: 65000,
    maxGuests: 3,
    beds: 'One king bed',
    image: 'https://api.envoyhotel.com/uploads/1779192228389-Deluxe_Family_Room_(5).jpg',
    path: '/deluxe-family',
  },
];

// Sample add-on prices - change them to your real rates
const ADDONS = [
  { id: 'breakfast', label: 'Daily breakfast', desc: 'Buffet breakfast, every morning', price: 3000, type: 'perNight', icon: Coffee },
  { id: 'pickup', label: 'Airport pickup', desc: 'Private chauffeured transfer', price: 5000, type: 'flat', icon: Car },
  { id: 'latecheckout', label: 'Late check-out', desc: 'Stay a little longer on the last day', price: 6000, type: 'flat', icon: Clock },
  { id: 'extrabed', label: 'Extra bed', desc: 'Added to your room', price: 4000, type: 'perNight', icon: Bed },
];

const ARRIVAL_TIMES = [
  'Before 12:00 PM',
  '12:00 PM - 3:00 PM',
  '3:00 PM - 6:00 PM',
  '6:00 PM - 9:00 PM',
  'After 9:00 PM',
];

const SITE_URL = 'https://yourdomain.com';
const FIELD_ORDER = ['checkIn', 'checkOut', 'guests', 'room', 'firstName', 'lastName', 'email', 'phone', 'agree'];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
const pad = (n) => String(n).padStart(2, '0');
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayISO = () => toISO(new Date());

const addDays = (iso, n) => {
  const [y, m, d] = iso.split('-').map(Number);
  return toISO(new Date(y, m - 1, d + n));
};

const nightsBetween = (a, b) => {
  if (!a || !b) return 0;
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
};

const fmtDate = (iso) => {
  if (!iso) return '-';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const money = (n) => `PKR ${n.toLocaleString('en-US')}`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------------ */
/*  SMALL COMPONENTS                                                   */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rsv-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="rsv-error" role="alert">
      <Info size={14} /> {msg}
    </p>
  );
}

function Stepper({ id, label, hint, value, min, max, onChange }) {
  return (
    <div className="rsv-stepper">
      <div className="rsv-stepper-text">
        <span className="rsv-stepper-label" id={`${id}-label`}>{label}</span>
        {hint && <small>{hint}</small>}
      </div>
      <div className="rsv-stepper-ctrl" role="group" aria-labelledby={`${id}-label`}>
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          <Minus size={16} />
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function SectionHead({ number, icon: Icon, title, subtitle, done }) {
  return (
    <div className="rsv-card-head">
      <span className={`rsv-step-badge ${done ? 'done' : ''}`}>
        {done ? <Check size={16} /> : number}
      </span>
      <div>
        <h2>
          <Icon size={18} aria-hidden="true" /> {title}
        </h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Confirmation({ data, onReset }) {
  return (
    <div className="rsv-confirm rsv-pop">
      <div className="rsv-check-wrap" aria-hidden="true">
        <svg viewBox="0 0 52 52" className="rsv-check-svg">
          <circle className="rsv-check-circle" cx="26" cy="26" r="24" fill="none" />
          <path className="rsv-check-tick" fill="none" d="M14 27l8 8 16-17" />
        </svg>
      </div>

      <span className="rsv-kicker">Reservation request received</span>
      <h2>Thank you, {data.firstName}!</h2>
      <p className="rsv-confirm-lead">
        Our reservations team will contact you on <strong>{data.phone}</strong> or{' '}
        <strong>{data.email}</strong> to confirm your stay.
      </p>

      <div className="rsv-ref">
        <span>Reference number</span>
        <strong>{data.ref}</strong>
      </div>

      <dl className="rsv-confirm-grid">
        <div><dt>Room</dt><dd>{data.roomName}</dd></div>
        <div><dt>Check-in</dt><dd>{fmtDate(data.checkIn)}</dd></div>
        <div><dt>Check-out</dt><dd>{fmtDate(data.checkOut)}</dd></div>
        <div><dt>Nights</dt><dd>{data.nights}</dd></div>
        <div><dt>Guests</dt><dd>{data.guestsText}</dd></div>
        <div><dt>Rooms</dt><dd>{data.rooms}</dd></div>
        <div><dt>Payment</dt><dd>{data.paymentText}</dd></div>
        <div><dt>Extras</dt><dd>{data.addons.length ? data.addons.join(', ') : 'None'}</dd></div>
      </dl>

      <div className="rsv-confirm-total">
        <span>Estimated total</span>
        <strong>{money(data.total)}</strong>
      </div>

      <div className="rsv-confirm-actions">
        <button type="button" className="rsv-btn rsv-btn-outline" onClick={() => window.print()}>
          <Printer size={16} /> Print
        </button>
        <button type="button" className="rsv-btn rsv-btn-outline" onClick={onReset}>
          Make another reservation
        </button>
        <Link to="/" className="rsv-btn rsv-btn-primary">
          Back to home <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */
function Reservation() {
  const [params] = useSearchParams();
  const today = todayISO();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Pre-fill from links like /reservation?room=executive-king&checkin=2026-11-01&checkout=2026-11-03&guests=2
  const [stay, setStay] = useState(() => {
    const roomParam = params.get('room');
    const room = ROOMS.some((r) => r.id === roomParam) ? roomParam : '';
    let checkIn = params.get('checkin') || '';
    let checkOut = params.get('checkout') || '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || checkIn < today) checkIn = addDays(today, 1);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkOut) || nightsBetween(checkIn, checkOut) <= 0) {
      checkOut = addDays(checkIn, 1);
    }
    const guestsParam = parseInt(params.get('guests'), 10);
    return {
      room,
      checkIn,
      checkOut,
      adults: guestsParam > 0 && guestsParam <= 10 ? guestsParam : 2,
      children: 0,
      rooms: 1,
    };
  });

  const [guest, setGuest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    arrival: '',
    requests: '',
  });
  const [addons, setAddons] = useState([]);
  const [payment, setPayment] = useState('hotel');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  /* ---------- derived values ---------- */
  const selectedRoom = ROOMS.find((r) => r.id === stay.room) || null;
  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  const totalGuests = stay.adults + stay.children;
  const capacity = selectedRoom ? selectedRoom.maxGuests * stay.rooms : 0;

  const roomTotal = selectedRoom && nights > 0 ? selectedRoom.price * nights * stay.rooms : 0;
  const addonLines = ADDONS.filter((a) => addons.includes(a.id)).map((a) => ({
    ...a,
    amount: a.type === 'perNight' ? a.price * Math.max(nights, 0) : a.price,
  }));
  const addonsTotal = addonLines.reduce((sum, a) => sum + a.amount, 0);
  const total = roomTotal + addonsTotal;

  const prices = ROOMS.map((r) => r.price);
  const priceRange = `${money(Math.min(...prices))} - ${money(Math.max(...prices))}`;

  /* ---------- validation ---------- */
  const validate = () => {
    const e = {};
    if (!selectedRoom) e.room = 'Please choose a room for your stay.';
    if (!stay.checkIn) e.checkIn = 'Select your check-in date.';
    else if (stay.checkIn < today) e.checkIn = 'Check-in cannot be in the past.';
    if (!stay.checkOut) e.checkOut = 'Select your check-out date.';
    else if (nights <= 0) e.checkOut = 'Check-out must be after check-in.';
    if (selectedRoom && totalGuests > capacity) {
      e.guests = `This selection fits up to ${capacity} guest${capacity > 1 ? 's' : ''}. Add another room or choose a larger one.`;
    }
    if (guest.firstName.trim().length < 2) e.firstName = 'Please enter your first name.';
    if (guest.lastName.trim().length < 2) e.lastName = 'Please enter your last name.';
    if (!EMAIL_RE.test(guest.email.trim())) e.email = 'Enter a valid email address.';
    const digits = guest.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) e.phone = 'Enter a valid phone number (10-15 digits).';
    if (!agree) e.agree = 'Please accept the reservation terms to continue.';
    return e;
  };

  const live = validate();
  const stepDone = [
    !live.checkIn && !live.checkOut && !live.guests,
    !live.room,
    !live.firstName && !live.lastName && !live.email && !live.phone,
    !live.agree,
  ];
  const progress = (stepDone.filter(Boolean).length / 4) * 100;

  const clearErr = (...keys) =>
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });

  const blurValidate = (key) => setErrors((prev) => ({ ...prev, [key]: validate()[key] }));

  /* ---------- handlers ---------- */
  const onCheckIn = (v) => {
    setStay((s) => ({
      ...s,
      checkIn: v,
      checkOut: v && (!s.checkOut || nightsBetween(v, s.checkOut) <= 0) ? addDays(v, 1) : s.checkOut,
    }));
    clearErr('checkIn', 'checkOut');
  };

  const onCheckOut = (v) => {
    setStay((s) => ({ ...s, checkOut: v }));
    clearErr('checkOut');
  };

  const setCount = (key) => (value) => {
    setStay((s) => ({ ...s, [key]: value }));
    clearErr('guests');
  };

  const pickRoom = (id) => {
    setStay((s) => ({ ...s, room: id }));
    clearErr('room', 'guests');
  };

  const setG = (key) => (e) => {
    setGuest((g) => ({ ...g, [key]: e.target.value }));
    clearErr(key);
  };

  const toggleAddon = (id) =>
    setAddons((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const errs = validate();
    setErrors(errs);
    const firstKey = FIELD_ORDER.find((k) => errs[k]);
    if (firstKey) {
      const el = document.getElementById(`rsv-field-${firstKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof el.focus === 'function') el.focus({ preventScroll: true });
      }
      return;
    }

    setSubmitting(true);

    // TODO: connect your backend / email service here (fetch POST with the data below).
    await new Promise((resolve) => setTimeout(resolve, 1400));
    if (!mounted.current) return;

    const ref = `RGL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const guestsText = `${stay.adults} adult${stay.adults > 1 ? 's' : ''}${
      stay.children ? `, ${stay.children} child${stay.children > 1 ? 'ren' : ''}` : ''
    }`;

    setConfirmation({
      ref,
      firstName: guest.firstName.trim(),
      email: guest.email.trim(),
      phone: guest.phone.trim(),
      roomName: selectedRoom.name,
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      nights,
      rooms: stay.rooms,
      guestsText,
      paymentText: payment === 'hotel' ? 'Pay at the hotel' : 'Bank transfer',
      addons: addonLines.map((a) => a.label),
      total,
    });
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAll = () => {
    setConfirmation(null);
    setGuest({ firstName: '', lastName: '', email: '', phone: '', arrival: '', requests: '' });
    setAddons([]);
    setPayment('hotel');
    setAgree(false);
    setErrors({});
    setStay({ room: '', checkIn: addDays(today, 1), checkOut: addDays(today, 2), adults: 2, children: 0, rooms: 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ---------- SEO ---------- */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Hotel',
        name: 'The Regal Hotel & Residences',
        url: `${SITE_URL}/`,
        priceRange,
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Reserve a room',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/reservation`,
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          result: { '@type': 'LodgingReservation', name: 'Room reservation' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Reservation', item: `${SITE_URL}/reservation` },
        ],
      },
    ],
  };

  /* ---------- render ---------- */
  return (
    <main className="rsv-page">
      <Helmet>
        <title>Reserve Your Stay | The Regal Hotel & Residences</title>
        <meta
          name="description"
          content="Reserve your luxury room or suite at The Regal Hotel & Residences. Choose your dates, room and extras, with best price guarantee and no online payment required."
        />
        <meta
          name="keywords"
          content="hotel reservation, book hotel room, luxury hotel booking, deluxe double, executive king, premier suite, The Regal, room booking Pakistan"
        />
        <meta name="author" content="The Regal Hotel & Residences" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/reservation`} />

        <meta property="og:title" content="Reserve Your Stay | The Regal Hotel & Residences" />
        <meta
          property="og:description"
          content="Choose your dates, pick a luxury room or suite and reserve your stay at The Regal in a few easy steps."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/reservation`} />
        <meta property="og:image" content={ROOMS[0].image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reserve Your Stay | The Regal Hotel & Residences" />
        <meta name="twitter:description" content="Reserve your luxury room or suite at The Regal in a few easy steps." />
        <meta name="twitter:image" content={ROOMS[0].image} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ---------------- HERO ---------------- */}
      <section className="rsv-hero" aria-labelledby="rsv-hero-title">
        <div className="rsv-hero-inner">
          <nav className="rsv-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Reservation</span>
          </nav>
          <span className="rsv-kicker rsv-hero-anim" style={{ animationDelay: '0.05s' }}>
            Reservation
          </span>
          <h1 id="rsv-hero-title" className="rsv-hero-anim" style={{ animationDelay: '0.15s' }}>
            Reserve your stay
          </h1>
          <p className="rsv-hero-anim" style={{ animationDelay: '0.25s' }}>
            A few simple steps to a restful stay at The Regal. No online payment is needed to send your request.
          </p>
          <ul className="rsv-trust rsv-hero-anim" style={{ animationDelay: '0.35s' }}>
            <li><Crown size={16} /> Best Price Guarantee</li>
            <li><ShieldCheck size={16} /> Secure Booking</li>
            <li><Star size={16} /> 24/7 Room Service</li>
          </ul>
        </div>
      </section>

      {/* ---------------- BODY ---------------- */}
      <section className="rsv-section">
        <div className="rsv-container">
          {confirmation ? (
            <Confirmation data={confirmation} onReset={resetAll} />
          ) : (
            <>
              <Reveal>
                <div className="rsv-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Reservation progress">
                  <div className="rsv-progress-labels">
                    <span className={stepDone[0] ? 'on' : ''}>Dates</span>
                    <span className={stepDone[1] ? 'on' : ''}>Room</span>
                    <span className={stepDone[2] ? 'on' : ''}>Details</span>
                    <span className={stepDone[3] ? 'on' : ''}>Confirm</span>
                  </div>
                  <div className="rsv-progress-track">
                    <div className="rsv-progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </Reveal>

              <div className="rsv-layout">
                {/* ---------- FORM ---------- */}
                <form id="rsv-form" className="rsv-form" onSubmit={handleSubmit} noValidate>
                  {/* 1. Dates & guests */}
                  <Reveal>
                    <div className="rsv-card">
                      <SectionHead
                        number={1}
                        icon={CalendarDays}
                        title="Dates & guests"
                        subtitle="When are you arriving and who is coming?"
                        done={stepDone[0]}
                      />

                      <div className="rsv-grid-2">
                        <div className={`rsv-field ${errors.checkIn ? 'has-error' : ''}`}>
                          <label htmlFor="rsv-field-checkIn">Check-in</label>
                          <input
                            id="rsv-field-checkIn"
                            type="date"
                            min={today}
                            value={stay.checkIn}
                            onChange={(e) => onCheckIn(e.target.value)}
                            onBlur={() => blurValidate('checkIn')}
                            aria-invalid={!!errors.checkIn}
                          />
                          <FieldError msg={errors.checkIn} />
                        </div>

                        <div className={`rsv-field ${errors.checkOut ? 'has-error' : ''}`}>
                          <label htmlFor="rsv-field-checkOut">Check-out</label>
                          <input
                            id="rsv-field-checkOut"
                            type="date"
                            min={addDays(stay.checkIn || today, 1)}
                            value={stay.checkOut}
                            onChange={(e) => onCheckOut(e.target.value)}
                            onBlur={() => blurValidate('checkOut')}
                            aria-invalid={!!errors.checkOut}
                          />
                          <FieldError msg={errors.checkOut} />
                        </div>
                      </div>

                      {nights > 0 && (
                        <p className="rsv-nights-pill">
                          <Moon size={14} /> {nights} night{nights > 1 ? 's' : ''}
                        </p>
                      )}

                      <div
                        id="rsv-field-guests"
                        tabIndex={-1}
                        className={`rsv-steppers ${errors.guests ? 'has-error' : ''}`}
                      >
                        <Stepper id="rsv-adults" label="Adults" hint="Age 13+" value={stay.adults} min={1} max={10} onChange={setCount('adults')} />
                        <Stepper id="rsv-children" label="Children" hint="Age 0-12" value={stay.children} min={0} max={8} onChange={setCount('children')} />
                        <Stepper id="rsv-rooms" label="Rooms" hint="Rooms needed" value={stay.rooms} min={1} max={5} onChange={setCount('rooms')} />
                      </div>
                      <FieldError msg={errors.guests} />
                    </div>
                  </Reveal>

                  {/* 2. Room */}
                  <Reveal delay={60}>
                    <div className="rsv-card">
                      <SectionHead
                        number={2}
                        icon={BedDouble}
                        title="Choose your room"
                        subtitle="Prices are per room, per night."
                        done={stepDone[1]}
                      />

                      <div
                        id="rsv-field-room"
                        tabIndex={-1}
                        className={`rsv-rooms ${errors.room ? 'has-error' : ''}`}
                        role="radiogroup"
                        aria-label="Room type"
                      >
                        {ROOMS.map((room) => {
                          const checked = stay.room === room.id;
                          return (
                            <label key={room.id} className={`rsv-room ${checked ? 'selected' : ''}`}>
                              <input
                                type="radio"
                                name="room"
                                value={room.id}
                                checked={checked}
                                onChange={() => pickRoom(room.id)}
                              />
                              <span className="rsv-room-img">
                                <img src={room.image} alt={room.name} loading="lazy" />
                                <span className="rsv-room-tick"><Check size={14} /></span>
                              </span>
                              <span className="rsv-room-body">
                                <strong>{room.name}</strong>
                                <small>
                                  {room.beds} &bull; Up to {room.maxGuests} guests
                                </small>
                                <span className="rsv-room-price">
                                  {money(room.price)} <em>/ night</em>
                                </span>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      <FieldError msg={errors.room} />
                      {selectedRoom && (
                        <Link to={selectedRoom.path} className="rsv-link">
                          View {selectedRoom.name} details <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </Reveal>

                  {/* 3. Guest details */}
                  <Reveal delay={60}>
                    <div className="rsv-card">
                      <SectionHead
                        number={3}
                        icon={User}
                        title="Your details"
                        subtitle="We will use these to confirm your reservation."
                        done={stepDone[2]}
                      />

                      <div className="rsv-grid-2">
                        <div className={`rsv-field ${errors.firstName ? 'has-error' : ''}`}>
                          <label htmlFor="rsv-field-firstName">First name</label>
                          <input
                            id="rsv-field-firstName"
                            type="text"
                            autoComplete="given-name"
                            placeholder="Ahmed"
                            value={guest.firstName}
                            onChange={setG('firstName')}
                            onBlur={() => blurValidate('firstName')}
                            aria-invalid={!!errors.firstName}
                          />
                          <FieldError msg={errors.firstName} />
                        </div>

                        <div className={`rsv-field ${errors.lastName ? 'has-error' : ''}`}>
                          <label htmlFor="rsv-field-lastName">Last name</label>
                          <input
                            id="rsv-field-lastName"
                            type="text"
                            autoComplete="family-name"
                            placeholder="Khan"
                            value={guest.lastName}
                            onChange={setG('lastName')}
                            onBlur={() => blurValidate('lastName')}
                            aria-invalid={!!errors.lastName}
                          />
                          <FieldError msg={errors.lastName} />
                        </div>

                        <div className={`rsv-field ${errors.email ? 'has-error' : ''}`}>
                          <label htmlFor="rsv-field-email"><Mail size={14} /> Email</label>
                          <input
                            id="rsv-field-email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={guest.email}
                            onChange={setG('email')}
                            onBlur={() => blurValidate('email')}
                            aria-invalid={!!errors.email}
                          />
                          <FieldError msg={errors.email} />
                        </div>

                        <div className={`rsv-field ${errors.phone ? 'has-error' : ''}`}>
                          <label htmlFor="rsv-field-phone"><Phone size={14} /> Phone / WhatsApp</label>
                          <input
                            id="rsv-field-phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+92 300 1234567"
                            value={guest.phone}
                            onChange={setG('phone')}
                            onBlur={() => blurValidate('phone')}
                            aria-invalid={!!errors.phone}
                          />
                          <FieldError msg={errors.phone} />
                        </div>

                        <div className="rsv-field rsv-span-2">
                          <label htmlFor="rsv-arrival">Estimated arrival time <span className="rsv-optional">(optional)</span></label>
                          <select id="rsv-arrival" value={guest.arrival} onChange={setG('arrival')}>
                            <option value="">I am not sure yet</option>
                            {ARRIVAL_TIMES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>

                        <div className="rsv-field rsv-span-2">
                          <label htmlFor="rsv-requests">Special requests <span className="rsv-optional">(optional)</span></label>
                          <textarea
                            id="rsv-requests"
                            rows={4}
                            maxLength={500}
                            placeholder="High floor, quiet room, celebration, dietary needs..."
                            value={guest.requests}
                            onChange={setG('requests')}
                          />
                          <small className="rsv-counter">{guest.requests.length}/500</small>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* 4. Extras, payment, confirm */}
                  <Reveal delay={60}>
                    <div className="rsv-card">
                      <SectionHead
                        number={4}
                        icon={Sparkles}
                        title="Extras & confirmation"
                        subtitle="Make your stay a little more special."
                        done={stepDone[3]}
                      />

                      <div className="rsv-addons">
                        {ADDONS.map((a) => {
                          const on = addons.includes(a.id);
                          const Icon = a.icon;
                          return (
                            <label key={a.id} className={`rsv-addon ${on ? 'selected' : ''}`}>
                              <input type="checkbox" checked={on} onChange={() => toggleAddon(a.id)} />
                              <span className="rsv-addon-icon"><Icon size={18} /></span>
                              <span className="rsv-addon-body">
                                <strong>{a.label}</strong>
                                <small>{a.desc}</small>
                              </span>
                              <span className="rsv-addon-price">
                                {money(a.price)}
                                <em>{a.type === 'perNight' ? ' / night' : ' once'}</em>
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      <h3 className="rsv-subhead">Payment preference</h3>
                      <div className="rsv-pay" role="radiogroup" aria-label="Payment preference">
                        <label className={`rsv-pay-opt ${payment === 'hotel' ? 'selected' : ''}`}>
                          <input type="radio" name="payment" checked={payment === 'hotel'} onChange={() => setPayment('hotel')} />
                          <Building2 size={20} />
                          <span>
                            <strong>Pay at the hotel</strong>
                            <small>Settle your bill at check-in</small>
                          </span>
                        </label>
                        <label className={`rsv-pay-opt ${payment === 'transfer' ? 'selected' : ''}`}>
                          <input type="radio" name="payment" checked={payment === 'transfer'} onChange={() => setPayment('transfer')} />
                          <Wallet size={20} />
                          <span>
                            <strong>Bank transfer</strong>
                            <small>Our team will share the details</small>
                          </span>
                        </label>
                      </div>

                      <div className={`rsv-agree ${errors.agree ? 'has-error' : ''}`}>
                        <label>
                          <input
                            id="rsv-field-agree"
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => {
                              setAgree(e.target.checked);
                              clearErr('agree');
                            }}
                          />
                          <span className="rsv-box"><Check size={14} /></span>
                          <span>
                            I confirm the details above are correct and agree to the hotel reservation terms. Final rates and availability
                            are confirmed by the hotel.
                          </span>
                        </label>
                        <FieldError msg={errors.agree} />
                      </div>
                    </div>
                  </Reveal>
                </form>

                {/* ---------- SUMMARY ---------- */}
                <aside className="rsv-summary" aria-label="Booking summary">
                  <Reveal delay={120}>
                    <div className="rsv-summary-card">
                      <h2>Your stay</h2>

                      <div className="rsv-summary-room">
                        {selectedRoom ? (
                          <>
                            <img src={selectedRoom.image} alt={selectedRoom.name} />
                            <div>
                              <strong>{selectedRoom.name}</strong>
                              <small>{selectedRoom.beds}</small>
                            </div>
                          </>
                        ) : (
                          <div className="rsv-summary-empty">
                            <BedDouble size={22} />
                            <span>Select a room to see your price</span>
                          </div>
                        )}
                      </div>

                      <dl className="rsv-summary-list">
                        <div><dt>Check-in</dt><dd>{fmtDate(stay.checkIn)}</dd></div>
                        <div><dt>Check-out</dt><dd>{fmtDate(stay.checkOut)}</dd></div>
                        <div><dt>Nights</dt><dd>{nights > 0 ? nights : '-'}</dd></div>
                        <div>
                          <dt><Users size={13} /> Guests</dt>
                          <dd>
                            {stay.adults} adult{stay.adults > 1 ? 's' : ''}
                            {stay.children ? `, ${stay.children} child${stay.children > 1 ? 'ren' : ''}` : ''}
                          </dd>
                        </div>
                        <div><dt>Rooms</dt><dd>{stay.rooms}</dd></div>
                      </dl>

                      <div className="rsv-lines">
                        {selectedRoom && nights > 0 && (
                          <div className="rsv-line">
                            <span>
                              {money(selectedRoom.price)} x {nights} night{nights > 1 ? 's' : ''}
                              {stay.rooms > 1 ? ` x ${stay.rooms} rooms` : ''}
                            </span>
                            <span>{money(roomTotal)}</span>
                          </div>
                        )}
                        {addonLines.map((a) => (
                          <div className="rsv-line" key={a.id}>
                            <span>{a.label}</span>
                            <span>{money(a.amount)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="rsv-total">
                        <span>Estimated total</span>
                        <strong key={total} className="rsv-total-num">{money(total)}</strong>
                      </div>

                      <button
                        type="submit"
                        form="rsv-form"
                        className="rsv-btn rsv-btn-primary rsv-submit rsv-desktop-only"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <><Loader2 size={18} className="rsv-spin" /> Sending request...</>
                        ) : (
                          <>Confirm reservation <ArrowRight size={16} /></>
                        )}
                      </button>

                      <ul className="rsv-assure">
                        <li><ShieldCheck size={15} /> No online payment required</li>
                        <li><Crown size={15} /> Best price guarantee</li>
                        <li><Clock size={15} /> We reply as soon as possible</li>
                      </ul>
                    </div>
                  </Reveal>
                </aside>
              </div>
            </>
          )}
        </div>

        {/* Sticky total bar for phones */}
        {!confirmation && (
          <div className="rsv-mobilebar">
            <div>
              <small>Estimated total</small>
              <strong>{money(total)}</strong>
            </div>
            <button type="submit" form="rsv-form" className="rsv-btn rsv-btn-primary" disabled={submitting}>
              {submitting ? <Loader2 size={18} className="rsv-spin" /> : 'Reserve'}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Reservation;