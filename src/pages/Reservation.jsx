import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { auth, db } from '../pages/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../style/Reservation.css';

function Reservation() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('room');
  const checkIn = queryParams.get('checkIn');
  const checkOut = queryParams.get('checkOut');
  const adults = queryParams.get('adults') || 1;
  const qty = queryParams.get('qty') || 1;

  const savedBooking = JSON.parse(localStorage.getItem('selected_room')) || {};
  
  const roomData = savedBooking.room || {
    id: roomId || 1,
    name: 'Standard Double',
    images: ["https://hotelcrowncp.com/assets/images/rooms/deluxe%20double/1.webp"],
    selectedPlan: { name: 'Room Only', price: 21000 }
  };

  const totalNights = savedBooking.totalNights || 1;
  const basePricePerNight = roomData.selectedPlan?.price || 21000;
  
  const roomSubtotal = basePricePerNight * totalNights * Number(qty);
  const gstTax = roomSubtotal * 0.15;
  const bedTax = roomSubtotal * 0.05;
  const totalTaxes = gstTax + bedTax;
  const totalReservation = roomSubtotal + totalTaxes;

  const [formData, setFormData] = useState({
    title: 'Mr.',
    guestName: '',
    phoneNumber: '',
    email: '',
    couponCode: '',
    specialMessage: '',
    paymentMethod: 'Pay at Hotel',
    agreedToTerms: false
  });

  // Popup Modal state
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleConfirmReservation = async () => {
    if (!formData.guestName || !formData.phoneNumber || !formData.email) {
      alert('Please fill in Guest Name, Phone Number, and Email.');
      return;
    }

    if (!formData.agreedToTerms) {
      alert('Please agree to the Terms and Conditions and Privacy Policy.');
      return;
    }

    const currentUser = auth.currentUser;
    const checkInDate = checkIn || savedBooking?.searchData?.startDate || 'N/A';
    const checkOutDate = checkOut || savedBooking?.searchData?.endDate || 'N/A';

    let cleanPhone = formData.phoneNumber.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '92' + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith('92')) {
      cleanPhone = '92' + cleanPhone;
    }

    const whatsappMessage = 
      `*New Room Reservation*%0A` +
      `--------------------------------%0A` +
      `*Guest Name:* ${formData.title} ${formData.guestName}%0A` +
      `*Phone:* +${cleanPhone}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Room:* ${roomData.name}%0A` +
      `*Check-In:* ${checkInDate}%0A` +
      `*Check-Out:* ${checkOutDate}%0A` +
      `*Nights:* ${totalNights} | *Rooms:* ${qty}%0A` +
      `*Guests:* ${adults}%0A` +
      `*Payment Method:* ${formData.paymentMethod}%0A` +
      `*Total Amount:* PKR ${totalReservation.toLocaleString()}%0A` +
      `*Special Request:* ${formData.specialMessage || 'None'}`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');

    const bookingPayload = {
      userId: currentUser ? currentUser.uid : "guest",
      userEmail: formData.email || (currentUser ? currentUser.email : "guest@hotel.com"),
      guestName: `${formData.title} ${formData.guestName}`,
      phoneNumber: formData.phoneNumber,
      roomTitle: roomData.name,
      roomPrice: basePricePerNight,
      totalPrice: totalReservation,
      nights: totalNights,
      count: Number(qty),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: Number(adults),
      planName: roomData.selectedPlan?.name || 'Room Only',
      paymentMethod: formData.paymentMethod,
      specialMessage: formData.specialMessage,
      image: roomData.images ? roomData.images[0] : roomData.image,
      createdAt: serverTimestamp()
    };

    try {
      // 1. Save Booking in Firestore
      await addDoc(collection(db, "bookings"), bookingPayload);

      // 2. Save Notification in Firestore automatically
      await addDoc(collection(db, "notifications"), {
        userId: currentUser ? currentUser.uid : "guest",
        title: "Booking Confirmed! 🎉",
        message: `Your booking for ${roomData.name} (${totalNights} Night(s)) has been successfully confirmed.`,
        read: false,
        date: serverTimestamp()
      });

    } catch (error) {
      console.error("Firestore save error:", error);
    }

    // 3. Show Success Popup Modal instead of alert
    setShowPopup(true);
  };

  const formatPKR = (amount) => {
    return 'PKR ' + amount.toLocaleString();
  };

  return (
    <div className="reservation-page-wrapper">
      <Helmet>
        <title>Complete Your Reservation | Hotel Crown CP Islamabad</title>
        <meta name="description" content="Finalize your room booking details, enter guest information, and confirm your stay at Hotel Crown CP Islamabad." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="reservation-hero-section">
        <div className="reservation-hero-overlay"></div>
        <div className="reservation-hero-content">
          <h1>Reserve {roomData.name}</h1>
          <p>Complete your booking details below</p>
        </div>
      </div>

      <div className="reservation-main-container">
        <div className="reservation-form-box">
          <h2>Guest Details</h2>
          
          <div>
            <div className="reservation-form-grid">
              <div className="reservation-field-group">
                <label>Guest Name</label>
                <div className="reservation-input-combined">
                  <select name="title" value={formData.title} onChange={handleChange}>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                  <input 
                    type="text" 
                    name="guestName" 
                    placeholder="Guest name" 
                    value={formData.guestName} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="reservation-field-group">
                <label>Phone Number</label>
                <div className="reservation-input-combined">
                  <span className="reservation-phone-prefix">PK +92</span>
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Phone Number" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            <div className="reservation-field-group full-width-field">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>

            <div className="reservation-field-group full-width-field">
              <label>Coupon Code</label>
              <div className="reservation-input-combined">
                <input 
                  type="text" 
                  name="couponCode" 
                  placeholder="Coupon Code" 
                  value={formData.couponCode} 
                  onChange={handleChange} 
                />
                <button type="button" className="reservation-voucher-btn">Apply Voucher</button>
              </div>
            </div>

            <div className="reservation-field-group full-width-field">
              <label>Special Message</label>
              <textarea 
                name="specialMessage" 
                placeholder="Special message..." 
                rows="4" 
                value={formData.specialMessage} 
                onChange={handleChange}
              ></textarea>
            </div>

            <h3>Payment Method</h3>
            
            <div className="reservation-payment-grid">
              <div 
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Pay at Hotel' }))} 
                className={`reservation-payment-card ${formData.paymentMethod === 'Pay at Hotel' ? 'selected-payment' : ''}`}
              >
                <h4>Pay at Hotel ✓</h4>
                <p>Pay the full amount when you check in at the hotel.</p>
              </div>

              <div 
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: '50% Deposit' }))} 
                className={`reservation-payment-card ${formData.paymentMethod === '50% Deposit' ? 'selected-payment' : ''}`}
              >
                <h4>50% Deposit ✓</h4>
                <p>Pay 50% at the hotel to confirm your booking. No online payment required.</p>
              </div>
            </div>

            <div className="reservation-terms-group">
              <label>
                <input 
                  type="checkbox" 
                  name="agreedToTerms" 
                  checked={formData.agreedToTerms} 
                  onChange={handleChange} 
                />
                I have read and agree to the Terms and Conditions and Privacy Policy
              </label>
            </div>

            <button 
              type="button" 
              className="reservation-submit-btn"
              onClick={handleConfirmReservation}
            >
              Confirm Reservation & Send WhatsApp ➔
            </button>
          </div>
        </div>

        <div className="reservation-summary-box">
          <img 
            src={roomData.images ? roomData.images[0] : roomData.image} 
            alt={roomData.name} 
          />
          
          <div className="reservation-summary-content">
            <h3>YOUR RESERVATION</h3>
            <div className="summary-room-title">
              Room {qty}: {roomData.name}
            </div>
            <div className="summary-info-text">
              📅 {checkIn || savedBooking?.searchData?.startDate} to {checkOut || savedBooking?.searchData?.endDate}
            </div>
            <div className="summary-info-text mb-space">
              👤 {adults} Adult(s) | 🌙 {totalNights} Night(s) | 🛏️ {qty} Room(s)
            </div>

            <hr className="summary-divider" />

            <div className="summary-calc-row">
              <span>Reservation Subtotal</span>
              <span>{formatPKR(roomSubtotal)}</span>
            </div>
            <div className="summary-calc-row mb-space">
              <span>Taxes (GST + Bed Tax)</span>
              <span>{formatPKR(totalTaxes)}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-calc-row total-row">
              <span>Total Reservation</span>
              <span className="summary-total-price">{formatPKR(totalReservation)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="popup-card" style={{
            background: '#1a1a1a', padding: '30px', borderRadius: '12px',
            textAlign: 'center', color: '#fff', maxWidth: '400px', width: '90%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)', border: '1px solid #d4af37'
          }}>
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>Booking Confirmed! 🎉</h3>
            <p style={{ marginBottom: '20px', color: '#ccc' }}>
              Aapki room reservation kamyabi ke sath save ho gayi hai aur notification bhej di gayi hai!
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={() => navigate('/notifications')} 
                style={{
                  padding: '10px 15px', background: '#d4af37', border: 'none',
                  borderRadius: '5px', color: '#000', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                View Notifications
              </button>
              <button 
                onClick={() => navigate('/booking-history')} 
                style={{
                  padding: '10px 15px', background: 'transparent', border: '1px solid #d4af37',
                  borderRadius: '5px', color: '#d4af37', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                My Reservations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;