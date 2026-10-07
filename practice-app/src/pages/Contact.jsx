import React from 'react';
import '../style/Contact.css';

function ClientEmail({ toName, roomName, checkIn, checkOut, guests, totalPrice }) {
  return (
    <div className="email-card">
      <div className="email-header">
        <h2>Booking Confirmation</h2>
      </div>
      
      <div className="email-body">
        <p>Dear <strong>{toName}</strong>,</p>
        <p>Thank you for choosing <strong>Hotel Crown CP Islamabad</strong>! Your reservation has been successfully received and confirmed.</p>
        
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Room Type:</strong> {roomName}</li>
          <li><strong>Check-in Date:</strong> {checkIn}</li>
          <li><strong>Check-out Date:</strong> {checkOut}</li>
          <li><strong>Total Guests:</strong> {guests}</li>
          <li><strong>Total Price:</strong> PKR {totalPrice}</li>
        </ul>
        
        <p>If you have any questions or need to modify your booking, feel free to contact us at +92 324 1118206.</p>
        <p>We look forward to welcoming you!</p>
      </div>

      <div className="email-footer">
        <p>Hotel Crown CP Islamabad | 99-E, Jinnah Ave, Blue Area, Islamabad</p>
      </div>
    </div>
  );
}

export default ClientEmail;