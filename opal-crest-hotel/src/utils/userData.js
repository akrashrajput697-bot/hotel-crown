import { useState, useEffect, useMemo } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

/* ------------------------------------------------------------------
   Loyalty rules
------------------------------------------------------------------- */
export const POINTS_PER_STAY = 10;
export const STAYS_FOR_REWARD = 10;
export const REWARD_DISCOUNT = 30; // percent

export const CHECK_IN_HOUR = 14; // 2 PM
export const CHECK_OUT_HOUR = 12; // 12 PM

/* ------------------------------------------------------------------
   Storage (localStorage, one set of keys per user).
   Later you can swap read/write with Firestore calls without
   touching any page component.
------------------------------------------------------------------- */
const key = (uid, name) => `regal:${uid}:${name}`;

const read = (uid, name, fallback) => {
  try {
    const raw = localStorage.getItem(key(uid, name));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (uid, name, value) => {
  localStorage.setItem(key(uid, name), JSON.stringify(value));
  window.dispatchEvent(new Event('regal-data'));
};

const uid8 = () => Math.random().toString(36).slice(2, 7).toUpperCase();

/* ------------------------------------------------------------------
   Auth hook
------------------------------------------------------------------- */
export function useAuthUser() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, loading };
}

/* ------------------------------------------------------------------
   Dates / status
------------------------------------------------------------------- */
const atHour = (dateStr, hour) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d, hour, 0, 0);
};

export const getNights = (b) => {
  const ms = atHour(b.checkOut, 12) - atHour(b.checkIn, 12);
  return Math.max(1, Math.round(ms / 86400000));
};

/** 'upcoming' | 'ongoing' | 'completed' */
export const getStatus = (b, now = new Date()) => {
  if (now >= atHour(b.checkOut, CHECK_OUT_HOUR)) return 'completed';
  if (now >= atHour(b.checkIn, CHECK_IN_HOUR)) return 'ongoing';
  return 'upcoming';
};

export const daysUntil = (dateStr, now = new Date()) => {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [y, m, d] = dateStr.split('-').map(Number);
  return Math.round((new Date(y, m - 1, d) - start) / 86400000);
};

export const formatDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatPKR = (n) => `PKR ${Math.round(n).toLocaleString('en-PK')}`;

export const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'Just now';
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day > 1 ? 's' : ''} ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

/* ------------------------------------------------------------------
   Notifications
------------------------------------------------------------------- */
const makeNote = (type, title, message, bookingId) => ({
  id: `N-${Date.now()}-${uid8()}`,
  type, // 'booking' | 'points' | 'reward'
  title,
  message,
  bookingId: bookingId || null,
  read: false,
  createdAt: new Date().toISOString(),
});

export const markNoteRead = (uid, id) => {
  const notes = read(uid, 'notifications', []).map((n) => (n.id === id ? { ...n, read: true } : n));
  write(uid, 'notifications', notes);
};

export const markAllNotesRead = (uid) => {
  write(uid, 'notifications', read(uid, 'notifications', []).map((n) => ({ ...n, read: true })));
};

export const deleteNote = (uid, id) => {
  write(uid, 'notifications', read(uid, 'notifications', []).filter((n) => n.id !== id));
};

export const clearNotes = (uid) => write(uid, 'notifications', []);

/* ------------------------------------------------------------------
   Bookings

   CALL THIS from your Reservation page when a booking is confirmed:

   addBooking(user.uid, {
     roomName: 'Deluxe Double',
     image: room.images[0],
     checkIn: '2026-10-09',   // YYYY-MM-DD
     checkOut: '2026-10-11',  // YYYY-MM-DD
     guests: 2,
     rooms: 1,
     total: 45000,
   });
------------------------------------------------------------------- */
export const addBooking = (uid, data) => {
  const bookings = read(uid, 'bookings', []);
  const booking = {
    id: `RG-${uid8()}`,
    createdAt: new Date().toISOString(),
    pointsAwarded: false,
    guests: 1,
    rooms: 1,
    ...data,
  };
  bookings.unshift(booking);
  write(uid, 'bookings', bookings);

  const notes = read(uid, 'notifications', []);
  notes.unshift(
    makeNote(
      'booking',
      'Booking confirmed',
      `Your stay in ${booking.roomName} is confirmed for ${formatDate(booking.checkIn)} to ${formatDate(
        booking.checkOut
      )}. Booking ID: ${booking.id}.`,
      booking.id
    )
  );
  write(uid, 'notifications', notes);
  return booking;
};

