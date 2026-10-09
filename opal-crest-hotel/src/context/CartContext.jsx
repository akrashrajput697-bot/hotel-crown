import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (room) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === room.id);
      if (existing) {
        return prev.map(item => 
          item.id === room.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...room, quantity: 1, nights: 2 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const proceedToCheckout = () => {
    setCartOpen(false);
    window.location.href = '/reservation'; // Yeh bina kisi error ke seedha reservation page par le jayega
  };

  return (
    <CartContext.Provider value={{ cartItems, cartOpen, setCartOpen, addToCart, updateQuantity, removeItem, proceedToCheckout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}