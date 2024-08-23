import React from 'react'
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from '../service/config';
import { productList } from '../data';

export default function AddData() {
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    const postData = async () => {

        // Add a new document with a generated id
        try {
            for (let i = 0; i < productList.length; i++) {
                const docRef = await addDoc(collection(db, 'products'), productList[i])
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div>
            <h2>AddData</h2>
            <button onClick={postData}>post</button>
        </div>
    )
}
