import React, { useRef, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from '../service/config';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const auth = getAuth();

    const db = getFirestore(app);
    const navigate = useNavigate();

    const [uname, setUname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const unameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const getUname = () => {
        setUname(unameRef.current.value)
    }

    const getEmail = () => {
        setEmail(emailRef.current.value)
    }

    const getPassword = () => {
        setPassword(passwordRef.current.value)
    }

    const handleClick = async (e) => {
        e.preventDefault()

        try {
            // Signed up 
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update the user's profile with the username
            await updateProfile(user, { displayName: uname });

            // Maintain in Firebase
            const docRef = await addDoc(collection(db, 'users1'), {
                name: uname,
                email,
                id: user.uid,
                basket: []
            })
            console.log("Document written with ID: ", docRef.id);

            // Navigation to login after successful registration
            navigate('/login');

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form action="#" onSubmit={handleClick}>
                Username: <input type='text' onBlur={getUname} ref={unameRef} /><br />
                Email: <input type='email' onBlur={getEmail} ref={emailRef} /><br />
                Password: <input type='passsword' onBlur={getPassword} ref={passwordRef} /><br />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}
