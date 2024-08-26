import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config"; // Import your Firebase app config

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const db = getFirestore(app);

  const [product, setProduct] = useState(null); // State to store the product data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const [mainImage, setMainImage] = useState(null); // State to manage the main image

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id); // Reference to the document in Firestore
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() }); // Set the product data
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Destructure the product object
  const {
    // image,
    name,
    brand,
    price,
    description,
    sizes,
    availableColors,
    imageCollection,
  } = product;

  return (
    <div>
      <div style={{ width: "20%", textAlign: "center" }}>
        <Link
          to="/shop"
          style={{
            textDecoration: "none",
            color: "#000",
            display: "block",
            marginBottom: "20px",
          }}
        >
          <span class="material-symbols-outlined">arrow_back</span> Back to Shop
        </Link>
      </div>

      <div  style={{ display: "flex", gap: "40px", padding: "20px" }}>
        {/* Left Section with small additional Images */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {imageCollection.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={`${name} additional`}
              style={{
                width: "100%",
                borderRadius: "8px",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
              onClick={() => setMainImage(img.url)} // Update main image on click
            />
          ))}
        </div>

        {/* Main Product Details Section */}
        <div style={{ width: "75%", display: "flex", gap: "40px" }}>
          {/* Main Product Image */}
          <div style={{ flex: "1" }}>
            <img
              src={mainImage || product.image} // Fallback to product.image if mainImage is null
              alt={name}
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Product Info Section */}
          <div style={{ flex: "1" }}>
            <p style={{ fontSize: "12px", color: "#555" }}>{brand}</p>
            <h2 style={{ fontSize: "32px", margin: "10px 0" }}>{name}</h2>
            <p
              style={{ fontSize: "14px", color: "#777", marginBottom: "20px" }}
            >
              {description}
            </p>

            <p style={{ margin: "20px 0", fontWeight: "bold" }}>
              Lens Width and Frame Size
            </p>
            <select
              style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size} mm
                </option>
              ))}
            </select>

            <p style={{ margin: "20px 0", fontWeight: "bold" }}>Choose Color</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {availableColors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid #000",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <p
              style={{ margin: "30px 0", fontSize: "24px", fontWeight: "bold" }}
            >
              ${price.toFixed(2)}
            </p>

            <button
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "15px 20px",
                border: "none",
                cursor: "pointer",
                borderRadius: "8px",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Add To Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
