import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  clearCart,
  selectCartItems,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../store/cart";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import "../../styles/cart.css";

const Cart = ({ onClose, isAuthenticated }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseItemQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItemQuantity(item));
    }
  };

  // Check out
  const handleCheckOut = () => {
    if (isAuthenticated) {
      // Proceed to checkout
      navigate("/checkout");
    } else {
      // Show the modal
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSignInToCheckOut = () => {
    navigate("/login");
    handleCloseModal();
    onClose();
  };

  const handleContinueShopping = () => {
    handleCloseModal();
    onClose(); // Close the cart and return to the previous page
  };

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <h2>
          My Basket ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})
        </h2>
        <div className="buttons">
          <button className="button button-white" onClick={onClose}>
            Close
          </button>
          <button className="button button-white" onClick={handleClearCart}>
            Clear Basket
          </button>
        </div>
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
              onClick={() => dispatch(removeItemFromCart(item))}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p>Subtotal Amount:</p>
        <h3>
          $
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
        <button className="checkout-button button" onClick={handleCheckOut}>
          CHECK OUT
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Sign In Required"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>You must sign in to continue checking out</h2>
        <div className="modal-buttons">
          <button
            className="continue-shopping-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
          <button className="sign-in-button" onClick={handleSignInToCheckOut}>
            Sign in to Check Out
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Cart;
