import React, { useState } from 'react';
import '../../styles/cart.css';

const Cart = ({ cartItems, onClose, onClear }) => {
  return (
    <div className="cart-panel">
      <div className="cart-header">
        <h2>My Basket ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</h2>
        <button onClick={onClose}>Close</button>
        <button onClick={onClear}>Clear Basket</button>
      </div>
      <div className="cart-content">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Size: {item.size} mm</p>
              <p>Color: <span style={{ backgroundColor: item.color }} className="color-box"></span></p>
            </div>
            <div className="cart-item-price">${item.price.toFixed(2)}</div>
            <button className="remove-button">X</button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p>Subtotal Amount:</p>
        <h3>${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</h3>
        <button className="checkout-button">CHECK OUT</button>
      </div>
    </div>
  );
};

export default Cart;
