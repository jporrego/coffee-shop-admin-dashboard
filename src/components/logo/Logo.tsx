import React from "react";
import "./Logo.css";
import LogoImg from "../../assets/img/general/icon.png";

const Logo = () => {
  return (
    <div className="logo">
      <div className="store-logo">
        <img src={LogoImg}></img>
        <div className="store-logo__title">Café Shop</div>
      </div>
      <div className="logo-name">Admin Dashboard</div>
    </div>
  );
};

export default Logo;
