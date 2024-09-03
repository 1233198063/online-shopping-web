import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";

import "../styles/featuredProduct.css";

export default function RecommendedProducts() {
    const db = getFirestore(app);

    // State to store products data
    const [products, setProducts] = useState([]);
  
    // Fetch data function
    const getData = async () => {
      const q = query(
        collection(db, "products"),
        where("isRecommended", "==", true)
      );
      const querySnapshot = await getDocs(q);
      
      const productsList = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() });
      });
  
      setProducts(productsList); // Update state with fetched products
    };
  
    // Use useEffect to fetch data on component mount
    useEffect(() => {
      getData();
    }, []); 
  

  return (
    <div className="products-display">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No recommended products found.</p>
      )}
    </div>
  );
}