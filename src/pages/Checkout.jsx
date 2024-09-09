import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, selectCartItems } from "../store/cart";
import { useNavigate } from "react-router-dom";
import "../styles/checkout.css";

const Checkout = () => {
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

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="checkout-page">
      <div className="steps">
        <div className="line"></div>
        <div className="step-box">
          <div className="step active">1</div>
          <p className="step-title active">Order Summary</p>
        </div>
        <div className="step-box">
          <div className="step">2</div>
          <p className="step-title">Shipping Details</p>
        </div>
        <div className="step-box">
          <div className="step">3</div>
          <p className="step-title">Payment</p>
        </div>
      </div>

      <div className="title">
        <h2>Order Summary</h2>
        <p>Review items in your basket.</p>
      </div>

      <div className="cart-content">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="buttons">
              <button
                className="add button button-white"
                onClick={() => handleIncreaseQuantity(item)}
              >
                +
              </button>
              <button
                className="subtract button button-white"
                onClick={() => handleDecreaseQuantity(item)}
                disabled={item.quantity === 1}
              >
                -
              </button>
            </div>
            <div className="item-img">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <div className="item-details">
                <div className="quantity">
                  <p>Quantity</p>
                  <div> {item.quantity}</div>
                </div>
                <div className="size">
                  <p>Size</p>
                  <div> {item.size} mm</div>
                </div>
                <div className="color">
                  <p>
                    Color{" "}
                  </p>
                  <span
                    style={{ backgroundColor: item.color }}
                    className="color-box"
                  ></span>
                </div>
              </div>
            </div>
            <div className="cart-item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="remove-button button-white button"
              onClick={() => handleRemoveItem(item)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="checkout-summary">
        <button className="button button-white" onClick={() => navigate("/shop")}>
          <span className="material-symbols-outlined">
            storefront
          </span>
          Continue Shopping
        </button>
        <div className="right-bottom">
          <div className="checkout-subtotal">
            <p>Subtotal:</p>
            <h2>${subtotal}</h2>
          </div>
          <button className="next-step button">
            Next Step <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;