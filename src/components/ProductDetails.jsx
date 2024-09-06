import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import { app } from "../service/config";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart, selectCartItems } from "../store/cart";
import { loadUserCart, saveUserCart, syncCartWithFirebase } from "../store/userData";
import { selectCurrentUser } from "../store/auth";

import RecommendedProducts from "./RecommendedProducts";

import "../styles/productDetails.css"

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const db = getFirestore(app);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [product, setProduct] = useState(null); // State to store the product data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const [mainImage, setMainImage] = useState(null); // State to manage the main image
  const [selectedSize, setSelectedSize] = useState(""); // State to manage the size
  const [selectedColor, setSelectedColor] = useState(""); // State to manage the color

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id); // Reference to the document in Firestore
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          setProduct({ id: productSnap.id, ...productData }); // Set the product data
          setMainImage(productData.image);
          setSelectedSize(productData.sizes[0]); // Default to first size
          setSelectedColor(productData.availableColors[0]); // Default to first color
          setLoading(false);
        } else {
          setError("Product not found");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, db]);

  const cartItems = useSelector(selectCartItems) || [];

  // Determine if the item is in the cart
  const isInCart = product && cartItems.some(
    (item) =>
      item.id === product.id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );

  const handleButtonClick = () => {
    if (isInCart) {
      dispatch(removeItemFromCart({ ...product, size: selectedSize, color: selectedColor }));
      // if (currentUser) {
      //   dispatch(syncCartWithFirebase(currentUser.uid)); // Sync changes to Firebase
      // }
    } else {
      dispatch(addItemToCart({ ...product, size: selectedSize, color: selectedColor }));
      // if (currentUser) {
      //   dispatch(syncCartWithFirebase(currentUser.uid)); // Sync changes to Firebase
      // }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  

  return (
    <div>
      <div className="product-details-back-link">
        <Link to="/shop">
          <span className="material-symbols-outlined">arrow_back</span> Back to Shop
        </Link>
      </div>

      <div className="product-details-container">
        {/* Left Section with small additional Images */}
        <div className="left-section">
          {product.imageCollection.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={`${product.name} additional`}
              onClick={() => setMainImage(img.url)} // Update main image on click
            />
          ))}
        </div>

        {/* Main Product Details Section */}
        <div className="main-section">
          {/* Main Product Image */}
          <div className="main-image">
            <img
              src={mainImage || product.image} // Fallback to product.image if mainImage is null
              alt={product.name}
            />
          </div>

          {/* Product Info Section */}
          <div className="product-info-section">
            <p className="product-info-brand">{product.brand}</p>
            <h2 className="product-info-name">{product.name}</h2>
            <p className="product-info-description">{product.description}</p>

            <p className="product-info-subtitle">Lens Width and Frame Size</p>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="product-info-select"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size} mm
                </option>
              ))}
            </select>

            <p className="product-info-subtitle">Choose Color</p>
            <div className="product-info-color-selection">
              {product.availableColors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    border:
                      selectedColor === color
                        ? "2px solid #000"
                        : "2px solid #ccc"
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>

            <h2 className="product-info-price">${product.price.toFixed(2)}</h2>

            <button
              onClick={handleButtonClick}
              className="button"
            >
              {isInCart ? "Remove From Basket" : "Add To Basket"}
            </button>
          </div>
        </div>
      </div>

      <div className="display">
        <div className="display-header">
          <h2>Recommended Products</h2>
          <NavLink to={"/recommended"}>See All</NavLink>
        </div>
        <RecommendedProducts></RecommendedProducts>
      </div>
    </div>
  );
};

export default ProductDetails;
