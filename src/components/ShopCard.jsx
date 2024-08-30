// product card on shop page
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart, isItemInCart } from "../store/cart";

import "../styles/productCard.css";

const ShopCard = ({ product }) => {
  const { id, brand, image, name, price } = product;
  const dispatch = useDispatch();
  const isInCart = useSelector((state) =>
    state.cart.items.some(
      (item) =>
        item.id === id &&
        item.size === product.sizes[0] && // Check default size
        item.color === product.availableColors[0] // Check default color
    )
  );

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...product,
        size: product.sizes[0], // Default to first size
        color: product.availableColors[0], // Default to first color
      })
    );
  };

  const handleRemoveFromCart = () => {
    dispatch(
      removeItemFromCart({
        ...product,
        size: product.sizes[0], // Ensure default if removed
        color: product.availableColors[0], // Ensure default if removed
      })
    );
  };

  const handleButtonClick = () => {
    if (isInCart) {
      handleRemoveFromCart();
    } else {
      handleAddToCart();
    }
  };

  return (
    <div className="shop-card">
      <Link to={`/product/${product.id}`}>
        <div className="shop-card-img">
          <img src={image} alt={name} />
        </div>
        {isInCart && <div className="checkmark">✔</div>}
        <div className="shop-card-text">
          <h2>{name}</h2>
          <p>{brand}</p>
          <h3>${price}</h3>
        </div>
      </Link>
      <div className="shop-card-button" onClick={handleButtonClick}>
        {isInCart ? "Remove from Basket" : "Add to Basket"}
      </div>
    </div>
  );
};

export default ShopCard;
