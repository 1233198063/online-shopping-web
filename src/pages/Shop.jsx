import React from "react";
import { Outlet } from "react-router-dom";
import ShopProducts from "../components/ShopProducts";

export default function Shop() {
  return (
    <div className="main-content">
      <div className="display">
        <ShopProducts></ShopProducts>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
