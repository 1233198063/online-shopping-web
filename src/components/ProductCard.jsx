// product card on Home page + Featured page + Recommended page
import React from "react";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  const { brand, image, name } = product;

  return (
    <div className="card">
      <div className="card-img">
        <img src={image} alt={name} />
      </div>
      <div className="card-text">
        <h2>{name}</h2>
        <p>{brand}</p>
      </div>
    </div>
  );
};

export default ProductCard;
