import React from "react";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";
import { productList } from "../data";

export default function AddData() {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const postData = async () => {
    try {
      for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        const productRef = doc(db, "products", product.id); // Use the product ID as the document ID
        const docSnap = await getDoc(productRef);

        if (!docSnap.exists()) {
          // If the document doesn't exist, add it to Firestore
          await setDoc(productRef, product);
          console.log("Document written with ID: ", product.id);
        } else {
          console.log("Document already exists, skipping upload.");
        }
      }
    } catch (error) {
      console.log("Error adding document: ", error.message);
    }
  };

  return (
    <div>
      <h2>AddData</h2>
      <button onClick={postData}>post</button>
    </div>
  );
}