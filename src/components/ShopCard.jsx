// product card on shop page
import React from "react";
import "../styles/productCard.css";
import { Link } from 'react-router-dom';

const ShopCard = ({ product }) => {
  const { brand, image, name, price } = product;

  return (
    <div className="shop-card">
      <Link to={`/product/${product.id}`}>
        <div className="shop-card-img">
          <img src={image} alt={name} />
        </div>
        <div className="shop-card-text">
          <h2>{name}</h2>
          <p>{brand}</p>
          <h3>${price}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ShopCard;
