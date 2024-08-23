// product card on Home page + Featured page + Recommended page
import React from "react";

const ProductCard = ({ product }) => {
  const { brand, image, name } = product;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "0px",
        width: "300px",
        margin: "10px",
      }}
    >
      <div style={{ width: "100%", backgroundColor: "#f1f1f1", overflow:'hidden' }}>
        <img
          src={image}
          alt={name}
          style={{ width: "100%"}}
        />
      </div>
      <div style={{ width: "100%", padding: "20px", }}>
        <h2>{name}</h2>
        <p>{brand}</p>
      </div>
    </div>
  );
};

export default ProductCard;
