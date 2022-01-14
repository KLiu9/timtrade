import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "113744910005-h4er20jijgm7isr3pf92sa2t062rk8l6.apps.googleusercontent.com";

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
          {props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="logout"
              onLogoutSuccess={props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="login"
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  };
  
  export default NavBar;