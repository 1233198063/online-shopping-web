import React from "react";
import RecommendedProducts from "../components/RecommendedProducts";

export default function Recommended() {
  return (
    <div className="main-content">
      <div className="banner">
        <div className="content">
          <h1>
            <strong>Recommended Products</strong>
          </h1>
        </div>
        <div className="banner-img-wrapper">
          <img
            className="banner-img"
            src="/online-shopping-web/images/banner-girl-recommended.png"
            alt=""
          />
        </div>
      </div>
      <div className="display">
        <RecommendedProducts></RecommendedProducts>
      </div>
    </div>
  );
}
