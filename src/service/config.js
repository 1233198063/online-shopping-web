// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEDXxta7MkzzErVPXKRjiVyO5Tz59AHrY",
  authDomain: "online-shopping-6bf34.firebaseapp.com",
  projectId: "online-shopping-6bf34",
  storageBucket: "online-shopping-6bf34.appspot.com",
  messagingSenderId: "941059568830",
  appId: "1:941059568830:web:6e078a4c9a151c26a69aef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };