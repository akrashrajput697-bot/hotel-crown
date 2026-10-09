import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Style/Availability.css';

const DAY = 86400000;
const img = (id, w = 900) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/* ---------- Rooms data (price, left, images apni marzi se badal len) ---------- */
const ROOMS = [
    { id: 'deluxe-double', name: 'Deluxe Double Room', type: 'Deluxe', price: 45000, left: 4, max: 2, size: '32 m²', bed: '1 double bed',image: 'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp', path: '/deluxe-double', perks: ['Free Wi-Fi', 'Air conditioning', 'City view'] },

    { id: 'deluxe-twin', name: 'Deluxe Twin Room', type: 'Deluxe', price: 55000, left: 3, max: 2, size: '32 m²', bed: '2 single beds',  image: 'https://www.hotelcrowncp.com/assets/images/rooms/deluxe%20twin/1.webp', path: '/deluxe-twin', perks: ['Free Wi-Fi', 'Air conditioning', 'Work desk'] },

    { id: 'deluxe-family', name: 'Deluxe Family Room', type: 'Deluxe', price: 65000, left: 2, max: 4, size: '48 m²', bed: '1 double + 2 single', image: 'https://api.envoyhotel.com/uploads/1779192228389-Deluxe_Family_Room_(5).jpg', path: '/deluxe-family', perks: ['Free Wi-Fi', 'Sitting area', 'Breakfast'] },

    { id: 'executive-king', name: 'Executive King Room', type: 'Executive', price: 75000, left: 2, max: 3, size: '42 m²', bed: '1 king bed',  image: 'https://api.envoyhotel.com/uploads/1779192349166-Executive_King_Room_(3).jpg',  path: '/executive-king', perks: ['Lounge access', 'Marble bath', 'Breakfast'] },

    { id: 'executive-twin', name: 'Executive Twin Room', type: 'Executive', price: 85000, left: 1, max: 2, size: '40 m²', bed: '2 single beds', image: 'https://www.hotelcrowncp.com/assets/images/rooms/Executive%20grace%20twin/1.webp', path: '/executive-twin', perks: ['Lounge access', 'City view', 'Breakfast'] },

    { id: 'premier-suite', name: 'Premier Suite', type: 'Suite', price: 95000, left: 1, max: 4, size: '80 m²', bed: '1 king bed + lounge', image: 'https://api.envoyhotel.com/uploads/1779192683149-Premier_Suite_Room_(2).jpg',  path: '/premier-suite', perks: ['Private lounge', 'Butler service', 'Panoramic view'] },
];

const FILTERS = ['All', 'Deluxe', 'Executive', 'Suite'];
const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const pkr = (n) => `PKR ${n.toLocaleString('en-US')}`;

