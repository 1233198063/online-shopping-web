import React from 'react'
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from '../service/config';
import { productList } from '../data';

export default function Storage() {
    const db = getFirestore(app);

    const postData = async () => {

        try {
            for (let i = 0; i < productList.length; i++) {
                const docRef = await addDoc(collection(db, 'products'), productList[i])
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (error) {
            console.log(error.message);
        }


        // Add a new document with a generated id.
        // const docRef = await addDoc(collection(db, "cities"), {
        //     name: "Tokyo",
        //     country: "Japan"
        // });
        // console.log("Document written with ID: ", docRef.id);

    }

    return (
        <div>
            <h2>AddData</h2>
            <button onClick={postData}>post</button>
        </div>
    )
}
