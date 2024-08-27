import React, { useState } from "react";
import { NavLink, useRoutes, useNavigate } from "react-router-dom";
import routes from "../route";

import Cart from "../components/cart/Cart";
import ProductDetails from "../components/ProductDetails";

import "../styles/layout.css";

export default function Layout() {
  const element = useRoutes(routes);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility
  const [showNotification, setShowNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  // Track current page ('' for general, 'register' for RegisterPage, 'login' for LoginPage)

  // busket and cart
  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // Hide notification after 2 seconds
  };

  const handleRemoveFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const isItemInCart = (item) =>
    cartItems.some((cartItem) => cartItem.id === item.id);

  // sign up and sign in
  const handleSignUpClick = () => {
    setCurrentPage("register");
    navigate("/register"); // Navigate to register page
  };

  const handleSignInClick = () => {
    setCurrentPage("login");
    navigate("/login"); // Navigate to login page
  };

  return (
    <div>
      <nav className="nav-bar">
        <a href="/" className="web-icon">
          <div className="icon-img"></div>
        </a>

        <div className="nav-links">
          <NavLink to={"/home"}>Home</NavLink>

          <NavLink to={"/shop"}>Shop</NavLink>

          <NavLink to={"/featured"}>Featured</NavLink>

          <NavLink to={"/recommended"}>Recommended</NavLink>
        </div>

        <div className="searchbar">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search product..."
          />
          <span
            className="material-symbols-outlined shopping-bag"
            onClick={handleOpenCart} // Opens the cart on click
            style={{ cursor: "pointer" }}
          >
            shopping_bag
            {cartItems.length > 0 && (
              <div className="cart-badge">{cartItems.length}</div>
            )}
          </span>
        </div>

        <div className="action-buttons">
          {/* <a className="button button-small" href="">
            Sign Up
          </a>
          <a className="button button-small button-white" href="">
            Sign In
          </a> */}

          {currentPage !== "register" && (
            <button className="button button-small" onClick={handleSignUpClick}>
              Sign Up
            </button>
          )}
          {currentPage !== "login" && (
            <button
              className="button button-small button-white"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* {element} */}
      
      {/* Pass cart-related props to the ProductDetails component */}
      {element ? React.cloneElement(element, {
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        isItemInCart
      }) : null}

      {/* Cart overlay */}
      <div className={`cart-overlay ${isCartOpen ? "open" : ""}`}>
        <Cart
          cartItems={cartItems}
          onClose={handleCloseCart}
          onClear={handleClearCart}
        />
      </div>

      {/* Backdrop overlay to close cart when clicked */}
      {isCartOpen && (
        <div className="cart-backdrop" onClick={handleCloseCart}></div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="notification">Item added to the basket</div>
      )}

      <footer className="footer">
        <div className="footer-left">
          <p>
            Developed by <a href="">Olivia</a>
          </p>
        </div>
        <div className="footer-middle">
          <img
            className="footer-logo"
            src="/images/eyewear-logo.png"
            alt="footer logo"
          />
          <p>© 2024</p>
        </div>
        <div className="footer-right">
          <p>
            Visit portfolio <a href="">HERE</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
