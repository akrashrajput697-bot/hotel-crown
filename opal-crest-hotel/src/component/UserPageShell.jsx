import React from 'react';
import { NavLink } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useAuthUser } from '../utils/userData';
import '../Style/UserPages.css';

const TABS = [
  { to: '/notifications', label: 'Notifications' },
  { to: '/loyalty-points', label: 'Loyalty Points' },
  { to: '/account', label: 'Manage Your Account' },
  { to: '/activity', label: 'Activity' },
];

/**
 * Wraps every logged-in page. Usage:
 * <UserPageShell title="Activity" subtitle="..."> {(user) => <YourContent />} </UserPageShell>
 */
function UserPageShell({ title, subtitle, children }) {
  const { user, loading } = useAuthUser();

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error('Login Error:', e.message);
    }
  };

  return (
    <main className="up-page">
      <header className="up-hero">
        <div className="up-hero-inner">
          <h1 className="up-title">{title}</h1>
          <p className="up-subtitle">{subtitle}</p>
          <nav className="up-tabs" aria-label="Your account sections">
            {TABS.map((t) => (
              <NavLink key={t.to} to={t.to} className={({ isActive }) => `up-tab ${isActive ? 'active' : ''}`}>
                {t.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <section className="up-content">
        {loading ? (
          <div className="up-skeleton-wrap">
            <div className="up-skeleton" />
            <div className="up-skeleton" />
            <div className="up-skeleton" />
          </div>
        ) : !user ? (
          <div className="up-gate">
            <div className="up-gate-mark">TR</div>
            <h2>Please log in to continue</h2>
            <p>Log in to see your bookings, loyalty points and notifications.</p>
            <button type="button" className="up-btn up-btn-primary" onClick={login}>
              Log in with Google
            </button>
          </div>
        ) : (
          children(user)
        )}
      </section>
    </main>
  );
}

export default UserPageShell;