/** Adds sample bookings (past / ongoing / upcoming) so you can test the pages. */
export const addDemoBookings = (uid) => {
  const d = (offset) => {
    const t = new Date();
    t.setDate(t.getDate() + offset);
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
  };
  addBooking(uid, { roomName: 'Deluxe Double', checkIn: d(-9), checkOut: d(-6), guests: 2, total: 54000 });
  addBooking(uid, { roomName: 'Executive King', checkIn: d(-1), checkOut: d(2), guests: 2, total: 78000 });
  addBooking(uid, { roomName: 'Premier Suite', checkIn: d(14), checkOut: d(17), guests: 3, total: 120000 });
};

/* ------------------------------------------------------------------
   Sync: when a stay ends (checkout time passed) award 10 points ONCE,
   send a notification, and unlock the 30% reward on every 10th stay.
------------------------------------------------------------------- */
export const syncUser = (uid) => {
  const bookings = read(uid, 'bookings', []);
  if (!bookings.length) return;

  const notes = read(uid, 'notifications', []);
  let completed = bookings.filter((b) => b.pointsAwarded).length;
  let changed = false;

  // oldest first so reward notifications come in the right order
  [...bookings].reverse().forEach((b) => {
    if (!b.pointsAwarded && getStatus(b) === 'completed') {
      b.pointsAwarded = true;
      completed += 1;
      changed = true;
      notes.unshift(
        makeNote(
          'points',
          `You earned ${POINTS_PER_STAY} loyalty points`,
          `Thank you for staying in ${b.roomName}. Your stay is complete and ${POINTS_PER_STAY} points were added to your balance.`,
          b.id
        )
      );
      if (completed % STAYS_FOR_REWARD === 0) {
        notes.unshift(
          makeNote(
            'reward',
            `${REWARD_DISCOUNT}% discount unlocked`,
            `You have completed ${completed} stays. Your ${REWARD_DISCOUNT}% reward is ready to use on your next booking.`,
            b.id
          )
        );
      }
    }
  });

  if (changed) {
    write(uid, 'bookings', bookings);
    write(uid, 'notifications', notes);
  }
};

/** Call when the user applies the 30% reward on a reservation. */
export const consumeReward = (uid) => {
  write(uid, 'rewardsUsed', read(uid, 'rewardsUsed', 0) + 1);
};

/* ------------------------------------------------------------------
   Profile (account details)
------------------------------------------------------------------- */
export const getProfile = (uid) => read(uid, 'profile', { fullName: '', phone: '', city: '', requests: '' });
export const saveProfile = (uid, profile) => write(uid, 'profile', profile);

/* ------------------------------------------------------------------
   Main hook: one object with everything a page needs
------------------------------------------------------------------- */
export function useUserData(uid) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!uid) return undefined;
    const onChange = () => setTick((t) => t + 1);
    window.addEventListener('regal-data', onChange);
    syncUser(uid);
    const interval = setInterval(() => syncUser(uid), 60000);
    return () => {
      window.removeEventListener('regal-data', onChange);
      clearInterval(interval);
    };
  }, [uid]);

  return useMemo(() => {
    if (!uid) {
      return { bookings: [], ongoing: [], upcoming: [], past: [], notifications: [], loyalty: null };
    }
    const bookings = read(uid, 'bookings', []);
    const withStatus = bookings.map((b) => ({ ...b, status: getStatus(b) }));
    const byDate = (a, b) => (a.checkIn < b.checkIn ? -1 : 1);

    const ongoing = withStatus.filter((b) => b.status === 'ongoing').sort(byDate);
    const upcoming = withStatus.filter((b) => b.status === 'upcoming').sort(byDate);
    const past = withStatus.filter((b) => b.status === 'completed').sort(byDate).reverse();

    const completedStays = bookings.filter((b) => b.pointsAwarded).length;
    const rewardsEarned = Math.floor(completedStays / STAYS_FOR_REWARD);
    const rewardsUsed = read(uid, 'rewardsUsed', 0);

    return {
      bookings: withStatus,
      ongoing,
      upcoming,
      past,
      notifications: read(uid, 'notifications', []),
      loyalty: {
        points: completedStays * POINTS_PER_STAY,
        completedStays,
        progress: completedStays % STAYS_FOR_REWARD,
        staysToReward: STAYS_FOR_REWARD - (completedStays % STAYS_FOR_REWARD),
        rewardsEarned,
        rewardsAvailable: Math.max(0, rewardsEarned - rewardsUsed),
        history: bookings
          .filter((b) => b.pointsAwarded)
          .map((b) => ({ id: b.id, roomName: b.roomName, checkOut: b.checkOut, points: POINTS_PER_STAY }))
          .sort((a, b) => (a.checkOut < b.checkOut ? 1 : -1)),
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, tick]);
}