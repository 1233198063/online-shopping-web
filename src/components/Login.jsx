import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/auth";

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
      navigate("/"); // Redirect to the home page or any other page after login
    } catch (error) {
      console.error(error.message);
    }
  };

  const logOut = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // Replace the user avatar with a registration button
      })
      .catch((error) => {
        // An error happened.
        console.error(error.message);
      });
  };

  return (
    // <div>
    //   <h1>Login</h1>
    //   <form action="#" onSubmit={handleClick}>
    //     email: <input type="email" onBlur={getEmail} ref={emailRef} />
    //     <br />
    //     password:{" "}
    //     <input type="passsword" onBlur={getPassword} ref={passwordRef} />
    //     <br />
    //     <input type="submit" value="Login" />
    //   </form>
    //   <button onClick={logOut}>sign out</button>
    // </div>
    <div>
      <h1>Login</h1>
      <form action="#" onSubmit={handleClick}>
        email: <input type='email' onBlur={() => setEmail(emailRef.current.value)} ref={emailRef} /><br />
        password: <input type='password' onBlur={() => setPassword(passwordRef.current.value)} ref={passwordRef} /><br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
