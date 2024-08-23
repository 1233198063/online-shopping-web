import React, { useRef, useState } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Demo() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const emailRef = useRef()
    const passwordRef = useRef()

    const getEmail = () => {
        setEmail(emailRef.current.value)
    }

    const getPassword = () => {
        setPassword(passwordRef.current.value)
    }

    const auth = getAuth();

    // Click to login
    const handleClick = async (e) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            console.log(res.user);
            // Login successful, redirect to the homepage
        } catch (error) {
            console.error(error.message);
        }
    }

    const logOut = async () => {

        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            // Replace the user avatar with a registration button
        }).catch((error) => {
            // An error happened.
            console.error(error.message);
        });
    }


    return (
        <div>
            <h1>Login</h1>
            <form action="#" onSubmit={handleClick}>
                email: <input type='email' onBlur={getEmail} ref={emailRef} /><br />
                password: <input type='passsword' onBlur={getPassword} ref={passwordRef} /><br />
                <input type="submit" value="Login" />
            </form>
            <button onClick={logOut}>sign out</button>
        </div>
    )
}
