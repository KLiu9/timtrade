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
        <div>
          <a href="/">
            <img className="img-sizefav" src={favimg} />
          </a>
          &ensp;&ensp;&ensp;&thinsp;
          <a href="/account/">
            <img className="img-size" src={accimg} />
          </a>
          &ensp;&ensp;&ensp;&ensp;&thinsp;
          <a href="/requests/">
            <img className="img-size" src={reqimg} />
          </a>
          &ensp;&ensp;&ensp;&thinsp;
          <a href="/explore/">
            <img className="img-size" src={expimg} />
          </a>
          &ensp;&ensp;
          <a href="/fulfill/">
            <img className="img-size" src={fulimg} />
          </a>
        </div>
        
        <Link to="/" className="NavBar-link">
          home
        </Link>

        <Link to="/account/" className="NavBar-link">
          account
        </Link>

        <Link to="/requests/" className="NavBar-link">
          requests
        </Link>

        <Link to="/explore/" className="NavBar-link">
          explore
        </Link>

        <Link to="/fulfill/" className="NavBar-link">
          fulfill
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
