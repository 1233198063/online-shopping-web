import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/auth";

import { selectCartItems } from "../store/cart";
import { loadUserCart } from "../store/userData";

import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getEmail = () => {
    setEmail(emailRef.current.value);
  };

  const getPassword = () => {
    setPassword(passwordRef.current.value);
  };

  const auth = getAuth();

  // Click to login
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await signInWithEmailAndPassword(auth, email, password);
  //     dispatch(setUser(res.user));
  //     navigate("/"); // Redirect to the home page or any other page after login
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleClick= async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Load cart from Firestore and sync with Redux
      const cartItems = await loadUserCart(user.uid);
      dispatch(selectCartItems(cartItems || [])); // Ensure cartItems is an array, even if empty

      dispatch(setUser(user));
      navigate("/");
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="main-content auth">
      <div className="auth-container">
        <h2>Sign in to Salinaka</h2>
        <div className="auth-top">
          <form className="auth-form" onSubmit={handleClick}>
            <label className="auth-input-label">Email</label>
            <input
              type="email"
              className="auth-input"
              onBlur={getEmail}
              ref={emailRef}
            />
            <label className="auth-input-label">Password</label>
            <input
              type="password"
              className="auth-input"
              onBlur={getPassword}
              ref={passwordRef}
            />
            <a href="#" className="auth-forgot">
              Forgot password?
            </a>
            <button type="submit" className="button">
              Sign In
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div className="divider">
            <div className="line"></div>
            OR
            <div className="line"></div>
          </div>

          <div className="social-buttons">
            <button className="social-button button-white">
              Continue with Google
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>Don't have an account? </p>
          <a className="button button-white" onClick={() => navigate("/register")}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
