import React from 'react';
import '../style/About.css';

function HotelEmail({ toName, clientEmail, phone, roomName, checkIn, checkOut, guests, totalPrice }) {
  return (
    <div className="hotel-email-card">
      <div className="hotel-email-header">
        <h2>New Website Booking Received</h2>
      </div>

      <div className="hotel-email-body">
        <p>Hello Hotel Management,</p>
        <p>A new room reservation has been placed through the website. Here are the guest details:</p>
        
        <ul>
          <li><strong>Guest Name:</strong> {toName}</li>
          <li><strong>Guest Email:</strong> {clientEmail}</li>
          <li><strong>Phone Number:</strong> {phone}</li>
          <li><strong>Room Type:</strong> {roomName}</li>
          <li><strong>Check-in:</strong> {checkIn}</li>
          <li><strong>Check-out:</strong> {checkOut}</li>
          <li><strong>Guests:</strong> {guests}</li>
          <li><strong>Total Amount:</strong> PKR {totalPrice}</li>
        </ul>
        
        <p className="hotel-email-note">Please verify the transaction records in the system.</p>
      </div>
    </div>
  );
}

export default HotelEmail;