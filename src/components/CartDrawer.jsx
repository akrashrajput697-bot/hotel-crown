import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const savedCart = JSON.parse(localStorage.getItem('hotel_cart')) || [];
      setCartItems(savedCart);
    }
  }, [isOpen]);

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem('hotel_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('hotel_cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCartItems(updatedCart);
    localStorage.setItem('hotel_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleDecrease = (index) => {
    const updatedCart = [...cartItems];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem('hotel_cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const handleCheckout = () => {
    onClose(); // Cart drawer band ho jaye ga
    navigate('/reservation'); // Reservation page par redirect ho jaye ga
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.totalPrice) || 0) * (item.quantity || 1), 0);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>

        {/* Cart Header */}
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close-btn" onClick={onClose}>×</button>
        </div>

        {/* Cart Body */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart-text">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item-card">
                {item.image && item.image.trim() !== "" ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                ) : null}

                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name || 'Standard Room'}</h4>
                  <p className="cart-item-plan">Plan: {item.planName || 'Room Only'}</p>
                  <p className="cart-item-dates">📅 {item.startDate} - {item.endDate} ({item.nights} N)</p>
                  <p className="cart-item-price">PKR {(item.totalPrice || 0).toLocaleString()}</p>
                  
                  {/* Quantity Control */}
                  <div className="cart-qty-control">
                    <button onClick={() => handleDecrease(index)} className="qty-btn">-</button>
                    <span className="qty-value">{item.quantity || 1}</span>
                    <button onClick={() => handleIncrease(index)} className="qty-btn">+</button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="cart-remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        <div className="cart-footer">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="cart-summary-row">
            <span>Tax (Included)</span>
            <span>PKR 0</span>
          </div>
          <div className="cart-summary-row total-row">
            <span>Total</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          
          <button
            className="proceed-checkout-btn"
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          <button
            className="clear-cart-btn"
            disabled={cartItems.length === 0}
            onClick={handleClearCart}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '10px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
              opacity: cartItems.length === 0 ? 0.6 : 1,
              fontWeight: 'bold'
            }}
          >
            Clear Cart
          </button>
        </div>

      </div>
    </div>
  );
}