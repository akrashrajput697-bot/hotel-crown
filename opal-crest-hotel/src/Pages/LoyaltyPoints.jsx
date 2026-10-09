import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserPageShell from '../component/UserPageShell';
import {
  useUserData,
  formatDate,
  POINTS_PER_STAY,
  STAYS_FOR_REWARD,
  REWARD_DISCOUNT,
} from '../utils/userData';

function useCountUp(target, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const RADIUS = 62;
const CIRC = 2 * Math.PI * RADIUS;

function LoyaltyContent({ user }) {
  const { loyalty } = useUserData(user.uid);
  const points = useCountUp(loyalty.points);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  const filled = loyalty.progress;
  const offset = ready ? CIRC * (1 - filled / STAYS_FOR_REWARD) : CIRC;

  return (
    <div className="up-wide">
      {/* Balance + progress */}
      <div className="up-loyal-top">
        <div className="up-card up-balance">
          <p className="up-muted">Your balance</p>
          <div className="up-points-number">
            {points}
            <span>points</span>
          </div>
          <p className="up-muted">
            {loyalty.completedStays} completed {loyalty.completedStays === 1 ? 'stay' : 'stays'}. Each stay
            earns {POINTS_PER_STAY} points.
          </p>
        </div>

        <div className="up-card up-progress-card">
          <div className="up-ring">
            <svg viewBox="0 0 150 150" aria-hidden="true">
              <circle className="up-ring-bg" cx="75" cy="75" r={RADIUS} />
              <circle
                className="up-ring-fg"
                cx="75"
                cy="75"
                r={RADIUS}
                strokeDasharray={CIRC}
                strokeDashoffset={offset}
                transform="rotate(-90 75 75)"
              />
            </svg>
            <div className="up-ring-label">
              <strong>{filled}</strong>
              <span>of {STAYS_FOR_REWARD}</span>
            </div>
          </div>
          <div className="up-progress-text">
            <h3>{REWARD_DISCOUNT}% off your next stay</h3>
            <p>
              {loyalty.staysToReward === STAYS_FOR_REWARD
                ? `Complete ${STAYS_FOR_REWARD} stays to earn it.`
                : `${loyalty.staysToReward} more ${loyalty.staysToReward === 1 ? 'stay' : 'stays'} to go.`}
            </p>
            <div className="up-stamps">
              {Array.from({ length: STAYS_FOR_REWARD }).map((_, i) => (
                <span
                  key={i}
                  className={`up-stamp ${i < filled ? 'on' : ''}`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reward */}
      <div className={`up-card up-reward ${loyalty.rewardsAvailable > 0 ? 'unlocked' : ''}`}>
        <div className="up-reward-badge">{REWARD_DISCOUNT}%</div>
        <div className="up-reward-text">
          <h3>
            {loyalty.rewardsAvailable > 0
              ? `You have ${loyalty.rewardsAvailable} reward${loyalty.rewardsAvailable > 1 ? 's' : ''} ready`
              : 'Guest reward'}
          </h3>
          <p>
            {loyalty.rewardsAvailable > 0
              ? `Apply your ${REWARD_DISCOUNT}% discount when you make your next reservation.`
              : `After ${STAYS_FOR_REWARD} completed stays, the hotel gives you ${REWARD_DISCOUNT}% off a booking.`}
          </p>
        </div>
        <Link to="/rooms" className="up-btn up-btn-primary">
          {loyalty.rewardsAvailable > 0 ? 'Book with reward' : 'Book a stay'}
        </Link>
      </div>

      <div className="up-two-col">
        {/* How it works */}
        <div className="up-card">
          <h3 className="up-card-title">How it works</h3>
          <ol className="up-steps">
            <li>
              <span>1</span>
              <div>
                <h4>Book and stay</h4>
                <p>Reserve any room and enjoy your stay with us.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h4>Earn after checkout</h4>
                <p>
                  You receive {POINTS_PER_STAY} points once your stay is over. Points are not added while the
                  booking is upcoming or ongoing.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h4>Unlock {REWARD_DISCOUNT}% off</h4>
                <p>
                  Every {STAYS_FOR_REWARD} completed stays, the hotel rewards you with a {REWARD_DISCOUNT}%
                  discount.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* History */}
        <div className="up-card">
          <h3 className="up-card-title">Points history</h3>
          {loyalty.history.length === 0 ? (
            <p className="up-muted up-pad">
              No points yet. Your first {POINTS_PER_STAY} points arrive after your first completed stay.
            </p>
          ) : (
            <ul className="up-history">
              {loyalty.history.map((h, i) => (
                <li key={h.id} style={{ animationDelay: `${i * 70}ms` }}>
                  <div>
                    <h4>{h.roomName}</h4>
                    <p>Checked out {formatDate(h.checkOut)}</p>
                  </div>
                  <strong>+{h.points}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoyaltyPoints() {
  return (
    <UserPageShell
      title="Loyalty Points"
      subtitle={`Earn ${POINTS_PER_STAY} points for every stay. Complete ${STAYS_FOR_REWARD} stays and get ${REWARD_DISCOUNT}% off.`}
    >
      {(user) => <LoyaltyContent user={user} />}
    </UserPageShell>
  );
}