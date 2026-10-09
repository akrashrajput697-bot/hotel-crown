import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserPageShell from '../component/UserPageShell';
import {
  useUserData,
  markNoteRead,
  markAllNotesRead,
  deleteNote,
  clearNotes,
  timeAgo,
} from '../utils/userData';

const Icon = ({ type }) => {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (type === 'points')
    return (
      <svg {...common}>
        <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
      </svg>
    );
  if (type === 'reward')
    return (
      <svg {...common}>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M7.5 8a2.5 2.5 0 1 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 1 1 0 5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M5 12.5 10 17.5 19 7" />
    </svg>
  );
};

function NotificationsContent({ user }) {
  const { notifications } = useUserData(user.uid);
  const [filter, setFilter] = useState('all');
  const [leaving, setLeaving] = useState(null);

  const unread = notifications.filter((n) => !n.read).length;
  const list = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const remove = (id) => {
    setLeaving(id);
    setTimeout(() => {
      deleteNote(user.uid, id);
      setLeaving(null);
    }, 280);
  };

  return (
    <div className="up-narrow">
      <div className="up-toolbar">
        <div className="up-segment" role="tablist">
          <button
            type="button"
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All <span>{notifications.length}</span>
          </button>
          <button
            type="button"
            className={filter === 'unread' ? 'active' : ''}
            onClick={() => setFilter('unread')}
          >
            Unread <span>{unread}</span>
          </button>
        </div>
        <div className="up-toolbar-actions">
          <button type="button" className="up-link-btn" disabled={!unread} onClick={() => markAllNotesRead(user.uid)}>
            Mark all as read
          </button>
          <button
            type="button"
            className="up-link-btn danger"
            disabled={!notifications.length}
            onClick={() => clearNotes(user.uid)}
          >
            Clear all
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="up-empty">
          <div className="up-empty-icon">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6.5 2 6.5H4S6 14 6 9Z" />
              <path d="M10 19a2 2 0 0 0 4 0" />
            </svg>
          </div>
          <h3>{filter === 'unread' ? 'You are all caught up' : 'No notifications yet'}</h3>
          <p>
            {filter === 'unread'
              ? 'There is nothing new to read.'
              : 'When you confirm a booking or finish a stay, you will see an update here.'}
          </p>
          {filter === 'all' && (
            <Link to="/rooms" className="up-btn up-btn-primary">
              Browse rooms
            </Link>
          )}
        </div>
      ) : (
        <ul className="up-note-list">
          {list.map((n, i) => (
            <li
              key={n.id}
              className={`up-note ${n.read ? '' : 'unread'} ${leaving === n.id ? 'leaving' : ''}`}
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
              onClick={() => !n.read && markNoteRead(user.uid, n.id)}
            >
              <span className={`up-note-icon ${n.type}`}>
                <Icon type={n.type} />
              </span>
              <div className="up-note-body">
                <div className="up-note-top">
                  <h4>{n.title}</h4>
                  <time>{timeAgo(n.createdAt)}</time>
                </div>
                <p>{n.message}</p>
                {n.bookingId && (
                  <Link to="/activity" className="up-note-link" onClick={(e) => e.stopPropagation()}>
                    View booking
                  </Link>
                )}
              </div>
              {!n.read && <span className="up-dot" aria-label="Unread" />}
              <button
                type="button"
                className="up-note-x"
                aria-label="Delete notification"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(n.id);
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Notifications() {
  return (
    <UserPageShell
      title="Notifications"
      subtitle="Booking confirmations, points and rewards, all in one place."
    >
      {(user) => <NotificationsContent user={user} />}
    </UserPageShell>
  );
}