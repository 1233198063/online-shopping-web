import React from "react";
import { NavLink, useRoutes, useNavigate } from "react-router-dom";
import routes from "../route";

import "../styles/layout.css";

export default function Layout() {
  const element = useRoutes(routes);
  return (
    <div>
      <nav className="nav-bar">
        <a href="/" className="web-icon">
          <div className="icon-img"></div>
        </a>

        <div className="nav-links">
          <NavLink to={"/home"}>Home</NavLink>

          <NavLink to={"/shop"}>Shop</NavLink>

          <NavLink to={"/featured"}>Featured</NavLink>

          <NavLink to={"/recommended"}>Recommended</NavLink>
        </div>

        <div className="searchbar">
          <span className="material-symbols-outlined search-icon">search</span>
          <input className="search-input" type="text" placeholder="Search product..." />
        </div>

        <div className="checkout">
          <span className="material-symbols-outlined">shopping_bag</span>
        </div>

        <div className="action-buttons">
          <a class="button button-small" href="">Sign Up</a>
          <a class="button button-small button-white" href="">Sign In</a>
        </div>
      </nav>

      {element}
    </div>
  );
}