// Date -> YYYY-MM-DD (local time), the format the Reservation page expects
const iso = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function Reveal({ children, delay = 0 }) {
    const ref = useRef(null);
    const [on, setOn] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setOn(true); io.disconnect(); }
        }, { threshold: 0.1 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return <div ref={ref} className={`av-reveal ${on ? 'av-in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Availability() {
    const { state } = useLocation();
    const start = state?.startDate ? new Date(state.startDate) : new Date();
    const end = state?.endDate ? new Date(state.endDate) : new Date(Date.now() + DAY);
    const nights = Math.max(1, Math.round((end - start) / DAY));
    const rooms = parseInt(state?.rooms, 10) || 1;
    const adults = parseInt(state?.adults, 10) || 1;
    const children = parseInt(state?.children, 10) || 0;
    const guests = adults + children;

    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(state?.rooms === 'Suite' ? 'Suite' : 'All');
    const [sort, setSort] = useState('recommended');

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(t);
    }, []);

    const results = useMemo(() => {
        const list = ROOMS
            .map((r) => ({ ...r, available: r.left >= rooms && r.max * rooms >= guests }))
            .filter((r) => filter === 'All' || r.type === filter);
        if (sort === 'low') list.sort((a, b) => a.price - b.price);
        if (sort === 'high') list.sort((a, b) => b.price - a.price);
        return list.sort((a, b) => Number(b.available) - Number(a.available));
    }, [filter, sort, rooms, guests]);

    const availableCount = results.filter((r) => r.available).length;

    // "Book now" opens the Reservation page with the room and your search already filled in
    const bookUrl = (r) =>
        `/reservation?${new URLSearchParams({
            room: r.id,
            checkin: iso(start),
            checkout: iso(end),
            guests: String(adults),
            children: String(children),
            rooms: String(rooms),
        }).toString()}`;

    return (
        <div className="av-page">
            {/* Hero */}
            <section className="av-hero">
                <div className="av-hero-bg" style={{ backgroundImage: `url(${img(271624, 1600)})` }} />
                <div className="av-hero-overlay" />
                <div className="av-hero-content">
                    <span className="av-kicker">The Regal · Reservations</span>
                    <h1>Available Rooms</h1>
                    <p>Handpicked rooms and suites, ready for your stay.</p>
                </div>
            </section>

            {/* Search summary */}
            <div className="av-summary-wrap">
                <div className="av-summary">
                    <div><span>Check-in</span><strong>{fmt(start)}</strong></div>
                    <div><span>Check-out</span><strong>{fmt(end)}</strong></div>
                    <div><span>Nights</span><strong>{nights}</strong></div>
                    <div><span>Rooms</span><strong>{rooms}</strong></div>
                    <div><span>Guests</span><strong>{guests}</strong></div>
                    <Link to="/" className="av-btn av-btn-primary">Modify search</Link>
                </div>
            </div>

            <div className="av-container">
                {/* Toolbar */}
                <div className="av-toolbar">
                    <p className="av-count">
                        {loading ? 'Checking availability…' : <><strong>{availableCount}</strong> room type{availableCount === 1 ? '' : 's'} available for your dates</>}
                    </p>
                    <div className="av-filters" role="tablist">
                        {FILTERS.map((f) => (
                            <button key={f} type="button" className={`av-chip ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
                        ))}
                    </div>
                    <select className="av-sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort rooms">
                        <option value="recommended">Recommended</option>
                        <option value="low">Price: low to high</option>
                        <option value="high">Price: high to low</option>
                    </select>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="av-list">
                        {[0, 1, 2].map((i) => <div key={i} className="av-skeleton" />)}
                    </div>
                ) : results.length === 0 ? (
                    <div className="av-empty">
                        <h3>No rooms match this filter</h3>
                        <p>Try another room type or change your dates and guests.</p>
                        <Link to="/" className="av-btn av-btn-primary">Modify search</Link>
                    </div>
                ) : (
                    <div className="av-list">
                        {results.map((r, i) => (
                            <Reveal key={r.id} delay={i * 80}>
                                <article className={`av-card ${r.available ? '' : 'is-sold'}`}>
                                    <div className="av-media">
                                        <img src={r.image} alt={r.name} loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
                                        <span className={`av-badge ${r.available ? (r.left <= 2 ? 'warn' : 'ok') : 'out'}`}>
                                            {r.available ? (r.left <= 2 ? `Only ${r.left} left` : 'Available') : 'Not available'}
                                        </span>
                                    </div>
                                    <div className="av-body">
                                        <span className="av-type">{r.type}</span>
                                        <h3>{r.name}</h3>
                                        <ul className="av-meta">
                                            <li>{r.bed}</li><li>Up to {r.max} guests</li><li>{r.size}</li>
                                        </ul>
                                        <ul className="av-perks">
                                            {r.perks.map((p) => <li key={p}>{p}</li>)}
                                        </ul>
                                        <div className="av-foot">
                                            <div className="av-price">
                                                <strong>{pkr(r.price)}</strong><span> / night</span>
                                                <small>{pkr(r.price * nights * rooms)} total · {nights} night{nights > 1 ? 's' : ''}</small>
                                            </div>
                                            <div className="av-actions">
                                                <Link className="av-btn av-btn-ghost" to={r.path}>Details</Link>
                                                {r.available ? (
                                                    <Link className="av-btn av-btn-primary" to={bookUrl(r)}>Book now</Link>
                                                ) : (
                                                    <span className="av-btn av-btn-disabled">Sold out</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default Availability;