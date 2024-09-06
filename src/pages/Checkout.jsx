import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, selectCartItems } from "../store/cart";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseItemQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItemQuantity(item));
    }
  };

  const handleNextStep = () => {
    navigate("/shipping-details");
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="checkout-page">
      <div className="steps">
        <div className="step active">1</div>
        <div className="step">2</div>
        <div className="step">3</div>
        <p className="step-title">Order Summary</p>
      </div>

      <h2>Order Summary</h2>
      <p>Review items in your basket.</p>

      <div className="order-items">
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <div className="quantity-buttons">
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              <button onClick={() => handleDecreaseQuantity(item)} disabled={item.quantity === 1}>-</button>
            </div>
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Size: {item.size} mm</p>
              <p>Color: <span className="color-box" style={{ backgroundColor: item.color }}></span></p>
            </div>
            <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
            <button className="remove-item" onClick={() => handleRemoveItem(item)}>X</button>
          </div>
        ))}
      </div>

      <div className="checkout-summary">
        <button className="continue-shopping" onClick={() => navigate("/shop")}>
          Continue Shopping
        </button>
        <div className="checkout-subtotal">
          <p>Subtotal:</p>
          <h3>${subtotal}</h3>
        </div>
        <button className="next-step" onClick={handleNextStep}>
          Next Step <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;