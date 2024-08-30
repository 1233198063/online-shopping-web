import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, clearCart, selectCartItems } from "../../store/cart";
import '../../styles/cart.css';

const Cart = ({ onClose }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <h2>My Basket ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</h2>
        <button onClick={onClose}>Close</button>
        <button onClick={handleClearCart}>Clear Basket</button>
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
            <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
            <button className="remove-button" onClick={() => dispatch(removeItemFromCart(item))}>X</button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p>Subtotal Amount:</p>
        <h3>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
        <button className="checkout-button">CHECK OUT</button>
      </div>
    </div>
  );
};
export default Cart;
