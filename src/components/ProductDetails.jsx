import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart, selectCartItems } from "../store/cart";

import RecommendedProducts from "./RecommendedProducts";

import "../styles/productDetails.css"

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const db = getFirestore(app);
  const dispatch = useDispatch();

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

  const cartItems = useSelector(selectCartItems);

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
    } else {
      dispatch(addItemToCart({ ...product, size: selectedSize, color: selectedColor }));
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
        <div className="product-details-left-section">
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
        <div className="product-details-main-section">
          {/* Main Product Image */}
          <div className="product-details-main-image">
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

            <p style={{ margin: "20px 0", fontWeight: "bold" }}>Lens Width and Frame Size</p>
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

            <p style={{ margin: "20px 0", fontWeight: "bold" }}>Choose Color</p>
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

            <p className="product-info-price">${product.price.toFixed(2)}</p>

            <button
              onClick={handleButtonClick}
              className="product-info-button"
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
    // <div>
    //   <div style={{ width: "20%", textAlign: "center" }}>
    //     <Link
    //       to="/shop"
    //       style={{
    //         textDecoration: "none",
    //         color: "#000",
    //         display: "block",
    //         marginBottom: "20px",
    //       }}
    //     >
    //       <span className="material-symbols-outlined">arrow_back</span> Back to
    //       Shop
    //     </Link>
    //   </div>

    //   <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
    //     {/* Left Section with small additional Images */}
    //     <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    //       {product.imageCollection.map((img) => (
    //         <img
    //           key={img.id}
    //           src={img.url}
    //           alt={`${product.name} additional`}
    //           style={{
    //             width: "100%",
    //             borderRadius: "8px",
    //             cursor: "pointer",
    //             border: "1px solid #ccc",
    //           }}
    //           onClick={() => setMainImage(img.url)} // Update main image on click
    //         />
    //       ))}
    //     </div>

    //     {/* Main Product Details Section */}
    //     <div style={{ width: "75%", display: "flex", gap: "40px" }}>
    //       {/* Main Product Image */}
    //       <div style={{ flex: "1" }}>
    //         <img
    //           src={mainImage || product.image} // Fallback to product.image if mainImage is null
    //           alt={product.name}
    //           style={{
    //             width: "100%",
    //             borderRadius: "8px",
    //             border: "1px solid #ccc",
    //           }}
    //         />
    //       </div>

    //       {/* Product Info Section */}
    //       <div style={{ flex: "1" }}>
    //         <p style={{ fontSize: "12px", color: "#555" }}>{product.brand}</p>
    //         <h2 style={{ fontSize: "32px", margin: "10px 0" }}>{product.name}</h2>
    //         <p
    //           style={{ fontSize: "14px", color: "#777", marginBottom: "20px" }}
    //         >
    //           {product.description}
    //         </p>

    //         <p style={{ margin: "20px 0", fontWeight: "bold" }}>
    //           Lens Width and Frame Size
    //         </p>
    //         <select
    //           value={selectedSize}
    //           onChange={(e) => setSelectedSize(e.target.value)}
    //           style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
    //         >
    //           {product.sizes.map((size) => (
    //             <option key={size} value={size}>
    //               {size} mm
    //             </option>
    //           ))}
    //         </select>

    //         <p style={{ margin: "20px 0", fontWeight: "bold" }}>Choose Color</p>
    //         <div style={{ display: "flex", gap: "10px" }}>
    //           {product.availableColors.map((color, index) => (
    //             <div
    //               key={index}
    //               style={{
    //                 backgroundColor: color,
    //                 width: "40px",
    //                 height: "40px",
    //                 borderRadius: "50%",
    //                 border:
    //                   selectedColor === color
    //                     ? "2px solid #000"
    //                     : "2px solid #ccc",
    //                 cursor: "pointer",
    //               }}
    //               onClick={() => setSelectedColor(color)}
    //             />
    //           ))}
    //         </div>

    //         <p
    //           style={{ margin: "30px 0", fontSize: "24px", fontWeight: "bold" }}
    //         >
    //           ${product.price.toFixed(2)}
    //         </p>

    //         <button
    //           onClick={handleButtonClick}
    //           style={{
    //             backgroundColor: "#000",
    //             color: "#fff",
    //             padding: "15px 20px",
    //             border: "none",
    //             cursor: "pointer",
    //             borderRadius: "8px",
    //             fontSize: "16px",
    //             width: "100%",
    //           }}
    //         >
    //           {isInCart ? "Remove From Basket" : "Add To Basket"}
    //         </button>

    //       </div>
    //     </div>
    //   </div>

    //   <div className="display">
    //     <div className="display-header">
    //       <h2>Recommended Products</h2>
    //       <NavLink to={"/recommended"}>See All</NavLink>
    //     </div>
    //     <RecommendedProducts></RecommendedProducts>
    //   </div>
    // </div>
  );
};

export default ProductDetails;
