import React from "react";
import { Link } from "react-router-dom";
import Links from "../Links/Links";
import Logo from "../logo/Logo";
import NavButtons from "../nav-buttons/NavButtons";
import UserPreview from "../user_preview/UserPreview";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Logo></Logo>
      <UserPreview name="Robert Fox"></UserPreview>
      <Links></Links>
      <NavButtons></NavButtons>
    </div>
  );
};

export default Navbar;
