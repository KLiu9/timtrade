import React from "react";
import { Link } from "@reach/router";

import homimg from "../../../dist/images/timtrade2.png";

import "./NavBar.css";

const NavBarLogo = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-linkContainer NavBar-align">
        <Link to="/" className="NavBar-link" style={{justifyContent: "flex-start", marginLeft: "43vw"}}>
          <span>
            <img className="homeimg-size" src={homimg} />
          </span>
        </Link>
        </div>
    </nav>
  );
};

export default NavBarLogo;