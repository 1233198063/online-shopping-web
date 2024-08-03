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
          <NavLink to={"/home"} >Home</NavLink>

          <NavLink to={"/shop"} >Shop</NavLink>

          <NavLink to={"/featured"} >Featured</NavLink>

          <NavLink to={"/recommended"} >Recommended</NavLink>
        </div>

        <div className="searchbar">
          <span className="material-symbols-outlined search-icon">search</span>
          <input className="search-input" type="text" placeholder="Search product..." />
          <span className="material-symbols-outlined shopping-bag">shopping_bag</span>
        </div>

        <div className="action-buttons">
          <a class="button button-small" href="">Sign Up</a>
          <a class="button button-small button-white" href="">Sign In</a>
        </div>
      </nav>

      {element}

      <footer className="footer">
        <div className="footer-left">
        <p>Developed by <a href="">Olivia</a></p>
        </div>
        <div className="footer-middle">
          <img className="footer-logo" src="/images/eyewear-logo.png" alt="footer logo" />
          <p>© 2024</p>
        </div>
        <div className="footer-right">
          <p>Fork this project <a href="">HERE</a></p>
        </div>
      </footer>
    </div>
  );
}
