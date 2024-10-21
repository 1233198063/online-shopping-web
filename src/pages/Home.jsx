import React from "react";
import { NavLink } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import RecommendedProducts from "../components/RecommendedProducts";

import "../styles/home.css";

export default function Home() {
  return (
    <div className="main-content">
      <div className="banner">
        <div className="content">
          <h1>
            <strong>See</strong> everything <br /> with <strong>Clarity</strong>
          </h1>
          <p>
            Buying eyewear should leave you happy and good-looking, with money
            in your pocket. Glasses, sunglasses, and contacts—we've got your
            eyes covered.
          </p>
          <br />
          <NavLink to={"/shop"} className="button">
            Shop Now
            <span className="material-symbols-outlined">arrow_forward</span>
          </NavLink>
        </div>
        <div className="banner-img-wrapper">
          <img className="banner-img" src="/online-shopping-web/images/banner-girl1.png" alt="" />
        </div>
      </div>

      <div className="display">
        <div className="display-header">
          <h2>Featured Products</h2>
          <NavLink to={"/featured"}>See All</NavLink>
        </div>
        <FeaturedProducts></FeaturedProducts>
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
}
