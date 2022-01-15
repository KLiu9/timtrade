import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const NavBar = (props) => {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-linkContainer NavBar-align">
          <Link to="/" className="NavBar-link">
            home
          </Link>
          {props.userId && (
            <Link to={`/account/${props.userId}`} className="NavBar-link">
              account
            </Link>
          )}
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