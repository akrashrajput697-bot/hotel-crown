import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../style/Wallet.css'; // Aap chahay toh Wallet.css bhi bana sakte hain

function Wallet() {
  const [user, setUser] = useState(null);
  const [walletData, setWalletData] = useState({
    points: 0,
    discount: 0,
    count: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/');
        return;
      }
      setUser(currentUser);

      const userRef = doc(db, "users", currentUser.uid);
      unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWalletData({
            points: data.loyaltyPoints || 0,
            discount: data.discountPercentage || 0,
            count: data.completedBookingsCount || 0
          });
        }
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, [navigate]);

  const targetStays = 50;
  const progressPercent = Math.min(100, (walletData.count / targetStays) * 100);

  return (
    <div className="crown-pro-page">
      <Helmet>
        <title>My Crown Wallet & Rewards | Hotel Crown CP Islamabad</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="crown-pro-hero">
        <div className="aura-glow-1"></div>
        <div className="aura-glow-2"></div>
        <div className="crown-hero-content">
          <span className="crown-badge-top">✨ EXCLUSIVE REWARDS WALLET</span>
          <h1>Crown Privilege Wallet</h1>
          <p>Manage your luxury stay points, active discounts, and tier benefits in one elegant place.</p>
        </div>
      </div>

      <div className="crown-pro-container wallet-container-box">
        {loading ? (
          <div className="crown-status-box">
            <div className="spinner-luxury"></div>
            <p>Loading your wallet details...</p>
          </div>
        ) : (
          <>
            {/* Wallet Main Balance Card */}
            <div className="wallet-main-card">
              <div className="wallet-bg-icon">⭐</div>
              
              <div className="wallet-card-header-flex">
                <div>
                  <span className="wallet-balance-label">Available Balance</span>
                  <div className="wallet-points-value">
                    {walletData.points} <span>Points</span>
                  </div>
                  <p className="wallet-earned-text">
                    Earned from <strong>{walletData.count}</strong> completed luxury stays.
                  </p>
                </div>

                <div className="wallet-tier-badge-box">
                  <span className="tier-subtitle">Current Tier Status</span>
                  <span className="tier-title">
                    {walletData.discount > 0 ? '👑 VIP Member' : '🌟 Standard Member'}
                  </span>
                  <span className="tier-discount-text">
                    🎁 {walletData.discount}% OFF Active on Bookings
                  </span>
                </div>
              </div>

              {/* Progress to VIP Tier */}
              <div className="wallet-progress-section">
                <div className="wallet-progress-info">
                  <span>VIP Progress ({walletData.count} / {targetStays} Stays)</span>
                  <span>{targetStays - walletData.count > 0 ? `${targetStays - walletData.count} stays until 30% VIP Tier` : 'VIP Tier Unlocked! 🎉'}</span>
                </div>
                <div className="wallet-progress-track">
                  <div className="wallet-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* Perks & Information Grid */}
            <div className="wallet-perks-grid">
              <div className="wallet-perk-card">
                <div className="perk-icon">🏨</div>
                <h3>10 Points Per Stay</h3>
                <p>
                  Every time you complete a stay at Hotel Crown CP Islamabad, 10 reward points are automatically added to your wallet.
                </p>
              </div>

              <div className="wallet-perk-card">
                <div className="perk-icon">💎</div>
                <h3>VIP 30% Discount</h3>
                <p>
                  Reach 50 completed bookings to automatically unlock an exclusive 30% permanent discount on all future room reservations.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="wallet-actions-row">
              <button 
                onClick={() => navigate('/booking-history')}
                className="crown-gold-btn wallet-action-btn"
              >
                📜 View Booking History
              </button>
              <button 
                onClick={() => navigate('/rooms-islamabad-hotel')}
                className="crown-gold-btn wallet-action-btn"
              >
                🧳 Book New Stay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wallet;