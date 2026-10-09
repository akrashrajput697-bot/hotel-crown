import React, { useState, useEffect, useRef } from 'react';
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import UserPageShell from '../component/UserPageShell';
import { getProfile, saveProfile } from '../utils/userData';

const passwordError = (code) => {
  switch (code) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Your current password is not correct.';
    case 'auth/weak-password':
      return 'Choose a stronger password with at least 8 characters.';
    case 'auth/requires-recent-login':
      return 'Please log out, log in again, and then change your password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    default:
      return 'We could not change your password. Please try again.';
  }
};

function AccountContent({ user }) {
  const [profile, setProfile] = useState(() => {
    const saved = getProfile(user.uid);
    return { ...saved, fullName: saved.fullName || user.displayName || '' };
  });
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwBusy, setPwBusy] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  const hasPassword = user.providerData.some((p) => p.providerId === 'password');
  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : null;
  const initial = (profile.fullName || user.email || 'A').charAt(0).toUpperCase();

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3000);
  };

  const onProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const submitProfile = async (e) => {
    e.preventDefault();
    try {
      saveProfile(user.uid, profile);
      if (profile.fullName && profile.fullName !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: profile.fullName });
      }
      showToast('Your details have been saved.');
    } catch (err) {
      console.error(err);
      showToast('Could not save your details. Please try again.');
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setPwError('');
    if (pw.next.length < 8) return setPwError('Your new password must have at least 8 characters.');
    if (pw.next !== pw.confirm) return setPwError('The new passwords do not match.');
    if (pw.next === pw.current) return setPwError('Choose a password different from your current one.');

    setPwBusy(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, pw.current);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updatePassword(auth.currentUser, pw.next);
      setPw({ current: '', next: '', confirm: '' });
      showToast('Your password has been changed.');
    } catch (err) {
      setPwError(passwordError(err.code));
    } finally {
      setPwBusy(false);
    }
  };

  const strength = (() => {
    const p = pw.next;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s += 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s += 1;
    if (/\d/.test(p)) s += 1;
    if (/[^A-Za-z0-9]/.test(p)) s += 1;
    return s;
  })();

  return (
    <div className="up-wide up-account">
      <aside className="up-card up-profile-card">
        <div className="up-avatar">{initial}</div>
        <h3>{profile.fullName || 'Guest'}</h3>
        <p className="up-muted up-break">{user.email}</p>
        <dl className="up-facts">
          <div>
            <dt>Sign-in method</dt>
            <dd>{hasPassword ? 'Email and password' : 'Google account'}</dd>
          </div>
          {memberSince && (
            <div>
              <dt>Member since</dt>
              <dd>{memberSince}</dd>
            </div>
          )}
        </dl>
        <button type="button" className="up-btn up-btn-outline" onClick={() => signOut(auth)}>
          Log out
        </button>
      </aside>

      <div className="up-account-forms">
        {/* Personal details */}
        <form className="up-card" onSubmit={submitProfile}>
          <h3 className="up-card-title">Personal details</h3>
          <div className="up-form-grid">
            <label className="up-field">
              <span>Full name</span>
              <input name="fullName" value={profile.fullName} onChange={onProfileChange} placeholder="Your full name" />
            </label>
            <label className="up-field">
              <span>Email</span>
              <input value={user.email || ''} disabled />
            </label>
            <label className="up-field">
              <span>Phone number</span>
              <input
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={onProfileChange}
                placeholder="+92 300 1234567"
              />
            </label>
            <label className="up-field">
              <span>City</span>
              <input name="city" value={profile.city} onChange={onProfileChange} placeholder="Islamabad" />
            </label>
            <label className="up-field full">
              <span>Special requests for your stay</span>
              <textarea
                name="requests"
                rows="3"
                value={profile.requests}
                onChange={onProfileChange}
                placeholder="Late check-in, extra pillows, quiet floor..."
              />
            </label>
          </div>
          <div className="up-form-actions">
            <button type="submit" className="up-btn up-btn-primary">
              Save changes
            </button>
          </div>
        </form>

        {/* Security */}
        <div className="up-card">
          <h3 className="up-card-title">Password and security</h3>
          {hasPassword ? (
            <form onSubmit={submitPassword}>
              <div className="up-form-grid">
                <label className="up-field full">
                  <span>Current password</span>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={pw.current}
                    onChange={(e) => setPw({ ...pw, current: e.target.value })}
                    required
                  />
                </label>
                <label className="up-field">
                  <span>New password</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={pw.next}
                    onChange={(e) => setPw({ ...pw, next: e.target.value })}
                    required
                  />
                </label>
                <label className="up-field">
                  <span>Confirm new password</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={pw.confirm}
                    onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                    required
                  />
                </label>
              </div>
              <div className={`up-strength s${strength}`} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              {pwError && (
                <p className="up-error" role="alert">
                  {pwError}
                </p>
              )}
              <div className="up-form-actions">
                <button type="submit" className="up-btn up-btn-primary" disabled={pwBusy}>
                  {pwBusy ? 'Updating...' : 'Change password'}
                </button>
              </div>
            </form>
          ) : (
            <div className="up-note-box">
              <strong>You sign in with Google.</strong>
              <p>
                Your account has no password on this website. To change how you sign in, update your password in
                your Google account settings.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={`up-toast ${toast ? 'show' : ''}`} role="status">
        {toast}
      </div>
    </div>
  );
}

export default function Account() {
  return (
    <UserPageShell title="Manage Your Account" subtitle="Update your details and keep your account secure.">
      {(user) => <AccountContent user={user} />}
    </UserPageShell>
  );
}