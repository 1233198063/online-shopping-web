import React, { useRef, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";

export default function Register() {
  const auth = getAuth();

  const db = getFirestore(app);
  const navigate = useNavigate();

  const [uname, setUname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const unameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const getUname = () => {
    setUname(unameRef.current.value);
  };

  const getEmail = () => {
    setEmail(emailRef.current.value);
  };

  const getPassword = () => {
    setPassword(passwordRef.current.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Signed up
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's profile with the username
      await updateProfile(user, { displayName: uname });

      // Maintain in Firebase
      const docRef = await addDoc(collection(db, "users1"), {
        name: uname,
        email,
        id: user.uid,
        basket: [],
      });
      console.log("Document written with ID: ", docRef.id);

      // Navigation to login after successful registration
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <div className="main-content auth">
      <div className="auth-container">
        <h2>Sign up to Salinaka</h2>
        <div className="auth-top">
          <form className="auth-form" onSubmit={handleClick}>
            <label className="auth-input-label">Username</label>
            <input
              type="text"
              className="auth-input"
              onBlur={getUname}
              ref={unameRef}
            />
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
            <button type="submit" value="Register" className="button">
              Sign Up
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
          <p>Already have an account? </p>
          <a className="button button-white" onClick={() => navigate("/login")}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
