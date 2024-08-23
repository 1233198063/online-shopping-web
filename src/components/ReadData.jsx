import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";

export default function ReadData() {
  const db = getFirestore(app);

  const getData = async () => {
    // Get mutiple documents
    /* const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        }); */

    // Get a document
    const q = query(
      collection(db, "products"),
      where("brand", "==", "Sexbomb")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };
  
  return (
    <div>
      {/* <h2>ReadData</h2>
      <button onClick={getData}>get</button> */}
    </div>
  );
}
