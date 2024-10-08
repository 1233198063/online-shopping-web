// product card on shop page
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  selectCartItems,
} from "../store/cart";

import "../styles/productCard.css";

const ShopCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const isInCart = cartItems.some(
    (item) =>
      item.id === product.id &&
      item.size === product.sizes[0] && // Check default size
      item.color === product.availableColors[0] // Check default color
  );

  const handleButtonClick = () => {
    if (isInCart) {
      dispatch(
        removeItemFromCart({
          ...product,
          size: product.sizes[0],
          color: product.availableColors[0],
        })
      );
    } else {
      dispatch(
        addItemToCart({
          ...product,
          size: product.sizes[0],
          color: product.availableColors[0],
        })
      );
    }
  };

  return (
    <div className="shop-card">
      <Link to={`/product/${product.id}`}>
        <div className="shop-card-img">
          <img src={product.image} alt={product.name} />
        </div>
        {isInCart && <div className="checkmark">✔</div>}
        <div className="shop-card-text">
          <h2>{product.name}</h2>
          <p>{product.brand}</p>
          <h3>${product.price}</h3>
        </div>
      </Link>
      <div
        className={`shop-card-button button ${isInCart ? "remove" : ""}`}
        onClick={handleButtonClick}
      >
        {isInCart ? "Remove from Basket" : "Add to Basket"}
      </div>
    </div>
  );
};

export default ShopCard;
