import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { auth, db } from '../pages/firebase';
import { collection, query, where, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../style/BookingHistory.css';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('all'); 
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthLoaded(true);

      if (!user) {
        setLoading(false);
        setBookings([]);
        navigate('/');
        return;
      }

      try {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const userBookings = querySnapshot.docs.map(document => {
          const data = document.data();
          const customId = data.bookingId || `CP-2026-${Math.abs(document.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0))}`.slice(0, 14);
          
          return {
            id: document.id,
            displayBookingId: customId,
            ...data
          };
        });

        userBookings.sort((a, b) => {
          const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
          const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
          return timeB - timeA;
        });

        setBookings(userBookings);
        checkAndAwardLoyalty(user.uid, userBookings);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // --- LOYALTY & POINTS AUTOMATION LOGIC ---
  const checkAndAwardLoyalty = async (userId, userBookings) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      const completedBookings = userBookings.filter(b => getBookingStatus(b.checkIn, b.checkOut) === 'past');
      const totalCompletedCount = completedBookings.length;
      const expectedPoints = totalCompletedCount * 10; // 10 points per completed stay

      let currentCount = 0;
      if (userSnap.exists()) {
        const userData = userSnap.data();
        currentCount = userData.completedBookingsCount || 0;
        setUserPoints(userData.loyaltyPoints || expectedPoints);
      }

      let newDiscount = 0;
      if (totalCompletedCount >= 50) {
        newDiscount = 30; // 30% VIP Discount for 50+ stays
      }

      // setDoc with merge: true ensures document is created if missing, preventing crash
      await setDoc(userRef, {
        loyaltyPoints: expectedPoints,
        completedBookingsCount: totalCompletedCount,
        discountPercentage: newDiscount
      }, { merge: true });

      setUserPoints(expectedPoints);
      console.log("✅ Loyalty points and tier successfully updated:", expectedPoints);
    } catch (err) {
      console.error("❌ Error updating loyalty points:", err);
    }
  };

  const handleDeleteBooking = async (realFirestoreId) => {
    if (!realFirestoreId) {
      alert("Invalid Document ID!");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      const docRef = doc(db, "bookings", realFirestoreId);
      await deleteDoc(docRef);

      setBookings(prev => prev.filter(item => item.id !== realFirestoreId));
      if (selectedBooking?.id === realFirestoreId) setSelectedBooking(null);
    } catch (error) {
      console.error("Firestore Delete Error: ", error);
      alert("Failed to delete booking. Error: " + error.message);
    }
  };

  // Robust Date Parsing for string formats like "Sep 24, 2026"
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) return parsed;

    const cleanStr = dateStr.replace(/,/g, '');
    const fallbackParsed = new Date(cleanStr);
    if (!isNaN(fallbackParsed.getTime())) return fallbackParsed;

    return null;
  };

  const getBookingStatus = (checkInStr, checkOutStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInDate = parseDate(checkInStr);
    const checkOutDate = parseDate(checkOutStr);

    if (!checkInDate || !checkOutDate) return 'past';

    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(23, 59, 59, 999);

    if (checkInDate > today) {
      return 'upcoming'; 
    } else if (today >= checkInDate && today <= checkOutDate) {
      return 'ongoing';  
    } else {
      return 'past';    
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      (booking.roomTitle && booking.roomTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.displayBookingId && booking.displayBookingId.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterTab === 'all') return true;

    const status = getBookingStatus(booking.checkIn, booking.checkOut);
    return status === filterTab;
  });

  return (
    <div className="crown-pro-page">
      <Helmet>
        <title>My Reservations & Booking History | Hotel Crown CP Islamabad</title>
        <meta name="description" content="View, track, and manage your upcoming and past luxury hotel reservations at Hotel Crown CP Islamabad." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="crown-pro-hero">
        <div className="aura-glow-1"></div>
        <div className="aura-glow-2"></div>
        <div className="crown-hero-content">
          <span className="crown-badge-top">✨ CROWN PLAZA ISLAMABAD</span>
          <h1>My Reservations Dashboard</h1>
          <p>Track, manage, and review your exclusive luxury hotel experiences with supreme elegance.</p>
        </div>
      </div>

      <div className="crown-pro-container">
        <div className="crown-glass-bar">
          <div className="crown-search-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search by room name or unique booking ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="crown-tabs-group">
            {['all', 'upcoming', 'ongoing', 'past'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`crown-filter-pill ${filterTab === tab ? 'active-pill' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {(!authLoaded || loading) ? (
          <div className="crown-status-box">
            <div className="spinner-luxury"></div>
            <p>Fetching your luxury stays...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="crown-status-box empty-box">
            <span className="empty-icon">🏨</span>
            <h3>No Reservations Found</h3>
            <p>You do not have any active or past bookings under this filter criteria.</p>
            <button onClick={() => navigate('/rooms')} className="crown-gold-btn">
              Explore Available Rooms
            </button>
          </div>
        ) : (
          <div className="crown-cards-grid">
            {filteredBookings.map((booking) => {
              const status = getBookingStatus(booking.checkIn, booking.checkOut);
              
              const statusMeta = {
                upcoming: { label: 'Upcoming Stay', class: 'status-upcoming' },
                ongoing: { label: 'Live Stay Active', class: 'status-ongoing' },
                past: { label: 'Completed Stay', class: 'status-past' }
              }[status];

              return (
                <div 
                  key={booking.id} 
                  className={`crown-luxury-card ${statusMeta.class}`}
                  onClick={() => setSelectedBooking(booking)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-top-row">
                    <div className="card-title-block">
                      <div className="title-with-tag">
                        <h3>{booking.roomTitle || 'Signature Suite'}</h3>
                        <span className={`status-pill-tag ${status}`}>{statusMeta.label}</span>
                      </div>
                      <span className="booking-ref-code">ID: {booking.displayBookingId}</span>
                    </div>

                    <div className="price-tag-box">
                      <span className="currency-label">PKR</span>
                      <span className="amount-value">{booking.totalPrice ? booking.totalPrice.toLocaleString() : '0'}</span>
                      <span className="amount-sub">Total Paid</span>
                    </div>
                  </div>

                  <div className="card-separator"></div>

                  <div className="card-info-grid">
                    <div className="info-cell">
                      <span className="cell-label">📅 Schedule Duration</span>
                      <span className="cell-value">{booking.checkIn || 'N/A'} &nbsp;➔&nbsp; {booking.checkOut || 'N/A'}</span>
                    </div>
                    <div className="info-cell">
                      <span className="cell-label">👥 Guest Occupancy</span>
                      <span className="cell-value">
                        {booking.adults || 1} Adult, {booking.children || 0} Child • {booking.rooms || 1} Room
                      </span>
                    </div>
                  </div>

                  <div className="card-footer-row">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBooking(booking);
                      }}
                      className="crown-gold-outline-btn"
                    >
                      👁️ View Details
                    </button>

                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBooking(booking.id);
                      }}
                      className="crown-danger-btn"
                    >
                      🗑️ Cancel / Delete Booking
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedBooking && (
        <div className="crown-modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="crown-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reservation Details</h2>
              <button className="close-modal-btn" onClick={() => setSelectedBooking(null)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-row">
                <span>Room Type:</span>
                <strong>{selectedBooking.roomTitle || 'Signature Suite'}</strong>
              </div>
              <div className="modal-row">
                <span>Booking ID:</span>
                <strong className="code-text">{selectedBooking.displayBookingId}</strong>
              </div>
              <div className="modal-row">
                <span>Check-In Date:</span>
                <strong>{selectedBooking.checkIn || 'N/A'}</strong>
              </div>
              <div className="modal-row">
                <span>Check-Out Date:</span>
                <strong>{selectedBooking.checkOut || 'N/A'}</strong>
              </div>
              <div className="modal-row">
                <span>Total Guests:</span>
                <strong>{selectedBooking.adults || 1} Adults, {selectedBooking.children || 0} Children</strong>
              </div>
              <div className="modal-row">
                <span>Rooms Count:</span>
                <strong>{selectedBooking.rooms || 1}</strong>
              </div>
              <div className="modal-row">
                <span>Total Amount Paid:</span>
                <strong className="price-highlight">PKR {selectedBooking.totalPrice ? selectedBooking.totalPrice.toLocaleString() : '0'}</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedBooking(null)} className="crown-gold-btn" style={{margin: 0, width: '100%'}}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingHistory;