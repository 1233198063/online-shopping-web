import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/auth";

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
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(res.user));
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error(error.message);
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
            <div className="auth-forgot">
              Forgot password?
            </div>
            <button type="submit" className="button">
              Sign In
              <span className="material-symbols-outlined">arrow_forward</span>
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
          <div className="button button-white" onClick={() => navigate("/register")}>
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}
