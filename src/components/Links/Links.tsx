import React from "react";
import "./Links.css";
import { Link } from "react-router-dom";
import { HiExternalLink } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Links = () => {
  const location = useLocation();

  return (
    <div className="links">
      <Link
        to="/"
        className={location.pathname === "/" ? "link link-selected" : "link"}
      >
        Inventory
      </Link>
      <Link
        to="/categories"
        className={
          location.pathname === "/categories" ? "link link-selected" : "link"
        }
      >
        Categories
      </Link>
      <Link
        to="/brands"
        className={
          location.pathname === "/brands" ? "link link-selected" : "link"
        }
      >
        Brands
      </Link>
      <a
        href="https://jporrego.github.io/coffee-shop/"
        target="_blank"
        className="link"
        rel="noreferrer"
      >
        Live Store <HiExternalLink></HiExternalLink>
      </a>
    </div>
  );
};

export default Links;
