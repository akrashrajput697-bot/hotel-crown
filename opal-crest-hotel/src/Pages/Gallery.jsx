import React, { useState, useEffect, useCallback } from 'react';
import '../Style/Gallery.css';
import Footer from '../component/Footer';

const px = (id, w = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/* Yahan apni asal photos / captions daal do */
const photos = [
  { id: 1, cat: 'Rooms', title: 'Deluxe King Room', src: px(271618), tall: true },
  { id: 2, cat: 'Dining', title: 'Main Dining Hall', src: px(262978) },
  { id: 3, cat: 'Rooms', title: 'Garden Courtyard Double', src: px(164595) },
  { id: 4, cat: 'Facilities', title: 'Swimming Pool', src: px(261102), tall: true },
  { id: 5, cat: 'Dining', title: 'Grilled Ribeye Steak', src: px(65175) },
  { id: 6, cat: 'Rooms', title: 'Executive Twin Room', src: px(271624) },
  { id: 7, cat: 'Facilities', title: 'Resort Lounge Area', src: px(338504) },
  { id: 8, cat: 'Dining', title: 'Garden Terrace', src: px(941861), tall: true },
  { id: 9, cat: 'Rooms', title: 'Premier Suite Bedroom', src: px(1743229) },
  { id: 10, cat: 'Dining', title: 'Private Dining Room', src: px(67468) },
  { id: 11, cat: 'Dining', title: 'Gulab Jamun Cheesecake', src: px(291528) },
  { id: 12, cat: 'Dining', title: 'Regal Mutton Karahi', src: px(1640777), tall: true },
];

const categories = ['All', 'Rooms', 'Dining', 'Facilities'];

function Gallery() {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null); // index in `visible`

  const visible = cat === 'All' ? photos : photos.filter((p) => p.cat === cat);
  const count = (c) => (c === 'All' ? photos.length : photos.filter((p) => p.cat === c).length);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length]
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + visible.length) % visible.length)),
    [visible.length]
  );

  // Keyboard + page scroll lock jab lightbox khula ho
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  const current = open !== null ? visible[open] : null;

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="room-inner-hero" aria-labelledby="hero-title">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-kicker">The Regal Moments</span>
          <h1 id="hero-title">Our Gallery</h1>
          <p>A look at the rooms, the food and the spaces that make a stay at The Regal.</p>
        </div>
      </section>

      <section className="gl-section">
        <div className="container">
          {/* Filters */}
          <div className="gl-tabs" role="tablist" aria-label="Gallery categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                className={`gl-tab ${cat === c ? 'is-active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
                <span className="gl-count">{count(c)}</span>
              </button>
            ))}
          </div>

          {/* Grid: key = cat => filter badalne par dobara animate */}
          <div className="gl-grid" key={cat}>
            {visible.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`gl-item ${p.tall ? 'is-tall' : ''}`}
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => setOpen(i)}
                aria-label={`Open ${p.title}`}
              >
                <img src={p.src} alt={p.title} loading="lazy" />
                <span className="gl-overlay">
                  <span className="gl-cat">{p.cat}</span>
                  <span className="gl-title">{p.title}</span>
                  <svg className="gl-zoom" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="M16 16l5 5M11 8.5v5M8.5 11h5" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {current && (
        <div className="gl-lightbox" role="dialog" aria-modal="true" aria-label={current.title} onClick={close}>
          <button type="button" className="gl-lb-btn gl-lb-close" onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>

          {visible.length > 1 && (
            <>
              <button
                type="button"
                className="gl-lb-btn gl-lb-prev"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
              >
                <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <button
                type="button"
                className="gl-lb-btn gl-lb-next"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
              >
                <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          <figure className="gl-lb-figure" onClick={(e) => e.stopPropagation()}>
            <img key={current.id} src={px(current.src.match(/photos\/(\d+)/)[1], 1600)} alt={current.title} />
            <figcaption>
              <strong>{current.title}</strong>
              <span>
                {current.cat} &nbsp;|&nbsp; {open + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Gallery;