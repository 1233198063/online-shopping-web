import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";

export default function ReadData() {
  const db = getFirestore(app);

  const getData = async () => {
    // 获取全部
    /* const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        }); */

    // 获取指定的
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
      <h2>ReadData</h2>
      <button onClick={getData}>get</button>
    </div>
  );
}
