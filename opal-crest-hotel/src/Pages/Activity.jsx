import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserPageShell from '../component/UserPageShell';
import {
  useUserData,
  addDemoBookings,
  getNights,
  daysUntil,
  formatDate,
  formatPKR,
  POINTS_PER_STAY,
} from '../utils/userData';

// Set to false before you go live. It only exists so you can test the page.
const SHOW_DEMO_BUTTON = true;

const STATUS_LABEL = { ongoing: 'Ongoing', upcoming: 'Upcoming', completed: 'Completed' };

function BookingCard({ b, index }) {
  const nights = getNights(b);
  const startsIn = daysUntil(b.checkIn);
  const endsIn = daysUntil(b.checkOut);
  const dayOfStay = Math.min(nights, Math.max(1, nights - endsIn + 1));

  let hint = '';
  if (b.status === 'upcoming') {
    hint = startsIn <= 0 ? 'Check-in today at 2:00 PM' : `Check-in in ${startsIn} day${startsIn > 1 ? 's' : ''}`;
  }
  if (b.status === 'ongoing') hint = `Day ${dayOfStay} of ${nights}. Check-out at 12:00 PM`;
  if (b.status === 'completed') hint = b.pointsAwarded ? `+${POINTS_PER_STAY} loyalty points earned` : '';

  return (
    <article className={`up-booking ${b.status}`} style={{ animationDelay: `${Math.min(index, 8) * 80}ms` }}>
      <div className="up-booking-media">
        {b.image ? <img src={b.image} alt={b.roomName} loading="lazy" /> : <div className="up-booking-ph">TR</div>}
        <span className={`up-badge ${b.status}`}>{STATUS_LABEL[b.status]}</span>
      </div>

      <div className="up-booking-main">
        <div className="up-booking-head">
          <h3>{b.roomName}</h3>
          <span className="up-booking-id">{b.id}</span>
        </div>

        <div className="up-booking-grid">
          <div>
            <small>Check-in</small>
            <strong>{formatDate(b.checkIn)}</strong>
          </div>
          <div>
            <small>Check-out</small>
            <strong>{formatDate(b.checkOut)}</strong>
          </div>
          <div>
            <small>Stay</small>
            <strong>
              {nights} night{nights > 1 ? 's' : ''}, {b.guests} guest{b.guests > 1 ? 's' : ''}
            </strong>
          </div>
          <div>
            <small>Total</small>
            <strong>{formatPKR(b.total || 0)}</strong>
          </div>
        </div>

        {b.status === 'ongoing' && (
          <div className="up-stay-bar" aria-hidden="true">
            <span style={{ width: `${(dayOfStay / nights) * 100}%` }} />
          </div>
        )}

        {hint && <p className={`up-booking-hint ${b.status}`}>{hint}</p>}
      </div>
    </article>
  );
}

function ActivityContent({ user }) {
  const { ongoing, upcoming, past, bookings } = useUserData(user.uid);
  const [tab, setTab] = useState(null);

  const tabs = [
    { id: 'ongoing', label: 'Ongoing', list: ongoing },
    { id: 'upcoming', label: 'Upcoming', list: upcoming },
    { id: 'completed', label: 'Past', list: past },
  ];

  // default tab: ongoing if any, else upcoming, else past
  const active =
    tab || (ongoing.length ? 'ongoing' : upcoming.length ? 'upcoming' : past.length ? 'completed' : 'ongoing');
  const current = tabs.find((t) => t.id === active);

  const emptyText = {
    ongoing: 'You are not staying with us right now.',
    upcoming: 'You have no upcoming bookings.',
    completed: 'Your completed stays will appear here, and you earn loyalty points for each one.',
  };

  return (
    <div className="up-narrow wide-ish">
      <div className="up-segment up-segment-lg" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={active === t.id ? 'active' : ''}
            onClick={() => setTab(t.id)}
          >
            {t.label} <span>{t.list.length}</span>
          </button>
        ))}
      </div>

      {current.list.length === 0 ? (
        <div className="up-empty">
          <div className="up-empty-icon">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
          </div>
          <h3>Nothing here yet</h3>
          <p>{emptyText[active]}</p>
          <div className="up-empty-actions">
            <Link to="/rooms" className="up-btn up-btn-primary">
              Browse rooms
            </Link>
            {SHOW_DEMO_BUTTON && bookings.length === 0 && (
              <button type="button" className="up-btn up-btn-outline" onClick={() => addDemoBookings(user.uid)}>
                Load sample bookings (testing)
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="up-booking-list" key={active}>
          {current.list.map((b, i) => (
            <BookingCard key={b.id} b={b} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Activity() {
  return (
    <UserPageShell title="Activity" subtitle="Your ongoing, upcoming and past bookings.">
      {(user) => <ActivityContent user={user} />}
    </UserPageShell>
  );
}