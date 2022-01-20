import React from "react";
import { Link } from "@reach/router";

import accimg from "../../../dist/images/account.png";
import reqimg from "../../../dist/images/request.png";
import expimg from "../../../dist/images/explore.png";
import fulimg from "../../../dist/images/fulfill.png";
import favimg from "../../../dist/images/favicon.png";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-linkContainer NavBar-align">
        <Link to="/" className="NavBar-link">
          <img className="img-size" src={favimg} />
          <div>home</div>
        </Link>

        <Link to="/account/" className="NavBar-link">
          <img className="img-size" src={accimg} />
          <div>account</div>
        </Link>

        <Link to="/requests/" className="NavBar-link">
          <img className="img-size" src={reqimg} />
          <div>requests</div>
        </Link>

        <Link to="/explore/" className="NavBar-link">
          <img className="img-size" src={expimg} />
          <div>explore</div>
        </Link>

        <Link to="/fulfill/" className="NavBar-link">
          <img className="img-size" src={fulimg} />
          <div>fulfill</div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
