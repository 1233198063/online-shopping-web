import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

  // const getEmail = () => {
  //   setEmail(emailRef.current.value);
  // };

  // const getPassword = () => {
  //   setPassword(passwordRef.current.value);
  // };

  const auth = getAuth();

  // Click to login
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(res.user));
      navigate("/"); // Redirect to the home page or any other page after login
    } catch (error) {
      console.error(error.message);
    }
  };

  // const logOut = async () => {
  //   const auth = getAuth();
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       // Replace the user avatar with a registration button
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.error(error.message);
  //     });
  // };

  return (
    //  <div>
    //   <h1>Login</h1>
    //   <form action="#" onSubmit={handleClick}>
    //     email: <input type='email' onBlur={() => setEmail(emailRef.current.value)} ref={emailRef} /><br />
    //     password: <input type='password' onBlur={() => setPassword(passwordRef.current.value)} ref={passwordRef} /><br />
    //     <input type="submit" value="Login" />
    //   </form>
    // </div>
    <div className="main-content auth">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Sign in to Salinaka</h2>
        </div>
        <form className="auth-form" onSubmit={handleClick}>
          <label className="auth-input-label">Email</label>
          <input
            type="email"
            className="auth-input"
            onBlur={() => setEmail(emailRef.current.value)}
            ref={emailRef}
          />
          <label className="auth-input-label">Password</label>
          <input
            type="password"
            className="auth-input"
            onBlur={() => setPassword(passwordRef.current.value)}
            ref={passwordRef}
          />
          <a href="#" className="auth-footer">
            Forgot password?
          </a>
          <button type="submit" className="button">
            Sign In
          </button>
        </form>

        <div className="divider">OR</div>

        <div className="social-buttons">
          <button className="social-button social-button-google">
            Continue with Google
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <a className="button button-white" href="/register">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
