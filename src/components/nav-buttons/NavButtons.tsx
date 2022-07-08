import React from "react";
import "./NavButtons.css";
import { MdLogout } from "react-icons/md";

const NavButtons = () => {
  return (
    <div className="nav-buttons">
      <div className="nav-button hover-translate-y">
        <div className="nav-button-icon ">
          <MdLogout />
        </div>
        Log Out
      </div>
    </div>
  );
};

export default NavButtons;
