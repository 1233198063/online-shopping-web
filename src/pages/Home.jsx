import React from "react";

import "../styles/home.css";

export default function Home() {
  return (
    <div>
      <div className="banner">
        <div className="content">
          <h1><strong>See</strong> everything <br /> with <strong>Clarity</strong></h1>
          <p>
            Buying eyewear should leave you happy and good-looking, with money
            in your pocket. Glasses, sunglasses, and contacts—we've got your
            eyes covered.
          </p>
          <br />
          <a href="" className="button">
            Shop Now
            <span class="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="banner-img-wrapper">
          <div className="banner-img"></div>
        </div>
      </div>
    </div>
  );
}
