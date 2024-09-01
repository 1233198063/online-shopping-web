import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTotalQuantity,
  hideNotification,
  selectNotification,
} from "../store/cart";
import { selectCurrentUser, logout } from "../store/auth";
import { NavLink, useRoutes, useNavigate, useLocation } from "react-router-dom";
import routes from "../route";

import Cart from "../components/cart/Cart";

// import from @mui
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import "../styles/layout.css";

export default function Layout() {
  const element = useRoutes(routes);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const notification = useSelector(selectNotification);
  const totalQuantity = useSelector(selectTotalQuantity);
  const currentUser = useSelector(selectCurrentUser);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility
  const [currentPage, setCurrentPage] = useState("");
  // Track current page ('' for general, 'register' for RegisterPage, 'login' for LoginPage)

  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  function notificationsLabel(totalQuantity) {
    if (totalQuantity === 0) {
      return "no notifications";
    }
    if (totalQuantity > 99) {
      return "more than 99 notifications";
    }
    return `${totalQuantity} notifications`;
  }

  useEffect(() => {
    if (notification && notification.show) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  // sign up and sign in
  const handleSignUpClick = () => {
    setCurrentPage("register");
    navigate("/register"); // Navigate to register page
  };

  const handleSignInClick = () => {
    setCurrentPage("login");
    navigate("/login"); // Navigate to login page
  };

  // already signed in: avatar
  const handleAvatarClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  const handleViewAccount = () => {
    navigate("/account");
    setDropdownOpen(false);
  };

  return (
    <div className="layout-div">
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
          <IconButton
            className="shopping-bag"
            aria-label={notificationsLabel(totalQuantity)}
          >
            <Badge badgeContent={totalQuantity} color="secondary">
              <span
                className="material-symbols-outlined"
                onClick={handleOpenCart} // Opens the cart on click
                style={{ cursor: "pointer" }}
              >
                shopping_bag
              </span>
            </Badge>
          </IconButton>
        </div>

        {/* <div className="action-buttons">
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
        </div> */}

        {/* Right-top corner: sign up and sign in buttons / user avatar*/}
        <div className="action-buttons">
          {currentUser ? (
            <div className="user-avatar">
              <p>user name</p>
              <div className="user-avatar-picture">
                <img
                  src="/images/banner-girl1.png"
                  alt="User Avatar"
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <span class="material-symbols-outlined">keyboard_arrow_down</span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleViewAccount}>View account</button>
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Conditionally render buttons based on the current pathname */}
              {location.pathname !== "/register" && (
                <button
                  className="button"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              )}
              {location.pathname !== "/login" && (
                <button
                  className="button button-white"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              )}
            </>
          )}
        </div>
      </nav>

      {element}

      {notification && notification.show && (
        <Alert
          className="alert"
          icon={<CheckIcon fontSize="inherit" />}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      )}

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
