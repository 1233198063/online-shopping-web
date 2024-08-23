import React from "react";
import { collection, addDoc, getDocs, query, where  } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";
import { productList } from "../data";

export default function AddData() {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const postData = async () => {
    // Add a new document with a generated id
    try {
      for (let i = 0; i < productList.length; i++) {
        // const docRef = await addDoc(collection(db, 'products'), productList[i])
        // console.log("Document written with ID: ", docRef.id);

        const q = query(
          collection(db, "products"),
          where("id", "==", productList[i].id)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // If data doesn't exist, upload it
          const docRef = await addDoc(
            collection(db, "products"),
            productList[i]
          );
          console.log("Document written with ID: ", docRef.id);
        } else {
          console.log("Document already exists, skipping upload.");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {/* <h2>AddData</h2> */}
      {/* <button onClick={postData}>post</button> */}
    </div>
  );
}
